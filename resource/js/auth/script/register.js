import AOS from "https://cdn.jsdelivr.net/npm/aos@2.3.4/+esm";
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm";

// Firebase imports
import { auth, db } from '/resource/js/firebase-init.js';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Inisialisasi AOS dan animasi
AOS.init();

const animation = lottie.loadAnimation({
  container: document.getElementById('lottie-animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/asset/animation/lottie/AnimationRegis.json'
});

// Form submit handler
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim().toLowerCase();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (password !== confirmPassword) {
    Swal.fire('Error', 'Password dan konfirmasi password tidak cocok!', 'error');
    return;
  }

  try {
    // Cek apakah username sudah digunakan
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      Swal.fire('Error', 'Username sudah digunakan, coba yang lain!', 'error');
      return;
    }

    // Buat akun di Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data user di Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      role: "user",
      createdAt: serverTimestamp()
    });

    Swal.fire('Berhasil', 'Akun berhasil dibuat, silakan login.', 'success')
      .then(() => window.location.href = "/index.html?page=login");

  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
});
