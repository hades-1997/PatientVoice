<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Admin-only helpers
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_ADMIN') or !defined('NV_MAINFILE') or !defined('NV_IS_MODADMIN')) {
    die('Stop!!!');
}

define('NV_IS_FILE_ADMIN', true);

require_once NV_ROOTDIR . '/modules/' . $module_file . '/global.functions.php';

/* ── Feedback list query (with filters + pagination) ────── */
function pv_list_feedback($filters = [], $page = 1, $per_page = 20)
{
    global $db, $module_data;
    $T = NV_PREFIXLANG . '_' . $module_data;

    $where = ['1=1'];

    if (!empty($filters['status'])) {
        $where[] = 'f.status = ' . intval($filters['status']);
    }
    if (!empty($filters['priority'])) {
        $where[] = 'f.priority = ' . intval($filters['priority']);
    }
    if (!empty($filters['feedback_type'])) {
        $where[] = 'f.feedback_type = ' . intval($filters['feedback_type']);
    }
    if (!empty($filters['channel'])) {
        $where[] = 'f.channel = ' . intval($filters['channel']);
    }
    if (!empty($filters['dept_id'])) {
        $where[] = 'f.dept_id = ' . intval($filters['dept_id']);
    }
    if (!empty($filters['assignee_id'])) {
        $where[] = 'f.assignee_id = ' . intval($filters['assignee_id']);
    }
    if (!empty($filters['q'])) {
        $q = $db->quote('%' . $filters['q'] . '%');
        $where[] = "(f.subject LIKE $q OR f.patient_name LIKE $q OR f.ticket_no LIKE $q)";
    }
    if (isset($filters['breached']) && $filters['breached']) {
        $where[] = '(f.sla_deadline > 0 AND f.sla_deadline < ' . NV_CURRENTTIME
                 . ' AND f.status NOT IN (5,6))';
    }

    $where_sql = implode(' AND ', $where);
    $offset     = ($page - 1) * $per_page;

    $sql_count = "SELECT COUNT(*) FROM {$T}_feedback f WHERE $where_sql";
    $total     = (int) $db->query($sql_count)->fetchColumn();

    $sql = "SELECT f.*, d.name AS dept_name
            FROM {$T}_feedback f
            LEFT JOIN {$T}_dept d ON d.id = f.dept_id
            WHERE $where_sql
            ORDER BY f.addtime DESC
            LIMIT $offset, $per_page";

    $rows = $db->query($sql)->fetchAll();

    /* Annotate SLA info */
    foreach ($rows as &$row) {
        $row['sla_pct']       = pv_sla_pct($row['addtime'], $row['sla_deadline']);
        $row['sla_remaining'] = pv_sla_remaining($row['sla_deadline']);
        $row['sla_breached']  = ($row['sla_deadline'] > 0
            && NV_CURRENTTIME > $row['sla_deadline']
            && !in_array($row['status'], [PV_STATUS_RESOLVED, PV_STATUS_UNRESOLVED]));
    }
    unset($row);

    return ['total' => $total, 'rows' => $rows, 'page' => $page, 'per_page' => $per_page];
}

/* ── KPI aggregates for Dashboard ──────────────────────── */
function pv_kpis()
{
    global $db, $module_data;
    $T     = NV_PREFIXLANG . '_' . $module_data;
    $today = mktime(0, 0, 0, date('n'), date('j'), date('Y'));
    $week  = $today - (86400 * 6);
    $now   = NV_CURRENTTIME;

    $kpi = [];
    $kpi['new_today'] = (int) $db->query("SELECT COUNT(*) FROM {$T}_feedback WHERE addtime >= $today")->fetchColumn();
    $kpi['open']      = (int) $db->query("SELECT COUNT(*) FROM {$T}_feedback WHERE status NOT IN (5,6)")->fetchColumn();
    $kpi['week']      = (int) $db->query("SELECT COUNT(*) FROM {$T}_feedback WHERE addtime >= $week")->fetchColumn();
    $kpi['overdue']   = (int) $db->query("SELECT COUNT(*) FROM {$T}_feedback WHERE sla_deadline > 0 AND sla_deadline < $now AND status NOT IN (5,6)")->fetchColumn();

    $total_closed   = (int) $db->query("SELECT COUNT(*) FROM {$T}_feedback WHERE status IN (5,6) AND addtime >= $week")->fetchColumn();
    $on_time_closed = (int) $db->query("SELECT COUNT(*) FROM {$T}_feedback WHERE status = 5 AND resolved_at <= sla_deadline AND sla_deadline > 0 AND addtime >= $week")->fetchColumn();
    $kpi['sla_pct'] = $total_closed > 0 ? round(($on_time_closed / $total_closed) * 100, 1) : 100.0;

    return $kpi;
}

/* ── Channel distribution (for donut chart) ─────────────── */
function pv_channel_dist($days = 30)
{
    global $db, $module_data;
    $T    = NV_PREFIXLANG . '_' . $module_data;
    $from = NV_CURRENTTIME - ($days * 86400);
    $sql  = "SELECT channel, COUNT(*) AS cnt FROM {$T}_feedback
             WHERE addtime >= $from GROUP BY channel ORDER BY cnt DESC";
    return $db->query($sql)->fetchAll();
}

/* ── Monthly trend (12 months) ──────────────────────────── */
function pv_monthly_trend()
{
    global $db, $module_data;
    $T    = NV_PREFIXLANG . '_' . $module_data;
    $from = mktime(0, 0, 0, date('n') - 11, 1, date('Y'));
    $sql  = "SELECT DATE_FORMAT(FROM_UNIXTIME(addtime), '%Y-%m') AS ym, COUNT(*) AS cnt
             FROM {$T}_feedback WHERE addtime >= $from GROUP BY ym ORDER BY ym ASC";
    return $db->query($sql)->fetchAll();
}

/* ── Top complaint subjects ─────────────────────────────── */
function pv_top_dept_complaints($limit = 5)
{
    global $db, $module_data;
    $T   = NV_PREFIXLANG . '_' . $module_data;
    $sql = "SELECT d.name, COUNT(f.id) AS cnt
            FROM {$T}_feedback f
            JOIN {$T}_dept d ON d.id = f.dept_id
            WHERE f.feedback_type = " . PV_TYPE_COMPLAINT . "
            GROUP BY f.dept_id ORDER BY cnt DESC LIMIT $limit";
    return $db->query($sql)->fetchAll();
}

/* ── Department list (for selects) ─────────────────────── */
function pv_dept_list()
{
    global $db, $module_data;
    $T = NV_PREFIXLANG . '_' . $module_data;
    return $db->query("SELECT id, name FROM {$T}_dept WHERE is_active=1 ORDER BY sort_order ASC")->fetchAll();
}
