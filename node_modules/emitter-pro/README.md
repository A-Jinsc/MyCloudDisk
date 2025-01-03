# emitter-pro

[![npm][npm]][npm-url] [![codecov](https://codecov.io/gh/caijf/emitter-pro/graph/badge.svg?token=PC2MBY6NQL)](https://codecov.io/gh/caijf/emitter-pro) ![GitHub](https://img.shields.io/github/license/caijf/emitter-pro.svg)

一个简单的 Javascript 事件管理，支持浏览器端和 node 端。

## 使用

### 安装

```shell
npm install emitter-pro
```

```shell
yarn add emitter-pro
```

```shell
pnpm add emitter-pro
```

### 示例

```typescript
import Emitter from 'emitter-pro';

const emitter = new Emitter();

// 注册监听方法
emitter.on('foo', () => console.log('bar'));
emitter.on('foo', () => console.log('baz'));
emitter.on('foo', () => console.log(42));

// 触发方法
emitter.emit('foo');

// 取消监听
emitter.off('foo');
```

## 实例方法

### on(eventName: string|symbol, listener: F, context?: object | null)

注册监听方法。允许多次添加同一引用的函数。

返回当前实例。

```typescript
const emitter = new Emitter();

// 注册监听方法
emitter.on('foo', () => console.log('bar'));
emitter.on('foo', () => console.log(42));

emitter.emit('foo');
// bar
// 42
```

### emit(eventName: string|symbol, ...args: Parameters<F>)

触发监听方法。

返回当前实例。

```typescript
const emitter = new Emitter();

emitter.on('foo', () => console.log('bar'));
emitter.on('foo', () => console.log(42));

emitter.emit('foo');
// bar
// 42

// 支持传入参数
emitter.on('test' (a, b) => console.log(a + b));
emitter.on('test' (a, b) => console.log(a * b));

emitter.emit('test', 2, 5);
// 7
// 10

emitter.emit('test', 5, 5);
// 10
// 25
```

### off(eventName: string|symbol, listener?: F)

取消监听方法。如果不传第二个参数，将取消该事件名称的全部监听方法。如果多次添加同一引用的函数，需要多次删除。

返回当前实例。

```typescript
const emitter = new Emitter();

const fn = () => console.log('bar');

emitter.on('foo', fn);
emitter.on('foo', () => console.log('baz'));
emitter.on('foo', () => console.log(42));

emitter.emit('foo');
// bar
// baz
// 42

emitter.off('foo', fn); // 取消 foo 的监听方法 fn
emitter.emit('foo');
// bar
// 42

emitter.off('foo'); // 取消 foo 的全部监听方法
emitter.emit('foo'); // 什么都没发生
```

### once(eventName: string|symbol, listener: F, context?: object | null)

仅触发一次的监听方法。使用方法同 `on` 。

返回当前实例。

```typescript
const emitter = new Emitter();

// 注册监听方法
emitter.on('foo', () => console.log('bar'));
emitter.once('foo', () => console.log(42));

emitter.emit('foo');
// bar
// 42

emitter.emit('foo');
// bar
```

### offAll()

取消全部事件名称的监听方法。

返回当前实例。

```typescript
const emitter = new Emitter();

const fn = () => console.log('bar');
emitter.on('test', fn);
emitter.on('test', () => console.log('baz'));
emitter.on('test', () => console.log(42));

emitter.on('other', fn);
emitter.on('other', () => console.log('baz'));

emitter.offAll(); // 取消全部监听方法

emitter.emit('test'); // 什么都没发生
emitter.emit('other'); // 什么都没发生
```

### eventNames()

获取全部事件名称。

返回事件名称数组。

```typescript
const emitter = new Emitter();

const fn = () => console.log('bar');
emitter.on('test', fn);
emitter.on('other', fn);

console.log(emitter.eventNames()); // ["test", "other"]
```

### listeners(eventName: string|symbol)

获取事件名称的全部监听方法（如通过 `once` 方法注册，返回的是包装方法）。

返回事监听方法数组。

```typescript
const emitter = new Emitter();

const fn1 = () => console.log('bar');
const fn2 = () => console.log('baz');
emitter.on('test', fn1);
emitter.once('test', fn2);

console.log(emitter.listeners('test')); // [fn1, wrapFn2]
```

### rawListeners(eventName: string|symbol)

获取事件名称的全部监听方法（原始方法，未经过包装处理）。

返回对应事件名称的监听方法数组。

```typescript
const emitter = new Emitter();

const fn1 = () => console.log('bar');
const fn2 = () => console.log('baz');
emitter.on('test', fn1);
emitter.once('test', fn2);

console.log(emitter.rawListeners('test')); // [fn1, fn2]
```

### hasListener(eventName: string|symbol, listener: F)

判断监听方法是否存在。

内部使用 `rawListeners` 获取原始方法进行判断。

```typescript
const emitter = new Emitter();

const fn1 = () => console.log('bar');
const fn2 = () => console.log('baz');
emitter.on('test', fn1);
emitter.once('test', fn2);

emitter.hasListener('test', fn1); // true
emitter.hasListener('test', fn2); // true

emitter.emit('test');

emitter.hasListener('test', fn1); // true
emitter.hasListener('test', fn2); // false
```

### prependListener(eventName: string|symbol, listener: F, context?: object | null)

注册监听方法。同 `on` 方法，只是将监听方法添加到最前面（事件触发是按顺序执行）。

返回当前实例。

```typescript
const emitter = new Emitter();

// 注册监听方法
emitter.on('foo', () => console.log('bar'));
emitter.prependListener('foo', () => console.log(42));

emitter.emit('foo');
// 42
// bar
```

### prependOnceListener(eventName: string|symbol, listener: F, context?: object | null)

仅触发一次的监听方法。同 `once` 方法，只是添加到最前面（事件触发是按顺序执行）。

返回当前实例。

```typescript
const emitter = new Emitter();

// 注册监听方法
emitter.on('foo', () => console.log('bar'));
emitter.prependOnceListener('foo', () => console.log(42));

emitter.emit('foo');
// 42
// bar

emitter.emit('foo');
// bar
```

[npm]: https://img.shields.io/npm/v/emitter-pro.svg
[npm-url]: https://npmjs.com/package/emitter-pro
