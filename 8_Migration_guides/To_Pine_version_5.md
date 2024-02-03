# 至 Pine Script™ 版本 5 

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id1)

本指南记录了Pine Script™ 从 v4 到 v5 所做的**更改**。它将指导您将现有 Pine 脚本改编为 Pine Script™ v5。请参阅我们的[发行说明](https://www.tradingview.com/pine-script-docs/en/v5/Release_notes.html#pagereleasenotes-october2021)**，了解 Pine Script™ v5 中的新**功能列表。

将旧脚本转换为 v5 所需的最常见的调整是：

- [将Study()](https://www.tradingview.com/pine-script-reference/v4/#fun_study)更改为[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)（函数的签名未更改）。
- 重命名内置函数调用以包含新的命名空间（例如， v4 中的[Highest()](https://www.tradingview.com/pine-script-reference/v4/#fun_highest)变为v5 中的[ta.highest()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}highest)）。
- 重组输入以使用更专业的`input.*()`功能。
- `transp`通过使用[color.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}new)同时定义与参数一起使用的颜色和透明度，消除了对已弃用`color`参数的使用。
- 如果您在 v4 的[Study()](https://www.tradingview.com/pine-script-reference/v4/#fun_study)`resolution`中使用了和参数，则需要将它们更改为v5 的[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)中的和。`resolution_gaps``timeframe``timeframe_gaps`

## [v4 到 v5 转换器](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id2)

Pine 编辑器包含一个实用程序，可自动将 v4 脚本转换为 v5。要访问它，请打开其中的脚本`//@version=4`，然后在编辑器窗格右上角由三个点标识的“更多”菜单中选择“转换为 v5”选项：

![../_images/v4_to_v5_convert_button.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/v4_to_v5_convert_button.png)

并非所有脚本都可以自动从 v4 转换为 v5。如果您想要手动转换脚本或者您的指标在转换后返回编译错误，请使用以下部分来确定如何完成转换。您可以在本指南的[常见脚本转换错误](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/v4_to_v5_migration_guide.html#pagetopineversion5-commonconversionerrors)部分找到自动转换过程中可能遇到的一些错误以及如何修复这些错误的列表。

## [重命名的函数和变量](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id3)

为了清晰和一致性，许多内置函数和变量在 v5 中被重命名。大多数更改的原因是在新命名空间中包含 v4 函数名称。例如， v4 中的[sma()](https://www.tradingview.com/pine-script-reference/v4/#fun_sma)函数被移动到`ta.`v5 中的命名空间： [ta.sma()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}sma)。不必记住新的命名空间；如果您在编辑器中键入不带命名空间的旧函数名称，然后按“自动完成”热键（Ctrl+Space或MacOS 上的Cmd+ Space），则会出现一个显示匹配建议的弹出窗口：

![../_images/v5_autocomplete.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/v5_autocomplete.png)

不包括移动到新命名空间的函数，只有两个函数被重命名：

- `study()`现在是[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)。
- `tickerid()`现在是[ticker.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}new)。

[重命名的函数和变量的完整列表可以在本指南的所有变量、函数和参数名称更改](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/v4_to_v5_migration_guide.html#pagetopineversion5-allvariables)部分中找到。

## [重命名的函数参数](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id4)

更改了一些内置函数的参数名称以改进命名法。这对大多数脚本没有影响，但如果您在调用函数时使用这些参数名称，则它们将需要调整。例如，我们对所有提及进行了标准化：

```javascript
// Valid in v4. Not valid in v5.
timev4 = time(resolution = "1D")
// Valid in v5.
timev5 = time(timeframe = "1D")
// Valid in v4 and v5.
timeBoth = time("1D")
```

[重命名的函数参数的完整列表可以在本指南的所有变量、函数和参数名称更改](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/v4_to_v5_migration_guide.html#pagetopineversion5-allvariables)部分中找到。

## [删除了 `rsi()` 重载](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id5)

在 v4 中，[rsi()](https://www.tradingview.com/pine-script-reference/v4/#fun_rsi)函数有两个不同的重载：

- `rsi(series float, simple int)`对于正常的 RSI 计算，以及
- `rsi(series float, series float)`对于 MFI 指标中使用的过载，其计算相当于。`100.0 - (100.0 / (1.0 + arg1 / arg2))`

这导致单个内置函数以两种截然不同的方式表现，并且很难区分应用哪一种，因为它取决于第二个参数的类型。结果，许多指标滥用了该功能并显示了错误的结果。为了避免这种情况，在 v5 中删除了第二个重载。

v5 中的ta.rsi [()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}rsi)函数仅接受“简单 int”参数作为其`length`参数。如果您的 v4 代码使用了现已弃用的带有第二个参数的函数重载`float`，您可以使用以下公式替换整个`rsi()`调用，该公式等效：

```javascript
100.0 - (100.0 / (1.0 + arg1 / arg2))
```

请注意，当您的 v4 代码使用“series int”值作为[rsi()](https://www.tradingview.com/pine-script-reference/v4/#fun_rsi)的第二个参数时，它会自动转换为“series float”并使用该函数的第二个重载。虽然这在语法上是正确的，但它很可能不会**产生**您期望的结果。在 v5 中，[ta.rsi()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}rsi)需要一个“简单 int”作为 的参数`length`，这排除了动态（或“系列”）长度。原因是 RSI 计算使用[ta.rma()移动平均线，这与](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}rma)[ta.ema()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}ema)类似，因为它依赖于使用先前柱线值的长度相关递归过程。这使得不可能通过逐条变化的“系列”长度来获得正确的结果。

如果您的 v4 代码使用的长度为“const int”、“input int”或“simple int”，则无需进行任何更改。

## [保留关键字](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id6)

许多单词是保留的，不能用于变量或函数名称。他们是：`catch`，`class`，`do`，`ellipse`，`in`，`is`，`polygon`，`range`，`return`，`struct`，`text`，`throw`，`try`。如果您的 v4 指标使用其中任何一个，请重命名变量或函数以使脚本在 v5 中运行。

## [删除了 `iff()` 和 `offset()` ](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id7)

iff [()](https://www.tradingview.com/pine-script-reference/v4/#fun_iff)和[offset()](https://www.tradingview.com/pine-script-reference/v4/#fun_offset)函数已被删除。使用[iff()](https://www.tradingview.com/pine-script-reference/v4/#fun_iff)函数的代码可以使用三元运算符重写：

```javascript
// iff(<condition>, <return_when_true>, <return_when_false>)
// Valid in v4, not valid in v5
barColorIff = iff(close >= open, color.green, color.red)
// <condition> ? <return_when_true> : <return_when_false>
// Valid in v4 and v5
barColorTernary = close >= open ? color.green : color.red
```

请注意，三元运算符是“惰性”计算的；仅计算所需的值（取决于条件对`true`或的评估`false`）。这与[iff()](https://www.tradingview.com/pine-script-reference/v4/#fun_iff)不同，后者总是评估两个值但仅返回相关的值。

有些函数需要对每个柱进行评估才能正确计算，因此您需要通过在三元之前对它们进行预评估来为这些函数做出特殊规定：

```javascript
// `iff()` in v4: `highest()` and `lowest()` are calculated on every bar
v1 = iff(close > open, highest(10), lowest(10))
plot(v1)
// In v5: forced evaluation on every bar prior to the ternary statement.
h1 = ta.highest(10)
l1 = ta.lowest(10)
v1 = close > open ? h1 : l1
plot(v1)
```

offset [()](https://www.tradingview.com/pine-script-reference/v4/#fun_offset)函数已被弃用，因为更具可读性的[[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[])运算符是等效的：

```javascript
// Valid in v4. Not valid in v5.
prevClosev4 = offset(close, 1)
// Valid in v4 and v5.
prevClosev5 = close[1]
```

## [将 `input()` 拆分为多个函数](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id8)

v4 [input()](https://www.tradingview.com/pine-script-reference/v4/#fun_input)函数变得挤满了过多的重载和参数。我们将其功能拆分为不同的功能，以清理空间并提供更强大的结构来容纳计划添加的输入。每个新函数都使用它所替换的`input.*`v4 调用的类型名称。`input()`例如，现在有一个专门的[input.float()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}float)函数取代了 v4调用。请注意，在 v5 中仍然可以使用，但由于只有[input.float()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}float)允许使用、等参数，因此功能更强大。另请注意，[input.int()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}int)是唯一不使用其等效 v4名称的专用输入函数。这些常量已被删除，因为它们被用作参数的实参，而该参数已被弃用。`input(1.0, type = input.float)``input(1.0)``minval``maxval``input.integer``input.*``type`

例如，要转换使用类型 的输入的 v4 脚本`input.symbol`，则必须在 v5 中使用[input.symbol()函数：](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}symbol)

```javascript
// Valid in v4. Not valid in v5.
aaplTicker = input("AAPL", type = input.symbol)
// Valid in v5
aaplTicker = input.symbol("AAPL")
```

input [()](https://www.tradingview.com/pine-script-reference/v5/#fun_input)函数在 v5 中仍然存在，但形式更简单，参数更少。它的优点是可以从用于的参数中自动检测输入类型“bool/color/int/float/string/source” `defval`：

```javascript
// Valid in v4 and v5.
// While "AAPL" is a valid symbol, it is only a string here because `input.symbol()` is not used.
tickerString = input("AAPL", title = "Ticker string")
```



## [一些函数参数现在需要内置参数](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id9)

在 v4 中，内置常量（例如`plot.style_area`在调用 Pine Script™ 函数时用作参数）对应于特定类型的预定义值。例如， 的值`barmerge.lookahead_on`是，因此在[security()](https://www.tradingview.com/pine-script-reference/v4/#fun_security)函数调用中向形参提供实参时，`true`您可以使用它来代替命名常量。我们发现这是一个常见的混乱根源，它导致毫无戒心的程序员编写出产生意想不到结果的代码。`true``lookahead`

在 v5 中，必须使用正确的内置命名常量作为需要它们的函数参数的实参：

```javascript
// Not valid in v5: `true` is used as an argument for `lookahead`.
request.security(syminfo.tickerid, "1D", close, lookahead = true)
// Valid in v5: uses a named constant instead of `true`.
request.security(syminfo.tickerid, "1D", close, lookahead = barmerge.lookahead_on)

// Would compile in v4 because `plot.style_columns` was equal to 5.
// Won't compile in v5.
a = 2 * plot.style_columns
plot(a)
```

要将脚本从 v4 转换为 v5，请确保使用正确命名的内置常量作为函数参数。

## [弃用了 `transp` 参数](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id10)

`transp=`许多 v4 绘图函数的签名中使用的参数已被弃用，因为它会干扰 RGB 功能。现在必须将透明度与颜色一起指定为`color`、`textcolor`等参数的参数。在这些情况下，将需要[color.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}new)或[color.rgb()函数来连接颜色及其透明度。](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}rgb)

请注意，在 v4 中，[bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor)和[fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)函数有一个可选`transp`参数，使用默认值 90。这意味着下面的代码可以显示布林带，在两个带之间具有半透明填充和半透明填充即使`transp`在其[bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor)和[fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)调用中没有为参数使用参数，带交叉价格处的背景颜色：

```javascript
//@version=4
study("Bollinger Bands", overlay = true)
[middle, upper, lower] = bb(close, 5, 4)
plot(middle, color=color.blue)
p1PlotID = plot(upper, color=color.green)
p2PlotID = plot(lower, color=color.green)
crossUp = crossover(high, upper)
crossDn = crossunder(low, lower)
// Both `fill()` and `bgcolor()` have a default `transp` of 90
fill(p1PlotID, p2PlotID, color = color.green)
bgcolor(crossUp ? color.green : crossDn ? color.red : na)
```

在 v5 中，我们需要明确提及颜色的 90 透明度，产生：

```javascript
//@version=5
indicator("Bollinger Bands", overlay = true)
[middle, upper, lower] = ta.bb(close, 5, 4)
plot(middle, color=color.blue)
p1PlotID = plot(upper, color=color.green)
p2PlotID = plot(lower, color=color.green)
crossUp = ta.crossover(high, upper)
crossDn = ta.crossunder(low, lower)
var TRANSP = 90
// We use `color.new()` to explicitly pass transparency to both functions
fill(p1PlotID, p2PlotID, color = color.new(color.green, TRANSP))
bgcolor(crossUp ? color.new(color.green, TRANSP) : crossDn ? color.new(color.red, TRANSP) : na)
```

## [更改了 `time()` 和 `time_close()` 的默认会话天数](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id11)

[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)和 [time_close()](https://www.tradingview.com/pine-script-reference/v5/#fun_time_close)`session`函数中使用的字符串的默认日期集（由[input.session()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}session)返回）已从（星期一到星期五）更改为（星期日到星期六）：`"23456"``"1234567"`

```javascript
// On symbols that are traded during weekends, this will behave differently in v4 and v5.
t0 = time("1D", "1000-1200")
// v5 equivalent of the behavior of `t0` in v4.
t1 = time("1D", "1000-1200:23456")
// v5 equivalent of the behavior of `t0` in v5.
t2 = time("1D", "1000-1200:1234567")
```

这种行为变化应该不会对在周末休市的传统市场上运行的脚本产生太大影响。如果确保会话定义在 v5 代码中保留其 v4 行为对您很重要，请添加`":23456"`到会话字符串中。有关详细信息，请参阅本手册中[有关会话的页面。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#pagesessions)

## [`strategy.exit()` 现在必须做一些事情](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id12)

允许[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)函数闲逛的日子已经一去不复返了。现在，它实际上必须通过使用以下参数中的至少一个来对策略产生影响：`profit`、`limit`、`loss`、`stop`或以下对之一： 与或`trail_offset`组合。当在将策略转换为 v5 时使用不满足这些条件的[Strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)时会触发错误，您可以安全地消除这些行，因为它们无论如何都不会在您的代码中执行任何操作。`trail_price``trail_points`



## [常见的脚本转换错误](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id13)

### “plot”/“hline”调用中的参数“style”/“linestyle”无效

为了使其工作，您需要更改用于内置常量的[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)和 [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)`style`中的和`linestyle`参数的 “int”参数：

```javascript
// Will cause an error during conversion
plotStyle = input(1)
hlineStyle = input(1)
plot(close, style = plotStyle)
hline(100, linestyle = hlineStyle)

// Will work in v5
//@version=5
indicator("")
plotStyleInput = input.string("Line", options = ["Line", "Stepline", "Histogram", "Cross", "Area", "Columns", "Circles"])
hlineStyleInput = input.string("Solid", options = ["Solid", "Dashed", "Dotted"])

plotStyle = plotStyleInput == "Line" ? plot.style_line :
      plotStyleInput == "Stepline" ? plot.style_stepline :
      plotStyleInput == "Histogram" ? plot.style_histogram :
      plotStyleInput == "Cross" ? plot.style_cross :
      plotStyleInput == "Area" ? plot.style_area :
      plotStyleInput == "Columns" ? plot.style_columns :
      plot.style_circles

hlineStyle = hlineStyleInput == "Solid" ? hline.style_solid :
      hlineStyleInput == "Dashed" ? hline.style_dashed :
      hline.style_dotted

plot(close, style = plotStyle)
hline(100, linestyle = hlineStyle)
```

有关详细信息，请参阅 本指南的[某些函数参数现在需要内置参数部分。](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/v4_to_v5_migration_guide.html#pagetopineversion5-somefunctionparametersnowrequirebuiltinarguments)

### 未声明的标识符 'input.%input_name%' 

要解决此问题，请`input.*`从代码中删除常量：

```javascript
// Will cause an error during conversion
_integer = input.integer
_bool = input.bool
i1 = input(1, "Integer", _integer)
i2 = input(true, "Boolean", _bool)

// Will work in v5
i1 = input.int(1, "Integer")
i2 = input.bool(true, "Boolean")
```

有关详细信息，请参阅用户手册的[输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#pageinputs)页面，以及 本指南的[某些函数参数现在需要内置参数部分。](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/v4_to_v5_migration_guide.html#pagetopineversion5-somefunctionparametersnowrequirebuiltinarguments)

### “strategy.close”调用中的参数“when”无效

[这是由于strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)和 [strategy.close()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close)之间的混淆造成的。

[Strategy.close()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close)的第二个参数 是`when`，它需要一个“bool”参数。在 v4 中，允许使用`strategy.long`参数，因为它是“bool”。然而，在 v5 中，命名内置常量必须用作参数，因此`strategy.long`不再允许作为参数的参数`when`。

此代码中的调用相当于，这是 v5 中必须使用的：`strategy.close("Short", strategy.long)``strategy.close("Short")`

```javascript
// Will cause an error during conversion
if (longCondition)
    strategy.close("Short", strategy.long)
    strategy.entry("Long", strategy.long)

// Will work in v5:
if (longCondition)
    strategy.close("Short")
    strategy.entry("Long", strategy.long)
```

有关详细信息，请参阅 本指南的[某些函数参数现在需要内置参数部分。](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/v4_to_v5_migration_guide.html#pagetopineversion5-somefunctionparametersnowrequirebuiltinarguments)

### 无法使用参数“minval”=“%value%”调用“input.int”。使用了“literal float”类型的参数，但需要“const int” 

`minval`在 v4 中，当输入“int”值时可以传递“float”参数。这在 v5 中不再可能； “int”输入需要“int”值：

```javascript
// Works in v4, will break on conversion because minval is a 'float' value
int_input = input(1, "Integer", input.integer, minval = 1.0)

// Works in v5
int_input = input.int(1, "Integer", minval = 1)
```

有关详细信息，请参阅用户手册的[输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#pageinputs)页面，以及 本指南的[某些函数参数现在需要内置参数部分。](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/v4_to_v5_migration_guide.html#pagetopineversion5-somefunctionparametersnowrequirebuiltinarguments)



## [所有变量、函数和参数名称更改](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/To_Pine_version_5.html#id14)

### 删除的函数和变量

| v4                     | v5                          |
| ---------------------- | --------------------------- |
| `input.bool`输入       | 取而代之`input.bool()`      |
| `input.color`输入      | 取而代之`input.color()`     |
| `input.float`输入      | 取而代之`input.float()`     |
| `input.integer`输入    | 取而代之`input.int()`       |
| `input.resolution`输入 | 取而代之`input.timeframe()` |
| `input.session`输入    | 取而代之`input.session()`   |
| `input.source`输入     | 取而代之`input.source()`    |
| `input.string`输入     | 取而代之`input.string()`    |
| `input.symbol`输入     | 取而代之`input.symbol()`    |
| `input.time`输入       | 取而代之`input.time()`      |
| `iff()`                | 使用`?:`运算符代替          |
| `offset()`             | 使用`[]`运算符代替          |

### 重命名的函数和参数

#### 没有命名空间变化

| v4                                                 | v5                                                   |
| -------------------------------------------------- | ---------------------------------------------------- |
| `study(<...>, resolution, resolution_gaps, <...>)` | `indicator(<...>, timeframe, timeframe_gaps, <...>)` |
| `strategy.entry(long)`                             | `strategy.entry(direction)`                          |
| `strategy.order(long)`                             | `strategy.order(direction)`                          |
| `time(resolution)`                                 | `time(timeframe)`                                    |
| `time_close(resolution)`                           | `time_close(timeframe)`                              |
| `nz(x, y)`                                         | `nz(source, replacement)`                            |

#### 用于技术分析函数和变量的“ta”命名空间

| v4                                        | v5                                         |
| ----------------------------------------- | ------------------------------------------ |
| 指示函数和变量                            |                                            |
| `accdist`                                 | `ta.accdist`                               |
| `alma()`                                  | `ta.alma()`                                |
| `atr()`                                   | `ta.atr()`                                 |
| `bb()`                                    | `ta.bb()`                                  |
| `bbw()`                                   | `ta.bbw()`                                 |
| `cci()`                                   | `ta.cci()`                                 |
| `cmo()`                                   | `ta.cmo()`                                 |
| `cog()`                                   | `ta.cog()`                                 |
| `dmi()`                                   | `ta.dmi()`                                 |
| `ema()`                                   | `ta.ema()`                                 |
| `hma()`                                   | `ta.hma()`                                 |
| `iii`                                     | `ta.iii`                                   |
| `kc()`                                    | `ta.kc()`                                  |
| `kcw()`                                   | `ta.kcw()`                                 |
| `linreg()`                                | `ta.linreg()`                              |
| `macd()`                                  | `ta.macd()`                                |
| `mfi()`                                   | `ta.mfi()`                                 |
| `mom()`                                   | `ta.mom()`                                 |
| `nvi`                                     | `ta.nvi`                                   |
| `obv`                                     | `ta.obv`                                   |
| `pvi`                                     | `ta.pvi`                                   |
| `pvt`                                     | `ta.pvt`                                   |
| `rma()`                                   | `ta.rma()`                                 |
| `roc()`                                   | `ta.roc()`                                 |
| `rsi(x, y)`                               | `ta.rsi(source, length)`                   |
| `sar()`                                   | `ta.sar()`                                 |
| `sma()`                                   | `ta.sma()`                                 |
| `stoch()`                                 | `ta.stoch()`                               |
| `supertrend()`                            | `ta.supertrend()`                          |
| `swma(x)`                                 | `ta.swma(source)`                          |
| `tr`                                      | `ta.tr`                                    |
| `tr()`                                    | `ta.tr()`                                  |
| `tsi()`                                   | `ta.tsi()`                                 |
| `vwap`                                    | `ta.vwap`                                  |
| `vwap(x)`                                 | `ta.vwap(source)`                          |
| `vwma()`                                  | `ta.vwma()`                                |
| `wad`                                     | `ta.wad`                                   |
| `wma()`                                   | `ta.wma()`                                 |
| `wpr()`                                   | `ta.wpr()`                                 |
| `wvad`                                    | `ta.wvad`                                  |
| 配套功能                                  |                                            |
| `barsince()`                              | `ta.barsince()`                            |
| `change()`                                | `ta.change()`                              |
| `correlation(source_a, source_b, length)` | `ta.correlation(source1, source2, length)` |
| `cross(x, y)`                             | `ta.cross(source1, source2)`               |
| `crossover(x, y)`                         | `ta.crossover(source1, source2)`           |
| `crossunder(x, y)`                        | `ta.crossunder(source1, source2)`          |
| `cum(x)`                                  | `ta.cum(source)`                           |
| `dev()`                                   | `ta.dev()`                                 |
| `falling()`                               | `ta.falling()`                             |
| `highest()`                               | `ta.highest()`                             |
| `highestbars()`                           | `ta.highestbars()`                         |
| `lowest()`                                | `ta.lowest()`                              |
| `lowestbars()`                            | `ta.lowestbars()`                          |
| `median()`                                | `ta.median()`                              |
| `mode()`                                  | `ta.mode()`                                |
| `percentile_linear_interpolation()`       | `ta.percentile_linear_interpolation()`     |
| `percentile_nearest_rank()`               | `ta.percentile_nearest_rank()`             |
| `percentrank()`                           | `ta.percentrank()`                         |
| `pivothigh()`                             | `ta.pivothigh()`                           |
| `pivotlow()`                              | `ta.pivotlow()`                            |
| `range()`                                 | `ta.range()`                               |
| `rising()`                                | `ta.rising()`                              |
| `stdev()`                                 | `ta.stdev()`                               |
| `valuewhen()`                             | `ta.valuewhen()`                           |
| `variance()`                              | `ta.variance()`                            |

#### 数学相关函数和变量的“math”命名空间

| v4                    | v5                              |
| --------------------- | ------------------------------- |
| `abs(x)`              | `math.abs(number)`              |
| `acos(x)`             | `math.acos(number)`             |
| `asin(x)`             | `math.asin(number)`             |
| `atan(x)`             | `math.atan(number)`             |
| `avg()`               | `math.avg()`                    |
| `ceil(x)`             | `math.ceil(number)`             |
| `cos(x)`              | `math.cos(angle)`               |
| `exp(x)`              | `math.exp(number)`              |
| `floor(x)`            | `math.floor(number)`            |
| `log(x)`              | `math.log(number)`              |
| `log10(x)`            | `math.log10(number)`            |
| `max()`               | `math.max()`                    |
| `min()`               | `math.min()`                    |
| `pow()`               | `math.pow()`                    |
| `random()`            | `math.random()`                 |
| `round(x, precision)` | `math.round(number, precision)` |
| `round_to_mintick(x)` | `math.round_to_mintick(number)` |
| `sign(x)`             | `math.sign(number)`             |
| `sin(x)`              | `math.sin(angle)`               |
| `sqrt(x)`             | `math.sqrt(number)`             |
| `sum()`               | `math.sum()`                    |
| `tan(x)`              | `math.tan(angle)`               |
| `todegrees()`         | `math.todegrees()`              |
| `toradians()`         | `math.toradians()`              |

#### 请求外部数据的函数的“request”命名空间

| v4                                   | v5                                          |
| ------------------------------------ | ------------------------------------------- |
| `financial()`                        | `request.financial()`                       |
| `quandl()`                           | `request.quandl()`                          |
| `security(<...>, resolution, <...>)` | `request.security(<...>, timeframe, <...>)` |
| `splits()`                           | `request.splits()`                          |
| `dividends()`                        | `request.dividends()`                       |
| `earnings()`                         | `request.earnings()`                        |

#### 帮助创建股票代码的函数的“股票代码”命名空间

| v4              | v5                     |
| --------------- | ---------------------- |
| `heikinashi()`  | `ticker.heikinashi()`  |
| `kagi()`        | `ticker.kagi()`        |
| `linebreak()`   | `ticker.linebreak()`   |
| `pointfigure()` | `ticker.pointfigure()` |
| `renko()`       | `ticker.renko()`       |
| `tickerid()`    | `ticker.new()`         |

#### 操作字符串的函数的“str”命名空间

| v4               | v5                            |
| ---------------- | ----------------------------- |
| `tostring(x, y)` | `str.tostring(value, format)` |
| `tonumber(x)`    | `str.tonumber(string)`        |