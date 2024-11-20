// Fonction pour charger la page d'accueil
function loadHomePage() {
    console.log("Loading home page");
    loadPhotoAlbums();
    loadEvents();
}

// Fonction pour charger et afficher les albums photos
function loadPhotoAlbums() {
    console.log("Loading photo albums");
    const albums = window.photoAlbums || [];
    console.log("Photo albums data:", albums);

    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) {
        console.error("Gallery grid not found");
        return;
    }

    console.log("Gallery grid found, clearing contents");
    galleryGrid.innerHTML = '';

    albums.forEach(album => {
        console.log(`Creating album element for: ${album.title}`);
        const albumElement = document.createElement('div');
        albumElement.className = 'gallery-item';
        albumElement.innerHTML = `
            <img src="${album.cover}" alt="${album.title}" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=Image+Not+Found';">
            <h3>${album.title}</h3>
        `;
        albumElement.addEventListener('click', () => openPhotoAlbum(album.id));
        galleryGrid.appendChild(albumElement);
    });

    console.log("Finished loading photo albums");
}

// Fonction pour charger et afficher les événements
function loadEvents() {
    console.log("Loading events");
    const events = window.events || [];
    console.log("Events data:", events);

    const eventsGrid = document.querySelector('.events-grid');
    if (!eventsGrid) {
        console.error("Events grid not found");
        return;
    }

    console.log("Events grid found, clearing contents");
    eventsGrid.innerHTML = '';

    events.forEach(event => {
        console.log(`Creating event element for: ${event.title}`);
        const eventElement = document.createElement('div');
        eventElement.className = 'event-card';
        eventElement.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Lieu: ${event.location}</p>
        `;
        eventsGrid.appendChild(eventElement);
    });

    console.log("Finished loading events");
}

// Fonction pour ouvrir le formulaire de connexion
function openLoginForm() {
    document.getElementById('loginModal').style.display = 'block';
}

// Fonction pour fermer le formulaire de connexion
function closeLoginForm() {
    document.getElementById('loginModal').style.display = 'none';
}

// Fonction pour ouvrir le formulaire d'inscription
function openJoinForm() {
    document.getElementById('joinModal').style.display = 'block';
}

// Fonction pour fermer le formulaire d'inscription
function closeJoinForm() {
    document.getElementById('joinModal').style.display = 'none';
}

// Fonction pour gérer la soumission du formulaire de connexion
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Tentative de connexion avec:', email, password);
    
    const usersJSON = localStorage.getItem('users');
    console.log('Contenu brut de localStorage[users]:', usersJSON);
    
    const users = JSON.parse(usersJSON || '[]');
    console.log('Utilisateurs parsés:', users);
    
    const user = users.find(u => {
        console.log('Comparaison avec:', u);
        return u.email === email && u.password === password;
    });
    
    if (user) {
        console.log('Utilisateur trouvé:', user);
        alert('Connexion réussie !');
        // Ici, vous pouvez ajouter la logique pour afficher le contenu réservé aux membres
        closeLoginForm();
    } else {
        console.log('Aucun utilisateur correspondant trouvé');
        alert('Email ou mot de passe incorrect.');
    }
}

// Fonction pour gérer la soumission du formulaire d'inscription
function handleJoinSubmit(event) {
    event.preventDefault();
    console.log('Début de handleJoinSubmit');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nomFamilleLycee = document.getElementById('nomFamilleLycee').value;
    const prenom = document.getElementById('prenom').value;
    const promotion = document.getElementById('promotion').value;

    console.log('Données récupérées du formulaire:', { email, password, nomFamilleLycee, prenom, promotion });

    if (!email || !password || !nomFamilleLycee || !prenom || !promotion) {
        console.log('Données manquantes');
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    const userData = { email, password, nomFamilleLycee, prenom, promotion };
    
    console.log('Données d\'inscription:', userData);
    
    // Vérifier si l'email existe déjà
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('Utilisateurs existants:', existingUsers);
    
    if (existingUsers.some(user => user.email === userData.email)) {
        console.log('Email déjà utilisé');
        alert('Cet email est déjà utilisé. Veuillez en choisir un autre.');
        return;
    }
    
    // Ajouter le nouvel utilisateur
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    console.log('Nouvel utilisateur enregistré:', userData);
    console.log('Utilisateurs mis à jour:', JSON.parse(localStorage.getItem('users')));
    
    alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    closeJoinForm();
    openLoginForm();
}

// Nouvelle fonction pour ouvrir le formulaire de mot de passe oublié
function openForgotPasswordForm() {
    closeLoginForm();
    document.getElementById('forgotPasswordModal').style.display = 'block';
}

// Nouvelle fonction pour fermer le formulaire de mot de passe oublié
function closeForgotPasswordForm() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
}

// Nouvelle fonction pour gérer la soumission du formulaire de mot de passe oublié
function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgotPasswordEmail').value;
    console.log('Password reset requested for:', email);
    // Ici, vous devriez implémenter la logique de réinitialisation du mot de passe
    alert('Un e-mail de réinitialisation du mot de passe a été envoyé à ' + email);
    closeForgotPasswordForm();
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    
    // Ajouter les écouteurs d'événements pour les formulaires
    document.getElementById('joinForm').addEventListener('submit', handleJoinSubmit);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Charger le contenu de la page d'accueil
    loadHomePage();
});
