class Greedy extends Algorithm{
    constructor(matrix, dest, src){
        this.mat = matrix;
        this.dest = dest;
        this.src = src;
        this.vis = Array(this.mat.rows).fill.map(() => Array(this.mat.columns).fill(0));
    }

    greedy(){
        /*
        0 -> Not visited
        1 -> Border
        2 -> Visited
         */
        let pq = new PriorityQueue();
        pq.push(0, this.src);

        while(!pq.isEmpty()){
            let [val, node] = pq.top();
            pq.pop();

            if(node === this.dest){
                return true;
            }

            if(this.vis[node[0]][node[1]] === 2){
                continue;
            }

            this.vis[node[0]][node[1]] = 2;

            for(let i = 0; i < 4; i++){
                let x = node[0] + this.dirX[i];
                let y = node[1] + this.dirY[i];

                if(x >= 0 && x < this.mat.rows){
                    if(y >= 0 && y < this.mat.columns){
                        if(this.vis[x][y] != 0) continue;
                        pq.push(this.mat.dist(x, y, this.dest), [x, y]);
                        this.vis[x][y] = 1;
                    }
                }
            }
        }
    }
}