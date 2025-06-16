AOS.init();

// Animate (pastikan ada elemen #lottie-animation jika mau animasi ini jalan)
const animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/asset/animation/lottie/AnimationLogin.json'
});

// Pasang event submit form langsung (form sudah ada saat script dipanggil)
const form = document.getElementById('loginForm');
if (!form) {
    console.error('Form login tidak ditemukan');
} else {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (typeof login === 'function') {
            login(username, password); // fungsi dari auth.js
        } else {
            console.error('Fungsi login() tidak ditemukan');
        }
    });
}
