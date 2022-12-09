<template>
  <h1>Maze Solver</h1>
  <Transition name="distance">
    <h2 v-show="distance">Distance: {{ distance }}</h2>
  </Transition>
  <div class="main">
    <Maze v-model:tool="tool" v-model:distance="distance"></Maze>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import Maze from "./components/Maze.vue";
import type { TileValue } from "./types/Tile";

const tool: Ref<TileValue> = ref("#")
const distance = ref(0)

</script>

<style scoped>
h1,
h2 {
  text-align: center;
  color: var(--cream);
}

.distance-enter-active,
.distance-leave-active {
  transition: opacity 1s ease-in-out;
}

.distance-enter-from,
.distance-leave-to {
  opacity: 0;
}

.main {
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 0.8fr 200px;
  gap: 60px;
}

@media (max-width: 900px) {
  .main {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 30px;
  }
}
</style>
