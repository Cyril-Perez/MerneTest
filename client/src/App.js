import {
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Home from "./component/pages/Home";
import Navbar from "./component/navigation/Navbar";
import Profil from "./component/pages/Profil";
import { AppContext } from "./AppContext";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers, getUser } from "./component/action/action.users";
import { getPost, getPostProfil } from "./component/action/action.post";
import ErrorLogProfil from "./component/errorVersion/error.profil.js/error.log.profil";


function App() {
  const [uId , setuId] = useState(null)
  const [acces , setAcces] = useState(false)

  const dispatch = useDispatch()
  
  useEffect(async()=>{
    dispatch(getAllUsers())
    dispatch(getPost(3))
    dispatch(getPostProfil())
    await fetch(`${process.env.REACT_APP_API_REQUEST}jwtid`, {method: "GET" , credentials: "include"}).then((res)=>{
      return res.json()
    }).then((response)=>{ 
        setAcces(true)
        setuId(response)
        dispatch(getUser(response)) 
         
    }).catch((err)=>{
      console.log(err);
    })
    
  },[uId])
  const appContextValue = {
    uId,
    setuId,
    setAcces
  }
  return (
    <AppContext.Provider value={appContextValue}>
      <Navbar/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/profil/:id" element={ acces ? <Profil/> : <ErrorLogProfil/>}/>
          </Routes>
    </AppContext.Provider>
  );
}

export default App;
