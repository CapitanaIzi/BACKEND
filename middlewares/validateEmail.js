export function validateEmails(req, res, next) {
  const {correo } = req.body;
  console.log('Validando correo:', correo); 
  // Expresión regular para validar Gmail, Hotmail y Outlook
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;

  if (!correo || !emailRegex.test(correo)) {
    return res.status(400).json({ error: 'El correo electrónico debe ser un Gmail, Hotmail o Outlook válido' });
  }

  // Si es válido, continúa con el siguiente middleware o controlador
  next();
}
