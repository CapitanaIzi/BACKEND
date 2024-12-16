const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(password)) {
        throw new Error('Password can only contain letters and numbers, no spaces or symbols.');
    }
};

export default validatePassword;