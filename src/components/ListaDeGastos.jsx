import React from 'react';
import {Helmet} from 'react-helmet';
import {Header, Titulo} from '../elements/Header';
import BotonRegresar from '../elements/BotonRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../hooks/useObtenerGastos';
import {
    Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from '../elements/ElemetosDeLista';
import IconoCategoria from '../elements/IconoCategoria';
import convertirAMoneda from '../helpers/convertirAMoneda';
import {ReactComponent as IconoEditar} from '../images/editar.svg';
import {ReactComponent as IconoBorrar} from '../images/borrar.svg';
import {Link} from 'react-router-dom';
import Boton from '../elements/Boton';
import {format, fromUnixTime} from 'date-fns';
import {es} from 'date-fns/locale';
import borrarGasto from '../firebase/borrarGasto';

const ListaDeGastos = () => {

    const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();

    const formatearFecha = (fecha)=>{
        return format(fromUnixTime(fecha), "dd 'de' MMM 'de' yyy", {locale:es});
    }

    const fechaEsIgual = (gastos, index, gasto)=>{
        if(index !== 0 ){
            const fechaActual = formatearFecha(gasto.fecha);
            const fechaGastoAnterior = formatearFecha(gastos[index -1].fecha);

            if(fechaActual === fechaGastoAnterior){
                return true;
            }else{
                return false;
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Lista de gastos</title>
            </Helmet>
            <Header>
                <BotonRegresar></BotonRegresar>
                <Titulo>Lista de gastos</Titulo>
            </Header>
            <Lista>
                {
                    gastos.map((gasto, index)=>{
                        return(
                            <div key={gasto.id}>
                                {fechaEsIgual(gastos, index, gasto)}
                                {!fechaEsIgual(gastos, index, gasto) && <Fecha>{formatearFecha(gasto.fecha)}</Fecha>}
                                <ElementoLista key={gasto.id} >
                                    <Categoria>
                                        <IconoCategoria id={gasto.categoria} />
                                        {gasto.categoria}
                                    </Categoria>
                                    <Descripcion>{gasto.descripcion}</Descripcion>
                                    <Valor>{convertirAMoneda(gasto.cantidad)}</Valor>
                                    <ContenedorBotones>
                                        <BotonAccion as={Link} to={`/editar/${gasto.id}`} ><IconoEditar/></BotonAccion>
                                        <BotonAccion onClick={() => borrarGasto(gasto.id)} ><IconoBorrar/></BotonAccion>
                                    </ContenedorBotones>
                                </ElementoLista>
                            </div>
                        );
                    })
                }

                { hayMasPorCargar &&           
                    <ContenedorBotonCentral>
                        <BotonCargarMas onClick={()=>obtenerMasGastos()} >Cargar más</BotonCargarMas>
                    </ContenedorBotonCentral>
                }
                {
                    gastos.length === 0 &&
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos por mostrar</Subtitulo>
                        <Boton as={Link} to="/" >Agregar Gasto</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>
            <BarraTotalGastado/>
        </>
    );
}
 
export default ListaDeGastos;