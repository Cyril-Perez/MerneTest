import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Home from "./component/pages/Home";
import Navbar from "./component/navigation/Navbar";
import Profil from "./component/pages/Profil";
import { AppContext } from "./AppContext";
import { useEffect, useState } from "react";

function App() {
  const [uId , setuId] = useState(null)

  useEffect(async()=>{
    await fetch(`${process.env.REACT_APP_API_REQUEST}jwtid`, {method: "GET"}).then((res)=>{
      console.log(res);
      setuId(res)
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  const appContextValue = {
    uId,
    setuId
  }
  return (
    <AppContext.Provider value={appContextValue}>
      <Navbar/>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/profil/:id" element={<Profil/>}/>
          </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
