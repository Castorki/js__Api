(() => {

    function getToData(className) {
        let temp = localStorage.getItem(className);
        return JSON.parse(temp);
    }

    function setToData(classes, classesArray) {
        localStorage.setItem(classes, JSON.stringify(classesArray));
    }

    function createHeader() {
        const main__container = document.querySelector('.main__container');

        const header = document.createElement('div');
        header.classList.add('header', 'd-flex', 'justify-content-center');

        const headerHeading = document.createElement('h2');
        headerHeading.classList.add('header__heading');
        headerHeading.textContent = 'Расписание занятий';

        header.appendChild(headerHeading);
        main__container.appendChild(header);
    }

    function createTable() {
        const main__container = document.querySelector('.main__container');

        const exercicesTable = document.createElement('main');
        exercicesTable.classList.add('exercices');
        exercicesTable.style.display = 'grid';
        exercicesTable.style.gridTemplateColumns = 'repeat(1, 700px)';
        exercicesTable.style.gap = '8px';
        exercicesTable.style.justifyContent = 'center';
        const schedulFields = document.createElement('div');
        schedulFields.classList.add('exercices__fields', 'd-flex', 'justify-content-center', 'flex-row')

        const exercicesName = document.createElement('p');
        exercicesName.classList.add('exercices__fields_name', 'border', 'border-black', 'border-3', 'bg-primary', 'text-white', 'text-center', 'p-3');
        exercicesName.textContent = 'Name of class';

        const exercicesDate = document.createElement('p');
        exercicesDate.classList.add('exercices__fields_date', 'border', 'border-black', 'border-3', 'bg-primary', 'text-white', 'text-center', 'p-3');
        exercicesDate.textContent = 'Date of class';


        const exercicesMaxQuantytiOfMemebers = document.createElement('p');
        exercicesMaxQuantytiOfMemebers.classList.add('exercices__fields_maxQuantytiOfMembers', 'border', 'border-black', 'border-3', 'bg-primary', 'text-white', 'text-center');
        exercicesMaxQuantytiOfMemebers.textContent = 'Maximum quantity of members';


        const exercicesCurrentQuantytiOfMemebers = document.createElement('p');
        exercicesCurrentQuantytiOfMemebers.classList.add('exercices__fields_CurrentQuantytiOfMembers', 'border', 'border-black', 'border-3', 'bg-primary', 'text-white', 'text-center', 'p-1');
        exercicesCurrentQuantytiOfMemebers.textContent = 'Current quantyti of members';

        const makeAnApointmen = document.createElement('p');
        makeAnApointmen.classList.add('exercices__makeAnApointment', 'border', 'border-black', 'border-3', 'bg-primary', 'text-white', 'text-center', 'p-3');
        makeAnApointmen.textContent = 'Make an apoinment';


        schedulFields.append(exercicesName, exercicesDate, exercicesMaxQuantytiOfMemebers, exercicesCurrentQuantytiOfMemebers, makeAnApointmen);
        exercicesTable.appendChild(schedulFields);
        main__container.appendChild(exercicesTable);

    }

    function createSchedul(exercices) {
        const exercicesTable = document.querySelector('.exercices');
        const noSchedul = document.querySelector('.noSchedul');

        if (noSchedul) {
            noSchedul.remove();
        }

        for (let i = 0; i < exercices.length; i++) {

            if (exercices[i].maxQuantytiOfMemebers > 0) {
                const clas = document.createElement('div');
                clas.classList.add(exercices[i].exerciceName, 'class', 'd-flex', 'justify-content-center', 'flex-row');

                const className = document.createElement('p');
                className.classList.add('class__name', 'border', 'border-black', 'border-2', 'bg-secondary', 'text-white', 'text-center', 'p-3', 'mb-1');
                className.textContent = exercices[i].exerciceName;
                className.style.width = '112px';

                const classDate = document.createElement('p');
                classDate.classList.add('class__date', 'border', 'border-black', 'border-2', 'bg-secondary', 'text-white', 'text-center', 'p-3', 'mb-1');
                classDate.textContent = exercices[i].date;
                classDate.style.width = '105px';

                const classMaxQuantytiOfMemebers = document.createElement('p');
                classMaxQuantytiOfMemebers.classList.add('class__maxQuantytiOfMembers', 'border', 'border-black', 'border-2', 'bg-secondary', 'text-white', 'text-center', 'p-3', 'mb-1');
                classMaxQuantytiOfMemebers.textContent = exercices[i].maxQuantytiOfMemebers;
                classMaxQuantytiOfMemebers.style.width = '173px';

                const classCurrentQuantytiOfMemebers = document.createElement('p');
                classCurrentQuantytiOfMemebers.classList.add('class__CurrentQuantytiOfMembers', 'border', 'border-black', 'border-2', 'bg-secondary', 'text-white', 'text-center', 'p-3', 'mb-1');
                classCurrentQuantytiOfMemebers.textContent = exercices[i].curentQuantytiOfMemebers;
                classCurrentQuantytiOfMemebers.style.width = '168px';

                const buttonWrapper = document.createElement('div');
                buttonWrapper.classList.add('apointment', 'd-flex', 'flex-column', 'justify-content-center', 'mb-1');
                buttonWrapper.style.width = '144px';

                const makeApointmentButton = document.createElement('button');
                makeApointmentButton.classList.add('apointment__make', 'btn', 'btn-success');
                makeApointmentButton.textContent = 'Make an apointment';

                if (exercices[i].curentQuantytiOfMemebers === exercices[i].maxQuantytiOfMemebers) {
                    makeApointmentButton.disabled = true;
                }

                const cancelApointmentButton = document.createElement('button');
                cancelApointmentButton.classList.add('apointment__cancel', 'btn', 'btn-danger');
                cancelApointmentButton.textContent = 'Cancel an apointment';

                if (exercices[i].curentQuantytiOfMemebers === 0) {
                    cancelApointmentButton.disabled = true;
                }

                makeApointmentButton.addEventListener('click', () => {

                    makeAnApointmen(buttonWrapper.closest('.class').firstChild.textContent);
                    classCurrentQuantytiOfMemebers.textContent++;

                    if (parseInt(classCurrentQuantytiOfMemebers.textContent) === parseInt(classMaxQuantytiOfMemebers.textContent)) {
                        makeApointmentButton.disabled = true;
                    }

                    cancelApointmentButton.disabled = false;
                });

                cancelApointmentButton.addEventListener('click', () => {

                    cancelAnApointmen(buttonWrapper.closest('.class').firstChild.textContent);
                    classCurrentQuantytiOfMemebers.textContent--;

                    if (parseInt(classCurrentQuantytiOfMemebers.textContent) === 0) {
                        cancelApointmentButton.disabled = true;
                    }

                    makeApointmentButton.disabled = false;
                });

                buttonWrapper.append(makeApointmentButton, cancelApointmentButton)
                clas.append(className, classDate, classMaxQuantytiOfMemebers, classCurrentQuantytiOfMemebers, buttonWrapper);
                exercicesTable.appendChild(clas);
            }
        }
    };

    function noSchedul() {
        const exercicesTable = document.querySelector('.exercices');

        const noSchedul = document.createElement('p');
        noSchedul.classList.add('noSchedul', 'text-center', 'fs-1');
        noSchedul.textContent = 'Расписания пока нет';

        exercicesTable.appendChild(noSchedul);
    }

    function makeAnApointmen(className) {
        let clasess = getToData('classes');

        for (let i = 0; i < clasess.length; i++) {
            if (clasess[i].exerciceName == className) {
                clasess[i].curentQuantytiOfMemebers++;
            }
        }
        setToData('classes', clasess);
    }

    function cancelAnApointmen(className) {
        let clasess = getToData('classes');

        for (let i = 0; i < clasess.length; i++) {
            if (clasess[i].exerciceName == className) {
                clasess[i].curentQuantytiOfMemebers--;
            }
        }
        setToData('classes', clasess);
    }

    function createApp() {
        // Расскоментировать для заполнения расписания


        // let exercices = [
        //     {
        //         exerciceName: 'lifting',
        //         date: '27.01.2024',
        //         maxQuantytiOfMemebers: 14,
        //         curentQuantytiOfMemebers: 14
        //     },
        //     {
        //         exerciceName: 'Gym',
        //         date: '15.06.2025',
        //         maxQuantytiOfMemebers: 10,
        //         curentQuantytiOfMemebers: 8
        //     },
        //     {
        //         exerciceName: 'Break',
        //         date: '01.10.2025',
        //         maxQuantytiOfMemebers: 5,
        //         curentQuantytiOfMemebers: 1
        //     }
        // ];

        // setToData('classes', exercices);

        createHeader();
        createTable();

        let tempSchedul = getToData('classes');

        if (tempSchedul) {
            createSchedul(tempSchedul);
        } else {
            console.log('no');
            noSchedul();
        }

        // localStorage.clear();

    }

    window.createApp = createApp;
})();