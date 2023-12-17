import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Student/Navbar";
import Registrationform from "./Student/Regform";
import Regform from "./Student/Regform";
import Login from "./Student/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Student/Home";
import Navbarinside from "./insideNavbaruser/Navbarinside";
import Recommondation from "./Student/Recommondation";
import Studentprof from "./insideNavbaruser/Studentprof";
import Allbooks from "./insideNavbaruser/Allbooks";
import { useState } from "react";
import Sidebar from "./Student/Sidebar";
import Navbaradmin from "./Admin/Navbaradmin";
import Allbookadmin from "./Admin/Allbookadmin";
import Allissuedbookadmin from "./Admin/Allissuedbookadmin";
import Recommandbookadmin from "./Admin/Recommandbookadmin";
import Adminprof from "./Admin/Adminprof";
import Issuerequestadmin from "./Admin/Issuerequestadmin";
import Managestudadmin from "./Admin/Managestudadmin";
import Addbookadmin from "./Admin/Addbookadmin";
import Loginadmin from "./Admin/Loginadmin";
import Registeradmin from "./Admin/Registeradmin";
import Currentlyissueedbook from "./Student/Currentlyissueedbook";
import Footer from "./Student/Footer";
// import Footer from './Student/Footer';

function App() {
  const [user, setUser] = useState({ role: "user" }); // Initialize with default role

  return (
    <div className="App">
      <header>
        <Navbar />

        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Regform" element={<Regform />} />
          <Route path="/Navbarinside" element={<Navbarinside />} />
          <Route path="/Studentprof" element={<Studentprof />} />
          <Route path="/Reccomondation" element={<Recommondation />} />
          <Route
            path="/Currentlyissueedbook"
            element={<Currentlyissueedbook />}
          />
          <Route path="/Allbook" element={<Allbooks />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Loginadmin" element={<Loginadmin />} />
          <Route path="/Registeradmin" element={<Registeradmin />} />
          <Route path="/Adminprof" element={<Adminprof />} />
          <Route path="/Allbookadmin" element={<Allbookadmin />} />
          <Route path="/Addbookadmin" element={<Addbookadmin />} />
          <Route path="/Allissuedbookadmin" element={<Allissuedbookadmin />} />
          <Route path="/issuerequestadmin" element={<Issuerequestadmin />} />
          <Route path="/Managestudadmin" element={<Managestudadmin />} />
          <Route path="/Recommandbookadmin" element={<Recommandbookadmin />} />
          <Route path="/Navbaradmin" element={<Navbaradmin />} />
               
        </Routes>
      </header>
      <footer>
        < Footer/>
      </footer>
    </div>
  );
}

export default App;

{
  /* <Navbaradmin/>
     <Routes>
     <Route path='/Loginadmin' element={<Loginadmin/>}/>  
     <Route path='/Registeradmin' element={<Registeradmin/>}/>  
     <Route path='/Adminprof' element={<Adminprof/>}/> 
     <Route path='/Allbookadmin' element={<Allbookadmin/>}/>  
     <Route path='/Addbookadmin' element={<Addbookadmin/>}/>  
     <Route path='/Allissuedbookadmin' element={<Allissuedbookadmin/>}/>
     <Route path='/issuerequestadmin' element={<Issuerequestadmin/>}/>
     <Route path='/Managestudadmin' element={<Managestudadmin/>}/>  
     <Route path='/Recommandbookadmin' element={<Recommandbookadmin/>}/>  
     </Routes>
     </header> */
}

{
  /* <Navbarinside/> */
}
{
  /* <Regform/> */
}
{
  /* <Login/> */
}
{
  /* <Home/> */
}
{
  /* <Recommondation/> */
}
{
  /* <Sidebar/> */
}
{
  /* <Firstpage/> */
}
{
  /* <Managestudadmin/> */
}
{
  /* <Issuerequestadmin/> */
}
{
  /* <Adminprof/> */
}
{
  /* <Addbookadmin/> */
}
{
  /* <Recommandbookadmin/> */
}
{
  /* <Allissuedbookadmin/> */
}
{
  /* <Allbookadmin/> */
}
