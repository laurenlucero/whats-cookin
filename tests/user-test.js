const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User-class');
const Recipe = require('../src/Recipe-class');

describe('User', function() {

  let user;
  let recipe;

  beforeEach(function() {
    user = new User(
      {
        "name": "Saige O'Kon",
        "id": 1,
        "pantry": [
          {
            "ingredient": 11477,
            "amount": 4
          },
          {
            "ingredient": 11297,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 10
          }
        ]
      });

    recipe1 = new Recipe({
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
            {
                "id": 20081,
                "quantity": {
                    "amount": 1.5,
                    "unit": "c"
                }
            },
            {
                "id": 18372,
                "quantity": {
                    "amount": 0.5,
                    "unit": "tsp"
                }
            },
            {
                "id": 1123,
                "quantity": {
                    "amount": 1,
                    "unit": "large"
                }
            }
        ],
      "instructions": [
            {
                "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
                "number": 1
            },
            {
                "instruction": "Add egg and vanilla and mix until combined.",
                "number": 2
            },
            {
                "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
                "number": 3
            }
        ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
            "antipasti",
            "starter",
            "snack",
        ]
    });

    recipe2 = new Recipe({
    "id": 678353,
    "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
    "ingredients": [
          {
              "id": 1009016,
              "quantity": {
                  "amount": 1.5,
                  "unit": "cups"
              }
          },
          {
              "id": 9003,
              "quantity": {
                  "amount": 2,
                  "unit": ""
              }
          },
          {
              "id": 20027,
              "quantity": {
                  "amount": 1,
                  "unit": "tablespoon"
              }
          }
      ],
    "instructions": [
          {
              "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
              "number": 1
          }
      ],
    "name": "Maple Dijon Apple Cider Grilled Pork Chops",
    "tags": [
          "lunch",
          "main course",
          "main dish"
        ]
  });

    recipe3 = new Recipe({
        "id": 412309,
        "image": "https://spoonacular.com/recipeImages/412309-556x370.jpeg",
        "ingredients": [
                {
                    "id": 1002030,
                    "quantity": {
                        "amount": 4,
                        "unit": "teaspoons"
                    }
                },
                {
                    "id": 19334,
                    "quantity": {
                        "amount": 8,
                        "unit": "tablespoons"
                    }
                },
                {
                    "id": 1001,
                    "quantity": {
                        "amount": 2,
                        "unit": "cups"
                    }
                }
            ],
        "instructions": [
                {
                    "instruction": "Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.",
                    "number": 1
                }
            ],
        "name": "Dirty Steve's Original Wing Sauce",
        "tags": [
                "sauce"
            ]
        });
  });

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have a name', function() {
    expect(user.name).to.equal("Saige O'Kon");
  });

  it('should have an id', function() {
    expect(user.id).to.equal(1);
  });

  it('should have a list of all items in their pantry', function() {
    expect(user.pantry).to.deep.equal([
      {
        "ingredient": 11477,
        "amount": 4
      },
      {
        "ingredient": 11297,
        "amount": 4
      },
      {
        "ingredient": 1082047,
        "amount": 10
      }
    ]);
  });

  it('should start off with no favorite recipes', function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should start off with no recipes to cook', function() {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should be able to add recipe to favorite recipes', function() {
    user.addToFavorites(recipe1);
    expect(user.favoriteRecipes).to.deep.equal([recipe1]);
  });

  it('should be able to remove recipe from favorite recipes', function() {
    user.addToFavorites(recipe1);
    user.addToFavorites(recipe2);
    user.addToFavorites(recipe3);
    user.removeFromFavorites(recipe2);
    expect(user.favoriteRecipes).to.deep.equal([recipe1, recipe3]);
  });

});