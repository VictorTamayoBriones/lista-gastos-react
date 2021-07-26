import React from 'react';
import {Helmet} from 'react-helmet';
import {Header, Titulo} from '../elements/Header';
import BotonRegresar from '../elements/BotonRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';
import {useParams} from 'react-router-dom';
import useObtenerGasto from '../hooks/useObtenerGasto';

const EditarGasto = () => {
    const {id} = useParams();
    const [gasto]=useObtenerGasto(id);
    
    return (
        <>
            <Helmet>
                <title>Editar Gasto</title>
            </Helmet>
            <Header>
                <BotonRegresar ruta="/lista" />
                <Titulo>Editar Gasto</Titulo>
            </Header>

            <FormularioGasto gasto={gasto} />

            <BarraTotalGastado/>
        </>
    );
}
 
export default EditarGasto;