class DFS extends Algorithm{
    constructor(matrix, dest, src){
        this.mat = matrix;
        this.vis = Array(this.mat.rows).fill.map(() => Array(this.mat.columns).fill(0));
        this.dest = dest;
        queue.push(src);
        vis[src[0]][src[1]] = 1;
    }

    dfs(node){
        /*
        0 -> Not visited
        1 -> Border
        2 -> Visited
         */

        vis[node[0]][node[1]] = 2;
        if(node[0] == this.dest[0] && node[1] == this.dest[1]) return true; // Found the destination

        for(let i = 0; i < 4; i++){
            const x = node[0] + this.dirX[i];
            const y = node[1] + this.dirY[i];
            if(x >= 0 && x < this.mat.rows){
                if(y >= 0 && y < this.mat.columns){
                    if(vis[x][y] != 0) continue;
                    vis[x][y] = 1;
                    if(this.dfs([x, y])) return true;
                }                                                                                                                                       
            }
        }
    }
}