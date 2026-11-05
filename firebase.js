// Firebase Core
import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// Authentication
import { getAuth }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firestore Database
import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Storage (for photos later)
import { getStorage }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBR43GuraCyiato8AdZ5oIWrkAcSrB3BTw",
    authDomain: "ualr-pep.firebaseapp.com",
    projectId: "ualr-pep",
    storageBucket: "ualr-pep.firebasestorage.app",
    messagingSenderId: "646845489723",
    appId: "1:646845489723:web:a11fab8c6364db0ccdb21e",
    measurementId: "G-74BB8Z1RS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

rules_version = '2';

service cloud.firestore {

  match /databases/{database}/documents {

    match /{document=**} {

      allow read, write: if true;

    }
  }
}

// Storage
export const storage = getStorage(app);

// Export app if needed later
export default app;











// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBR43GuraCyiato8AdZ5oIWrkAcSrB3BTw",
//   authDomain: "ualr-pep.firebaseapp.com",
//   projectId: "ualr-pep",
//   storageBucket: "ualr-pep.firebasestorage.app",
//   messagingSenderId: "646845489723",
//   appId: "1:646845489723:web:a11fab8c6364db0ccdb21e",
//   measurementId: "G-74BB8Z1RS6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);