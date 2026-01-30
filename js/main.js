import { getInputFormat, getOutputFormat, processFileName, downloadFile} from './fileUtils.js'
import { convertFile } from './api.js'

const handleFileUpload = async (form) => {
    const formData = new FormData(form);

    const inputFormat = getInputFormat(formData);
    const outputFormat = getOutputFormat(formData);
    const filename = processFileName(formData.get("file").name, outputFormat);

    formData.set('inputFormat', inputFormat);
    formData.set('outputFormat', outputFormat);

    const blob = await convertFile(formData);
    downloadFile(blob, filename);
}

document.getElementById('fileUploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    handleFileUpload(form)
        .catch(err => {
            console.error(err);
            alert(err.message || 'Произошла ошибка');    
        })
        .finally( () => { 
            if (submitBtn) submitBtn.disabled = false;
        });
});