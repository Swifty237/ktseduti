// Sélectionner tous les éléments <a> enfants de l'élément avec la classe "body-box"
const bodyBoxLinks = document.querySelectorAll('.body-box a');

// Ajouter un gestionnaire d'événements à chaque lien
bodyBoxLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du lien

        // Vérifier si l'élément cliqué possède un enfant avec la classe "icon-box-item"
        const iconBox = link.querySelector('.icon-box-item');
        if (iconBox) {
            // Supprimer la classe "icon-box-item-clicked" de tous les autres éléments
            bodyBoxLinks.forEach(otherLink => {
                const otherIconBox = otherLink.querySelector('.icon-box-item-clicked');
                if (otherIconBox) {
                    otherIconBox.classList.remove('icon-box-item-clicked');
                    otherIconBox.classList.add('icon-box-item');
                }
            });

            // Ajouter la classe "icon-box-item-clicked" à l'élément cliqué
            iconBox.classList.remove('icon-box-item');
            iconBox.classList.add('icon-box-item-clicked');
        }
    });
});