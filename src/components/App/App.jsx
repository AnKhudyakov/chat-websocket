import React from "react";
import { useState } from "react";
import { API } from "@/api/api.js";
import Chat from "../Chat/Chat";

function App() {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const handleConnect = () => {
    if (name.length) {
      API.postReg({ name })
        .then((data) => {
          const socket = new WebSocket(import.meta.env.VITE_API_WS);
          setSocket(socket);
          socket.onopen = () => {
            setConnected(true);
            const message = {
              event: "connection",
              name,
              id: Date.now(),
            };
            socket.send(JSON.stringify(message));
          };
          socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prev) => [message, ...prev]);
          };
          socket.onclose = () => {
            alert("Connection closed");
            setConnected(false);
          };
          socket.onerror = () => {
            alert("Connection died");
          };
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  return (
    <div
      className="container mx-auto d-flex items-center justify-content-center flex-col"
    >
      {connected ? (
        <Chat
          messages={messages}
          name={name}
          socket={socket}
          setConnected={setConnected}
        />
      ) : (
        <div className=" my-4 flex items-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="bg-white border shadow-sm px-3 py-2 mx-2"
            placeholder="Your username"
          />
          <button onClick={handleConnect} className="btn btn-primary">
            Enter
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
