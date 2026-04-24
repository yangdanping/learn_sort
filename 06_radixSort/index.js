/**
 * 7.基数排序（LSD）：从最低位到最高位，按每一位做「稳定计数排序」，多轮桶式归位，整体有序。
 * * 记忆口令：
 * * 负数先平移到非负
 * * 位权从低到高扫
 * * 十个桶里计个数
 * * 稳定回填再下一轮
 */
export const radixSort = (arr) => {
  const len = arr.length;
  // 🌟递归/边界：空或单元素无需排序
  if (len <= 1) return arr;

  // 1. 负数先平移到非负（否则按位取桶无意义）
  const minVal = Math.min(...arr);
  const offset = minVal < 0 ? -minVal : 0;
  if (offset > 0) {
    for (let i = 0; i < len; i++) arr[i] += offset;
  }
  const maxVal = Math.max(...arr);

  // 2. 位权从低到高扫：exp = 1, 10, 100, … 直到最高位处理完
  let exp = 1;
  // ==================== 每一轮：对当前位做一次稳定计数排序 =======================
  while (true) {
    // 3. 十个桶里计个数（0～9 各位数字出现次数）
    const count = Array(10).fill(0);
    for (let i = 0; i < len; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }
    // 前缀和：得到每个 digit 在 output 中的「右边界」下标（从 1 开始计数）
    for (let d = 1; d < 10; d++) {
      count[d] += count[d - 1];
    }
    // 4. 稳定回填：从后往前扫，保证同位相等时相对顺序不变
    const output = new Array(len);
    for (let i = len - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]--;
      output[count[digit]] = arr[i];
    }
    for (let i = 0; i < len; i++) {
      arr[i] = output[i];
    }
    // =============================================================
    // 当前位权下已无更高位需要处理则结束
    if (Math.floor(maxVal / exp) === 0) break;
    exp *= 10;
  }

  // 5. 若做过平移，还原为原始数值
  if (offset > 0) {
    for (let i = 0; i < len; i++) arr[i] -= offset;
  }

  return arr;
};

/**
 * 基数排序（LSD，十进制）效率：
 * * 🌟时间复杂度 => O(d × (n + r)) => d 为位数（与 max 数量级相关），r 为基数（此处 10），每轮稳定计数线性
 * * 空间复杂度 => O(n + r) => 每轮需要与 n 等长的 output 与桶计数数组
 * * 稳定性 => 稳定 => 每轮使用从后往前的稳定回填，相同关键字相对顺序得以保留
 */
