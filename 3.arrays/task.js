function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  if (
    arr1.every((item, index) => {
      return item === arr2[index];
    })
  ) {
    return true;
  }
  return false;
}

function advancedFilter(arr) {
  let resultArr;
  resultArr = arr.filter(item => {
    return item > 0 && item % 3 === 0;
  });
  return resultArr.map(item => item * 10);
}
