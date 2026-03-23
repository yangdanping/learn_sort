/**
 * 2. 选择排序 (Selection Sort)
 * * 计算效率：
 * - 最好/平均/最坏时间复杂度 -> O(n²) -> 无论是否有序都要遍历找最小
 * - 空间复杂度 -> O(1) -> 原地排序，不需要额外空间
 * - 稳定性 -> 不稳定 -> 交换可能破坏相同元素的相对位置
 * * 🌟精简记忆版：
 * - 外 len - 1
 * - 先定 i 为最小
 * - j 从 i + 1 到底
 * - 找到最小再交换
 */
export const selectionSort = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let targetIndex = i; // 假定当前索引 i 是剩余部分中最小/最大元素的索引

    for (let j = i + 1; j < len; j++) {
      // 升序用 < (找最小)；降序用 > (找最大)
      if (arr[j] < arr[targetIndex]) {
        targetIndex = j;
      }
    }

    // targetIndex更新了，才执行交换
    if (targetIndex !== i) {
      [arr[i], arr[targetIndex]] = [arr[targetIndex], arr[i]];
    }
  }

  return arr;
};
