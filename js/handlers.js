import { getInputFormatFromFormData, getOutputFormat, processFilename, downloadFile, getInputFormatFromFile } from './fileUtils.js'
import { convertFile } from './api.js'
import { updateList, clearList } from './uiUtils.js'
import { getCompatibleFormats } from './formats.js'

const handleFileSelect = (file, ul) => {
    const format = getInputFormatFromFile(file);
    const compatibleFormats = getCompatibleFormats(format);
    if (compatibleFormats.length === 0) {
        clearList(ul);
        throw new Error('Допустимых форматов нет');
    }

    updateList(ul, compatibleFormats);
}

const handleFileUpload = async (form, div) => {
    const formData = new FormData(form);
    const inputFormat = getInputFormatFromFormData(formData);
    const outputFormat = getOutputFormat(div.dataset.selectedFormat);
    const filename = processFilename(formData.get("file").name, outputFormat);

    formData.set('inputFormat', inputFormat);
    formData.set('outputFormat', outputFormat);

    const blob = await convertFile(formData);
    downloadFile(blob, filename);
}