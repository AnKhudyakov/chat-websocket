import { useState } from "react";

const MessageCard = ({ msg }) => {
  const [toggle, setToggle] = useState(false);
  const hanldeClick = () => {
    setToggle(!toggle);
  };
  return (
    <div className="container bg-light py-2 my-2 rounded">
      {msg.date}
      <br />
      Sender: {msg.sender}
      <br />
      <button className="btn btn-info" onClick={hanldeClick}>
        Title: {msg.title}
      </button>
      {toggle && <div>{msg.value}</div>}
    </div>
  );
};

export default MessageCard;
