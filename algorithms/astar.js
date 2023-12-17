class AStar extends Algorithm{
    constructor(matrix, dest, src){
        this.mat = matrix;
        this.dest = dest;
        this.src = src;
        this.vis = Array(this.mat.rows).fill.map(() =>
          Array(this.mat.columns).fill(0)
        );
        this.dist = Array(this.mat.rows).fill.map(() =>
            Array(this.mat.columns).fill(Infinity)
        );
    }

    astar(){
        /*
        0 -> Not visited
        1 -> Border
        2 -> Visited
        */
        let pq = new PriorityQueue();
        pq.push(0, this.src);
        this.dist[this.src[0]][this.src[1]] = 0;
        this.vis[this.src[0]][this.src[1]] = 1;

        while(!pq.isEmpty()){
            let [val, node] = pq.top();
            pq.pop();

            if(node === this.dest){
                return true;
            }

            if(this.dist[node[0]][node[1]] < val){
                continue;
            }

            this.vis[node[0]][node[1]] = 2;

            for(let i = 0; i < 4; i++){
                let x = node[0] + this.dirX[i];
                let y = node[1] + this.dirY[i];

                if(x >= 0 && x < this.mat.rows){
                    if(y >= 0 && y < this.mat.columns){
                        var h = Math.abs(this.dest[0] - x) + Math.abs(this.dest[1] - y);
                        if(this.dist[x][y] + this.mat[x][y] + h >= this.dist[x][y]) continue;
                        this.dist[x][y] = this.dist[x][y] + this.mat[x][y] + h;
                        pq.push(this.dist[x][y], [x, y]);
                        this.vis[x][y] = 1;
                    }
                }
            }
        }
    }
}