import React, { useEffect, useState } from "react";
import { getAllRecipes, addRecipe } from "./api/recipes";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllRecipes();
      setRecipes(data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !ingredients || !instructions) return;

    const newRecipe = await addRecipe({
      title,
      ingredients,
      instructions,
    });

    setRecipes([...recipes, newRecipe]);
    setTitle("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <div className="App">
      <h1>🍳 SmartCook</h1>
      <p className="tagline">Discover and share amazing recipes!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <button type="submit">Add Recipe</button>
      </form>

      <div className="recipes-list">
        {recipes.map((recipe, index) => (
          <div className="recipe" key={index}>
            <h3>{recipe.title}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
