type Cord = [number, number];
type BfsElement = [Cord, number, Cord[]]
type BfsResult = {
    distance: number,
    path: Cord[]
}