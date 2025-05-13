import React, { useState } from 'react';

const ChatbotWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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

  return (
    <div style={styles.container}>
      <div style={styles.header}>🐾 VetLib Assistant</div>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.messageBubble,
              alignSelf: msg.sender === 'Moi' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'Moi' ? '#91D5BE' : '#f1f0f0',
              borderTopLeftRadius: msg.sender === 'Moi' ? 12 : 0,
              borderTopRightRadius: msg.sender === 'Moi' ? 0 : 12,
            }}
          >
            <span style={styles.senderLabel}>{msg.sender}</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Posez votre question..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          ➤
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 340,
    maxHeight: 500,
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
    backgroundColor: '#91D5BE',
    color: '#fff',
    border: 'none',
    padding: '0 16px',
    fontSize: 16,
    cursor: 'pointer',
    borderRadius: 8,
    transition: 'background-color 0.2s ease',
  },
};

export default ChatbotWidget;
