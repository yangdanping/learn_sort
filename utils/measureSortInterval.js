/**
 * 按固定间隔多次执行与 hy-algokit `measureSort` 相同的排序测时（随机数组 + performance.now），
 * 每轮测时完成后才等待间隔再执行下一轮，避免单次排序耗时大于间隔时出现并发重叠。
 * 全部完成后输出最快、最慢、平均耗时（毫秒）。
 *
 * @param {(arr: number[]) => number[]} sortFn 排序函数
 * @param {number} times 执行次数
 * @param {number} [n=100000] 每次排序的元素个数，与 measureSort 默认一致
 * @returns {{ cancel: () => void } | undefined} times > 1 时返回可取消未执行轮次的句柄；times === 1 时为 undefined
 */
export function runMeasureSortInterval(sortFn, times, n = 100000) {
  // 轮间停顿（固定 4ms）：串行模式下只在「上一轮 sort 已结束」之后等待，与单次排序耗时无关；
  // 4ms 接近多数 JS 运行环境下 setTimeout 的常见最小粒度，总耗时增加可忽略，仍能略给事件循环让路。
  const BENCHMARK_GAP_MS = 4;

  const durations = [];

  const tick = () => {
    const arr = Array.from({ length: n }, () => Math.floor(Math.random() * n));
    const start = performance.now();
    sortFn(arr);
    const end = performance.now();
    const elapsed = end - start;
    durations.push(elapsed);

    const timeElapsed = elapsed.toFixed(2);
    console.log(`使用 ${sortFn.name} 算法 排序 ${n} 个元素 消耗时间为 ${timeElapsed} 毫秒.`);
  };

  const printSummary = () => {
    const sum = durations.reduce((a, b) => a + b, 0);
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    const avg = sum / durations.length;
    const intervalNote = times > 1 ? `轮间间隔 ${BENCHMARK_GAP_MS} ms` : '单次测时';
    console.log(`${times} 次测时完成（${intervalNote}）— 最快 ${min.toFixed(2)} ms，最慢 ${max.toFixed(2)} ms，平均 ${avg.toFixed(2)} ms`);
  };

  if (times === 1) {
    tick();
    printSummary();
    return undefined;
  }

  let timeoutId = null;
  let cancelled = false;
  let fired = 0;

  const step = () => {
    if (cancelled) return;
    tick();
    fired += 1;
    if (fired >= times) {
      printSummary();
      return;
    }
    timeoutId = setTimeout(step, BENCHMARK_GAP_MS);
  };

  step();

  return {
    cancel() {
      cancelled = true;
      if (timeoutId != null) clearTimeout(timeoutId);
    },
  };
}
