import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SidebarChatItem } from "./SidebarChatItem";

export const SideBar = () => {
  const chats = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
      {chatState.usuarios
        .filter((user) => user.uid !== auth.uid)
        .map((user) => {
          return <SidebarChatItem key={user.uid} data={user} />;
        })}

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
