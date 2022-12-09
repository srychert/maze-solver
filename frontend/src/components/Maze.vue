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
        <div class="tool" @click="handleToolClick('#', 'bg')">Wall</div>
        <div class="tool" @click="handleToolClick('.', 'light')">Path</div>
        <div class="tool" @click="handleToolClick('S', 'red')">Start</div>
        <div class="tool" @click="handleToolClick('E', 'blue')">End</div>
        <div class="tool" @click="solve">Solve</div>
        <div class="tool" @click="clear">Clear</div>
    </div>
</template>

<script setup lang="ts">
import type { TileValue } from '@/types/Tile';
import type Tile from '@/types/Tile';
import axios from 'axios';
import { ref, type Ref } from 'vue';

const props = defineProps<{
    tool: TileValue,
    distance: number
}>()

const emit = defineEmits(['update:tool', 'update:distance'])

const tiles = ref<Tile[][]>([...Array(10).keys()].map((i) => {
    return [...Array(10).keys()].map(j => { return { id: `${i}${j}`, value: ".", path: false } })
}));

const getCssVariable = (name: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name)
}

type Color = 'red' | 'blue' | 'bg' | 'light'

const colors: {
    [key in Color]: string
} = {
    "red": getCssVariable('--red'),
    "blue": getCssVariable('--blue'),
    "bg": getCssVariable('--bg'),
    "light": getCssVariable('--light')
}

const borderColor = ref(colors.light)

const handleToolClick = (value: TileValue, color: Color) => {
    emit('update:tool', value)
    borderColor.value = colors[color]
}

const formatMaze = (maze: Ref<Tile[][]>) => {
    return maze.value.map(row => row.map(tile => tile.value).join("")).join('\n')
}

const mark = (tile: Tile) => {
    tile.value = props.tool

    switch (tile.value) {
        case "S":
            tile.bg = colors.red
            break
        case "E":
            tile.bg = colors.blue
            break;
        case ".":
            tile.bg = undefined
            break
        case "#":
            tile.bg = colors.bg
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
    transition: background-color 0.5s ease-out;
    cursor: pointer;
}

.tile:hover {
    border: 2px dashed v-bind('borderColor');
}

.path {
    background-color: var(--green);
}

.toolBox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 60px);
    gap: 20px;
}

.tool {
    background-color: var(--green);
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
