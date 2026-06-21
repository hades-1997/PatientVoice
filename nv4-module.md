# NukeViet 4.x Module Blueprint

Skill này hướng dẫn tạo module NukeViet 4.x đúng cấu trúc theo mô hình module `news`.
Khi người dùng muốn tạo module mới, hãy thay `{MODULE}` bằng tên module thực tế (viết thường, không dấu, không khoảng trắng, VD: `document`, `gallery`, `faq`).

---

## TỔNG QUAN CẤU TRÚC THƯ MỤC

```
modules/{MODULE}/
├── version.php              ← Khai báo metadata module
├── config.ini               ← Thông tin cài đặt cơ bản (id, type, name, version)
├── functions.php            ← Khởi tạo frontend: load danh mục, routing op, menu
├── global.functions.php     ← Hàm dùng chung CẢ admin VÀ frontend
├── admin.functions.php      ← Hàm chỉ dành cho admin (list, form, redirect)
├── admin.menu.php           ← Menu admin, phân quyền, danh sách func được phép
├── theme.php                ← Hàm hiển thị frontend (viewcat_*, detail_theme, v.v.)
├── action_mysql.php         ← SQL cài đặt/gỡ cài đặt (tạo/xóa bảng DB)
├── comment.php              ← Xử lý bình luận (nếu module hỗ trợ)
├── notification.php         ← Xử lý thông báo
├── rssdata.php              ← Dữ liệu RSS
├── search.php               ← Đăng ký với hệ thống tìm kiếm NukeViet
├── siteinfo.php             ← Dữ liệu SEO / breadcrumb
├── menu.php                 ← Xây dựng menu frontend
├── index.html               ← File bảo mật (để trống, ngăn duyệt thư mục)
│
├── admin/                   ← Controller từng trang admin
│   ├── main.php             ← Trang danh sách nội dung (op=main trong admin)
│   ├── content.php          ← Form thêm/sửa nội dung
│   ├── cat.php              ← Quản lý chuyên mục
│   ├── setting.php          ← Cài đặt module
│   ├── admins.php           ← Phân quyền quản trị
│   ├── tags.php             ← Quản lý tag (nếu có)
│   ├── authors.php          ← Quản lý tác giả (nếu có)
│   ├── sources.php          ← Quản lý nguồn (nếu có)
│   ├── topics.php           ← Quản lý chủ đề/sự kiện (nếu có)
│   ├── block.php            ← Quản lý block nội dung đặc biệt (nếu có)
│   ├── groups.php           ← Quản lý nhóm block (nếu có)
│   ├── voices.php           ← Quản lý giọng đọc (nếu có)
│   ├── view.php             ← Xem trước bài viết
│   ├── alias.php            ← Quản lý alias URL
│   ├── alias_tag.php        ← Quản lý alias tag
│   ├── rpc.php              ← Remote procedure call (AJAX nội bộ)
│   ├── move.php             ← Di chuyển nội dung giữa chuyên mục
│   │
│   ├── [Action files] - Mỗi file = 1 hành động POST/AJAX:
│   ├── change_cat.php       ← Lưu thay đổi chuyên mục
│   ├── del_cat.php          ← Xóa chuyên mục
│   ├── list_cat.php         ← Trả về HTML danh sách chuyên mục (AJAX)
│   ├── change_topic.php     ← Lưu chủ đề
│   ├── del_topic.php        ← Xóa chủ đề
│   ├── list_topic.php       ← HTML danh sách chủ đề (AJAX)
│   ├── topicsnews.php       ← Tin theo chủ đề
│   ├── topicdelnews.php     ← Xóa tin khỏi chủ đề
│   ├── addtotopics.php      ← Thêm tin vào chủ đề
│   ├── change_source.php    ← Lưu nguồn
│   ├── del_source.php       ← Xóa nguồn
│   ├── list_source.php      ← HTML danh sách nguồn (AJAX)
│   ├── change_block.php     ← Lưu block
│   ├── del_block_cat.php    ← Xóa block cat
│   ├── list_block.php       ← HTML danh sách block (AJAX)
│   ├── list_block_cat.php   ← HTML danh sách block cat (AJAX)
│   ├── chang_block_cat.php  ← Lưu block cat
│   ├── del_content.php      ← Xóa nội dung
│   ├── re-published.php     ← Đăng lại
│   ├── declined.php         ← Từ chối duyệt
│   ├── waiting.php          ← Chuyển chờ duyệt
│   ├── stop.php             ← Dừng hiệu lực
│   ├── publtime.php         ← Hẹn giờ đăng
│   ├── topicajax.php        ← Autocomplete chủ đề (AJAX)
│   ├── sourceajax.php       ← Autocomplete nguồn (AJAX)
│   ├── tagsajax.php         ← Autocomplete tag (AJAX)
│   └── index.html           ← File bảo mật
│
├── funcs/                   ← Controller từng trang frontend (1 file = 1 op)
│   ├── main.php             ← Trang chủ module / trang tổng hợp
│   ├── viewcat.php          ← Xem danh sách bài trong chuyên mục
│   ├── detail.php           ← Xem chi tiết bài viết
│   ├── search.php           ← Tìm kiếm
│   ├── tag.php              ← Trang xem theo tag
│   ├── topic.php            ← Trang xem theo chủ đề/sự kiện
│   ├── groups.php           ← Trang xem theo nhóm
│   ├── author.php           ← Trang xem theo tác giả
│   ├── rss.php              ← RSS feed
│   ├── instant-rss.php      ← Instant Articles RSS
│   ├── print.php            ← Giao diện in
│   ├── sendmail.php         ← Gửi bài qua email
│   ├── rating.php           ← Đánh giá (AJAX)
│   ├── savefile.php         ← Lưu file đính kèm
│   ├── sitemap.php          ← Dữ liệu sitemap
│   ├── content.php          ← Hiển thị nội dung (sub-op)
│   └── index.html           ← File bảo mật
│
├── blocks/                  ← Block widget (mỗi block gồm .php + .ini)
│   ├── module.block_{name}.php  ← Block chỉ hiện trong module này
│   ├── module.block_{name}.ini  ← Config mặc định block module
│   ├── global.block_{name}.php  ← Block hiện ở mọi trang web
│   ├── global.block_{name}.ini  ← Config mặc định block global
│   └── index.html               ← File bảo mật
│
├── language/                ← File ngôn ngữ
│   ├── vi.php               ← Ngôn ngữ frontend tiếng Việt ($lang_module)
│   ├── en.php               ← Ngôn ngữ frontend tiếng Anh
│   ├── fr.php               ← Ngôn ngữ frontend tiếng Pháp
│   ├── admin_vi.php         ← Ngôn ngữ admin tiếng Việt
│   ├── admin_en.php         ← Ngôn ngữ admin tiếng Anh
│   ├── admin_fr.php         ← Ngôn ngữ admin tiếng Pháp
│   ├── data_vi.php          ← Ngôn ngữ cài đặt/dữ liệu tiếng Việt
│   ├── data_en.php          ← Ngôn ngữ cài đặt/dữ liệu tiếng Anh
│   ├── data_fr.php          ← Ngôn ngữ cài đặt/dữ liệu tiếng Pháp
│   ├── block.module.block_{name}_vi.php  ← Ngôn ngữ block module
│   ├── block.module.block_{name}_en.php
│   ├── block.module.block_{name}_fr.php
│   ├── block.global.block_{name}_vi.php  ← Ngôn ngữ block global
│   ├── block.global.block_{name}_en.php
│   ├── block.global.block_{name}_fr.php
│   └── index.html           ← File bảo mật
│
├── Shared/                  ← PHP namespace classes (PascalCase tên file)
│   ├── Posts.php            ← Hằng số trạng thái bài viết
│   ├── Logs.php             ← Helper static ghi log
│   └── index.html           ← File bảo mật
│
├── Log/                     ← PHP namespace classes cho logging
│   ├── Log.php              ← Model class ghi log vào DB
│   └── index.html           ← File bảo mật
│
└── mobile/                  ← Template mobile (thường để trống, dùng themes)
    └── index.html           ← File bảo mật

themes/admin_default/
├── css/
│   └── {MODULE}.css         ← CSS riêng cho admin
├── js/
│   ├── {MODULE}.js          ← JS chung admin
│   └── {MODULE}_content.js  ← JS form thêm/sửa nội dung
└── modules/{MODULE}/        ← Template admin (.tpl)
    ├── main.tpl             ← Trang danh sách nội dung
    ├── content.tpl          ← Form thêm/sửa
    ├── cat.tpl              ← Form chuyên mục
    ├── cat_list.tpl         ← Danh sách chuyên mục
    ├── admin.tpl            ← Wrapper admin
    ├── settings.tpl         ← Form cài đặt
    ├── block.tpl            ← Form block
    ├── block_list.tpl       ← Danh sách block
    ├── blockcat_lists.tpl   ← Danh sách block cat
    ├── topics.tpl           ← Form chủ đề
    ├── topics_list.tpl      ← Danh sách chủ đề
    ├── topicsnews.tpl       ← Tin theo chủ đề
    ├── sources.tpl          ← Form nguồn
    ├── sources_list.tpl     ← Danh sách nguồn
    ├── tags.tpl             ← Quản lý tag
    ├── tags_lists.tpl       ← Danh sách tag
    ├── authors.tpl          ← Quản lý tác giả
    ├── voices.tpl           ← Quản lý giọng đọc
    ├── addtotopics.tpl      ← Thêm vào chủ đề
    ├── groups.tpl           ← Nhóm block
    ├── move.tpl             ← Di chuyển bài
    ├── del_cat.tpl          ← Xác nhận xóa chuyên mục
    ├── redriect.tpl         ← Trang chuyển hướng sau thao tác
    └── index.html           ← File bảo mật

themes/default/
├── css/
│   └── {MODULE}.css         ← CSS riêng frontend
├── js/
│   └── {MODULE}.js          ← JS frontend
├── images/{MODULE}/
│   └── index.html           ← File bảo mật
└── modules/{MODULE}/        ← Template frontend (.tpl)
    ├── viewcat_page.tpl     ← Layout trang chuyên mục kiểu page
    ├── viewcat_list.tpl     ← Layout danh sách
    ├── viewcat_grid.tpl     ← Layout lưới
    ├── viewcat_top.tpl      ← Layout top (bài nổi bật)
    ├── viewcat_main_left.tpl   ← Layout chia cột trái
    ├── viewcat_main_right.tpl  ← Layout chia cột phải
    ├── viewcat_main_bottom.tpl ← Layout bottom
    ├── viewcat_two_column.tpl  ← Layout 2 cột
    ├── detail.tpl           ← Chi tiết bài viết
    ├── content.tpl          ← Nội dung block
    ├── topic.tpl            ← Trang chủ đề
    ├── search.tpl           ← Tìm kiếm
    ├── print.tpl            ← In ấn
    ├── sendmail.tpl         ← Gửi email
    ├── block_news.tpl       ← Template block module
    ├── block_headline.tpl   ← Template block headline
    ├── block_newscenter.tpl ← Template block newscenter
    ├── block_content.tpl    ← Template block content
    ├── block_category.tpl   ← Template block category
    ├── block_groups.tpl     ← Template block groups
    ├── block_tophits.tpl    ← Template block tophits
    ├── block_new_comment.tpl← Template block bình luận mới
    └── index.html           ← File bảo mật
```

---

## QUY TẮC QUAN TRỌNG - KHÔNG NHẦM LẪN

### 1. Guard Constants (kiểm tra bảo mật đầu mỗi file)

| Loại file | Guard check |
|-----------|-------------|
| `version.php` | `!defined('NV_ADMIN') or !defined('NV_MAINFILE')` |
| `functions.php` | `!defined('NV_SYSTEM')` |
| `global.functions.php` | `!defined('NV_MAINFILE')` |
| `admin.functions.php` | `!defined('NV_ADMIN') or !defined('NV_MAINFILE') or !defined('NV_IS_MODADMIN')` |
| `admin.menu.php` | `!defined('NV_ADMIN')` |
| `theme.php` | `!defined('NV_IS_MOD_{MODULE_UPPER}')` |
| `action_mysql.php` | `!defined('NV_IS_FILE_MODULES')` |
| Files trong `admin/` | `!defined('NV_IS_FILE_ADMIN')` |
| Files trong `funcs/` | `!defined('NV_IS_MOD_{MODULE_UPPER}')` |
| Files trong `blocks/` | `!defined('NV_MAINFILE')` |
| Files trong `language/` | `!defined('NV_MAINFILE')` (frontend) hoặc `!defined('NV_ADMIN') or !defined('NV_MAINFILE')` (admin) |
| Classes trong `Shared/`, `Log/` | `!defined('NV_MAINFILE')` + dùng `die()` thay `exit()` |

### 2. Quy tắc NV_IS_MOD_{MODULE} 
- Được định nghĩa trong `functions.php` nếu `$op` không phải `viewcat` hay `detail`:
  ```php
  if (!in_array($op, ['viewcat', 'detail'], true)) {
      define('NV_IS_MOD_{MODULE_UPPER}', true);
  }
  ```
- Các file trong `funcs/` dùng guard này để ngăn truy cập trực tiếp

### 3. Namespace PHP cho Shared/ và Log/
```php
namespace NukeViet\Module\{MODULE}\Shared;
namespace NukeViet\Module\{MODULE}\Log;
```

---

## CHI TIẾT TỪNG FILE GỐC

### `version.php`
```php
if (!defined('NV_ADMIN') or !defined('NV_MAINFILE')) { exit('Stop!!!'); }

$module_version = [
    'name' => '{Tên hiển thị}',
    'modfuncs' => 'main,viewcat,detail,search,rss',  // Các op có block
    'change_alias' => 'rss',                           // Op có thể đổi alias
    'submenu' => 'content,rss,search',                 // Op hiện trong submenu
    'is_sysmod' => 0,
    'virtual' => 1,
    'version' => '4.5.00',
    'date' => '...',
    'author' => 'VINADES.,JSC <contact@vinades.vn>',
    'note' => '',
    'uploads_dir' => [
        $module_upload,
        $module_upload . '/temp_pic',
    ],
    'files_dir' => []
];
```

### `config.ini`
```ini
[extension]
id="1"
type="module"
name="{MODULE}"
version="4.5.00"

[author]
name="VINADES"
email="contact@vinades.vn"

[note]
text=""
```

### `functions.php` (Frontend khởi tạo)
- Guard: `!defined('NV_SYSTEM')`
- Định nghĩa `NV_IS_MOD_{MODULE_UPPER}` nếu op không phải viewcat/detail
- `require_once` file `global.functions.php`
- Load `$global_array_cat` từ DB (bảng `_cat`)
- Xây dựng `$nv_vertical_menu` (menu dọc)
- Xác định `$catid`, `$parentid`, `$alias_cat_url`
- Thiết lập RSS links
- Xử lý URL routing: từ `$array_op` xác định `$op` thực tế (main → viewcat hoặc detail)

### `global.functions.php` (Hàm dùng chung)
- Guard: `!defined('NV_MAINFILE')`
- Định nghĩa `$global_code_defined` (các hằng số status)
- Hàm xóa nội dung: `nv_del_content_module($id)`
- Hàm lưu lịch sử: `nv_save_history($post_old, $post_new)`
- Hàm alias: `get_pseudonym_alias()`, `my_author_detail()`
- Hàm helper: `nv_get_firstimage()`, `nv_link_edit_page()`, `nv_link_delete_page()`
- Hàm block cat: `nv_get_blcat_tag()`, `nv_check_block_*()`, `nv_add_block_*()`, `nv_remove_block_*()`
- Hàm tự động kích hoạt bài: `nv_set_status_module()`

### `admin.functions.php` (Hàm chỉ admin)
- Guard: `!defined('NV_ADMIN') or !defined('NV_MAINFILE') or !defined('NV_IS_MODADMIN')`
- `define('NV_IS_FILE_ADMIN', true)` ← Định nghĩa constant cho các file trong admin/
- `require_once` file `global.functions.php`
- Hàm hiển thị list: `nv_show_cat_list()`, `nv_show_topics_list()`, `nv_show_sources_list()`, `nv_show_block_list()`
- Hàm sửa thứ tự: `nv_fix_cat_order()`, `nv_fix_topic()`, `nv_fix_source()`, `nv_news_fix_block()`
- Hàm tiện ích: `GetCatidInParent()`, `redriect()`, `get_mod_alias()`, `nv_get_mod_countrows()`

### `admin.menu.php` (Menu admin + phân quyền)
- Guard: `!defined('NV_ADMIN')`
- Hàm `nv_news_array_cat_admin()`: đọc phân quyền theo chuyên mục
- Xác định `$NV_IS_ADMIN_MODULE` và `$NV_IS_ADMIN_FULL_MODULE`
- Định nghĩa `$allow_func[]`: danh sách op được phép vào admin
- Định nghĩa `$submenu[]`: menu sidebar admin theo cấp quyền

### `theme.php` (Hàm hiển thị frontend)
- Guard: `!defined('NV_IS_MOD_{MODULE_UPPER}')`
- Hàm viewcat: `viewcat_grid_new()`, `viewcat_list_new()`, `viewcat_page_new()`, `viewcat_top()`, `viewsubcat_main()`, `viewcat_two_column()`
- Hàm chi tiết: `detail_theme()`, `no_permission()`
- Hàm phụ: `topic_theme()`, `author_theme()`, `search_theme()`, `search_result_theme()`, `sendmail_themme()`, `news_print()`
- Tất cả dùng XTemplate: `new XTemplate('file.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme'])`

---

## CHI TIẾT THƯ MỤC `admin/`

**Quy tắc**: Mỗi file trong `admin/` chỉ xử lý 1 chức năng, guard là `NV_IS_FILE_ADMIN`.

**Phân loại theo chức năng:**

| Nhóm | Files | Mô tả |
|------|-------|--------|
| Hiển thị form | `content.php`, `cat.php`, `setting.php`, `topics.php`, `sources.php`, `block.php`, `groups.php`, `tags.php`, `authors.php`, `voices.php` | Render HTML form qua XTemplate |
| Danh sách | `main.php`, `view.php` | Hiển thị danh sách có phân trang |
| Lưu dữ liệu | `change_cat.php`, `change_topic.php`, `change_source.php`, `change_block.php`, `chang_block_cat.php` | POST → validate → INSERT/UPDATE DB → redirect |
| Xóa dữ liệu | `del_cat.php`, `del_content.php`, `del_topic.php`, `del_source.php`, `del_block_cat.php` | DELETE DB → JSON response |
| Đổi trạng thái | `re-published.php`, `declined.php`, `waiting.php`, `stop.php`, `publtime.php` | UPDATE status trong DB |
| AJAX | `topicajax.php`, `sourceajax.php`, `tagsajax.php`, `rpc.php` | JSON response, không render HTML |
| Khác | `admins.php`, `alias.php`, `alias_tag.php`, `move.php`, `addtotopics.php`, `topicsnews.php`, `topicdelnews.php` | Chức năng đặc thù |

**Pattern file list (main.php):**
```php
if (!defined('NV_IS_FILE_ADMIN')) { exit('Stop!!!'); }
// 1. Đọc params từ $_GET/$_POST qua $nv_Request
// 2. Build SQL query với phân trang
// 3. Gán vào $data array
// 4. XTemplate render
// 5. include header, echo nv_admin_theme($contents), include footer
```

**Pattern file save (change_*.php):**
```php
if (!defined('NV_IS_FILE_ADMIN')) { exit('Stop!!!'); }
// 1. Validate input
// 2. INSERT/UPDATE DB
// 3. $nv_Cache->delMod($module_name)
// 4. Gọi redriect() hoặc nv_redirect_location()
```

**Pattern file delete (del_*.php):**
```php
if (!defined('NV_IS_FILE_ADMIN')) { exit('Stop!!!'); }
// 1. Validate id
// 2. DELETE FROM DB
// 3. $nv_Cache->delMod($module_name)
// 4. nv_jsonOutput(['result' => 'OK']) hoặc redirect
```

---

## CHI TIẾT THƯ MỤC `funcs/`

**Quy tắc**: Mỗi file xử lý 1 op frontend, guard là `NV_IS_MOD_{MODULE_UPPER}`.

**Pattern chuẩn:**
```php
if (!defined('NV_IS_MOD_{MODULE_UPPER}')) { exit('Stop!!!'); }
// 1. Đọc params từ URL ($array_op, $nv_Request)
// 2. Check cache: $nv_Cache->getItem(...)
// 3. Nếu không có cache: query DB
// 4. Gọi hàm theme từ theme.php để render
// 5. $nv_Cache->setItem(...)
// 6. Gán $contents, $page_title, v.v. cho framework
```

**Mapping op → file:**
- `op=main` → `funcs/main.php` (trang chủ, hoặc viewcat khi có catid)
- `op={alias_cat}` → `funcs/viewcat.php` (xem chuyên mục)
- `op={alias_cat}/{alias_content}-{id}` → `funcs/detail.php` (chi tiết)
- `op=search` → `funcs/search.php`
- `op=tag/{alias}` → `funcs/tag.php`
- `op=rss` hoặc `op=rss/{alias_cat}` → `funcs/rss.php`
- `op={alias_topic}/{alias}` → `funcs/topic.php`
- `op={alias_groups}/{alias}` → `funcs/groups.php`
- `op=print` → `funcs/print.php`
- `op=sendmail` → `funcs/sendmail.php`
- `op=rating` → `funcs/rating.php`
- `op=savefile` → `funcs/savefile.php`
- `op=sitemap` → `funcs/sitemap.php`
- `op=instant-rss/{alias_cat}` → `funcs/instant-rss.php`

---

## CHI TIẾT THƯ MỤC `blocks/`

### Phân loại block:
- **`module.block_*.php/.ini`**: Block chỉ xuất hiện khi đang ở trong module này
- **`global.block_*.php/.ini`**: Block có thể xuất hiện ở bất kỳ trang nào

### File `.ini` (XML config mặc định):
```xml
<?xml version="1.0" encoding="utf-8"?>
<block>
    <info>
        <name>Tên Block</name>
        <author>VinaDes.,Jsc</author>
        <website>https://vinades.vn</website>
        <description></description>
    </info>
    <config>
        <numrow>10</numrow>
        <!-- Các param config mặc định -->
    </config>
    <datafunction>nv_block_config_{blockname}</datafunction>
    <submitfunction>nv_block_config_{blockname}_submit</submitfunction>
</block>
```

### File `.php` (logic block):
```php
if (!defined('NV_MAINFILE')) { exit('Stop!!!'); }

if (!nv_function_exists('nv_{MODULE}_block_{blockname}')) {
    // Hàm render form config (hiện trong admin)
    function nv_block_config_{blockname}($module, $data_block, $lang_block) {
        $html = '...'; // HTML form config
        return $html;
    }

    // Hàm xử lý lưu config
    function nv_block_config_{blockname}_submit($module, $data_block) {
        // validate và return $data_block đã xử lý
        return $data_block;
    }

    // Hàm hiển thị block
    function nv_{MODULE}_block_{blockname}($module, $data_block, $lang_block) {
        // Query DB
        // XTemplate render
        return $contents;
    }
}
```

---

## CHI TIẾT THƯ MỤC `language/`

### Quy tắc đặt tên:
| Pattern | Ví dụ | Dùng cho |
|---------|-------|---------|
| `{lang}.php` | `vi.php` | Frontend `$lang_module` |
| `admin_{lang}.php` | `admin_vi.php` | Admin `$lang_module` |
| `data_{lang}.php` | `data_vi.php` | Cài đặt/dữ liệu |
| `block.module.block_{name}_{lang}.php` | `block.module.block_news_vi.php` | Block thuộc module |
| `block.global.block_{name}_{lang}.php` | `block.global.block_category_vi.php` | Block global |

### Cấu trúc file ngôn ngữ:
```php
if (!defined('NV_MAINFILE')) { exit('Stop!!!'); }

$lang_translator['author'] = 'VINADES.,JSC <contact@vinades.vn>';
$lang_translator['createdate'] = '...';
$lang_translator['copyright'] = '...';
$lang_translator['info'] = '';
$lang_translator['langtype'] = 'lang_module';

$lang_module['key'] = 'Giá trị';
// ...
```

Với `admin_{lang}.php` thêm guard:
```php
if (!defined('NV_ADMIN') or !defined('NV_MAINFILE')) { exit('Stop!!!'); }
```

---

## CHI TIẾT THƯ MỤC `Shared/` và `Log/`

### Namespace pattern:
```php
namespace NukeViet\Module\{MODULE}\Shared;

if (!defined('NV_MAINFILE')) { die('Stop!!!'); }

class Posts {
    const STATUS_DEACTIVE = 0;
    const STATUS_PUBLISH = 1;
    // ...
}
```

```php
namespace NukeViet\Module\{MODULE}\Log;

if (!defined('NV_MAINFILE')) { die('Stop!!!'); }

class Log {
    private $array = [];
    public function __construct($array) { $this->array = $array; return $this; }
    public function setSid($sid) { $this->array['sid'] = intval($sid); return $this; }
    // Method chaining pattern
    public function save() { /* INSERT vào DB */ }
}
```

```php
namespace NukeViet\Module\{MODULE}\Shared;
use NukeViet\Module\{MODULE}\Log\Log;

class Logs {
    const KEY_CHANGE_STATUS = 'change_status';
    public static function saveLogStatusPost($row_id, $status, $userid = 0) {
        $log = new Log([...]);
        $log->setSid($row_id)->setStatus($status)->setUserid($userid);
        return $log->save();
    }
}
```

---

## DATABASE TABLES (đặt tên)

Tất cả bảng theo pattern: `{prefix}_{lang}_{module_data}_{tên}`

| Bảng | Mô tả |
|------|-------|
| `_rows` | Bảng chính lưu nội dung (metadata) |
| `_detail` | Nội dung chi tiết (body HTML, tách riêng để tối ưu) |
| `_{catid}` | Bảng phân loại theo từng catid (VD: `_1`, `_2`) |
| `_cat` | Chuyên mục |
| `_topics` | Chủ đề/sự kiện |
| `_sources` | Nguồn tin |
| `_tags` | Tag (từ khóa) |
| `_tags_id` | Liên kết tag-nội dung |
| `_block` | Nội dung trong block đặc biệt |
| `_block_cat` | Nhóm block (block categories) |
| `_admins` | Phân quyền admin theo chuyên mục |
| `_author` | Thông tin tác giả |
| `_authorlist` | Liên kết tác giả-nội dung |
| `_voices` | Giọng đọc |
| `_logs` | Log thay đổi trạng thái |
| `_tmp` | Theo dõi ai đang sửa bài (tránh xung đột) |
| `_row_histories` | Lịch sử sửa nội dung |

---

## XTEMPLATE PATTERN (render giao diện)

```php
// Frontend (theme.php, funcs/)
$xtpl = new XTemplate('file.tpl', NV_ROOTDIR . '/themes/' . $module_info['template'] . '/modules/' . $module_info['module_theme']);

// Admin (admin/)
$xtpl = new XTemplate('file.tpl', NV_ROOTDIR . '/themes/' . $global_config['module_theme'] . '/modules/' . $module_file);

// Gán dữ liệu
$xtpl->assign('LANG', $lang_module);
$xtpl->assign('GLANG', $lang_global);
$xtpl->assign('KEY', $value);

// Vòng lặp
foreach ($data as $row) {
    $xtpl->assign('ROW', $row);
    $xtpl->parse('main.loop');
}

// Điều kiện
if ($condition) {
    $xtpl->parse('main.optional_block');
}

// Render
$xtpl->parse('main');
$contents = $xtpl->text('main');

// Admin: hiển thị với wrapper admin
include NV_ROOTDIR . '/includes/header.php';
echo nv_admin_theme($contents);
include NV_ROOTDIR . '/includes/footer.php';
```

---

## CHECKLIST TẠO MODULE MỚI

Khi tạo module `{MODULE}` mới, tạo đúng thứ tự sau:

**Bước 1 - File gốc bắt buộc:**
- [ ] `config.ini`
- [ ] `version.php`
- [ ] `action_mysql.php` (bảng DB)
- [ ] `global.functions.php`
- [ ] `functions.php`
- [ ] `admin.menu.php`
- [ ] `admin.functions.php`
- [ ] `theme.php`
- [ ] `index.html` (trong mỗi thư mục)

**Bước 2 - Language files (tối thiểu tiếng Việt + Anh):**
- [ ] `language/vi.php`, `language/en.php`
- [ ] `language/admin_vi.php`, `language/admin_en.php`
- [ ] `language/data_vi.php`, `language/data_en.php`

**Bước 3 - Admin controllers:**
- [ ] `admin/main.php` (bắt buộc - danh sách)
- [ ] `admin/content.php` (bắt buộc - thêm/sửa)
- [ ] `admin/setting.php` (bắt buộc - cài đặt)
- [ ] `admin/cat.php` + `admin/change_cat.php` + `admin/del_cat.php` + `admin/list_cat.php`
- [ ] Các file action khác tùy tính năng

**Bước 4 - Frontend controllers:**
- [ ] `funcs/main.php` (bắt buộc)
- [ ] `funcs/viewcat.php` (bắt buộc nếu có chuyên mục)
- [ ] `funcs/detail.php` (bắt buộc nếu có chi tiết)
- [ ] Các file khác tùy tính năng

**Bước 5 - Templates:**
- [ ] Admin templates trong `themes/admin_default/modules/{MODULE}/`
- [ ] Frontend templates trong `themes/default/modules/{MODULE}/`

**Bước 6 - Blocks (nếu cần):**
- [ ] File `.php` + `.ini` cho từng block
- [ ] Language files cho từng block

**Bước 7 - Shared classes (nếu cần):**
- [ ] `Shared/Posts.php` (hằng số status)
- [ ] `Log/Log.php` + `Shared/Logs.php` (nếu cần ghi log)

---

## LỖI THƯỜNG GẶP - KHÔNG LÀM

1. **KHÔNG** đặt hàm hiển thị giao diện vào `global.functions.php` → Phải vào `theme.php`
2. **KHÔNG** đặt hàm admin-only vào `global.functions.php` → Phải vào `admin.functions.php`
3. **KHÔNG** đặt logic xử lý form vào `funcs/` → Phải vào `admin/`
4. **KHÔNG** đặt controller trang frontend vào `admin/` → Phải vào `funcs/`
5. **KHÔNG** dùng guard `NV_IS_FILE_ADMIN` trong `funcs/` → Phải dùng `NV_IS_MOD_{MODULE_UPPER}`
6. **KHÔNG** quên file `index.html` trong mỗi thư mục con
7. **KHÔNG** đặt template `.tpl` trong `modules/{MODULE}/` mà phải trong `themes/`
8. **KHÔNG** dùng `exit()` trong Shared/ và Log/ classes → Phải dùng `die()`
9. **KHÔNG** đặt block language trực tiếp trong `language/` mà cần đặt tên theo pattern `block.{scope}.{blockname}_{lang}.php`
10. **KHÔNG** tạo thư mục mới ngoài cấu trúc hiện có
