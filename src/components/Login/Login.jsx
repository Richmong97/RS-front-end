import React from 'react'
import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = ( {prop1} ) => {

  const url = `http://localhost:3000/api/auth`

  const navigate = useNavigate();

  const goToCrearUsuario = () => {

    navigate('/crearUsuario');

  }

  const [formData, setFormData] = useState({

    email: "",
    contrasenia: ""

  });


  const onHandleChange = (event) => {

    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    const result = await axios.post(url, formData,  { withCredentials : true }  );
    const resultData = (await result).data;

    if (result.status === 200){

      prop1(true);
      navigate('/wall')


    }
  
    if (result.status === 404){

      console.log("Inicio de Sesion No Exitoso");
    }
  

  }


    return (
        <>

            <div className='container BoxForm'>
                <form className='mt-5' onSubmit={onHandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Correo o Nombre de usuario</label>
                        <input type="email" className="form-control borderinput" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onHandleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Cotraseña</label>
                        <input type="password" className="form-control borderinput" id="exampleInputPassword1" onChange={onHandleChange}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Recordarme</label>
                    </div>

                    <div>
                        <p>
                            Aun no tienes cuenta?
                        </p>
                        <button className='btn btn-primary' onClick={goToCrearUsuario}>Registrate</button>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-5">Iniciar Sesion</button>
                </form>
            </div>

        </>
    )
}
