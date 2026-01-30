import { formatMap } from './formats.js';

const getInputFormat = (formData) => {
    const file = formData.get("file");
    if (!(file instanceof File)) {
        throw new Error("Выбран некорректный файл");
    }

    const filename = (file.name || "").toLowerCase();
    const extension = filename.split('.').pop();
    const mapped = formatMap.get(extension);
    if (!mapped) {
        throw new Error("Неподдерживаемый формат файла");
    }

    return mapped;
};

const getOutputFormat = (formData) => {
    const outputFormatRaw = formData.get("outputFormat");
    const outputFormat = String(outputFormatRaw || "").toLowerCase();
    if (!formatMap.has(outputFormat)) {
        throw new Error("Выбран некорректный формат для конвертации");
    }

    return extensionMap.get(outputFormat);
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