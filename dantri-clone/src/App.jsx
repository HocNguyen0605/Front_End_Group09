import { formatDate, timeAgo } from "./utils/formatDate";

const html = '<a href="#"><img src="https://example.com/a.jpg"></a>Nội dung <b>tin</b>';
console.log(formatDate("2026-10-30 10:00:00")); // "30/10/2026"
console.log(timeAgo(new Date().toISOString()));