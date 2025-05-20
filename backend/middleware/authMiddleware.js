exports.verifyToken = (req, res, next) => {
    // Dummy-Prüfung (später JWT-Auth)
    if (req.headers.authorization) {
        next();
    } else {
        res.status(401).json({ message: 'Nicht autorisiert' });
    }
};
