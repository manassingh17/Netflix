import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import Logo from "../assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleGptSearch=()=>{
    dispatch(toggleGptSearchView());
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user.uid;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="absolute flex flex-col md:flex-row justify-between w-full px-8 py-2 bg-gradient-to-b from-black z-10">
      <img
        className="w-44 mx-auto md:mx-0"
        src={Logo}
        alt="logo"
      />
      {user && (
        <div className="flex justify-between p-2">
          {/* <img
            className="w-12 h-12"
            src={user.photoURL}
            alt="logo"
          /> */}
          <button
            onClick={handleGptSearch}
            className="bg-purple-600 hover:bg-purple-800 p-2 m-2 text-white rounded-md text-sm"
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 p-2 m-2 text-white rounded-md text-sm"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
