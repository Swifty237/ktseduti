// Sélectionner tous les éléments <a> enfants de l'élément avec la classe "side-panel"
const sideNavLinks = document.querySelectorAll('.side-panel a');

// Ajouter un gestionnaire d'événements à chaque lien
sideNavLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du lien

        // Vérifier si l'élément cliqué possède la classe "side-nav-item"
        if (link.classList.contains('side-nav-item')) {
            // Supprimer la classe "side-nav-item-clicked" de tous les liens
            sideNavLinks.forEach(otherLink => {
                otherLink.classList.remove('side-nav-item-clicked');
                otherLink.classList.add('side-nav-item');
            });

            // Ajouter la classe "side-nav-item-clicked" à l'élément cliqué
            link.classList.remove('side-nav-item');
            link.classList.add('side-nav-item-clicked');
        }
    });
});