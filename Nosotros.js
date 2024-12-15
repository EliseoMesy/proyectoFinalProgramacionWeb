// Función para cambiar la foto de un miembro específico
function changePhoto(memberId) {
    // Mostrar el cuadro de selección de archivo correspondiente al miembro
    document.getElementById(`upload-${memberId}`).click();
}

// Función para actualizar la imagen y guardarla en localStorage
function updateImage(memberId) {
    const input = document.getElementById(`upload-${memberId}`);
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageData = e.target.result;
            // Cambiar la imagen en la página
            document.getElementById(`img-${memberId}`).src = imageData;

            // Guardar la imagen en localStorage
            localStorage.setItem(`img-${memberId}`, imageData);
        }

        reader.readAsDataURL(file);  // Leer el archivo como URL base64
    }
}

// Cargar imagen guardada al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 4; i++) {
        const imgSrc = localStorage.getItem(`img-${i}`);
        if (imgSrc) {
            document.getElementById(`img-${i}`).src = imgSrc;
        }
    }
});
