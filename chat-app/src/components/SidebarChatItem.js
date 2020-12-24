import React from "react";

export const SidebarChatItem = ({ data }) => {
  return (
    <>
      <div className="chat_list active_chat">
        <div className="chat_people">
          <div className="chat_img">
            <img
              src="https://ptetutorials.com/images/user-profile.png"
              alt="sunil"
            />
          </div>
          <div className="chat_ib">
            <h5>{data.nombre}</h5>
            {data.online ? (
              <span className="text-success">Online</span>
            ) : (
              <span className="text-danger">Offline</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
