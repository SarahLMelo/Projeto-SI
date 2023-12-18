class UniformCost extends Algorithm {
    constructor(matrix) {
      super(matrix);
      this.dist = new Array(20);
      for(var i=0; i<20; i++){
        this.dist[i] = new Array(20);
        for(var j=0; j<20; j++){
            this.dist[i][j] = Infinity;
        }
      }
    }
  
    uniformCost() {
      /*
          0 -> Not visited
          1 -> Border
          2 -> Visited
          */
      let pq = new PriorityQueue();
      pq.push(0, this.src);
      this.dist[this.src[0]][this.src[1]] = 0;
      this.vis[this.src[0]][this.src[1]] = 1;
      this.par[this.src] = [-1, -1];
  
      while (!pq.isEmpty()) {
        let [val, node] = pq.top();
        pq.pop();
        if(this.dist[node[0]][node[1]] < val) {
            continue;
        }

        if(this.vis[node[0]][node[1]] == 1){
            this.steps.push(node);
        }
  
        if (node === this.dest) {
          return true;
        }
  
        this.vis[node[0]][node[1]] = 2;
  
        for (let i = 0; i < 4; i++) {
          let x = node[0] + this.dirX[i];
          let y = node[1] + this.dirY[i];
  
          if (x >= 0 && x < this.n) {
            if (y >= 0 && y < this.m) {
              if (this.dist[node[0]][node[1]] + this.mat[x][y] >= this.dist[x][y]) continue;
              this.dist[x][y] = this.dist[node[0]][node[1]] + this.mat[x][y];
              pq.push(this.dist[x][y], [x, y]);
              this.vis[x][y] = 1;
            }
          }
        }
      }
    }
  }