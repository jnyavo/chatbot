import addNotification from "react-push-notification";
import React from "react";
import { Notifications } from 'react-push-notification';

const Notif = () => {
  const newNotif = (title, subtitle, message, theme) => {
    console.log(message);
    addNotification({
      title: title,
      subtitle: subtitle,
      message: message,
      theme: theme,
      native: true,
       onClick: (e: Event | Notification) => {
         
       },
    });
  };

  return (
    <>
    <Notifications/>
    <div className="page">
      <button
        onClick={() => {
        setTimeout(function(){newNotif("warning", "This is a subtitle", "ty izy ty", "darkblue")}, 3000);

        }}
        className="button"
      >
        notif
      </button>
    </div>
    </>
  );
};

export default Notif;
