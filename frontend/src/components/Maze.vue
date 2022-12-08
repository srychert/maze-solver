<template>
    <div>
        <div class="container">
            <div v-for="tileRow in tiles" class="tile-row">
                <div v-for="tile in tileRow" :key="tile.id" :id="tile.id" class="tile" :class="{ 'path': tile.path }"
                    :style="{ 'background-color': tile.bg }" @click="mark(tile)">
                </div>
            </div>
        </div>
    </div>

    <div class="toolBox">
        <!-- <select v-model="selected" @change="$emit('update:tool', selected)">
            <option value="#">Wall</option>
            <option value=".">Path</option>
        </select> -->
        <div class="tool" @click="$emit('update:tool', '#')">Wall</div>
        <div class="tool" @click="$emit('update:tool', '.')">Path</div>
        <div class="tool" @click="$emit('update:tool', 'S')">Start</div>
        <div class="tool" @click="$emit('update:tool', 'E')">End</div>
    </div>
    <button @click="solve" class="">Solve</button>
    <button @click="clear" class="">Clear</button>


</template>

<script setup lang="ts">
import type Tile from '@/types/Tile';
import axios from 'axios';
import { ref, type Ref } from 'vue';

const props = defineProps<{
    tool?: string,
    distance: number
}>()

const emit = defineEmits(['update:tool', 'update:distance'])


// for select
const selected = "#"

const tiles = ref<Tile[][]>([...Array(10).keys()].map((i) => {
    return [...Array(10).keys()].map(j => { return { id: `${i}${j}`, value: ".", path: false } })
}));

const mark = (tile: Tile) => {
    tile.value = props.tool as "#" | "." | "S" | "E"

    switch (tile.value) {
        case "S":
            tile.bg = "red"
            break
        case "E":
            tile.bg = "blue"
            break;
        case ".":
            tile.bg = undefined
            break
        case "#":
            tile.bg = "black"
            break
        default:
            break;
    }
};

const resetPath = () => {
    tiles.value.forEach(row => row.forEach(tile => tile.path = false))
}

const solve = async () => {
    console.log(formatMaze(tiles))
    resetPath()
    const solution = await axios.post(`http://localhost:5000/bfs`, {
        maze: formatMaze(tiles),
    })
        .catch(err => console.log(err.response.data))

    if (solution) {
        console.log(solution.data)
        emit('update:distance', solution.data.distance)
        const path: [number, number][] = solution.data.path

        path.forEach(cord => {
            tiles.value[cord[0]][cord[1]].path = true
        })

    }
};

const clear = () => {
    emit('update:distance', 0)
    tiles.value.forEach(row => row.forEach(tile => {
        tile.value = "."
        tile.path = false
        tile.bg = undefined
    }))

}

// TODO change
const formatMaze = (maze: Ref<Tile[][]>) => {
    return maze.value.map(row => row.map(tile => tile.value).join("")).join('\n')
}

</script>

<style scoped>
.container {
    display: grid;

    grid-template-rows: repeat(10, 1fr);
    gap: 10px;
}

.tile-row {
    display: grid;

    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
}

.tile {
    aspect-ratio: 1 / 1;
    width: 100%;
    background-color: var(--light);
    color: black;
    cursor: pointer;
}

.path {
    background-color: yellowgreen;
}

.toolBox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 60px);
    gap: 20px;
}

.tool {
    background-color: yellowgreen;
    color: black;
    font-weight: 700;

    display: grid;
    place-content: center;

    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
}

.tool:active {
    filter: brightness(80%);
}
</style>
