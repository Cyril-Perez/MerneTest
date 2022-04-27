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
import ViewsPost from "./component/pages/viewsPost/ViewsPost";
import ViewsProfil from "./component/pages/viewsProfil/ViewsProfil";
import ViewsFollow from "./component/pages/viewsFollow/ViewsFollow";
import ArticlesPages from "./component/pages/ArticlesPages";


function App() {
  //gestion rendu conditionnel connexion
  const [uId , setuId] = useState(null)
  const [acces , setAcces] = useState(false)

  const dispatch = useDispatch()
  
  useEffect(async()=>{
    //recuperation des utilisateur
    dispatch(getAllUsers())
    //recuperation des 3 dernier posts pour le scroll
    dispatch(getPost(3))
    //recuperation de l'essemble des posts
    dispatch(getPostProfil())
    await fetch(`${process.env.REACT_APP_API_REQUEST}jwtid`, {method: "GET" , credentials: "include"}).then((res)=>{
      return res.json()
    }).then((response)=>{ 
        setuId(response)
        dispatch(getUser(response)) 
        setAcces(true)
    }).catch((err)=>{
      console.log(err);
    })
    
  },[uId])
  const appContextValue = {
    uId,
    acces,
    setuId,
    setAcces
  }
  return (
    <AppContext.Provider value={appContextValue}>
      <Navbar/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/actualites" element={<ArticlesPages/>}/>
              <Route path="/profil/:id" element={ acces ? <Profil/> : <ErrorLogProfil/>}/>
              <Route path="/profil/views/post/:id" element={ acces ? <ViewsPost/> : <ErrorLogProfil/>}/>
              <Route path="/profil/views/profil/:id" element={ acces ? <ViewsProfil/> : <ErrorLogProfil/>}/>
              <Route path="/profil/views/follow/:id" element={ acces ? <ViewsFollow/> : <ErrorLogProfil/>}/>
          </Routes>
    </AppContext.Provider>
  );
}

export default App;
