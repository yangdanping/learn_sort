/**
 * 4.归并排序：利用分治思想，先将数组递归拆分为单一元素，再通过双指针有序地合并子数组。
 * * 记忆口令：
 * - 中间切一刀，左右递归调
 * - 定义双指针，比较入新包
 * - 谁小谁先走，剩货全带跑
 */
export const mergeSort = (arr) => {
  //1.分解（divnde）：对数组进行分解（分解成两个小数组）
  // 1.1.切割数组,先从中间切一刀(其中包含一行归并中递归分割的返回逻辑)
  const len = arr.length;
  if (len <= 1) return arr; // 递归结束判断
  const mid = Math.floor(len / 2); // 拿中间位置的索引
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid); // 直接从 mid 位置开始切到最后
  // 1.2.递归的切割 leftArr 和 rightArr
  const newLeftArr = mergeSort(leftArr); // 最终拿到的肯定只有一个元素[x]
  const newRightArr = mergeSort(rightArr); // 最终拿到的肯定只有一个元素[x]
  //2.合并（merge）：将两个子数组进行合并
  // 2.1 定义双指针
  const newArr = [];
  let i = 0;
  let j = 0;
  while (i < newLeftArr.length && j < newRightArr.length) {
    // 若降序：如果左边大于或等于右边，则优先推入左边的元素
    if (newLeftArr[i] <= newRightArr[j]) {
      newArr.push(newLeftArr[i]);
      i++;
    } else {
      newArr.push(newRightArr[j]);
      j++;
    }
  }
  // 2.2 分别判断 while 循环完后左右数组是否还有剩余元素,有的话直接展开运算符添加进去
  if (i < newLeftArr.length) newArr.push(...newLeftArr.slice(i));
  if (j < newRightArr.length) newArr.push(...newRightArr.slice(j));
  return newArr; // 一般情况归并都是返回一个新数组
};

/**
 * 归并排序计算效率：
 * * 🌟最好/平均/最坏时间复杂度 -> O(nlogn) -> 无论数组是否有序，都要递归拆分并合并
 * * 空间复杂度 -> O(n) -> 合并过程中需要创建额外的临时数组
 * * 稳定性 -> 稳定 -> 相同元素在比较时，左侧元素优先入队，保持相对顺序不变
 */
