<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Shared functions (admin + frontend)
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_MAINFILE')) {
    die('Stop!!!');
}

/* ── Type constants ──────────────────────────────────────── */
define('PV_TYPE_COMPLAINT',   1);
define('PV_TYPE_COMPLIMENT',  2);
define('PV_TYPE_INQUIRY',     3);
define('PV_TYPE_SUGGESTION',  4);
define('PV_TYPE_INCIDENT',    5);

define('PV_PRIORITY_URGENT',  1);
define('PV_PRIORITY_HIGH',    2);
define('PV_PRIORITY_NORMAL',  3);

define('PV_STATUS_NEW',              1);
define('PV_STATUS_ASSIGNED',         2);
define('PV_STATUS_IN_PROGRESS',      3);
define('PV_STATUS_PENDING_CONFIRM',  4);
define('PV_STATUS_RESOLVED',         5);
define('PV_STATUS_UNRESOLVED',       6);

define('PV_CHANNEL_HOTLINE',         1);
define('PV_CHANNEL_ONLINE_FORM',     2);
define('PV_CHANNEL_FRONT_DESK',      3);
define('PV_CHANNEL_EMAIL',           4);
define('PV_CHANNEL_SOCIAL_MEDIA',    5);
define('PV_CHANNEL_SUGGESTION_BOX',  6);
define('PV_CHANNEL_NEWS_MEDIA',      7);

/* ── Module config ──────────────────────────────────────── */
function pv_config($name, $default = '')
{
    global $db, $module_data;
    static $cache = [];
    if (!isset($cache[$name])) {
        $sql = 'SELECT value FROM ' . NV_PREFIXLANG . '_' . $module_data
             . '_config WHERE name=' . $db->quote($name);
        $row = $db->query($sql)->fetch();
        $cache[$name] = ($row !== false) ? $row['value'] : $default;
    }
    return $cache[$name];
}

/* ── Ticket number ──────────────────────────────────────── */
function pv_next_ticket_no()
{
    global $db, $module_data;
    $prefix = pv_config('ticket_prefix', 'PV');
    $sql = 'SELECT MAX(id) AS max_id FROM ' . NV_PREFIXLANG . '_' . $module_data . '_feedback';
    $row = $db->query($sql)->fetch();
    $next = ($row && $row['max_id']) ? (int)$row['max_id'] + 1 : 10001;
    return $prefix . '-' . $next;
}

/* ── SLA helpers ────────────────────────────────────────── */
function pv_sla_deadline($priority, $created_at = 0)
{
    $created_at = $created_at ?: NV_CURRENTTIME;
    $hours_map  = [
        PV_PRIORITY_URGENT => (int) pv_config('sla_urgent', 4),
        PV_PRIORITY_HIGH   => (int) pv_config('sla_high',  24),
        PV_PRIORITY_NORMAL => (int) pv_config('sla_normal', 72),
    ];
    $hours = $hours_map[(int)$priority] ?? 72;
    return $created_at + ($hours * 3600);
}

function pv_sla_pct($created_at, $sla_deadline)
{
    if ($sla_deadline <= $created_at) {
        return 100;
    }
    $elapsed = NV_CURRENTTIME - $created_at;
    $window  = $sla_deadline - $created_at;
    return (int) round(($elapsed / $window) * 100);
}

function pv_sla_remaining($sla_deadline)
{
    $diff = $sla_deadline - NV_CURRENTTIME;
    $sign = '';
    if ($diff < 0) {
        $sign = '-';
        $diff = abs($diff);
    }
    return $sign . sprintf('%02d:%02d:%02d', floor($diff / 3600), floor(($diff % 3600) / 60), $diff % 60);
}

/* ── Label maps ─────────────────────────────────────────── */
function pv_status_label($status)
{
    $map = [
        PV_STATUS_NEW             => ['New',                  'new'],
        PV_STATUS_ASSIGNED        => ['Assigned',             'assigned'],
        PV_STATUS_IN_PROGRESS     => ['In Progress',          'in-progress'],
        PV_STATUS_PENDING_CONFIRM => ['Pending Confirmation', 'pending'],
        PV_STATUS_RESOLVED        => ['Resolved',             'resolved'],
        PV_STATUS_UNRESOLVED      => ['Unresolved',           'unresolved'],
    ];
    return $map[(int)$status] ?? ['Unknown', 'unknown'];
}

function pv_priority_label($priority)
{
    $map = [
        PV_PRIORITY_URGENT => ['Urgent', 'urgent'],
        PV_PRIORITY_HIGH   => ['High',   'high'],
        PV_PRIORITY_NORMAL => ['Normal', 'normal'],
    ];
    return $map[(int)$priority] ?? ['Normal', 'normal'];
}

function pv_type_label($type)
{
    $map = [
        PV_TYPE_COMPLAINT  => ['Complaint',  'message-square-warning', 'complaint'],
        PV_TYPE_COMPLIMENT => ['Compliment', 'heart',                  'compliment'],
        PV_TYPE_INQUIRY    => ['Inquiry',    'help-circle',             'inquiry'],
        PV_TYPE_SUGGESTION => ['Suggestion', 'lightbulb',               'suggestion'],
        PV_TYPE_INCIDENT   => ['Incident',   'shield-alert',            'incident'],
    ];
    return $map[(int)$type] ?? ['Unknown', 'circle', 'unknown'];
}

function pv_channel_label($channel)
{
    $map = [
        PV_CHANNEL_HOTLINE         => ['Hotline',        'phone'],
        PV_CHANNEL_ONLINE_FORM     => ['Online Form',    'globe'],
        PV_CHANNEL_FRONT_DESK      => ['Front Desk',     'building-2'],
        PV_CHANNEL_EMAIL           => ['Email',          'mail'],
        PV_CHANNEL_SOCIAL_MEDIA    => ['Social Media',   'share-2'],
        PV_CHANNEL_SUGGESTION_BOX  => ['Suggestion Box', 'inbox'],
        PV_CHANNEL_NEWS_MEDIA      => ['News Media',     'newspaper'],
    ];
    return $map[(int)$channel] ?? ['Other', 'circle'];
}

/* ── DB queries ─────────────────────────────────────────── */
function pv_get_feedback($id)
{
    global $db, $module_data;
    $T   = NV_PREFIXLANG . '_' . $module_data;
    $sql = "SELECT f.*, d.name AS dept_name, fd.body, fd.attachments
            FROM {$T}_feedback f
            LEFT JOIN {$T}_dept d  ON d.id = f.dept_id
            LEFT JOIN {$T}_feedback_detail fd ON fd.feedback_id = f.id
            WHERE f.id = " . intval($id);
    return $db->query($sql)->fetch();
}

function pv_add_timeline($feedback_id, $event_type, $title, $body = '', $is_internal = 0)
{
    global $db, $module_data, $admin_info;
    $actor_id   = isset($admin_info['userid'])   ? (int)$admin_info['userid']   : 0;
    $actor_name = isset($admin_info['full_name']) ? $admin_info['full_name']
                : (isset($admin_info['username']) ? $admin_info['username'] : 'System');

    $T    = NV_PREFIXLANG . '_' . $module_data;
    $stmt = $db->prepare("INSERT INTO {$T}_feedback_timeline
        (feedback_id, event_type, title, body, actor_id, actor_name, is_internal, addtime)
        VALUES (:fid, :etype, :title, :body, :aid, :aname, :intern, :at)");
    $stmt->bindValue(':fid',    intval($feedback_id));
    $stmt->bindValue(':etype',  $event_type);
    $stmt->bindValue(':title',  $title);
    $stmt->bindValue(':body',   $body);
    $stmt->bindValue(':aid',    $actor_id);
    $stmt->bindValue(':aname',  $actor_name);
    $stmt->bindValue(':intern', intval($is_internal));
    $stmt->bindValue(':at',     NV_CURRENTTIME);
    return $stmt->execute();
}

function pv_get_timeline($feedback_id)
{
    global $db, $module_data;
    $T = NV_PREFIXLANG . '_' . $module_data;
    return $db->query("SELECT * FROM {$T}_feedback_timeline
        WHERE feedback_id = " . intval($feedback_id) . " ORDER BY addtime ASC")->fetchAll();
}

function pv_admin_url($op, $extra = '')
{
    global $module_name;
    $url = NV_BASE_ADMINURL . 'index.php?'
         . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&'
         . NV_NAME_VARIABLE . '=' . $module_name . '&'
         . NV_OP_VARIABLE   . '=' . $op;
    return $extra ? $url . '&' . $extra : $url;
}
