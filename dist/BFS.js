"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = require("./Queue");
class BFS {
    constructor(maze) {
        this.queue = new Queue_1.Queue();
        this.maze = maze;
        let startCord = this.findCord('S');
        this.queue.add([startCord, 0, [startCord]]);
        this.rowLength = this.maze.length;
        this.columnLength = this.maze[0].length;
        this.directions = {
            "right": [0, 1],
            "left": [0, -1],
            "up": [1, 0],
            "down": [-1, 0]
        };
        this.visited = new Set();
    }
    findCord(search) {
        var _a;
        const row = this.maze.findIndex(row => row.includes(search));
        const col = (_a = this.maze[row]) === null || _a === void 0 ? void 0 : _a.indexOf(search);
        if (col === undefined) {
            throw new Error(`Cordinates for tile '${search}' not found`);
        }
        return [row, col];
    }
    serach() {
        while (this.queue.length !== 0) {
            const ele = this.queue.pop();
            const cord = ele[0];
            this.visited.add(cord.toString());
            const distance = ele[1];
            if (this.maze[cord[0]][cord[1]] === "E") {
                return {
                    "distance": ele[1],
                    "path": ele[2]
                };
            }
            for (const direction of Object.values(this.directions)) {
                const newCord = [cord[0] + direction[0], cord[1] + direction[1]];
                if (newCord[0] < 0 || newCord[0] >= this.rowLength ||
                    newCord[1] < 0 || newCord[1] >= this.columnLength ||
                    this.maze[newCord[0]][newCord[1]] === "#" || this.visited.has(newCord.toString())) {
                    continue;
                }
                this.queue.addLeft([newCord, distance + 1, [...ele[2], newCord]]);
            }
        }
        return null;
    }
}
exports.default = BFS;
//# sourceMappingURL=BFS.js.map