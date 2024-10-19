import React, { useState, useEffect } from "react";

const Home = () => {
	//defino el estado para la lista de tareas (todos) y la nueva tarea (newTodo)
	const [todos, setTodos] = useState([]) //Inicializo un array vacío para las tareas
	const [newTodo, setNewTodo] = useState("") //Inicializo una cadena vacía para la nueva tarea


	// METODO POST (envia datos al servidor)
	function postTodo() {
		let nuevaTarea = {
			label: newTodo,
			is_done: false
		}
		console.log(nuevaTarea)
		console.log(typeof (nuevaTarea))
		fetch("https://playground.4geeks.com/todo/todos/Martin1982", {
			method: "POST",

			headers: {
				"content-Type": "application/json"
			},
			body: JSON.stringify(nuevaTarea),
		})
			.then((respuesta) => {
				return respuesta.json(); //devuelve la respuesta como JSON
			})
			.then((data) => {
				console.log(data); // maneja los datos de la respuesta
				getTodo()
			})
			.catch((error) => {
				return error
			})
	}

	//metodo delete
	function deleteTodo(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		})
			.then((respuesta) => {
				if (respuesta.status == 204) {
					getTodo()

				} else {
					console.error("Error al eliminar la tarea");
				}
			})
			.catch((error) => console.error(error));
	}


	//METODO GET (solicita datos del servidor)
	function getTodo() {
		let listaTareas = {
			label: newTodo,
			isDone: false
		}
		console.log(listaTareas)
		console.log(typeof (listaTareas))
		fetch("https://playground.4geeks.com/todo/users/Martin1982", {
			method: "GET"


		})
			.then((respuesta) => {
				return respuesta.json()
			})
			.then((data) => {
				console.log(data);
				setTodos(data.todos || []);
			})
			.catch((error) => {
				return error;
			}

			)
	}

	// METODO PUT (para actualizar la lista en el servidor)
	function putTodo() {
		let listaTareas = {
			label: newTodo,
			isDone: false
		}
		console.log(listaTareas)
		console.log(typeof (listaTareas))
		fetch("", {
			method: "PUT",
			body: JOSN.stringify(),
			headers: {
				"Content-Type": "aplication/json"
			}

		})
			.then((respuesta) => {
				console.log(respuesta.ok); // sera true si la respuesta es exitosa
				console.log(respuesta.status); // codigo de estado 200, 300, 400, etc.
				console.log(respuesta.text); // Intenta devolver el resultado exacto como string 
				return respuesta.json(); // Pasa el resultado a .JSON 
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				return error;
			}

			)
	}

	useEffect(() => {
		getTodo()
	},
		[]
	)


	// Renderiza el componente
	return (
		<div className="text-center container m-5">

			<h1 className="text-danger fw-light">todos</h1>


			<input className="form-control" placeholder="What needs to be done?" //campo de entrada para agregar nuevas tareas
				value={newTodo}
				onChange={(e) => {
					setNewTodo(e.target.value);
				}}

				//Verifica si la tecla presionada es Enter
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						postTodo(); //LLamo a la funcion PostTodo para enviar datos al servidor despues de dar Enter. 
						setNewTodo("");  // Limpia el campo de entrada
					}

				}}
			/>

			<ul className="list-group">
				{todos.length > 0 ? todos.map((item, index) => {
					return (
						<li key={item.id} class="list-group-item d-flex justify-content-between">
							{item.label}
							<button className="btn btn-light ms-auto" onClick={() => deleteTodo(item.id)}>X</button>
						</li>
					)

				}) :
					<li className="list-group-item">No hay tareas</li>
				}
				<li className="list-group-item d-flex justify-content-start text-black-50">{todos.length} Item left</li>
			</ul>

		</div>
	);
};

export default Home;
