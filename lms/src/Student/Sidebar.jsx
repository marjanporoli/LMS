import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
      <ul>
        <li className="list_item">
             <i className="fas fa-home text-white"></i>
         <Link  to="/dashboard/" style={{textDecoration:"none",color:"black",fontSize:"20px",fontFamily:"Oswald"}}> Home </Link>  </li>
               <li> <i className="fab fa-facebook-messenger text-white"></i> </li>
               <li> <i className="fab fa-facebook-messenger text-white"></i> 
         <Link  to="/dashboard/messages"   style={{textDecoration:"none",color:"#f1f1f1",fontSize:"20px",marginLeft:"5px",fontFamily:"Oswald"}}> Messages </Link>  </li>
      </ul>
    </div>
  )
}
export default Sidebar
