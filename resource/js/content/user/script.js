AOS.init();
// ROUTING SYSTEM
const routes = {
  '/resource/views/content/user/content/home.html': {
    script: '/resource/js/content/user/script/home.js',
    callback: 'loadHomeData'
  },
  '/resource/views/content/user/content/product.html': {
    script: '/resource/js/content/user/script/product.js',
    callback: 'loadProductData'
  },
  '/resource/views/content/user/content/pemesanan.html': {
    script: '/resource/js/content/user/script/pemesanan.js',
    callback: 'loadProductData'
  },
  '/resource/views/content/user/content/pusatPengajuan.html': {
    script: '/resource/js/content/user/script/pengajuan.js',
    callback: 'loadProductData'
  },
  '/resource/views/content/user/content/akun.html': {
    script: '/resource/js/content/user/script/akun.js',
    callback: 'loadProfieData'
  },
}
// SPA
function loadPage(page, title = null) {
  $('#content-container').load(page, function () {
    const titleText = title || page.replace('.html', '').toUpperCase();
    $('#page-title').text(titleText);
    $('#breadcrumb-title').text(titleText);

    $('.nav-link').removeClass('active');
    $(`.nav-link[onclick*="${page}"]`).addClass('active');

    const route = routes[page];
    if (route) {
      loadScript(page, route.script, route.callback);
    }
  });
}

// Script loader
function loadScript(pageKey, scriptPath, callbackName = null) {
  const existingScript = document.querySelector(`script[data-page="${pageKey}"]`);
  if (existingScript) {
    existingScript.remove();
  }
  const script = document.createElement('script');
  script.src = scriptPath;
  script.dataset.page = pageKey;
  script.onload = () => {
    if (callbackName && typeof window[callbackName] === "function") {
      window[callbackName]();
    }
  };
  document.body.appendChild(script);
}
document.addEventListener("DOMContentLoaded", function () {
  const defaultPage = '/resource/views/content/user/content/home.html';
  loadPage(defaultPage, 'home');
});