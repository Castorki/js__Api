(() => {

    function getToData(key) {
        let temp = localStorage.getItem(key);
        return JSON.parse(temp);
    }

    function setToData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function checkLikesCount() {
        let likeCount = document.querySelector('.extra__like_count')

        let likeCountsFromStorage = getToData('likeCount');

        if (likeCountsFromStorage) {
            likeCount.textContent = likeCountsFromStorage;
        }
    }

    function checkHistory() {
        const nextArrow = document.querySelector('.photo__history_next')
        const photosArray = getToData('photos');
        const historyWrapper = document.querySelector('.photo__history')
        const previesImag = document.querySelector('.photo__history_previes');
        const nextImage = document.querySelector('.photo__history_next');

        if (photosArray !== null && photosArray !== undefined) {
            const emptyHistory = document.querySelector('.no_history');

            if (emptyHistory) {
                emptyHistory.remove();
                previesImag.style.display = 'block';
                nextImage.style.display = 'block';
            }
            for (let i = 0; i < photosArray.length; i++) {
                let imegFromHistory = document.createElement('img');
                imegFromHistory.src = photosArray[i];
                imegFromHistory.alt = 'Фото из истории просмотров';
                imegFromHistory.classList.add('photo__history_imeg');

                if (i !== 0) {
                    imegFromHistory.style.display = 'none';
                    imegFromHistory.classList.add('hide');
                } else {
                    imegFromHistory.classList.add('onScreen');
                }

                historyWrapper.insertBefore(imegFromHistory, nextArrow);
            }
        } else {
            previesImag.style.display = 'none';
            nextImage.style.display = 'none';

            let noHistory = document.createElement("h2");
            noHistory.classList.add('no_history')
            // noHistory.style.fontSize = 'large';
            noHistory.textContent = 'История просмотров пока пуста';
            historyWrapper.appendChild(noHistory);
        }
    }

    function makeListenerForLike() {
        const likeButton = document.querySelector('.extra__like_button');
        let likeCount = document.querySelector('.extra__like_count')

        likeButton.addEventListener('click', () => {
            likeCount.textContent++;

            setToData('likeCount', likeCount.textContent);
        })

    }

    async function updatePhoto(photosArray) {
        let photo = document.querySelector('.photo__element');

        const response = await fetch('https://api.unsplash.com/photos/random', {
            method: 'GET',
            headers: {
                authorization: 'Client-ID SgVJdk14mBDN7wI6fvs-vL-embTwqeMlz5p4N4XZKg8'
            }
        });

        if (response.ok) {
            const randomPhoto = await response.json();
            photo.src = randomPhoto.urls.small;
            photosArray.push(randomPhoto.urls.small);
            setToData('photos', photosArray);
        } else {
            throw new Error(response.statusText);
        }

        photo.addEventListener('load', () => {
            photo.style.display = 'flex';

            const loader = document.querySelector('.loader');
            loader.style.display = 'none';
        });
    }

    function makeHistory() {
        const history = document.querySelector('.extra__history_title');
        let historyWrapper = document.querySelector('.photo__history');
        let closeHistory = document.querySelector('.extra__history_close');
        let photo = document.querySelector('.photo__element');
        const loader = document.querySelector('.loader');

        history.addEventListener('click', () => {
            photo.style.display = 'none'
            historyWrapper.style.display = 'flex';
            closeHistory.style.visibility = 'visible';
            loader.style.display = 'none';
        })

        closeHistory.addEventListener('click', () => {

            historyWrapper.style.display = 'none';
            closeHistory.style.visibility = 'hidden';
            if (photo.src.includes('hw3')) {
                loader.style.display = 'flex';

            } else {
                photo.style.display = 'block'

            }

            // console.log();

        })
    }

    function makeListenersForArrows() {
        const previesImag = document.querySelector('.photo__history_previes');
        const nextImage = document.querySelector('.photo__history_next');
        let images = document.querySelectorAll('.photo__history_imeg');

        previesImag.addEventListener('click', () => {
            const imageOnScreen = document.querySelector('.onScreen');

            for (let i = 0; i < images.length; i++) {
                if (images[i] === imageOnScreen) {
                    imageOnScreen.classList.remove('onScreen');
                    imageOnScreen.classList.add('hide');
                    imageOnScreen.style.display = 'none';

                    if (i - 1 === -1) {
                        images[images.length - 1].style.display = 'block'
                        images[images.length - 1].classList.remove('hide');
                        images[images.length - 1].classList.add('onScreen');
                    } else {
                        images[i - 1].style.display = 'block'
                        images[i - 1].classList.remove('hide');
                        images[i - 1].classList.add('onScreen');
                    }

                }
            }
        })

        nextImage.addEventListener('click', () => {
            const imageOnScreen = document.querySelector('.onScreen');

            for (let i = 0; i < images.length; i++) {
                if (images[i] === imageOnScreen) {
                    imageOnScreen.classList.remove('onScreen');
                    imageOnScreen.classList.add('hide');
                    imageOnScreen.style.display = 'none';

                    if (i + 1 === images.length) {
                        images[0].style.display = 'block'
                        images[0].classList.remove('hide');
                        images[0].classList.add('onScreen');
                    } else {
                        images[i + 1].style.display = 'block'
                        images[i + 1].classList.remove('hide');
                        images[i + 1].classList.add('onScreen');
                    }

                }
            }

        })
    }

    function createApp() {
        // localStorage.clear()

        let temp = getToData('photos')
        let photosArray = null;

        if (!temp) {
            photosArray = []
        } else {
            photosArray = temp;
        }

        checkHistory();
        checkLikesCount();
        makeListenerForLike();
        updatePhoto(photosArray);
        makeHistory();
        makeListenersForArrows();

    }

    window.createApp = createApp;
})();