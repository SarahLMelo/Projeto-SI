class Algorithm {
  constructor(matrix) {
    this.dirX = [1, -1, 0, 0];
    this.dirY = [0, 0, 1, -1];
    this.mat = matrix;

    this.n = 20;
    this.m = 20;
    this.vis = new Array(20);
    this.marked = new Array(20);
    for(var i = 0; i < 20; i++){
      this.vis[i] = new Array(20);
      this.marked[i] = new Array(20);
      for(var j =0; j < 20; j++){
        this.vis[i][j] = 0;
        this.marked[i][j] = 0;
      }
    }
    this.par = new Object();
    this.steps = [];

    this.dest = [
      Math.floor(Math.random() * (this.n - 1)),
      Math.floor(Math.random() * (this.m - 1)),
    ];
    this.src = [
      Math.floor(Math.random() * (this.n - 1)),
      Math.floor(Math.random() * (this.m - 1)),
    ];
    
    //print(this.src);
    //print(this.dest);
  }

  getPath() {
    let path = [];
    let cur = this.dest;
    while (cur[0] != -1 && cur[1] != -1) {
      path.push(cur);
      cur = this.par[cur];
    }
    path.reverse();
    return path;
  }
}