AOS.init();
// animasi
const animationReset = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/asset/animation/lottie/AnimationReset.json' // path animasi reset
});