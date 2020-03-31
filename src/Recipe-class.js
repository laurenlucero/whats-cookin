if (typeof module !== 'undefined') {
  ingredientsData = require('../data/ingredients');
}

// const mockData = require('../data/mock-data');

class Recipe {
  constructor({id, image, ingredients, instructions, name, tags}) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  getIngredientsCost() {
    let allIngredients = this.matchIngredientsIds();
    return allIngredients.reduce((acc, ingredient) => {
      acc += ingredient.estimatedCostInCents;
      return acc;
    }, 0);
  }

  matchIngredientsIds() {
    return this.ingredients.map(ingredient => {
      return ingredientsData.filter(ingData => {
        return ingData.id === ingredient.id;
      });
    }).flat();
  }

  getInstructions() {
    return this.instructions;
  }

  filterRecipes(tag) {
    let filteredRecipes =  recipesData.filter(recipe => {
        return recipe.tags.includes(tag);

    });
    return filteredRecipes;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
