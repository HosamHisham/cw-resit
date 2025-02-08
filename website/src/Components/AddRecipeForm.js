import React from 'react';
import {useState} from 'react';

const AddRecipeForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [message, setMessage] = useState('');

    const addRecipe = () => {
        fetch('http://localhost:5000/recipes/addrecipe', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, ingredients}),
            credentials: 'include'
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`failed to add recipe. status code ${response.status}, message ${JSON.stringify(response.text())}`);
            }
            setMessage('recipe added successfully');
            alert('recipe added successfully');
        })
        .catch((error) => {
            setMessage (`error: ${error.message}`);
            alert(error.message);
        });
    };
    return (
        <div className = "form-selection">
            <h3>add recipe</h3>
            <form>
                <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                /><br />
                <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                /><br />
                <input
                type="text"
                value={ingredients}
                placeholder="ingredients"
                onChange={(e) => setIngredients(e.target.value)}
                required
                /><br />
                <button type="button" onClick={addRecipe}>Add recipe</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default AddRecipeForm;
