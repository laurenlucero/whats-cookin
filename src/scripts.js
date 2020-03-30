window.addEventListener('load', function() {
  displayAllRecipes();
});

function displayAllRecipes() {
  let mainPage = document.querySelector('.main-page');
  recipeData.forEach(recipe => {
    let newRecipe = new Recipe(recipe);
    mainPage.innerHTML += `<section class="recipe-card">
      <img class="recipe-img" src=${newRecipe.image} alt=${newRecipe.name}>
      <div class="name-n-btns">
      <h4 class="recipe-name">${newRecipe.name}</h4>
      <i class="far fa-heart"></i>
      <i class="far fa-bookmark"></i>
      <div>
    </section>`
 });
}

// display user data on home page
// assign random user based on index
// let chosen user be new instance of user with random user

// user to add/remove favorites
