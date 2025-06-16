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

function loadAuthPage(pageKey = 'login') {
    const route = authRoutes[pageKey];
    if (!route) {
        console.error(`Page "${pageKey}" tidak ditemukan.`);
        return;
    }

    $('#auth-container').load(route.html, function () {
        const script = document.createElement('script');
        script.src = route.script;
        script.onload = () => console.log(`${pageKey} loaded`);
        document.body.appendChild(script);
    });
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

$(document).ready(function () {
    const page = getQueryParam('page') || 'login';
    loadAuthPage(page);
});
