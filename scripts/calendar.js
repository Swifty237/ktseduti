const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
    // return new Date(year, month + 1, 0).getDate();
}

const createCalendar = (month, year) => {
    const calendar = document.querySelector('#calendar');
    calendar.innerHTML = '';

    // Ajouter les jours de la semaine
    const daysOfWeek = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.innerText = day;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    calendar.appendChild(thead);

    // Générer les jours du mois
    const tbody = document.createElement('tbody');
    let date = 1;
    const daysInMonth = getDaysInMonth(month + 1, year);

    for (let i = 0; i < 6; i++) {
        let week = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < new Date(year, month, 1).getDay() || date > daysInMonth) {
                let day = document.createElement('td');
                week.appendChild(day);
            } else {
                let day = document.createElement('td');
                day.innerText = date;
                week.appendChild(day);
                date++;
            }
        }

        tbody.appendChild(week);
    }

    calendar.appendChild(tbody);
};

let currentDate = new Date();
createCalendar(currentDate.getMonth(), currentDate.getFullYear());

// Sélectionner le bouton et la div du calendrier
const calendarButton = document.querySelector('.calendar-button');
const calendarDiv = document.getElementById('calendar-container');

// Masquer le calendrier au chargement de la page
calendarDiv.style.display = 'none';

// Ajouter un événement de clic au bouton
calendarButton.addEventListener('click', () => {
    // Basculer l'affichage de la div
    if (calendarDiv.style.display === 'none') {
        calendarDiv.style.display = 'block'; // Afficher le calendrier
    } else {
        calendarDiv.style.display = 'none'; // Masquer le calendrier
    }
});

const monthDiv = document.getElementById('monthTxt');
monthDiv.innerText = currentDate.toLocaleString('default', { month: 'long' });

const yearSelect = document.getElementById('yearSelect');

// Générer les années de 2000 à l'année en cours
const currentYear = new Date().getFullYear();
for (let year = 2000; year <= currentYear; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}

// Sélectionner l'année en cours par défaut
yearSelect.value = currentYear;

// Ajouter un événement de changement pour le "yearSelect"
yearSelect.addEventListener('change', () => {
    currentDate.setFullYear(parseInt(yearSelect.value)); // Mettre à jour l'année de currentDate
    updateCalendar(); // Mettre à jour le calendrier
});

// Sélectionner les boutons pour naviguer entre les mois
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

// Ajouter un événement de clic pour le bouton "arrow-left"
arrowLeft.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1); // Passer au mois précédent
    updateCalendar(); // Mettre à jour le calendrier
});

// Ajouter un événement de clic pour le bouton "arrow-right"
arrowRight.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1); // Passer au mois suivant
    updateCalendar(); // Mettre à jour le calendrier
});

// Fonction pour mettre à jour le calendrier
const updateCalendar = () => {
    createCalendar(currentDate.getMonth(), currentDate.getFullYear()); // Recréer le calendrier
    monthDiv.innerText = currentDate.toLocaleString('default', { month: 'long' }); // Mettre à jour le texte du mois
    yearSelect.value = currentDate.getFullYear(); // Mettre à jour l'année sélectionnée
};