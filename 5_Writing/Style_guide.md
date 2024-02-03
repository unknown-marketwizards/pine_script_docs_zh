# 风格指南

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id1)

本风格指南提供了有关如何命名变量以及如何以有效的标准方式组织 Pine 脚本的建议。遵循我们最佳实践的脚本将更易于阅读、理解和维护。

您可以查看使用 平台上的[TradingView](https://www.tradingview.com/u/TradingView/#published-scripts)和 [PineCoders帐户发布的这些指南的脚本。](https://www.tradingview.com/u/PineCoders/#published-scripts)

## [命名约定](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id2)

我们建议使用：

- `camelCase`对于所有标识符，即变量或函数名称：`ma`, `maFast`, `maLengthInput`, `maColor`, `roundedOHLC()`, `pivotHi()`。
- `SNAKE_CASE`常量全部大写： `BULL_COLOR`, `BEAR_COLOR`, `MAX_LOOKBACK`.
- 当限定后缀提供有关变量的类型或出处的有价值的线索时使用： `maShowInput`, `bearColor`, `bearColorInput`, `volumesArray`, `maPlotID`, `resultsTable`, `levelsColorArray`。

## [脚本组织](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id3)

Pine Script™ 编译器对脚本中特定语句或版本[编译器注释](https://www.tradingview.com/pine-script-docs/en/v5/language/Script_structure.html#pagescriptstructure-compilerannotations)的定位相当宽容。虽然其他安排在语法上是正确的，但我们建议这样组织脚本：

```javascript
<license>
<version>
<declaration_statement>
<import_statements>
<constant_declarations>
<inputs>
<function_declarations>
<calculations>
<strategy_calls>
<visuals>
<alerts>
```

### [<许可证](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id4)

如果您在 TradingView 上公开发布开源脚本（脚本也可以私下发布），则您的开源代码默认受 Mozilla 许可证保护。您可以选择您喜欢的任何其他许可证。

[这些脚本中代码的重用受我们的脚本发布内部规则](https://www.tradingview.com/support/solutions/43000590599)的约束 ，该规则优先于作者的许可。

出现在脚本开头的标准许可证注释是：

```javascript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © username
```

### [<版本](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id5)

这是定义脚本将使用的 Pine Script™ 版本的[编译器注释](https://www.tradingview.com/pine-script-docs/en/v5/language/Script_structure.html#pagescriptstructure-compilerannotations)。如果不存在，则使用 v1。对于 v5，请使用：

```javascript
//@version=5
```

### [<声明语句> ](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id6)

这是定义脚本类型的强制声明语句。它必须是对[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)、 [Strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)或 [Library()](https://www.tradingview.com/pine-script-reference/v5/#fun_library)的调用 。

### [<导入语句> ](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id7)

如果您的脚本使用一个或多个 Pine Script™[库](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#pagelibraries)，则您的[导入](https://www.tradingview.com/pine-script-reference/v5/#op_import)语句属于此处。

### [<常量声明](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id8)

脚本可以声明限定为“const”的变量，即引用常量值的变量。

当变量满足以下条件时，我们将变量称为“常量”：

- 它们的声明使用可选关键字（有关更多信息，`const`请参阅我们的用户手册中有关[类型限定符的部分）。](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-qualifiers)
- 它们使用文字（例如，`100`或`"AAPL"`）或内置限定为“const”（例如，`color.green`）来初始化。
- 它们的值在脚本执行期间不会改变。

我们用来`SNAKE_CASE`命名这些变量并将它们的声明分组在脚本顶部附近。例如：

```javascript
// ————— Constants
int     MS_IN_MIN   = 60 * 1000
int     MS_IN_HOUR  = MS_IN_MIN  * 60
int     MS_IN_DAY   = MS_IN_HOUR * 24

color   GRAY        = #808080ff
color   LIME        = #00FF00ff
color   MAROON      = #800000ff
color   ORANGE      = #FF8000ff
color   PINK        = #FF0080ff
color   TEAL        = #008080ff
color   BG_DIV      = color.new(ORANGE, 90)
color   BG_RESETS   = color.new(GRAY, 90)

string  RST1        = "No reset; cumulate since the beginning of the chart"
string  RST2        = "On a stepped higher timeframe (HTF)"
string  RST3        = "On a fixed HTF"
string  RST4        = "At a fixed time"
string  RST5        = "At the beginning of the regular session"
string  RST6        = "At the first visible chart bar"
string  RST7        = "Fixed rolling period"

string  LTF1        = "Least precise, covering many chart bars"
string  LTF2        = "Less precise, covering some chart bars"
string  LTF3        = "More precise, covering less chart bars"
string  LTF4        = "Most precise, 1min intrabars"

string  TT_TOTVOL     = "The 'Bodies' value is the transparency of the total volume candle bodies. Zero is opaque, 100 is transparent."
string  TT_RST_HTF    = "This value is used when '" + RST3 +"' is selected."
string  TT_RST_TIME   = "These values are used when '" + RST4 +"' is selected.
  A reset will occur when the time is greater or equal to the bar's open time, and less than its close time.\nHour: 0-23\nMinute: 0-59"
string  TT_RST_PERIOD = "This value is used when '" + RST7 +"' is selected."
```

在这个例子中：

- 和常量将用作调用参数中`RST*`的元组元素。`LTF*``options``input.*()`
- 这些`TT_*`常量将用作调用`tooltip`中的参数`input.*()`。请注意我们如何对长字符串文字使用续行。
- 我们不使用[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)来初始化常量。 Pine Script™ 运行时经过优化，可以处理每个柱上的声明，但仅在第一次声明变量时 使用[var来初始化变量，这会对脚本性能造成较小的损失，因为](https://www.tradingview.com/pine-script-reference/v5/#op_var)[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)变量需要在更多柱上进行维护。

注意：

- 脚本中多处使用的文字应始终声明为常量。如果给定一个有意义的名称，则使用常量而不是文字可以使其更具可读性，并且这种做法使代码更易于维护。尽管一天中的毫秒数将来不太可能改变，但`MS_IN_DAY`比 更有意义。`1000 * 60 * 60 * 24`
- 仅在函数的本地块或[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)、 [while](https://www.tradingview.com/pine-script-reference/v5/#op_while)等语句中使用的常量可以在该本地块中声明。

### [<输入](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id9)

当所有输入都位于同一代码段中时，读取脚本会容易**得多**。将该部分放在脚本的开头还反映了它们在运行时（即在执行脚本的其余部分之前）的处理方式。

输入变量名称后缀`input`使它们在稍后在脚本中使用时更容易识别： `maLengthInput`、`bearColorInput`、`showAvgInput`等。

```javascript
// ————— Inputs
string  resetInput              = input.string(RST2,        "CVD Resets",                       inline = "00", options = [RST1, RST2, RST3, RST4, RST5, RST6, RST7])
string  fixedTfInput            = input.timeframe("D",      "  Fixed HTF:  ",                   tooltip = TT_RST_HTF)
int     hourInput               = input.int(9,              "  Fixed time hour:  ",             inline = "01", minval = 0, maxval = 23)
int     minuteInput             = input.int(30,             "minute",                           inline = "01", minval = 0, maxval = 59, tooltip = TT_RST_TIME)
int     fixedPeriodInput        = input.int(20,             "  Fixed period:  ",                inline = "02", minval = 1, tooltip = TT_RST_PERIOD)
string  ltfModeInput            = input.string(LTF3,        "Intrabar precision",               inline = "03", options = [LTF1, LTF2, LTF3, LTF4])
```



### [<函数声明> ](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id10)

所有用户定义的函数必须在脚本的全局范围内定义； Pine Script™ 中不允许嵌套函数定义。

最佳函数设计应尽量减少函数范围内全局变量的使用，因为它们会破坏函数的可移植性。当无法避免时，这些函数必须遵循代码中的全局变量声明，这意味着它们不能总是放置在 <function_declarations> 部分中。理想情况下，这种对全局变量的依赖性应该记录在函数的注释中。

如果您记录该函数的目标、参数和结果，也会对读者有所帮助。[库](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#pagelibraries)中使用的相同语法可用于记录您的函数。如果您决定这样做，这可以使您更轻松地将函数移植到库中：

```javascript
//@version=5
indicator("<function_declarations>", "", true)

string SIZE_LARGE  = "Large"
string SIZE_NORMAL = "Normal"
string SIZE_SMALL  = "Small"

string sizeInput = input.string(SIZE_NORMAL, "Size", options = [SIZE_LARGE, SIZE_NORMAL, SIZE_SMALL])

// @function        Used to produce an argument for the `size` parameter in built-in functions.
// @param userSize  (simple string) User-selected size.
// @returns         One of the `size.*` built-in constants.
// Dependencies:    SIZE_LARGE, SIZE_NORMAL, SIZE_SMALL
getSize(simple string userSize) =>
    result =
      switch userSize
        SIZE_LARGE  => size.large
        SIZE_NORMAL => size.normal
        SIZE_SMALL  => size.small
        => size.auto

if ta.rising(close, 3)
    label.new(bar_index, na, yloc = yloc.abovebar, style = label.style_arrowup, size = getSize(sizeInput))
```

### [<计算](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id11)

这是脚本的核心计算和逻辑应该放置的地方。当变量声明放置在使用变量的代码段附近时，代码可以更容易阅读。一些程序员喜欢将所有非常量变量声明放在本节的开头，这并不总是适用于所有变量，因为有些变量可能需要在声明之前执行一些计算。

### [<策略调用](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id12)

当策略调用分组在脚本的同一部分时，策略更易于阅读。

### [<视觉效果](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id13)

理想情况下，此部分应包括生成脚本视觉效果的所有语句，无论它们是绘图、绘图、背景颜色、蜡烛图等。请参阅此处的 Pine Script™ 用户手册部分，了解有关视觉效果的相对[深度](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#pagecolors-zindex)如何的更多信息决定。

### [<警报> ](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id14)

警报代码通常要求脚本的计算在其之前执行，因此将其放在脚本的末尾是有意义的。

## [间距](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id15)

除一元运算符 ( ) 外，所有运算符两侧均应使用空格`-1`。还建议在所有逗号之后以及使用命名函数参数时使用空格，如下所示：`plot(series = close)`

```javascript
int a = close > open ? 1 : -1
var int newLen = 2
newLen := min(20, newlen + 1)
float a = -b
float c = d > e ? d - e : d
int index = bar_index % 2 == 0 ? 1 : 2
plot(close, color = color.red)
```

## [换行](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id16)

换行可以使长行更易于阅读。换行是通过使用不是四的倍数的缩进级别来定义的，因为四个空格或制表符用于定义本地块。这里我们使用两个空格：

```javascript
plot(
   series = close,
   title = "Close",
   color = color.blue,
   show_last = 10
 )
```

## [垂直对齐](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id17)

使用制表符或空格进行垂直对齐在包含许多类似行（例如常量声明或输入）的代码节中非常有用。他们可以使用 Pine 编辑器的多光标功能 ( ctrl+ alt+ 🠅/ 🠇) 使批量编辑变得更加容易：

```javascript
// Colors used as defaults in inputs.
color COLOR_AQUA  = #0080FFff
color COLOR_BLACK = #000000ff
color COLOR_BLUE  = #013BCAff
color COLOR_CORAL = #FF8080ff
color COLOR_GOLD  = #CCCC00ff
```

## [显式输入](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#id18)

在声明变量时包含变量的类型不是必需的，并且对于小脚本来说通常是过度的；我们没有系统地使用它。它可以使函数结果的类型更加清晰，并区分变量的声明（使用`=`）与其重新赋值（使用`:=`）。使用显式类型还可以让读者更轻松地在较大的脚本中找到自己的方式。

[
](https://www.tradingview.com/)