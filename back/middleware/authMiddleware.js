const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        console.log('No token found')
        return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }

    try {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (decodedToken.isStaff === true) {
            req.user = decodedToken.userId;
            next();
        } else {
            return res.status(401).json({ message: 'Accès refusé. Vous n\'êtes pas autorisé à effectuer cette requête.' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Accès refusé. Token invalide.' });
    }
};