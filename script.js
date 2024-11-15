// Gardez tout le contenu JavaScript existant

// Ajoutez ces nouvelles fonctions à la fin du fichier

// Fonction pour charger le contenu de la page d'accueil
function loadHomePage() {
    // Cette fonction peut rester vide pour l'instant, car le contenu est déjà dans index.html
}

// Fonction pour charger le contenu de la page des événements
function loadEventsPage() {
    // Cette fonction peut rester vide pour l'instant, car le contenu est dans evenements.html
}

// Fonction pour charger le contenu de la page des photos
function loadPhotosPage() {
    // Cette fonction peut rester vide pour l'instant, car le contenu est dans photos.html
}

// Fonction pour gérer la navigation
function handleNavigation() {
    const currentPage = window.location.pathname.split("/").pop();

    switch (currentPage) {
        case "":
        case "index.html":
            loadHomePage();
            break;
        case "evenements.html":
            loadEventsPage();
            break;
        case "photos.html":
            loadPhotosPage();
            break;
    }
}

// Ajoutez cet appel de fonction à l'événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... (gardez le code existant ici)

    // Ajoutez cet appel à la fin
    handleNavigation();
});

// Assurez-vous que ces fonctions sont exposées globalement
window.openLoginForm = openLoginForm;
window.closeLoginForm = closeLoginForm;
window.openJoinForm = openJoinForm;
window.closeJoinForm = closeJoinForm;
window.openEditProfileForm = openEditProfileForm;
window.closeEditProfileForm = closeEditProfileForm;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.handleJoinSubmit = handleJoinSubmit;
window.handleEditProfileSubmit = handleEditProfileSubmit;
