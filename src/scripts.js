let allRecipes = [];
let uncheckedHeart = document.getElementById('unchecked-heart');
let checkedHeart = document.getElementById('checked-heart');

document.addEventListener('click', clickHandler);
// uncheckedHeart.addEventListener('click', addRecipeToFavs);

window.addEventListener('load', function() {
  displayAllRecipes();
  displayUserData();
});

function clickHandler(event) {
  if (event.target.id === 'unchecked-heart') {
    addRecipeToFavs(event);
  }
}

function displayAllRecipes() {
  let mainPage = document.querySelector('.main-page');
  allRecipes = recipeData.map(recipe => {
  let newRecipe = new Recipe(recipe);
    mainPage.innerHTML += `<section class="recipe-card">
      <img class="recipe-img" src=${newRecipe.image} alt=${newRecipe.name}>
      <div class="name-n-btns">
      <h4 class="recipe-name">${newRecipe.name}</h4>
      <i class="far fa-heart" id="unchecked-heart"></i>
      <i class="far fa-bookmark" id="unchecked-bookmark"></i>
      <div>
    </section>`
    return newRecipe
 });
}

function displayUserData() {
  let randomUser = usersData[Math.floor(Math.random() * usersData.length)];
  let currentUser = new User(randomUser);
  const userName = document.querySelector('.user-name');
  userName.innerHTML = `${currentUser.name}`;
}

function addRecipeToFavs(event) {
  if (event.target.classList.contains('far fa-heart')) {
    
  }
}
