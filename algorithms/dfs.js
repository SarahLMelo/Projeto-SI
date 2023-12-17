class DFS extends Algorithm {
  constructor(matrix) {
    super(matrix);
    queue.push(this.src);
    this.vis[this.src[0]][this.src[1]] = 1;
    this.par[this.src] = [-1, -1];
  }

  dfs(node) {
    /*
        0 -> Not visited
        1 -> Border
        2 -> Visited
         */

    this.vis[node[0]][node[1]] = 2;
    if (node[0] == this.dest[0] && node[1] == this.dest[1]) return true; // Found the destination

    for (let i = 0; i < 4; i++) {
      const x = node[0] + this.dirX[i];
      const y = node[1] + this.dirY[i];
      if (x >= 0 && x < this.mat.rows) {
        if (y >= 0 && y < this.mat.columns) {
          if (this.vis[x][y] != 0) continue;
          this.vis[x][y] = 1;
          this.par[[x, y]] = node;
          if (this.dfs([x, y])) return true;
        }
      }
    }
  }
}
