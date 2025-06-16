protectPage(['admin']);

const session = JSON.parse(localStorage.getItem('auth'));

if (!session || session.role !== 'admin') {
  window.location.href = "/index.html?page=login";
}
AOS.init();
function updateClock() {
  const now = new Date();
  const options = { timeZone: 'Asia/Jakarta', hour12: false };
  const timeString = now.toLocaleTimeString('id-ID', options);
  document.getElementById('clock').textContent = timeString + " WIB";
}
setInterval(updateClock, 1000);
updateClock();

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("show");
  overlay.classList.toggle("show");
}

// (ROUTING SYSTEM)
const routes = {
  '/resource/views/content/admin/content/dashboard.html': {
    script: '/resource/js/content/admin/script/dashboard.js',
    callback: 'loadProductData'
  },
  '/resource/views/content/admin/content/product/addProduct.html': {
    script: '/resource/js/content/admin/script/product/addProduct.js',
    callback: 'loadProductData'
  },
  '/resource/views/content/admin/content/product/listProductRequest.html': {
    script: '/resource/js/content/admin/script/product/productRequest.js',
    callback: 'loadProductData'
  },
  '/resource/views/content/admin/content/orders/orders.html': {
    script: '/resource/js/content/admin/script/orders/orders.js',
    callback: 'loadOrderData'
  },
  '/resource/views/content/admin/content/orders/pendingOrders.html': {
    script: '/resource/js/content/admin/script/orders/pendingOrders.js',
    callback: 'loadOrderData'
  },
  '/resource/views/content/admin/content/buyers/buyers.html': {
    script: '/resource/js/content/admin/script/buyers/dataBuyers.js',
    callback: 'loadBuyerData'
  },
  '/resource/views/content/admin/content/buyers/informationChat.html': {
    script: '/resource/js/content/admin/script/buyers/informationChat.js',
    callback: 'loadBuyerData'
  },
  '/resource/views/content/admin/content/buyers/Chat.html': {
    script: '/resource/js/content/admin/script/buyers/nChat.js',
    callback: 'loadBuyerData'
  },
  '/resource/views/content/admin/content/payment/allPayment.html': {
    script: '/resource/js/content/admin/script/payment/allPayment.js',
    callback: 'loadPaymentData'
  },
  '/resource/views/content/admin/content/payment/normalPayment.html': {
    script: '/resource/js/content/admin/script/payment/normalPayment.js',
    callback: 'loadPaymentData'
  },
  '/resource/views/content/admin/content/payment/debtPayment.html': {
    script: '/resource/js/content/admin/script/payment/debtPayment.js',
    callback: 'loadPaymentData'
  },
  '/resource/views/content/admin/content/report/chart.html': {
    script: '/resource/js/content/admin/script/report/chart.js',
    callback: 'loadReporttData'
  },
  '/resource/views/content/admin/content/report/tableReport.html': {
    script: '/resource/js/content/admin/script/report/tableReport.js',
    callback: 'loadReportData'
  },
  'statistics.html': {
    script: 'public/statistics.js',
    callback: 'loadStatisticsData'
  },
  'calendar.html': {
    script: 'public/calendar.js',
    callback: 'loadCalendarData'
  },
  'reports.html': {
    script: 'public/reports.js',
    callback: 'loadReportsData'
  }
};

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
  const defaultPage = '/resource/views/content/admin/content/dashboard.html';
  loadPage(defaultPage, 'Dashboard');
});