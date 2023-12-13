class PriorityQueue{
    constructor(){
        this.arr = [];
    }

    push(item){
        if(this.isEmpty()){
            this.arr.push(item);
        }
        
        //O push está linear, tenho que trocar por uma heap depois
        for(let i = 0; i < this.arr.length(); i++){
            if(this.arr[i] < item){
                this.arr.splice(i, 0, item);
                break;
            }
        }
    }

    pop(){
        if(this.isEmpty()) return "Underflow"
        return this.arr.shift();
    }

    top(){
        if(this.isEmpty()) return "Empty"
        return this.arr[0];
    }

    isEmpty(){
        return this.arr.length == 0;
    }
}