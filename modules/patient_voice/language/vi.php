<?php

/**
 * @Project NUKEVIET 4.x
 * @Module  patient_voice — Frontend language (Vietnamese)
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_MAINFILE')) {
    die('Stop!!!');
}

$lang_translator['author']     = 'PatientVoice';
$lang_translator['createdate'] = '2024-01-01, 00:00';
$lang_translator['copyright']  = '';
$lang_translator['langtype']   = 'lang_module';

/* ── Module ───────────────────────────────── */
$lang_module['_MODTITLE'] = 'Tiếp nhận phản hồi bệnh nhân';

/* ── Submission form (main page) ──────────── */
$lang_module['main_title']       = 'Gửi phản hồi / Khiếu nại';
$lang_module['main_intro']       = 'Vui lòng điền đầy đủ thông tin để chúng tôi tiếp nhận và xử lý phản hồi của bạn nhanh nhất.';
$lang_module['field_subject']    = 'Tiêu đề';
$lang_module['field_subject_ph'] = 'Nội dung tóm tắt phản hồi…';
$lang_module['field_body']       = 'Mô tả chi tiết';
$lang_module['field_body_ph']    = 'Trình bày chi tiết sự việc, thời gian, địa điểm, người liên quan…';
$lang_module['field_type']       = 'Loại phản hồi';
$lang_module['field_dept']       = 'Khoa / Phòng liên quan';
$lang_module['field_name']       = 'Họ và tên';
$lang_module['field_phone']      = 'Số điện thoại';
$lang_module['field_email']      = 'Email';
$lang_module['dept_placeholder'] = '-- Chọn khoa/phòng --';
$lang_module['type_placeholder'] = '-- Chọn loại phản hồi --';
$lang_module['required_note']    = 'Trường có dấu (*) là bắt buộc';
$lang_module['btn_submit']       = 'Gửi phản hồi';
$lang_module['btn_check_status'] = 'Tra cứu trạng thái phiếu';

/* ── Validation errors ────────────────────── */
$lang_module['err_subject'] = 'Vui lòng nhập tiêu đề phản hồi.';
$lang_module['err_dept']    = 'Vui lòng chọn khoa / phòng liên quan.';
$lang_module['err_name']    = 'Vui lòng nhập họ và tên người phản hồi.';
$lang_module['err_phone']   = 'Vui lòng nhập số điện thoại liên hệ.';

/* ── Submit result ────────────────────────── */
$lang_module['submit_ok']      = 'Phản hồi của bạn đã được tiếp nhận!';
$lang_module['submit_ok_body'] = 'Mã phiếu của bạn là <strong>%s</strong>. Vui lòng lưu lại mã này để tra cứu trạng thái xử lý.';
$lang_module['submit_err']     = 'Có lỗi khi ghi nhận phản hồi. Vui lòng thử lại hoặc liên hệ trực tiếp với bệnh viện.';

/* ── Status lookup (detail page) ─────────── */
$lang_module['lookup_title']    = 'Tra cứu trạng thái phiếu';
$lang_module['lookup_intro']    = 'Nhập mã phiếu và số điện thoại đã đăng ký để xem trạng thái xử lý.';
$lang_module['lookup_ticket']   = 'Mã phiếu';
$lang_module['lookup_ticket_ph']= 'VD: PV-10001';
$lang_module['lookup_phone']    = 'Số điện thoại';
$lang_module['lookup_phone_ph'] = 'Số điện thoại bạn đã cung cấp';
$lang_module['btn_lookup']      = 'Tra cứu';
$lang_module['lookup_not_found']= 'Không tìm thấy phiếu hoặc thông tin không khớp. Vui lòng kiểm tra lại mã phiếu và số điện thoại.';

/* ── Detail result ───────────────────────── */
$lang_module['detail_subject']  = 'Nội dung phản hồi';
$lang_module['detail_status']   = 'Trạng thái';
$lang_module['detail_dept']     = 'Khoa / Phòng';
$lang_module['detail_type']     = 'Loại';
$lang_module['detail_created']  = 'Ngày tiếp nhận';
$lang_module['detail_timeline'] = 'Lịch sử xử lý';
$lang_module['no_timeline']     = 'Chưa có thông tin cập nhật.';
$lang_module['lookup_another']  = 'Tra cứu phiếu khác';

/* ── Feedback types ──────────────────────── */
$lang_module['type_1'] = 'Khiếu nại / Phàn nàn';
$lang_module['type_2'] = 'Khen ngợi / Hài lòng';
$lang_module['type_3'] = 'Câu hỏi / Thắc mắc';
$lang_module['type_4'] = 'Đề xuất / Góp ý';
$lang_module['type_5'] = 'Sự cố / Tai biến';

/* ── Public status labels ────────────────── */
$lang_module['status_new']             = 'Mới tiếp nhận';
$lang_module['status_assigned']        = 'Đã phân công xử lý';
$lang_module['status_in_progress']     = 'Đang xử lý';
$lang_module['status_pending_confirm'] = 'Chờ xác nhận kết quả';
$lang_module['status_resolved']        = 'Đã giải quyết';
$lang_module['status_unresolved']      = 'Không thể giải quyết';
