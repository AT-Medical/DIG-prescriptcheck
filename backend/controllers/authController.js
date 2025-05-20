// Einfache Demo-Implementierung, später sicher machen!
exports.login = (req, res) => {
    res.json({ message: 'Login erfolgreich (Demo)', user: { id: 1, name: 'DemoUser' } });
};

exports.register = (req, res) => {
    res.json({ message: 'Registrierung erfolgreich (Demo)', user: { id: 2, name: req.body.name } });
};
