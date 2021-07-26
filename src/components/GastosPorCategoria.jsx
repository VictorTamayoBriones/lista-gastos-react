import React from 'react';
import {Helmet} from 'react-helmet';
import {Header, Titulo} from '../elements/Header';
import BotonRegresar from '../elements/BotonRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosPorCategoria';
import {ListaDeCategorias, ElementoListaCategorias, Categoria, Valor} from '../elements/ElemetosDeLista';
import IconoCategoria from '../elements/IconoCategoria';
import convertirAMoneda from '../helpers/convertirAMoneda';
const GastosPorCategoria = () => {
    
    const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();
    console.log(gastosPorCategoria);

    return (
        <>
            <Helmet>
                <title>Gastos por rcategoria</title>
            </Helmet>
            <Header>
                <BotonRegresar />
                <Titulo>Gastos por categoria</Titulo>
            </Header>
            
            <ListaDeCategorias>
                {gastosPorCategoria.map((elemento, index)=>{
                    return(
                        <ElementoListaCategorias key={index} >
                            <Categoria><IconoCategoria id={elemento.categoria} />{elemento.categoria}</Categoria>
                            <Valor>{convertirAMoneda(elemento.cantidad)}</Valor>
                        </ElementoListaCategorias>
                    );
                })}
            </ListaDeCategorias>

            <BarraTotalGastado/>
        </>
    );
}
 
export default GastosPorCategoria;