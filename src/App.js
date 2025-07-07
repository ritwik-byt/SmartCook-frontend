import React, { useEffect, useState } from "react";
import { getAllRecipes, addRecipe } from "./api/recipes";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    getAllRecipes().then((data) => setRecipes(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = await addRecipe(form);
    setRecipes([...recipes, newRecipe]);
    setForm({ name: "", description: "" });
  };

  return (
    <div className="App">
      <h1>SmartCook 🍳</h1>
      <p>Discover and share amazing recipes!</p>

      <form onSubmit={handleSubmit} className="recipe-form">
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Recipe Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Recipe</button>
      </form>

      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
