let allRecipes = [];
let currentUser;
let mainPage = document.querySelector('.main-page');
let recipePage = document.querySelector('.recipe-page');
let allIngredients;
let instructionsHolder;
let missingIng;

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
  } else if (event.target.classList.contains('back-to-home-btn')) {
    bringUserBackToAllRecipesPage(event);
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
        <div class="ing-amounts-holder">
          <ul class="ing-amounts">
          </ul>
        </div>
      </div>
      <div class="missing-ing-dets">
        <p class="missing-ing">Your Missing Ingredients:</p>
        <ul class="ingredients-missing">
        </ul>
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
  displayMissingIngredients(recipeCard);
}

function getRecipeIngNames(recipeCard) {
  allIngredients = document.querySelector('.all-ingredients');
  let ingredientNames = recipeCard.matchIngredientsIds();
  let allIngNames = ingredientNames.map(ing => {
    return ing.name;
  });
  allIngNames.map(ing => {
    allIngredients.insertAdjacentHTML('beforeend', `<li>${ing}:</li>`);
  });
}

function getMeasurementOfIng(recipeCard) {
  ingAmounts = document.querySelector('.ing-amounts');
  recipeCard.ingredients.map(ing => {
    ingAmounts.insertAdjacentHTML('beforeend', `<li>${ing.quantity.amount} ${ing.quantity.unit}</li>`)
  });
}

function displayRecipeInstructions(recipeCard) {
  instructionsHolder = document.querySelector('.instructions-holder');
  let instructions = recipeCard.getInstructions();
  let allInstructions = instructions.map(inst => {
    return inst.instruction;
  });
  allInstructions.map(item => {
    instructionsHolder.insertAdjacentHTML('beforeend', `<li>${item}</li>`);
  });
}

function displayMissingIngredients(recipeCard) {
  missingIng = document.querySelector('.ingredients-missing');
  let ingredientsToBuy = currentUser.checkAmountToBuy(recipeCard);
  let ingId = ingredientsToBuy.map(ing => {
    return ing.id;
  });
  return ingId.map(ing => {
    return ingredientsData.filter(ingData => {
      if (ingData.id === ing.id) {
        let ingName = ingData.name;
      }
      return ingName;
  });
  }).flat();
    console.log('name', ingName);
    // getting a list of ingredient ids saved to ingredientsToBuy
    // trying to get ids matched to names, returning empty array
}

function bringUserBackToAllRecipesPage(event) {
  recipePage.innerHTML = '';
  displayAllRecipes();
}
