# Cache2

[![npm][npm]][npm-url] [![codecov](https://codecov.io/gh/caijf/cache2/graph/badge.svg?token=00EFPCEHYH)](https://codecov.io/gh/caijf/cache2) ![npm](https://img.shields.io/npm/dt/cache2) ![GitHub](https://img.shields.io/github/license/caijf/cache2.svg)

一个简单的 JavaScript 缓存管理，支持浏览器端和 node 端。

主要包含 2 个类：

- [Storage](#storage) - 基本的数据存储管理，支持 `自定义缓存`。
- [Cache](#cache) - 功能丰富的数据存储管理，支持 `自定义缓存` `命名空间` `数据过期时间` `限制缓存数量` `自定义事件`。

## 快速入门

### 安装

#### module

```shell
npm install cache2
```

```shell
yarn add cache2
```

```shell
pnpm add cache2
```

#### umd

如果你的项目使用的是原生方式开发，可以在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `cache2`。

`npm` 包的 [cache2/dist](https://www.npmjs.com/package/cache2?activeTab=code) 目录下提供了 `UMD` 包 `cache2.js` 以及 `cache2.min.js`。你也可以通过 [UNPKG](https://unpkg.com/browse/cache2/dist/) 下载到本地进行使用。或者直接使用 [UNPKG 线上版本](https://unpkg.com/cache2/dist/cache2.min.js)<sup> _注意版本_ </sup>。

### 示例

#### 1.浏览器存储

[Storage](#storage) 自定义缓存后，存取数据时自动处理序列化和解析数据。

```typescript
import { Storage } from 'cache2';

const local = new Storage(window.localStorage);

local.set('foo', { a: 1, b: ['bar'], c: ['x', 2, 3] });
local.get('foo');
// { a: 1, b: ['bar'], c: ['x', 2, 3] }

local.del('foo');
local.get('foo');
// null
```

#### 2.过期时间、限制数量

[Cache](#cache) 默认命名空间名称 `'default'`，使用内存缓存。

```typescript
import { Cache } from 'cache2';

const myCache = new Cache({
  stdTTL: 60 * 1000
  max: 20
});

myCache.set('foo', { baz: 42 });
myCache.get('foo');
// { baz: 42 }

// 60 seconds later ...

myCache.get('foo');
// undefined
```

#### 3.命名空间、自定义缓存、过期时间

[Cache](#cache) 自定义缓存后，存取数据时自动处理序列化和解析数据。

```typescript
import { Cache } from 'cache2';

const myCache = new Cache('namespace', {
  storage: localStorage,
  stdTTL: 60 * 1000
});

myCache.set('foo', { baz: 42 }, 10 * 1000);
myCache.set('bar', 'abc');

myCache.get('foo');
// { baz: 42 }

myCache.get('bar');
// 'abc'

// 10 seconds later ...

myCache.get('foo');
// undefined

myCache.get('bar');
// 'abc'

// 60 seconds later ...

myCache.get('bar');
// undefined
```

## Storage

数据存储管理。适用于简单的内存缓存、浏览器存储。

```typescript
import { Storage, StorageOptions } from 'cache2';

declare class Storage<ValueType = any> {
  constructor(storage?: TStorage, options?: Partial<StorageOptions>);
}

const memory = new Storage();
const memory2 = new Storage(undefined, options);
const local = new Storage(window.localStorage, options);
const session = new Storage(window.sessionStorage, options);
```

### StorageOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| needParsed | 存取数据时是否需要序列化和解析数据。<br/>如果使用内置的内存缓存，默认 `false`，如果自定义 `storage` 默认 `true`。 | `boolean` | - |
| replacer | 数据存储时序列化的参数，透传给 [JSON.stringify](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 的 `replacer` 参数。<br/>仅在 `needParsed=true` 时生效。 | `(key: string, value: any) => any` | - |
| reviver | 数据获取时转换的参数，透传给 [JSON.parse](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 的 `reviver` 参数。<br/>仅在 `needParsed=true` 时生效。 | `(key: string, value: any) => any` | - |
| prefix | 缓存键前缀。便于管理同域名下的不同项目缓存。 | `string` | - |

### Storage 实例方法

#### storage.get(key: string)

获取存储的数据。如果键值存在返回键值，否则返回 `null`。

```typescript
const local = new Storage(window.localStorage);
local.set('foo', { baz: 42 });
local.get('foo');
// { baz: 42 }
```

#### storage.set(key: string, data: ValueType)

存储数据。

```typescript
const local = new Storage(window.localStorage);
local.set('foo', { baz: 42 });
local.get('foo');
// { baz: 42 }
```

#### storage.del(key: string)

删除存储的数据。

```typescript
const local = new Storage(window.localStorage);
local.set('foo', { baz: 42 });
local.get('foo');
// { baz: 42 }

local.del('foo');
local.get('foo');
// null
```

#### storage.clear()

清除存储的所有键。

_⚠️注意：该方法调用 `storage.clear()`，可能会将同域下的不同实例的所有键都清除。如果要避免这种情况，建议使用 [Cache](#cache)。_

```typescript
const local = new Storage(window.localStorage);
local.set('foo', { baz: 42 });
local.get('foo');
// { baz: 42 }

local.clear();
local.get('foo');
// null
```

## Cache

功能丰富的数据存储管理，支持 `自定义缓存` `命名空间` `数据过期时间` `限制缓存数量` `自定义事件`。

```typescript
import { Cache, CacheOptions } from 'cache2';

declare class Cache<ValueType = any> extends Emitter<(key: string, value: ValueType) => void> {
  constructor(options?: Partial<CacheOptions>);
  constructor(namespace: string, options?: Partial<CacheOptions>);
}

// 如果不传命名空间，默认 'default'。

const memory = new Cache();
const memory2 = new Cache(options);
const memory3 = new Cache('namespace', options);

const local = new Storage({ storage: window.localStorage });
const local2 = new Storage('namespace', { storage: window.localStorage });

const session = new Storage({ storage: window.sessionStorage });
const session2 = new Storage('namespace', { storage: window.sessionStorage });
```

### CacheOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| storage | 自定义数据存储器，支持 `localStorage` `sessionStorage`。默认使用内置的内存缓存。 | `TStorage` | - |
| max | 最大缓存数据数量。`-1` 表示无限制。 | `number` | `-1` |
| maxStrategy | 当达到最大缓存数量限制时的缓存策略。<br/>`'limited'` 表示达到限制数量后不存入数据，保存时返回 `false`。<br/> `'replaced'` 表示优先替换快过期的数据，如果都是一样的过期时间(0)，按照先入先出规则处理，保存时始终返回 `true`。 | `'limited' \| 'replaced'` | `'limited'` |
| stdTTL | 相对当前时间的数据存活时间，应用于当前实例的所有缓存数据。单位为毫秒，`0` 表示无期限。 | `number` | `0` |
| checkperiod | 定时检查过期数据，单位毫秒。如果小于等于 `0` 表示不启动定时器检查。 | `number` | `0` |
| needParsed | 存取数据时是否需要序列化和解析数据。<br/>如果使用内置的内存缓存，默认 `false`，如果自定义 `storage` 默认 `true`。 | `boolean` | - |
| replacer | 数据存储时序列化的参数，透传给 [JSON.stringify](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 的 `replacer` 参数。<br/>仅在 `needParsed=true` 时生效。 | `(key: string, value: any) => any` | - |
| reviver | 数据获取时转换的参数，透传给 [JSON.parse](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 的 `reviver` 参数。<br/>仅在 `needParsed=true` 时生效。 | `(key: string, value: any) => any` | - |
| prefix | 缓存键前缀。 | `string` | `cache2_` |

<mark>**⚠️ 注意：同一个命名空间的缓存是共享的。意味着命名空间名称相同的情况下，不同实例之间共用同一份缓存数据。建议自定义命名空间名称，避免不同实例的缓存数据冲突**</mark>

### Cache 实例方法

```typescript
import { Cache } from 'cache2';
const myCache = new Cache(namespace?, options?);
```

### set(key: string, value: any, ttl?: number)

设置缓存数据。

如果设置成功返回 `true`，否则返回 `false`。

```typescript
myCache.set('myKey', { foo: 'bar', baz: 42 }, 5 * 60 * 1000);
// true
```

### mset(keyValueSet: {key: string, value: any, ttl?: number}[])

设置多个缓存数据。

如果全部设置成功返回 `true`，否则返回 `false`。

```typescript
myCache.mset([
  { key: 'myKey', value: { foo: 'bar', baz: 42 }, ttl: 5 * 60 * 1000 },
  { key: 'myKey2', value: { a: 1, b: 2 } },
  { key: 'myKey3', value: 'abc' }
]);
// true
```

### get(key: string)

获取缓存值。

如果找到该值，则返回该值。如果未找到或已过期，则返回 `undefined`。

```typescript
myCache.set('myKey', obj, 5 * 60 * 1000);
myCache.get('myKey');
// { foo: 'bar', baz: 42 }

myCache.get('myKey2');
// undefined
```

### take(key: string)

获取缓存值并从缓存中删除键。

如果找到该值，则返回该值，并从缓存中删除该键。如果未找到或已过期，则返回 `undefined`。

```typescript
myCache.set('myKey', 'myValue'); // true
myCache.has('myKey'); // true

myCache.take('myKey'); // 'myValue'
myCache.has('myKey'); // false
```

### mget(keys: string[])

获取多个缓存值。

如果找到对应键名的值，返回一个具有键值对的对象。如果未找到或已过期，则返回一个空对象 `{}`。

```typescript
myCache.mset([
  { key: 'myKey', value: { foo: 'bar', baz: 42 }, ttl: 5 * 60 * 1000 },
  { key: 'myKey2', value: { a: 1, b: 2 } },
  { key: 'myKey3', value: 'abc' }
]);

myCache.mget(['myKey', 'myKey2']);
// {
//   myKey: { foo: 'bar', baz: 42 },
//   myKey2: { a: 1, b: 2 }
// }
```

### getAll()

获取全部缓存值。

返回一个具有键值对的对象。

```typescript
myCache.mset([
  { key: 'myKey', value: { foo: 'bar', baz: 42 }, ttl: 5 * 60 * 1000 },
  { key: 'myKey2', value: { a: 1, b: 2 } },
  { key: 'myKey3', value: 'abc' }
]);

myCache.getAll();
// {
//   myKey: { foo: 'bar', baz: 42 },
//   myKey2: { a: 1, b: 2 }
//   myKey3: 'abc'
// }
```

### keys()

获取全部键名的数组。

返回全部键名的数组。

```typescript
myCache.set('bar', 1);
myCache.set('foo', 2);

myCache.keys(); // ['bar', 'foo']
```

### has(key: string)

判断是否存在某个键。

如果包含该键返回 `true`，否则返回 `false`。

```typescript
myCache.has('foo'); // false

myCache.set('foo', 1);
myCache.has('foo'); // true
```

### del(key: string|string[])

删除一个或多个键值。

返回已删除的数量。

```typescript
myCache.set('myKey', { foo: 'bar', baz: 42 });
myCache.del('myKey'); // 1
myCache.del('not found'); // 0

myCache.mset([
  { key: 'myKey', value: { foo: 'bar', baz: 42 }, ttl: 5 * 60 * 1000 },
  { key: 'myKey2', value: { a: 1, b: 2 } },
  { key: 'myKey3', value: 'abc' }
]);
myCache.del(['myKey', 'myKey2']); // 2
```

### clear()

清除全部缓存的数据（当前命名空间）。

```typescript
myCache.set('bar', 1);
myCache.set('foo', 2);
myCache.keys(); // ['bar', 'foo']

myCache.clear();

myCache.keys(); // []
```

### ttl(key: string, ttl: number)

更新缓存键值的数据存活时间。

```typescript
myCache.set('myKey', { foo: 'bar', baz: 42 }, 5 * 60 * 1000);
myCache.ttl('myKey', 2 * 60 * 1000);
// true

myCache.ttl('not found', 1000);
// false
```

### getTtl(key: string)

获取某个键的过期时间戳。有以下返回值：

- 如果未找到键或已过期，返回 `undefined`。
- 如果 `ttl` 为 `0`，返回 `0`。
- 否则返回一个以毫秒为单位的时间戳，表示键值将过期的时间。

```typescript
const myCache = new Cache({ stdTTL: 5 * 1000 });

// 假如 Date.now() = 1673330000000
myCache.set('ttlKey', 'expireData');
myCache.set('noTtlKey', 'nonExpireData', 0);

myCache.getTtl('ttlKey'); // 1673330005000
myCache.getTtl('noTtlKey'); // 0
myCache.getTtl('unknownKey'); // undefined
```

### getLastModified(key: string)

获取某个键值的最后修改时间。有以下返回值：

- 如果未找到键或已过期，返回 `undefined`。
- 否则返回一个以毫秒时间戳，表示键值最后修改时间。

```typescript
const myCache = new Cache();

// Date.now() = 1673330000000
myCache.set('myKey', 'foo');
myCache.getLastModified('myKey'); // 1673330000000

// 5000ms later ...
myCache.set('myKey', 'bar');
myCache.getLastModified('myKey'); // 1673330005000
```

### startCheckperiod()

启动定时校验过期数据。

注意，如果没有设置 `checkperiod` 将不会触发定时器。

```typescript
// 设置 checkperiod 之后自动生效
const myCache = new Cache({
  checkperiod: 10 * 60 * 1000 // 10分钟检查一次数据是否过期
});

// 停止定时校验过期数据
myCache.stopCheckperiod();

// 启动定时校验过期数据
myCache.startCheckperiod();
```

### stopCheckperiod()

停止定时校验过期数据。参考 `startCheckperiod` 示例。

### 自定义事件

#### set

成功设置键值后触发。

```typescript
myCache.on('set', (key, value) => {
  // do something
});
```

#### del

删除键值后触发。

```typescript
myCache.on('del', (key, value) => {
  // do something
});
```

#### expired

校验数据过期后触发。

注意，如果校验数据过期，会先删除数据触发 `del` 事件，然后再触发 `expired` 事件。

```typescript
myCache.on('expired', (key, value) => {
  // do something
});
```

## 应用场景

### 缓存接口数据

```typescript
import { Cache } from 'cache2';

const apiCache = new Cache('api', { stdTTL: 10 * 60 * 1000 });
// ...
```

### 缓存 URL.createObjectURL 预览文件，删除时 URL.revokeObjectURL 释放缓存

```typescript
import { Cache } from 'cache2';

const fileObjectUrlCache = new Cache('fileObjectUrl', { max: 20, maxStrategy: 'replaced' });
fileObjectUrlCache.on('del', (key, value) => {
  URL.revokeObjectURL(value);
});

fileObjectUrlCache.set(fssid, URL.createObjectURL(file));
```

### `sessionStorage`、`localStorage` 支持过期时间

```typescript
import { Cache } from 'cache2';

const localCache = new Cache({
  storage: localStorage,
  stdTTL: 5 * 60 * 1000 // 默认数据留存时间为5分钟
});

localCache.set('num', 1); // 该数据默认留存5分钟
localCache.set('str', 'foo', 10 * 60 * 1000); // 该数据留存10分钟
```

### 如何自定义一个 storage

自定义 `storage` 对象需要包含 `getItem` `setItem` `removeItem`。

例如，微信端的同步缓存等。

```typescript
import { Cache } from 'cache2';

const wxStorage = {
  getItem(key: string) {
    return wx.getStorageSync(key);
  },
  setItem(key: string, value: any) {
    wx.setStorageSync(key, value);
  },
  removeItem(key: string) {
    wx.removeStorageSync(key);
  }
};
const wxCache = new Cache('namespace', {
  storage: wxStorage,
  needParsed: false,
  stdTTL: 5 * 60 * 1000 // 设置默认数据留存时间为5分钟
});

wxCache.set('num', 1); // 该数据默认留存5分钟
wxCache.set('str', 'foo', 10 * 60 * 1000); // 该数据留存10分钟
```

### 使用对象作为缓存键

可以单独实现一个获取缓存键的方法。

```typescript
import { isObject } from 'ut2';

const wm = new WeakMap();
const getCacheKey = (obj: string | Blob) => {
  if (!isObject(obj)) {
    return String(obj);
  }
  if (!wm.get(obj)) {
    wm.set(obj, uniqueId());
  }
  return wm.get(obj) as string;
};

const myCache = new Cache('namespace');

myCache.set(getCacheKey(someKey), someValue);
myCache.get(getCacheKey(someKey));
```

[npm]: https://img.shields.io/npm/v/cache2.svg
[npm-url]: https://npmjs.com/package/cache2
