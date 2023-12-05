import { BrowserRouter, Routes,Route } from "react-router-dom"
import { Login } from "./components/Login/Login"
import { Signin } from "./components/Signin/Signin"
import { Posts } from "./components/Posts/Posts"
import { Wall } from "./components/Wall/Wall"
import { Error } from "./Components/Error/Error"
import './index.css';
import { useState, useEffect } from "react"
import axios from "axios"


function App() {


  const [inicioSesion, setInicioSesion] = useState(false);
  const [inicioSesionInfo , setInicioSesionInfo] = useState({});

  const validarCookie = async ( )=>{

    const ulrValidar = 'http://localhost:3000/api/auth'
    const result = await axios.get(ulrValidar,  { withCredentials:true} );
    const resultData = (await result).data;

    if (result.status ===200){

      setInicioSesion(true);
      setInicioSesionInfo(resultData);

    }
    


  }

  useEffect ( ()=>{

    validarCookie();

  } ,  [] );

function App() {

  return (
      <>
      <BrowserRouter>
        <Routes>
          {  inicioSesion ? (<Route path="/"  element={<Wall/>}/ >) :  
                            <Route path="/" element ={<Login prop1 = {setInicioSesion}  />} /> }
          <Route path="/crearUsuario" element ={<Signin/>}></Route>
          { inicioSesion ?  (<Route path="/crearPost" element ={<Posts infoUsuario = {inicioSesionInfo} />} />) : <></> }
          { inicioSesion ? (<Route path="/Wall" element ={<Wall/>} />) :<></> }
          <Route path="*" element ={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
}

export default App
