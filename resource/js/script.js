import '/resource/js/firebase-init.js';

document.addEventListener('DOMContentLoaded', () => {
    const session = JSON.parse(localStorage.getItem('auth'));
    const now = Date.now();

    if (session && session.token && session.tokenExpiry > now) {
        if (session.role === 'admin') {
            window.location.href = '/resource/views/content/admin/index.html';
        } else if (session.role === 'user') {
            window.location.href = '/resource/views/content/user/index.html';
        } else {
            localStorage.removeItem('auth');
            window.location.href = '/resource/views/auth/index.html';
        }
    } else {
        localStorage.removeItem('auth');
        window.location.href = '/resource/views/auth/index.html';
    }
});
