const API_ENDPOINT = 'http://localhost:8080';

export const convertFile = async (formData) => {
    const CONVERSION_ENDPOINT = API_ENDPOINT + '/convert';

    const response = await fetch(CONVERSION_ENDPOINT, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Конвертация не удалась');
    }

    return response.blob();
};