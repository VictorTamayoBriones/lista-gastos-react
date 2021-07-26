import React,{useState, useEffect} from 'react';
import {ContenedorFiltros,  Formulario, Input, InputGrande, ContenedorBoton} from '../elements/ElementosDeFormulario';
import Boton from '../elements/Boton';
import {ReactComponent as IconoPlus} from '../images/plus.svg';
import SelectCatgoria from './SelectCategorias';
import DatePicker from './DatePicker';
import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import agregarGasto from '../firebase/agregarGasto';
import {useAuth} from '../context/AuthContext';
import Alerta from '../elements/Alert';
import {useHistory} from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({gasto}) => {

    const[InputDescripcion, changeInputDescripcion]=useState('');
    const[InputCantidad, changeInputCantidad]=useState('');
    const[categoriaSeleccionada, changeCategoriaSeleccionada]=useState('Hogar');
    const[date, changeDate]=useState(new Date());
    const[stateAlert, changeStateAlert]=useState(false);
    const[alert, changeAlert]=useState({});

    const {usuario} = useAuth();

    const history = useHistory();

    useEffect(()=>{
        //Comprobamos si ya hay algun gasto.
        //De ser asi, establecemos todo el state con los valores del gasto.
        if(gasto){
            //Comprobamos que el gasto sea del usuaio actual.
            //Para eso comproamos el uid guardado en el gasto con el uid del usuario.
            if(gasto.data().uidUsuario === usuario.uid){
                changeCategoriaSeleccionada(gasto.data().categoria);
                changeDate(fromUnixTime(gasto.data().fecha));
                changeInputDescripcion(gasto.data().descripcion);
                changeInputCantidad(gasto.data().cantidad);
            }else{
                history.push('/lista');
            }
        }
    }, [gasto, usuario, history]);

    const handleChange = (e)=>{
        if(e.target.name === 'descripcion'){
            changeInputDescripcion(e.target.value);
        }else if(e.target.name  === 'cantidad'){
            changeInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        //transformar a float la cantidad
        let cantidad = parseFloat(InputCantidad).toFixed(2);
        
        //Comprobamos que exista una descipcion y una cantidad
        if(InputDescripcion !== '' && InputCantidad !== ''){

            if(cantidad){

                if(gasto){
                    editarGasto({
                        id: gasto.id,
                        categoria: categoriaSeleccionada,
                        descripcion: InputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(date)
                    }).then(()=>{
                        history.push('/lista');
                    }).catch(()=>{
                        alert('algo salio mal');
                    })
                }else{
                    agregarGasto({
                        categoria: categoriaSeleccionada,
                        descripcion: InputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(date),
                        uidUsuario: usuario.uid
                    }).then(()=>{
                        changeCategoriaSeleccionada('Hogar');
                        changeInputDescripcion('');
                        changeInputCantidad('');
                        changeDate(new Date());
    
                        changeStateAlert(true);
                        changeAlert({tipo: 'exito', mensaje: 'Se agrego correctamente'});
                    }).catch((error)=>{
                        changeStateAlert(true);
                        changeAlert({tipo: 'error', mensaje: 'Existio un error'});
                    })
                }

            }else{
                changeStateAlert(true);
                changeAlert({tipo: 'error', mensaje: 'El valor que ingresaste no es correcto'});
            }

        }else{
            changeStateAlert(true);
            changeAlert({tipo: 'error', mensaje: 'Por favor llene todos los campos'});
        }
    }
    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCatgoria categoriaSeleccionada={categoriaSeleccionada} changeCategoriaSeleccionada={changeCategoriaSeleccionada} />
                <DatePicker date={date} changeDate={changeDate} />
            </ContenedorFiltros>

            <div>
                <Input type="text" name="descripcion" id="descripcion" placeholder="Descripcion" value={InputDescripcion} onChange={handleChange} />
                <InputGrande type="text" name="cantidad" id="valor" placeholder="$0.00" value={InputCantidad} onChange={handleChange} />
            </div>

            <ContenedorBoton>
                <Boton as="button" primario  conIcono type="submit" >
                    {gasto ? 'Editar Gasto' : 'Agregar Gasto'}<IconoPlus/>
                </Boton>
            </ContenedorBoton>
            <Alerta tipo={alert.tipo} mensaje={alert.mensaje} estadoAlerta={stateAlert} cambiarEstadoAerta={changeStateAlert} />
        </Formulario>
    );
}
 
export default FormularioGasto;