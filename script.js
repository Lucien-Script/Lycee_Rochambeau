// Gardez tout le contenu JavaScript existant

// Modifiez la fonction loadPhotoAlbums comme suit :
function loadPhotoAlbums() {
    const albums = [
        { id: 1, title: "Gala 2023", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
        { id: 2, title: "Retrouvailles 2023", cover: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" },
        { id: 3, title: "Remise des diplômes 2023", cover: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';

    albums.forEach(album => {
        const albumElement = document.createElement('div');
        albumElement.className = 'gallery-item';
        albumElement.innerHTML = `
            <img src="${album.cover}" alt="${album.title}">
            <h3>${album.title}</h3>
        `;
        albumElement.addEventListener('click', () => openPhotoAlbum(album.id));
        galleryGrid.appendChild(albumElement);
    });
}

// Modifiez la fonction handleNavigation comme suit :
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

// Modifiez la fonction loadHomePage comme suit :
function loadHomePage() {
    loadPhotoAlbums();
    // Ajoutez ici d'autres fonctions spécifiques à la page d'accueil si nécessaire
}

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

// Modifiez l'événement DOMContentLoaded comme suit :
document.addEventListener('DOMContentLoaded', () => {
    // ... (gardez le code existant ici)

    // Ajoutez ces appels à la fin
    handleNavigation();
    
    // Chargez les albums photos directement si nous sommes sur la page d'accueil
    if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
        loadPhotoAlbums();
    }
});

// Fonction pour ouvrir un album photo (à implémenter)
function openPhotoAlbum(albumId) {
    alert(`Ouverture de l'album ${albumId}. Fonctionnalité à implémenter.`);
}
