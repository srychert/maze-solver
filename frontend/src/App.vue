<template>
  <h1>Maze Solver</h1>
  <h2 v-if="distance">Distance: {{ distance }}</h2>
  <div class="main">
    <Maze v-model:tool="tool" v-model:distance="distance"></Maze>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Maze from "./components/Maze.vue";

const tool = ref("#")
const distance = ref(0)

</script>

<style scoped>
h1,
h2 {
  text-align: center;
}

.main {
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 200px;
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
