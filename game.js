class Game {
    constructor() {
        this.ans = null;
        this.curr_guess = null;
        this.prev_guess = [];
    }

    start() {
        this.ans = [];
        for (let i = 0; i < 10; i++)
            for (let j = 0; j < 10; j++)
                for (let k = 0; k < 10; k++)
                    for (let l = 0; l < 10; l++)
                        if (i != j && i != k && i != l &&
                            j != k && j != l && k != l) {
                                this.ans.push(`${i}${j}${k}${l}`);
                            }
    }
    
    guess() {
        let len = this.ans.length;
        let num = null;
        if (len == 0) return "No Answer!";

        for (let is_fetch = false; is_fetch == false;) {
            num = Math.floor(Math.random()*len);
            is_fetch = true;
            this.prev_guess.forEach((prev_num) => {
                if (prev_num == this.ans[num]) is_fetch = false;
            });
        }
        this.curr_guess = this.ans[num];
        return this.curr_guess;
    }

    cmp(num1, num2) {
        let cows = 0;
        let bulls = 0;
        for (let i in num1)
            for (let j in num2) {
                if (i == j && num1[i] == num2[j])
                    bulls += 1;
                if (i != j && num1[i] == num2[j])
                    cows += 1;
            }
        return [bulls, cows];
    }
    
    cal(bulls, cows) {
        let off = 0;
        let result = null;
        while (off < this.ans.length) {
            result = this.cmp(this.curr_guess, this.ans[off]);
            if (!(result[0] == bulls && result[1] == cows)) {
                this.ans.splice(off, 1);
            }
            else {
                off += 1;
            }
        }
    }
}

let game = null;

const start = () => {
    game = new Game()
    game.start();
    
    let robotblock = document.querySelector("#robotblock");
    let div = document.createElement('div');
    robotblock.innerHTML = "";
    div.setAttribute('class', 'text');

    div.innerHTML = game.guess();
    robotblock.appendChild(div);
}

const check = () => {
    if (!game) return;
    
    let str = document.querySelector("#inputText").value;
    let robotblock = document.querySelector("#robotblock");
    let div = document.createElement('div');
    div.setAttribute('class', 'text');

    if (str[1] != 'A' || str[3] != 'B' || str.length != 4) {
        div.innerHTML = "No correct input!";
        robotblock.appendChild(div);
    }
    
    let bulls = parseInt(str[0]);
    let cows = parseInt(str[2]);
    
    if (Number.isNaN(bulls) || Number.isNaN(cows)) {
        div.innerHTML = "No correct input!";
        robotblock.appendChild(div);
    }

    game.cal(bulls, cows);
    div.innerHTML = game.guess();
    robotblock.appendChild(div);
}