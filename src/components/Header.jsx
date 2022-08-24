import { ControlPresupuesto } from "./ControlPresupuesto"
import { NuevoPresupuesto } from "./NuevoPresupuesto"


export const Header = ({ 
        gastos,
        setGastos,
        presupuesto, 
        setPresupuesto, 
        isValidPresupuesto, 
        setIsValidPresupuesto 
    }) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {isValidPresupuesto ? ( // si el presupuesto es valido se muestra el componente ControlPresupuesto

                <ControlPresupuesto 
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />

            ) : ( // si no es valido se muestra el componente de NuevoPresupuesto

                <NuevoPresupuesto 
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            )}

        </header>
    )
}
