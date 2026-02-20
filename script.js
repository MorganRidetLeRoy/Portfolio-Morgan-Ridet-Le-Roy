// Animation simple pour le défilement vers les sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Mode sombre

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    // 1. Alterne la classe dark-mode sur le body
    body.classList.toggle('dark-mode');

    // 2. Change le texte du bouton selon le mode
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = "Mode Clair";
    } else {
        themeToggle.textContent = "Mode Sombre";
    }

    // Optionnel : Sauvegarder le choix de l'utilisateur
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Vérifier au chargement si l'utilisateur avait déjà choisi le mode sombre
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = "Mode Clair";
}
//fin code du mode sombre


// Fonction pour la réflexion sur le projet genshin wonderland
// Fonction pour ouvrir la fenêtre
function openModal() {
    document.getElementById("project-modal").style.display = "block";
}

// Fonction pour fermer la fenêtre
function closeModal() {
    document.getElementById("project-modal").style.display = "none";
}

// Fermer la fenêtre si l'utilisateur clique n'importe où en dehors de la boîte
window.onclick = function(event) {
    let modal = document.getElementById("project-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Script du lien du projet calculatrice
document.addEventListener("DOMContentLoaded", () => {
    // Sélectionne toutes les cartes ayant la classe 'project-card'
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            
            // On vérifie si l'URL existe avant d'essayer d'ouvrir
            if (url) {
                console.log("Tentative d'ouverture de : " + url);
                window.open(url, '_blank');
            } else {
                console.error("Erreur : Aucun lien trouvé dans l'attribut data-url");
            }
        });
    });
});

console.log("Le portfolio est prêt !");