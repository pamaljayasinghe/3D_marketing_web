"use client";
import { useState } from "react";
import "../app/styles/Model.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Desktop Menu */}
          <div className="nav-left">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#features" className="nav-link">
              Features
            </a>
          </div>

          {/* Centered Logo */}
          <div className="logo-container">
            <div className="logo-circle">
              <img src="/models/logo.png" alt="Logo" className="nav-logo" />
            </div>
          </div>

          <div className="nav-right">
            <a href="#comingsoon" className="nav-link">
              Coming Soon
            </a>
            <a href="#team" className="nav-link">
              Team
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="menu-toggle" onClick={toggleMenu}>
            <div className={`hamburger ${isOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        <div className="mobile-logo-container">
          <div className="logo-circle">
            <img src="/models/logo.png" alt="Logo" className="nav-logo" />
          </div>
        </div>
        <button className="close-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
        </button>
        <div className="mobile-links">
          <a href="#home" className="mobile-link" onClick={toggleMenu}>
            Home
          </a>
          <a href="#features" className="mobile-link" onClick={toggleMenu}>
            Features
          </a>
          <a href="#comingsoon" className="mobile-link" onClick={toggleMenu}>
            Coming Soon
          </a>
          <a href="#team" className="mobile-link" onClick={toggleMenu}>
            Team
          </a>
          <a href="#contact" className="mobile-link" onClick={toggleMenu}>
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
