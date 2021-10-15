import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { BsFillHouseFill } from "react-icons/bs";

function Navbar() {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    setLoginStatus(JSON.parse(localStorage.getItem("loginStatus")));
    console.log(JSON.parse(localStorage.getItem("loginStatus")));
  }, []);

  const signOut = () => {
    localStorage.setItem("loginStatus", JSON.stringify(false));
    localStorage.removeItem("userInfo");
    console.log("Ccc");
  };

  return (
    <div>
      <nav className="navbar">
        <div>
          <ul className="tag">
            <li>
              <a href="/" className="logo">
                <BsFillHouseFill color="white" size="6rem" />
              </a>
            </li>
            {!loginStatus ? (
              <div className="pageClass">
                <li>
                  <a href="signUp">SIGN UP</a>
                </li>
                <li>
                  <a href="signIn">SIGN IN</a>
                </li>
              </div>
            ) : (
              <div className="pageClass">
                 <li>
                  <a href="post" >
                    GO POST
                  </a>
                </li>
                <li>
                  <a href="allPosts" >
                    All POST
                  </a>
                </li>
                <li>
                  <a href="myProfile">MY PROFILE</a>
                </li>
                <li>
                  <a onClick={signOut} href="/">
                    SIGN OUT
                  </a>
                </li>
               
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
