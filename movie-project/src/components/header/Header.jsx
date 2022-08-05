import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      🎥 <span style={{color: 'yellow'}}>FIL</span> MB <span style={{color: 'wheat'}}>IB</span> <span style={{color: '#fff'}}>LE</span> 🎥
    </span>
  );
};

export default Header;
