const Header = (props) => {
  return (
    <div className="header">
       <span className="main-title">Smart Workflow</span>
      <span className="title">{props.title}</span>
    </div>
  );
};

export default Header;