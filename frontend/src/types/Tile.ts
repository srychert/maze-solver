export type TileValue = "." | "#" | "S" | "E";

export type Tile = {
    id: string;
    path: boolean;
    value: TileValue;
    bg?: string
};

export default Tile