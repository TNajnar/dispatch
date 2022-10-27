import React from "react";

interface MainComponentProps {
  children: JSX.Element;
}

const MainComponent = ({ children }: MainComponentProps) => {
  return <div className="contentLayout">{children}</div>;
};

export default MainComponent;
