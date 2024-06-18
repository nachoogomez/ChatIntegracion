import React from 'react'
import { useState, useEffect} from 'react'
import io from 'socket.io-client'

const socket = io('/')

const Form = () => {

const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);



const handleSubmit = (e) => {
    e.preventDefault()
    setMessages([...messages, message])
    socket.emit('message', message)
    
}

useEffect(() => {
    socket.on('message', (message) => {
        console.log(message)
        setMessages([...messages, message]);
    })
  })

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter your message' onChange={(e) => setMessage(e.target.value)}/>
            <button>
                Send
            </button>
        </form>
        <ul>
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}	
        </ul>
    </div>
  )
}

export default Form