const { db, messages } = require('./config');

const notificacionesRef = db.ref("/notificaciones");

// Enviar mensajes a los temas de los cursos
notificacionesRef.on('child_added', async (dataSnapshot) => {
  const dataJSON = dataSnapshot.toJSON();

  const avisoRef = db.ref(`cursos/${dataJSON.keyCurso}/avisos/${dataJSON.keyAviso}`);
  const avisoSnaphot = await avisoRef.get();
  const { descripcion, fecha, titulo } = avisoSnaphot.toJSON();

  const mensaje = {
    data: {
      descripcion,
      fecha,
      titulo
    },
    topic: dataJSON.keyCurso
  };

  messages.send(mensaje);
  notificacionesRef.child(dataSnapshot.key).remove();
});

