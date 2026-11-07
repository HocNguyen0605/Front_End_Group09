const now = Date.now();
// Dữ liệu giả
export const MOCK_ARTICLES = [
    {
        id: "mock-article-001",
        title: "Nhiều hoạt động văn hóa được tổ chức nhằm kết nối cộng đồng",
        description:
            "Các hoạt động văn hóa, nghệ thuật và sinh hoạt cộng đồng đang được quan tâm, góp phần tạo thêm không gian giao lưu cho người dân.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-001",
        authors: ["Nguyễn Minh Anh"],
        publishedAt: now - 30 * 60 * 1000,
        feedCategory: "Thời sự",
    },
    {
        id: "mock-article-002",
        title: "Các quốc gia tăng cường hợp tác trong nhiều lĩnh vực",
        description:
            "Những chương trình hợp tác mới mở ra thêm cơ hội trao đổi kinh nghiệm và thúc đẩy phát triển giữa các quốc gia.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-002",
        authors: ["Trần Hoàng Nam"],
        publishedAt: now - 60 * 60 * 1000,
        feedCategory: "Thế giới",
    },
    {
        id: "mock-article-003",
        title: "Xu hướng sống xanh ngày càng được nhiều gia đình quan tâm",
        description:
            "Việc thay đổi thói quen sinh hoạt và sử dụng các sản phẩm thân thiện với môi trường đang trở thành lựa chọn của nhiều gia đình.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-003",
        authors: ["Lê Thu Hà"],
        publishedAt: now - 2 * 60 * 60 * 1000,
        feedCategory: "Đời sống",
    },
    {
        id: "mock-article-004",
        title: "Nhiều hoạt động thể thao hướng đến cộng đồng trẻ",
        description:
            "Các chương trình thể thao cộng đồng tạo điều kiện để người trẻ tham gia vận động, giao lưu và rèn luyện kỹ năng.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-004",
        authors: ["Phạm Quốc Huy"],
        publishedAt: now - 3 * 60 * 60 * 1000,
        feedCategory: "Thể thao",
    },
    {
        id: "mock-article-005",
        title: "Đổi mới phương pháp học tập trong môi trường giáo dục hiện đại",
        description:
            "Nhiều phương pháp học tập mới được áp dụng nhằm khuyến khích khả năng tự học, tư duy phản biện và sáng tạo của học sinh.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-005",
        authors: ["Nguyễn Thu Trang"],
        publishedAt: now - 5 * 60 * 60 * 1000,
        feedCategory: "Giáo dục",
    },
    {
        id: "mock-article-006",
        title: "Doanh nghiệp chú trọng chuyển đổi số trong hoạt động kinh doanh",
        description:
            "Việc ứng dụng công nghệ vào quản lý và vận hành đang trở thành một trong những hướng phát triển được nhiều doanh nghiệp quan tâm.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-006",
        authors: ["Đỗ Thành Công"],
        publishedAt: now - 8 * 60 * 60 * 1000,
        feedCategory: "Kinh doanh",
    },
    {
        id: "mock-article-007",
        title: "Chủ động xây dựng thói quen chăm sóc sức khỏe mỗi ngày",
        description:
            "Duy trì chế độ sinh hoạt hợp lý, vận động thường xuyên và khám sức khỏe định kỳ là những yếu tố quan trọng đối với mỗi người.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-007",
        authors: ["Hoàng Ngọc"],
        publishedAt: now - 12 * 60 * 60 * 1000,
        feedCategory: "Sức khỏe",
    },
    {
        id: "mock-article-008",
        title: "Công nghệ mới mở ra nhiều cơ hội trong học tập và làm việc",
        description:
            "Những ứng dụng công nghệ mới đang hỗ trợ người dùng tiếp cận thông tin, nâng cao hiệu quả học tập và tối ưu quy trình làm việc.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-008",
        authors: ["Vũ Minh Đức"],
        publishedAt: now - 24 * 60 * 60 * 1000,
        feedCategory: "Công nghệ",
    },
    {
        id: "mock-article-009",
        title: "Khám phá những điểm đến hấp dẫn trong hành trình du lịch",
        description:
            "Các điểm đến có cảnh quan thiên nhiên và bản sắc văn hóa riêng tiếp tục thu hút sự quan tâm của những người yêu thích khám phá.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-009",
        authors: ["Bùi Lan Anh"],
        publishedAt: now - 2 * 24 * 60 * 60 * 1000,
        feedCategory: "Du lịch",
    },
    {
        id: "mock-article-010",
        title: "Nghiên cứu khoa học góp phần giải quyết những vấn đề thực tiễn",
        description:
            "Các hoạt động nghiên cứu và ứng dụng khoa học đang hướng đến việc giải quyết những nhu cầu thiết thực trong đời sống.",
        imageUrl: null,
        sourceUrl: "https://example.com/mock-articles/mock-article-010",
        authors: ["Trần Minh Khoa"],
        publishedAt: now - 5 * 24 * 60 * 60 * 1000,
        feedCategory: "Khoa học",
    },
]