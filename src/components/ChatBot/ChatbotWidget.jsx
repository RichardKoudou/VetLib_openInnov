import React, { useState, useEffect, useRef } from 'react';

const ChatbotWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatBoxRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'Moi', text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch('http://localhost:3333/OPoil/v1/chatbot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages([
        ...newMessages,
        { sender: 'Bot', text: data.response || "Je n'ai pas compris." },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: 'Bot', text: 'Erreur serveur' },
      ]);
    }

    setInput('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={styles.chatIcon}
        >
          💬
        </div>
      )}

      {isOpen && (
        <div ref={chatBoxRef} style={styles.container}>
          <div style={styles.header}>🐾 VetLib Assistant</div>
          <div style={styles.chatBox}>
            {messages.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={styles.dogEmoji}>🐶</span>
                <p style={styles.emptyText}>Posez-moi une question !</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.messageBubble,
                    alignSelf: msg.sender === 'Moi' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === 'Moi' ? '#007BFF' : '#f1f0f0',
                    borderTopLeftRadius: msg.sender === 'Moi' ? 12 : 0,
                    borderTopRightRadius: msg.sender === 'Moi' ? 0 : 12,
                  }}
                >
                  <span style={styles.senderLabel}>{msg.sender}</span>
                  <span>{msg.text}</span>
                </div>
              ))
            )}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Posez votre question..."
              style={styles.input}
              autoFocus
            />
            <button onClick={sendMessage} style={styles.button}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 340,
    height: 500, // fixe la hauteur pour éviter l'effet "saut"
    borderRadius: 20,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    fontFamily: '"Helvetica Neue", sans-serif',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    overflow: 'hidden',
    border: '1px solid #e6e6e6',
  },
  header: {
    backgroundColor: '#fafafa',
    color: '#262626',
    padding: 12,
    fontWeight: 600,
    fontSize: 16,
    textAlign: 'center',
    borderBottom: '1px solid #dbdbdb',
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#ffffff',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: '10px 14px',
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 1.4,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    display: 'flex',
    flexDirection: 'column',
  },
  senderLabel: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #dbdbdb',
    padding: 10,
    backgroundColor: '#fafafa',
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    borderRadius: 8,
    border: '1px solid #dbdbdb',
    outline: 'none',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '0 16px',
    fontSize: 16,
    cursor: 'pointer',
    borderRadius: 8,
    transition: 'background-color 0.2s ease',
  },
  chatIcon: {
    position: 'fixed',
    bottom: 50,
    right: 8,
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: 24,
    padding: 8,
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
    textAlign: 'center',
    padding: 20,
  },
  dogEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
  },
};

export default ChatbotWidget;
