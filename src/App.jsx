import { useState, useEffect } from 'react'
import { Filtros } from './components/Filtros';
import { Header } from './components/Header'
import { ListadiGastos } from './components/ListadiGastos';
import { Modal } from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';


function App() {

    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []

    );

    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0 
    ); // el valor es el que esta en el localstorage sino existe es 0

    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);

    const [gastoEditar, setGastoEditar] = useState({});

    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);
            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }
    }, [gastoEditar])

    // Guardamos el presupuesto en el localStorage
    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0);  
    }, [presupuesto]) 

    // Guardamos los gastos en el localStorage
    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos)) ?? [];  
    }, [gastos])

    //para el filtro 
    useEffect(() => {
        if (filtro) {
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro])

    //Si hay un presupuesto guardado en el localStorage, salteamos la vista de definir presupuesto
    useEffect(() => {
        const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0;
        if (presupuestoLs > 0) {
            setIsValidPresupuesto(true);
        }
    }, [])
    

    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});

        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    }

    const guardarGasto = (gasto) => { 
        if (gasto.id) {
            const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
            setGastos(gastosActualizados);
            setGastoEditar({}); //limpiamos el state de gastoEditar
        } else {
            gasto.id = generarId(); //usamos el helper para generar un id unico
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto ]);
            setAnimarModal(false);
        }

        setTimeout(() => {  
            setModal(false);
        }, 500);
    }

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter(gasto => gasto.id !== id); //filtramos los gastos que no sean el que queremos eliminar
        setGastos(gastosActualizados);  //actualizamos el state  con los gastos filtrados
    }

    return (
        <div className={modal ? 'fijar' : ''}>  

            <Header 
                gastos = {gastos}
                setGastos = {setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />

            { isValidPresupuesto && ( 
                <>
                    <main>
                        <Filtros 
                            filtro={filtro}
                            setFiltro={setFiltro}
                        />
                        <ListadiGastos 
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            gastosFiltrados={gastosFiltrados}
                            filtro = {filtro}
                        />
                    </main>

                    <div className='nuevo-gasto'>
                        <img 
                            src={IconoNuevoGasto}  
                            alt='Nuevo Gasto'
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

        {modal &&  <Modal 
                        setModal={setModal} 
                        animarModal={animarModal}
                        setAnimarModal={setAnimarModal}
                        guardarGasto={guardarGasto}
                        gastoEditar={gastoEditar}
                        setGastoEditar={setGastoEditar}
                   />
        }

        </div>
    )
}

export default App
