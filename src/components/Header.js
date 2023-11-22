import React from "react";
import Search from "./Search";
import Theme from "./Theme";
import Overview from "./Overview";

const Header = ({ name }) => {
  return (
    <>
      <div className="xl:px-32">
        <h1 className="text-5xl">{name}</h1>
        <Search />
        <Theme />
      </div>
    </>
  );
};

export default Header;
