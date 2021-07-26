import React, {useState, useContext, useEffect} from 'react';
import {auth} from '../firebase/firebaseConfig';

const AuthContext = React.createContext();

//Hook para acceder al contexto
const useAuth = ()=>{
    return useContext(AuthContext);
}

const ProviderAuth = ({children}) => {

    const [usuario, changeUsuario]=useState();

    //estado para saber cuando termino de cargar 
    //la comprobacion
    const [cargando, changeCargando]=useState(true);

    //Efecto para hacer la comprobacion solo un avez
    useEffect(()=>{
        //Comprobamos si hay un usario
         const cancelSuscribe = auth.onAuthStateChanged((usuario)=>{
            changeUsuario(usuario);
            changeCargando(false);
        });

        return cancelSuscribe;
    }, []);
    
    //!cargando && children
    return (
        <AuthContext.Provider value={{usuario: usuario}} >
            {!cargando && children}
        </AuthContext.Provider>
    );
}
 
export  {ProviderAuth, AuthContext, useAuth};