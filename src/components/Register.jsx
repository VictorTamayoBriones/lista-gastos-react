import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from '../elements/Header';
import Boton from '../elements/Boton';
import { Formulario, Input, ContenedorBoton } from '../elements/ElementosDeFormulario';
import {ReactComponent as svgRegistro} from '../images/registro.svg';
import styled from 'styled-components';
import {auth} from '../firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';
import Alerta from '../elements/Alert';

const Svg = styled(svgRegistro)`
    width: 100%;
    max-height: 120px;
    min-height: 80px;
`;

const Register = () => {
    const history = useHistory();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [password2, setPassword2]=useState('');
    const [estadoAlerta, cambiarEstadoAlerta]=useState(false);
    const [alerta, cambiarAlerta]=useState({});

    const handleChange = (e)=>{
        
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
            default:
                alert('Warning haking detected');
                break;
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

        if( email === '' || password === '' || password2 === '' ){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los campos'
            });
            return;
        }

        if( password !== password2 ){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Las contraseñas no coinciden'
            });
            return;
        }

        try{
            await auth.createUserWithEmailAndPassword(email, password);
            console.log('El usuario se creo con exito');
            history.push('/');
        }catch(error){
            cambiarEstadoAlerta(true);
            let mensaje;
            switch(error.code){
                case 'auth/invalid-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
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
                <title>Crear Cuenta</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg/>
                <Input type="email" name="email" placeholder="Correo" value={email} onChange={handleChange} ></Input>
                <Input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange} ></Input>
                <Input type="password" name="password2" placeholder="Confirmar Contraseña" value={password2}onChange={handleChange}  ></Input>
                <ContenedorBoton>
                    <Boton as="button" primario type="submit" >Registrar</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} cambiarEstadoAerta={cambiarEstadoAlerta} />
        </>
    );
}
 
export default Register;