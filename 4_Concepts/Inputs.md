# 输入

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id1)

输入允许脚本接收用户可以更改的值。将它们用作键值将使您的脚本更适合用户首选项。

以下脚本使用绘制 20 周期[简单移动平均线 (SMA)](https://www.tradingview.com/support/solutions/43000502589)。虽然写起来很简单，但它不是很灵活，因为它只会绘制特定的 MA：`ta.sma(close, 20)`

```
Pine Script™
Copied//@version=5
indicator("MA", "", true)
plot(ta.sma(close, 20))
```

相反，如果我们以这种方式编写脚本，它会变得更加灵活，因为它的用户将能够选择源和他们想要用于 MA 计算的长度：

```
Pine Script™
Copied//@version=5
indicator("MA", "", true)
sourceInput = input(close, "Source")
lengthInput = input(20, "Length")
plot(ta.sma(sourceInput, lengthInput))
```

仅当脚本在图表上运行时才能访问输入。脚本用户通过脚本的“设置”对话框访问它们，可以通过以下任一方式访问：

- 双击图表上指标的名称
- 右键单击脚本名称并从下拉菜单中选择“设置”项
- 将鼠标悬停在图表上指标名称上时出现的“更多”菜单图标（三个点）中选择“设置”项
- 双击数据窗口中的指标名称（图表右侧下方的第四个图标）

“设置”对话框始终包含“样式”和“可见性”选项卡，允许用户指定脚本视觉效果以及脚本可见的图表时间范围的首选项。

当脚本包含对`input.*()`函数的调用时，“设置”对话框中会出现“输入”选项卡。

![../_images/Inputs-Introduction-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-Introduction-1.png)

在脚本执行流程中，当脚本已位于图表上并且用户更改“输入”选项卡中的值时，将处理输入。这些更改会触发所有图表栏上脚本的重新执行，因此当用户更改输入值时，您的脚本将使用该新值重新计算。

## [输入功能](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id2)

可以使用以下输入功能：

- [input()](https://www.tradingview.com/pine-script-reference/v5/#fun_input)
- [input.int()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}int)
- [input.float()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}float)
- [input.bool()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}bool)
- [input.颜色()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}color)
- [input.string()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}string)
- [input.timeframe()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}timeframe)
- [input.symbol()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}symbol)
- [input.price()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}price)
- [input.source()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}source)
- [input.session()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}session)
- [input.time()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}time)

在“输入”选项卡中创建一个特定的输入*小部件*来接受每种类型的输入。除非在`input.*()`调用中另有指定，否则每个输入都会按照调用`input.*()`在脚本中出现的顺序显示在“输入”选项卡的新行中。

我们的[风格指南](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#pagestyleguide)建议将调用`input.*()`放在脚本的开头。

输入函数定义通常包含许多参数，这些参数允许您控制输入的默认值、它们的限制以及它们在“输入”选项卡中的组织。

调用`input*.()`只是 Pine Script™ 中的另一个函数调用，其结果可以与 [算术](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-arithmeticoperators)、比较、 [逻辑](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-logicaloperators)或[三元](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-ternaryoperator) 运算符组合以形成要分配给变量的表达式。在这里，我们将调用 [input.string()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}string)的结果与 string进行比较`"On"`。然后表达式的结果存储在`plotDisplayInput`变量中。由于该变量保存一个`true`or`false`值，因此它是“输入 bool”类型：

```
Pine Script™
Copied//@version=5
indicator("Input in an expression`", "", true)
bool plotDisplayInput = input.string("On", "Plot Display", options = ["On", "Off"]) == "On"
plot(plotDisplayInput ? close : na)
```

除“源”值外，函数返回的所有值`input.*()`都是“输入”限定值。有关更多信息，请参阅我们的用户手册中有关[类型限定符](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-qualifiers)的部分。

## [输入函数参数](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id3)

所有输入函数共有的参数是： `defval`、`title`、`tooltip`和。其他输入函数使用一些参数： 、、和。`inline``group``options``minval``maxval``step``confirm`

所有这些参数都需要“const”参数（除非它是用于“源”的输入，它返回“系列浮点数”结果）。这意味着它们必须在编译时已知，并且在脚本执行期间不能更改。由于函数的结果`input.*()`始终被限定为“input”或“series”，因此一个`input.*()`函数调用的结果不能用作后续`input.*()`调用中的参数，因为“input”限定符比“const”强。

让我们看一下每个参数：

- `defval`是所有输入函数的第一个参数。这是将出现在输入小部件中的默认值。它需要一个函数所使用的输入值类型的参数。
- `title`需要一个“const string”参数。这是该字段的标签。
- `tooltip`需要一个“const string”参数。使用该参数时，字段右侧会出现一个问号图标。当用户将鼠标悬停在其上时，将显示工具提示的文本。请注意，如果使用 将多个输入字段分组在一行上`inline`，则工具提示将始终显示在最右侧字段的右侧，并显示`tooltip`该行中使用的最后一个参数的文本。`\n`参数字符串支持换行符 ( )。
- `inline`需要一个“const string”参数。在多个调用中使用相同的参数作为参数`input.*()`会将它们的输入小部件分组在同一行上。 “输入”选项卡展开的宽度有限制，因此一行中可以容纳有限数量的输入字段。使用`input.*()`带有唯一参数的一次调用`inline` ，可以将输入字段紧接在标签之后向左移动，从而放弃在不`inline`使用参数时使用的所有输入字段的默认左对齐方式。
- `group`需要一个“const string”参数。它用于将任意数量的输入分组到同一部分中。用作参数的字符串`group`将成为该节的标题。要组合在一起的所有`input.*()`调用必须使用相同的字符串作为其`group`参数。
- `options`需要一个用方括号括起来的以逗号分隔的元素列表（例如，。它用于创建一个下拉菜单，以菜单选择的形式提供列表的元素。只能选择一个菜单项。使用列表时，value 必须是列表的元素之一。当在允许、或 的输入函数中使用时，这些参数不能同时使用。`["ON", "OFF"]``options``defval``options``minval``maxval``step`
- `minval`需要一个“const int/float”参数，具体取决于值的类型`defval`。它是输入字段的最小有效值。
- `maxval`需要一个“const int/float”参数，具体取决于值的类型`defval`。它是输入字段的最大有效值。
- `step`是使用小部件的向上/向下箭头时字段值将移动的增量。
- `confirm`需要一个“const bool”（`true`或`false`）参数。此参数会影响脚本添加到图表时的行为。 当脚本添加到图表时，`input.*()`使用调用将导致弹出“设置/输入”选项卡。对于确保用户配置特定字段很有用。`confirm = true``confirm`

、`minval`和参数仅出现在[input.int()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}int)`maxval`和[input.float()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}float)函数的 `step`签名中 。

## [输入类型](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id4)

接下来的部分将解释每个输入函数的作用。在我们继续进行的过程中，我们将探索使用输入功能和组织其显示的不同方式。

### [简单输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id5)

[input()](https://www.tradingview.com/pine-script-reference/v5/#fun_input)是一个简单的通用函数，支持基本的 Pine Script™ 类型：“int”、“float”、“bool”、“color”和“string”。它还支持“源”输入，这些输入是与价格相关的值，例如 [close](https://www.tradingview.com/pine-script-reference/v5/#var_close)、 [hl2](https://www.tradingview.com/pine-script-reference/v5/#hl2)、 [hlc3](https://www.tradingview.com/pine-script-reference/v5/#var_hlc3)和 [hlcc4](https://www.tradingview.com/pine-script-reference/v5/#var_hlcc4)，或者可用于接收另一个脚本的输出值。

它的签名是：

```
Pine Script™
Copiedinput(defval, title, tooltip, inline, group) → input int/float/bool/color/string | series float
```

`defval`该函数通过分析函数调用中使用的参数类型来自动检测输入的类型。此脚本显示了所有支持的类型以及与`defval`不同类型的参数一起使用时函数返回的限定类型：

```
Pine Script™
Copied//@version=5
indicator("`input()`", "", true)
a = input(1, "input int")
b = input(1.0, "input float")
c = input(true, "input bool")
d = input(color.orange, "input color")
e = input("1", "input string")
f = input(close, "series float")
plot(na)
```

### [整数输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id6)

[input.int()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}int)函数存在两个签名 ；一个`options`是不使用时，另一个是：

```
Pine Script™
Copiedinput.int(defval, title, minval, maxval, step, tooltip, inline, group, confirm) → input int
input.int(defval, title, options, tooltip, inline, group, confirm) → input int
```

此调用使用`options`参数来建议 MA 的预定义长度列表：

```
Pine Script™
Copied//@version=5
indicator("MA", "", true)
maLengthInput = input.int(10, options = [3, 5, 7, 10, 14, 20, 50, 100, 200])
ma = ta.sma(close, maLengthInput)
plot(ma)
```

这个使用`minval`参数来限制长度：

```
Pine Script™
Copied//@version=5
indicator("MA", "", true)
maLengthInput = input.int(10, minval = 2)
ma = ta.sma(close, maLengthInput)
plot(ma)
```

带有列表的版本`options`对其小部件使用下拉菜单。当`options`不使用参数时，使用简单的输入小部件来输入值。

![../_images/Inputs-InputTypes-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-InputTypes-02.png)

### [浮点输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id7)

[input.float()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}float)函数存在两个签名；一个`options`是不使用时，另一个是：

```
Pine Script™
Copiedinput.int(defval, title, minval, maxval, step, tooltip, inline, group, confirm) → input int
input.int(defval, title, options, tooltip, inline, group, confirm) → input int
```

在这里，我们使用“浮点”输入作为乘以标准差的因子，以计算布林线：

```
Pine Script™
Copied//@version=5
indicator("MA", "", true)
maLengthInput = input.int(10, minval = 1)
bbFactorInput = input.float(1.5, minval = 0, step = 0.5)
ma      = ta.sma(close, maLengthInput)
bbWidth = ta.stdev(ma, maLengthInput) * bbFactorInput
bbHi    = ma + bbWidth
bbLo    = ma - bbWidth
plot(ma)
plot(bbHi, "BB Hi", color.gray)
plot(bbLo, "BB Lo", color.gray)
```

浮点数的输入小部件与用于整数输入的输入小部件类似。

![../_images/Inputs-InputTypes-03.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-InputTypes-03.png)

### [布尔输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id8)

让我们继续进一步开发我们的脚本，这次添加一个布尔输入以允许用户切换 BB 的显示：

```
Pine Script™
Copied//@version=5
indicator("MA", "", true)
maLengthInput = input.int(10,    "MA length", minval = 1)
bbFactorInput = input.float(1.5, "BB factor", inline = "01", minval = 0, step = 0.5)
showBBInput   = input.bool(true, "Show BB",   inline = "01")
ma      = ta.sma(close, maLengthInput)
bbWidth = ta.stdev(ma, maLengthInput) * bbFactorInput
bbHi    = ma + bbWidth
bbLo    = ma - bbWidth
plot(ma, "MA", color.aqua)
plot(showBBInput ? bbHi : na, "BB Hi", color.gray)
plot(showBBInput ? bbLo : na, "BB Lo", color.gray)
```

注意：

- [我们使用input.bool()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}bool)添加了一个输入 来设置 的值`showBBInput`。
- 我们使用`inline`该输入中的参数和 for 中的参数`bbFactorInput`将它们放在同一行。我们`"01"`在这两种情况下都使用它的参数。这就是 Pine Script™ 编译器识别它们属于同一行的方式。用作参数的特定字符串并不重要，并且不会出现在“输入”选项卡中的任何位置；它仅用于识别哪些输入位于同一行。
- 我们垂直对齐了调用`title`的参数`input.*()`，以使它们更易于阅读。
- 我们`showBBInput`在两次[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot) 调用中使用该变量来有条件地绘制。当用户取消选中输入的复选框时`showBBInput`，变量的值变为`false`。当这种情况发生时，我们的[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot) 调用绘制[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值，该值不显示任何内容。我们使用`true`作为输入的默认值，因此默认绘制 BB。
- 因为我们使用变量`inline`的参数`bbFactorInput`，所以它在“输入”选项卡中的输入字段不会与`maLengthInput`不使用 的输入字段垂直对齐`inline`。

![../_images/Inputs-InputTypes-04.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-InputTypes-04.png)

### [颜色输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id9)

正如 “颜色”页面的通过脚本设置进行颜色选择部分中所述，通常出现在“设置/样式”选项卡中的颜色选择并不总是可用。在这种情况下，脚本用户将无法更改脚本使用的颜色。对于这些情况，如果您希望可以通过脚本的“设置”修改脚本的颜色，则必须提供颜色输入。然后，您将允许脚本用户使用调用[input.color()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}color)来更改颜色，而不是使用“设置/样式”选项卡来更改颜色。

[假设当高值](https://www.tradingview.com/pine-script-reference/v5/#var_high)和 [低值](https://www.tradingview.com/pine-script-reference/v5/#var_low) 高于/低于BB 时，我们希望将 BB 绘制为较浅的阴影 。您可以使用这样的代码来创建颜色：

```
Pine Script™
CopiedbbHiColor = color.new(color.gray, high > bbHi ? 60 : 0)
bbLoColor = color.new(color.gray, low  < bbLo ? 60 : 0)
```

当使用动态（或“系列”）颜色组件（例如此处的透明度）时，“设置/样式”中的颜色小部件将不再出现。让我们创建自己的，它将出现在我们的“输入”选项卡中：

```
Pine Script™
Copied//@version=5
indicator("MA", "", true)
maLengthInput = input.int(10,           "MA length", inline = "01", minval = 1)
maColorInput  = input.color(color.aqua, "",          inline = "01")
bbFactorInput = input.float(1.5,        "BB factor", inline = "02", minval = 0, step = 0.5)
bbColorInput  = input.color(color.gray, "",          inline = "02")
showBBInput   = input.bool(true,        "Show BB",   inline = "02")
ma      = ta.sma(close, maLengthInput)
bbWidth = ta.stdev(ma, maLengthInput) * bbFactorInput
bbHi    = ma + bbWidth
bbLo    = ma - bbWidth
bbHiColor = color.new(bbColorInput, high > bbHi ? 60 : 0)
bbLoColor = color.new(bbColorInput, low  < bbLo ? 60 : 0)
plot(ma, "MA", maColorInput)
plot(showBBInput ? bbHi : na, "BB Hi", bbHiColor, 2)
plot(showBBInput ? bbLo : na, "BB Lo", bbLoColor, 2)
```

注意：

- 我们添加了两次对[input.color() 的](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}color)`maColorInput`调用来收集和变量 的值`bbColorInput`。我们`maColorInput`直接在 调用中使用，并用于构建和变量，这些变量使用价格相对于 BB 的位置来调节透明度。我们对调用 [color.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}new)的值使用条件值，以生成相同基色的不同透明度。`plot(ma, "MA", maColorInput)``bbColorInput``bbHiColor``bbLoColor``transp`
- 我们不`title`为新的颜色输入使用参数，因为它们与其他输入位于同一行，允许用户了解它们应用到哪些绘图。
- 我们重新组织了我们的`inline`论点，以便它们反映了我们的输入分为两条不同的线的事实。

![../_images/Inputs-InputTypes-05.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-InputTypes-05.png)



### [时间范围输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id10)

当您希望能够更改用于计算脚本中的值的时间范围时，时间范围输入会很有用。

让我们去掉前面部分中的 BB，并将时间范围输入添加到简单的 MA 脚本中：

```
Pine Script™
Copied//@version=5
indicator("MA", "", true)
tfInput = input.timeframe("D", "Timeframe")
ma = ta.sma(close, 20)
securityNoRepaint(sym, tf, src) =>
    request.security(sym, tf, src[barstate.isrealtime ? 1 : 0])[barstate.isrealtime ? 0 : 1]
maHTF = securityNoRepaint(syminfo.tickerid, tfInput, ma)
plot(maHTF, "MA", color.aqua)
```

注意：

- 我们使用[input.timeframe()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}timeframe) 函数来接收时间范围输入。
- 该函数创建一个下拉小部件，其中建议了一些标准时间范围。时间范围列表还包括您在图表用户界面中喜欢的任何时间范围。
- `tfInput`我们在[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)调用中使用。我们还在调用中使用，因此该函数仅在较高时间范围完成时返回数据。`gaps = barmerge.gaps_on`

![../_images/Inputs-InputTypes-06.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-InputTypes-06.png)

### [符号输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id11)

input.symbol [()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}symbol) 函数创建一个小部件，允许用户像在图表的用户界面中一样搜索和选择品种。

让我们在脚本中添加一个符号输入：

```
Pine Script™
Copied//@version=5
indicator("MA", "", true)
tfInput = input.timeframe("D", "Timeframe")
symbolInput = input.symbol("", "Symbol")
ma = ta.sma(close, 20)
securityNoRepaint(sym, tf, src) =>
    request.security(sym, tf, src[barstate.isrealtime ? 1 : 0])[barstate.isrealtime ? 0 : 1]
maHTF = securityNoRepaint(symbolInput, tfInput, ma)
plot(maHTF, "MA", color.aqua)
```

注意：

- 我们使用的参数`defval`是一个空字符串。这会导致 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)（我们在其中使用`symbolInput`包含该输入的变量）默认使用图表的符号。如果用户选择另一个交易品种并希望使用图表交易品种返回到默认值，则他需要使用“输入”选项卡的“默认”菜单中的“重置设置”选项。
- 我们使用`securityNoRepaint()`用户定义的函数来使用 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security) ，这样它就不会重绘；它仅在较高时间范围完成时返回值。



### [会话输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id12)

会话输入对于收集一段时间内的起止值非常有用。 input.session [()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}session) 内置函数创建一个输入小部件，允许用户指定会话的开始和结束时间。可以使用下拉菜单或通过输入“hh:mm”格式的时间值来进行选择。

[input.session()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}session)返回的值 是会话格式的有效字符串。有关详细信息，请参阅手册中有关[会话的页面。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#pagesessions)

会话信息还可以包含有关会话有效日期的信息。我们在这里使用[input.string()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}string) 函数调用来输入当天的信息：

```
Pine Script™
Copied//@version=5
indicator("Session input", "", true)
string sessionInput = input.session("0600-1700", "Session")
string daysInput = input.string("1234567", tooltip = "1 = Sunday, 7 = Saturday")
sessionString = sessionInput + ":" + daysInput
inSession = not na(time(timeframe.period, sessionString))
bgcolor(inSession ? color.silver : na)
```

注意：

- 该脚本建议默认会话为“0600-1700”。
- input.string [()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}string) 调用使用工具提示为用户提供有关输入日期信息的格式的帮助。
- 通过连接脚本接收的两个字符串作为输入来构建完整的会话字符串。
- [我们使用string](https://www.tradingview.com/pine-script-reference/v5/#op_string)关键字显式声明两个输入的类型， 以明确这些变量将包含字符串。
- [我们通过使用会话字符串调用time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)来检测图表栏是否位于用户定义的会话中 。如果当前柱的[时间](https://www.tradingview.com/pine-script-reference/v5/#var_time) 值（柱[开盘](https://www.tradingview.com/pine-script-reference/v5/#var_open)的时间）不在会话中，则[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)返回 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，因此 每当[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time) 返回非[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)`inSession`的值时都会返回 na 。`true`

![../_images/Inputs-InputTypes-07.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-InputTypes-07.png)



### [源输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id13)

源输入可用于提供两种类型源的选择：

- 价格值，即： [open](https://www.tradingview.com/pine-script-reference/v5/#var_open)、 [high](https://www.tradingview.com/pine-script-reference/v5/#var_high)、 [low](https://www.tradingview.com/pine-script-reference/v5/#var_low)、 [close](https://www.tradingview.com/pine-script-reference/v5/#var_close)、 [hl2](https://www.tradingview.com/pine-script-reference/v5/#var_hl2)、 [hlc3](https://www.tradingview.com/pine-script-reference/v5/#var_hlc3)和 [ohlc4](https://www.tradingview.com/pine-script-reference/v5/#var_ohlc4)。
- 由其他脚本在图表上绘制的值。通过将一个脚本的输出作为输入发送到另一个脚本，这对于将两个或多个脚本“链接”在一起非常有用。

该脚本仅绘制用户对源的选择。我们建议将[高](https://www.tradingview.com/pine-script-reference/v5/#var_high)值作为默认值：

```
Pine Script™
Copied//@version=5
indicator("Source input", "", true)
srcInput = input.source(high, "Source")
plot(srcInput, "Src", color.new(color.purple, 70), 6)
```

这显示了一个图表，除了我们的脚本之外，我们还加载了“Arnaud Legoux 移动平均线”指标。请参阅此处，了解我们如何使用脚本的源输入小部件来选择 ALMA 脚本的输出作为脚本的输入。因为我们的脚本以浅紫色粗线绘制该源，所以您会看到两个脚本的图重叠，因为它们绘制了相同的值：

![../_images/Inputs-InputTypes-08.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-InputTypes-08.png)

### [时间输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id14)

时间输入使用[input.time()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}time) 函数。该函数返回以毫秒为单位的 Unix 时间（有关更多信息，请参阅[时间](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#pagetime)页面）。这种类型的数据还包含日期信息，因此 [input.time()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}time)函数返回时间**和**日期。这就是为什么它的小部件允许选择两者的原因。

在这里，我们根据输入值测试柱的时间，并在输入值较大时绘制箭头：

```
Pine Script™
Copied//@version=5
indicator("Time input", "T", true)
timeAndDateInput = input.time(timestamp("1 Aug 2021 00:00 +0300"), "Date and time")
barIsLater = time > timeAndDateInput
plotchar(barIsLater, "barIsLater", "🠆", location.top, size = size.tiny)
```

请注意，我们使用的值是对[timestamp()](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp)`defval`函数的调用 。

## [影响输入的其他功能](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id15)

[Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)函数的某些参数 在使用时将使用字段填充脚本的“输入”选项卡。参数是`timeframe`和`timeframe_gaps`。一个例子：

```
Pine Script™
Copied//@version=5
indicator("MA", "", true, timeframe = "D", timeframe_gaps = false)
plot(ta.vwma(close, 10))
```

![../_images/Inputs-OtherFeaturesAffectingInputs-03.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-OtherFeaturesAffectingInputs-03.png)

## [尖端](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#id16)

脚本输入的设计对脚本的可用性具有重要影响。精心设计的输入可以更直观地使用，并带来更好的用户体验：

- 选择清晰简洁的标签（您输入的`title`参数）。
- 仔细选择您的默认值。
- 提供`minval`和`maxval`值，以防止您的代码产生意外结果，例如，根据您使用的 MA 类型，将长度的最小值限制为 1 或 2。
- 提供`step`与您正在捕获的值一致的值。例如，在 0-200 范围内，步长为 5 可能更有用，或者在 0.0-1.0 范围内，步长为 0.05 更有用。
- `inline`使用;将相关输入分组在同一行上例如，牛市和熊市的颜色，或者线条的宽度和颜色。
- 当您有许多输入时，请使用 将它们分组为有意义的部分`group`。将最重要的部分放在顶部。
- **对部分内的**各个输入执行相同的操作。

`input.*()` 在代码中垂直对齐多个调用的不同参数可能会很有利。当您需要进行全局更改时，这将允许您使用编辑器的多光标功能同时对所有行进行操作。

因为有时需要使用 Unicode 空格来实现输入的最佳对齐。这是一个例子：

```
Pine Script™
Copied//@version=5
indicator("Aligned inputs", "", true)

var GRP1 = "Not aligned"
ma1SourceInput   = input(close, "MA source",     inline = "11", group = GRP1)
ma1LengthInput   = input(close, "Length",        inline = "11", group = GRP1)
long1SourceInput = input(close, "Signal source", inline = "12", group = GRP1)
long1LengthInput = input(close, "Length",        inline = "12", group = GRP1)

var GRP2 = "Aligned"
// The three spaces after "MA source" are Unicode EN spaces (U+2002).
ma2SourceInput   = input(close, "MA source   ",  inline = "21", group = GRP2)
ma2LengthInput   = input(close, "Length",        inline = "21", group = GRP2)
long2SourceInput = input(close, "Signal source", inline = "22", group = GRP2)
long2LengthInput = input(close, "Length",        inline = "22", group = GRP2)

plot(ta.vwma(close, 10))
```

![../_images/Inputs-Tips-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Inputs-Tips-1.png)

注意：

- 我们使用`group`参数来区分输入的两部分。我们使用常量来保存组的名称。这样，如果我们决定更改组的名称，我们只需要在一个地方更改它。
- 第一部分输入小部件不垂直对齐。我们正在使用`inline`，它将输入小部件立即放置在标签的右侧。由于`ma1SourceInput`和输入的标签`long1SourceInput`长度不同，因此标签位于不同的*y*位置。
- 为了弥补错位，我们`title`在行中填充了`ma2SourceInput`三个 Unicode EN 空格 (U+2002) 的参数。 Unicode 空格是必要的，因为普通空格会从标签中去除。您可以通过组合不同数量和类型的 Unicode 空格来实现精确对齐。有关不同宽度的[Unicode 空格](https://jkorpela.fi/chars/spaces.html)的列表，请参阅此处链接。