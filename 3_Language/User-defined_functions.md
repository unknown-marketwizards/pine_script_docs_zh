# 用户自定义函数

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#id1)

用户定义函数是您编写的函数，与 Pine Script™ 中的内置函数不同。它们对于定义必须重复执行的计算或想要与脚本的主要计算部分隔离的计算非常有用。当没有内置函数可以满足您的需要时，请将用户定义的函数视为扩展 Pine Script™ 功能的一种方式。

您可以通过两种方式编写函数：

- 在一行中，当它们很简单时，或者
- 在多行上

函数可以位于两个地方：

- 如果某个函数仅在一个脚本中使用，您可以将其包含在使用该函数的脚本中。有关在脚本中放置函数的位置的建议，请参阅我们的[样式指南。](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#pagestyleguide-functiondeclarations)
- 您可以创建一个 Pine Script™[库](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#pagelibraries)来包含您的函数，这使得它们可以在其他脚本中重用，而无需复制其代码。对库函数存在不同的要求。它们在[库](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#pagelibraries)页面中进行了解释。

无论使用一行还是多行，用户定义函数都具有以下特征：

- 它们无法嵌入。所有函数都在脚本的全局范围内定义。
- 他们不支持递归。不允许函数从自己的代码中调用自身**。**
- 函数返回值的类型是自动确定的，并且取决于每个特定函数调用中使用的参数类型。
- 函数的返回值是函数体中的最后一个值。
- 脚本中函数调用的每个实例都维护其自己独立的历史记录。

## [单行函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#id2)

简单的函数通常可以用一行编写。这是单行函数的正式定义：

```
Pine Script™
Copied<function_declaration>
    <identifier>(<parameter_list>) => <return_value>

<parameter_list>
    {<parameter_definition>{, <parameter_definition>}}

<parameter_definition>
    [<identifier> = <default_value>]

<return_value>
    <statement> | <expression> | <tuple>
```

这是一个例子：

```
Pine Script™
Copiedf(x, y) => x + y
```

声明函数后`f()`，可以使用不同类型的参数调用它：

```
Pine Script™
Copieda = f(open, close)
b = f(2, 2)
c = f(open, 2)
```

在上面的示例中，变量的类型`a`是*Series*，因为参数都是*series*。变量的类型`b`是*整数*，因为参数都是*文字整数*。变量的类型`c`是*系列，因为**系列*和*文字整数*相加会产生*系列*结果。

## [多行函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#id3)

Pine Script™ 还支持具有以下语法的多行函数：

```
Pine Script™
Copied<identifier>(<parameter_list>) =>
    <local_block>

<identifier>(<list of parameters>) =>
    <variable declaration>
    ...
    <variable declaration or expression>
```

在哪里：

```
Pine Script™
Copied<parameter_list>
    {<parameter_definition>{, <parameter_definition>}}

<parameter_definition>
    [<identifier> = <default_value>]
```

多行函数的主体由多个语句组成。每条语句都放在单独的行上，并且前面必须有 1 个缩进（4 个空格或 1 个制表符）。语句之前的缩进表明它是函数体的一部分，而不是脚本全局范围的一部分。在函数代码之后，第一个没有缩进的语句表示函数体已经结束。

表达式或声明的变量应该是函数体的最后一条语句。该表达式（或变量）的结果将是函数调用的结果。例如：

```
Pine Script™
Copiedgeom_average(x, y) =>
    a = x*x
    b = y*y
    math.sqrt(a + b)
```

该函数`geom_average`有两个参数，并在主体中创建两个变量：`a`和`b`。最后一条语句调用该函数`math.sqrt` （提取平方根）。该`geom_average`调用将返回最后一个表达式的值：。`(math.sqrt(a + b))`

## [脚本中的范围](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#id4)

在函数体或其他局部块之外声明的变量属于*全局*范围。用户声明的函数和内置函数以及内置变量也属于全局范围。

每个函数都有自己的*局部*作用域。函数内声明的所有变量以及函数的参数都属于该函数的作用域，这意味着不可能从外部引用它们——例如，从全局作用域或另一个函数的局部作用域。

另一方面，由于可以从函数作用域引用全局作用域中声明的任何变量或函数（自引用递归调用除外），因此可以说局部作用域嵌入到全局作用域中。

在 Pine Script™ 中，不允许嵌套函数，即一个函数不能在另一个函数内声明一个函数。所有用户函数都在全局范围内声明。局部作用域不能相互交叉。

## [返回多个结果的函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#id5)

在大多数情况下，函数仅返回一个结果，但可以返回结果列表（类似*元组*的结果）：

```
Pine Script™
Copiedfun(x, y) =>
    a = x+y
    b = x-y
    [a, b]
```

调用此类函数需要特殊语法：

```
Pine Script™
Copied[res0, res1] = fun(open, close)
plot(res0)
plot(res1)
```

## [限制](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#id6)

用户定义的函数可以使用任何 Pine Script™ 内置函数，除了： [barcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_barcolor)、 [fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)、 [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)、 [Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)、 [library()](https://www.tradingview.com/pine-script-reference/v5/#fun_library)、 [plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)、 [plotbar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotbar)、 [plotcandle()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle)、 [plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)、 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)和 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)。