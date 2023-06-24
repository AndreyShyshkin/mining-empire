function player(){  
const moveRange = 25;
window.scrollTo(0, 0);

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 68) {
    // Дії при натисканні клавіші "D" (код 68)

event.preventDefault();
movePlayer("left", moveRange);
window.scrollBy(moveRange, 0);

  } else if (event.keyCode === 65) {
    // Дії при натисканні клавіші "A" (код 65)

    event.preventDefault();
    movePlayer("left", -moveRange);
    window.scrollBy(-moveRange, 0);

  } else if (event.keyCode === 32 || event.keyCode === 87) {
    // Дії при натисканні клавіші "Пробіл" (код 32) або "W" (код 87)

    event.preventDefault();
    movePlayer("top", -moveRange);
    window.scrollBy(0, -moveRange);

  } else if (event.keyCode === 17 || event.keyCode === 83) {
    // Дії при натисканні клавіші "Ctrl" або "S" (код 83)

    event.preventDefault();
    movePlayer("top", moveRange);
    window.scrollBy(0, moveRange);

  }
});
}

function movePlayer(property, value) {
  let player = document.getElementById("player");
  if (player) {
    let current = parseInt(player.style[property]) || 0;
    let newPosition = current + value;
    player.style[property] = newPosition + "px";
  }
}

export default player;
