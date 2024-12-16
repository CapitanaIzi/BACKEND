const validateName = (name) => {
    if (name.split(' ').length > 2) {
        throw new Error('Name cannot exceed 2 words.');
    }
};

export default validateName;