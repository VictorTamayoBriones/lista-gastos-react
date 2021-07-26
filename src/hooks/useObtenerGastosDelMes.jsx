import {useState, useEffect} from 'react';
import {db} from '../firebase/firebaseConfig';
import {startOfMonth, endOfMonth, getUnixTime} from 'date-fns';
import {useAuth} from '../context/AuthContext';

const useObtenerGastosDelMes = () => {

    const[gastos, establecerGastos]=useState([]);
    const {usuario} = useAuth();

    useEffect(()=>{
        const inicioDelMes = getUnixTime(startOfMonth(new Date()));
        const finDelMes = getUnixTime(endOfMonth(new Date()));

        if(usuario){
           const unsuscribe = db.collection('gastos')
            .orderBy('fecha', 'desc')
            .where('fecha', '>=', inicioDelMes)
            .where('fecha', '<=', finDelMes)
            .where('uidUsuario', '==', usuario.uid)
            .onSnapshot((snapshot)=>{

                establecerGastos(snapshot.docs.map((documento)=>{
                    return {...documento.data(), id: documento.id}
                }));

            })

            //useEffect tiene que retornar una funcion que se va a ejecutar cuando se desmonte.
            //En este caso queremos que ejecute el unsuscribe a la coleccion de firestore.
            return unsuscribe;
        }

    }, [usuario]);

    return gastos;
}
 
export default useObtenerGastosDelMes;