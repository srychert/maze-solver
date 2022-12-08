type Tile = {
    id: string;
    path: boolean;
    value: "." | "#" | "S" | "E";
    bg?: string
};

export default Tile