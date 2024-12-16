const validateEmail = (email) => {
    const emailRegex = /^[\w.%+-]+@(gmail\.com|live\.com|outlook\.com|yahoo\.com)$/i;
    if (!emailRegex.test(email)) {
        throw new Error('El correo electrónico debe ser un Gmail, Live, Outlook, Yahoo.');
    }
};

export default validateEmail;