import React from 'react'
import { useState, useEffect} from 'react'
import io from 'socket.io-client'



const socket = io('/')

const Form = () => {

const [messages, setMessages] = useState([]);
const [message, setMessage] = useState("");

useEffect(() => {
  socket.on("message", receiveMessage)

  return () => {
    socket.off("message", receiveMessage);
  };
}, []);

const receiveMessage = (message) =>
  setMessages(state => [message, ...state]);


const handleSubmit = (event) => {
  event.preventDefault();
  const newMessage = {
    body: message,
    from: "Me",
  };

  setMessages(state => [newMessage, ...state]);
  setMessage("");
  socket.emit("message", newMessage.body);
  
};

return (
  <div className="h-screen bg-[#202c33] text-white flex items-center justify-center">
    <form onSubmit={handleSubmit} className="bg-[#253c49] p-10 h-5/6 w-1/3 rounded-2xl">
      <h1 className="text-2xl font-bold my-2">
        Ignacio Gomez Chat
      </h1>
      <input
        name="message"
        type="text"
        placeholder="Write your message..."
        onChange={(e) => setMessage(e.target.value)}
        className="border-2 border-zinc-500 p-2 w-full text-black"
        value={message}
        autoFocus
      />

      <ul className="h-80 overflow-y-auto">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`my-2 p-2 table text-sm rounded-md ${message.from === "Me" ? "bg-green-900 ml-auto" : "bg-green-700"
              }`}
          >
            <b>{message.from}</b>:{message.body}
          </li>
        ))}
      </ul>
    </form>
  </div>
);
}

export default Form