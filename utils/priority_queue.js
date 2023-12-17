class PriorityQueue {
  constructor() {
    this.heap = [[0, 0]];
    this.last = 1;
  }

  push(val, node) {
    if (this.heap.length === this.last) {
      this.heap.push([0, 0]);
    }
    this.heap[this.last] = [val, node];
    this.last++;
    this.bottomUp(this.last - 1);
  }

  pop() {
    if (this.last > 1) {
      [this.heap[1], this.heap[this.last - 1]] = [
        this.heap[this.last - 1],
        this.heap[1],
      ];
      this.last--;
      this.topDown(1);
    } else {
      console.assert(false, "Não pode dar pop em uma Priority Queue vazia");
    }
  }

  top() {
    if (this.last > 1) {
      return this.heap[1];
    } else {
      console.assert(false, "Não pode ver o topo de uma Priority Queue vazia");
      return [-1, -1];
    }
  }

  isEmpty() {
    return this.last === 1;
  }

  topDown(index) {
    const left = 2 * index;
    const right = 2 * index + 1;

    if (
      left >= this.last ||
      (this.heap[index][0] <= this.heap[left][0] &&
        (right >= this.last || this.heap[index][0] <= this.heap[right][0]))
    ) {
      return;
    }

    if (right < this.last && this.heap[right][0] < this.heap[left][0]) {
      [this.heap[index], this.heap[right]] = [
        this.heap[right],
        this.heap[index],
      ];
      this.topDown(right);
    } else {
      [this.heap[index], this.heap[left]] = [this.heap[left], this.heap[index]];
      this.topDown(left);
    }
  }

  bottomUp(index) {
    if (index === 1) return;
    const pai = Math.floor(index / 2);
    if (this.heap[index][0] < this.heap[pai][0]) {
      [this.heap[index], this.heap[pai]] = [this.heap[pai], this.heap[index]];
      this.bottomUp(pai);
    }
  }
}
