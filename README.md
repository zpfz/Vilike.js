<div align=center><img src="https://s1.ax1x.com/2020/05/09/YQvmz4.png" height = "100" div align=center /></div>
<h1 align="center">ViLikeJS</h1>
<div align="center">

👀👍 A lightweight visit & like count javascript plugin.

![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square) ![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/zpfz/vilikejs?style=flat-square&color=orange)  ![Version](https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square&color=blue)

</div>

国内文档请直接访问 : [https://vilike.seeyoz.cn](https://vilike.seeyoz.cn)

# Ready
1.You need to go to [Bmob](https://www.bmob.cn/) to register an account and create an APP, then find "云数据库" on the right.  
2.Click on "云数据库" and then find "添加表" in the upper left corner to create a data table.  
3.Create fields according to the following table:   
| objectId | skey | visit | like | createdAt | updatedAt | ACL
| - | - | - | - | - | - | - |

**NOTE**: You need to set `skey` as the unique key.  

# Installation
Add [Bmob.js](https://cdn.jsdelivr.net/gh/bmob/hydrogen-js-sdk@2.2.3/dist/) and [ViLike.js](https://cdn.jsdelivr.net/gh/zpfz/ViLikeJS/) to your project.

```
<script src='https://cdn.jsdelivr.net/gh/bmob/hydrogen-js-sdk@2.2.3/dist/Bmob-2.2.3.min.js'></script>
<script src='https://cdn.jsdelivr.net/gh/zpfz/ViLikeJS@0.1.0-beta/dist/ViLike-0.1.0-beta.min.js'></script>
```

ViLikeJS is available via npm.

```
npm install --save vilike
```

# Initialization

You need to use the following API to configure:  
```
ViLike.configure({
  secretKey: 'Your Secret Key',
  safeKey: 'Your Safe Key',
  table: 'Table Name',
  key: 'Key Prop Name(Not Value)',
  visit: 'Visit Prop Name',
  like: 'Like Prop Name'
});
```
**PS**:Please replace the relevant information.
Then you also need to initialize it:
```
ViLike.init();
```
Well done! You can start using other APIs.

# Usage

### ViLike.get 
Get the number of visits and likes and like status.
```
ViLike.get('1192a75ccf48e109',(visit,like,islike)=>{
  console.log(visit,like,islike)
});
```
### ViLike.like
Count the `like` field and get the current number of likes.
```
ViLike.like('1192a75ccf48e109',(like)=>{
  console.log(like)
})
```

See here for more details : [https://vilike.seeyoz.cn](https://vilike.seeyoz.cn)