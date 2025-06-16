import { login, loginWithGoogle } from '/resource/js/auth/auth.js';

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const identifier = document.getElementById("identifier").value.trim();
    const password = document.getElementById("password").value.trim();
    await login(identifier, password);
});

document.getElementById("googleLoginBtn").addEventListener("click", async function () {
    await loginWithGoogle();
});
