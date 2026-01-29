const formatMap = new Map([
    ["png", "PNG"],
    ["mp3", "MP3"],
    ["mp4", "MP4"],
    ["webm", "WEBM"],
    ["wav", "WAV"],
    ["jpg", "JPG"]
]);

const getCompatibleFormats = (inputFormat) => {
    switch (inputFormat) {
        case "PNG":
            return ["JPG"];
        case "JPG":
            return ["PNG"];
        case "MP3":
            return ["WAV"];
        case "WAV":
            return ["MP3"];
        case "MP4":
            return ["WEBM"];
        case "WEBM":
            return ["MP4"];
        default:
            return [];
    }
};