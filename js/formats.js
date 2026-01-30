export const formats = {
    png: "PNG",
    mp3: "MP3",
    mp4: "MP4",
    webm: "WEBM",
    wav: "WAV",
    jpg: "JPG"
};

const compatibleFormats = {
    PNG: ['JPG'],
    JPG: ['PNG'],
    MP3: ['WAV'],
    WAV: ['MP3'],
    MP4: ['WEBM'],
    WEBM: ['MP4']
}

export const getCompatibleFormats = (inputFormat) => compatibleFormats[inputFormat.toUpperCase()] || [];