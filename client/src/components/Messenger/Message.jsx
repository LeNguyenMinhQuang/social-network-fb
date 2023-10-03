import { useState } from "react";
import { format } from "timeago.js";

function Message({ message, id }) {
  const [showTime, setShowTime] = useState(false);
  return (
    <div className={message.senderId === id ? "chattext" : "chattext user"}>
      <p
        onClick={() => {
          setShowTime(!showTime);
          setTimeout(() => {
            setShowTime(false);
          }, 3000);
        }}
      >
        {message.text}
      </p>
      {showTime && <p className="time">{format(message.sendAt)}</p>}
    </div>
  );
}

export default Message;
