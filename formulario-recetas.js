const recipeForm = document.getElementById('recipeForm');

recipeForm.addEventListener('submit', e => {
  e.preventDefault();

  const recipeName = document.getElementById('recipeName').value;
  const ingredients = document.getElementById('ingredients').value;
  const procedure = document.getElementById('procedure').value;

  const newRecipe = {
    name: 
    recipeName,
    ingredients,
    procedure,
  };

  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.push(newRecipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));

  alert('¡Receta guardada con éxito!');
  recipeForm.reset();
});
