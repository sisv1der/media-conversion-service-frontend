const extensionMap = new Map([
    ["png", "PNG"],
    ["mp3", "MP3"],
    ["mp4", "MP4"],
    ["webm", "WEBM"],
    ["wav", "WAV"],
    ["jpg", "JPG"]
]);

const getInputFormat = (formData) => {
    const file = formData.get("file");
    if (!(file instanceof File)) {
        throw new Error("Выбран некорректный файл");
    }

    const filename = (file.name || "").toLowerCase();
    const extension = filename.split('.').pop();
    const mapped = extensionMap.get(extension);
    if (!mapped) {
        throw new Error("Неподдерживаемый формат файла");
    }

    return mapped;
};

const getOutputFormat = (formData) => {
    const outputFormatRaw = formData.get("outputFormat");
    const outputFormat = String(outputFormatRaw || "").toLowerCase();
    if (!extensionMap.has(outputFormat)) {
        throw new Error("Выбран некорректный формат для конвертации");
    }

    return extensionMap.get(outputFormat);
};

document.getElementById('fileUploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
    }

    try {
        const formData = new FormData(form);

        const inputFormat = getInputFormat(formData);
        const outputFormat = getOutputFormat(formData);
        const filename = `${formData.get("file").name}.${outputFormat.toLowerCase()}`;
        
        formData.set('inputFormat', inputFormat);
        formData.set('outputFormat', outputFormat);

        const API_ENDPOINT = 'http://localhost:8080/convert';

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Конвертация не удалась');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error(err);
        alert(err.message || 'Произошла ошибка');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }
});