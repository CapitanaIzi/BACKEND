import { validateName, validateEmail, validatePassword, validateComment } from './validators/validationFunctions.js';

const validateUser = (req, res, next) => {
    try {
        const { name, email, password, comment } = req.body;

        validateName(name);
        validateEmail(email);
        validatePassword(password);
        validateComment(comment);

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default validateUser;