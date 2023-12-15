class PriorityQueue{
    constructor(){
      this.heap = [0];
      this.last = 1; 
    }
  
    push(val){
      if(this.heap.length === this.last){
        this.heap.push(0);
      }
      this.heap[this.last] = val;
      this.last++;
      this.bottomUp(this.last - 1);
    }
  
    pop(){
      if(this.last > 1){
        [this.heap[1], this.heap[this.last - 1]] = [this.heap[this.last - 1], this.heap[1]];
        this.last--;
        this.topDown(1);
      }else{
        console.assert(false, "Não pode dar pop em Priority Queue vazia");
      }
    }
  
    top(){
      if(this.last > 1){
        return this.heap[1];
      }else{
        console.assert(false, "Não pode ver o topo de uma Priority Queue vazia");
        return -1;
      }
    }
  
    topDown(index){
      const left = 2 * index;
      const right = 2 * index + 1;
  
      if(left >= this.last || (this.heap[index] <= this.heap[left] && (right >= this.last || this.heap[index] <= this.heap[right]))){
        return;
      } 
  
      if(right < this.last && this.heap[right] < this.heap[left]){
        [this.heap[index], this.heap[right]] = [this.heap[right], this.heap[index]];
        this.topDown(right);
      }else{
        [this.heap[index], this.heap[left]] = [this.heap[left], this.heap[index]];
        this.topDown(left);
      }
    }
  
    bottomUp(index){
      if(index === 1) return;
      if(this.heap[index] < this.heap[Math.floor(index / 2)]){
        [this.heap[index], this.heap[Math.floor(index / 2)]] = [this.heap[Math.floor(index / 2)], this.heap[index]];
        this.bottomUp(Math.floor(index / 2));
      }
    }
  }
  