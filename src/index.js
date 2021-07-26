import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elements/Contenedor';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import EditarGasto from './components/EditarGasto';
import GastosPorCategoria from './components/GastosPorCategoria';
import ListaDeGastos from './components/ListaDeGastos';
import Login from './components/Login';
import Register from './components/Register';
import {Helmet} from 'react-helmet';
import favicon from './images/logo.png';
import Fondo from './elements/Fondo';
import {ProviderAuth} from './context/AuthContext';
import RutaPrivada from './components/RutaPrivada';
import {TotalGastadoProvider} from './context/totalGastadoDelMesContext';

//Work+Sans:wght@400;500;700
WebFont.load({
  google: {
    families: ['Work Sans: 400, 500, 700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>

      <ProviderAuth>     
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Switch>
                <Route path="/iniciar-sesion" component={Login} />
                <Route path="/crear-cuenta" component={Register} />

                <RutaPrivada path="/categorias">
                  <GastosPorCategoria />
                </RutaPrivada>

                <RutaPrivada path="/lista">
                  <ListaDeGastos />
                </RutaPrivada>

                <RutaPrivada path="/editar/:id">
                  <EditarGasto />
                </RutaPrivada>

                <RutaPrivada path="/">
                  <App />
                </RutaPrivada>
              </Switch>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>   
      </ProviderAuth>
      <Fondo/>
    </>
  );
}

ReactDOM.render(<Index/>,document.getElementById('root'));