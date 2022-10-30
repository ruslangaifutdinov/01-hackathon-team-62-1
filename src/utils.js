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

export async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data; 
  } catch(error) {
    console.log(error);
  }
}

export function createCustomSelect() {
  const select = document.createElement('div');
  select.className = 'select';

  const innerContent = `
    <div class="select__header">
      <span class="select__current" data-rate-name="RUB">Рубли (RUB)</span>
      <div class="select__icon">&dollar;</div>
    </div>
    <div class="select__body">
      <div class="select__item" data-rate-name="RUB">Рубли (RUB)</div>
      <div class="select__item" data-rate-name="KZT">Казахстанский Тенге (KZT)</div>
      <div class="select__item" data-rate-name="EUR">Евро (EUR)</div>
      <div class="select__item" data-rate-name="TRY">Турецкая Лира (TRY)</div>
      <div class="select__item" data-rate-name="CNY">Китайский Юань (CNY)</div>
      <div class="select__item" data-rate-name="JPY">Японская Йена (JPY)</div>
      <div class="select__item" data-rate-name="GBP">Фунт Стерлингов (GBP)</div>
    </div>
  `;

  select.innerHTML = innerContent;

  return select;
}