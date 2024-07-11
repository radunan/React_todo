import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';




function TodoList() {
    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleEditChange(e) {
        setEditValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = editValue;
            setTodos(updatedTodos);
            setEditIndex(null);
        } else {
            setTodos([...todos, value]);
        }
        setValue('');
        setEditValue('');
    }

    function handleDelete(index) {
        setTodos(prevTodos => {
            return prevTodos.filter((_, i) => i !== index);
        });
    }

    function handleEdit(index, todo) {
        setEditIndex(index);
        setEditValue(todo);
    }

    return (
        <div className="container">
            <h1 className="text-center mb-4">To-do list React</h1>
            <form onSubmit={handleSubmit} className="mb-3 d-flex align-items-center">
                <input type="text" value={editIndex !== null ? editValue : value} onChange={editIndex !== null ? handleEditChange : handleChange} className="form-control mr-2" />
                <button type="submit" className={editIndex !== null ? 'btn btn-warning' : 'btn btn-primary'}>
                    {editIndex !== null ? <FontAwesomeIcon icon={faEdit} /> : 'Add'}
                </button>

            </form>
            <ul className="list-group">
                {todos.map((todo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center mb-2 bg-light">
                        <span>{todo}</span>
                        <div>
                            {index === editIndex ? (
                                <input type="text" value={editValue} onChange={handleEditChange} className="form-control mr-2" />
                            ) : (
                                <>
                                    <button onClick={() => handleEdit(index, todo)} className="btn btn-warning mr-2"><FontAwesomeIcon icon={faEdit} /></button>
                                    <button onClick={() => handleDelete(index)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
