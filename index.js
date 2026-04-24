import { verifySort } from "./utils/verifySort.js";
import { runMeasureSortInterval } from "./utils/measureSortInterval.js";

// 在 Node.js 的 ES 模块模式下，import 路径必须包含 .js 扩展名，不能省略。
// import { bubbleSort as sort } from './01_bubbleSort/index.js';
// import { selectionSort as sort } from './02_selectionSort/index.js';
// import { insertionSort as sort } from "./03_insertionSort/index.js";
// import { mergeSort as sort } from './04_mergeSort/index.js';
import { quickSort as sort } from "./05_quickSort/index.js";
// import { quickSort as sort } from './05_quickSort/index2.js';
// import { radixSort as sort } from './06_radixSort/index.js';

verifySort(sort, { length: 10 });

// times=1 等价单次 measureSort；times>1 为串行多轮，轮间固定短间隔见 measureSortInterval.js 内说明
runMeasureSortInterval(sort, 100, 100000);
