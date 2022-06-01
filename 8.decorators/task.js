function cachingDecoratorNew(func) {
  const cache = {};
  let count = 0;

  return (...args) => {
    const hash = args.join(",");
    let result = cache[hash];

    if (result === undefined) {
      result = cache[hash] = func(...args);
      return "Вычисляем: " + result;
    }
    if (count >= 5) {
      delete cache[Object.keys(cache)[0]];
    }
    count++;
    return "Из кэша: " + result;
  };
}

function debounceDecoratorNew(func, ms) {
  let timerId;
  let flag = false;
  return function (...args) {
    if (!flag) {
      func.apply(this, args);
      flag = true;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, ms);
    }
  };
}

function debounceDecorator2(func, ms) {
  let timerId;
  let flag = false;
  function wrapper(...args) {
    if (!flag) {
      func.apply(this, args);
      wrapper.count++;
      flag = true;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
        wrapper.count++;
      }, ms);
    }
  }
  wrapper.count = 0;
  return wrapper;
}

const sendSignal = () => console.log("Сигнал отправлен");
const upgradedSendSignal = debounceDecorator2(sendSignal, 2000);
setTimeout(upgradedSendSignal); // Сигнал отправлен
setTimeout(upgradedSendSignal, 300); // проигнорировано так как от последнего вызова прошло менее 2000мс
setTimeout(upgradedSendSignal, 900); // проигнорировано аналогично
setTimeout(upgradedSendSignal, 1200); // проигнорировано аналогично
setTimeout(upgradedSendSignal, 2300); // проигнорировано аналогично
setTimeout(upgradedSendSignal, 4400); // Сигнал отправлен
setTimeout(upgradedSendSignal, 4500); // проигнорировано аналогично
