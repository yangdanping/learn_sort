import { verifySort } from "./utils/verifySort.js";
export const sort = (arr) => {
  const len = arr.length;
  partition(0, len - 1);

  function partition(left, right) {
    if (left >= right) return;

    const pivot = arr[right];
    let i = left,
      j = right - 1;

    while (i <= j) {
      while (arr[i] < pivot) i++;
      while (arr[j] > pivot) j--;

      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    partition(left, j);
    partition(i + 1, right);
  }

  return arr;
};

// =============== 快速验证 =================
verifySort(sort);
const nums = Array.from(
  { length: 5 },
  () => Math.floor(Math.random() * (100 - 0 + 1)) + 0,
);

// 原生 sort
console.log("nums", nums);
console.log(
  "sorted nums method 1",
  nums.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }),
);

console.log(
  "sorted nums method 2",
  nums.sort((a, b) => a - b),
);
