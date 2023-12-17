class Algorithm {
  constructor(matrix){
    this.dirX = [1, -1, 0, 0];
    this.dirY = [0, 0, 1, -1];
    this.mat = matrix;

    this.n = this.mat.rows;
    this.m = this.mat.columns;
    this.vis = Array(this.mat.rows).fill.map(() =>
      Array(this.mat.columns).fill(0)
    );
    this.par = new Object();

    this.dest = [Math.floor(Math.random() * (this.n-1)), Math.floor(Math.random() * (this.m-1))];
    this.src = [Math.floor(Math.random() * (this.n-1)), Math.floor(Math.random() * (this.m-1))];
  }

  getPath() {
    let path = [];
    let cur = this.dest;
    while (cur[0] != -1 && cur[1] != -1) {
      path.push(cur);
      cur = this.par[cur];
    }
    return path;
  }
}
