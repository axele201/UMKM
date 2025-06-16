AOS.init();

const authRoutes = {
    'login': {
        html: '/resource/views/auth/content/login.html',
        script: '/resource/js/auth/script/login.js'
    },
    'register': {
        html: '/resource/views/auth/content/register.html',
        script: '/resource/js/auth/script/register.js'
    },
    'reset': {
        html: '/resource/views/auth/content/resetPassword.html',
        script: '/resource/js/auth/script/reset.js'
    }
};

const userDB = [
    { username: 'admin', password: 'admin123', role: 'admin', token: null, tokenExpiry: null },
    { username: 'user', password: 'user123', role: 'user', token: null, tokenExpiry: null }
];

function loadAuthPage(pageKey = 'login') {
    const route = authRoutes[pageKey];
    if (!route) {
        console.error(`Page "${pageKey}" tidak ditemukan.`);
        return;
    }

    $('#auth-container').load(route.html, function () {
        $.getScript(route.script)
            .done(() => console.log(`${pageKey} loaded`))
            .fail(() => console.error(`Gagal load script ${route.script}`));
    });
}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function generateToken() {
    return 'token-' + Math.random().toString(36).substr(2) + Date.now();
}

function saveSession(user) {
    localStorage.setItem('auth', JSON.stringify(user));
}

function getSession() {
    return JSON.parse(localStorage.getItem('auth'));
}

function clearSession() {
    localStorage.removeItem('auth');
}

function login(username, password) {
    const user = userDB.find(u => u.username === username && u.password === password);

    if (!user) {
        Swal.fire('Gagal', 'Username atau password salah!', 'error');
        return;
    }

    const now = Date.now();

    // Cek apakah user sudah login di device lain
    if (user.token && user.tokenExpiry > now) {
        Swal.fire('Gagal', 'Akun ini sedang login di device lain!', 'error');
        return;
    }

    // Generate token
    const token = generateToken();
    user.token = token;
    user.tokenExpiry = now + (60 * 60 * 1000); // 1 jam

    saveSession({
        username: user.username,
        role: user.role,
        token: user.token,
        tokenExpiry: user.tokenExpiry
    });

    redirectUser(user.role);
}

function logout() {
    const session = getSession();
    if (session) {
        const user = userDB.find(u => u.username === session.username);
        if (user) {
            user.token = null;
            user.tokenExpiry = null;
        }
    }
    clearSession();
    window.location.href = "/index.html";
}

function redirectUser(role) {
    if (role === 'admin') {
        window.location.href = "/resource/views/content/admin/index.html";
    } else if (role === 'user') {
        window.location.href = "/resource/views/content/user/index.html";
    }
}

function checkTokenOnLoad() {
    const session = getSession();
    const now = Date.now();

    if (session) {
        if (session.tokenExpiry > now) {
            redirectUser(session.role);
        } else {
            // Token expired
            clearSession();
            Swal.fire('Sesi Habis', 'Silahkan login kembali!', 'warning');
        }
    }
}

// Ketika page load, cek apakah sudah login
$(document).ready(function () {
    checkTokenOnLoad();

    const page = getQueryParam('page') || 'login';
    loadAuthPage(page);
});