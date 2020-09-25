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
    oldValue: [],
    log: [],
    firstOp: null,
    secondOp: null,
  },
  methods: {
    addValue(e) {
      if (!this.currentValue && e === 0) return;
      this.currentValue = this.currentValue + e;
    },
    operate(e) {
      if (!this.currentValue) return;
      this.oldValue.push(+this.currentValue);
      this.currentValue = "";
      if (!this.firstOp) {
        this.firstOp = e;
      } else {
        this.secondOp = this.firstOp;
        this.firstOp = e;
        let sum = `${this.oldValue[this.oldValue.length - 2]} ${
          this.secondOp
        } ${this.oldValue[this.oldValue.length - 1]}`;
        this.oldValue.push(eval(sum));
        this.log.push(`${sum} = ${eval(sum)}`);
      }
    },
    equals() {},
    clear() {
      this.currentValue = "";
      this.oldValue = [];
      this.log = [];
      this.firstOp = null;
      this.secondOp = null;
    },
  },
});
