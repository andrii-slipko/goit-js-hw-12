import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const renderImages = (images) => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.insertAdjacentHTML('beforeend', images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="list-item">
            <a href="${largeImageURL}" class="gallery-item">
                <img src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="info">
                <span>Likes: ${likes}</span>
                <span>Views: ${views}</span>
                <span>Comments: ${comments}</span>
                <span>Downloads: ${downloads}</span>
            </div>
        </li>
    `).join(''));
};

export const showLoading = () => {
    document.getElementById('loading').style.display = 'block';
};

export const hideLoading = () => {
    document.getElementById('loading').style.display = 'none';
};

export const showError = (message) => {
    iziToast.error({
        title: 'Error',
        message: message,
    });
};

export const showWarning = (message) => {
    iziToast.warning({
        title: 'Attention',
        message: message,
    });
};

export const clearResults = () => {
    document.getElementById('results').innerHTML = '';
};