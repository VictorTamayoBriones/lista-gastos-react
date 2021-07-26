import {useState, useEffect} from 'react';
import {db} from '../firebase/firebaseConfig';
import {useAuth} from '../context/AuthContext';

const useObtenerGastos = () => {
    const {usuario} = useAuth();
    const[gastos, changeGastos]=useState([]);
    const[ultimoGasto, cambiarUltimoGasto]=useState(null);
    const[hayMasPorCargar, cambiarHayMasPorCargar]=useState(false);

    const obtenerMasGastos = () =>{
        db.collection('gastos')
        .where('uidUsuario', '==', usuario.uid)
        .orderBy('fecha', 'desc')
        .limit(10)
        .startAfter(ultimoGasto)
        .onSnapshot((snapshot)=>{
            if(snapshot.docs.length > 0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);

                changeGastos(gastos.concat(snapshot.docs.map((gasto)=>{
                    return {...gasto.data(), id: gasto.id}
                })))
            }else{
                cambiarHayMasPorCargar(false);
            }
        })
    }
    useEffect(()=>{
        const unsuscibe = db.collection('gastos').where('uidUsuario', '==', usuario.uid).orderBy('fecha', 'desc').limit(10)
        .onSnapshot((snapshot)=>{

            if(snapshot.docs.length > 0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
                cambiarHayMasPorCargar(true);
            }else{
                cambiarHayMasPorCargar(false);
            }

            changeGastos(snapshot.docs.map((gasto)=>{
                return {...gasto.data(), id: gasto.id}
            }));
        });

        return unsuscibe;
    }, [usuario]);

    return [gastos, obtenerMasGastos, hayMasPorCargar];
}
 
export default useObtenerGastos;