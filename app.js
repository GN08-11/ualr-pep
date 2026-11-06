import { auth, db } from "./firebase.js";

import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    increment
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ==========================
   ELEMENTS
========================== */

const loginBtn = document.getElementById("loginBtn");
const profileArea = document.getElementById("profileArea");

const postInput = document.getElementById("postInput");
const postBtn = document.getElementById("postBtn");

const feed = document.getElementById("feed");

/* ==========================
   LOGIN
========================== */

const provider = new GoogleAuthProvider();

loginBtn.addEventListener("click", async () => {

    if (auth.currentUser) {

        await signOut(auth);

        return;
    }

    try {

        await signInWithPopup(
            auth,
            provider
        );

    }
    catch (error) {

        console.error(error);

        alert(
            "Failed to sign in."
        );
    }

});

/* ==========================
   USER STATE
========================== */

onAuthStateChanged(auth, (user) => {

    if (user) {

        loginBtn.textContent =
            "Logout";

        profileArea.innerHTML = `
            <img
                src="${user.photoURL}"
                alt="Profile"
                style="
                    width:40px;
                    height:40px;
                    border-radius:50%;
                "
            >

            <span>
                ${user.displayName}
            </span>
        `;

    }
    else {

        loginBtn.textContent =
            "Login";

        profileArea.innerHTML = "";
    }

});

/* ==========================
   CREATE POST
========================== */

postBtn.addEventListener(
    "click",
    createPost
);

async function createPost() {

    if (!auth.currentUser) {

        alert(
            "Please login first."
        );

        return;
    }

    const text =
        postInput.value.trim();

    if (text === "") {

        alert(
            "Post cannot be empty."
        );

        return;
    }

    try {

        await addDoc(

            collection(
                db,
                "posts"
            ),

            {

                author:
                    auth.currentUser.displayName,

                email:
                    auth.currentUser.email,

                photo:
                    auth.currentUser.photoURL,

                text:
                    text,

                likes:
                    0,

                createdAt:
                    Date.now()

            }

        );

        postInput.value = "";

    }
    catch (error) {

        console.error(error);

        alert(
            "Failed to create post."
        );
    }

}

/* ==========================
   FEED
========================== */

const postQuery = query(
    collection(db, "posts"),
    orderBy(
        "createdAt",
        "desc"
    )
);

onSnapshot(
    postQuery,
    loadPosts
);

/* ==========================
   DISPLAY POSTS
========================== */

function loadPosts(snapshot) {

    feed.innerHTML = "";

    snapshot.forEach((postDoc) => {

        const post =
            postDoc.data();

        const postId =
            postDoc.id;

        const postElement =
            document.createElement("article");

        postElement.classList.add(
            "post"
        );

        const date =
            new Date(
                post.createdAt
            );

        postElement.innerHTML = `

            <div class="post-header">

                <img
                    class="post-avatar"
                    src="${post.photo}"
                    alt="Profile"
                >

                <div>

                    <h3 class="post-author">
                        ${post.author}
                    </h3>

                    <span class="post-date">
                        ${date.toLocaleString()}
                    </span>

                </div>

            </div>

            <p class="post-content">
                ${post.text}
            </p>

            <div class="post-actions">

                <button
                    class="like-btn"
                    data-id="${postId}"
                >
                    ❤️ ${post.likes}
                </button>

            </div>
        `;

        feed.appendChild(
            postElement
        );

    });

    attachLikeEvents();
}

/* ==========================
   LIKE POSTS
========================== */

function attachLikeEvents() {

    const buttons =
        document.querySelectorAll(
            ".like-btn"
        );

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            async () => {

                const postId =
                    button.dataset.id;

                try {

                    const postRef =
                        doc(
                            db,
                            "posts",
                            postId
                        );

                    await updateDoc(
                        postRef,
                        {
                            likes:
                            increment(
                                1
                            )
                        }
                    );

                }
                catch (error) {

                    console.error(
                        error
                    );

                }

            }
        );

    });

}

/* ==========================
   STARTUP MESSAGE
========================== */

console.log(
    "UALR Pep Band Connected"
);