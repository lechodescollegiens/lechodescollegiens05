// Liste des utilisateurs autorisés
const USERS = [
    { username: "t.barbie1", password: "Chaton05." }, // Mot de passe mis à jour
    { username: "f.buisson", password: "biensoigné" },
    { username: "a.guillaume", password: "superjournal" }
];

document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("login-section");
    const adminSection = document.getElementById("admin-section");
    const loginBtn = document.getElementById("login-btn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("login-error");
    const uploadForm = document.getElementById("upload-form");
    const uploadMsg = document.getElementById("upload-msg");

    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const user = USERS.find(u => u.username === username && u.password === password);
        if (user) {
            loginSection.style.display = "none";
            adminSection.style.display = "block";
        } else {
            loginError.textContent = "Identifiant ou mot de passe incorrect !";
        }
    });

    // Affiche le message du résultat de l'upload (après retour du PHP)
    if (window.location.search.includes("upload=")) {
        const params = new URLSearchParams(window.location.search);
        const result = params.get("upload");
        if (result === "success") {
            uploadMsg.textContent = "Upload réussi !";
            uploadMsg.style.color = "green";
        } else if (result === "error") {
            uploadMsg.textContent = "Erreur lors du téléversement.";
            uploadMsg.style.color = "red";
        } else if (result === "type") {
            uploadMsg.textContent = "Le fichier doit être un PDF.";
            uploadMsg.style.color = "red";
        }
    }
});
