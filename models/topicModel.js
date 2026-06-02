// Importamos el módulo fs, que permite leer y escribir archivos.
const fs = require("fs");

// Importamos el módulo path, que ayuda a crear rutas de archivos correctamente.
const path = require("path");

// Creamos la ruta hacia el archivo db.json, donde se guardarán los datos.
const dbPath = path.join(__dirname, "../data/db.json");

// Esta función lee la base de datos.
function readDb() {
  // Leemos el archivo db.json como texto.
  const data = fs.readFileSync(dbPath, "utf-8");

  // Convertimos el texto JSON a un objeto de JavaScript.
  return JSON.parse(data);
}

// Esta función guarda cambios en la base de datos.
function writeDb(data) {
  // Convertimos el objeto de JavaScript a texto JSON con formato ordenado.
  const jsonData = JSON.stringify(data, null, 2);

  // Escribimos ese JSON actualizado dentro del archivo db.json.
  fs.writeFileSync(dbPath, jsonData);
}

// Esta función devuelve todos los temas.
function getAllTopics() {
  // Leemos los datos actuales de la base de datos.
  const db = readDb();

  // Devolvemos los temas ordenados de mayor a menor cantidad de votos.
  return db.topics.sort((a, b) => b.votes - a.votes);
}

// Esta función busca un tema por su id.
function getTopicById(id) {
  // Leemos la base de datos.
  const db = readDb();

  // Buscamos dentro del array topics el tema cuyo id coincida.
  return db.topics.find((topic) => topic.id === Number(id));
}

// Esta función crea un nuevo tema.
function createTopic(title, description) {
  // Leemos la base de datos actual.
  const db = readDb();

  // Creamos un objeto con la información del nuevo tema.
  const newTopic = {
    // Usamos Date.now() para generar un id único basado en la fecha actual.
    id: Date.now(),

    // Guardamos el título recibido desde el formulario.
    title: title,

    // Guardamos la descripción recibida desde el formulario.
    description: description,

    // El nuevo tema empieza con 0 votos.
    votes: 0
  };

  // Agregamos el nuevo tema al array de topics.
  db.topics.push(newTopic);

  // Guardamos la base de datos actualizada.
  writeDb(db);
}

// Esta función actualiza un tema existente.
function updateTopic(id, title, description) {
  // Leemos la base de datos.
  const db = readDb();

  // Buscamos el tema que tenga el mismo id recibido.
  const topic = db.topics.find((topic) => topic.id === Number(id));

  // Si el tema existe, actualizamos sus datos.
  if (topic) {
    // Cambiamos el título anterior por el nuevo.
    topic.title = title;

    // Cambiamos la descripción anterior por la nueva.
    topic.description = description;
  }

  // Guardamos los cambios en db.json.
  writeDb(db);
}

// Esta función elimina un tema.
function deleteTopic(id) {
  // Leemos la base de datos.
  const db = readDb();

  // Dejamos en topics solamente los temas cuyo id sea diferente al recibido.
  db.topics = db.topics.filter((topic) => topic.id !== Number(id));

  // Guardamos la base de datos actualizada.
  writeDb(db);
}

// Esta función suma un voto a un tema.
function voteTopic(id) {
  // Leemos la base de datos.
  const db = readDb();

  // Buscamos el tema que se quiere votar.
  const topic = db.topics.find((topic) => topic.id === Number(id));

  // Si el tema existe, aumentamos sus votos en 1.
  if (topic) {
    topic.votes += 1;
  }

  // Guardamos los cambios.
  writeDb(db);
  return topic;
}

// Exportamos las funciones para poder usarlas en el controller.
module.exports = {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  voteTopic
};