import { Routes, Route, Navigate} from "react-router-dom"
import React from 'react'
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import UserManagement from "./components/User/UserMangement";

function App() {
  return (
    <div id="app">
             <Routes>
             <Route path="/"  element = { <Login/> } />
             <Route element={<Layout />}>
             <Route path="/home" element={<Home />} />
             <Route path="/user" element={<UserManagement />}/>
             </Route>
             {/* <Route path="/logout" element={<Login />}/> */}
             {/* <Route path="/about" element={<About />} />
             <Route path="/contact" element={<About />} />
             <Route path="/user" element={<MainUser />} /> */}
            </Routes> 
    </div>
  );
}

export default App;
