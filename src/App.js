import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllRecipes, addRecipe } from "./api/recipes";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: ""
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const data = await getAllRecipes();
    setRecipes(data);
  };

  const handleChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addRecipe(newRecipe);
    setNewRecipe({ title: "", ingredients: "", instructions: "" });
    fetchRecipes();
  };

  return (
    <div className="App">
      <h1>🍳 SmartCook</h1>
      <p>Discover and share amazing recipes!</p>

      <form onSubmit={handleSubmit} className="recipe-form">
        <input
          type="text"
          name="title"
          value={newRecipe.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          required
        />
        <textarea
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleChange}
          placeholder="Ingredients"
          required
        />
        <textarea
          name="instructions"
          value={newRecipe.instructions}
          onChange={handleChange}
          placeholder="Instructions"
          required
        />
        <button type="submit">Add Recipe</button>
      </form>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <h2>{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
