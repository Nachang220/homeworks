class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.timerId = null;
  }
  addClock(time, callback, id) {
    if (!id) {
      throw new Error("Невозможно идентифицировать будильник. Параметр id не передан");
    }
    if (typeof this.alarmCollection.find(item => item.id === id) !== "undefined") {
      console.error("Будильник с таким id уже существует");
      return;
    }
    this.alarmCollection.push({ id, time, callback });
  }
  removeClock(id) {
    let index = this.alarmCollection.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }
    this.alarmCollection.splice(index, 1);
    return true;
  }
  getCurrentFormattedTime() {
    let date = new Date(Date.now());
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  }
  start() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        this.alarmCollection.forEach(alarm => {
          this.checkClock(alarm);
        });
      }, 1000);
    }
  }
  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
  checkClock(alarm) {
    if (alarm.time === this.getCurrentFormattedTime()) {
      alarm.callback();
    }
  }
  printAlarms() {
    console.log(`Печать всех будильников в количестве: ${this.alarmCollection.length}`);
    this.alarmCollection.forEach(alarm => {
      console.log(`Будильник №${alarm.id} заведён на  ${alarm.time}`);
    });
  }
  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}

function testCase() {
  let alarmClock = new AlarmClock();
  alarmClock.addClock("09:00", () => console.log("Пopa вставать"), 1);
  alarmClock.addClock(
    "09:01",
    () => {
      console.log("Дaвaй, вставай уже!");
      alarmClock.removeClock(2);
    },
    2
  );
  // alarmClock.addClock("09:01", () => console.log("Иди умываться!"));
  alarmClock.addClock(
    "09:02",
    () => {
      console.log("Вставай, а то проспишь!");
      alarmClock.clearAlarms();
      alarmClock.printAlarms();
    },
    3
  );
  alarmClock.addClock("09:05", () => console.log("Вставай, а то проспишь!"), 1);
  alarmClock.printAlarms();
  alarmClock.start();
}

testCase();
