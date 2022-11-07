import { Tile } from "./maze";


export default class BFS {
    private queue: BfsElement[];
    private maze: Tile[][];
    private rowLength: number;
    private columnLength: number;

    private directions: {
        "right": Cord
        "left": Cord
        "up": Cord
        "down": Cord
    }
    private visited: Set<string>

    constructor (maze: Tile[][]) {
        this.maze = maze as Tile[][];
        let startCord: Cord = this.findCord('S')
        this.queue = [[startCord, 0, [startCord]]];

        this.rowLength = this.maze.length
        this.columnLength = this.maze[0].length

        this.directions = {
            "right": [0, 1],
            "left": [0, -1],
            "up": [1, 0],
            "down": [-1, 0]
        }
        this.visited = new Set<string>();
    }

    findCord(search: Tile): Cord {
        const row: number = this.maze.findIndex(row => row.includes(search));
        const col: number|undefined = this.maze[row]?.indexOf(search);
        if(col === undefined){
            throw new Error(`Cordinates for tile '${search}' not found`)
        }
        return [row, col]
    }

    serach(): BfsResult|null {
        while(this.queue.length !== 0){
            const ele = this.queue.shift()!
            const cord: Cord = ele[0]
            const distance: number = ele[1]
            this.visited.add(cord.toString())

            if(this.maze[cord[0]][cord[1]] === "E"){
                return {
                    "distance": ele[1],
                    "path": ele[2]
                }
            }

            for (const direction of Object.values(this.directions)) {
                const newCord: Cord = [cord[0] + direction[0], cord[1] + direction[1]]

                if(newCord[0] < 0 || newCord[0] >= this.rowLength ||
                    newCord[1] < 0 || newCord[1] >= this.columnLength ||
                     this.maze[newCord[0]][newCord[1]] === "#" || this.visited.has(newCord.toString())){
                        continue
                }
                this.queue.push([newCord, distance + 1, [...ele[2], newCord]])
            }
        }
        return null
    }
}

// const maze: Tile[][] = file.split(EOL).map(l => [...l].filter(c => isTile(c))) as Tile[][]
