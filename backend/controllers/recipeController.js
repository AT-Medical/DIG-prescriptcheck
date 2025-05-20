exports.createRecipe = (req, res) => {
    res.json({ message: 'Rezept angelegt (Demo)', recipe: req.body });
};

exports.getAllRecipes = (req, res) => {
    res.json({ recipes: [{ id: 1, patient: 'Max Mustermann', status: 'gültig' }] });
};
