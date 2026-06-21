<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — PatientVoice DB schema
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_IS_FILE_MODULES')) {
    die('Stop!!!');
}

$T = $db_config['prefix'] . '_' . $lang . '_' . $module_data;

/* ── DROP ────────────────────────────────────────────────── */
$sql_drop_module = [
    "DROP TABLE IF EXISTS {$T}_feedback_timeline;",
    "DROP TABLE IF EXISTS {$T}_feedback_detail;",
    "DROP TABLE IF EXISTS {$T}_feedback;",
    "DROP TABLE IF EXISTS {$T}_dept;",
    "DROP TABLE IF EXISTS {$T}_config;",
];

$sql_create_module = $sql_drop_module;

/* ── DEPARTMENTS ─────────────────────────────────────────── */
$sql_create_module[] = "CREATE TABLE {$T}_dept (
    id          INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    name        VARCHAR(255)     NOT NULL DEFAULT '',
    code        VARCHAR(50)      NOT NULL DEFAULT '',
    sort_order  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    is_active   TINYINT(1)       NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    KEY idx_dept_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

/* ── MAIN FEEDBACK TABLE ─────────────────────────────────── */
/*
 * feedback_type: 1=complaint 2=compliment 3=inquiry 4=suggestion 5=incident
 * priority:      1=urgent    2=high       3=normal
 * status:        1=new  2=assigned  3=in_progress  4=pending_confirmation
 *                5=resolved  6=unresolved
 * channel:       1=hotline  2=online_form  3=front_desk  4=email
 *                5=social_media  6=suggestion_box  7=news_media
 */
$sql_create_module[] = "CREATE TABLE {$T}_feedback (
    id              INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    ticket_no       VARCHAR(20)      NOT NULL DEFAULT '',
    subject         VARCHAR(500)     NOT NULL DEFAULT '',
    patient_name    VARCHAR(255)     NOT NULL DEFAULT '',
    patient_phone   VARCHAR(50)      NOT NULL DEFAULT '',
    patient_email   VARCHAR(255)     NOT NULL DEFAULT '',
    dept_id         INT UNSIGNED     NOT NULL DEFAULT 0,
    feedback_type   TINYINT UNSIGNED NOT NULL DEFAULT 1,
    priority        TINYINT UNSIGNED NOT NULL DEFAULT 3,
    status          TINYINT UNSIGNED NOT NULL DEFAULT 1,
    channel         TINYINT UNSIGNED NOT NULL DEFAULT 1,
    assignee_id     INT UNSIGNED     NOT NULL DEFAULT 0,
    assignee_name   VARCHAR(255)     NOT NULL DEFAULT '',
    sla_deadline    INT UNSIGNED     NOT NULL DEFAULT 0,
    created_by      INT UNSIGNED     NOT NULL DEFAULT 0,
    resolved_by     INT UNSIGNED     NOT NULL DEFAULT 0,
    resolved_at     INT UNSIGNED     NOT NULL DEFAULT 0,
    addtime         INT UNSIGNED     NOT NULL DEFAULT 0,
    edittime        INT UNSIGNED     NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_ticket_no (ticket_no),
    KEY idx_status    (status),
    KEY idx_priority  (priority),
    KEY idx_assignee  (assignee_id),
    KEY idx_dept      (dept_id),
    KEY idx_addtime   (addtime),
    KEY idx_sla       (sla_deadline, status),
    FULLTEXT KEY ft_search (subject, patient_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

/* ── FEEDBACK DETAIL ─────────────────────────────────────── */
$sql_create_module[] = "CREATE TABLE {$T}_feedback_detail (
    feedback_id  INT UNSIGNED NOT NULL,
    body         TEXT,
    attachments  TEXT,
    PRIMARY KEY (feedback_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

/* ── TIMELINE ────────────────────────────────────────────── */
$sql_create_module[] = "CREATE TABLE {$T}_feedback_timeline (
    id           INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    feedback_id  INT UNSIGNED     NOT NULL,
    event_type   VARCHAR(50)      NOT NULL DEFAULT 'note',
    title        VARCHAR(255)     NOT NULL DEFAULT '',
    body         TEXT,
    actor_id     INT UNSIGNED     NOT NULL DEFAULT 0,
    actor_name   VARCHAR(255)     NOT NULL DEFAULT '',
    is_internal  TINYINT(1)       NOT NULL DEFAULT 0,
    addtime      INT UNSIGNED     NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY idx_tl_feedback (feedback_id),
    KEY idx_tl_addtime  (addtime)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

/* ── CONFIG ──────────────────────────────────────────────── */
$sql_create_module[] = "CREATE TABLE {$T}_config (
    name   VARCHAR(50)  NOT NULL,
    value  TEXT,
    PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

/* ── SEED DATA ───────────────────────────────────────────── */
$sql_create_module[] = "INSERT INTO {$T}_config (name, value) VALUES
('sla_urgent',  '4'),
('sla_high',    '24'),
('sla_normal',  '72'),
('per_page',    '20'),
('ticket_prefix', 'PV'),
('hospital_name', 'Bệnh viện'),
('enable_sla',  '1')";

$sql_create_module[] = "INSERT INTO {$T}_dept (name, code, sort_order) VALUES
('Khoa Khám bệnh',              'KB',  1),
('Khoa Nội tổng hợp',          'NOI', 2),
('Khoa Ngoại tổng hợp',        'NGO', 3),
('Khoa Nhi',                   'NHI', 4),
('Khoa Cấp cứu',               'CC',  5),
('Khoa Hồi sức tích cực',      'HSTC',6),
('Khoa Sản',                   'SAN', 7),
('Khoa Chẩn đoán hình ảnh',    'CDHA',8),
('Khoa Xét nghiệm',            'XN',  9),
('Khoa Dược',                  'DUO', 10),
('Phòng Tài chính kế toán',    'TC',  11),
('Phòng Hành chính',           'HC',  12),
('Phòng Quản lý chất lượng',   'QLCL',13),
('Phòng Điều dưỡng',           'DD',  14),
('Khoa Vật lý trị liệu',       'VLTL',15)";
