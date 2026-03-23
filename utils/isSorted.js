/**
 * 假设数组已按某种单调序排好：判断整体是否为「完全升序」(非递减) 或「完全降序」(非递增)。
 * 允许相邻相等，如 [1,2,2,2,3]；一旦出现先增后减或先减后增则视为顺序错误。
 *
 * 全相等 / 空数组 / 单元素：同时满足两种单调性，约定返回「完全升序」。
 */
export const isSorted = (arr) => {
  if (arr.length === 0) return false;
  const nonDecreasing = arr.every((val, i) => i === 0 || val >= arr[i - 1]);
  const nonIncreasing = arr.every((val, i) => i === 0 || val <= arr[i - 1]);

  if (nonDecreasing) console.log('升序', true);
  else if (nonIncreasing) console.log('降序', true);
  else console.log('不正确', false);
};
