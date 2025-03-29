(() => {

    function showFirstImage() {
        const images = document.querySelectorAll('.conten__images_image');

        for (let i = 0; i < images.length; i++) {
            images[i].setAttribute('id', i);
            if (i !== 0) {
                images[i].style.display = 'none';
                images[i].classList.add('hide');
            } else {
                images[i].classList.add('onScreen');
            }
        }

        return images;
    }

    function makeListeners(images) {
        const previesImag = document.querySelector('.content__previes');
        const nextImage = document.querySelector('.content__next');
        const fastNavigation = document.querySelector('.content__images_fastNavigation')

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

        fastNavigation.addEventListener('click', (e) => {
            if (e.target.id) {
                const imageOnScreen = document.querySelector('.onScreen');
                imageOnScreen.classList.remove('onScreen');
                imageOnScreen.classList.add('hide');
                imageOnScreen.style.display = 'none';

                for (let i = 0; i < images.length; i++) {
                    if (i === parseInt(e.target.id)) {
                        images[i].style.display = 'block'
                        images[i].classList.remove('hide');
                        images[i].classList.add('onScreen');
                    }
                }
            }
            // changeFastNavigation(images, parseInt(e.target.id));
        })
    }

    // устанавливает ограничение на количество кнопок для быстрой навигации

    // function makeFastNavigation(images) {      
    //     const fastNavigation = document.querySelector('.content__images_fastNavigation');

    //     let quantityOfElements = 0;
    //     if (images.length > 5) {
    //         quantityOfElements = 5
    //     } else {
    //         quantityOfElements = images.length;
    //     }

    //     for (let i = 0; i < quantityOfElements; i++) {
    //         const fastNavigationElement = document.createElement('button');
    //         fastNavigationElement.setAttribute('id', i);
    //         fastNavigationElement.classList.add('content__images_fastNavigation_element');
    //         fastNavigation.appendChild(fastNavigationElement);
    //     }
    // }

    // Просто создаёт кнопки для быстрой навигации без каких либо ограничений

    function makeFastNavigation(images) {
        const fastNavigation = document.querySelector('.content__images_fastNavigation');

        for (let i = 0; i < images.length; i++) {
            const fastNavigationElement = document.createElement('button');
            fastNavigationElement.setAttribute('id', i);
            fastNavigationElement.classList.add('content__images_fastNavigation_element');
            fastNavigation.appendChild(fastNavigationElement);
        }
    }

    // В случае использования первой функции с ограничениями для быстрой навигации устанавливает смену картинок на кнопках

    // function changeFastNavigation(images, targetId) {
    //     let fastNavigationElements = document.querySelectorAll('.content__images_fastNavigation_element');
    //     fastNavigationElements[2].id = targetId;

    //     if (targetId - 1 === -1) {
    //         fastNavigationElements[1].id = images[images.length - 1].id;
    //         fastNavigationElements[0].id = images[images.length - 2].id;
    //     } else if (targetId - 2 === -1) {
    //         fastNavigationElements[0].id = images[images.length - 1].id;
    //         fastNavigationElements[1].id = images[targetId - 1].id;

    //     } else {
    //         fastNavigationElements[0].id = images[targetId - 2].id;
    //         fastNavigationElements[1].id = images[targetId - 1].id;
    //     }

    //     if (targetId + 1 === images.length) {
    //         fastNavigationElements[3].id = images[0].id;
    //         fastNavigationElements[4].id = images[1].id;
    //     } else if (targetId + 2 === images.length) {
    //         fastNavigationElements[3].id = images[targetId + 1].id;
    //         fastNavigationElements[4].id = images[0].id;
    //     } else {
    //         fastNavigationElements[3].id = images[targetId + 1].id;
    //         fastNavigationElements[4].id = images[targetId + 2].id;
    //     }


    // }

    function createApp() {
        let images = showFirstImage();

        makeListeners(images);
        makeFastNavigation(images);
    }

    window.createApp = createApp;
})();