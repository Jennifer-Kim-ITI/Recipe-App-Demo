console.clear();

let recipeList = [
  {
    name: 'Mashed Potatoes',
    ingredients: ['potatoes', 'garlic', 'butter', 'milk', 'cream cheese'],
  },
  {
    name: 'Green Bean Casserole',
    ingredients: [
      'green beans',
      'flour',
      'butter',
      'garlic powder',
      'onion powder',
      'nutmeg',
      'dijon mustard',
      'heavy cream',
    ],
  },
];

// Your javascript application code should be written BELOW THIS COMMENT
document.addEventListener('DOMContentLoaded', () => {
  const recipeListElement = document.getElementById('recipeList');
  const form = document.getElementById('saveRecipe');
  const recipeNameInput = document.getElementById('recipeName');
  const recipeIngredientsInput = document.getElementById('recipeIngredients')
  
  const loadRecipes = () => {
    if (!localStorage.getItem('recipes')) {
      localStorage.setItem('recipes', JSON.stringify(recipeList));
    }
    
    const savedRecipes = JSON.parse(localStorage.getItem('recipes'));
    displayRecipes(savedRecipes);
  };  
  
  const displayRecipes = (recipes) => {
    recipeListElement.innerHTML = ''; 
    recipes.forEach(recipe => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');
      recipeDiv.innerHTML = `
        <h3>${recipe.name}</h3>
        <ul>
          ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      `;
      recipeListElement.appendChild(recipeDiv);
    });
  };

  const saveRecipe = (event) => {
    event.preventDefault();
    const name = recipeNameInput.value.trim();
    const ingredients = recipeIngredientsInput.value.split(',').map(i => i.trim()).filter(i => i);

    if (!name) {
      alert('Please enter a recipe name.');
      return;
    }
    if (ingredients.length < 3) {
      alert('Your Ingredients list should contain 3 or more comma separated items.');
      return;
    }

    const newRecipe = {name, ingredients};

    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    savedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));

    form.reset();
    recipeNameInput.focus();

    displayRecipes(savedRecipes);
  };

  form.addEventListener('submit', saveRecipe);

  loadRecipes();
})