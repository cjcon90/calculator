const buttons = document.querySelectorAll("[id]");

//set grid areas for buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].style.gridArea = `${buttons[i].id}`;
  buttons[i].addEventListener("click", (event) => {
    const { target } = event;
    console.log(target);
  });
}
