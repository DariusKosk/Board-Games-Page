<template>
  <div>
    <h1>Board Games</h1>
    <table> <!-- Table for board game data -->
      <thead>
      <tr>
        <th>Name</th>
        <th>Images</th>
        <th>Tags</th>
        <th>Ratings</th>
        <th>Length</th>
        <th>Min Players</th>
        <th>Max Players</th>
        <th>Difficulty</th>
        <th>Size</th>
        <th>Comments</th>
      </tr>
      </thead>
      <tbody> <!-- Get data from boardgames -->
      <tr v-for="game in boardgames" :key="game.id">
        <td class="game_name">{{ game.name }}</td>
        <td>{{ game.imagepaths.join(', ') }}</td>
        <td>{{ game.tags.join(', ') }}</td>
        <td>{{ game.ratings.join(', ') }}</td>
        <td>{{ game.length }}</td>
        <td>{{ game.min_players }}</td>
        <td>{{ game.max_players }}</td>
        <td>{{ game.difficulty }}</td>
        <td>{{ game.size }}</td>
        <td>{{ game.comments.join(', ') }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "MainPage",
  data() {
    return {
      boardgames: [],
    };
  },
  methods: {
    fetchBoardGames() {  //Get data from the api
      fetch(`http://localhost:8080/api/boardgames`)
          .then(response => response.json())
          .then(data => {
              console.log("Board games:", data);
              this.boardgames = data;})
          .catch(error => console.error('Error fetching board games:', error));
    },
  },
  mounted() {
    this.fetchBoardGames();
    console.log("Mounted")
  },
};
</script>

<style>
table {
  width: 80%;
  border-collapse: collapse;
  background-color: darkgray;
  opacity: 80%;
  font-family: Verdana;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  margin:auto;

}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: gray;
}
html {
  width: 100%;
  height: 100%;
  --s: 37px;

  --c: #0000, #282828 0.5deg 119.5deg, #0000 120deg;
  --g1: conic-gradient(from 60deg at 56.25% calc(425% / 6), var(--c));
  --g2: conic-gradient(from 180deg at 43.75% calc(425% / 6), var(--c));
  --g3: conic-gradient(from -60deg at 50% calc(175% / 12), var(--c));
  background: var(--g1), var(--g1) var(--s) calc(1.73 * var(--s)), var(--g2),
  var(--g2) var(--s) calc(1.73 * var(--s)), var(--g3) var(--s) 0,
  var(--g3) 0 calc(1.73 * var(--s)) #1e1e1e;
  background-size: calc(2 * var(--s)) calc(3.46 * var(--s));
}

.game_name {
  font-weight: bold;
}
h1{
  font-size: 50px;
  color: #929290;
  font-family: Verdana;
}
</style>