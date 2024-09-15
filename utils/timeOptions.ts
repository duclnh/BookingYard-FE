export function convertNumberToTime(seconds: number) {
    // Tính toán số phút và số giây còn lại
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Định dạng số giây luôn có hai chữ số
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    // Trả về chuỗi định dạng phút:giây
    return `${minutes}:${formattedSeconds}`;
}

export function checkValidateTime(timeOpen: string, timClose: string) {
    try {
        if (timeOpen.length < 0 || timClose.length < 0) {
            return true;
        }
        const openHours = timeOpen.split(":")
        const closeHours = timClose.split(":")
        if (parseInt(openHours[0]) < parseInt(closeHours[0]))
            return false
    } catch {
        return false
    }
    return true
}

export function convertToStartTimeAndEndTime(timeOpen: string, timClose: string) {
    try {
        if (timeOpen.length < 0 || timClose.length < 0) {
            return {
                startTime: 0,
                endTime: 0,
            }
        }
        const openHours = timeOpen.split(":")
        const closeHours = timClose.split(":")
        if (parseInt(openHours[0]) < parseInt(closeHours[0]))
            return {
                startTime: parseInt(openHours[0]),
                endTime: parseInt(closeHours[0]),
            }

    } catch {
        return {
            startTime: 0,
            endTime: 0,
        }
    }
    return {
        startTime: 0,
        endTime: 0,
    }
}