// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Update the port if your server is running on a different port

// const App = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   const sendMessage = () => {
//     socket.emit('message', { message: inputMessage });
//     setInputMessage('');
//   };

//   useEffect(() => {
//     socket.on('reply', (data) => {
//       const reply = data.reply;
//       setMessages([...messages, { content: reply, sender: 'bot' }]);
//     });
//   }, [messages]);

//   return (
//     <div>
//       <div id="chatbox">
//         {messages.map((msg, index) => (
//           <div key={index}>{`${msg.sender}: ${msg.content}`}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={inputMessage}
//         onChange={(e) => setInputMessage(e.target.value)}
//         placeholder="Type a message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default App;
import React from 'react'

import Sidebar from './components/Sidebar'
function App() {
  return (
    <div>
      <Sidebar/>
    </div>
  )
}

export default App
