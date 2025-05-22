import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import styles from "./header.module.css"; // Import CSS module

function Header() {
  const [user, setUser] = useState(!!localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("token");
      setUser(!!token);
    };
    checkUser();
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/");
  };

  return (
    <section className={styles.navbarwrapper}>
      <div className={styles.logo}>
        <Link to="/questions">
          <img
            src="https://legacy.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navbar Links */}
      <div className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.home}>
          <Link to="/questions">Home</Link>
        </div>
        <div className={styles.works}>
          <Link to="#">How it works</Link>
        </div>

        {location.pathname === "/" ? (
          <Link to="/">
            <button className={styles.signin}>SIGN IN</button>
          </Link>
        ) : user ? (
          <button onClick={handleSignOut} className={styles.signout}>
            Log Out
          </button>
        ) : (
          <Link to="/">
            <button className={styles.signin}>SIGN IN</button>
          </Link>
        )}
        <Link to="/profile">Profile</Link>
      </div>
    </section>
  );
}

export default Header;
