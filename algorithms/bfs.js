class BFS extends Algorithm{
    constructor(matrix){
        this.mat = matrix;
    }

    bfs(src){
        /*
        0 -> Not visited
        1 -> Border
        2 -> Visited
         */
        let queue = []
        let vis = Array(this.mat.rows).fill.map(() => Array(this.mat.columns).fill(0));
        queue.push(src);
        vis[src[0]][src[1]] = 1;

        while(queue.length > 0){
            let cur = queue[0];
            queue.shift();

            vis[cur[0]][cur[1]] = 2;

            for(let i = 0; i < 4; i++){
                const x = cur[0] + this.dirX[i];
                const y = cur[1] + this.dirY[i];
                if(x >= 0 && x < this.mat.rows){
                    if(y >= 0 && y < this.mat.columns){
                        if(vis[x][y] != 0) continue;
                        queue.push([x, y]);
                        vis[x][y] = 1;
                    }                                                                                                                                       
                }
            }
        }
    }
}