# 至 Pine Script™ 版本 3 

本文档有助于将 Pine Script™ 代码`@version=2`从 `@version=3`.

## 安全功能的默认行为已更改

让我们看一下简单的`security`函数用例。在日内图表上添加该指标：

```javascript
// Add this indicator on an intraday (e.g., 30 minutes) chart
//@version=2
study("My Script", overlay=true)
s = security(tickerid, 'D', high, false)
plot(s)
```

该指标是根据历史数据计算的，并在一定程度 *上展望了未来*。在每个交易时段的第一根柱上，指标会绘制全天的最高价格。这在某些情况下对于分析可能很有用，但对于回溯测试策略不起作用。

我们对此进行了研究，并在 Pine Script™ 版本 3 中进行了更改。如果使用`//@version=3`指令编译该指标，我们会得到完全不同的图片：![图片/V3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/V3.png)

但旧的行为仍然可用。我们向`security`名为 的函数（第五个）添加了一个参数 `lookahead`。

它可以采用两种不同值的形式：（ `barmerge.lookahead_off`这是 Pine Script™ 版本 3 的默认值）或 `barmerge.lookahead_on`（这是 Pine Script™ 版本 2 的默认值）。

## 自引用变量被删除

Pine Script™ 版本 2 代码段，包含自引用变量：

```javascript
//@version=2
//...
s = nz(s[1]) + close
```

使用 Pine Script™ 版本 3 编译这段代码将会出现错误 。它应该重写为：`Undeclared identifier 's'`

```javascript
//@version=3
//...
s = 0.0
s := nz(s[1]) + close
```

`s`现在是一个在第 3 行初始化的*可变变量。*在第 3 行，初始值向 Pine Script™ 编译器提供有关变量类型的信息。在这个例子中它是一个浮点数。

在某些情况下，您可以`s`使用值初始化该可变变量（例如 ）`na`。但在复杂的情况下这是行不通的。

## 前向引用变量被删除

```javascript
//@version=2
//...
d = nz(f[1])
e = d + 1
f = e + close
```

本例中`f`是一个前向引用变量，因为它在声明和初始化之前在第 3 行被引用。在 Pine Script™ 版本 3 中，这会给您一个错误。此示例应在 Pine Script™ 版本 3 中重写，如下所示：`Undeclared identifier 'f'`

```javascript
//@version=3
//...
f = 0.0
d = nz(f[1])
e = d + 1
f := e + close
```

## 解决安全表达式中可变变量的问题

当您将脚本迁移到版本 3 时，删除自引用和前向引用变量后，Pine Script™ 编译器可能会给出错误：

```javascript
//@version=3
//...
s = 0.0
s := nz(s[1]) + close
t = security(tickerid, period, s)
Cannot use mutable variable as an argument for security function!
```

自从 Pine Script™（即版本 2）中引入了可变变量以来，就存在此限制。它可以像以前一样解决：在函数中使用可变变量包装代码：

```javascript
//@version=3
//...
calcS() =>
    s = 0.0
    s := nz(s[1]) + close
t = security(tickerid, period, calcS())
```

## 禁止使用布尔值进行数学运算

在 Pine Script™ v2 中，存在将布尔值隐式转换为数字类型的规则。在 v3 中这是被禁止的。相反，将数字类型转换为布尔值（0 和`na`值是`false`，所有其他数字都是`true`）。示例（在 v2 中，此代码可以正常编译）：

```javascript
//@version=2
study("My Script")
s = close >= open
s1 = close[1] >= open[1]
s2 = close[2] >= open[2]
sum = s + s1 + s2
col = sum == 1 ? white : sum == 2 ? blue : sum == 3 ? red : na
bgcolor(col)
```

变量`s`、`s1`和`s2`均为*bool*类型。但在第 6 行，我们添加了其中的三个并将结果存储在变量中`sum`。`sum`是一个数字，因为我们不能添加布尔值。布尔值被隐式转换为数字（`true`值 to`1.0`和`false`to `0.0`），然后将它们相加。

这种方法会导致更复杂的脚本中出现无意的错误。这就是为什么我们不再允许布尔值到数字的隐式转换。

如果您尝试将此示例编译为 Pine Script™ v3 代码，您将收到错误： 这意味着您不能将加法运算符与布尔值一起使用。要使该示例在 Pine Script™ v3 中运行，您可以执行以下操作：`Cannot call `operator +` with arguments (series__bool, series__bool); <...>`

```javascript
//@version=3
study("My Script")
bton(b) =>
    b ? 1 : 0
s = close >= open
s1 = close[1] >= open[1]
s2 = close[2] >= open[2]
sum = bton(s) + bton(s1) + bton(s2)
col = sum == 1 ? white : sum == 2 ? blue : sum == 3 ? red : na
bgcolor(col)
```

如果您确实需要，函数`bton`（布尔到数字的缩写）可以显式地将任何布尔值转换为数字。