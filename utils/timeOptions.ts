export function convertNumberToTime(seconds: number) {
    // Tính toán số phút và số giây còn lại
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Định dạng số giây luôn có hai chữ số
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    // Trả về chuỗi định dạng phút:giây
    return `${minutes}:${formattedSeconds}`;
}