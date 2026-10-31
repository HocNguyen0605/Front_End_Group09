//Chuoi cua rss -> date
function toDate(value){
    if (!value) return null;
    //Chuyển về ISO 8601 của Date
    if (typeof value ==="string" && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(value)){
        value.replace(" ", "T");
    }
    const date = new Date(value);
    return Number.isNaN(date.getDate())? null : date;
}

//Format ngay
export function formatDate(value) {
    const date = toDate(value);
    return date ? date.toLocaleDateString("vi-VN") : "";
}

//Format giờ phút
export function timeAgo(value) {
    const date = toDate(value);
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (!date) return "";
    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    return formatDate(value);
}