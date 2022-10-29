export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function  getRandomColor() {
  let color = '#'; 
  let symbols = '0123456789ABCDEF';
  let randomIndex;
  for (let i = 0; i < 6; i++) {
      randomIndex = random(0, symbols.length - 1);
      color += symbols[randomIndex];
  }
  return color;
}