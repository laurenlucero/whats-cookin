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

  checkIngredients(recipeIngredients) {
    let ingredientsToBuy = [];
    recipeIngredients.forEach(ingredient => {
      let matchingItems = this.pantry.find(item => {
        return item.ingredient === ingredient.id
      });
      if (!matchingItems) {
        ingredientsToBuy.push(ingredient.id)
      }
    });
    return ingredientsToBuy;
    }
  }

if (typeof module !== 'undefined') {
  module.exports = User;
}
