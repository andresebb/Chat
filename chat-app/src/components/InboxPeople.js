import React from "react";
import { SearchBox } from "./SearchBox";
import { SideBar } from "./SideBar";

export const InboxPeople = () => {
  return (
    <div>
      <div className="inbox_people">
        <SearchBox />
        <SideBar />
      </div>
    </div>
  );
};
