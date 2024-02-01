# 变量声明

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#id1)

变量是保存值的[标识符](https://www.tradingview.com/pine-script-docs/en/v5/language/Identifiers.html#pageidentifiers)。在使用之前，必须在代码中对它们进行*声明*。变量声明的语法如下：

```javascript
[<declaration_mode>] [<type>] <identifier> = <expression> | <structure>
```

或者

```javascript
<tuple_declaration> = <function_call> | <structure>
```

其中：

- `|` 表示“或”，方括号 (`[]`) 中的部分可以出现零次或一次。
- `<declaration_mode>` 是变量的[声明模式](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-declarationmodes)。可以是 [var](https://www.tradingview.com/pine-script-reference/v5/#op_var) 或 [varip](https://www.tradingview.com/pine-script-reference/v5/#op_varip)，或者为空。
- `<type>` 是可选的，几乎所有 Pine Script™ 变量声明都是可选的（参见[类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types)）。
- `<identifier>` 是变量的[名称](https://www.tradingview.com/pine-script-docs/en/v5/language/Identifiers.html#pageidentifiers)。
- `<expression>` 可以是文字、变量、表达式或函数调用。
- `<structure>` 可以是 [if](https://www.tradingview.com/pine-script-reference/v5/#op_if)、[for](https://www.tradingview.com/pine-script-reference/v5/#op_for)、[while](https://www.tradingview.com/pine-script-reference/v5/#op_while) 或 [switch](https://www.tradingview.com/pine-script-reference/v5/#op_switch) *结构*。
- `<tuple_declaration>` 是用方括号 (`[]`) 括起的以逗号分隔的变量名称列表，例如 `[ma, upperBand, lowerBand]`。

以下是所有有效的变量声明。最后一个需要四行：

```javascript
BULL_COLOR = color.lime
i = 1
len = input(20, "Length")
float f = 10.5
closeRoundedToTick = math.round_to_mintick(close)
st = ta.supertrend(4, 14)
var barRange = float(na)
var firstBarOpen = open
varip float lastClose = na
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)
plotColor = if close > open
    color.green
else
    color.red
```

注意

上述语句都包含 `=` 赋值运算符，因为它们是**变量声明**。当看到类似的行使用 [:=](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-reassignmentoperator) 重新分配运算符时，代码正在**重新分配**一个已经**已经声明**的变量的值。这是对 Pine Script™ 新手来说常见的障碍，请确保您理解这个区别。详细信息请参阅下一个[变量重新分配](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-variablereassignment)部分。

变量声明的形式语法为：

```javascript
<variable_declaration>
    [<declaration_mode>] [<type>] <identifier> = <expression> | <structure>
    |
    <tuple_declaration> = <function_call> | <structure>

<declaration_mode>
    var | varip

<type>
    int | float | bool | color | string | line | linefill | label | box | table | array<type> | matrix<type> | UDF
```

### [使用 `na` 进行初始化](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#id2)

在大多数情况下，显式类型声明是多余的，因为类型会在编译时从等号右边的值中自动推断出来，所以使用它们通常是个人喜好的问题。例如：

```javascript
baseLine0 = na          // 编译时错误！
float baseLine1 = na    // OK
baseLine2 = float(na)   // OK
```

在示例的第一行中，编译器无法确定 `baseLine0` 变量的类型，因为 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na) 是一个没有特定类型的通用值。`baseLine1` 变量的声明是正确的，因为显式声明了其 [float](https://www.tradingview.com/pine-script-reference/v5/#op_float) 类型。`baseLine2` 变量的声明也是正确的，因为其类型可以从表达式 `float(na)` 推导出来，这是 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na) 值到 [float](https://www.tradingview.com/pine-script-reference/v5/#op_float) 类型的显式转换。`baseLine1` 和 `baseLine2` 的声明是等价的。

### [元组声明](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#id3)

函数调用或结构允许返回多个值。当我们调用它们并想要存储它们返回的值时，必须使用*元组声明*，它是由括号括起的一个或多个值的逗号分隔集合。这允许我们同时声明多个变量。例如，用于 Bollinger 带的内置函数 [ta.bb()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}bb) 返回三个值：

```javascript
[bbMiddle, bbUpper, bbLower] = ta.bb(close, 5, 4)
```

## [ 变量重新分配](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#id4)

变量重新分配是使用 [:=](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-reassignmentoperator) 重新分配运算符完成的。只能在变量首次声明并赋予初始值之后进行重新分配。在计算中经常需要重新分配一个变量的新值，当一个全局作用域中的变量需要从结构的本地块内赋予新值时，这是必需的。例如：

```javascript
//@version=5
indicator("", "", true)
sensitivityInput = input.int(2, "Sensitivity", minval = 1, tooltip = "Higher values make color changes less sensitive.")
ma = ta.sma(close, 20)
maUp = ta.rising(ma, sensitivityInput)
maDn = ta.falling(ma, sensitivityInput)

// 仅在第一根K线上，将颜色初始化为灰色
var maColor = color.gray
if maUp
    // MA 上涨了两根K线; 将其设为绿色。
    maColor := color.lime
else if maDn
    // MA 下跌了两根K线; 将其设为品红色。
    maColor := color.fuchsia

plot(ma, "MA", maColor, 2)
```

注意：

- 我们仅在第一根K线上初始化 `maColor`，因此它在各个K线之间保持其值不变。
- 在每根K线上，[if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 语句检查MA是否在用户指定的K线数（默认为2）上涨或下跌。当发生这种情况时，必须使用 [if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 本地块内的新值重新分配 `maColor` 的值。为此，我们使用了 [:=](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-reassignmentoperator) 重新分配运算符。
- 如果不使用 [:=](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-reassignmentoperator)，效果将是初始化一个新的 `maColor` 本地变量，该变量与全局作用域的同名变量相同，但实际上是一个非常令人困惑的独立实体，仅在本地块的长度内存在，然后在没有痕迹的情况下消失。

在 Pine Script™ 中，所有用户定义的变量都是*可变的*，这意味着它们的值可以使用 [:=](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-reassignmentoperator) 重新分配运算符进行更改。在一根K线上，一个变量可以被分配新值多次，因此一个脚本可以包含对一个变量的任意次数的重新分配。变量的[声明模式](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-declarationmodes)决定了如何保存分配给变量的新值。

## [声明模式](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#id5)

理解声明模式对变量行为的影响需要先了解 Pine Script™ 的[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)。

当声明变量时，如果指定了声明模式，它必须首先出现。可以使用三种模式：

- 在没有指定时是“每根K线”，即没有使用 [var](https://www.tradingview.com/pine-script-reference/v5/#op_var) 或 [varip](https://www.tradingview.com/pine-script-reference/v5/#op_varip) 关键字。
- [var](https://www.tradingview.com/pine-script-reference/v5/#op_var)
- [varip](https://www.tradingview.com/pine-script-reference/v5/#op_varip)

### [每根K线](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#id6)

当没有显式声明模式时，即没有使用 [var](https://www.tradingview.com/pine-script-reference/v5/#op_var) 或 [varip](https://www.tradingview.com/pine-script-reference/v5/#op_varip) 关键字时，该变量会在每根K线上进行声明和初始化，例如，此页面介绍的第一组示例中的以下声明：

```javascript
BULL_COLOR = color.lime
i = 1
len = input(20, "Length")
float f = 10.5
closeRoundedToTick = math.round_to_mintick(close)
st = ta.supertrend(4, 14)
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)
plotColor = if close > open
    color.green
else
    color.red
```

### [`var`](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#id7)

当使用 [var](https://www.tradingview.com/pine-script-reference/v5/#op_var) 关键字时，变量仅在第一根K线上初始化，如果声明在全局作用域中，或者在局部块中的声明在执行局部块的第一次时。之后，它将保持其在连续的K线上的最后一个值，直到我们重新分配新值给它。这种行为在许多情况下都很有用，其中变量的值必须在脚本在连续的K线上的迭代中保持不变。例如，假设我们想要统计图表上绿色K线的数量：

```javascript
//@version=5
indicator("绿色K线计数")
var count = 0
isGreen = close >= open
if isGreen
    count := count + 1
plot(count)
```

如果没有 `var` 修饰符，变量 `count` 将在每次新的K线触发脚本重新计算时重置为零，从而丢失其值。

```javascript
if isGreen
    count := count + 1
plot(count)
```

![../_images/VariableDeclarations-GreenBarsCount.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/VariableDeclarations-GreenBarsCount.png)

使用 `var` 修饰符，`count` 将保持在连续K线上的最后一个值，不会在每次脚本重新计算时重置为零。

```javascript
//@version=5
indicator("绿色K线计数")
var count = 0
isGreen = close >= open
if isGreen
    count := count + 1
plot(count)
```

这样，`count` 的值将在每个新K线上追踪绿色K线的数量。这种行为在许多场景中很有用，例如跟踪满足某些条件的事件发生的次数。

### [`varip`](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#id8)

理解使用 `varip` 声明模式的变量行为需要先了解 Pine Script™ 的[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)和[栏状态](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#pagebarstates)。

`varip` 关键字可用于声明变量，这些变量逃离*回滚过程*，这在 Pine Script™ 的[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)页面中有解释。

虽然脚本仅在历史K线的收盘时执行一次，但在实时运行时，每当图表的数据源检测到价格或成交量更新时，脚本就会执行一次。在每个实时更新时，Pine Script™ 的运行时通常会将脚本变量的值重置为它们的上一个提交的值，即在前一根K线关闭时它们的值。这通常很方便，因为每个实时脚本执行都从一个已知状态开始，从而简化了脚本逻辑。

然而，有时脚本逻辑要求代码能够在实时K线的不同执行之间保存变量值。使用 `varip` 声明变量使这成为可能。`varip` 中的 "ip" 代表 *intrabar persist*。

让我们看看以下的代码，它不使用 `varip`：

```javascript
//@version=5
indicator("")
int updateNo = na
if barstate.isnew
    updateNo := 1
else
    updateNo := updateNo + 1

plot(updateNo, style = plot.style_circles)
```

在历史K线上，[barstate.isnew](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isnew) 总是为 `true`，因此绘图显示值为 "1"，因为 [if](https://www.tradingview.com/pine-script-reference/v5/#op_if) 结构的 `else` 部分永远不会执行。在实时K线上，只有当脚本首次在K线的“开盘”上执行时，[barstate.isnew](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isnew) 才为 [true](https://www.tradingview.com/pine-script-reference/v5/#var_true)。然后，绘图将会短暂地显示 "1"，直到后续执行发生。在实时脚本执行的后续执行期间，[barstate.isnew](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isnew) 不再为 `true`。由于 `updateNo` 在每次执行时都初始化为 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，`updateNo + 1` 表达式将产生 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，因此在脚本的后续实时执行中不会绘制任何内容。

现在，如果我们使用 `varip` 来声明 `updateNo` 变量，脚本的行为将大不相同：

```javascript
//@version=5
indicator("")
varip int updateNo = na
if barstate.isnew
    updateNo := 1
else
    updateNo := updateNo + 1

plot(updateNo, style = plot.style_circles)
```

现在的区别在于 `updateNo` 跟踪每个实时K线上发生的实时更新次数。这是可能的，因为 `varip` 声明允许 `updateNo` 的值在实时更新之间保持，不再在脚本的每次实时执行时被回滚。对 [barstate.isnew](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isnew) 的测试允许我们在新的实时K线到来时重置更新计数。

由于 `varip` 仅影响脚本在实时K线上的行为，因此基于 `varip` 变量的逻辑设计的策略的回测结果将无法在历史K线上重现该行为，这将使其在测试结果上失效。这也意味着在历史K线上，图表将无法复现脚本在实时执行时的行为。