let colors, matrix, algo, step, foundFood, foodCount, idx, flag;
let path, weight;
let menu;
let state = 0;
let states;
const terrain = [1, 5, 10, Infinity]

function drawGrid(){
    if(step < algo.steps.length){ 
      let cur = algo.steps[step];
      algo.marked[cur[0]][cur[1]] = 1;
    }
    for(var x = 0; x < width; x += 20){
      line(x, 0, x, height);
      line(0, x, width, x);
    for(var y = 0; y < height; y += 20){
          stroke(0);
        strokeWeight(1);
          let i = floor(x/20), j = floor(y/20);
          let color;
          if(matrix[i][j] == Infinity){
            color = 3;
          }
          else{
            if(algo.marked[i][j] == 1){
              color = 4;
            }
            else{
              let ok = false;
              for(var u=0; u<4; u++){
                const dx = i + algo.dirX[u];
                const dy = j + algo.dirY[u];
                if(dx >= 0 && dx < 20 && dy >= 0 && dy < 20 && algo.marked[dx][dy] == 1){
                  ok = true;
                }
              }
              if(ok){
                color = 5;
              }
              else{
                color = floor(matrix[i][j]/5);
              }
            }
            
          }
          fill(colors[color]);
          rect(x, y, 20,20);
    }
  }
    fill(227, 129, 188);
    ellipse(algo.src[0]*20 + 10, algo.src[1]*20 + 10, 10, 10);
        
    fill(255, 235, 59);
    ellipse(algo.dest[0]*20 + 10, algo.dest[1]*20 + 10, 10, 10);
}

function additionalSetup(algorithm){
  
  for(var i =0; i < 20; i++){
    for(var j = 0; j < 20;j++){
      let t = floor(random(7));
      matrix[i][j] = terrain[floor(t/2)];
    }
  }
  // Aqui ele vê qual opção foi selecionada e roda o algo
  if (state == 1) {
    algo = new BFS(matrix);
    algo.bfs();
  } else if (state == 2) {
    algo = new DFS(matrix);
    algo.dfs();
  } else if (state == 3) {
    algo = new Greedy(matrix);
    algo.greedy();
  } else if (state == 4) {
    algo = new UniformCost(matrix);
    algo.uniformCost();
  } else if (state == 5) {
    algo = new AStar(matrix);
    algo.astar();
  }

  step = 0;
  foundFood = false;
  
}

function setup() {
    flag = false;
  
  let canva = createCanvas(400, 400);
    canvaX = (windowWidth - width) / 2;
    canvaY = (windowHeight - height) / 2;
    canva.position(canvaX, canvaY);
  
    let water = color(81, 120, 143);
    let sand = color(244, 219, 171);
    let mud = color(81, 107, 84);
    let obstacle = color(50, 50, 50);
    let visited = color(200, 200, 200);
    let border = color(180, 90, 150);
    colors = [sand, mud, water, obstacle, visited, border];
  
    matrix = new Array(20);
    for(var i = 0; i < 20; i++){
      matrix[i] = new Array(20);
    }
    
    menu = new Menu(terrain);
    states = { 1: BFS, 2: DFS, 3: Greedy, 4: UniformCost, 5: AStar };
}

function markPath(){
  for(var x = 0; x < width; x+= 20){
    line(x, 0, x, height);
  }
  for(var x = 0; x < width; x+= 20){
    line()
    for(var y = 0; y < height ; y+=20){
      let isMarked = false;
      let i = floor(x/20), j = floor(y/20);
      for(var k = 0; k<path.length; k++){
        let now = path[k];
        if(now[0] == i && now[1] == j){
          isMarked = true;
        }
      }
    }
  }
}

function drawPath(pos){
    fill("#F8F2F200");
    stroke(240, 46, 46);
    strokeWeight(2);
    rect(pos[0]*20, pos[1]*20, 20,20);
    fill(227, 129, 188);
    stroke(0);
    strokeWeight(1);
    ellipse(algo.src[0]*20 + 10, algo.src[1]*20 + 10, 10, 10);
        
    fill(237, 231, 104);
    ellipse(algo.dest[0]*20 + 10, algo.dest[1]*20 + 10, 10, 10);
    fill("#F8F2F200");
}

function drawWalk(pos){
  if(algo.mat[pos[0]][pos[1]] > 0){
    algo.mat[pos[0]][pos[1]] = algo.mat[pos[0]][pos[1]] - 1;
  }
  
  else{
    fill(240, 46, 46);
    stroke(0);
    strokeWeight(2)
    rect(pos[0]*20, pos[1]*20, 20,20);
    
    idx = idx + 1;
    algo.src = path[idx];
    fill(227, 129, 188);
    ellipse(algo.src[0]*20 + 10, algo.src[1]*20 + 10, 10, 10);
  }
}

function draw(){
  
    if (!state) {
      state = menu.drawMenu();
    } else if(!flag) {
      additionalSetup(states[state]);
      
      frameRate(15);
      foodCount = 0;
      
      flag = true;
    }
    
    else if(foundFood == false){
      drawGrid();
      step = step + 1;
      let dest = algo.dest;
      if(algo.marked[dest[0]][dest[1]] == 1){
        foundFood = true;
        path = algo.getPath();
        step = 0;
        idx = 0;
      }
      else{
        if(step == algo.steps.length){
          additionalSetup();
        }
      }
    }
    else{
      // marcar o path todo 
      if(step < path.length){
        drawPath(path[step]);
        step = step + 1;
      }
      else{
        if(algo.dest != algo.src){
          drawWalk(algo.src)
        }
        
        else{
          foodCount = foodCount + 1;
          print("comidas coletadas: " + foodCount);
          additionalSetup();
        }
      }
    }
      
    // se quebrar, isso é o que tinha antes
    // drawGrid();
    // step = step + 1;
    // //print(step);
    
}