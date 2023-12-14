class BFS extends Algorithm{
    constructor(matrix){
        this.mat = matrix;
    }

    bfs(src){
        let queue = []
        let vis = Array(this.mat.rows).fill.map(() => Array(this.mat.columns).fill(false));
        queue.push(src);
        vis[src[0]][src[1]] = true;

        while(queue.length > 0){
            let cur = queue[0];
            queue.shift();

            for(let i = 0; i < 4; i++){
                const x = cur[0] + this.dirX[i];
                const y = cur[1] + this.dirY[i];
                if(x >= 0 && x < this.mat.rows){
                    if(y >= 0 && y < this.mat.columns){
                        if(vis[x][y] == true) continue;
                        queue.push([x, y]);
                        vis[x][y] = true;
                    }                                                                                                                                       
                }
            }
        }
    }
}