class BFS extends Algorithm {
  constructor(matrix) {
    super(matrix);
  }

  bfs() {
    /*
        0 -> Not visited
        1 -> Border
        2 -> Visited
         */
    let queue = [];
    queue.push(this.src);
    this.vis[this.src[0]][this.src[1]] = 1;

    this.par[this.src] = [-1, -1];
    while (queue.length > 0) {
      let cur = queue[0];
      queue.shift();
      this.steps.push(cur);
      let now = this.vis[cur[0]][cur[1]];

      if (cur[0] == this.dest[0] && cur[1] == this.dest[1]) return true; // Found the destination

      for (let i = 0; i < 4; i++) {
        const x = cur[0] + this.dirX[i];
        const y = cur[1] + this.dirY[i];
        if (x >= 0 && x < this.n) {
          if (y >= 0 && y < this.m) {
            if (this.vis[x][y] != 0 || this.mat[x][y] == Infinity) continue;
            queue.push([x, y]);
            this.par[[x, y]] = cur;
            this.vis[x][y] = now + 1;
          }
        }
      }
    }
  }
}