/**
 * 5.快速排序：利用分治思想，选取基准值，通过双指针原地交换将数组划分为左右两块，再递归排序。
 * * 记忆口令：
 * * 尾部基准立标杆
 * * 双指相向把数探
 * * 左大右小就互换
 * * 基准归位切两半
 */
export const quickSort = (arr) => {
  const len = arr.length;
  partition(0, len - 1); // partition 是function 函数声明,在当前函数作用域里会被提升到作用域顶部，执行到 partition(0, len - 1) 时，标识符已经绑定好了
  function partition(left, right) {
    // 🌟递归结束条件：当left >= right时,说明区间内最多只有1个元素，划分完成
    if (left >= right) return;
    // 1. 尾部基准立标杆
    const pivot = arr[right];
    // 2. 双指针初始化（左边都是比pivot小的数字，：右边都是比pivot大的数字)
    let i = left;
    let j = right - 1;

    // ==================== 一次交换的完整逻辑 =======================
    // 3. 双指相向把数探
    while (i <= j) {
      while (arr[i] < pivot) i++; // i指针从左向右，寻找比pivot大的元素
      while (arr[j] > pivot) j--; // j指针从右向左，寻找比pivot小的元素
      // 4. 左大右小就互换(我们已经找到了 比pivot大的元素i 和 比pivot小的i的元素 )
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        // 交换完成第一步,i 一定 ++,j 一定 --
        i++;
        j--;
      }
    }
    // =============================================================
    // 5. 基准归位切两半(此时i所在位置刚好是左边都比pivot小、右边都比pivot大的交界点)
    // 将 pivot 放在正确的位置(此时 i 是基准,所以下一步继续划分的右侧区域时直接从 i+1开始)
    [arr[i], arr[right]] = [arr[right], arr[i]];
    // 左右侧继续递归调用 partition 划分区域
    partition(left, j); // 左侧区域划分
    partition(i + 1, right); // 右侧区域划分
  }

  return arr;
};

/**
 * 快速排序计算效率：
 * * 🌟最好/平均时间复杂度 => O(nlogn) => 每次基准值都能将区间大致等分，递归树深度为 logn
 * * 🌟最坏时间复杂度 => O(n^2) => 当数组极度不平衡（已有序或逆序）时，单侧树退化为单链表
 * * 空间复杂度 => O(logn) 至 O(n) => 原地排序无需新建大量数组，开销主要来自递归调用栈
 * * 稳定性 => 不稳定 => 双指针跨越区间强行交换元素时，会打乱相同大小元素的原始相对位置
 */
