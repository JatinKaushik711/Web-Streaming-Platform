import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO, USER } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";


const Header = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
           
          });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid: uid, email: email, 
                displayName: displayName, 
                photoURL: photoURL}));
                navigate("/browse");
              // ...
            } else {
              // User is signed out
              // ...
              dispatch(removeUser());
              navigate("/");
            
            }
          });

          //Unsubscribed when component unmounts
          return () => unsubscribe();
          
    },[]);

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    };

    return(
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex flex-wrap md:justify-between">
            <img 
            className="w-44 rounded-lg mx-auto md:mx-0 "
            src = {LOGO}
            alt = "logo"/>

            {user && (<div className="flex flex-wrap">
                <button className="py-2 px-4 my-2 mx-4 bg-gradient-to-r from-slate-700 text-white rounded-lg"
                  onClick={handleGptSearchClick}>GPT Search</button>
                <img 
                className = "w-14 rounded-md" src = {USER}
                alt="icon"/>
                <button onClick={handleSignOut} className="bg-red-500 rounded-lg p-2 m-2">Sign Out</button>
            </div>)}
        </div>

    )
}

export default Header;