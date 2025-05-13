import React from 'react';
import ChatbotWidget from './components/ChatBot/ChatbotWidget'; 

function Footer({}){
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerLeft}>
          <p>&copy; 2025 VetLib. Tous droits réservés.</p>
          <p>Contactez-nous : <a href="mailto:contact@vetlib.com">contact@vetlib.com</a></p>
        </div>
        <div style={styles.footerRight}>
          <p>Suivez-nous :</p>
          <div style={styles.socialLinks}>
            <a href="https://www.facebook.com" style={styles.socialIcon}>F</a>
            <a href="https://www.twitter.com" style={styles.socialIcon}>T</a>
            <a href="https://www.instagram.com" style={styles.socialIcon}>I</a>
          </div>
        </div>
      </div>
      {/* Chatbot intégré dans le footer */}
      <ChatbotWidget />
    </footer>
  );
}



const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#91D5BE',
    color: 'black',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1000,
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
  },
  footerLeft: {
    fontSize: '14px',
  },
  footerRight: {
    textAlign: 'right',
    fontSize: '14px',
  },
  socialLinks: {
    marginTop: '10px',
  },
  socialIcon: {
    color: '#fff',
    margin: '0 10px',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '6px',
    borderRadius: '50%',
    backgroundColor: '#555',
  },
};

export default Footer;
