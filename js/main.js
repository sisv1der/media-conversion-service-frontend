import { getInputFormat, getOutputFormat, processFileName} from './fileUtils.js'

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
        const filename = processFileName(formData.get("file").name, outputFormat);
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