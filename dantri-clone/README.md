# Dân trí Clone

Đồ án môn học: xây dựng trang tin tức mô phỏng báo **Dân trí** bằng **React**, lấy dữ liệu bài viết từ **RSS** do báo cung cấp.

- Nhóm: 3 thành viên
- Thời gian: 4 tuần
- Nguồn tin: RSS của [dantri.com.vn](https://dantri.com.vn) (kiểm tra lại link RSS ở chân trang chủ của báo vì có thể thay đổi)

---

## Mục lục

1. [Công nghệ sử dụng](#1-công-nghệ-sử-dụng)
2. [Môi trường phát triển](#2-môi-trường-phát-triển)
3. [Các bước chuẩn bị](#3-các-bước-chuẩn-bị)
4. [Chạy dự án (dành cho thành viên mới clone về)](#4-chạy-dự-án-dành-cho-thành-viên-mới-clone-về)
5. [Cấu trúc thư mục](#5-cấu-trúc-thư-mục)
6. [Công dụng từng thư mục và cách tái sử dụng](#6-công-dụng-từng-thư-mục-và-cách-tái-sử-dụng)
7. [Luồng dữ liệu](#7-luồng-dữ-liệu)
8. [Quy ước làm việc nhóm](#8-quy-ước-làm-việc-nhóm)
9. [Giải thích nhanh các khái niệm](#9-giải-thích-nhanh-các-khái-niệm)
10. [Tài liệu tham khảo](#10-tài-liệu-tham-khảo)

---

## 1. Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| React | Thư viện xây dựng giao diện |
| Vite | Công cụ tạo và chạy dự án (nhanh, nhẹ) |
| React Router DOM | Chuyển trang trong ứng dụng SPA |
| ESLint | Kiểm tra lỗi và quy tắc viết code |
| RSS | Nguồn dữ liệu tin tức từ báo |
| Git / GitHub | Quản lý mã nguồn, làm việc nhóm |

---

## 2. Môi trường phát triển

Thông tin môi trường của nhóm trưởng khi khởi tạo dự án:

| Thành phần | Phiên bản / ghi chú |
|---|---|
| IDE | IntelliJ IDEA **Ultimate** (bản sinh viên), có hỗ trợ React/JSX sẵn |
| Node.js | **LTS 26** |
| npm | Đi kèm Node.js |
| Git | Bản mới nhất |
| Trình tạo dự án | `create-vite`, có bật **ESLint** |

---

## 3. Các bước chuẩn bị

### Bước 0: Kiểm tra máy đã có gì

Mở Terminal trong IntelliJ (`Alt + F12`) rồi gõ lần lượt:

```bash
node -v
npm -v
git --version
```

- Hiện số phiên bản: đã có.
- Báo `not recognized` hoặc `command not found`: chưa cài, xem bước 1.
- Node nên là bản **LTS mới** (Vite cần Node khá mới, tối thiểu 20 trở lên).

### Bước 1: Cài thứ còn thiếu

- **Node.js**: tải bản **LTS** tại [nodejs.org](https://nodejs.org), cài mặc định. Cài xong **đóng và mở lại Terminal**.
- **Git**: tải tại [git-scm.com](https://git-scm.com), cài mặc định.

### Bước 2: Kiểm tra IntelliJ hỗ trợ React

- Vào `Help > About`, xác nhận là bản **Ultimate**.
- Vào `File > Settings > Plugins > Installed`, đảm bảo plugin **JavaScript and TypeScript** đang bật.
- Kiểm tra nhanh: mở `App.jsx`, thẻ JSX như `<div>` được tô màu và có gợi ý code là ổn.

### Bước 3: Tạo project bằng Vite

Đứng ở thư mục muốn chứa project, chạy:

```bash
npm create vite@latest dantri-clone -- --template react
```

Khi được hỏi:

- Hỏi cài `create-vite`: gõ **`y`**.
- Hỏi có dùng **ESLint** không: **chọn có (ESLint)**.

Sau đó:

```bash
cd dantri-clone
npm install
npm run dev
```

Terminal in ra địa chỉ dạng `http://localhost:5173/`. Mở trên trình duyệt thấy trang mẫu Vite + React là thành công. Nhấn `Ctrl + C` để dừng server.

Mở thư mục `dantri-clone` trong IntelliJ bằng `File > Open` (chọn thư mục gốc, nơi có `package.json`).

### Bước 4: Cài thư viện

Thư viện **bắt buộc**:

```bash
npm install react-router-dom
```

Thư viện **tùy chọn** (chỉ cài khi nhóm thật sự cần):

```bash
npm install dayjs          # xử lý ngày giờ ("5 phút trước")
npm install react-icons    # bộ icon (tìm kiếm, menu, tim...)
```

Không cần cài thêm cho việc gọi RSS: dùng `fetch` và `DOMParser` có sẵn của trình duyệt, hoặc dùng dịch vụ chuyển RSS sang JSON.

---

## 4. Chạy dự án (dành cho thành viên mới clone về)

```bash
git clone https://github.com/<tai-khoan>/dantri-clone.git
cd dantri-clone
npm install
npm run dev
```

Tạo nhánh riêng trước khi làm việc:

```bash
git checkout -b feature/ten-tinh-nang
```

Các lệnh thường dùng:

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Chạy dự án ở máy (có tự tải lại khi sửa code) |
| `npm run lint` | Kiểm tra lỗi code bằng ESLint |
| `npm run build` | Đóng gói bản chạy thật |
| `npm run preview` | Xem thử bản đã build |

> Sau mỗi lần `git pull` mà gặp lỗi thiếu thư viện, chạy lại `npm install`.

---

## 5. Cấu trúc thư mục

```
dantri-clone/
├── public/                          # Tệp tĩnh (favicon...)
├── src/
│   ├── assets/                      # Logo, icon, ảnh thay thế
│   ├── config/
│   │   ├── categories.js            # Danh sách chuyên mục + link RSS (nguồn duy nhất)
│   │   └── constants.js             # Số bài mỗi trang, tên key localStorage...
│   ├── services/
│   │   └── rssService.js            # Gọi RSS, chuyển sang JSON, chuẩn hóa dữ liệu
│   ├── hooks/
│   │   ├── useFetchRss.js           # Trả về { articles, loading, error }
│   │   ├── useLocalStorage.js       # Đọc/ghi localStorage (bài yêu thích...)
│   │   └── useDebounce.js           # Trì hoãn giá trị (dùng cho ô tìm kiếm)
│   ├── utils/
│   │   ├── formatDate.js            # Định dạng ngày
│   │   ├── extractImage.js          # Lấy ảnh từ phần mô tả của RSS
│   │   └── stripHtml.js             # Bỏ thẻ HTML khỏi chuỗi
│   ├── components/                  # CHUNG: dùng từ 2 trang trở lên
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── MainLayout.jsx       # Header + <Outlet /> + Footer
│   │   ├── article/
│   │   │   ├── ArticleCard/         # Thẻ bài, có biến thể: large, medium, small, horizontal
│   │   │   └── ArticleList/         # Danh sách thẻ bài
│   │   └── ui/
│   │       ├── Loading/
│   │       ├── ErrorMessage/
│   │       ├── SectionTitle/
│   │       ├── Pagination/
│   │       └── SafeImage/           # Ảnh lỗi thì hiện ảnh thay thế
│   ├── pages/                       # RIÊNG: mỗi trang một thư mục
│   │   ├── Home/
│   │   │   ├── index.jsx
│   │   │   └── components/          # Phần chỉ trang chủ dùng (HeroSection, LatestNews...)
│   │   ├── Category/
│   │   │   ├── index.jsx
│   │   │   └── components/
│   │   ├── ArticleDetail/
│   │   │   ├── index.jsx
│   │   │   └── components/          # ArticleContent, RelatedArticles
│   │   ├── Search/
│   │   ├── Saved/                   # Bài đã lưu
│   │   └── NotFound/
│   ├── routes/
│   │   └── AppRoutes.jsx            # Khai báo đường dẫn nào hiện trang nào
│   ├── styles/
│   │   └── global.css               # Biến màu, font, reset
│   ├── App.jsx
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

Mỗi component nên là một thư mục nhỏ để gọn khi làm song song:

```
ArticleCard/
├── ArticleCard.jsx
├── ArticleCard.module.css
└── index.js          # export default từ ArticleCard.jsx
```

---

## 6. Công dụng từng thư mục và cách tái sử dụng

Hình dung một nhà hàng: `services` là nhà kho lấy nguyên liệu, `utils` và `hooks` là dụng cụ bếp dùng chung, `components` là bát đĩa dùng cho mọi món, `pages` là từng món hoàn chỉnh, `config` và `routes` là thực đơn.

### `config/`: cấu hình cố định

Chứa dữ liệu không thay đổi khi chạy, ví dụ danh sách chuyên mục và link RSS.

```js
// config/categories.js
export const CATEGORIES = [
  { slug: "the-thao", name: "Thể thao", rss: "https://dantri.com.vn/rss/the-thao.rss" },
  { slug: "giao-duc", name: "Giáo dục", rss: "https://dantri.com.vn/rss/giao-duc.rss" },
];
```

**Tái sử dụng:** `Navbar` đọc file này để vẽ menu, `Footer` để vẽ danh sách link, `rssService` để biết gọi link nào. Muốn thêm chuyên mục chỉ sửa một chỗ, cả web tự cập nhật.

### `services/`: lấy dữ liệu từ bên ngoài

Chỉ làm một việc: gọi RSS, chuyển thành dạng gọn rồi trả về. Không chứa giao diện.

**Tái sử dụng:** trang chủ, trang chuyên mục, trang tìm kiếm đều gọi chung một hàm. Sau này đổi cách lấy dữ liệu (ví dụ chuyển sang backend riêng) chỉ sửa trong thư mục này.

### `hooks/`: logic dùng lại, không có giao diện

Hook là hàm gói sẵn một đoạn logic React (`useState`, `useEffect`).

```js
// Mỗi trang chỉ cần một dòng:
const { articles, loading, error } = useFetchRss(url);
```

**Tái sử dụng:** không phải viết lại `useState/useEffect/loading/error` ở nhiều trang.

### `utils/`: hàm tiện ích nhỏ

Hàm JavaScript thuần, không liên quan React (định dạng ngày, bỏ thẻ HTML, lấy ảnh từ mô tả).

**Tái sử dụng:** `ArticleCard`, trang chi tiết, bài liên quan đều dùng chung `formatDate`.

### `components/`: giao diện dùng chung

Quy tắc: component **nhận dữ liệu qua props**, không tự biết dữ liệu đến từ đâu, nhờ vậy đặt ở đâu cũng dùng được.

- `layout/`: khung trang (Header, Navbar, Footer, MainLayout), có mặt ở mọi trang.
- `article/`: mọi thứ liên quan đến bài viết (thẻ bài, danh sách bài).
- `ui/`: mảnh nhỏ không liên quan tin tức (Loading, phân trang, thông báo lỗi, ảnh an toàn).

`ArticleCard` là component quan trọng nhất, viết **một lần** và dùng nhiều nơi bằng prop `variant`:

| Chỗ dùng | Cách gọi |
|---|---|
| Tin nổi bật trang chủ | `<ArticleCard variant="large" article={a} />` |
| Danh sách chuyên mục | `<ArticleCard variant="horizontal" article={a} />` |
| Bài liên quan | `<ArticleCard variant="small" article={a} />` |
| Trang tìm kiếm, trang đã lưu | `<ArticleCard variant="horizontal" article={a} />` |

### `pages/`: từng trang hoàn chỉnh

Mỗi trang **lắp ráp** từ hook và component chung. Thư mục `components/` bên trong trang chứa những phần chỉ trang đó dùng.

```jsx
function Category() {
  const { slug } = useParams();
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const { articles, loading, error } = useFetchRss(cat.rss);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;
  return <ArticleList articles={articles} />;
}
```

Trang ngắn gọn vì chỉ ghép các thứ có sẵn. Đó là dấu hiệu cấu trúc tốt.

### `routes/`: bản đồ đường dẫn

```jsx
<Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/category/:slug" element={<Category />} />
  <Route path="/article/:id" element={<ArticleDetail />} />
  <Route path="*" element={<NotFound />} />
</Route>
```

`MainLayout` bọc bên ngoài nên Header và Footer chỉ viết một lần nhưng hiện ở mọi trang.

### `assets/` và `styles/`

`assets/` chứa logo, icon, ảnh thay thế. `styles/global.css` chứa màu chủ đạo, font, khoảng cách dùng chung (nên dùng biến CSS) để giao diện của cả nhóm đồng nhất.

### Quy tắc nhanh: đặt file ở đâu?

1. Dữ liệu cố định (danh sách, link) → `config/`
2. Gọi mạng/API → `services/`
3. Logic có `useState/useEffect` và dùng lại nhiều chỗ → `hooks/`
4. Hàm thường, không liên quan React → `utils/`
5. Giao diện dùng từ 2 trang trở lên → `components/`
6. Giao diện chỉ 1 trang dùng → `pages/TênTrang/components/`
7. Một trang đầy đủ → `pages/`

---

## 7. Luồng dữ liệu

```
config (link RSS)
    ↓
services (gọi RSS, chuẩn hóa)
    ↓
hooks (quản lý loading / error)
    ↓
pages (ghép lại)
    ↓
components (hiển thị)
```

Mỗi tầng chỉ làm việc với tầng sát nó. Ví dụ `ArticleCard` không biết RSS là gì, chỉ nhận một bài viết và vẽ ra.

---

## 8. Quy ước làm việc nhóm

- **Không push trực tiếp lên `main`.** Mỗi người làm trên nhánh riêng (`feature/header`, `feature/rss`...), xong tạo Pull Request vào `main`, người khác xem rồi mới gộp.
- **Commit thường xuyên**, `git pull` code mới về trước khi làm tiếp để tránh xung đột lớn.
- **Mỗi người dùng tài khoản GitHub của mình** để commit, thể hiện rõ đóng góp.
- **Đặt tên:** component và file component viết hoa chữ đầu (`ArticleCard.jsx`), hook bắt đầu bằng `use` (`useFetchRss.js`), hàm tiện ích viết thường chữ đầu (`formatDate.js`).
- **Chia việc theo tính năng**, tránh nhiều người cùng sửa một file.
- **Họp ngắn 2 đến 3 lần mỗi tuần** (khoảng 15 phút): báo ai đang làm gì, vướng gì.
- Chạy `npm run lint` trước khi tạo Pull Request.

---

## 9. Giải thích nhanh các khái niệm

**RSS là gì?** Định dạng XML mà báo dùng để công bố danh sách bài mới nhất (tiêu đề, mô tả ngắn, link, ảnh, ngày đăng). Ứng dụng lấy link RSS về, đọc dữ liệu và tự hiển thị. RSS **chỉ dùng để lấy dữ liệu**, còn giao diện hoàn toàn do React làm. RSS thường không có đầy đủ nội dung bài, nên trang chi tiết thường hiện mô tả và có nút "Đọc bài gốc".

**SPA (Single Page Application) là gì?** Cả website chỉ có **một file HTML** (`index.html`), tải một lần. Khi bấm sang trang khác, JavaScript thay nội dung ngay trên trang hiện tại mà không tải lại. "Page" trong thư mục `pages/` thực chất là một component lớn đại diện cho một màn hình.

**React Router hoạt động thế nào?** Khi bấm menu, Router chặn việc tải trang mới, đổi URL, xem URL khớp với `Route` nào rồi thay component hiển thị. Header và Footer đứng yên, chỉ phần giữa (`<Outlet />`) đổi.

**Giao diện được dựng ra sao?** File `index.html` gần như trống, chỉ có thẻ `<div id="root">`. Khi chạy, React tạo giao diện từ các component rồi chèn vào `#root` bằng JavaScript. Khi dữ liệu đổi, React chỉ cập nhật đúng phần thay đổi. Cách này gọi là Client-Side Rendering.

**Nhược điểm của SPA:** SEO yếu hơn vì HTML ban đầu trống, và lần tải đầu hơi chậm. Báo điện tử thật thường dùng SSR (như Next.js) để khắc phục. Với đồ án này, SPA là đủ.

---

## 10. Tài liệu tham khảo

- [React](https://react.dev)
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com)
- [ESLint](https://eslint.org)
