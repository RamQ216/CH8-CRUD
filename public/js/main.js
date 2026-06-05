// Espera a que todo el contenido HTML de la pagina este cargado antes de ejecutar el script.
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los botones que sirven para votar temas.
  const topicButtons = document.querySelectorAll(".vote-topic-button");

  // Selecciona todos los botones que sirven para votar links.
  const linkButtons = document.querySelectorAll(".vote-link-button");

  // Define una funcion para ordenar una lista segun la cantidad de votos.
  function reorderListByVotes(listId, votesSelector) {
    // Busca la lista en el HTML usando su id.
    const list = document.getElementById(listId);

    // Convierte todos los elementos li de la lista en un arreglo para poder ordenarlos.
    const items = Array.from(list.querySelectorAll("li"));

    // Ordena los elementos de mayor a menor segun sus votos.
    items.sort((a, b) => {
      // Obtiene los votos del primer elemento y los convierte a numero.
      const votesA = Number(a.querySelector(votesSelector).textContent);

      // Obtiene los votos del segundo elemento y los convierte a numero.
      const votesB = Number(b.querySelector(votesSelector).textContent);

      // Devuelve la diferencia para que el elemento con mas votos quede primero.
      return votesB - votesA;
    });

    // Vuelve a insertar cada elemento en la lista ya ordenada.
    items.forEach((item) => {
      // appendChild mueve el elemento existente al final en el nuevo orden.
      list.appendChild(item);
    });
  }

  // Recorre cada boton de voto de temas.
  topicButtons.forEach((button) => {
    // Agrega un evento para ejecutar codigo cuando el usuario hace click.
    button.addEventListener("click", async () => {
      // Obtiene el id del tema desde el atributo data-id del boton.
      const id = button.dataset.id;

      // Envia una peticion POST al servidor para sumar un voto al tema.
      const response = await fetch(`/topics/${id}/vote`, {
        // Indica que la peticion modifica datos en el servidor.
        method: "POST"
      });

      // Convierte la respuesta del servidor de JSON a un objeto JavaScript.
      const data = await response.json();

      // Verifica que el servidor haya confirmado que la operacion fue exitosa.
      if (data.success) {
        // Busca el elemento li mas cercano que contiene el boton votado.
        const topicItem = button.closest("li");

        // Dentro del tema, busca el span donde se muestra la cantidad de votos.
        const votesSpan = topicItem.querySelector(".topic-votes");

        // Actualiza en pantalla el numero de votos del tema.
        votesSpan.textContent = data.topic.votes;

        // Reordena la lista de temas para mostrar primero los mas votados.
        reorderListByVotes("topics-list", ".topic-votes");
      }
    });
  });

  // Recorre cada boton de voto de links.
  linkButtons.forEach((button) => {
    // Agrega un evento para ejecutar codigo cuando el usuario hace click.
    button.addEventListener("click", async () => {
      // Obtiene el id del link desde el atributo data-id del boton.
      const id = button.dataset.id;

      // Envia una peticion POST al servidor para sumar un voto al link.
      const response = await fetch(`/links/${id}/vote`, {
        // Indica que la peticion modifica datos en el servidor.
        method: "POST"
      });

      // Convierte la respuesta del servidor de JSON a un objeto JavaScript.
      const data = await response.json();

      // Verifica que el servidor haya confirmado que la operacion fue exitosa.
      if (data.success) {
        // Busca el elemento li mas cercano que contiene el boton votado.
        const linkItem = button.closest("li");

        // Dentro del link, busca el span donde se muestra la cantidad de votos.
        const votesSpan = linkItem.querySelector(".link-votes");

        // Actualiza en pantalla el numero de votos del link.
        votesSpan.textContent = data.link.votes;

        // Reordena la lista de links para mostrar primero los mas votados.
        reorderListByVotes("links-list", ".link-votes");
      }
    });
  });
});
