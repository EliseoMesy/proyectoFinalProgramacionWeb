import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJBeLD1w1PC_xJHR2PULchQSxtPcEqD7g",
  authDomain: "pagina-web-recetas-foodiemafia.firebaseapp.com",
  projectId: "pagina-web-recetas-foodiemafia",
  storageBucket: "pagina-web-recetas-foodiemafia.appspot.com",
  messagingSenderId: "644761465686",
  appId: "1:644761465686:web:54af7c681feec07d8adcf7",
  measurementId: "G-M1X0Y7DSZ8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Acceso a Firestore
const storage = getStorage(app); // Acceso a Firebase Storage

const recipeForm = document.getElementById("recipeForm");

// Función para manejar el envío del formulario
recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  const recipeName = document.getElementById("recipeName").value;
  const ingredients = document.getElementById("ingredients").value;
  const procedure = document.getElementById("procedure").value;
  const category = document.getElementById("category").value;
  const prepTime = document.getElementById("prepTime").value;
  const videoLink = document.getElementById("videoLink").value;
  const recipeImage = document.getElementById("recipeImage").files[0];

  let imageURL = "";

  // Subir la imagen a Firebase Storage
  if (recipeImage) {
    try {
      const imageRef = storageRef(storage, `recipes/${Date.now()}-${recipeImage.name}`);
      await uploadBytes(imageRef, recipeImage); // Subir archivo
      imageURL = await getDownloadURL(imageRef); // Obtener URL de descarga
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("No se pudo subir la imagen. Por favor, intenta nuevamente.");
      return;
    }
  }

  // Subir los datos de la receta a Firestore
  try {
    await addDoc(collection(db, "recipes"), {
      name: recipeName,
      ingredients: ingredients,
      procedure: procedure,
      category: category,
      prepTime: prepTime,
      videoLink: videoLink,
      imageURL: imageURL // Incluir la URL de la imagen
    });

    alert("¡Receta enviada correctamente!");
    recipeForm.reset(); // Limpiar formulario
  } catch (error) {
    console.error("Error al agregar la receta: ", error);
    alert("Hubo un error al enviar la receta. Intenta nuevamente.");
  }
});
