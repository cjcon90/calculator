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
    operator: null,
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
        this.operator = e;
      } else if (this.oldValue && !this.currentValue) {
        this.operator = e;
      } else {
        this.calc();
        this.operator = e;
      }
    },
    equals() {
      this.calc();
    },
    calc() {
      let sum = `${this.oldValue} ${this.operator} ${this.currentValue}`;
      let result = eval(sum);
      this.logResult.push(result);
      this.logSum.push(`${sum} = ${result}`);
      this.currentValue = "";
      this.oldValue = result;
    },
    clear() {
      this.currentValue = "";
      this.oldValue = null;
      this.logResult = [];
      this.logSum = [];
      this.operator = null;
    },
  },
});
