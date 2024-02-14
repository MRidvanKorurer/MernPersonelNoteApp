import React from "react";

const MainContainer = ({children}) => {
  return <div className=" w-10/12 bg-gray-950 p-4 mx-auto text-white ">
    {children}
  </div>;
};

export default MainContainer;
