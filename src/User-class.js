const ingredientsData = require('../data/ingredients');
const recipesData = require('../data/recipes');
const usersData = require('../data/users');
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
    //we need to iterate through the recipe ingredients take in an array & get back out an array
    //we need to find out if each recipe ingredient is present in the pantry
    //1 //if it's not present in the pantry we need to add the full amount to ingredientsToBuy
    //2 //if it's present but there's not enough, we need to add the difference to ingredientsToBuy
    //3 //if it's present and there's enough, we are good to go
  }

    // let ingredientsToBuy = [];
    // recipeIngredients.forEach(ingredient => {
    //   this.pantry.forEach(item => {
    //     if(item.ingredient !== ingredient.id) {
    //       ingredientsToBuy.push(ingredient.id)
    //     }
    //   });
    // });
    // return ingredientsToBuy



}



module.exports = User;
