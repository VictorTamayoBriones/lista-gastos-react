import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Puntos} from '../images/puntos.svg';

const Fondo = ()=>{
    return(
        <>
            <PuntosArriba/>
            <Svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path 
                    fill-opacity="1" 
                    d="M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,160C672,139,768,149,864,160C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">                        
                </path>
            </Svg>
            <PuntosAbajo/>
        </>
    );
}

export default Fondo;
const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`;
 
const PuntosArriba = styled(Puntos)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;
 
const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;