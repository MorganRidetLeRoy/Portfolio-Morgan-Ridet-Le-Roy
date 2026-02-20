// Écouteur d'événement pour charger les cartes et activer le drag and drop une fois la page chargée
document.addEventListener('DOMContentLoaded', () => {
    loadCards(); // Charge les cartes sauvegardées
    setupDragAndDrop(); // Active le drag and drop
});

/**
 * Ajoute une nouvelle carte dans la colonne spécifiée
 * @param {string} status - Statut de la colonne (todo, in-progress, done)
 */
function addCard(status) {
    // Récupère le conteneur des cartes pour le statut donné
    const cardsContainer = document.getElementById(`${status}-cards`);
    // Génère un identifiant unique pour la carte
    const cardId = Date.now();
    // Demande à l'utilisateur le contenu de la carte
    const cardContent = prompt("Contenu de la carte :");
    if (cardContent) {
        // Crée un nouvel élément carte
        const cardColor = askCardColor(); // Demande la couleur
        const card = document.createElement('div');
        card.className = 'card';
        card.draggable = true; // Active le drag and drop
        card.dataset.id = cardId; // Associe l'identifiant à la carte
        
        // Définit le contenu HTML de la carte : contenu + boutons d'action
        card.innerHTML = `
            <div class="card-content">${cardContent}</div>
            <div class="card-actions">
                <button class="edit-btn" onclick="editCard(${cardId})">✏️</button>
                <button class="color-btn" onclick="changeCardColor(${card.id})">🎨</button>
                <button class="delete-btn" onclick="deleteCard(${cardId})">❌</button>
            </div>
        `;

        function addCard(status) {
            // ... (code existant jusqu'à l'application de la couleur)

            // Applique la couleur choisie
            card.style.backgroundColor =
            cardColor === "red" ? "#ffdddd" :
            cardColor === "yellow" ? "#ffffcc" :
            "#ddffdd";

            cardsContainer.appendChild(card);
            saveCards(); // MODIFIÉ : Sauvegarde inclut maintenant la couleur
            setupDragAndDrop();
        }

        // Ajoute la carte au conteneur
        cardsContainer.appendChild(card);
        saveCards(); // Sauvegarde les cartes
        setupDragAndDrop(); // Réactive le drag and drop
    }
}

/**
 * Modifie le contenu d'une carte existante
 * @param {number} cardId - Identifiant de la carte à modifier
 */
function editCard(cardId) {
    // Trouve la carte par son identifiant
    const card = document.querySelector(`.card[data-id="${cardId}"]`);
    if (card) {
        // Récupère la div contenant le contenu de la carte
        const cardContentDiv = card.querySelector('.card-content');
        // Demande à l'utilisateur le nouveau contenu
        const newContent = prompt("Modifier le contenu de la carte :", cardContentDiv.textContent);
        if (newContent !== null) {
            // Met à jour le contenu de la carte
            cardContentDiv.textContent = newContent;
            saveCards(); // Sauvegarde les cartes
        }
    }
}

/**
 * Supprime une carte après confirmation
 * @param {number} cardId - Identifiant de la carte à supprimer
 */
function deleteCard(cardId) {
    // Trouve la carte par son identifiant
    const card = document.querySelector(`.card[data-id="${cardId}"]`);
    if (card && confirm("Voulez-vous vraiment supprimer cette carte ?")) {
        // Supprime la carte du DOM
        card.remove();
        saveCards(); // Sauvegarde les cartes
    }
}

/**
 * Modifie la couleur d'une carte existante
 * @param {number} cardId - Identifiant de la carte à modifier
 */
function changeCardColor(cardId) {
    const card = document.querySelector(`.card[data-id="${cardId}"]`);
    if (card) {
        const newColor = askCardColor(); // Demande la nouvelle couleur
        // Applique la nouvelle couleur
        card.style.backgroundColor =
            newColor === "red" ? "#ffdddd" :
            newColor === "yellow" ? "#ffffcc" :
            "#ddffdd"; // Vert clair
        saveCards(); // Sauvegarde les cartes
    }
}

// Fonction pour demander à l'utilisateur de choisir une couleur parmi une liste prédéfinie
// Retourne la couleur choisie sous forme de chaîne de caractères ("red", "yellow" ou "green")
function askCardColor() {
    let color; // Variable pour stocker la couleur sélectionnée

    // Boucle infinie pour forcer l'utilisateur à entrer une valeur valide
    while (true) {
        // Affiche une boîte de dialogue pour demander à l'utilisateur de choisir une couleur
        // Les options sont : 1 (Rouge), 2 (Jaune), 3 (Vert)
        const userChoice = prompt("Choisissez une couleur pour la carte :\n1. Rouge\n2. Jaune\n3. Vert\n(Tapez 1, 2 ou 3)");

        // Vérifie si l'utilisateur a choisi l'option 1 (Rouge)
        if (userChoice === "1") {
            color = "red"; // Assigne la valeur "red" à la variable color
            break; // Sort de la boucle car le choix est valide
        }
        // Vérifie si l'utilisateur a choisi l'option 2 (Jaune)
        else if (userChoice === "2") {
            color = "yellow"; // Assigne la valeur "yellow" à la variable color
            break; // Sort de la boucle car le choix est valide
        }
        // Vérifie si l'utilisateur a choisi l'option 3 (Vert)
        else if (userChoice === "3") {
            color = "green"; // Assigne la valeur "green" à la variable color
            break; // Sort de la boucle car le choix est valide
        }
        // Si l'utilisateur entre une valeur non valide, affiche un message d'erreur
        else {
            alert("Choix invalide. Veuillez taper 1, 2 ou 3.");
        }
    }

    // Retourne la couleur sélectionnée
    return color;
}

/**
 * Active le drag and drop pour toutes les cartes et colonnes
 */
function setupDragAndDrop() {
    // Sélectionne toutes les cartes
    const cards = document.querySelectorAll('.card');
    // Sélectionne toutes les colonnes
    const columns = document.querySelectorAll('.column');

    // Pour chaque carte, ajoute les écouteurs d'événements pour le drag and drop
    cards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            // Stocke l'identifiant de la carte en cours de déplacement
            e.dataTransfer.setData('text/plain', card.dataset.id);
            card.classList.add('dragging'); // Ajoute une classe pour le style
        });
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging'); // Retire la classe après le déplacement
            saveCards(); // Sauvegarde les cartes
        });
    });

    // Pour chaque colonne, ajoute les écouteurs pour accepter les cartes
    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permet le drop
        });
        column.addEventListener('drop', (e) => {
            e.preventDefault();
            // Récupère l'identifiant de la carte déplacée
            const cardId = e.dataTransfer.getData('text/plain');
            // Trouve la carte dans le DOM
            const card = document.querySelector(`.card[data-id="${cardId}"]`);
            if (card) {
                // Ajoute la carte à la colonne cible
                column.querySelector('.cards').appendChild(card);
                saveCards(); // Sauvegarde les cartes
            }
        });
    });
}

/**
 * Sauvegarde toutes les cartes dans localStorage
 */
function saveCards() {
    // Structure pour stocker les cartes par colonne
    const columns = {
        todo: [],
        'in-progress': [],
        done: []
    };
    // Pour chaque colonne, récupère les cartes et leur contenu
    document.querySelectorAll('.column').forEach(column => {
        const status = column.dataset.status;
        column.querySelectorAll('.card').forEach(card => {
            const contentDiv = card.querySelector('.card-content');

            const backgroundColor = card.style.backgroundColor; //Récupère aussi la couleur de fond

            // Stocke l'identifiant et le contenu de la carte
            columns[status].push({
                id: card.dataset.id,
                content: contentDiv.textContent,
                color: backgroundColor //Sauvegarde la couleur
            });
        });
    });
    // Sauvegarde dans localStorage
    localStorage.setItem('kanbanCards', JSON.stringify(columns));
}

/**
 * Charge les cartes sauvegardées depuis localStorage
 */
function loadCards() {
    // Récupère les cartes sauvegardées
    const savedCards = localStorage.getItem('kanbanCards');
    if (savedCards) {
        // Parse les données JSON
        const columns = JSON.parse(savedCards);
        // Pour chaque colonne, recrée les cartes dans le DOM
        for (const [status, cards] of Object.entries(columns)) {
            const cardsContainer = document.getElementById(`${status}-cards`);
            cardsContainer.innerHTML = '';
            cards.forEach(card => {
                // Crée une nouvelle carte
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.draggable = true;
                cardElement.dataset.id = card.id;
                // Définit le contenu HTML de la carte
                cardElement.innerHTML = `
                    <div class="card-content">${card.content}</div>
                    <div class="card-actions">
                        <button class="edit-btn" onclick="editCard(${card.id})">✏️</button>
                        <button class="color-btn" onclick="changeCardColor(${card.id})">🎨</button>
                        <button class="delete-btn" onclick="deleteCard(${card.id})">❌</button>
                    </div>
                `;

                // MODIFIÉ : Applique la couleur sauvegardée
                if (card.color) {
                    cardElement.style.backgroundColor = card.color;
                }

                // Ajoute la carte au conteneur
                cardsContainer.appendChild(cardElement);
            });
        }
    }
}