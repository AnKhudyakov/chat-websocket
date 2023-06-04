import React, { useEffect, useState } from "react";
import MessageCard from "../MessageCard/MessageCard";
import { API } from "@/api/api";
const Chat = ({ messages, name, socket, setConnected }) => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const sendMessage = () => {
    if (value.length) {
      const message = {
        event: "message",
        sender: name,
        recipient,
        title,
        value,
        date: new Date().toISOString().slice(0, 19),
      };
      socket.send(JSON.stringify(message));
      setValue("");
      setTitle("");
    } else {
      alert("Enter message");
    }
  };
  const handleExit = () => {
    socket.close();
    setConnected(false);
  };
  useEffect(() => {
    API.getMessages()
      .then((data) => {
        const oldMsgFiltered = data.filter((el) => el.recipient === name);
        setOldMessages(oldMsgFiltered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className=" flex items-center flex-col container mx-auto p-5">
        <form className="mx-auto " style={{ maxWidth: "500px" }}>
          <div className=" text-slate-100 mb-2">User: {name}</div>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Enter recipient"
            required
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Your title"
            required
          />
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={3}
            className="form-control mb-3"
            placeholder="Your message"
            required
          />
          <div className=" d-flex justify-content-between w-full">
            <button onClick={sendMessage} className=" btn btn-primary">
              Send
            </button>
            <button onClick={handleExit} className=" btn btn-primary">
              Exit
            </button>
          </div>
        </form>
        <div className=" w-full">
          {oldMessages.map((msg) => (
            <MessageCard msg={msg} key={msg.date} />
          ))}
          {messages.map((msg) => (
            <MessageCard msg={msg} key={msg.date} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Chat;
