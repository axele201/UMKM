function protectPage(allowedRoles = []) {
    const session = JSON.parse(localStorage.getItem('auth'));
    if (!session) {
        window.location.href = "/index.html?page=login";
        return;
    }

    const { role, email } = session;
    if (!allowedRoles.includes(role)) {
        Swal.fire('Akses Ditolak', 'Anda tidak memiliki akses ke halaman ini!', 'error')
            .then(() => {
                window.location.href = "/index.html?page=login";
            });
    }
}