import { isSorted } from './isSorted.js';

/**
 * 用小规模随机数组做一次快速验证：打印原数组、排序结果，并调用 isSorted 检查单调性。
 * 传入副本给 sortFn，避免原地排序破坏「原数组」打印语义；以 sortFn 返回值为准（兼容返回新数组的归并等实现）。
 *
 * @param {(arr: number[]) => number[]} sortFn
 * @param {{ length?: number, min?: number, max?: number }} [options]
 */
export function verifySort(sortFn, options = {}) {
  const { length = 5, min = 0, max = 100 } = options;
  const nums = Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  const copy = [...nums];
  const res = sortFn(copy);
  const sorted = Array.isArray(res) ? res : copy;
  console.log(nums);
  console.log(sorted);
  isSorted(sorted);
}
