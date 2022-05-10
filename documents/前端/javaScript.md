# javaScript标准库

## Array

**静态方法**

#### [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

```js
Array.from('foo');
// [ "f", "o", "o" ]
```

**序列生成器**

`range`

```js
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

// Generate numbers range 0..4
range(0, 4, 1);
// [0, 1, 2, 3, 4]
```

**数组去重合并**

```js
function combine(){
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组
    return Array.from(new Set(arr));
}

var m = [1, 2, 2], n = [2,3,3];
console.log(combine(m,n));         // [1, 2, 3]
```



#### [`Array.isArray()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

```js
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array('a', 'b', 'c', 'd'))
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype);

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray(new Uint8Array(32))
Array.isArray({ __proto__: Array.prototype });
```





#### [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

```js
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
```



**实例属性**

#### [`Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)



#### [`Array.prototype[@@unscopables\]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@unscopables)

#### [contcat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组

```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

```



#### [copyWithin()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度



#### [`entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

返回一个新的 `Array Iterator` 对象，该对象包含数组中每个索引的键/值对



#### [`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值

#### [`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素

#### [`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

#### [`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`

#### [`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

返回数组中满足提供的测试函数的第一个元素的**索引**。若没有找到对应元素则返回 `-1`

#### [`flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

#### [`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

使用映射函数映射每个元素，然后将结果压缩成一个新数组

#### [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

对数组的每个元素执行一次给定的函数

#### [`includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

判断一个数组是否包含一个指定的值，如果包含则返回 `true`，否则返回 `false`

#### [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 `-1`

#### [`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

将一个数组的所有元素连接成一个字符串并返回这个字符串

#### [`keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)

返回一个包含数组中每个索引键的 `Array Iterator` 对象



#### [`lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

返回指定元素在数组中的最后一个的索引，如果不存在则返回 `-1`





#### [`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

返回一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值



#### [`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

从数组中删除最后一个元素，并返回该元素的值

#### [`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

将一个或多个元素添加到数组的末尾，并返回该数组的新长度

#### [`reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

对数组中的每个元素执行一个由您提供的reducer函数（升序执行），将其结果汇总为单个返回值

#### [`reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)

接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值

#### [`reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组

#### [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

从数组中删除第一个元素，并返回该元素的值

#### [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

提取源数组的一部分并返回一个新数组



#### [`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

测试数组中是不是至少有一个元素通过了被提供的函数测试

#### [`sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

对数组元素进行原地排序并返回此数组

#### [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容



#### [`toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

返回一个字符串表示数组中的元素。数组中的元素将使用各自的

#### [`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

返回一个字符串表示指定的数组及其元素。数组中的元素将使用各自的

#### [`unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

将一个或多个元素添加到数组的头部，并返回该数组的新长度

#### [`values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

返回一个新的 `Array Iterator 对象`，该对象包含数组每个索引的值









## Object



## 八股文

### 什么是作用域链

当访问一个变量时，解释器会首先在当前作用域中查找标识符，如果没找到，就去副作用找，直到找到该变量的标识符或没找到。这条寻找的链路就叫作用域链。

### 闭包

在Javascript中，根据词法作用域的规则，内部函数总是可访问其外部函数当中声明的变量；当调用通过外部函数返回的内部返回的内部函数时，即使此时外部函数已经执行结束，但是内部函数所引用外部函数的变量依然保存在内存中，吧这些变量的集合称为闭包。

```js
function foo {
	var a = 2;
	
	function bar() {
		console.log(a)
	}
}

var baz = foo();
baz(); // 2 - 闭包
```

闭包的好处

- 保护函数的私有变量不受外部干扰。形成不销毁的栈内存
- 把一些函数内的值保存下来。闭包可以实现方法和属性的私有化。

闭包变量如何回收

- 如果是全局变量被作为闭包变量的话，则该闭包变量会一直保存到页面关闭。（因为全局上下文会一直存在，不会被回收，除非页面关闭）
- 如果是局部变量被作为闭包变量的话。

```js
function a() {
    var b = 10;
    return function() {
        b++;
        console.log(b);
    }
}

a()() // 11
a()() // 11
// 这段代码中,当函数执行时，返回的匿名函数汇总存在对a函数中定义变量的引用，但随即匿名函数就被执行，b++.执行结束,所以函数a的上下文被回收,b的变量也随着回收，当第二次执行就会重新声明变量b，所以两次输出都是11。

function g() {
    var b = 0;
    return function() {
        b++;
        console.log(b);
    }
}

var d = g();
d() // 1
d() // 2
d() // 3
```



Symbol



BigInt
