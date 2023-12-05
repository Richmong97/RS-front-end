import React from 'react'
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios  from 'axios'

const url = 'http://localhost:3000/api/users';

export const Signin = () => {

    const [formData, setFormData] = useState({

        user_name: "",
        email: "",
        contrasenia: ""

    });

    const onHandleChange = (event) => {

        const { name, value } = event.target;
        setFormData({...formData, [name] : value});

        // Enviar los datos con Fetch

    };

    const handleSubmit = async (event)=>{

        event.preventDefault();

        const result = await axios.post(url, formData);
        const data = (await result).data;

        console.log(data);

    }

    const navigate = useNavigate();
    const gotoIniciarSesion = ()=>{
        navigate('/')
    }

    return (
        <>

            <div className="container mt-5 BoxForm">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                        <input type="text" className="form-control borderinput" id="username" required placeholder='Ejemplo: Richmong_97' name="user_name" onChange={onHandleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control borderinput" id="email" placeholder='ejemplo@gmail.com' name="email" onChange={onHandleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control borderinput" id="password" name="contrasenia" onChange={onHandleChange}/>
                    </div>
                    <div>
                        <p className='mt-5'>
                            Ya tienes una cuenta?
                        </p>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3"  onClick={gotoIniciarSesion}>Iniciar Sesion</button>
                </form>
            </div>


        </>
    )
}
