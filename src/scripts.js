let allRecipes = [];
let currentUser;
let mainPage = document.querySelector('.main-page');
let recipePage = document.querySelector('.recipe-page');
let allIngredients;
let instructionsHolder;

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
  } else if (event.target.classList.contains('unchecked-bookmark')) {
    addToRecipesToCook(event);
  } else if (event.target.classList.contains('checked-bookmark')) {
    removeFromRecipesToCook(event);
  } else if (event.target.classList.contains('recipe-img')) {
    gatherRecipeCardDataToDisplay(event);
  }
}

function displayAllRecipes() {
  allRecipes = recipeData.map(recipe => {
  let newRecipe = new Recipe(recipe);
    mainPage.innerHTML += `<section class="recipe-card">
      <img class="recipe-img" src=${newRecipe.image} alt=${newRecipe.name}>
      <div class="name-n-btns">
      <h4 class="recipe-name">${newRecipe.name}</h4>
      <i class="far fa-heart unchecked-heart"></i>
      <i class="far fa-bookmark unchecked-bookmark"></i>
      <div>
    </section>`;
    return newRecipe;
 });
}

function displayUserData() {
  let randomUser = usersData[Math.floor(Math.random() * usersData.length)];
  currentUser = new User(randomUser);
  const userName = document.querySelector('.user-name');
  userName.innerHTML = `${currentUser.name}`;
}

function addRecipeToFavs(event) {
  event.target.classList.remove('far', 'fa-heart', 'unchecked-heart');
  event.target.classList.add('fas', 'fa-heart', 'checked-heart');
  let clickedRecipe = allRecipes.find(recipe => {
    if(event.target.parentElement.children[0].innerText === recipe.name) {
      return recipe;
    }
  })
  currentUser.addToFavorites(clickedRecipe);
}

function removeRecipeFromFavs(event) {
  event.target.classList.remove('fas', 'fa-heart', 'checked-heart');
  event.target.classList.add('far', 'fa-heart', 'unchecked-heart');
  let clickedRecipe = allRecipes.find(recipe => {
    if (recipe.name === event.target.parentElement.children[0].innerText) {
      return recipe;
    }
  })
  currentUser.removeFromFavorites(clickedRecipe);
}

function addToRecipesToCook(event) {
  event.target.classList.remove('far', 'fa-bookmark', 'unchecked-bookmark');
  event.target.classList.add('fas', 'fa-bookmark', 'checked-bookmark');
  let clickedRecipe = allRecipes.find(recipe => {
    if(event.target.parentElement.children[0].innerText === recipe.name) {
      return recipe;
    }
  })
  currentUser.addToRecipesToCook(clickedRecipe);
}

function removeFromRecipesToCook(event) {
  event.target.classList.remove('fas', 'fa-bookmark', 'checked-bookmark');
  event.target.classList.add('far', 'fa-bookmark', 'unchecked-bookmark');
  let clickedRecipe = allRecipes.find(recipe => {
    if (event.target.parentElement.children[0].innerText === recipe.name) {
      return recipe;
    }
  })
  currentUser.removeFromRecipesToCook(clickedRecipe);
}

function gatherRecipeCardDataToDisplay(event) {
  let recipeCard = allRecipes.find(recipe => {
    if (event.target.src === recipe.image) {
      return recipe;
    }
  })
  bringUserToSingleRecipePage(recipeCard);

  // invoke method that displays the recipe mainPage
  // that includes all needed info.
}

function bringUserToSingleRecipePage(recipeCard) {
  mainPage.innerHTML = '';
  recipePage.innerHTML = `<section class="recipe">
    <img class="selected-recipe-img" src=${recipeCard.image} alt=${recipeCard.name}>
    <div class="all-recipe-dets">
      <h3>${recipeCard.name} <i class="far fa-heart"></i>
      <i class="far fa-bookmark"></i></h3>
      <section class="recipe-details">
      <div class="recipe-details">
        <div class="ing-list">
          <p class="ing-needed">Ingredients Needed:</p>
          <ul class="all-ingredients">
          </ul>
        </div>
      </div>
      <div class="missing-ing-dets">
        <p class="missing-ing">Your Missing Ingredients:</p>
        <p class="ingredients-missing">Egg, bicarbonate of soda</p>
      </div>
      </section>
    </div>
  </section>
  <div class="instructions">
    <ol class="instructions-holder">
    </ol>
  </div>
  <input class="back-to-home-btn" type="button" value="See all recipes">`
  getRecipeIngNames(recipeCard);
  getMeasurementOfIng(recipeCard);
  displayRecipeInstructions(recipeCard);
}

function getRecipeIngNames(recipeCard) {
  allIngredients = document.querySelector('.all-ingredients');
  let ingredientNames = recipeCard.matchIngredientsIds();
  let allIngNames = ingredientNames.map(ing => {
    return ing.name;
  })
  allIngNames.map(ing => {
    allIngredients.insertAdjacentHTML('beforeend', `<li>${ing}:</li>`);
  })
}

function getMeasurementOfIng(recipeCard) {
  let amount = recipeCard.ingredients.map(ing => {
    return ing.quantity.amount;
  })
  let unit = recipeCard.ingredients.map(ing => {
    return ing.quantity.unit;
  })
}

function combineRecipeIngInfo() {

}

//make a 3rd function
//invoke that 3rd function at end of bringUserToSingleRecipePage
//marry the data from recipeData and recipeCard
//invoke that getRecipeNames with new combined ingData
//dive in the interpolation to present new data

function displayRecipeInstructions(recipeCard) {
  instructionsHolder = document.querySelector('.instructions-holder');
  let instructions = recipeCard.getInstructions();
  let allInstructions = instructions.map(inst => {
    return inst.instruction;
  })
  allInstructions.map(item => {
    instructionsHolder.insertAdjacentHTML('beforeend', `<li>${item}</li>`);
  })
}

// function combineIngWithQuantity(recipeCard) {

  // return `${getRecipeIngNames(recipeCard)}`
// }

// ${getMeasurementOfIng(recipeCard)
// function getRecipeInstructions() {
//
// }
//
// function bringUserBackToAllRecipesPage() {
//   // upon click of the 'back to recipes page'
//   // clears single recipe page and brings user back to main recipe lists page
// }
