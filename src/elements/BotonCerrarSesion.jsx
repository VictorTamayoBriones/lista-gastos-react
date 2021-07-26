import React from 'react';
import {ReactComponent as IconoCerrarSession} from '../images/log-out.svg';
import Boton from './Boton';
import {auth} from '../firebase/firebaseConfig';
import {useHistory} from 'react-router-dom';

const BotonCerrarSesion = () => {

    const history = useHistory();

    const cerrarSession = async ()=>{
        try{
            await auth.signOut();
            history.push('/iniciar-sesion');
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Boton iconoGrande as='button' onClick={cerrarSession}> <IconoCerrarSession/> </Boton>
    );
}
 
export default BotonCerrarSesion;