#运算符

## 简介

一些运算符被用来建立*表达式*，并返回一个结果。

- 算术运算符
- 比较运算符
- 逻辑运算符
- [?:](https://www.tradingview.com/pine-script-reference/v5/#op_{question}{colon}) 三元运算符。
- [[]](https://www.tradingview.com/pine-script-reference/v5/#op_[])历史参考运算符

其他运算符用于为变量赋值。

- `=`用来给变量赋值，**但只在声明变量时**（第一次使用时）。
- `:=`用来给一个**以前声明的变量赋值。下列运算符也可以这样使用：`+=`, `-=`, `*=`, `/=`, `%=`。

正如在[类型系统](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem)页面中解释的那样，*形式*和*类型*在决定表达式产生的结果的类型方面起着关键作用。这反过来又影响到你将被允许使用这些结果的方式和函数。表达式总是返回表达式中使用的最强的一种形式，例如，如果你将一个 "input int "与一个 "series int "相乘，表达式将产生一个 "series int "的结果，你将不能使用它作为[ta.ema()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}ema)中`length`的参数。

这个脚本会产生一个编译错误。

```
//@version=5
indicator("")
lenInput = input.int(14, "Length")
factor = year > 2020 ? 3 : 1
adjustedLength = lenInput * factor
ma = ta.ema(close, adjustedLength)  // 编译错误！
plot(ma)
```

编译器会抱错：*无法调用'ta.ema'，参数'length'='adjustedLength'。使用了一个'series int'类型的参数，但预期是一个'简单int'；*。这是因为`lenInput`是一个 "input int"，但`factor`是一个 "series int"（它只能通过查看每个柱状图上的[year](https://www.tradingview.com/pine-script-reference/v5/#var_year)的值来确定）。因此，`adjustedLength`变量被分配了一个 "series int "值。我们的问题是[ta.ema()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}ema)的参考手册条目告诉我们，它的`length`参数需要 "simple "形式的值，这是一个比 "series "更弱的形式，所以 "series int "值是不允许的。

解决我们的难题需要。

- 使用另一个支持 "series int "长度的移动平均线函数，例如[ta.sma()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}sma)，或者
- 不使用为我们的长度产生 "series int "值的计算。

## [算术运算符](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#id4)

在Pine Script中，有五个算术运算符。

| `+`  | 加法和字符串连接      |
| ---- | --------------------- |
| `-`  | 减法                  |
| `* ` | 乘法运算              |
| `/`  | 除法                  |
| `%`  | Modulo (除法后的余数) |

上面的算术运算符都是二进制的（意味着它们需要两个*操作数*来工作，如 "1+2"）。+和-也是单数运算符（意味着它们对一个操作数工作，如-1或+1）。

如果两个操作数都是数字，但其中至少有一个是 "float "类型，结果也将是 "float"。如果两个操作数都是 "int "类型，结果也将是 "int"。如果至少有一个操作数是[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，其结果也是[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。

`+`运算符也可以作为字符串的连接运算符。`"EUR "+"USD"`得到`"EURUSD"`字符串。



## [比较运算符](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#id5)

在Pine Script中，有六个比较运算符。

| `<`   | 小于       |
| ----- | ---------- |
| `<=`  | 小于或等于 |
| `! =` | 不等于     |
| `==`  | 等于       |
| `>`   | 大于       |
| `>=`  | 大于或等于 |

比较操作是二进制的。如果两个操作数都是数值，结果将是*bool*类型，即 "true"、"false "或[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。

例子。

```
1 > 2 // false
1 != 1 // false
close >= open // 取决于`close`和`open`的值。
```



## [逻辑运算符](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#id6)

在Pine Script中，有三个逻辑运算符。

| `not` | Negation   |
| ----- | ---------- |
| `and` | 逻辑连接体 |
| `or`  | 逻辑分离   |

操作符 "not "是单项的。当应用于一个 "真 "的操作数时，结果是 "假"，反之亦然。

和 运算符真值表。

| a     | b     | a and b |
| :---- | :---- | :------ |
| true  | true  | true    |
| true  | false | false   |
| false | true  | false   |
| false | false | false   |

`or`运算符真值表。

| a     | b     | a or b |
| :---- | :---- | :----- |
| true  | true  | true   |
| true  | false | true   |
| false | true  | true   |
| false | false | false  |

## `?:` 三元运算符

[?:](https://www.tradingview.com/pine-script-reference/v5/#op_{question}{colon})三元运算符用于创建形式的表达：

```
条件 ? 如果为真返回值 : 如果为假返回值
```

三元运算符返回的结果取决于`条件`的值。如果它是 "真"，那么返回 第二个参数的值。如果`条件`是`假`或[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，那么将返回` 第三个参数的值`。

三元表达式的组合可以达到与[switch](https://www.tradingview.com/pine-script-reference/v5/#op_switch)结构相同的效果，例如：

```
timeframe.isintraday ? color.red : timeframe.isdaily ? color.green : timeframe.ismonthly ? color.blue : na
```

这个例子从左到右计算：

- 如果[timeframe.isintraday](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isintraday)是`true`，那么就会返回`color.red`。如果是 "false"，那么[timeframe.isdaily](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isdaily)被评估。
- 如果[timeframe.isdaily](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isdaily)为`true`，则返回`color.green`。如果是`false`，则评估[timeframe.ismonthly](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}ismonthly)。
- 如果[timeframe.ismonthly](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}ismonthly)为`true`，则返回`color.blue`，否则返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。



## `[]`历史引用操作符

可以使用[[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[])历史引用操作符来引用[时间序列](https://www.tradingview.com/pine-script-docs/en/v5/language/Time_series.html#pagetimeseries)的过去值。过去的数值是指变量在当前脚本执行的条形图之前的数值，即*当前条形图*。更多关于脚本的执行方式的信息，请参见[执行模式](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)页面。

在变量、表达式或函数调用之后使用[[]](https://www.tradingview.com/pine-script-reference/v5/#op_[])操作符。操作符的方括号内使用的值是我们要引用的过去的偏移量。要引用[volume](https://www.tradingview.com/pine-script-reference/v5/#var_volume)内置变量的值，离当前柱状体有两个柱状体，我们可以使用`volume[2]`。

因为序列是动态增长的，当脚本在连续的柱状体上移动时，与操作符一起使用的偏移量将指代不同的柱状体。让我们看看同一个偏移量返回的值是如何动态的，以及为什么系列与数组有很大的不同。在Pine中，[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)变量，或`close[0]`相当于，持有当前条形的 "收盘 "值。如果你的代码现在是在*dataset*（图表上所有条形的集合）的**第三条上执行，`close`将包含该条形收盘时的价格，`close[1]`将包含前一条形（数据集的第二条形）收盘时的价格，`close[2]`是第一条形。`close[3]`将返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，因为该位置不存在条形图，因此其值是*不可用的。

当同样的代码在下一个条形图上执行时，即数据集中的**第四个条形图，`close'现在将包含该条形图的收盘价，在你的代码中使用的同样的`close[1]`现在将指数据集中的第三个条形图的 "收盘"。数据集中第一个条形图的收盘价现在将是`close[3]`，而这次`close[4]`将返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。

在Pine的运行环境中，由于你的代码对数据集中的每个历史条形图都要执行一次，从图表的左边开始，Pine在索引0处增加了一个新的系列元素，并将系列中已有的元素推远了一个索引。相比之下，数组可以有恒定或可变的大小，其内容或索引结构不会被运行时环境修改。因此，松系列与数组有很大的不同，只是通过其索引语法与数组共享熟悉感。

当图表的符号的市场是开放的，脚本在图表的最后一个条形上执行时，*实时条形*，[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)返回当前价格的值。它将只包含实时条的实际收盘价，即最后一次在该条上执行脚本时的收盘价。

Pine有一个变量，包含了脚本所执行的条形图的编号。[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)。在第一个条形图上，[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)等于0，在脚本执行的每个连续条形图上，它都会增加1。在最后一个条形图上，[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)等于数据集中条形图的数量减去1。

在Pine中使用"[]"操作符时，还有一个重要的考虑因素要牢记。我们看到的情况是，一个历史参考可能会返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)的值。[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)代表一个不是数字的值，在任何表达式中使用它都会产生一个同样是[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)的结果（类似于[NaN](https://en.wikipedia.org/wiki/NaN)）。这种情况经常发生在数据集的早期条形图的脚本计算过程中，但在某些条件下也可能发生在后期条形图中。如果你的Pine代码没有明确规定如何处理这些特殊情况，它们会在你的脚本计算中引入无效的结果，这些结果会一直影响到实时条。[na](https://www.tradingview.com/pine-script-reference/v5/#fun_na)和[nz](https://www.tradingview.com/pine-script-reference/v5/#fun_nz)函数被设计为允许处理这种情况。

这些都是[[]]()运算符的有效使用。

```
high[10]
ta.sma(close, 10)[1]
ta.highest(high, 10)[20]
close > nz(close[1], open)
```

请注意，[[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[])操作符只能在同一个值上使用一次。这是不允许的。

```
close[1][2] // 错误：不正确使用 [] 操作符
```

## 运算符优先级

计算的顺序是由运算符的优先级决定的。优先级较高的运算符会先被计算。下面是一个按优先级递减排序的运算符列表。

| 优先级 | 操作符               |
| :----- | :------------------- |
| 9      | `[]`                 |
| 8      | `+`, -, `not`        |
| 7      | `*`, `%`             |
| 6      | `+`, `-`             |
| 5      | `>`, `<`, `>=`, `<=` |
| 4      | `==`, `!=`           |
| 3      | and                  |
| 2      | `or`                 |
| 1      | `?:`                 |

如果在一个表达式中，有几个具有相同优先级的运算符，那么它们将被从左到右计算。

如果表达式必须以不同于优先级的顺序进行计算，那么表达式的部分内容可以用圆括号分组。



## `=`赋值运算符

`=`操作符用于在初始化--或声明--时分配一个变量，即第一次使用它时。它说这是我要使用的一个新变量，我希望它在每个柱子上以这个值开始。

这些都是有效的变量声明。

```
i = 1
ms_in_one_minute = 1000 * 60
showPlotInput = input.bool(true, "Show plots")
pHi = pivothigh(5, 5)
plotColor = color.green
```

关于如何声明变量的更多信息，请参见[变量声明](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations)页面。



## `:=`重新赋值运算符

`:=`是用来*为一个现有的变量重新赋值的。它说*使用这个在我的脚本中早先声明的变量，并给它一个新的值。

首先声明的变量，然后用`:=`重新赋值的变量，被称为*可变*变量。下面所有的例子都是有效的变量重新赋值。你可以在 ref[\`\`](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#id1) `var`声明模式`<PageVariableDeclarations_Var>`一节中找到更多关于 [var](https://www.tradingview.com/pine-script-reference/v5/#op_var)如何工作的信息。

```
//@version=5
indicator("", "", true)
// Declare `pHi` and initilize it on the first bar only.
var float pHi = na
// Reassign a value to `pHi`
pHi := nz(ta.pivothigh(5, 5), pHi)
plot(pHi)
```

请注意。

- 我们用这个代码声明`pHi`。`var float pHi = na`。[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)关键字告诉Pine，我们只想在数据集的第一个条形图上用[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)来初始化该变量。`float`关键字告诉编译器我们正在声明一个 "float "类型的变量。这是必要的，因为与大多数情况相反，编译器不能自动确定`=`符号右边的数值的类型。
- 虽然变量声明只在第一个条形图上执行，因为它使用了[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)，但`pHi := nz(ta.pivothigh(5, 5), pHi)`一行将在图表的所有条形图上执行。在每个条形图上，如果[pivothigh()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}pivothigh)调用返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，它就会进行评估，因为这是该函数在没有找到新枢轴时的做法。[nz()](https://www.tradingview.com/pine-script-reference/v5/#fun_nz)函数是做 "检查[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) "的部分。当它的第一个参数（`ta.pivothigh(5, 5)`）是[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)时，它返回第二个参数（`pHi`）而不是第一个。当[pivothigh()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}pivothigh)返回新发现的枢轴的价格点时，该值被分配给`pHi`。当它返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)时，因为没有找到新的枢轴，我们将`pHi`的先前值分配给它自己，实际上是保留了它先前的值。

我们脚本的输出看起来像这样。

![../_images/Operators-ReassignmentOperator-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Operators-ReassignmentOperator-1.png)

请注意。

- 在发现新的枢轴之前，该线保留其先前的价值。
- 枢轴是在枢轴实际发生后的五个小节后被检测到的，因为我们的`ta.pivothigh(5, 5)`调用说我们需要在一个高点的两边有五个较低的高点才能被检测为枢轴。

参见[变量重新赋值](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-variablereassignment)部分，了解更多关于如何为变量重新赋值的信息。
