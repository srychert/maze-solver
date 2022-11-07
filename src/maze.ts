export const ALL_TILES = ['S', 'E', '#', '.'] as const;
export type TileTuple = typeof ALL_TILES;
export type Tile = TileTuple[number];

export function isTile(value: string): value is Tile {
  return ALL_TILES.includes(value as Tile)
}