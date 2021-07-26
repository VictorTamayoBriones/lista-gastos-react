import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from '../elements/Header';
import Boton from '../elements/Boton';
import { Formulario, Input, ContenedorBoton } from '../elements/ElementosDeFormulario';
import {ReactComponent as svgRegistro} from '../images/login.svg';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {auth} from '../firebase/firebaseConfig';
import Alerta from '../elements/Alert';
const Svg = styled(svgRegistro)`
    width: 100%;
    max-height: 12.5rem;
    margin-bottom: 1.25rem;
`;

const Login = () => {

    const history = useHistory();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [estadoAlerta, cambiarEstadoAlerta]=useState(false);
    const [alerta, cambiarAlerta]=useState({});

    const handleChange = (e)=>{
        e.preventDefault();

        if(e.target.name === 'email'){
            setEmail(e.target.value);
        }else if(e.target.name === 'password'){
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        //Comprobamos dle lado del cliente que el correo sea valido
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
        if( !expresionRegular.test(email) ){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor Ingresa un correo valido'
            });
            return;
        }

        if( email === '' || password === '' ){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los campos'
            });
            return;
        }

        try{
            await auth.signInWithEmailAndPassword(email, password);
            console.log('Acceso concedido');
            history.push('/');
        }catch(error){
            cambiarEstadoAlerta(true);
            let mensaje;
            switch(error.code){
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No se encontro ninguna cuenta con este correo electronico.'
                break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                break;
            }
            cambiarAlerta({tipo: 'error', mensaje: mensaje});
        }
    }

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <div>
                        <Boton to="/crear-cuenta" >Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit} >
                <Svg/>
                <Input type="email" name="email" placeholder="Correo" value={email} onChange={handleChange} ></Input>
                <Input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange} ></Input>
                <ContenedorBoton>
                    <Boton as="button" primario type="submit" >Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} cambiarEstadoAerta={cambiarEstadoAlerta} />
        </>
    );
}
 
export default Login;