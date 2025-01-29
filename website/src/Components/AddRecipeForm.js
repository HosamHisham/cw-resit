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
                'Conetnt-Type': 'application/json',
            },
            bodt: JSON.stringify({title, description, ingredients}),
            credentials:"incude"
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`failed to add recipe `)
            }
        })
    }
}