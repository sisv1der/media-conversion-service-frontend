import { handleFileSelect, handleFileUpload } from './handlers.js'

document
    .getElementById('fileUploadForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault();

        const form = event.target;
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        
        const div = document.getElementById('selector');

        handleFileUpload(form, div)
            .catch(err => {
                console.error(err);
                alert(err.message || 'Произошла ошибка');    
            })
            .finally(() => { 
                if (submitBtn) submitBtn.disabled = false;
            });
    });

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

document
    .getElementById('selector')
    .querySelector('ul')
    .addEventListener('click', (event) => {
        const li = event.target.closest('li');
        if (!li) return;
        const div = document.getElementById('selector');
        
        const format = li.dataset.format;
        div.dataset.selectedFormat = format;
    });