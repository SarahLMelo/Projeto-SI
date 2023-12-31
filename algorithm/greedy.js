class Greedy extends Algorithm {
    constructor(matrix) {
      super(matrix);
    }
  
    greedy() {
      /*
          0 -> Not visited
          1 -> Border
          2 -> Visited
           */
      let pq = new PriorityQueue();
      pq.push(0, this.src);
      this.vis[this.src[0]][this.src[1]] = 1;
      this.par[this.src] = [-1, -1];
  
      while (!pq.isEmpty()) {
        let [val, node] = pq.top();
        pq.pop();

        if (this.vis[node[0]][node[1]] === 2) {
            continue;
        }
        this.steps.push(node);
  
        if (node === this.dest) {
          return true;
        }
  
        
  
        this.vis[node[0]][node[1]] = 2;
  
        for (let i = 0; i < 4; i++) {
          let x = node[0] + this.dirX[i];
          let y = node[1] + this.dirY[i];
  
          if (x >= 0 && x < this.n) {
            if (y >= 0 && y < this.m) {
              if (this.vis[x][y] != 0 || this.mat[x][y] == Infinity) continue;
              pq.push(this.mat[x][y], [x, y]);
              this.vis[x][y] = 1;
              this.par[[x, y]] = node;
            }
          }
        }
      }
    }
  }