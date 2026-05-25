import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

const authMiddleware = (request, response, next) => {

    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const Token = authToken.split(' ')[1];

    try {
        jwt.verify(Token, authConfig.secret, (error, decoded) => {

            if (error) {
                throw Error('Invalid token');
            }

            request.userId = decoded.id;

        });
    } catch (_error) {
        return response.status(401).json({ error: 'Invalid token' });
    }
    return next();
};

export default authMiddleware;