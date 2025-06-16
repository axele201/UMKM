AOS.init();
// animasi
const animationReset = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/asset/animation/lottie/AnimationReset.json'
});

document.getElementById("resetForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    try {
        await auth.sendPasswordResetEmail(email);
        Swal.fire('Berhasil', 'Link reset password telah dikirim ke email Anda.', 'success')
            .then(() => window.location.href = "?page=login");
    } catch (error) {
        Swal.fire('Gagal', error.message, 'error');
    }
});