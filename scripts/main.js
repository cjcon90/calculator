const buttons = document.querySelectorAll(".btn");

//set grid areas for buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].style.gridArea = `${buttons[i].id}`;
}

const calculator = new Vue({
  el: "#calc",
  data: {
    currentValue: "",
    oldValue: null,
    logResult: [],
    logSum: [],
    operator: null,
  },
  methods: {
    addValue(e) {
      // Prevent multiple zeroes from start
      if (!this.currentValue && e === 0) return;
      // Start a new equation if no operator has been selected
      if (!this.currentValue && !this.operator) this.oldValue = null;
      //add values to current number up to a certain length
      if (this.currentValue.length < 14) this.currentValue = this.currentValue + e;
    },
    operate(e) {
      //prevent operators when nothing entered
      if (!this.currentValue && !this.oldValue) console.log("woo");
      //store first numebr for equation and select operator
      else if (this.currentValue && !this.oldValue) {
        this.oldValue = this.currentValue;
        this.currentValue = "";
        this.operator = e;
        //function for following an equal sign, when there's no current value
      } else if (this.oldValue && !this.currentValue) {
        this.operator = e;
        //normal functioning - complete previous equation and prepare operator for next equation
      } else {
        this.equals();
        this.operator = e;
      }
    },
    //method for completing equations and storing result and sum logs
    equals() {
      let sum = `${this.oldValue} ${this.operator} ${this.currentValue}`;
      let result = Math.round(eval(sum) * Math.pow(10, 4)) / Math.pow(10, 4);
      this.logResult.push(result);
      this.logSum.push(`${sum} = ${result}`);
      this.currentValue = "";
      this.oldValue = result;
      this.operator = "";
    },
    clear() {
      this.currentValue = "";
      this.oldValue = null;
      this.logResult = [];
      this.logSum = [];
      this.operator = null;
    },
    negative() {
      if (!this.currentValue && !this.oldValue) {
        return;
      } else if (!this.currentValue && this.oldValue) {
        this.logResult.push(this.oldValue * -1);
        this.logSum.push(`-/+ ${this.oldValue}`);
        this.oldValue *= -1;
      } else {
        this.currentValue *= -1;
      }
    },
    undo() {
      this.currentValue = "";
      this.logResult.pop();
      this.logSum.pop();
      this.oldValue = this.logResult[this.logResult.length - 1];
    },
    decimal() {
      if (!this.currentValue && !this.operator) this.oldValue = null;
      if (!this.currentValue.includes(".")) {
        this.currentValue = this.currentValue + ".";
      }
    },
  },
});
