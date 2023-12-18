let colors, matrix, algo, step, foundFood, foodCount;
let path, weight;
const terrain = [1, 5, 10, Infinity]

function drawGrid(){
    if(step < algo.steps.length){ 
      let cur = algo.steps[step];
      print("oi")
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
        
    fill(237, 231, 104);
    ellipse(algo.dest[0]*20 + 10, algo.dest[1]*20 + 10, 10, 10);
}

function additionalSetup(){
  // aqui escolhe o algoritmo
  // setar cores da matriz aqui
  
  for(var i =0; i < 20; i++){
    for(var j = 0; j < 20;j++){
      let t = floor(random(7));
      matrix[i][j] = terrain[floor(t/2)];
    }
  }
  algo = new UniformCost(matrix);
  algo.uniformCost();
  step = 0;
  foundFood = false;
  
}

function setup() {
	createCanvas(400, 400);
    let water = color(36, 179, 250);
    let sand = color(244, 234, 213);
    let mud = color(70, 120, 70);
    let obstacle = color(50, 50, 50);
    let visited = color(255);
    let border = color(172, 232, 231);
    colors = [sand, mud, water, obstacle, visited, border];
    matrix = new Array(20);
    for(var i = 0; i < 20; i++){
      matrix[i] = new Array(20);
    }
    additionalSetup();
    frameRate(10);
    foodCount = 0;
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
          isMakrked = true;
        }
      }
    }
  }
}

function draw(){
    
    if(foundFood == false){
      drawGrid();
      step = step + 1;
      let dest = algo.dest;
      if(algo.marked[dest[0]][dest[1]] == 1){
        foundFood = true;
        path = algo.getPath();
      }
      else{
        if(step == algo.steps.length){
          additionalSetup();
        }
      }
    }
    else{
      // marcar o path todo 
      
      
      
    }
    // se quebrar, isso é o que tinha antes
    // drawGrid();
    // step = step + 1;
    // //print(step);
    
}