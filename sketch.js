let colors, matrix, algo, step, foundFood, foodCount, idx, flag;
let path, weight;
let menu, chosenAlgorithm;
let state = 0;
let states;
const terrain = [1, 5, 10, Infinity]

function drawGrid(){
    if(step < algo.steps.length){ 
      let cur = algo.steps[step];
      algo.marked[cur[0]][cur[1]] = 1;
    }
    for(var x = 0; x < 400; x += 20){
      line(x, 0, x, 400);
      line(0, x, 400, x);
    for(var y = 0; y < 400; y += 20){
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
        
    fill(237, 231, 104);
    ellipse(algo.dest[0]*20 + 10, algo.dest[1]*20 + 10, 10, 10);
}

function additionalSetup(algorithm){
  // aqui escolhe o algoritmo
  // setar cores da matriz aqui
  
  for(var i =0; i < 20; i++){
    for(var j = 0; j < 20;j++){
      let t = floor(random(7));
      matrix[i][j] = terrain[floor(t/2)];
    }
  }
  // Aqui ele vê qual opção foi selecionada e roda o algo
  if (state == 1) {
    console.log("entrei BFS")
    algo = new BFS(matrix);
    algo.bfs();
  } else if (state == 2) {
    console.log("entrei DFS")
    algo = new DFS(matrix);
    algo.dfs();
  } else if (state == 3) {
    console.log("entrei Greedy")
    algo = new Greedy(matrix);
    algo.greedy();
  } else if (state == 4) {
    console.log("entrei Uniform Cost")
    algo = new UniformCost(matrix);
    algo.uniformCost();
  } else if (state == 5) {
    console.log("entrei AStar")
    algo = new AStar(matrix);
    algo.astar();
  }

  step = 0;
  foundFood = false;
}

function setup() {
    flag = false;
  createCanvas(400, 500);
    let water = color(81, 120, 143);
    let sand = color(244, 219, 171);
    let mud = color(81, 107, 84);
    let obstacle = color(50, 50, 50);
    let border = color(71, 57, 94);
    let visited = color(200, 200, 200);
    colors = [sand, mud, water, obstacle, visited, border];
  
    matrix = new Array(20);
    for(var i = 0; i < 20; i++){
      matrix[i] = new Array(20);
    }
    
    menu = new Menu(terrain);
    states = { 1: BFS, 2: DFS, 3: Greedy, 4: UniformCost, 5: AStar };
}

function drawPath(pos){
    strokeWeight(4);
    noFill();
    stroke(89, 41, 41);

    rect(pos[0]*20, pos[1]*20, 20,20);
    stroke(0);
    strokeWeight(1);
    fill(227, 129, 188);
    ellipse(algo.src[0]*20 + 10, algo.src[1]*20 + 10, 10, 10);
        
    fill(237, 231, 104);
    ellipse(algo.dest[0]*20 + 10, algo.dest[1]*20 + 10, 10, 10);
}

function drawWalk(pos){
  if(algo.mat[pos[0]][pos[1]] > 0){
    algo.mat[pos[0]][pos[1]] = algo.mat[pos[0]][pos[1]] - 1;
  }
  
  else{
    fill(158, 46, 46);
    rect(pos[0]*20, pos[1]*20, 20,20);
    
    idx = idx + 1;
    algo.src = path[idx];
    fill(227, 129, 188);
    ellipse(algo.src[0]*20 + 10, algo.src[1]*20 + 10, 10, 10);
  }
}

function resetaMatriz(){
  for(var x = 0; x < 400; x += 20){
          line(x, 0, x, 400);
          line(0, x, 400, x);
          for(var y = 0; y < 400; y += 20){
              stroke(0);
              strokeWeight(1);
              let i = floor(x/20), j = floor(y/20);
              
              if(algo.mat[i][j] == Infinity){
                fill(50, 50, 50);
              }
              else{
                let color = floor(algo.mat[i][j]/5);
                fill(colors[color]);
              }
              rect(x, y, 20, 20);
                

          }
              
        }
}

function messagemComida(color){
  stroke(0);
  strokeWeight(1);
  textSize(20);
  fill(color);
  let eat = "Comidas coletadas: " + foodCount;
  switch(state) {
    case 1:
      chosenAlgorithm = "BFS"
      break;
    case 2:
      chosenAlgorithm = "DFS"
      break;
    case 3:
      chosenAlgorithm = "Greedy"
      break;
    case 4:
      chosenAlgorithm = "Uniform Cost"
      break;
    case 5:
      chosenAlgorithm = "A*"
      break;
    default:
     chosenAlgorithm = " "
}
  let algorithmText = "Algoritmo escolhido:  " + chosenAlgorithm
  text(algorithmText, 200, 430);
  text(eat, 200, 480);
}

function draw(){
    if(state){
      messagemComida(color(255, 255, 255));
    }
  
    if (!state) {
      
      state = menu.drawMenu();
    } else if(!flag) {
      background(0, 0, 0);
      additionalSetup(states[state]);
      
      frameRate(10);
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
        resetaMatriz();
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
       if(step < path.length){
        drawPath(path[step]);
        step = step + 1;
      }
      else{
        if(algo.dest != algo.src){
          drawWalk(algo.src)
        }
        
        else{
          messagemComida(color(0, 0, 0));
          foodCount = foodCount + 1;
          print("comidas coletadas: " + foodCount);
          additionalSetup();
        }
      }
    }
      
    
}