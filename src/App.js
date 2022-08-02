import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import ScrollBtn from './ScrollBtn';
import './App.css';

const API_ID =  `${process.env.REACT_APP_RECIPE_API_ID}`;
const API_KEY = `${process.env.REACT_APP_RECIPE_API_KEY}`;

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  useEffect( ()=>{
    getRecipes();
  }, [query]);   // only render & getRecipes when query's value has change

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = (e) => {
    e.preventDefault();   // will not perform default action of refreshing
    setQuery(search);
    setSearch('');
  }

    return (
      <div className="App">
        <form onSubmit={getSearch} className='search-form'>
          <input
            value = {search} onChange={updateSearch}
            className='search-bar' type="text"
          />
          <button className='search-button' type='submit'>Search</button>
        </form>

        <div className='recipes'>
          {recipes.map(recipe => (
            <Recipe
              key={recipe.recipe.image} title={recipe.recipe.label}
              calories={recipe.recipe.calories} image = {recipe.recipe.image}
              ingredients = {recipe.recipe.ingredients}
              mealType={recipe.recipe.mealType}
            />
          ))}
        </div>

        <ScrollBtn/>
      </div>
    );
}

export default App;
