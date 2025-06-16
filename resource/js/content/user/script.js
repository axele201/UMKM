// Cek session
protectPage(['user']);
const session = JSON.parse(localStorage.getItem('auth'));

if (!session || session.role !== 'user') {
  window.location.href = "/index.html?page=login";
}

AOS.init();

// ROUTING SYSTEM
const routes = {
  '/resource/views/content/user/content/home.html': {
    script: '/resource/js/content/user/script/home.js',
    callback: null // ⛔️ tidak perlu callback jika pakai ES Module
  },
  '/resource/views/content/user/content/product.html': {
    script: '/resource/js/content/user/script/product.js',
    callback: null
  },
  '/resource/views/content/user/content/pemesanan.html': {
    script: '/resource/js/content/user/script/pemesanan.js',
    callback: null
  },
  '/resource/views/content/user/content/pusatPengajuan.html': {
    script: '/resource/js/content/user/script/pengajuan.js',
    callback: null
  },
  '/resource/views/content/user/content/akun.html': {
    script: '/resource/js/content/user/script/akun.js',
    callback: null
  }
};

// SPA Loader
function loadPage(page, title = null) {
  $('#content-container').load(page, function () {
    const titleText = title || page.replace('.html', '').toUpperCase();
    $('#page-title').text(titleText);
    $('#breadcrumb-title').text(titleText);

    $('.nav-link').removeClass('active');
    $(`.nav-link[onclick*="${page}"]`).addClass('active');

    const route = routes[page];
    if (route) {
      loadScript(page, route.script);
    }
  });
}

// Script loader (pakai module)
function loadScript(pageKey, scriptPath) {
  const existingScript = document.querySelector(`script[data-page="${pageKey}"]`);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.src = scriptPath;
  script.type = 'module'; // ✅ pakai module
  script.dataset.page = pageKey;
  document.body.appendChild(script);
}

// Default halaman pertama
document.addEventListener("DOMContentLoaded", function () {
  const defaultPage = '/resource/views/content/user/content/home.html';
  loadPage(defaultPage, 'home');
});
