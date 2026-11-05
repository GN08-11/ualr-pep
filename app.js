import { auth, db } from "./firebase.js";

import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

document
.getElementById("loginBtn")
.addEventListener("click", async () => {

    await signInWithPopup(
        auth,
        provider
    );

});