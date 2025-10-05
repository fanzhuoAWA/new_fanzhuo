---
title: C++二分算法
date: 2025-05-24
lastmod: 2025-05-24
categories:
  - 算法
tags:
  - 模板
  - C++
  - 二分查找
slug: cpp-binary-search-template
summary: 关于C++二分查找的几种实现方式与思考
description: 本文整理了C++中二分查找的几种经典实现模板，包括整数二分、实数二分以及标准库函数的使用。
featuredImage: /img/C++二分算法.png
---

早。

最近在算法课上整理了一些二分查找的模板。二分看似简单，但要写出一个既正确又优雅的实现，还真需要点功夫。下面是饭桌的笔记，希望能对各位有所帮助。

## 整数二分

整数二分最让人头疼的就是那个 `±1` 的问题——加还是不加？这是个问题。

```cpp
// 整数二分模板
int L = 0, R = 1e9;
int ans = -1;  // 先预设个-1，找不到就算了（迫真）
while(L <= R)
{
    int mid = (L + R) >> 1;  // 右移一位，比除法优雅那么一点点
    if(check(mid))
    {
        ans = mid;    // 暂时记录这个可行的答案
        R = mid - 1;  // 看看还有没有更小的解
    }
    else
    {
        L = mid + 1;  // 当前解不可行，得往大了找
    }
}
```

这个模板适用于寻找**最小可行解**的场景。如果你要找最大可行解，把 `R = mid - 1` 和 `L = mid + 1` 的逻辑对调一下就好。

## 实数二分

实数二分就温柔多了，没有那些恼人的边界问题，但你要面对的是另一个敌人——**精度**。

```cpp
// 实数二分模板
long double l = 0, r = 1e9;
int T = 100;  // 循环100次，精度应该够用了
while(T--)
{
    long double mid = (l + r) * 0.5;  // 注意是0.5，不是>>1
    if(check(mid))
    {
        l = mid;  // 不加减，直接赋值
    }
    else
    {
        r = mid;  // 这里也是直接赋值
    }
}
cout << l << "\n";  // 输出l或r都可以，它们已经足够接近
```

## 标准库函数

当然，如果你只是在数组上二分，完全可以用 lower_bound & upper_bound 。

```cpp
// lower_bound & upper_bound 用法
int a[50];
a[1] = 2;
a[2] = 4;
a[3] = 5;
a[4] = 6;

// 一
auto it = lower_bound(a + 1, a + 49, 5);
cout << *it << "\n";  // 输出5（a[3]的值），实际得到的是第一个大于等我要求的值（val项的5）的位置

// 二
int pos = lower_bound(a + 1, a + 49, 5) - a;// 得到了我们想要的位置
// 现在 a[pos] == *it
```

简单解释一下这两个函数：

语法: lower_bound(*begin, *end, val, cmp) cmp是自主设定的比较函数（可有可无，不建议使用）

- `lower_bound`: 在给定的排序规则下，找到**第一个大于等于**val的位置
- `upper_bound`: 在给定的排序规则下，找到**第一个大于**val的位置

## 后记

希望这份笔记对你有用。如果你发现了什么错误或者有更好的写法，欢迎在评论区（现在还没有，可以发邮件给我QAQ）指出，也可以问问 [Purinliang](https://purinliang.github.io) (*^▽^*)。