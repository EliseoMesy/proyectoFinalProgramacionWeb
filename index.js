// MENU MOBILE
const btnCloseMenu = document.querySelector('.btn-close');
const btnOpenMenu = document.querySelector('.btn-menu-responsive');
const menuMobile = document.querySelector('.menu-mobile');

btnOpenMenu.addEventListener('click', () => {
	menuMobile.classList.add('active');
});

btnCloseMenu.addEventListener('click', () => {
	menuMobile.classList.remove('active');
});

// Agregar a Favoritos en el localstorage
const buttonsFavorite = document.querySelectorAll('.btn-favorite');

const toggleFavorite = e => {
	const btn = e.currentTarget;
	const iconBtn = btn.querySelector('i');
	const card = btn.closest('.card-recipe');
	const title = card.querySelector('h3').textContent;

	let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

	const index = favorites.indexOf(title);
	if (index > -1) {
		// Si ya está en favoritos, lo quitamos
		favorites.splice(index, 1);
		iconBtn.classList.remove('active');
	} else {
		// Si no está en favoritos, lo añadimos
		favorites.push(title);
		iconBtn.classList.add('active');
	}

	localStorage.setItem('favorites', JSON.stringify(favorites));
};

const loadFavorites = () => {
	const favorites =
		JSON.parse(localStorage.getItem('favorites')) || [];
	const cards = document.querySelectorAll('.card-recipe');

	cards.forEach(card => {
		const title = card.querySelector('h3').textContent;
		const iconBtn = card.querySelector('.fa-heart');

		if (favorites.includes(title)) {
			iconBtn.classList.add('active');
		}
	});
};

buttonsFavorite.forEach(btn =>
	btn.addEventListener('click', toggleFavorite)
);

loadFavorites();

// Carrusel


document.querySelector('.navigation-header a[href="#"]').addEventListener('click', e => {
	e.preventDefault();
	window.location.href = 'formulario-recetas.html';
  });
  
