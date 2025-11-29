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
featuredImage: /img/cpp-binary-search.webp
---

上课时记下的一些笔记

```cpp
//整数二分
int L = 0, R= 1e9;
int ans = -1;
while(L <= R)
{
    int mid = (L + R) >> 1;
    if(check(mid))
    {
        ans = mid;
        R = mid - 1;
    }
    else
    {
        L = mid + 1;
    }
}
//实数二分 或者 浮点数二分
long double l = 0, r = 1e9;
int T = 100;
while(T--)
{
    long double mid = (l + r) * 0.5;
    if(check(mid))
    {
        l = mid;
    }
    else
    {
        r = mid;
    }
}
cout << l << "\n";//输出r也可
//二分函数
//lower_bound(*begin, *end, val, cmp) //cmp是自主设定的比较函数（可有可无，不建议使用）
//upper_bound()

//lower表示 在我给定的排序规则下，找到第一个大于等于val的位置指针
//upper表示                                大于

//例：
int a[50];
a[1] = 2;
a[2] = 4;
a[3] = 5;
a[4] = 6;
auto it = lower_bound(a + 1, a + 49, 5);
cout << *it << "\n";//输出的是5（a[3]），实际得到的是第一个大于等我要求的值（val项的5）的位置
//访问第一个大于等于val的值
//第二种用法
int pos = lower_bound(a + 1, a + 49, 5) - a;//得到了我们想要的位置
//a[pos] == *it
## ## ```
