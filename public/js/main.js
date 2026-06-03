document.addEventListener("DOMContentLoaded", () => {
  const topicButtons = document.querySelectorAll(".vote-topic-button");
  const linkButtons = document.querySelectorAll(".vote-link-button");

  function reorderListByVotes(listId, votesSelector) {
    const list = document.getElementById(listId);
    const items = Array.from(list.querySelectorAll("li"));

    items.sort((a, b) => {
      const votesA = Number(a.querySelector(votesSelector).textContent);
      const votesB = Number(b.querySelector(votesSelector).textContent);

      return votesB - votesA;
    });

    items.forEach((item) => {
      list.appendChild(item);
    });
  }

  topicButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;

      const response = await fetch(`/topics/${id}/vote`, {
        method: "POST"
      });

      const data = await response.json();

      if (data.success) {
        const topicItem = button.closest("li");
        const votesSpan = topicItem.querySelector(".topic-votes");

        votesSpan.textContent = data.topic.votes;

        reorderListByVotes("topics-list", ".topic-votes");
      }
    });
  });

  linkButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;

      const response = await fetch(`/links/${id}/vote`, {
        method: "POST"
      });

      const data = await response.json();

      if (data.success) {
        const linkItem = button.closest("li");
        const votesSpan = linkItem.querySelector(".link-votes");

        votesSpan.textContent = data.link.votes;

        reorderListByVotes("links-list", ".link-votes");
      }
    });
  });
});