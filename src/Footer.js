import React from 'react';
import ChatbotWidget from './components/ChatBot/ChatbotWidget';
import { FaFacebookF, FaXTwitter, FaInstagram } from 'react-icons/fa6';

function Footer() {
  return (
    <>
      {/* Espacement pour ne pas masquer les éléments au-dessus */}
      <div style={{ height: '80px' }}></div>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLeft}>
            <p>&copy; 2025 VetLib. Tous droits réservés.</p>
            <p>
              Contactez-nous :{' '}
              <a href="mailto:contact@vetlib.com" style={styles.email}>
                contact@vetlib.com
              </a>
            </p>
          </div>
          <div style={styles.footerRight}>
            <p>Suivez-nous :</p>
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

        {/* Chatbot intégré dans le footer */}
        <ChatbotWidget />
      </footer>
    </>
  );
}

const styles = {
  footer: {
    backgroundColor: '#91D5BE',
    color: '#222',
    padding: '20px 40px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    zIndex: 100,
    position: 'relative',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1200px',
    gap: '20px',
  },
  footerLeft: {
    fontSize: '14px',
    lineHeight: '1.6',
    flex: 1,
    minWidth: '250px',
  },
  footerRight: {
    fontSize: '14px',
    textAlign: 'right',
    flex: 1,
    minWidth: '250px',
  },
  email: {
    color: '#222',
    textDecoration: 'underline',
  },
  socialLinks: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
    justifyContent: 'flex-end',
  },
  icon: {
    color: '#fff',
    backgroundColor: '#555',
    borderRadius: '50%',
    fontSize: '16px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
};

export default Footer;
