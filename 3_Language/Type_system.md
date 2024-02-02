# 类型系统[¶](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#type-system)

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id1)

Pine Script™ 类型系统确定脚本值与各种函数和操作的兼容性。虽然在不了解类型系统的情况下也可以编写简单的脚本，但要达到一定程度的语言熟练程度，必须对其有合理的理解，并且深入了解其微妙之处将使您能够充分利用其潜力。

Pine Script™ 使用[类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types)对所有值进行分类，并使用 [限定符](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-qualifiers)来确定值是恒定的、在第一次脚本迭代时建立的还是在整个脚本执行过程中动态的。该系统适用于所有 Pine 值，包括来自文字、变量、表达式、函数返回和函数参数的值。

类型系统与 Pine 的[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel) 和[时间序列](https://www.tradingview.com/pine-script-docs/en/v5/language/Time_series.html#pagetimeseries)概念紧密相连。了解这三者对于充分利用 Pine Script™ 的强大功能至关重要。

笔记

为了简洁起见，我们经常使用“类型”来指代“限定类型”。



## [限定词](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id2)

Pine Script™*限定符*标识何时可以在脚本执行中访问某个值：

- [限定为const](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-qualifiers-const)的值是在编译时建立的（即，在 Pine 编辑器中保存脚本或将其添加到图表时）。
- [符合输入](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-qualifiers-input)条件的值在输入时可用（即，当更改脚本的“设置/输入”选项卡中的值时）。
- 限定为[简单的](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-qualifiers-simple)值在零小节（脚本执行的第一个小节）处建立。
- [作为系列](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-qualifiers-series)限定的值可以在脚本执行过程中发生变化。

Pine Script™ 将类型限定符的主导地位建立在以下层次结构上：**const < input < simple < series**，其中“const”是*最弱的*限定符，“series”是*最强的*。限定符层次结构转化为以下规则：每当变量、函数或操作与特定限定类型兼容时， 也允许具有*较弱限定符的值。*

脚本始终根据计算中的主要限定符限定其表达式的返回值。例如，计算涉及“const”和“series”值的表达式将返回限定为“series”的值。此外，脚本无法将值的限定符更改为层次结构中较低的限定符。如果一个值获得更强的限定符（例如，最初推断为“简单”的值在脚本执行的后期变成“系列”），则该状态是不可逆的。

请注意，只有限定为“系列”的值可以在脚本执行过程中发生变化，其中包括来自各种内置函数的值，例如[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)和 [volume](https://www.tradingview.com/pine-script-reference/v5/#var_volume)，以及涉及“系列”值的任何操作的结果。限定为“const”、“input”或“simple”的值在整个脚本执行过程中是一致的。



### [常量](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id3)

限定为“const”的值是在*编译时*、脚本开始执行之前建立的。当在 Pine 编辑器中保存脚本时，最初会发生编译，这不需要它在图表上运行。带有“const”限定符的值在脚本迭代之间永远不会改变，甚至在其执行的初始栏上也不会改变。

脚本可以通过使用*文字*值或从仅使用文字值或其他限定为“const”的变量的表达式计算值来将值限定为“const”。

这些是文字值的示例：

- *字面量 int* : `1`, `-1`,`42`
- *字面浮点数*：`1.`, `1.0`, `3.14`, `6.02E-23`,`3e8`
- *文字布尔*：`true`，`false`
- *字面颜色*：`#FF55C6`,`#FF55C6ff`
- *文字字符串*: , ,`"A text literal"``"Embedded single quotes 'text'"``'Embedded double quotes "text"'`

`const`用户可以通过在声明中包含关键字来显式定义仅接受“const”值的变量和参数。

我们的[风格指南](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#pagestyleguide)建议使用大写的 SNAKE_CASE 来命名“const”变量以提高可读性。虽然这不是必需的，但在声明“const”变量时也可以使用[var](https://www.tradingview.com/pine-script-reference/v5/#kw_var) 关键字，以便脚本仅在数据集的*第一个柱上*初始化它们。请参阅我们的用户手册的[这一部分](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-var)以获取更多信息。

[下面是一个在indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator) 和[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)函数中使用“const”值的示例，这两个函数都需要“const string”限定类型的值作为它们的`title`参数：

```
Pine Script™
Copied//@version=5

// The following global variables are all of the "const string" qualified type:

//@variable The title of the indicator.
INDICATOR_TITLE = "const demo"
//@variable The title of the first plot.
var PLOT1_TITLE = "High"
//@variable The title of the second plot.
const string PLOT2_TITLE = "Low"
//@variable The title of the third plot.
PLOT3_TITLE = "Midpoint between " + PLOT1_TITLE + " and " + PLOT2_TITLE

indicator(INDICATOR_TITLE, overlay = true)

plot(high, PLOT1_TITLE)
plot(low, PLOT2_TITLE)
plot(hl2, PLOT3_TITLE)
```

以下示例将引发编译错误，因为它使用 [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo.ticker)，它返回一个“简单”值，因为它依赖于只有在脚本开始执行后才能访问的图表信息：

```
Pine Script™
Copied//@version=5

//@variable The title in the `indicator()` call.
var NAME = "My indicator for " + syminfo.ticker

indicator(NAME, "", true) // Causes an error because `NAME` is qualified as a "simple string".
plot(close)
```



### [输入](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id4)

限定为“输入”的值是在通过`input.*()`函数初始化后建立的。这些函数生成的值用户可以在脚本设置的“输入”选项卡中进行修改。当更改此选项卡中的任何值时，脚本将从图表历史记录的开头重新执行，以确保其输入值在整个执行过程中保持一致。

笔记

input.source [()](https://www.tradingview.com/pine-script-reference/v5/#fun_input.source)函数是命名空间中的一个例外`input.*()`，因为它返回“系列”限定值而不是“输入”，因为内置变量（例如 [open](https://www.tradingview.com/pine-script-reference/v5/#var_open)、 [close](https://www.tradingview.com/pine-script-reference/v5/#var_close)等）以及来自另一个脚本绘图的值，被称为“系列”。

以下脚本绘制了和上下文`sourceInput`中a 的值。 request.security [()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)调用在此脚本中有效，因为它的和参数允许“简单字符串”参数，这意味着它们也可以接受“输入字符串”值，因为“输入”限定符在层次结构中*较低：*`symbolInput``timeframeInput``symbol``timeframe`

```
Pine Script™
Copied//@version=5
indicator("input demo", overlay = true)

//@variable The symbol to request data from. Qualified as "input string".
symbolInput = input.symbol("AAPL", "Symbol")
//@variable The timeframe of the data request. Qualified as "input string".
timeframeInput = input.timeframe("D", "Timeframe")
//@variable The source of the calculation. Qualified as "series float".
sourceInput = input.source(close, "Source")

//@variable The `sourceInput` value from the requested context. Qualified as "series float".
requestedSource = request.security(symbolInput, timeframeInput, sourceInput)

plot(requestedSource)
```



### [简单的](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id5)

仅当脚本开始在其历史记录的*第一个*图表条上执行时，限定为“简单”的值才可用，并且它们在脚本执行期间保持一致。

`simple`用户可以通过在声明中包含关键字来显式定义接受“简单”值的变量和参数。

许多内置变量返回“简单”限定值，因为它们依赖于脚本只有在开始执行后才能获取的信息。此外，许多内置函数需要不随时间变化的“简单”参数。只要脚本允许“简单”值，它也可以接受限定为“输入”或“const”的值。

此脚本突出显示背景以警告用户他们正在使用非标准图表类型。它使用[chart.is_standard](https://www.tradingview.com/pine-script-reference/v5/#var_chart.is_standard)的值 来计算 `isNonStandard`变量，然后使用该变量的值来计算`warningColor`也引用“简单”值的a。[bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor)`color`的参数允许 “系列颜色”参数，这意味着它也可以接受“简单颜色”值，因为“简单”在层次结构中较低：

```
Pine Script™
Copied//@version=5
indicator("simple demo", overlay = true)

//@variable Is `true` when the current chart is non-standard. Qualified as "simple bool".
isNonStandard = not chart.is_standard
//@variable Is orange when the the current chart is non-standard. Qualified as "simple color".
simple color warningColor = isNonStandard ? color.new(color.orange, 70) : na

// Colors the chart's background to warn that it's a non-standard chart type.
bgcolor(warningColor, title = "Non-standard chart color")
```



### [系列](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id6)

限定为“系列”的值在脚本中提供了最大的灵活性，因为它们可以在任何柱上更改，甚至在同一柱上多次更改。

`series`用户可以通过在声明中包含关键字来显式定义接受“系列”值的变量和参数。

内置变量（例如[open](https://www.tradingview.com/pine-script-reference/v5/#var_open)、 [high](https://www.tradingview.com/pine-script-reference/v5/#var_high)、 [low](https://www.tradingview.com/pine-script-reference/v5/#var_low)、 [close](https://www.tradingview.com/pine-script-reference/v5/#var_close)、 [Volume](https://www.tradingview.com/pine-script-reference/v5/#var_volume)、 [time](https://www.tradingview.com/pine-script-reference/v5/#var_time)和 [bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)）以及使用此类内置变量的任何表达式的结果都被限定为“系列”。返回动态值的任何函数或操作的结果将始终是一个“系列”，使用历史引用运算符[[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[])访问历史值的结果也是如此。只要脚本允许使用“series”值，它也将接受带有任何其他限定符的值，因为“series”是 层次结构中的*最高限定符。*

此脚本显示 上方柱线的[最高](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.highest) 和[最低](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.lowest)值。分配给和变量的值是“series float”限定类型，因为它们可以在脚本执行过程中发生变化：`sourceInput``lengthInput``highest``lowest`

```
Pine Script™
Copied//@version=5
indicator("series demo", overlay = true)

//@variable The source value to calculate on. Qualified as "series float".
series float sourceInput = input.source(close, "Source")
//@variable The number of bars in the calculation. Qualified as "input int".
lengthInput = input.int(20, "Length")

//@variable The highest `sourceInput` value over `lengthInput` bars. Qualified as "series float".
series float highest = ta.highest(sourceInput, lengthInput)
//@variable The lowest `sourceInput` value over `lengthInput` bars. Qualified as "series float".
lowest = ta.lowest(sourceInput, lengthInput)

plot(highest, "Highest source", color.green)
plot(lowest, "Lowest source", color.red)
```



## [类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id7)

Pine Script™*类型*对值进行分类并确定它们兼容的函数和操作。他们包括：

- 基本类型：[int](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-int)、[float](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-float)、 [bool](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-bool)、[color](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-color)和[string](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-string)
- 特殊类型：[plot](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-plotandhline)、[hline](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-plotandhline)、 [line](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、[linefill](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、 [box](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、[polyline](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、 [label](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、[table](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、 [chart.point](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)、[array](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-collections)、 [matrix](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-collections)和[map](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-collections)
- [用户定义类型 (UDT)](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)
- [空白](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-void)

基本类型是指值的基本性质，例如，值 1 属于“int”类型，1.0 属于“float”类型，“AAPL”属于“string”类型等。特殊类型和用户定义的类型使用 引用特定类的对象的*ID* 。例如，“label”类型的值包含一个 ID，充当引用“label”对象的*指针*。 “void”类型是指不返回可用值的函数或 [方法的输出。](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)

Pine Script™ 可以自动将某些类型的值转换为其他类型。自动转换规则为： **int → float → bool**。有关详细信息，请参阅本页的[类型转换部分。](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-typecasting)

在大多数情况下，Pine Script™ 可以自动确定值的类型。但是，我们还可以使用 type 关键字显式 *指定*类型，以提高可读性和需要显式定义的代码（例如，声明分配给 [na 的](https://www.tradingview.com/pine-script-reference/v5/#var_na)变量）。例如：

```
Pine Script™
Copied//@version=5
indicator("Types demo", overlay = true)

//@variable A value of the "const string" type for the `ma` plot's title.
string MA_TITLE = "MA"

//@variable A value of the "input int" type. Controls the length of the average.
int lengthInput = input.int(100, "Length", minval = 2)

//@variable A "series float" value representing the last `close` that crossed over the `ma`.
var float crossValue = na

//@variable A "series float" value representing the moving average of `close`.
float ma = ta.sma(close, lengthInput)
//@variable A "series bool" value that's `true` when the `close` crosses over the `ma`.
bool crossUp = ta.crossover(close, ma)
//@variable A "series color" value based on whether `close` is above or below its `ma`.
color maColor = close > ma ? color.lime : color.fuchsia

// Update the `crossValue`.
if crossUp
    crossValue := close

plot(ma, MA_TITLE, maColor)
plot(crossValue, "Cross value", style = plot.style_circles)
plotchar(crossUp, "Cross Up", "▲", location.belowbar, size = size.small)
```



### [整数](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id8)

“int”类型的值表示整数，即没有任何小数的整数。

*整数文字是以十进制*表示法编写的数值。例如：

```
Pine Script™
Copied1
-1
750
```

[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)、 [time](https://www.tradingview.com/pine-script-reference/v5/#var_time)、 [timenow](https://www.tradingview.com/pine-script-reference/v5/#var_timenow)、 [dayofmonth](https://www.tradingview.com/pine-script-reference/v5/#var_dayofmonth)和 [Strategy.wintrades](https://www.tradingview.com/pine-script-reference/v5/#var_strategy.wintrades)等内置变量 均返回“int”类型的值。



### [漂浮](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id9)

“float”类型的值表示浮点数，即可以包含整数和小数的数字。

浮点文字是用`.`分隔符编写的数值。它们还可能包含符号`e`or `E`（这意味着“10 的 X 次方”，其中 X 是 `e`or`E`符号后面的数字）。例如：

```
Pine Script™
Copied3.14159    // Rounded value of Pi (π)
- 3.0
6.02e23    // 6.02 * 10^23 (a very large value)
1.6e-19    // 1.6 * 10^-19 (a very small value)
```

Pine Script™ 中“浮点”值的内部精度为 1e-16。

[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)、 [hlcc4](https://www.tradingview.com/pine-script-reference/v5/#var_hlcc4)、 [volume](https://www.tradingview.com/pine-script-reference/v5/#var_volume)、 [ta.vwap](https://www.tradingview.com/pine-script-reference/v5/#var_ta.vwap)和 [strategy.position_size](https://www.tradingview.com/pine-script-reference/v5/#var_strategy.position_size)等内置变量 均返回“float”类型的值。



### [布尔](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id10)

“bool”类型的值表示比较或条件的真值，脚本可以在[条件结构](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#pageconditionalstructures)和其他表达式中使用它。

只有两个文字表示布尔值：

```
Pine Script™
Copiedtrue    // true value
false   // false value
```

当“bool”类型的表达式返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)时，脚本将其值视为`false`评估条件语句和运算符时的值。

内置变量如 [barstate.isfirst](https://www.tradingview.com/pine-script-reference/v5/#var_barstate.isfirst)、 [Chart.is_heikinashi](https://www.tradingview.com/pine-script-reference/v5/#var_chart.is_heikinashi)、 [session.ismarket](https://www.tradingview.com/pine-script-reference/v5/#var_session.ismarket)和 [timeframe.isdaily](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe.isdaily)都返回“bool”类型的值。



### [颜色](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id11)

颜色文字具有以下格式：`#RRGGBB`或`#RRGGBBAA`。字母对代表 和之间的*十六进制*值（十进制 0 到 255），其中：`00``FF`

- `RR`、`GG`和`BB`对分别表示颜色的红色、绿色和蓝色分量的值。
- `AA`是颜色不透明度（或*alpha*分量）的可选值，其中`00`不可见且`FF`不透明。当文字不包含对时`AA`，脚本将其视为完全不透明（与 using 相同`FF`）。
- 文字中的十六进制字母可以是大写或小写。

这些是“颜色”文字的示例：

```
Pine Script™
Copied#000000      // black color
#FF0000      // red color
#00FF00      // green color
#0000FF      // blue color
#FFFFFF      // white color
#808080      // gray color
#3ff7a0      // some custom color
#FF000080    // 50% transparent red color
#FF0000ff    // same as #FF0000, fully opaque red color
#FF000000    // completely transparent red color
```

Pine Script™ 还具有[内置颜色常量](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#pagecolors-constantcolors)，包括 [color.green](https://www.tradingview.com/pine-script-reference/v5/#var_color{dot}green)、 [color.red](https://www.tradingview.com/pine-script-reference/v5/#var_color{dot}red)、 [color.orange](https://www.tradingview.com/pine-script-reference/v5/#var_color{dot}orange)、 [color.blue](https://www.tradingview.com/pine-script-reference/v5/#var_color{dot}blue) （函数中的默认颜色以及[绘图类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)`plot*()`中许多默认的与颜色相关的属性 ）等。

当使用内置颜色常量时，可以通过 [color.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_color.new)函数向它们添加透明度信息。

请注意，在`color.*()`函数中指定红色、绿色或蓝色分量时，我们使用“int”或“float”参数，其值介于 0 到 255 之间。指定透明度时，我们使用介于 0 到 100 之间的值，其中 0 表示完全不透明，100 表示完全不透明。意思是完全透明。例如：

```
Pine Script™
Copied//@version=5
indicator("Shading the chart's background", overlay = true)

//@variable A "const color" value representing the base for each day's color.
color BASE_COLOR = color.rgb(0, 99, 165)

//@variable A "series int" value that modifies the transparency of the `BASE_COLOR` in `color.new()`.
int transparency = 50 + int(40 * dayofweek / 7)

// Color the background using the modified `BASE_COLOR`.
bgcolor(color.new(BASE_COLOR, transparency))
```

有关在脚本中使用颜色的更多信息，请参阅用户手册中有关颜色的页面[。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#pagecolors)



### [细绳](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id12)

“字符串”类型的值表示字母、数字、符号、空格和其他字符的序列。

Pine 中的字符串文字是用单引号或双引号括起来的字符。例如：

```
Pine Script™
Copied"This is a string literal using double quotes."
'This is a string literal using single quotes.'
```

单引号和双引号在 Pine Script™ 中的功能是等效的。双引号内的“字符串”可以包含任意数量的单引号，反之亦然：

```
Pine Script™
Copied"It's an example"
'The "Star" indicator'
```

脚本可以使用反斜杠字符 ( ) 对“字符串”中的封闭分隔符*进行转义*`\`。例如：

```
Pine Script™
Copied'It\'s an example'
"The \"Star\" indicator"
```

我们可以创建包含新行转义字符 () 的“字符串”值，用于使用[绘图类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)的函数和对象显示`\n`多行文本。例如：`plot*()``log.*()`

```
Pine Script™
Copied"This\nString\nHas\nOne\nWord\nPer\nLine"
```

我们可以使用[+](https://www.tradingview.com/pine-script-reference/v5/#op_+)运算符来连接“字符串”值：

```
Pine Script™
Copied"This is a " + "concatenated string."
```

命名空间中的内置函数`str.*()`使用专门的操作创建“字符串”值。例如，此脚本创建一个*格式化字符串*来表示“浮动”价格值，并使用标签显示结果：

```
Pine Script™
Copied//@version=5
indicator("Formatted string demo", overlay = true)

//@variable A "series string" value representing the bar's OHLC data.
string ohlcString = str.format("Open: {0}\nHigh: {1}\nLow: {2}\nClose: {3}", open, high, low, close)

// Draw a label containing the `ohlcString`.
label.new(bar_index, high, ohlcString, textcolor = color.white)
```

有关显示脚本中“字符串”值的更多信息，请参阅我们的用户手册中有关[文本和形状的页面。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#pagetextandshapes)

[syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo.tickerid)、 [syminfo.currency](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo.currency)和 [timeframe.period](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe.period)等内置变量 返回“string”类型的值。



### [绘图和水平线](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id13)

Pine Script™ 的[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)和 [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)函数返回分别引用“plot”和“hline”类型实例的ID。这些类型在图表上显示计算值和水平水平，并且可以将它们的 ID 分配给变量以与内置 [fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)函数一起使用。

例如，此脚本在图表上绘制两个 EMA，并使用 [fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)函数填充它们之间的空间：

```
Pine Script™
Copied//@version=5
indicator("plot fill demo", overlay = true)

//@variable A "series float" value representing a 10-bar EMA of `close`.
float emaFast = ta.ema(close, 10)
//@variable A "series float" value representing a 20-bar EMA of `close`.
float emaSlow = ta.ema(close, 20)

//@variable The plot of the `emaFast` value.
emaFastPlot = plot(emaFast, "Fast EMA", color.orange, 3)
//@variable The plot of the `emaSlow` value.
emaSlowPlot = plot(emaSlow, "Slow EMA", color.gray, 3)

// Fill the space between the `emaFastPlot` and `emaSlowPlot`.
fill(emaFastPlot, emaSlowPlot, color.new(color.purple, 50), "EMA Fill")
```

需要注意的是，与其他特殊类型不同，Pine 中没有`plot`or`hline`关键字来显式声明变量的类型为“plot”或“hline”。

用户可以通过命名空间中的变量来控制脚本绘图的显示位置`display.*`。此外，一个脚本可以通过 [input.source()](https://www.tradingview.com/pine-script-reference/v5/#fun_input.source)函数使用另一个脚本绘图中的值作为*外部输入*（请参阅我们的用户手册中有关[源输入的](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#pageinputs-inputtypes-sourceinput)部分）。



### [绘图类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id14)

Pine Script™ 绘图类型允许脚本在图表上创建自定义绘图。它们包括以下内容： [line](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [linefill](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [box](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [polyline](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)、 [label](https://www.tradingview.com/pine-script-reference/v5/#type_label)和 [table](https://www.tradingview.com/pine-script-reference/v5/#type_table)。

每种类型还有一个命名空间，其中包含创建和管理绘图实例的所有内置函数。例如，以下`*.new()`构造函数在脚本中创建这些类型的新对象： [line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)、 [linefill.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_linefill.new)、 [box.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_box.new)、 [polyline.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_polyline.new)、 [label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label.new)和 [table.new ()](https://www.tradingview.com/pine-script-reference/v5/#fun_table.new)。

这些函数中的每一个都会返回一个*ID*，该 ID 是唯一标识绘图对象的引用。 ID 始终限定为“系列”，这意味着它们的限定类型为“系列线”、“系列标签”等。绘图 ID 的作用类似于指针，因为每个 ID 在绘图名称空间的所有函数中都引用绘图的特定实例。例如，当需要使用[line.delete( ](https://www.tradingview.com/pine-script-reference/v5/#fun_line.new)[) 删除该对象时，稍后将使用 line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line.delete) 调用返回的行的 ID 来引用该特定对象 。



### [图表点](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id15)

图表点是表示图表上坐标的特殊类型。脚本使用来自[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)对象的信息来确定[线条](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-lines)、[方框](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-boxes)、 [折线](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-polylines)和[标签](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#pagetextandshapes-labels) 的图表位置。

这种类型的对象包含三个*字段*：`time`、`index`和`price`。绘图实例是否使用[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)中的 `time`或字段 作为 x 坐标取决于绘图的属性。`price``xloc`

我们可以使用以下任意函数在脚本中创建图表点：

- [Chart.point.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.new) -使用指定的、和来创建一个新的[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)。`time``index``price`
- [Chart.point.now()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.now) - 创建一个具有指定y 坐标的新[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)`price` 。和字段包含函数执行所在柱的`time`时间[和](https://www.tradingview.com/pine-script-reference/v5/#var_time)bar_index [。](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)`index`
- [Chart.point_from_index()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.from_index) - 创建一个带有x 坐标和y 坐标的新[图表.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point) 。生成的实例的字段是na [，](https://www.tradingview.com/pine-script-reference/v5/#var_na)这意味着它不适用于使用[xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_time)值的绘图对象。`index``price``time``xloc`
- [Chart.point.from_time()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.from_time) - 创建一个带有x 坐标和y 坐标的新[Chart.point](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point) 。生成的实例的字段是na [，](https://www.tradingview.com/pine-script-reference/v5/#var_na)这意味着它不适用于使用[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc.bar_index)值的绘图对象。`time``price``index``xloc`
- [Chart.point.copy()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.copy) - 创建一个新的[chart.point，](https://www.tradingview.com/pine-script-reference/v5/#type_chart.point)其中包含与函数调用中相同的`time`、`index`、 和`price`信息。`id`

此示例在每个图表条形上绘制连接前一个条形的[最高点](https://www.tradingview.com/pine-script-reference/v5/#var_high) 和当前条形的[最低点](https://www.tradingview.com/pine-script-reference/v5/#var_low)的线。它还在每条线的两个点处显示标签。线条和标签从`firstPoint`和`secondPoint`变量获取信息，这些变量引用使用 [Chart.point_from_index()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.from_index)和 [Chart.point.now()](https://www.tradingview.com/pine-script-reference/v5/#fun_chart.point.now)创建的图表点：

```
Pine Script™
Copied//@version=5
indicator("Chart points demo", overlay = true)

//@variable A new `chart.point` at the previous `bar_index` and `high`.
firstPoint = chart.point.from_index(bar_index - 1, high[1])
//@variable A new `chart.point` at the current bar's `low`.
secondPoint = chart.point.now(low)

// Draw a new line connecting coordinates from the `firstPoint` and `secondPoint`.
// This line uses the `index` fields from the points as x-coordinates.
line.new(firstPoint, secondPoint, color = color.purple, width = 3)
// Draw a label at the `firstPoint`. Uses the point's `index` field as its x-coordinate.
label.new(
     firstPoint, str.tostring(firstPoint.price), color = color.green,
     style = label.style_label_down, textcolor = color.white
 )
// Draw a label at the `secondPoint`. Uses the point's `index` field as its x-coordinate.
label.new(
     secondPoint, str.tostring(secondPoint.price), color = color.red,
     style = label.style_label_up, textcolor = color.white
 )
```



### [收藏](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id16)

Pine Script™ 中的集合（[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)、[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)和[映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps)）使用引用 ID，与其他特殊类型（例如标签）非常相似。 ID 的类型定义了集合将包含的*元素*的类型。在 Pine 中，我们通过将[类型模板](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-typetemplates)附加 到array、matrix 或 map 关键字来指定[array](https://www.tradingview.com/pine-script-reference/v5/#type_array)、 [matrix](https://www.tradingview.com/pine-script-reference/v5/#type_matrix)和[map](https://www.tradingview.com/pine-script-reference/v5/#type_map)类型：

- `array<int>`定义一个包含“int”元素的数组。
- `array<label>`定义一个包含“标签”ID 的数组。
- `array<UDT>`[定义一个数组，其中包含引用用户定义类型 (UDT)](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)对象的 ID 。
- `matrix<float>`定义一个包含“float”元素的矩阵。
- `matrix<UDT>`定义一个包含引用[用户定义类型 (UDT)](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)对象的 ID 的矩阵。
- `map<string, float>`定义一个包含“字符串”键和“浮点”值的映射。
- `map<int, UDT>`定义一个映射，其中包含“int”键和[用户定义类型 (UDT)](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)实例的 ID 作为值。

例如，可以通过以下任一等效方式声明单个元素值为 10 的“int”数组：

```
Pine Script™
Copieda1 = array.new<int>(1, 10)
array<int> a2 = array.new<int>(1, 10)
a3 = array.from(10)
array<int> a4 = array.from(10)
```

- 注意：

  该`int[]`语法还可以指定“int”元素的数组，但不鼓励使用它。不存在以这种方式指定矩阵或映射类型的等效方法。数组存在特定于类型的内置函数，例如 [array.new_int()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}new_int)，但更通用的[array.new](https://www.tradingview.com/pine-script-reference/v5/#type_array) 形式是首选，这将`array.new<int>()`创建一个“int”元素的数组。



### [用户定义类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id17)

type 关键字允许创建*用户定义类型(UDT)* [，](https://www.tradingview.com/pine-script-reference/v5/#op_type)脚本可以从中创建[对象](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#pageobjects)。 UDT 是复合类型；它们包含任意数量的可以是任何类型的*字段*，包括其他用户定义的类型。定义用户定义类型的语法是：

```
Pine Script™
Copied[export] type <UDT_identifier>
    <field_type> <field_name> [= <value>]
    ...
```

在哪里：

- `export`[是库](https://www.tradingview.com/pine-script-reference/v5/#fun_library) 脚本用于导出用户定义类型的关键字。要了解有关导出 UDT 的更多信息，请参阅我们的用户手册的 [库](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#pagelibraries-objects)页面。
- `<UDT_identifier>`是用户定义类型的名称。
- `<field_type>`是字段的类型。
- `<field_name>`是字段的名称。
- `<value>`是该字段的可选默认值，脚本将在创建该 UDT 的新对象时为其分配该默认值。如果未提供值，则该字段的默认值为[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。与管理函数签名中参数默认值的规则相同的规则也适用于字段的默认值。例如，UDT 的默认值不能使用历史引用运算符 [[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[])或表达式的结果。

此示例声明一个`pivotPoint`带有“int”`pivotTime`字段和“float”`priceLevel`字段的 UDT，分别保存有关计算的枢轴的时间和价格信息：

```
Pine Script™
Copied//@type             A user-defined type containing pivot information.
//@field pivotTime  Contains time information about the pivot.
//@field priceLevel Contains price information about the pivot.
type pivotPoint
    int   pivotTime
    float priceLevel
```

用户定义类型支持*类型递归*，即一个UDT的字段可以引用同一个UDT的对象。在这里，我们`nextPivot`在之前的`pivotPoint`类型中添加了一个引用另一个`pivotPoint`实例的字段：

```
Pine Script™
Copied//@type             A user-defined type containing pivot information.
//@field pivotTime  Contains time information about the pivot.
//@field priceLevel Contains price information about the pivot.
//@field nextPivot  A `pivotPoint` instance containing additional pivot information.
type pivotPoint
    int        pivotTime
    float      priceLevel
    pivotPoint nextPivot
```

脚本可以使用两种内置方法来创建和复制 UDT：`new()`和`copy()`。请参阅我们的用户手册的[对象](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#pageobjects)页面， 了解有关使用 UDT 的更多信息。



### [空白](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id18)

Pine Script™ 中有一个“void”类型。仅具有副作用且不返回可用结果的函数返回“void”类型。此类函数的一个示例是[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)；它会执行某些操作（触发警报事件），但不会返回任何可用值。

脚本不能在表达式中使用“void”结果或将它们分配给变量。 Pine Script™ 中不`void`存在关键字，因为无法声明“void”类型的变量。



## [`na` 值](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id19)

Pine Script™ 中有一个特殊值，称为[na ，它是](https://www.tradingview.com/pine-script-reference/v5/#var_na)*not available 的*缩写。我们使用[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)来表示变量或表达式中未定义的值。它`null`与 Java 和Python 中的类似`None`。

脚本可以自动将[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值转换为几乎任何类型。但是，在某些情况下，编译器无法推断与[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值关联的类型， 因为可能适用多个类型转换规则。例如：

```
Pine Script™
Copied// Compilation error!
myVar = na
```

上面的代码行会导致编译错误，因为编译器无法确定变量的性质`myVar`，即变量是否会引用用于绘图的数值、用于在标签中设置文本的字符串值，或者稍后用于其他目的的其他值。脚本的执行。

要解决此类错误，我们必须显式声明与变量关联的类型。假设该`myVar`变量将在后续脚本迭代中引用“浮点”值。我们可以通过使用[float](https://www.tradingview.com/pine-script-reference/v5/#type_float)关键字声明变量来解决该错误 ：

```
Pine Script™
Copiedfloat myVar = na
```

或者通过[float()函数将](https://www.tradingview.com/pine-script-reference/v5/#fun_float)[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值显式转换为“float”类型：

```
Pine Script™
CopiedmyVar = float(na)
```

为了测试变量或表达式的值是否为[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，我们调用[na()](https://www.tradingview.com/pine-script-reference/v5/#fun_na)函数，`true`如果该值未定义，该函数将返回。例如：

```
Pine Script™
Copied//@variable Is 0 if the `myVar` is `na`, `close` otherwise.
float myClose = na(myVar) ? 0 : close
```

不要使用`==`比较运算符来测试[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) 值，因为脚本无法确定未定义值的相等性：

```
Pine Script™
Copied//@variable Returns the `close` value. The script cannot compare the equality of `na` values, as they're undefined.
float myClose = myVar == na ? 0 : close
```

最佳编码实践通常涉及处理[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值以防止计算中出现未定义的值。

例如，这行代码检查当前柱的[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价是否大于前一个柱的值：

```
Pine Script™
Copied//@variable Is `true` when the `close` exceeds the last bar's `close`, `false` otherwise.
bool risingClose = close > close[1]
```

在第一个图表条上， 的值为`risingClose`na [，](https://www.tradingview.com/pine-script-reference/v5/#var_na) 因为没有过去的[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价可供参考。

通过将未定义的过去值替换为当前柱中的值，我们可以确保表达式还在第一个柱上返回可操作的值。当值为 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)时，这行代码使用[nz()函数将过去柱的收盘](https://www.tradingview.com/pine-script-reference/v5/#fun_nz)[价](https://www.tradingview.com/pine-script-reference/v5/#var_close) 替换 为当前柱的[开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open)：

```
Pine Script™
Copied//@variable Is `true` when the `close` exceeds the last bar's `close` (or the current `open` if the value is `na`).
bool risingClose = close > nz(close[1], open)
```

保护脚本免受[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)实例的影响有助于防止未定义的值在计算结果中传播。例如，此脚本`allTimeHigh`在第一个柱上声明一个变量。然后，它使用和柱形[最高点](https://www.tradingview.com/pine-script-reference/v5/#var_high)之间的[math.max()](https://www.tradingview.com/pine-script-reference/v5/#fun_math.max)来更新 整个执行过程：`allTimeHigh``allTimeHigh`

```
Pine Script™
Copied//@version=5
indicator("na protection demo", overlay = true)

//@variable The result of calculating the all-time high price with an initial value of `na`.
var float allTimeHigh = na

// Reassign the value of the `allTimeHigh`.
// Returns `na` on all bars because `math.max()` can't compare the `high` to an undefined value.
allTimeHigh := math.max(allTimeHigh, high)

plot(allTimeHigh) // Plots `na` on all bars.
```

[该脚本在所有柱上绘制na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值，因为我们没有在代码中包含任何[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)保护。为了修复该行为并绘制预期结果（即图表价格的历史最高点），我们可以使用 [nz()](https://www.tradingview.com/pine-script-reference/v5/#fun_nz)替换该系列中的[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) 值：`allTimeHigh`

```
Pine Script™
Copied//@version=5
indicator("na protection demo", overlay = true)

//@variable The result of calculating the all-time high price with an initial value of `na`.
var float allTimeHigh = na

// Reassign the value of the `allTimeHigh`.
// We've used `nz()` to prevent the initial `na` value from persisting throughout the calculation.
allTimeHigh := math.max(nz(allTimeHigh), high)

plot(allTimeHigh)
```



## [类型模板](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id20)

[类型模板指定集合（数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)、 [矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)和[映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps)）可以包含的数据类型。

[数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)和[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)的模板由尖括号括起来的单个类型标识符组成，例如 `<int>`、`<label>`和`<PivotPoint>`（其中`PivotPoint`是 [用户定义类型 (UDT)](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)）。

[映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps)模板由两个括在尖括号中的类型标识符组成，其中第一个指定每个*键值*对中键的类型，第二个指定*值*类型。例如，是保存键和值的映射的类型模板。`<string, float>``string``float`

用户可以通过以下方式构建类型模板：

- 基本类型：[int](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-int)、[float](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-float)、 [bool](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-bool)、[color](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-color)和[string](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-string)
- 以下特殊类型：[line](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、 [linefill](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、[box](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、 [polyline](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、[label](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)、 [table](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-drawingtypes)和 [Chart.point](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-chartpoints)
- [用户定义类型 (UDT)](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)

- 注意：

  [映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps)可以使用任何这些类型作为*值*，但它们只能接受基本类型作为*键*。

脚本在创建新的集合实例时使用类型模板来声明指向集合的变量。例如：

```
Pine Script™
Copied//@version=5
indicator("Type templates demo")

//@variable A variable initially assigned to `na` that accepts arrays of "int" values.
array<int> intArray = na
//@variable An empty matrix that holds "float" values.
floatMatrix = matrix.new<float>()
//@variable An empty map that holds "string" keys and "color" values.
stringColorMap = map.new<string, color>()
```



## [类型转换](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id21)

Pine Script™ 包含自动类型转换机制，可在必要时将**“int”值***转换*（转换）为**“float”**。需要“float”值的变量或表达式也可以使用“int”值，因为任何整数都可以表示为浮点数，其小数部分等于 0。

为了向后兼容，Pine Script™ 还会在必要时自动将**“int”**和**“float”**值转换为**“bool”** 。当将数值传递给需要“bool”类型的函数和操作的参数时，Pine 会自动将它们转换为“bool”。但是，我们不建议依赖此行为。大多数自动将数值转换为“bool”类型的脚本都会产生*编译器警告*。通过使用[bool()](https://www.tradingview.com/pine-script-reference/v5/#fun_bool)函数，可以避免编译器警告并提高代码可读性，该函数将数值显式转换为“bool”类型。

将“int”或“float”转换为“bool”时，值 0 会转换为`false`，任何其他数值始终会转换为`true`。

下面的代码演示了 Pine 中已弃用的自动转换行为。它在每个柱上创建一个 `randomValue`具有“系列浮点”值的变量，并将其传递给[if](https://www.tradingview.com/pine-script-reference/v5/#kw_if)`condition`结构 中的参数和[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)函数调用中的参数 。由于这两个参数都接受“bool”值，因此脚本在评估它们时会自动将其转换为“bool”：`series``randomValue`

```
Pine Script™
Copied//@version=5
indicator("Auto-casting demo", overlay = true)

//@variable A random rounded value between -1 and 1.
float randomValue = math.round(math.random(-1, 1))
//@variable The color of the chart background.
color bgColor = na

// This raises a compiler warning since `randomValue` is a "float", but `if` expects a "bool".
if randomValue
    bgColor := color.new(color.blue, 60)
// This does not raise a warning, as the `bool()` function explicitly casts the `randomValue` to "bool".
if bool(randomValue)
    bgColor := color.new(color.blue, 60)

// Display unicode characters on the chart based on the `randomValue`.
// Whenever `math.random()` returns 0, no character will appear on the chart because 0 converts to `false`.
plotchar(randomValue)
// We recommend explicitly casting the number with the `bool()` function to make the type transformation more obvious.
plotchar(bool(randomValue))

// Highlight the background with the `bgColor`.
bgcolor(bgColor)
```

当自动转换规则不够时，有时需要将一种类型转换为另一种类型。对于这种情况，可以使用以下类型转换函数： [int()](https://www.tradingview.com/pine-script-reference/v5/#fun_int)、 [float()](https://www.tradingview.com/pine-script-reference/v5/#fun_float)、 [bool()](https://www.tradingview.com/pine-script-reference/v5/#fun_bool)、 [color()](https://www.tradingview.com/pine-script-reference/v5/#fun_color)、 [string()](https://www.tradingview.com/pine-script-reference/v5/#fun_string)、 [line()](https://www.tradingview.com/pine-script-reference/v5/#fun_line)、 [linefill()](https://www.tradingview.com/pine-script-reference/v5/#fun_linefill)、 [label()](https://www.tradingview.com/pine-script-reference/v5/#fun_label)、 [box()](https://www.tradingview.com/pine-script-reference/v5/#fun_box)和 [桌子（）](https://www.tradingview.com/pine-script-reference/v5/#fun_table)。

下面的示例显示了尝试使用“const float”值作为 [ta.sma()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.sma)`length`函数调用中的参数的代码 。该脚本将无法编译，因为它无法自动将“float”值转换为所需的“int”类型：

```
Pine Script™
Copied//@version=5
indicator("Explicit casting demo", overlay = true)

//@variable The length of the SMA calculation. Qualified as "const float".
float LENGTH = 10.0

float sma = ta.sma(close, LENGTH) // Compilation error. The `length` parameter requires an "int" value.

plot(sma)
```

该代码引发以下错误： *“无法使用参数“length”=“LENGTH”调用“ta.sma”。使用了“const float”类型的参数，但需要使用“series int”。”*

编译器告诉我们代码在需要“int”的地方使用“float”值。没有自动转换规则可以将“float”转换为“int”，因此我们必须自己完成这项工作。在此版本的代码中，我们使用 [int()函数在](https://www.tradingview.com/pine-script-reference/v5/#fun_int)[ta.sma()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta.sma)调用中将“float”值显式转换`LENGTH`为“int”类型：

```
Pine Script™
Copied//@version=5
indicator("explicit casting demo")

//@variable The length of the SMA calculation. Qualified as "const float".
float LENGTH = 10.0

float sma = ta.sma(close, int(LENGTH)) // Compiles successfully since we've converted the `LENGTH` to "int".

plot(sma)
```

当声明分配给 [na 的](https://www.tradingview.com/pine-script-reference/v5/#var_na)变量时，显式类型转换也很方便，如上一 [节](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-navalue)所述。

例如，once 可以通过以下任一等效方式将值为 [na的变量显式声明为“标签”类型：](https://www.tradingview.com/pine-script-reference/v5/#var_na)

```
Pine Script™
Copied// Explicitly specify that the variable references "label" objects:
label myLabel = na

// Explicitly cast the `na` value to the "label" type:
myLabel = label(na)
```



## [元组](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#id22)

元*组*是一组用括号括起来的、以逗号分隔的表达式。当函数、[方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#pagemethods)或其他本地块返回多个值时，脚本会以元组的形式返回这些值。

例如，以下[用户定义函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions)返回两个“浮点”值的和与积：

```
Pine Script™
Copied//@function Calculates the sum and product of two values.
calcSumAndProduct(float a, float b) =>
    //@variable The sum of `a` and `b`.
    float sum = a + b
    //@variable The product of `a` and `b`.
    float product = a * b
    // Return a tuple containing the `sum` and `product`.
    [sum, product]
```

当我们稍后在脚本中调用此函数时，我们使用*元组声明*来声明与函数调用返回的值相对应的多个变量：

```
Pine Script™
Copied// Declare a tuple containing the sum and product of the `high` and `low`, respectively.
[hlSum, hlProduct] = calcSumAndProduct(high, low)
```

请记住，与声明单个变量不同，我们无法显式定义元组变量（`hlSum`在`hlProduct`本例中）将包含的类型。编译器自动推断与元组中的变量关联的类型。

在上面的示例中，生成的元组包含相同类型（“float”）的值。但是，需要注意的是，元组可以包含*多种类型*的值。例如，`chartInfo()` 下面的函数返回一个包含“int”、“float”、“bool”、“color”和“string”值的元组：

```
Pine Script™
Copied//@function Returns information about the current chart.
chartInfo() =>
    //@variable The first visible bar's UNIX time value.
    int firstVisibleTime = chart.left_visible_bar_time
    //@variable The `close` value at the `firstVisibleTime`.
    float firstVisibleClose = ta.valuewhen(ta.cross(time, firstVisibleTime), close, 0)
    //@variable Is `true` when using a standard chart type, `false` otherwise.
    bool isStandard = chart.is_standard
    //@variable The foreground color of the chart.
    color fgColor = chart.fg_color
    //@variable The ticker ID of the current chart.
    string symbol = syminfo.tickerid
    // Return a tuple containing the values.
    [firstVisibleTime, firstVisibleClose, isStandard, fgColor, symbol]
```

[元组对于在一次request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)调用中请求多个值特别方便 。

例如，此函数返回一个包含 OHLC 值的元组，该值四舍五入到可被交易品种的[最小刻度](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo.mintick)`roundedOHLC()`值整除的最接近价格 。我们将此函数称为[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)中的参数 ，以请求包含每日 OHLC 值的元组：`expression`

```
Pine Script™
Copied//@function Returns a tuple of OHLC values, rounded to the nearest tick.
roundedOHLC() =>
    [math.round_to_mintick(open), math.round_to_mintick(high), math.round_to_mintick(low), math.round_to_mintick(close)]

[op, hi, lo, cl] = request.security(syminfo.tickerid, "D", roundedOHLC())
```

我们还可以通过直接传递一个舍入值的元组来实现相同的结果，如[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)`expression`调用中的 ：

```
Pine Script™
Copied[op, hi, lo, cl] = request.security(
     syminfo.tickerid, "D",
     [math.round_to_mintick(open), math.round_to_mintick(high), math.round_to_mintick(low), math.round_to_mintick(close)]
 )
```

[条件结构](https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html#pageconditionalstructures)的局部块（包括 [if](https://www.tradingview.com/pine-script-reference/v5/#kw_if)和 [switch](https://www.tradingview.com/pine-script-reference/v5/#kw_switch)语句）可以返回元组。例如：

```
Pine Script™
Copied[v1, v2] = if close > open
    [high, close]
else
    [close, low]
```

和：

```
Pine Script™
Copied[v1, v2] = switch
close > open => [high, close]
=>              [close, low]
```

但是，三元不能包含元组，因为三元语句中的返回值不被视为本地块：

```
Pine Script™
Copied// Not allowed.
[v1, v2] = close > open ? [high, close] : [close, low]
```

请注意，从函数返回的元组中的所有项目都被限定为“简单”或“系列”，具体取决于其内容。如果元组包含“series”值，则元组中的所有其他元素也将采用“series”限定符。例如：

```
Pine Script™
Copied//@version=5
indicator("Qualified types in tuples demo")

makeTicker(simple string prefix, simple string ticker) =>
    tId = prefix + ":" + ticker // simple string
    source = close  // series float
    [tId, source]

// Both variables are series now.
[tId, source] = makeTicker("BATS", "AAPL")

// Error cannot call 'request.security' with 'series string' tId.
r = request.security(tId, "", source)

plot(r)
```