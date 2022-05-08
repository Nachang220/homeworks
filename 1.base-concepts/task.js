"use strict";
function solveEquation(a, b, c) {
  let arr = [];
  let d = b ** 2 - 4 * a * c;
  if (d === 0) {
    arr.push(-b / (2 * a));
  } else if (d > 0) {
    arr.push((-b + Math.sqrt(d)) / (2 * a));
    arr.push((-b - Math.sqrt(d)) / (2 * a));
  }
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, date) {
  if (!+percent) {
    return `Параметр "Процентная ставка" содержит неправильное значение "${percent}"`;
  }
  if (!+amount) {
    return `Параметр "Общая стоимость" содержит неправильное значение "${amount}"`;
  }
  if (!+contribution && contribution != 0) {
    return `Параметр "Начальный взнос" содержит неправильное значение "${contribution}"`;
  }
  let dateNow = new Date(Date.now());
  let n = date.getMonth() - dateNow.getMonth() + 12 * (date.getFullYear() - dateNow.getFullYear());
  let P = percent / 100 / 12;
  let S = amount - contribution;
  let totalAmount = +(S * (P + P / ((1 + P) ** n - 1)) * n).toFixed(2);
  console.log(totalAmount);
  return totalAmount;
}
