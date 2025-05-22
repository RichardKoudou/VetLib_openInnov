import React from 'react';
import ChatbotWidget from './components/ChatBot/ChatbotWidget';
import { FaFacebookF, FaXTwitter, FaInstagram } from 'react-icons/fa6';

function Footer() {
  return (
    <>
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLeft}>
            <p>&copy; 2025 VetLib. Tous droits réservés. | 
              <a href="mailto:contact@vetlib.com" style={styles.email}> contact@vetlib.com</a>
            </p>
          </div>
          <div style={styles.socialContainer}>
            <span>Suivez-nous :</span>
            <div style={styles.socialLinks}>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" style={styles.icon}>
                <FaFacebookF />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer" style={styles.icon}>
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" style={styles.icon}>
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <ChatbotWidget />
      </footer>
    </>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
    padding: '10px 20px',
    borderTop: '1px solid var(--hover-bg)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: 'var(--shadow)',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerLeft: {
    fontSize: '13px',
  },
  socialContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
  },
  socialLinks: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  icon: {
    color: 'var(--background-color)',
    backgroundColor: 'var(--primary-color)',
    borderRadius: 'var(--border-radius)',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'var(--transition)',
  },
  email: {
    color: '#222',
    textDecoration: 'underline',
  },
};

export default Footer;
