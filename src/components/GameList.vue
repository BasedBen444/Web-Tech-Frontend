<template>
  <div class="game-list-container">
    <h3>Games</h3>

    <!-- Search bar -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search games by team, date, or sport..."
      class="search-input"
    />

    <!-- No games found message -->
    <div v-if="filteredGames.length === 0">
      No games found.
    </div>

    <!-- Games list -->
    <ul v-else>
      <li v-for="game in filteredGames" :key="game.id">
        <router-link
          :to="{ name: 'game', params: { gameId: game.id } }"
          class="game-button"
        >
          {{ game.date }} - {{ game.teams }} - {{ game.id }}
        </router-link>
      </li>
    </ul>

    <!-- Create New Game button (only for admins) -->
    <div class="button-group" v-if="isAdminUser">
      <router-link
        :to="{ name: 'creategame', params: { scheduleId: scheduleId } }"
        class="create-game-link"
      >
        <button class="create-game-button">Create New Game</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { isAdmin } from '@/apis/auth'

// Destructure props correctly
const { games, scheduleId } = defineProps(['games', 'scheduleId'])

const isAdminUser = computed(() => isAdmin.value)
const searchTerm = ref('')

// Computed: filtered list of games
const filteredGames = computed(() => {
  if (!searchTerm.value.trim()) {
    return games
  }

  const lowerSearch = searchTerm.value.toLowerCase()

  return games.filter(game =>
    (game.teams && game.teams.toLowerCase().includes(lowerSearch)) ||
    (game.date && game.date.toLowerCase().includes(lowerSearch)) ||
    (game.sport && game.sport.toLowerCase().includes(lowerSearch))
  )
})
</script>

<style scoped>
.game-list-container {
  padding: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

li {
  margin: 0;
}

.game-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: purple;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
}

.game-button:hover {
  background-color: darkviolet;
  transform: translateY(-2px);
}

.game-button:active {
  background-color: #004494;
  transform: translateY(1px);
}

.button-group {
  margin-top: 2rem;
  text-align: center;
}

.create-game-link {
  text-decoration: none;
}

.create-game-button {
  padding: 0.75rem 2rem;
  background-color: #28a745;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.create-game-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.create-game-button:active {
  background-color: #1c7430;
  transform: translateY(1px);
}
</style>
