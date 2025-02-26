import React from "react";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      if (user) {
        setUser(user.email[0].toUpperCase());
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
        setUser(user.email[0].toUpperCase());
        console.log(user);
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
          <span>E</span>
        </button>
      )}
    </nav>
  );
}

export default App;
