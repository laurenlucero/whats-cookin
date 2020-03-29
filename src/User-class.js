const ingredientsData = require('../data/ingredients');
const Recipe = require('../src/Recipe-class');

class User {
  constructor({name, id, pantry}) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addToFavorites(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeFromFavorites(recipe) {
    let recipeToRemove = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(recipeToRemove, 1);
    return this.favoriteRecipes;
  }

  addToRecipesToCook(recipe) {
    this.recipesToCook.push(recipe);
  }

  removeFromRecipesToCook(recipe) {
    let recipeToRemove = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(recipeToRemove, 1);
    return this.recipesToCook;
  }

  filterFavByTag(tag) {
    let filteredRecipes =  this.favoriteRecipes.filter(recipe => {
        return recipe.tags.includes(tag);

    });
    return filteredRecipes;
  }

  filterRecipeToCookByTag(tag) {
    let filteredRecipes =  this.recipesToCook.filter(recipe => {
        return recipe.tags.includes(tag);

    });
    return filteredRecipes;
  }

  searchFavsByName(name) {
    let searchedRecipe = this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(name);
    });
    return searchedRecipe;
  }

  searchRecipesByName(name) {
    let searchedRecipe = this.recipesToCook.filter(recipe => {
      return recipe.name.includes(name);
    });
    return searchedRecipe;
  }

  searchFavsByIng(searchIng) {
    let ingredientId = null;
    ingredientsData.forEach((ing, i) => {
      if (searchIng == ing.name) {
        ingredientId = ing.id;
      }
    });
    let foundRecipes = [];
    this.favoriteRecipes.forEach(recipe => {
      recipe.ingredients.forEach(item => {
        if (ingredientId == item.id) {
          foundRecipes.push(recipe);
        }
      });
    });
    return foundRecipes;
  }

  searchRecipesToCookByIng(searchIng) {
    let ingredientId = null;
    ingredientsData.forEach((ing, i) => {
      if (searchIng == ing.name) {
        ingredientId = ing.id;
      }
    });
    let foundRecipes = [];
    this.recipesToCook.forEach(recipe => {
      recipe.ingredients.forEach(item => {
        if (ingredientId == item.id) {
          foundRecipes.push(recipe);
        }
      });
    });
    return foundRecipes;
  }

  checkIngredientsToBuy(recipe) {
    let ingredientsToBuy = [];
    return recipe.ingredients.map(ingredient => {
      let currentItem;
      ingredientsToBuy = this.pantry.forEach(item => {
        if (ingredient.id === item.ingredient) {
          currentItem = item;
        }
      });
      return currentItem;
    });
    return ingredientsToBuy;
  }

  checkAmountToBuy(recipe) {
    let amountToBuy = [];
    let ingredientsToBuy = this.checkIngredientsToBuy(recipe);
    ingredientsToBuy.forEach((ingredient, i) => {
      let currentIngredient = {};
      if (ingredient === undefined) {
        currentIngredient.id = recipe.ingredients[i].id;
        currentIngredient.missingAmount = recipe.ingredients[i].quantity.amount;
        amountToBuy.push(currentIngredient);
      } else if (recipe.ingredients[i].quantity.amount - ingredient.amount > 0) {
        currentIngredient.id = ingredient.ingredient;
        currentIngredient.missingAmount = recipe.ingredients[i].quantity.amount - ingredient.amount;
        amountToBuy.push(currentIngredient);
      }
    })
    return amountToBuy;
  }

  getMissingIngPrices(recipe) {
    let ingredientsCosts = this.checkAmountToBuy(recipe);
    let unownedIngredients = []
    let disrighthere = ingredientsCosts.forEach(ingredient => {
      ingredientsData.forEach(ingData => {
        if(ingredient.id === ingData.id){
          unownedIngredients.push(ingData.estimatedCostInCents)
        }
      })
    })
     return unownedIngredients.reduce((acc, ing) => {
       return acc += ing
    }, 0);
  }
}


if (typeof module !== 'undefined') {
  module.exports = User;
}
