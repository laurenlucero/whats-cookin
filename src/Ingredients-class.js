class Ingredients {
  constructor(id, name, estimatedCost) {
    this.id = id;
    this.name = name;
    this.estimatedCost = estimatedCost
    this.quantity = {};
  }
}

module.exports = Ingredients;