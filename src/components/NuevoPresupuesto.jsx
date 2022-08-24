import { useState } from 'react'
import { Mensaje } from './Mensaje';

export const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

	const [mensaje, setMensaje] = useState('');

	const handlePresupuesto = (e) => {
		e.preventDefault();

		if(!presupuesto || presupuesto < 0) {
			setMensaje('No es un prepuesto valido');
			return;
		} 
		setMensaje(''); // si pasa la validacion se limpia el mensaje
		setIsValidPresupuesto(true); // se cambia el estado de la validacion

	}


    return (

        <div className="contenedor-presupuesto contenedor sombra">

			<form onSubmit={handlePresupuesto} className="formulario">
				<div className="campo">
					<label>Definir Presupuesto</label>

					<input
						className="nuevo-presupuesto"
						type='number'
						placeholder='Añade tu Presupuesto'
						value={presupuesto}
						onChange={e => setPresupuesto(Number(e.target.value))}  
					/>

				</div>

				<input type='submit' value='Añadir' />

				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

			</form>
		</div>
	
    )

}
