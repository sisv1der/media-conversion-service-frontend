import { getInputFormatFromFormData, getOutputFormat, processFilename, downloadFile, getInputFormatFromFile } from './fileUtils.js'
import { convertFile } from './api.js'
import { updateList, clearList } from './uiUtils.js'
import { getCompatibleFormats } from './formats.js'

const handleFileUpload = async (form) => {
    const formData = new FormData(form);

    const inputFormat = getInputFormatFromFormData(formData);
    const outputFormat = getOutputFormat(formData);
    const filename = processFilename(formData.get("file").name, outputFormat);

    formData.set('inputFormat', inputFormat);
    formData.set('outputFormat', outputFormat);

    const blob = await convertFile(formData);
    downloadFile(blob, filename);
}

document
    .getElementById('fileUploadForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault();

        const form = event.target;
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        handleFileUpload(form)
            .catch(err => {
                console.error(err);
                alert(err.message || 'Произошла ошибка');    
            })
            .finally(() => { 
                if (submitBtn) submitBtn.disabled = false;
            });
    });
    
const handleFileSelect = (file, ul) => {
    const format = getInputFormatFromFile(file);
    const compatibleFormats = getCompatibleFormats(format);
    if (compatibleFormats.length === 0) {
        clearList(ul);
        throw new Error('Допустимых форматов нет');
    }

    updateList(ul, compatibleFormats);
}

document
    .querySelector('input[type="file"]')
    .addEventListener('change', (event) => {
        const div = document.getElementById('selector');
        const ul = div.querySelector('ul');
        const file = event.target.files[0];

        try {
            handleFileSelect(file, ul);
        }
        catch (err) {
            console.error(err);
            alert(err.message || 'Произошла ошибка');        
        }
    });