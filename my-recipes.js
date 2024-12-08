// Configuración de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Importa Firestore

const firebaseConfig = {
    apiKey: "AIzaSyBJBeLD1w1PC_xJHR2PULchQSxtPcEqD7g",
    authDomain: "pagina-web-recetas-foodiemafia.firebaseapp.com",
    projectId: "pagina-web-recetas-foodiemafia",
    storageBucket: "pagina-web-recetas-foodiemafia.firebasestorage.app",
    messagingSenderId: "644761465686",
    appId: "1:644761465686:web:54af7c681feec07d8adcf7",
    measurementId: "G-M1X0Y7DSZ8"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Accede a Firestore

const recipesContainer = document.getElementById("recipesContainer"); // Contenedor de recetas

// Función para obtener recetas de Firestore
async function getRecipes() {
    const recipesRef = collection(db, "recipes");
    try {
        const querySnapshot = await getDocs(recipesRef);

        // Limpiar el contenedor de recetas antes de renderizar
        recipesContainer.innerHTML = '';

        if (querySnapshot.empty) {
            recipesContainer.innerHTML = "<p class='no-recipes'>No hay recetas disponibles. ¡Agrega una desde el formulario!</p>";
            return;
        }

        // Renderizar cada receta obtenida
        querySnapshot.forEach((doc) => {
            const recipe = doc.data();
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");
            recipeCard.innerHTML = `
                <h2>${recipe.name}</h2>
                <p><strong>Ingredientes:</strong> ${recipe.ingredients}</p>
                <p><strong>Procedimiento:</strong> ${recipe.procedure}</p>
                <button class="delete-btn" onclick="deleteRecipe('${doc.id}')">Eliminar</button>
            `;
            recipesContainer.appendChild(recipeCard);
        });
    } catch (error) {
        console.error("Error al obtener recetas:", error);
        recipesContainer.innerHTML = "<p>Hubo un error al obtener las recetas. Por favor, intenta de nuevo.</p>";
    }
}

// Llamar a la función para mostrar las recetas al cargar la página
getRecipes();

// Función para eliminar una receta de Firestore
async function deleteRecipe(recipeId) {
    try {
        await deleteDoc(doc(db, "recipes", recipeId)); // Eliminar receta por ID
        alert("Receta eliminada con éxito");
        getRecipes(); // Volver a cargar las recetas
    } catch (error) {
        alert("Error al eliminar la receta: " + error.message);
    }
}
