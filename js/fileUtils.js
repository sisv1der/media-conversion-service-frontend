import { formats } from './formats.js';

const getInputFormat = (formData) => {
    const file = formData.get("file");
    if (!(file instanceof File)) {
        throw new Error("Выбран некорректный файл");
    }

    const filename = (file.name || "").toLowerCase();
    const extension = filename.split('.').pop();

    if (!(extension in formats)) {
        throw new Error("Неподдерживаемый формат файла");
    }

    return formats[extension];
};

const getOutputFormat = (formData) => {
    const outputFormatRaw = formData.get("outputFormat");
    const outputFormat = String(outputFormatRaw || "").toLowerCase();
    if (!(outputFormat in formats)) {
        throw new Error("Выбран некорректный формат для конвертации");
    }


    return formats[extension];
};

const processFileName = (file, outputFormat) => {
    const filename = (file.name || "").toLowerCase();
    const baseName = filename.includes('.') ? filename.substring(0, filename.lastIndexOf('.')) : filename;
    return `${baseName}.${outputFormat.toLowerCase()}`;
};

const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}