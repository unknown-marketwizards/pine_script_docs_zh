# 条件结构

- [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#introduction)
- `if`结构
  - [`if` 用于它的副作用](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#if-used-for-its-side-effects)
  - [`if` 用于返回一个值](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#if-used-to-return-a-value)
- ‘开关’结构
  - [带有表达式的“switch”](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#switch-with-an-expression)
  - [不带表达式的“switch”](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#switch-without-an-expression)
- [匹配本地块类型要求](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#matching-local-block-type-requirement)



## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#id1)

Pine Script™ 中的条件结构是[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)和 [switch](https://www.tradingview.com/pine-script-reference/v5/#op_switch)。它们可以用于：

- 对于它们的副作用，即当它们不返回值但执行某些操作时，例如将值重新分配给变量或调用函数。
- 返回一个值或一个元组，然后可以将其分配给一个（或多个，如果是元组）变量。

条件结构，如[for](https://www.tradingview.com/pine-script-reference/v5/#op_for) 和[while](https://www.tradingview.com/pine-script-reference/v5/#op_while)结构，可以嵌入；您可以在另一个结构中使用 [if](https://www.tradingview.com/pine-script-reference/v5/#op_if)或 [switch](https://www.tradingview.com/pine-script-reference/v5/#op_switch) 。

某些 Pine Script™ 内置函数无法从条件结构的本地块内调用。它们是： [alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)、 [barcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_barcolor)、 [fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)、 [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)、 [indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)、 [library()](https://www.tradingview.com/pine-script-reference/v5/#fun_library)、 [plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)、 [plotbar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotbar)、 [plotcandle()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle)、 [plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)、 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)、 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)。这并不意味着它们的功能不能通过脚本评估的条件来控制——只是不能通过将它们包含在条件结构中来完成。请注意，虽然`input*.()`本地块中允许函数调用，但它们的功能与脚本全局范围内的功能相同。

条件结构中的局部块必须缩进四个空格或制表符。



## [`if` 结构](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#id2)

### [`if` 用于它的副作用](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#id3)

用于其副作用的[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)结构具有以下语法：

```javascript
if <expression>
    <local_block>
{else if <expression>
    <local_block>}
[else
    <local_block>]
```

在哪里：

- 方括号 ( `[]`) 中的部分可以出现零次或一次，大括号 ( `{}`) 中的部分可以出现零次或多次。
- <表达式> 必须是“bool”类型或者可以自动转换为该类型，这仅适用于“int”或“float”值（请参阅[类型系统](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types)页面）。
- <local_block> 由零个或多个语句组成，后跟一个返回值，该返回值可以是值的元组。它必须缩进四个空格或制表符。
- 可以有零个或多个子句。`else if`
- 可以有零个或一个`else`子句。

[当if](https://www.tradingview.com/pine-script-reference/v5/#op_if)后面的 <expression> 计算结果为[true](https://www.tradingview.com/pine-script-reference/v5/#var_true)时，将执行第一个本地块，[if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 结构的执行结束，并返回在本地块末尾计算的值。

[当if](https://www.tradingview.com/pine-script-reference/v5/#op_if)后面的 <expression> 计算结果为[false](https://www.tradingview.com/pine-script-reference/v5/#var_false)时，将计算后续子句（如果有）。当 one 的 <expression> 计算结果为[true](https://www.tradingview.com/pine-script-reference/v5/#var_true)时，执行其本地块，[if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 结构的执行结束，并返回在本地块末尾计算的值。`else if`

当没有 <expression> 计算为[true](https://www.tradingview.com/pine-script-reference/v5/#var_true) 并且`else`存在子句时，将执行其本地块，[if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 结构的执行结束，并返回在本地块末尾计算的值。

当没有 <expression> 的计算结果为[true](https://www.tradingview.com/pine-script-reference/v5/#var_true) 并且不`else`存在子句时，将返回[na 。](https://www.tradingview.com/pine-script-reference/v5/#var_na)

例如，使用[if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 结构的副作用对于管理策略中的订单流很有用。虽然通常可以使用调用`when`中的参数 来实现相同的功能`strategy.*()`，但使用[if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 结构的代码更易于阅读：

```javascript
if (ta.crossover(source, lower))
    strategy.entry("BBandLE", strategy.long, stop=lower,
                   oca_name="BollingerBands",
                   oca_type=strategy.oca.cancel, comment="BBandLE")
else
    strategy.cancel(id="BBandLE")
```

可以使用 [if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 结构将代码的执行限制在特定的柱上，就像我们在这里将标签的更新限制在图表的最后一个柱上一样：

```javascript
//@version=5
indicator("", "", true)
var ourLabel = label.new(bar_index, na, na, color = color(na), textcolor = color.orange)
if barstate.islast
    label.set_xy(ourLabel, bar_index + 2, hl2[1])
    label.set_text(ourLabel, str.tostring(bar_index + 1, "# bars in chart"))
```

注意：

- `ourLabel`我们仅在脚本的第一个栏上 初始化变量，因为我们使用[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)声明模式。用于初始化变量的值由 [label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)函数调用提供，该函数返回一个指向它创建的标签的标签 ID。我们使用该调用来设置标签的属性，因为一旦设置，它们将持续存在，直到我们更改它们为止。
- 接下来发生的是，在每个连续的柱上，Pine Script™ 运行时将跳过 的初始化`ourLabel`，并评估[if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 结构的条件 ( [barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast) )。它在所有柱上返回`false`，直到最后一个柱，因此脚本在零柱之后的大多数历史柱上不执行任何操作。
- 在最后一个柱上，[barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast) 变为 true 并且结构的本地块执行，在每个图表上修改更新我们的标签的属性，该属性显示数据集中的柱数。
- 我们希望在没有背景的情况下显示标签的文本，因此我们 在[label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)函数调用中将标签的背景设置为[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) ，并用于标签的*y*位置，因为我们不希望它一直移动。通过使用**前一个**柱的[高](https://www.tradingview.com/pine-script-reference/v5/#var_high)值 和[低值](https://www.tradingview.com/pine-script-reference/v5/#var_low)的平均值，标签不会移动，直到下一个实时柱打开。`hl2[1]`
- 我们在[label.set_xy()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_xy)调用中使用 将标签向右偏移两个条。`bar_index + 2`

### [`if` 用于返回一个值](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#id4)

[用于返回一个或多个值的if](https://www.tradingview.com/pine-script-reference/v5/#op_if)结构 具有以下语法：

```javascript
[<declaration_mode>] [<type>] <identifier> = if <expression>
    <local_block>
{else if <expression>
    <local_block>}
[else
    <local_block>]
```

在哪里：

- 方括号 ( `[]`) 中的部分可以出现零次或一次，大括号 ( `{}`) 中的部分可以出现零次或多次。
- <declaration_mode> 是变量的[声明模式](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-declarationmodes)
- <type> 是可选的，就像在几乎所有 Pine Script™ 变量声明中一样（请参阅[types](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types)）
- <identifier> 是变量的[名称](https://www.tradingview.com/pine-script-docs/en/v5/language/Identifiers.html#pageidentifiers)
- <表达式> 可以是文字、变量、表达式或函数调用。
- <local_block> 由零个或多个语句组成，后跟一个返回值，该返回值可以是值的元组。它必须缩进四个空格或制表符。
- 分配给该变量的值是 <local_block> 的返回值， 如果没有执行本地块，则为[na 。](https://www.tradingview.com/pine-script-reference/v5/#var_na)

这是一个例子：

```javascript
//@version=5
indicator("", "", true)
string barState = if barstate.islastconfirmedhistory
    "islastconfirmedhistory"
else if barstate.isnew
    "isnew"
else if barstate.isrealtime
    "isrealtime"
else
    "other"

f_print(_text) =>
    var table _t = table.new(position.middle_right, 1, 1)
    table.cell(_t, 0, 0, _text, bgcolor = color.yellow)
f_print(barState)
```

可以省略*else*块。在这种情况下，如果`condition` 为 false，则会将*空*值（`na`、`false`或`""`）分配给该 `var_declarationX`变量。

这是一个示例，显示 当没有执行本地块时如何返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) 。如果在这里， 则返回[na ：](https://www.tradingview.com/pine-script-reference/v5/#var_na)`close > open``false`

```javascript
x = if close > open
    close
```

脚本可以包含`if`嵌套结构`if`和其他条件结构。例如：

```javascript
if condition1
    if condition2
        if condition3
            expression
```

但是，从性能角度来看，不建议嵌套这些结构。如果可能，通常更优化的做法是使用多个逻辑运算符组成单个`if`语句，而不是多个嵌套`if`块：

```javascript
if condition1 and condition2 and condition3
    expression
```



## [`switch` 结构](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#id5)

开关 结构有两种形式[。](https://www.tradingview.com/pine-script-reference/v5/#op_switch)可以切换键表达式的不同值：

```javascript
[[<declaration_mode>] [<type>] <identifier> = ]switch <expression>
    {<expression> => <local_block>}
    => <local_block>
```

另一种形式不使用表达式作为键；它打开不同表达式的求值：

```javascript
[[<declaration_mode>] [<type>] <identifier> = ]switch
    {<expression> => <local_block>}
    => <local_block>
```

在哪里：

- 方括号 ( `[]`) 中的部分可以出现零次或一次，大括号 ( `{}`) 中的部分可以出现零次或多次。
- <declaration_mode> 是变量的[声明模式](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-declarationmodes)
- <type> 是可选的，就像在几乎所有 Pine Script™ 变量声明中一样（请参阅[types](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types)）
- <identifier> 是变量的[名称](https://www.tradingview.com/pine-script-docs/en/v5/language/Identifiers.html#pageidentifiers)
- <表达式> 可以是文字、变量、表达式或函数调用。
- <local_block> 由零个或多个语句组成，后跟一个返回值，该返回值可以是值的元组。它必须缩进四个空格或制表符。
- 分配给该变量的值是 <local_block> 的返回值， 如果没有执行本地块，则为[na 。](https://www.tradingview.com/pine-script-reference/v5/#var_na)
- 最后的允许您指定一个返回值，该返回值充当结构中没有执行其他情况时使用的默认值。`=> <local_block>`

仅执行[switch](https://www.tradingview.com/pine-script-reference/v5/#op_switch)结构的一个本地块。因此，它是一个不会*因情况而异的**结构化交换机*。因此，声明是不必要的。`break`

这两种形式都可以作为用于初始化变量的值。

与[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)结构一样，如果没有执行任何本地块，则返回[na 。](https://www.tradingview.com/pine-script-reference/v5/#var_na)

### [带有表达式的 `switch` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#id6)

让我们看一个 使用表达式的[switch示例：](https://www.tradingview.com/pine-script-reference/v5/#op_switch)

```javascript
//@version=5
indicator("Switch using an expression", "", true)

string maType = input.string("EMA", "MA type", options = ["EMA", "SMA", "RMA", "WMA"])
int maLength = input.int(10, "MA length", minval = 2)

float ma = switch maType
    "EMA" => ta.ema(close, maLength)
    "SMA" => ta.sma(close, maLength)
    "RMA" => ta.rma(close, maLength)
    "WMA" => ta.wma(close, maLength)
    =>
        runtime.error("No matching MA type found.")
        float(na)

plot(ma)
```

注意：

- 我们要打开的表达式是变量，它是“input int”类型（有关“ [input](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-qualifiers-input)`maType` ”限定符是什么的解释，请参见此处）。由于它在脚本执行期间无法更改，这保证了用户选择的任何 MA 类型都将在每个柱上执行，这是像 [ta.ema()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}ema)这样的函数的要求 ，这些函数需要一个“简单 int”参数作为其参数。`length`
- 如果没有找到 的匹配值`maType`，则[交换机](https://www.tradingview.com/pine-script-reference/v5/#op_switch) 将执行由 引入的最后一个本地块`=>`，该块充当包罗万象的角色。我们在该块中生成运行时错误。我们还以`float(na)`这样的方式结束它，以便本地块返回一个其类型与结构中其他本地块的类型兼容的值，以避免编译错误。

### [不带表达式的 `switch` ](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#id7)

这是不使用表达式的[switch](https://www.tradingview.com/pine-script-reference/v5/#op_switch)结构的示例：

```javascript
//@version=5
strategy("Switch without an expression", "", true)

bool longCondition  = ta.crossover( ta.sma(close, 14), ta.sma(close, 28))
bool shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))

switch
    longCondition  => strategy.entry("Long ID", strategy.long)
    shortCondition => strategy.entry("Short ID", strategy.short)
```

注意：

- 我们使用[开关](https://www.tradingview.com/pine-script-reference/v5/#op_switch) 来选择要发出的适当策略顺序，具体取决于`longCondition`或`shortCondition`“bool”变量是否为`true`。
- `longCondition`和的建筑条件`shortCondition` 是排他性的。虽然它们可以`false`同时存在，但它们不能`true`同时存在。 因此，仅执行[switch结构的](https://www.tradingview.com/pine-script-reference/v5/#op_switch)**一个**本地块这一事实对我们来说不是问题。
- 我们在进入 [switch结构](https://www.tradingview.com/pine-script-reference/v5/#op_switch)**之前评估对**[ta.crossover()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}crossover) 和[ta.crossunder()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}crossunder) 的调用。不这样做（如以下示例所示）将阻止在每个柱上执行函数，这将导致编译器警告和不稳定的行为：

```javascript
//@version=5
strategy("Switch without an expression", "", true)

switch
    // Compiler warning! Will not calculate correctly!
    ta.crossover( ta.sma(close, 14), ta.sma(close, 28)) => strategy.entry("Long ID", strategy.long)
    ta.crossunder(ta.sma(close, 14), ta.sma(close, 28)) => strategy.entry("Short ID", strategy.short)
```



## [匹配本地块类型要求](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#id8)

当结构体中使用多个局部块时，其所有局部块的返回值类型必须匹配。这仅适用于在声明中使用结构体为变量赋值的情况，因为变量只能有一种类型，如果语句在其分支中返回两种不兼容的类型，则无法正确确定变量类型。如果该结构未分配到任何位置，则其分支可以返回不同的值。

这段代码编译得很好，因为[close](https://www.tradingview.com/pine-script-reference/v5/#var_close) 和[open](https://www.tradingview.com/pine-script-reference/v5/#var_open)都是以下类型`float`：

```javascript
x = if close > open
    close
else
    open
```

此代码无法编译，因为第一个本地块返回一个`float`值，而第二个本地块返回 a `string`，并且 - 语句的结果`if`分配给`x`变量：

```javascript
// Compilation error!
x = if close > open
    close
else
    "open"
```