/**
 * Hoare 分区 + 随机基准（对照 index.js 版本 1）
 *
 * 与版本 1 的主要不同：
 * - 分区方案：Hoare（双指针从左右两端向中间扫）vs Lomuto（尾部作基准、相向扫描后把基准换到分界处）。
 * - 基准选取：随机下标取 pivot，降低有序/逆序输入下最坏 O(n²) 的概率；版本 1 固定用区间末尾 arr[right]。
 * - 结构：递归壳子单独写成 quick()，partition() 只负责一趟划分并返回交叉点下标 i；版本 1 的 partition 里既划分又递归。
 * - 递归区间：一趟划分后左段 [left, index-1]、右段 [index, right]（Hoare 返回的 i 是分界，基准未必落在最终“归位”格）；
 *   版本 1 是先把 pivot 换到中间再递归 [left, j] 与 [i+1, right]。
 *
 * * 记忆口令：
 * * 随机抽点定标杆
 * * 双指贴边往里探
 * * 左大右小就互换
 * * 返回下标切两段
 */
export const quickSort = (arr) => {
  const len = arr.length;
  quick(0, len - 1);
  function quick(left, right) {
    if (left >= right) return;
    const index = partition(left, right);
    if (left < index - 1) quick(left, index - 1);
    if (index < right) quick(index, right);
  }
  function partition(left, right) {
    const rand = Math.floor(Math.random() * (right - left + 1)) + left;
    // console.log('right', right, 'left', left, 'rand', rand);
    const pivot = arr[rand];
    let i = left;
    let j = right;
    while (i <= j) {
      while (arr[i] < pivot) i++;
      while (arr[j] > pivot) j--;
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }
    return i;
  }
  return arr;
};
