<template>
    <div class="toolbox">
        <!-- <button @click="solve" class="">Solve</button> -->
    </div>
</template>

<script setup lang="ts">
import axios from "axios";

const props = defineProps({
    title: String,
});


const solve = async () => {
    const solution = await axios.post(`http://localhost:5000/bfs`, {
        maze: "S..E",
    });
    console.log(solution);
};
</script>

<style scoped>

</style>
