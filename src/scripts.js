let allRecipes = [];
let currentUser;

document.addEventListener('click', clickHandler);

window.addEventListener('load', function() {
  displayAllRecipes();
  displayUserData();
});

function clickHandler(event) {
  if (event.target.classList.contains('unchecked-heart')) {
    addRecipeToFavs(event);
  } else if (event.target.classList.contains('checked-heart')) {
    removeRecipeFromFavs(event);
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
      <i class="far fa-heart unchecked-heart"></i>
      <i class="far fa-bookmark" id="unchecked-bookmark"></i>
      <div>
    </section>`
    return newRecipe
 });
}

// recipe.favorite ? fas fa-heart : far fa-heart
//style="display:none;"

function displayUserData() {
  let randomUser = usersData[Math.floor(Math.random() * usersData.length)];
  currentUser = new User(randomUser);
  const userName = document.querySelector('.user-name');
  userName.innerHTML = `${currentUser.name}`;
}

function addRecipeToFavs(event) {
  event.target.classList.remove('far', 'fa-heart', 'unchecked-heart');
  event.target.classList.add('fas', 'fa-heart', 'checked-heart');
  // console.log(event.target.parentElement.parentElement)
  // currentUser.addToFavorites(recipe);
  // console.log(currentUser.favoriteRecipes);
  // add the actual recipe that was clicked on to the fav recipe array
  // iterate through the recipes and compare the name of the recipe that was clicked
  // is all the recipe names that in the data
  // if matched, invoke the user.addfav method

}

function removeRecipeFromFavs(event) {
  event.target.classList.remove('fas', 'fa-heart', 'checked-heart');
  event.target.classList.add('far', 'fa-heart', 'unchecked-heart');
}
