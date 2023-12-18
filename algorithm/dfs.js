class DFS extends Algorithm {
    constructor(matrix) {
      super(matrix);
      this.par[this.src] = [-1, -1];
      this.vis[this.src[0]][this.src[1]] = 1;
    }
  
    dfs(){
      return this._dfs(this.src)
    }

  
    _dfs(node) {
      /*
          0 -> Not visited
          1 -> Border
          2 -> Visited
           */
      this.steps.push(node);
      // print(node);
      this.vis[node[0]][node[1]] = 2;
      if (node[0] == this.dest[0] && node[1] == this.dest[1]) return true; // Found the destination
  
      for (let i = 0; i < 4; i++) {
        const x = node[0] + this.dirX[i];
        const y = node[1] + this.dirY[i];
        if (x >= 0 && x < this.n) {
          if (y >= 0 && y < this.m) {
            // print(this.vis[x][y])
            if (this.vis[x][y] != 0 || this.mat[x][y] == Infinity)  continue;
            this.vis[x][y] = 1;
            this.par[[x, y]] = node;
            if (this._dfs([x, y])) return true;
          }
        }
      }
    }
  }