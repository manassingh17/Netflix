import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./utils/Firebase";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG_URL } from "../utils/constans";
import Spinner from "./Spinner";
const Login = () => {
  const [signedIn, setSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const isSignedIn = () => {
    setSignedIn(!signedIn);
  };
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    //for validating form
    setLoading(true);
    setErrorMessage(null);

    const message = checkValidData(email.current.value, password.current.value); //since useRef returns an object and i extract the name and pass from that object
    setErrorMessage(message);
    if (message) {
      setLoading(false);
      return;
    }

    if (!signedIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/128176157?v=4",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
              
            })
            .finally(() => {
              setLoading(false); // Reset loading state
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          setLoading(false);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        })
        .finally(() => {
          setLoading(false); // Reset loading state
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute  ">
        <img
          className="h-screen object-cover md:h-full"
          src={BACKGROUND_IMG_URL}
          alt="backgroundimg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute text-white w-full md:w-1/4 p-12 bg-black my-36 mx-auto right-0 left-0 rounded-md bg-opacity-80"
      >
        <h4 className="text-white text-3xl font-bold mb-6">
          Sign {signedIn ? "In" : "Up"}{" "}
        </h4>
        {!signedIn && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-2 my-4 bg-black border rounded-sm
        w-full"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-2 my-4 bg-black border rounded-sm
        w-full"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 bg-black border rounded-sm
        w-full"
        />
        <p className="text-red-500 ">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="bg-red-600 rounded-md flex items-center justify-center text-white p-2 my-4 w-full"
          disabled={loading} // Optionally disable the button while loading
        >
          {loading ? (
            <div
              className="w-6 h-6 border-4 border-t-4 border-t-red-600 border-gray-300 border-solid rounded-full animate-spin
"
            ></div>
          ) : (
            `Sign ${signedIn ? "In" : "Up"}`
          )}
        </button>
        <p onClick={isSignedIn} className="cursor-pointer">
          {signedIn
            ? "New to Netflix? Sign up now"
            : "Already have an account?Sign In"}{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
