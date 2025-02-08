import React, {useState, useEffect} from "react";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const getALLRecipes = () => {
        fetch('http://localhost:5000/recipes', {
            credentials: 'include',
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Failed to fetch recipes');
                return[];
            }
        })
        .then((data) => {
            setRecipes(data);
        })
        .catch((error) => {
            console.error('Error fetching flights:', error);
        });
    };

    useEffect(() => {
        const fetchRecipes = async () => {
             getALLRecipes();
        };
        fetchRecipes();
    }, []);

    return (
        <div className="form-section">
            <h3>View All Recipes</h3>
            <button onClick={getALLRecipes}>Get Recipes</button>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.ID}>
                       recipe: {recipe.ID}, {recipe.TITLE}, description: {recipe.DESCRIPTION}, ingredients: {recipe.INGREDIENTS} 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
