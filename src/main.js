import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showLoading, hideLoading, showError, showWarning, clearResults } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';

let currentPage = 1;
let currentQuery = '';

const searchForm = document.querySelector('#searchForm');
const loadMoreButton = document.createElement('button');
loadMoreButton.textContent = 'Load more';
loadMoreButton.style.display = 'none';
loadMoreButton.classList.add('load-more-button');
document.body.append(loadMoreButton);

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const queryInput = document.getElementById('searchQuery');
    const query = queryInput.value.trim();

    if (query === "") {
        showWarning('Fill this field!');
        return;
    }

    currentQuery = query;
    currentPage = 1;
    clearResults();
    showLoading();

    try {
        const data = await fetchImages(currentQuery, currentPage);
        
        if (data.hits.length === 0) {
            showError('Sorry, there are no images matching your search query. Please try again!');
            loadMoreButton.style.display = 'none';
        } else {
            renderImages(data.hits);
            const lightbox = new SimpleLightbox('.gallery a');
            lightbox.refresh();
            loadMoreButton.style.display = 'block';

            
            

            if (data.totalHits <= 15) {
                loadMoreButton.style.display = 'none';
                showError("We're sorry, but you've reached the end of search results.");
            }
        }
    } catch (error) {
        showError('Щось пішло не так. Спробуйте ще раз.');
        console.error('Error fetching data:', error);
    } finally {
        hideLoading();
        queryInput.value = '';
    }
});

loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    showLoading();

    try {
        const data = await fetchImages(currentQuery, currentPage);
        if (data.hits.length === 0) {
            loadMoreButton.style.display = 'none';
            showError("We're sorry, but you've reached the end of search results.");
        } else {
            renderImages(data.hits);
            const lightbox = new SimpleLightbox('.gallery a');
            lightbox.refresh();

           
            scrollToNewImages();

            if (data.totalHits <= currentPage * 15) {
                loadMoreButton.style.display = 'none';
                showError("We're sorry, but you've reached the end of search results.");
            }
        }
    } catch (error) {
        showError('Щось пішло не так. Спробуйте ще раз.');
        console.error('Error fetching data:', error);
    } finally {
        hideLoading();
    }
});


function scrollToNewImages() {
    const galleryItems = document.querySelectorAll('.list-item');
    if (galleryItems.length > 0) {
        const lastItem = galleryItems[galleryItems.length - 1];
        const { height } = lastItem.getBoundingClientRect();
        window.scrollBy({
            top: height * 3, 
            behavior: 'smooth'
        });
    }
}