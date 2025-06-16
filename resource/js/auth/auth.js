// Import eksternal
import AOS from "https://cdn.jsdelivr.net/npm/aos@2.3.4/+esm";
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm";

// Import Firebase inits
import { auth, db, googleProvider } from '/resource/js/firebase-init.js';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Jalankan AOS
AOS.init();

// Routing halaman auth
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

// Load halaman auth
function loadAuthPage(pageKey = 'login') {
  const route = authRoutes[pageKey];
  if (!route) {
    console.error(`❌ Halaman "${pageKey}" tidak ditemukan`);
    return;
  }

  $('#auth-container').load(route.html, async function () {
    try {
      await import(route.script);
      console.log(`✅ ${pageKey} module loaded`);
    } catch (err) {
      console.error(`❌ Gagal memuat modul ${route.script}`, err);
    }
  });
}

// ambil parameter dari URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Simpan session ke localStorage
function saveSession(user, role) {
  localStorage.setItem('auth', JSON.stringify({
    email: user.email,
    uid: user.uid,
    role: role
  }));
}

// Ambil session
function getSession() {
  return JSON.parse(localStorage.getItem('auth'));
}

// Hapus session
function clearSession() {
  localStorage.removeItem('auth');
}

// Redirect user berdasarkan role
function redirectUser(role) {
  if (role === 'admin') {
    window.location.href = "/resource/views/content/admin/index.html";
  } else {
    window.location.href = "/resource/views/content/user/index.html";
  }
}

// Ambil role user dari Firestore
async function getUserRole(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data().role || 'user') : 'user';
}

// Login manual (email/username + password)
export async function login(identifier, password) {
  try {
    let emailToUse = identifier;
    if (!identifier.includes('@')) {
      const q = query(collection(db, "users"), where("username", "==", identifier));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) throw new Error("Username tidak ditemukan");
      emailToUse = querySnapshot.docs[0].data().email;
    }

    const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password);
    const user = userCredential.user;
    const role = await getUserRole(user.uid);
    saveSession(user, role);
    redirectUser(role);

  } catch (error) {
    Swal.fire('Login Gagal', error.message, 'error');
  }
}
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        username: user.displayName.toLowerCase().replace(/\s/g, ''),
        email: user.email,
        role: 'user',
        createdAt: new Date()
      });
    }

    const role = await getUserRole(user.uid);
    saveSession(user, role);
    redirectUser(role);

  } catch (error) {
    Swal.fire('Google Login Gagal', error.message, 'error');
  }
}
export function logout() {
  signOut(auth).then(() => {
    clearSession();
    window.location.href = "/index.html";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const role = await getUserRole(user.uid);
      saveSession(user, role);
      redirectUser(role);
    } else {
      const page = getQueryParam('page') || 'login';
      loadAuthPage(page);
    }
  });
});
