const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario

// Configura el middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura el transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio de correo que estés utilizando
  auth: {
    user: 'tu-email@gmail.com', // Tu correo electrónico
    pass: 'tu-contraseña' // Tu contraseña de correo
  }
});

// Maneja las solicitudes POST para enviar el correo
app.post('/send-email', (req, res) => {
  const { nombre, apellidos, telefono, correo, comentario } = req.body;
  const pdfLink = req.body.pdf; // Enlace al PDF adjunto

  // Configura el correo electrónico
  const mailOptions = {
    from: 'tu-email@gmail.com',
    to: 'admin@cookingourmet.edu.pe',
    subject: 'Nuevo Mensaje desde el Formulario',
    text: `
      Nombres: ${nombre}
      Apellidos: ${apellidos}
      Teléfono: ${telefono}
      Correo Electrónico: ${correo}
      Comentario: ${comentario}
      Enlace al PDF: ${pdfLink}
    `,
    // Opcional: agregar un archivo adjunto (si es necesario)
    // attachments: [
    //   {
    //     filename: 'documento.pdf',
    //     path: pdfLink // Ruta al archivo PDF
    //   }
    // ]
  };

  // Envía el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado:', info.response);
      res.send('Correo enviado');
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
