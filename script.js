// Gestion de l'authentification
let currentUser = null;

// Fonction pour vérifier l'authentification
function checkAuth() {
    const isAuthenticated = !!currentUser;
    const loginSection = document.getElementById('loginSection');
    const directoryContent = document.getElementById('directoryContent');
    const authButtons = document.querySelector('.auth-buttons');
    const editProfileBtn = document.querySelector('.edit-profile-btn');

    if (loginSection) loginSection.style.display = isAuthenticated ? 'none' : 'block';
    if (directoryContent) directoryContent.style.display = isAuthenticated ? 'block' : 'none';
    if (editProfileBtn) editProfileBtn.style.display = isAuthenticated ? 'inline-block' : 'none';
    
    // Mettre à jour les boutons d'authentification
    if (authButtons) {
        if (isAuthenticated) {
            authButtons.innerHTML = `
                <button type="button" onclick="handleLogout()" class="auth-btn login-btn">Se déconnecter</button>
            `;
            const userWelcome = document.getElementById('userWelcome');
            if (userWelcome) userWelcome.textContent = `Bienvenue, ${currentUser.nom}`;
            displayAlumni(window.alumniData);
        } else {
            authButtons.innerHTML = `
                <button type="button" onclick="openLoginForm()" class="auth-btn login-btn">Se connecter</button>
                <button type="button" onclick="openJoinForm()" class="auth-btn signup-btn">S'inscrire</button>
            `;
        }
    }
}

// Gestion des modals
function openLoginForm() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeLoginForm() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        const form = document.getElementById('loginForm');
        if (form) form.reset();
    }
}

function openJoinForm() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeJoinForm() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        const form = document.getElementById('joinForm');
        if (form) form.reset();
    }
}

function openEditProfileForm() {
    const modal = document.getElementById('editProfileModal');
    if (modal && currentUser) {
        // Pré-remplir le formulaire avec les informations actuelles de l'utilisateur
        document.getElementById('editNom').value = currentUser.nom;
        document.getElementById('editPromotion').value = currentUser.promotion;
        document.getElementById('editProfession').value = currentUser.profession;
        document.getElementById('editLocalisation').value = currentUser.localisation;
        document.getElementById('editLinkedin').value = currentUser.linkedin;
        document.getElementById('editEmail').value = currentUser.email;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeEditProfileForm() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        const form = document.getElementById('editProfileForm');
        if (form) form.reset();
    }
}

// Gestion de la connexion
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;

    if (!email || !password) return;

    const user = window.users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        checkAuth();
        closeLoginForm();
    } else {
        alert('Email ou mot de passe incorrect');
    }
}

// Gestion de la déconnexion
function handleLogout() {
    currentUser = null;
    checkAuth();
}

// Gestion de l'inscription
function handleJoinSubmit(event) {
    event.preventDefault();
    
    // Récupérer tous les champs du formulaire
    const nom = document.getElementById('nom')?.value;
    const promotion = document.getElementById('promotion')?.value;
    const profession = document.getElementById('profession')?.value;
    const localisation = document.getElementById('localisation')?.value;
    const linkedin = document.getElementById('linkedin')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    // Vérifier que tous les champs requis sont remplis
    if (!nom || !promotion || !profession || !localisation || !email || !password) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }

    // Créer le nouvel utilisateur
    const newUser = {
        nom,
        email,
        password,
        promotion,
        profession,
        localisation,
        linkedin: linkedin || '#'
    };

    // Créer le nouvel alumni
    const newAlumni = {
        nom,
        promotion,
        profession,
        localisation,
        linkedin: linkedin || '#',
        email,
        photo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400'
    };

    // Initialiser les tableaux s'ils n'existent pas
    if (!window.users) window.users = [];
    if (!window.alumniData) window.alumniData = [];
    
    // Ajouter aux tableaux
    window.users.push(newUser);
    window.alumniData.push(newAlumni);
    
    // Connecter automatiquement
    currentUser = newUser;
    
    // Mettre à jour l'affichage
    checkAuth();
    initializeFilters();
    displayAlumni(window.alumniData);
    
    // Fermer le modal et afficher un message de succès
    closeJoinForm();
    alert('Inscription réussie ! Bienvenue dans l\'annuaire des anciens élèves.');
}

// Gestion de la modification du profil
function handleEditProfileSubmit(event) {
    event.preventDefault();

    if (!currentUser) return;

    const nom = document.getElementById('editNom')?.value;
    const promotion = document.getElementById('editPromotion')?.value;
    const profession = document.getElementById('editProfession')?.value;
    const localisation = document.getElementById('editLocalisation')?.value;
    const linkedin = document.getElementById('editLinkedin')?.value;
    const email = document.getElementById('editEmail')?.value;

    if (!nom || !promotion || !profession || !localisation || !email) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }

    // Mettre à jour les informations de l'utilisateur
    currentUser.nom = nom;
    currentUser.promotion = promotion;
    currentUser.profession = profession;
    currentUser.localisation = localisation;
    currentUser.linkedin = linkedin || '#';
    currentUser.email = email;

    // Mettre à jour les données dans alumniData
    const alumniIndex = window.alumniData.findIndex(a => a.email === currentUser.email);
    if (alumniIndex !== -1) {
        window.alumniData[alumniIndex] = { ...currentUser, photo: window.alumniData[alumniIndex].photo };
    }

    // Mettre à jour l'affichage
    checkAuth();
    displayAlumni(window.alumniData);

    // Fermer le modal et afficher un message de succès
    closeEditProfileForm();
    alert('Votre profil a été mis à jour avec succès !');
}

// Fonction pour afficher les anciens élèves
function displayAlumni(alumni) {
    const grid = document.getElementById('alumniGrid');
    if (!grid) return;

    grid.innerHTML = '';

    alumni.forEach(person => {
        const card = document.createElement('div');
        card.className = 'alumni-card';
        card.innerHTML = `
            <div class="alumni-photo">
                <img src="${person.photo}" alt="${person.nom}">
            </div>
            <h3>${person.nom}</h3>
            <div class="alumni-info">Promotion ${person.promotion}</div>
            <div class="alumni-info">${person.profession}</div>
            <div class="alumni-info">${person.localisation}</div>
            <div class="alumni-links">
                <a href="${person.linkedin}" target="_blank" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="mailto:${person.email}" title="Email">
                    <i class="fas fa-envelope"></i>
                </a>
            </div>
        `;
        // Ajouter un bouton d'édition si c'est le profil de l'utilisateur connecté
        if (currentUser && person.email === currentUser.email) {
            const editButton = document.createElement('button');
            editButton.textContent = 'Modifier';
            editButton.className = 'edit-profile-btn';
            editButton.onclick = openEditProfileForm;
            card.appendChild(editButton);
        }
        grid.appendChild(card);
    });
}

// Initialisation des filtres
function initializeFilters() {
    const promotionFilter = document.getElementById('promotionFilter');
    const locationFilter = document.getElementById('locationFilter');

    if (!promotionFilter || !locationFilter || !window.alumniData) return;

    const promotions = [...new Set(window.alumniData.map(a => a.promotion))].sort();
    const locations = [...new Set(window.alumniData.map(a => a.localisation))].sort();

    promotionFilter.innerHTML = '<option value="">Toutes les promotions</option>';
    locationFilter.innerHTML = '<option value="">Toutes les localisations</option>';

    promotions.forEach(promotion => {
        const option = document.createElement('option');
        option.value = promotion;
        option.textContent = `Promotion ${promotion}`;
        promotionFilter.appendChild(option);
    });

    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });
}

// Fonction de recherche et filtrage
function filterAlumni() {
    if (!currentUser || !window.alumniData) return;

    const searchInput = document.getElementById('searchInput');
    const promotionFilter = document.getElementById('promotionFilter');
    const locationFilter = document.getElementById('locationFilter');

    if (!searchInput || !promotionFilter || !locationFilter) return;

    const searchTerm = searchInput.value.toLowerCase();
    const promotionValue = promotionFilter.value;
    const locationValue = locationFilter.value;

    const filtered = window.alumniData.filter(person => {
        const matchesSearch = person.nom.toLowerCase().includes(searchTerm) ||
                            person.profession.toLowerCase().includes(searchTerm);
        const matchesPromotion = !promotionValue || person.promotion === promotionValue;
        const matchesLocation = !locationValue || person.localisation === locationValue;

        return matchesSearch && matchesPromotion && matchesLocation;
    });

    displayAlumni(filtered);
}

// Fonction pour charger et afficher les albums photos
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

// Fonction pour ouvrir un album photo (à implémenter)
function openPhotoAlbum(albumId) {
    alert(`Ouverture de l'album ${albumId}. Fonctionnalité à implémenter.`);
}

// Améliorer la visibilité des liens sociaux
function enhanceSocialLinks() {
    const socialNav = document.querySelector('.social-nav');
    if (socialNav) {
        socialNav.innerHTML = `
            <a href="https://www.instagram.com" target="_blank" class="instagram">
                <i class="fab fa-instagram"></i>
                Instagram
            </a>
            <a href="https://www.facebook.com/groups" target="_blank" class="facebook">
                <i class="fab fa-facebook"></i>
                Facebook
            </a>
        `;
    }
}

// Gérer le lien vers la boutique en ligne
function handleOnlineStore() {
    const storeLink = document.querySelector('.boutique-btn');
    if (storeLink) {
        storeLink.href = "https://shop.example.com";
        storeLink.target = "_blank";
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier l'authentification
    checkAuth();
    
    // Initialiser les filtres
    initializeFilters();
    
    // Charger les albums photos
    loadPhotoAlbums();
    
    // Améliorer la visibilité des liens sociaux
    enhanceSocialLinks();
    
    // Gérer le lien vers la boutique en ligne
    handleOnlineStore();
    
    // Ajouter les écouteurs d'événements pour la recherche et le filtrage
    const searchInput = document.getElementById('searchInput');
    const promotionFilter = document.getElementById('promotionFilter');
    const locationFilter = document.getElementById('locationFilter');
    const loginForm = document.getElementById('loginForm');
    const joinForm = document.getElementById('joinForm');
    const editProfileForm = document.getElementById('editProfileForm');

    if (searchInput) searchInput.addEventListener('input', filterAlumni);
    if (promotionFilter) promotionFilter.addEventListener('change', filterAlumni);
    if (locationFilter) locationFilter.addEventListener('change', filterAlumni);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (joinForm) joinForm.addEventListener('submit', handleJoinSubmit);
    if (editProfileForm) editProfileForm.addEventListener('submit', handleEditProfileSubmit);

    // Fermer les modals si on clique en dehors
    window.onclick = function(event) {
        const loginModal = document.getElementById('loginModal');
        const joinModal = document.getElementById('joinModal');
        const editProfileModal = document.getElementById('editProfileModal');
        if (event.target === loginModal) {
            closeLoginForm();
        }
        if (event.target === joinModal) {
            closeJoinForm();
        }
        if (event.target === editProfileModal) {
            closeEditProfileForm();
        }
    };
});

// Expose functions to window for HTML onclick attributes
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
