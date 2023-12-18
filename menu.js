class Menu {
  constructor(terrain) {
    terrain = terrain;
  }

  hoverEffect(x, y, width, height) {
    stroke(255, 255, 255);
    strokeWeight(2);
    fill('#F4EAD5');
    rect(x, y, width, height, 5);
    fill(134, 62, 23);
  }

  mouseInArea(x, y, width, height) {
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
  }

  drawMenu() {
    stroke(1);
    frameRate(10);
    cursor(ARROW);

    fill(33, 150, 243);
    textSize(40);
    textFont("Ubuntu");
    textAlign(CENTER);
    text('Bem-vindo!', width/2, height/5);

    fill(33, 150, 243);
    textSize(24);
    text('Escolha o algorítmo:', width/2, height/3 -20);

    fill(56, 55, 55);
    rect(width/2 - 50, height/2 - 70, 100, 40, 5);
    rect(width/2 - 50, height/2 - 20, 100, 40, 5);
    rect(width/2 - 50, height/2 + 30, 100, 40, 5);
    rect(width/2 - 80, height/2 + 80, 160, 40, 5);
    rect(width/2 - 50, height/2 + 130, 100, 40, 5);

    fill(33, 150, 243);
    text('BFS', width/2, height/2 - 40);
    text('DFS', width/2, height/2 + 10);
    text('Greedy', width/2, height/2 + 60);
    text('Uniform Cost', width/2, height/2 + 110);
    text('A*', width/2, height/2 + 160);

    if (this.mouseInArea(width/2 - 50, height/2 - 70, 100, 40)) {
      this.hoverEffect(width/2 - 50, height/2 - 70, 100, 40);
      text('BFS', width/2, height/2 - 40);
      cursor(HAND);
      if (mouseIsPressed) return 1;
      return 0;
    } else if (this.mouseInArea(width/2 - 50, height/2 -20, 100, 40)) {
      this.hoverEffect(width/2 - 50, height/2 - 20, 100, 40);
      text('DFS', width/2, height/2 + 10);
      cursor(HAND);
      if (mouseIsPressed) return 2;
      return 0;
    } else if (this.mouseInArea(width/2 - 50, height/2 + 30, 100, 40)) {
      this.hoverEffect(width/2 - 50, height/2 + 30, 100, 40);
      text('Greedy', width/2, height/2 + 60);
      cursor(HAND);
      if (mouseIsPressed) return 3;
      return 0;
    } else if (this.mouseInArea(width/2 - 50, height/2 + 80, 160, 40)) {
      this.hoverEffect(width/2 - 50 - 30, height/2 + 80, 160, 40);
      text('Uniform Cost', width/2, height/2 + 110);
      cursor(HAND);
      if (mouseIsPressed) return 4;
      return 0;
    } else if (this.mouseInArea(width/2 - 50, height/2 + 130, 100, 40)) {
      this.hoverEffect(width/2 - 50, height/2 + 130, 100, 40);
      text('A*', width/2, height/2 + 160);
      cursor(HAND);
      if (mouseIsPressed) return 5;
      return 0;
    } else {
      return 0;
    }
  }
}
