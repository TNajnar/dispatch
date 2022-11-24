interface IMainComponentProps {
  children: JSX.Element;
}

const MainComponent = ({ children }: IMainComponentProps) => {
  return <div className="contentLayout">{children}</div>;
};

export default MainComponent;
