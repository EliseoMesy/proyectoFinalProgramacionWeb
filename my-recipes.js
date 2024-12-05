const recipesContainer = document.getElementById('recipesContainer');

// Cargar recetas desde el almacenamiento local
const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

if (recipes.length === 0) {
    recipesContainer.innerHTML = `
        <p class="no-recipes">No tienes recetas guardadas. ¡Agrega tu primera receta ahora!</p>
    `;
} else {
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h2>${recipe.recipeName}</h2>
            <p class="ingredients"><strong>Ingredientes:</strong><br>${recipe.ingredients}</p>
            <p class="procedure"><strong>Procedimiento:</strong><br>${recipe.procedure}</p>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}
