// Importamos fs para poder leer y escribir archivos.
const fs = require("fs");

// Importamos path para construir rutas de archivos de forma segura.
const path = require("path");

// Creamos la ruta hacia el archivo db.json.
const dbPath = path.join(__dirname, "../data/db.json");

// Esta función lee la base de datos.
function readDb() {
  // Leemos el contenido del archivo db.json como texto.
  const data = fs.readFileSync(dbPath, "utf-8");

  // Convertimos ese texto JSON en un objeto de JavaScript.
  return JSON.parse(data);
}

// Esta función guarda cambios en la base de datos.
function writeDb(data) {
  // Convertimos el objeto JavaScript a JSON con formato legible.
  const jsonData = JSON.stringify(data, null, 2);

  // Sobrescribimos db.json con los datos actualizados.
  fs.writeFileSync(dbPath, jsonData);
}

// Esta función devuelve todos los enlaces.
function getAllLinks() {
  // Leemos los datos actuales.
  const db = readDb();

  // Devolvemos los links ordenados de mayor a menor cantidad de votos.
  return db.links.sort((a, b) => b.votes - a.votes);
}

// Esta función busca un enlace por su id.
function getLinkById(id) {
  // Leemos la base de datos.
  const db = readDb();

  // Buscamos el link cuyo id coincida con el id recibido.
  return db.links.find((link) => link.id === Number(id));
}

// Esta función crea un nuevo enlace.
function createLink(title, url, description) {
  // Leemos la base de datos actual.
  const db = readDb();

  // Creamos el nuevo objeto link.
  const newLink = {
    // Generamos un id único usando la fecha actual.
    id: Date.now(),

    // Guardamos el título recibido desde el formulario.
    title: title,

    // Guardamos la URL recibida desde el formulario.
    url: url,

    // Guardamos la descripción recibida desde el formulario.
    description: description,

    // El enlace empieza con 0 votos.
    votes: 0
  };

  // Agregamos el nuevo enlace al array links.
  db.links.push(newLink);

  // Guardamos los cambios en db.json.
  writeDb(db);
}

// Esta función actualiza un enlace existente.
function updateLink(id, title, url, description) {
  // Leemos la base de datos.
  const db = readDb();

  // Buscamos el link que tenga el mismo id.
  const link = db.links.find((link) => link.id === Number(id));

  // Si el link existe, actualizamos sus datos.
  if (link) {
    // Actualizamos el título.
    link.title = title;

    // Actualizamos la URL.
    link.url = url;

    // Actualizamos la descripción.
    link.description = description;
  }

  // Guardamos los cambios.
  writeDb(db);
}

// Esta función elimina un enlace.
function deleteLink(id) {
  // Leemos la base de datos.
  const db = readDb();

  // Creamos un nuevo array sin el link que tenga ese id.
  db.links = db.links.filter((link) => link.id !== Number(id));

  // Guardamos la base de datos actualizada.
  writeDb(db);
}

// Esta función suma un voto a un enlace.
function voteLink(id) {
  // Leemos la base de datos.
  const db = readDb();

  // Buscamos el link que se quiere votar.
  const link = db.links.find((link) => link.id === Number(id));

  // Si existe, aumentamos sus votos en 1.
  if (link) {
    link.votes += 1;
  }

  // Guardamos los cambios.
  writeDb(db);

  // Devolvemos el link actualizado por si el controller lo necesita.
  return link;
}

// Exportamos todas las funciones para usarlas desde el controller.
module.exports = {
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
  voteLink
};