const buttons = document.querySelectorAll("[id]");

//set grid areas for buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].style.gridArea = `${buttons[i].id}`;
  buttons[i].addEventListener("click", (event) => {
    const { target } = event;
    console.log(target);
  });
}

const calculator = new Vue({
  el: "#calc",
  data: {
    currentValue: "",
    oldValue: null,
    logResult: [],
    logSum: [],
    firstOp: null,
    secondOp: null,
  },
  methods: {
    addValue(e) {
      if (!this.currentValue && e === 0) return;
      this.currentValue = this.currentValue + e;
    },
    operate(e) {
      if (!this.currentValue && !this.oldValue) return;
      else if (this.currentValue && !this.oldValue) {
        this.oldValue = this.currentValue;
        this.currentValue = "";
        this.firstOp = e;
      } else {
        this.calc();
        this.oldValue = this.logResult[this.logResult.length - 1];
        this.firstOp = e;
      }
    },
    equals() {},
    calc() {
      let sum = `${this.oldValue} ${this.firstOp} ${this.currentValue}`;
      let result = eval(sum);
      this.logResult.push(result);
      this.logSum.push(`${sum} = ${result}`);
      this.currentValue = "";
      this.oldValue = result;
    },
    clear() {
      this.currentValue = "";
      this.oldValue = null;
      this.log = [];
      this.firstOp = null;
      this.secondOp = null;
    },
  },
});
