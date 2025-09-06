import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // Load messages when app starts
  useEffect(() => {
    axios.get("http://localhost:4000/messages").then(res => setMessages(res.data));
  }, []);

  // Handle submit
  const addMessage = async () => {
    if (!text.trim()) return; // ignore empty input
    const res = await axios.post("http://localhost:4000/add", { text });
    setMessages([...messages, res.data]);
    setText("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Hello World App</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message"
        style={{ padding: 8, marginRight: 8 }}
      />
      <button onClick={addMessage} style={{ padding: 8 }}>Add</button>

      <ul>
        {messages.map(m => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

