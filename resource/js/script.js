// script.js (root logic untuk index.html)
document.addEventListener('DOMContentLoaded', () => {
    const session = JSON.parse(localStorage.getItem('auth'));
    const now = Date.now();

    if (session && session.token && session.tokenExpiry > now) {
        // Token masih aktif, arahkan ke halaman sesuai role
        if (session.role === 'admin') {
            window.location.href = '/resource/views/content/admin/index.html';
        } else if (session.role === 'user') {
            window.location.href = '/resource/views/content/user/index.html';
        } else {
            // Role tidak dikenali, hapus session
            localStorage.removeItem('auth');
            window.location.href = '/resource/views/auth/index.html';
        }
    } else {
        // Belum login atau token expired
        localStorage.removeItem('auth');
        window.location.href = '/resource/views/auth/index.html';
    }
});
