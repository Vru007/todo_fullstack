import React from 'react';
import "./header.css";
function Header(){
     
    return(
        <div className='headerContainer'>
          
          <h1>Todo App</h1>
          <div className='headerComponents'>
          <Link to="/login"> Login </Link> 
          <h3>Home</h3>
          </div>
        </div>
    )
}

export default Header;