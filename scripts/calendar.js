const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
    // return new Date(year, month + 1, 0).getDate();
}

const createCalendar = (month, year) => {
    const calendar = document.querySelector('#calendar');
    calendar.innerHTML = '';

    let fullDatesTab = []; // Réinitialiser le tableau des dates

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
    const daysInMonth = getDaysInMonth(month + 1, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    let date = 1;

    for (let i = 0; i < 6; i++) { // Maximum 6 semaines
        let week = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const day = document.createElement('td');

            // Ajouter des cellules vides avant le début du mois
            if (i === 0 && j < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)) {
                week.appendChild(day);
            } else if (date > daysInMonth) {
                // Arrêter après la fin du mois
                break;
            } else {
                // Ajouter un jour du mois
                day.innerText = date;
                day.id = `day-${date}`; // Ajoute un id dynamique basé sur la valeur de "date"

                // Ajouter la date complète au tableau
                const fullDateElt = new Date(year, month, date);
                fullDatesTab.push(fullDateElt);

                // Ajouter un événement de clic pour afficher la date correspondante
                day.addEventListener('click', (event) => {
                    const id = event.target.id; // Récupérer l'id de l'élément cliqué
                    const remainingId = id.substring(4); // Supprimer les 4 premiers caractères
                    handleDayClick(fullDatesTab[remainingId - 1].getDate(), fullDatesTab[remainingId - 1].getMonth(), fullDatesTab[remainingId - 1].getFullYear()); // Appeler la fonction de gestion du clic
                });

                week.appendChild(day);
                date++;
            }
        }

        tbody.appendChild(week);

        // Arrêter la boucle si tous les jours ont été ajoutés
        if (date > daysInMonth) {
            break;
        }
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
    if (currentDate.getFullYear() > 2000 || (currentDate.getFullYear() === 2000 && currentDate.getMonth() > 0)) {
        currentDate.setMonth(currentDate.getMonth() - 1); // Passer au mois précédent
        updateCalendar(); // Mettre à jour le calendrier
    }
});

// Ajouter un événement de clic pour le bouton "arrow-right"
arrowRight.addEventListener('click', () => {
    const currentYear = new Date().getFullYear();
    if (currentDate.getFullYear() < currentYear || (currentDate.getFullYear() === currentYear && currentDate.getMonth() < 11)) {
        currentDate.setMonth(currentDate.getMonth() + 1); // Passer au mois suivant
        updateCalendar(); // Mettre à jour le calendrier
    }
});

// Fonction pour mettre à jour le calendrier
const updateCalendar = () => {
    createCalendar(currentDate.getMonth(), currentDate.getFullYear()); // Recréer le calendrier
    monthDiv.innerText = currentDate.toLocaleString('default', { month: 'long' }); // Mettre à jour le texte du mois
    yearSelect.value = currentDate.getFullYear(); // Mettre à jour l'année sélectionnée
};

// Fonction pour gérer le clic sur un jour du calendrier
const handleDayClick = (day, month, year) => {
    // Mettre à jour la date complète dans currentDate
    currentDate.setFullYear(year);
    currentDate.setMonth(month);
    currentDate.setDate(day);

    // Formater la date dans un format lisible (exemple : "15 mai 2025")
    const formattedDate = currentDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    // Injecter la date formatée dans l'input avec l'ID "dateInput"
    const dateInput = document.getElementById('dateInput');
    dateInput.value = formattedDate;

    // Masquer le calendrier après la sélection
    calendarDiv.style.display = 'none';
};