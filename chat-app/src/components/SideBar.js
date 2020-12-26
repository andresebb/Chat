import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SidebarChatItem } from "./SidebarChatItem";

export const SideBar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
      {chatState.usuarios
        .filter((user) => user.uid !== auth.uid)
        .map((user) => {
          return <SidebarChatItem key={user.uid} usuario={user} />;
        })}

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
