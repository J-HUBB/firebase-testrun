import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedId = "WAadXat9zbGmnH8e7Kej";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    console.log(post);
    const newPost = {
     ...post,
      title: "Land a $1m job"
    };
    console.log(newPost);
    updateDoc(postRef, newPost);
  }

 function deletePost() {
  const hardcodedId = "WAadXat9zbGmnH8e7Kej";
  const postRef = doc(db, "posts", hardcodedId);
  deleteDoc(postRef);
 }

 function createPost() {
  const post = {
    title: "Finish Interview Section",
    description: "Do Frontend Simplified",
    uid: user.uid,
  };
   addDoc(collection(db, "posts"), post);
 }

 async function getAllPosts() {
   const { docs } = await getDocs(collection(db, "posts"));
   const posts = docs.map(elem => ({...elem.data(), id: elem.id }));
   console.log(posts);
 }

 async function getPostById(id) {
   const postRef = doc(db, "posts", id);
   const postSnap = await getDoc(postRef);
   return postSnap.data();
 }

 async function getPostByUid() {
   const postCollectionRef = await query(
     collection(db, "posts"),
     where("uid", "==", user.uid)
   );
   const { docs } = await getDocs(postCollectionRef);
   console.log(docs.map(doc => doc.data()));
 }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        setUser(user);
        console.log(user.email[0].toUpperCase());
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <nav>
      <div className="nav__container">
        FrontendSimplified
        <ul className="nav__links">
          <li className="nav__list">
            {loading ? (
              <>
                <div className="skeleton__loading"></div>
              </>
            ) : (
              <button className="regbtn" onClick={register}>
                Register
              </button>
            )}
          </li>
          <li className="nav__list">
            {loading ? (
              <>
                <div className="skeleton__loading"></div>
              </>
            ) : (
              <button className="loginbtn" onClick={login}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>

      {loading ? (
        <>
          <div className="skeleton__logout"></div>
        </>
      ) : (
        <button className="logoutbtn" onClick={logout}>
          {user.email}
        </button> 
      )}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </nav>
  );
}

export default App;
