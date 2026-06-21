<?php

/**
 * @Module  patient_voice — Admin language (Vietnamese)
 * @License GNU/GPL version 2 or any later version
 */

if (!defined('NV_ADMIN') or !defined('NV_MAINFILE')) {
    die('Stop!!!');
}

$lang_translator['author']     = 'Hospital Quality Dept.';
$lang_translator['createdate'] = '21/06/2026';
$lang_translator['copyright']  = 'PatientVoice';
$lang_translator['info']       = '';
$lang_translator['langtype']   = 'lang_module';

/* ── Menu ────────────────────────────────────────────────── */
$lang_module['menu_dashboard']   = 'Bảng điều khiển';
$lang_module['menu_new_ticket']  = 'Tiếp nhận phản hồi';
$lang_module['menu_analytics']   = 'Phân tích & Báo cáo';
$lang_module['menu_setting']     = 'Cài đặt';

/* ── Dashboard ───────────────────────────────────────────── */
$lang_module['dash_title']       = 'Quản lý ý kiến bệnh nhân';
$lang_module['dash_new_today']   = 'Mới hôm nay';
$lang_module['dash_open']        = 'Đang mở';
$lang_module['dash_week']        = 'Tuần này';
$lang_module['dash_overdue']     = 'Quá hạn SLA';
$lang_module['dash_sla']         = 'SLA đúng hạn';
$lang_module['dash_recent']      = 'Phản hồi gần đây';
$lang_module['dash_all_tickets'] = 'Xem tất cả phản hồi';

/* ── Feedback list ───────────────────────────────────────── */
$lang_module['list_title']       = 'Danh sách phản hồi';
$lang_module['col_ticket']       = 'MÃ PHIẾU';
$lang_module['col_subject']      = 'NỘI DUNG';
$lang_module['col_type']         = 'LOẠI';
$lang_module['col_priority']     = 'ƯU TIÊN';
$lang_module['col_status']       = 'TRẠNG THÁI';
$lang_module['col_channel']      = 'KÊNH';
$lang_module['col_dept']         = 'KHOA/PHÒNG';
$lang_module['col_assignee']     = 'NGƯỜI XỬ LÝ';
$lang_module['col_sla']          = 'SLA';
$lang_module['col_created']      = 'NGÀY TẠO';
$lang_module['col_actions']      = 'THAO TÁC';

/* ── Filters ─────────────────────────────────────────────── */
$lang_module['filter_all_status']   = 'Tất cả trạng thái';
$lang_module['filter_all_priority'] = 'Tất cả ưu tiên';
$lang_module['filter_all_type']     = 'Tất cả loại';
$lang_module['filter_all_channel']  = 'Tất cả kênh';
$lang_module['filter_all_dept']     = 'Tất cả khoa/phòng';
$lang_module['filter_search_ph']    = 'Tìm theo mã phiếu, tên bệnh nhân, nội dung…';
$lang_module['filter_btn']          = 'Lọc';
$lang_module['filter_reset']        = 'Đặt lại';

/* ── Status labels ───────────────────────────────────────── */
$lang_module['status_new']              = 'Mới';
$lang_module['status_assigned']         = 'Đã phân công';
$lang_module['status_in_progress']      = 'Đang xử lý';
$lang_module['status_pending_confirm']  = 'Chờ xác nhận';
$lang_module['status_resolved']         = 'Đã giải quyết';
$lang_module['status_unresolved']       = 'Không giải quyết';

/* ── Priority labels ─────────────────────────────────────── */
$lang_module['priority_urgent'] = 'Khẩn cấp';
$lang_module['priority_high']   = 'Cao';
$lang_module['priority_normal'] = 'Bình thường';

/* ── Type labels ─────────────────────────────────────────── */
$lang_module['type_complaint']  = 'Khiếu nại';
$lang_module['type_compliment'] = 'Khen ngợi';
$lang_module['type_inquiry']    = 'Thắc mắc';
$lang_module['type_suggestion'] = 'Kiến nghị';
$lang_module['type_incident']   = 'Sự cố';

/* ── Channel labels ──────────────────────────────────────── */
$lang_module['channel_hotline']         = 'Đường dây nóng';
$lang_module['channel_online_form']     = 'Form trực tuyến';
$lang_module['channel_front_desk']      = 'Quầy tiếp nhận';
$lang_module['channel_email']           = 'Email';
$lang_module['channel_social_media']    = 'Mạng xã hội';
$lang_module['channel_suggestion_box']  = 'Hộp thư góp ý';
$lang_module['channel_news_media']      = 'Báo chí';

/* ── Intake form ─────────────────────────────────────────── */
$lang_module['intake_title']         = 'Tiếp nhận phản hồi mới';
$lang_module['intake_edit_title']    = 'Chỉnh sửa phản hồi';
$lang_module['field_subject']        = 'Nội dung phản hồi';
$lang_module['field_patient_name']   = 'Tên bệnh nhân';
$lang_module['field_patient_phone']  = 'Số điện thoại';
$lang_module['field_patient_email']  = 'Email bệnh nhân';
$lang_module['field_dept']           = 'Khoa/Phòng liên quan';
$lang_module['field_type']           = 'Loại phản hồi';
$lang_module['field_priority']       = 'Mức ưu tiên';
$lang_module['field_channel']        = 'Kênh tiếp nhận';
$lang_module['field_body']           = 'Chi tiết nội dung';
$lang_module['field_assignee']       = 'Phân công cho';
$lang_module['field_unassigned']     = '— Chưa phân công —';
$lang_module['btn_save']             = 'Lưu phản hồi';
$lang_module['btn_save_assign']      = 'Lưu & Phân công';
$lang_module['btn_cancel']           = 'Hủy';

/* ── Detail ──────────────────────────────────────────────── */
$lang_module['detail_title']         = 'Chi tiết phản hồi';
$lang_module['detail_patient_info']  = 'Thông tin bệnh nhân';
$lang_module['detail_ticket_info']   = 'Thông tin phiếu';
$lang_module['detail_body']          = 'Nội dung';
$lang_module['detail_timeline']      = 'Lịch sử xử lý';
$lang_module['detail_add_note']      = 'Thêm ghi chú nội bộ';
$lang_module['detail_note_ph']       = 'Nhập ghi chú…';
$lang_module['detail_post_note']     = 'Đăng ghi chú';
$lang_module['detail_sla_status']    = 'Trạng thái SLA';
$lang_module['detail_sla_remaining'] = 'Còn lại';
$lang_module['detail_sla_breached']  = 'Đã vi phạm SLA';
$lang_module['detail_on_track']      = 'Đúng tiến độ';
$lang_module['detail_due_soon']      = 'Sắp đến hạn';
$lang_module['detail_assignee']      = 'Người xử lý';
$lang_module['detail_assign_btn']    = 'Phân công';
$lang_module['detail_change_status'] = 'Đổi trạng thái';
$lang_module['detail_escalate']      = 'Leo thang';
$lang_module['detail_resolve']       = 'Đánh dấu đã giải quyết';
$lang_module['detail_edit']          = 'Chỉnh sửa';
$lang_module['detail_delete']        = 'Xóa phiếu';
$lang_module['detail_back']          = '← Quay lại danh sách';

/* ── Analytics ───────────────────────────────────────────── */
$lang_module['analytics_title']          = 'Phân tích & Báo cáo';
$lang_module['analytics_trend']          = 'Xu hướng phản hồi (12 tháng)';
$lang_module['analytics_channel']        = 'Phân bổ theo kênh';
$lang_module['analytics_top_complaints'] = 'Khoa/phòng khiếu nại nhiều nhất';
$lang_module['analytics_sla_gauge']      = 'SLA đúng hạn (7 ngày)';
$lang_module['analytics_breached_queue'] = 'Hàng chờ vi phạm SLA';
$lang_module['analytics_no_breach']      = 'Không có phiếu vi phạm SLA';
$lang_module['analytics_period']         = 'Kỳ báo cáo';
$lang_module['analytics_30d']            = '30 ngày';
$lang_module['analytics_90d']            = '90 ngày';
$lang_module['analytics_ytd']            = 'Từ đầu năm';

/* ── Settings ────────────────────────────────────────────── */
$lang_module['setting_title']          = 'Cài đặt module PatientVoice';
$lang_module['setting_sla']            = 'Thời gian SLA (giờ)';
$lang_module['setting_sla_urgent']     = 'Khẩn cấp (giờ)';
$lang_module['setting_sla_high']       = 'Cao (giờ)';
$lang_module['setting_sla_normal']     = 'Bình thường (giờ)';
$lang_module['setting_ticket_prefix']  = 'Tiền tố mã phiếu';
$lang_module['setting_hospital_name']  = 'Tên cơ sở y tế';
$lang_module['setting_per_page']       = 'Số phiếu mỗi trang';
$lang_module['setting_save']           = 'Lưu cài đặt';
$lang_module['setting_saved']          = 'Đã lưu cài đặt thành công';
$lang_module['setting_error']          = 'Có lỗi khi lưu cài đặt';

/* ── Misc ────────────────────────────────────────────────── */
$lang_module['confirm_delete']   = 'Bạn có chắc muốn xóa phiếu này không? Hành động này không thể hoàn tác.';
$lang_module['delete_ok']        = 'Đã xóa phiếu thành công';
$lang_module['delete_error']     = 'Lỗi khi xóa phiếu';
$lang_module['save_ok']          = 'Đã lưu thành công';
$lang_module['save_error']       = 'Có lỗi khi lưu';
$lang_module['error_subject']    = 'Vui lòng nhập nội dung phản hồi';
$lang_module['error_dept']       = 'Vui lòng chọn khoa/phòng';
$lang_module['sla_breached_msg'] = 'Vi phạm SLA';
$lang_module['no_rows']          = 'Không có phản hồi nào';
$lang_module['pagination_of']    = 'của';
$lang_module['pagination_items'] = 'phiếu';
