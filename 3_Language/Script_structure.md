# 脚本结构

Pine中的脚本遵循这个一般结构：

```
<version>
<declaration_statement>
<code>
```

## 注释

双斜线（`//`）定义了Pine的注释。注释可以在行的任何地方开始。除了在被包裹的行上，它们也可以在同一行上跟随Pine代码。

```
//@version=5
indicator("")
// This line is a comment
a = close // This is also a comment
plot(a)
```

Pine编辑器有一个评论/取消评论行的键盘快捷键：ctrl + /，你可以在多行上使用它，首先突出显示它们。

## 版本

以下形式的编译器指令告诉编译器该脚本是用哪个版本的Pine编写的：

```
//@version=5
```

- 版本号可以是1到5。
- 编译器指令不是强制性的，但如果省略的话，就会假定版本1。强烈建议总是使用最新的版本。
- 虽然把版本指令放在脚本的任何地方在协同上都是正确的，但如果放在脚本的顶部，对读者来说更有用。

当前版本的Pine的显著变化记录在[发行说明](https://www.tradingview.com/pine-script-docs/en/v5/Release_notes.html#pagereleasenotes)中。



## 声明语句

所有的Pine脚本都必须包含一个*声明语句*，也就是对这些函数之一的调用。

- [indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)
- [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)
- [library()](https://www.tradingview.com/pine-script-reference/v5/#fun_library)

声明语句。

- 确定脚本的类型，这又决定了其中允许哪些内容，以及如何使用和执行。
- 设置脚本的关键属性，比如它的名称，当它被添加到图表中时，它将出现在哪里，它所显示的数值的精度和格式，以及管理其运行时行为的某些数值，比如它将在图表中显示的最大绘图对象数量。对于策略，属性包括控制回测的参数，如初始资本、佣金、滑点等。

每种类型的脚本都有不同的要求。

- 指标必须包含至少一个在图表上产生输出的函数调用（例如，[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot), [plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape), [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot), [barcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_barcolor), [line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line{dot}new) ，等等）。

- 策略必须包含至少一个 "strategy.*() "调用，例如，[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)。

- 库必须至少包含一个库函数声明。


  ## 代码

  脚本中不是注释或编译器指令的行是*语句*，它实现了脚本的算法。一个语句可以是这些内容之一。

  - 变量声明
  - 变量的重新赋值
  - 函数声明
  - 内置函数调用，[用户定义的函数调用](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions)或[一个库函数调用](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#pagelibraries-usingalibrary)
  - [if](https://www.tradingview.com/pine-script-reference/v5/#op_if), [for](https://www.tradingview.com/pine-script-reference/v5/#op_for), [while](https://www.tradingview.com/pine-script-reference/v5/#op_while) 或 [switch](https://www.tradingview.com/pine-script-reference/v5/#op_switch) *结构*。

  语句可以以多种方式排列。

  - 有些语句可以用一行来表达，比如大多数变量声明、只包含一个函数调用的行或单行函数声明。其他的，像结构，总是需要多行，因为它们需要一个*局部的块*。
  - 脚本的*全局范围内的语句（即不属于局部块的部分）不能以白色空间（空格或制表符）开始。它们的第一个字符也必须是该行的第一个字符。在行的第一个位置开始的行，根据定义成为脚本的*全局范围的一部分。
  - 结构或多行函数声明总是需要一个*local block*。一个本地块必须缩进一个制表符或四个空格。每个局部块定义了一个不同的*局部范围*。
  - 多个单行语句可以通过使用逗号（`,`）作为分隔符在一行中串联起来。
  - 行可以包含注释，也可以是注释。
  - 行也可以被包起来（在多行上继续）。

  通过使用 "打开 "按钮并选择 "新建空白指标"，可以在Pine编辑器中生成一个简单有效的Pine v5指标。

```
//@version=5
indicator("My Script")
plot(close)
```

这个指标包括三个局部块，一个在`f()`函数声明中，两个在变量声明中使用[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)结构。

```
//@version=5
indicator("", "", true) //声明语句(全局范围)

barIsUp() => // 函数声明(全局范围)
    close > open // 本地块(本地范围)

plotColor = if barIsUp() // 变量声明 (全局范围)
    color.green // 本地块 (本地范围)
else
    color.red // 本地块 (本地范围)

bgcolor(color.new(plotColor, 70))   // 调用一个内置函数 (全局范围)
```

你可以通过选择 "新建空白策略 "来调出一个简单的Pine v5策略。

```
//@version=5
strategy("My Strategy", overlay=true, margin_long=100, margin_short=100)

longCondition = crossover(sma(close, 14), sma(close, 28))
if(longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(sma(close, 14), sma(close, 28))
if(shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
```

## 换行代码

长行可以被分割在多行上，或被 "包裹 "起来。被包裹的行必须缩进任何数量的空格，只要它不是4的倍数（这些边界用于缩进局部块）。

```
a = open + high + low + close
```

可以被包装成:

```
a = open +
      high +
          low +
             close
```

一个长的[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用可以被包装成。

```
plot(ta.correlation(src, ovr, length),
   color = color.new(color.purple, 40),
   style = plot.style_area,
   trackprice = true)
```

用户定义的函数声明中的语句也可以被包装。但是，由于局部块在语法上必须以缩进开始（4个空格或1个制表符），当把它分割到下一行时，语句的延续部分必须以一个以上的缩进开始（不等于4个空格的倍数）。比如说

```
updown(s) =>
    isEqual = s == s[1] 。
    isGrowing = s > s[1] 。
    ud = isEqual ?
           0 :
           isGrowing ?
               (nz(ud[1]) <= 0 ?
                     1 :
                   nz(ud[1])+1) :
               (nz(ud[1]) >= 0 ?
                   -1 :
                   NZ(UD[1])-1)
```

不要在换行代码中使用注释。下面的代码不会被编译。

```
//@version=5
indicator("")
c = open > close ? color.red :
  high > high[1] ? color.lime : // 一个注释导致编译错误。
  low < low[1] ? color.blue : color.black
bgcolor(c)
```
