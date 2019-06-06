import React, { useState } from 'react';
import './styles.css';
const Todos = () => {
	const [todos, setTodos] = useState([
		{
			id: '1234',
			text: 'Hello',
			done: true
		}
	]);
	const [newTodo, setNewTodo] = useState('');

	const handleOnChange = event => {
		setNewTodo(event.currentTarget.value);
	};

	const handleOnKeyPress = event => {
		if (event.key === 'Enter') {
			const newTodos = todos;
			newTodos.push({
				id: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000),
				text: event.currentTarget.value,
				done: false
			});

			setTodos(newTodos);
			setNewTodo('');
		}
	};

	const handleDeleteTodo = index => {
		const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
		setTodos(newTodos);
	};

	const handleUpdateTodo = index => {
		const newTodos = [...todos];
		newTodos[index].done = !newTodos[index].done;
		setTodos(newTodos);
	};
	return (
		<div className="App">
			<h1>Todos</h1>
			<input
				type="text"
				value={newTodo}
				placeholder="Enter todo here"
				onChange={handleOnChange}
				onKeyPress={handleOnKeyPress}
			/>
			<ul>
				{todos.map((val, key) => (
					<li key={val.id}>
						{val.text} -{' '}
						{val.done ? (
							<span
								onClick={() => handleUpdateTodo(key)}
								role="img"
								aria-label=""
							>
								✅
							</span>
						) : (
							<span
								onClick={() => handleUpdateTodo(key)}
								role="img"
								aria-label=""
							>
								⏹️
							</span>
						)}
						<button onClick={() => handleDeleteTodo(key)}>
							<span role="img" aria-label="">
								❌
							</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
export default Todos;
