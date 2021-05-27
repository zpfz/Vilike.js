<h2 align="center">Vilike.js</h2>

<p align="center">A lightweight counts of visit and like plugin.</p>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" alt="Build Status">
  <img src="https://img.shields.io/npm/dt/vilike?style=flat-square&color=red" alt="Downloads">
  <img src="https://img.shields.io/github/package-json/v/zpfz/Vilike.js?style=flat-square" alt="Version">
  <img src="https://img.shields.io/github/license/zpfz/Vilike.js?style=flat-square&color=blue" alt="License">
</p>

</p>

## Installation
---

Add `Vilike.js` to your project.

```js
<script src="https://unpkg.com/vilike/dist/Vilike.min.js"></script>
```
You can get the corresponding CDN link from [unpkg](https://unpkg.com/vilike/) or [jsdelivr](https://cdn.jsdelivr.net/gh/zpfz/Vilike.js/dist/).

Vilike.js is available via [npm](https://www.npmjs.com/package/vilike), and you can also use NPM:

```sh
npm install --save vilike
# or yarn add vilike
```

## Basic usage
---
### Vilike.exec(pkey, skey, mode)  

Get the returned data through pkey and skey, the initial value is 1. Each time this method is executed, the data on the CountAPI server will automatically increase by one.  
**NOTE:** If the corresponding pkey and skey exist in the CountAPI service, the corresponding data will be returned directly, otherwise the default data will be created automatically.

**Parameter Description** 
- `pkey` : Fill in the primary key that needs to be queried. If it does not exist, it will be created automatically and keep the default configuration.
- `skey` : Fill in the subkey that needs to be queried. If it does not exist, it will be created automatically and keep the default configuration.
- `mode` : LocalStorage mode, after opening, you can use `isHit` to judge whether the current browser has been visited.
  - `0` : Don't open LocalStorage, and return the value of `value` directly after the request is successful.
  - `1` : Turn on LocalStorage, and the value of `isHit` can be returned after the request is successful.

**E.g.**

```js
Vilike.exec('github','vilike',1).then((result) => {
  console.log(result);
});
```
**Result**
```json
{
  isHit: true,
  value: 1
}
```
<br/>

## Advanced Usage 
---
### Vilike.create(pkey, skey, value, ctrl, upperbound)  
Used to create custom data, including key value, data controllability, and data additivity.

**Parameter Description** 
- `pkey` : Primary key, usually fill in the primary domain name, such as `vilike.vercel.app` etc.
- `skey` : Subkeys, filled with unique strings, such as Hash, MD5, etc.
- `value` : The initial value of the data, the default value is `0`.
- `ctrl` : Used to configure whether the data can be changed or not, the default value is `0`.
  - `0` : The data is locked and cannot be changed using the `Vilike.update` method.
  - `1` : The data is unlocked and can be changed using the `Vilike.update` method.
- `upperbound` : The maximum limit can be added to the data, and the default value is `1`.

**E.g.**

```js
Vilike.create('github.zpfz','vilike', 82382, 1, 999).then((result) => {
  console.log(result);
});
```
**Result**
```json
{
  key: "vilike"
  namespace: "github.zpfz"
  value: 82382
}
```

### Vilike.update(pkey, skey, value, type)
Used to update the corresponding values of pkey and skey, provided that the data needs to be created with the `Vilike.create` method and the value of `ctrl` is guaranteed to be `1`.  

**Parameter Description** 
- `pkey` : Fill in the primary key to be queried.
- `skey` : Fill in the subkey that needs to be queried.
- `value` : Fill in the value that needs to be updated, the default value is divided into two cases:
  - When `type` is `0`: `value` The default value is `0`.
  - When `type` is `1`: `value` The default value is `1`.
- `type` : Set the data change type.
  - `0` : Replace the original data, you can replace the original data.
  - `1` : Additive counters that can be superimposed on the original data upwards.

**E.g. 1**

```js
Vilike.update('github.zpfz','vilike', 565, 0).then((result) => {
  console.log(result);
});
```

**Result**
```json
{
  old_value: 82382,
  value: 565
}
```
**E.g. 2**

```js
Vilike.update('github.zpfz','vilike', 565, 1).then((result) => {
  console.log(result);
});
```

**Result**
```json
{
  value: 1130
}
```
### Vilike.info(pkey, skey)
Used to query all the information of the current data.

**Parameter Description** 
- `pkey` : Fill in the primary key to be queried.
- `skey` : Fill in the subkey that needs to be queried.

**E.g.**
```js
Vilike.info('github.zpfz','vilike').then((result) => {
  console.log(result);
});
```

**Result**
```json
{
  created: 1622122993446
  enable_reset: true
  key: "vilike"
  namespace: "github.zpfz"
  ttl: 15769999666
  update_lowerbound: 0
  update_upperbound: 999
  value: 1130
}
```
**NOTE:** The fields above are in order: creation time, whether the data can be changed, subkey, primary key, TTL, maximum limit for data reduction, maximum limit for data addition, current value.


<br/>

## Changelog
---
### 0.2.0
  - 🌟 Optimize API service, you can use it without configuring the back-end platform.
  - 🌟 Refactor methods and attributes to make it easier to use.

### 0.1.0
  - 🌟 Support the like feature.
  - 🌟 Support site, article page visits statistics.

## Contributors
---
This project exists thanks to all the people who contribute.

![Feng L.H.](https://avatars2.githubusercontent.com/u/49757965?s=60&v=4)


## License
---
RVerify © 2020-present, Feng L.H. Released under the [MIT License](https://mit-license.org/).