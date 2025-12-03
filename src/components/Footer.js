import React from 'react';
import { Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>LuxeStay</h4>
          <p>Your perfect stay awaits</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p className="contact-item">
            <Phone size={16} /> +1 (555) 123-4567
          </p>
          <p className="contact-item">
            <Mail size={16} /> info@luxestay.com
          </p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#facebook" className="social-link">Facebook</a>
            <a href="#twitter" className="social-link">Twitter</a>
            <a href="#instagram" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 LuxeStay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;