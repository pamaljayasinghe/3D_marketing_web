"use client";
import React from "react";
import "../app/styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-links">
              <a href="mailto:info@example.com">
                <i className="far fa-envelope"></i>
                info@myfiton.com
              </a>
              <a href="tel:+94">
                <i className="fas fa-phone"></i>
                +94 (71) 00000
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Address</h4>
            <p>Bambalapitiya</p>
            <p>Colombo</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/my.fiton?igsh=a3JjNWIxZ2luOXdp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
                Instagram
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
                Linkdin
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} SE GROUP - 94. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
