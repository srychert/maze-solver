"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTile = exports.ALL_TILES = void 0;
exports.ALL_TILES = ['S', 'E', '#', '.'];
function isTile(value) {
    return exports.ALL_TILES.includes(value);
}
exports.isTile = isTile;
//# sourceMappingURL=maze.js.map