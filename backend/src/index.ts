import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import BFS from "./BFS"
import { isTile, Tile } from "./types/maze";

dotenv.config();

const app: Express = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000;

app.post('/bfs', (req: Request, res: Response) => {
    try {
        const maze: string = req.body.maze
        const mazeTiles: Tile[][] = maze.split("\n").map(l => [...l].filter(c => isTile(c))) as Tile[][]
        const bfs = new BFS(mazeTiles);
        res.send(bfs.serach());
    }catch (e){
        if (typeof e === "string") {
            res.status(400).send(e.toUpperCase())
        } else if (e instanceof Error) {
            res.status(400).send(e.message)
        }
    }
    
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});