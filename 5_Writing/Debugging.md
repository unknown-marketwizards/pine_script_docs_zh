# 调试

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id1)

TradingView 在 Pine Script™ 编辑器和图表之间紧密集成，可实现 Pine Script™ 代码的高效、交互式调试。一旦程序员了解了在每种情况下使用的最合适的技术，他们将能够快速、彻底地调试脚本。本页演示了调试 Pine Script™ 代码的最有用的技术。

如果您还不熟悉 Pine Script™ 的执行模型，请务必阅读本用户手册的执行模型页面，以便了解调试代码在 Pine Script™ 环境中的行为方式。

## [显示概况](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id2)

Pine 脚本绘制的值可以显示在四个不同的位置：

1. 脚本名称旁边（由“图表设置/状态线”选项卡中的“指标值”复选框控制）。
2. 在脚本的窗格中，无论您的脚本是图表叠加层还是在单独的窗格中。
3. 在比例中（仅显示最后一个柱的值，并由“图表设置/比例”选项卡中的“指标最后值标签”复选框控制）。
4. 在数据窗口中（您可以使用图表右侧第四个图标将其调出）。

![../_images/调试-TheLayOfTheLand-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-TheLayOfTheLand-1.png)

请注意前面屏幕截图中的以下内容：

- 图表的光标位于数据集的第一个条形图上，其中[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)为零。该值反映在指标名称旁边和数据窗口中。 **将光标移动到其他条形图上会更新这些值，因此它们始终代表该条形图上的值。** 这是随着脚本执行逐条进行而检查变量值的好方法。
- `title`我们的[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用的参数“条形索引”被用作数据窗口中值的图例。
- 数据窗口中显示的值的精度取决于图表符号的刻度值。您可以通过两种方式修改它：
  - 通过更改脚本的“设置/样式”选项卡中“精度”字段的值。使用此方法可以获得最多八位数字的精度。
  - `precision`通过在脚本的[indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句中使用参数。此方法允许指定高达 16 位的精度。
- 我们脚本中的plot [()调用在指标窗格中绘制](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)的值，该值显示了变量的增加值。
- 脚本窗格的比例会自动调整大小，以适应脚本中所有[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用绘制的最小和最大值。

## [显示数值](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id3)

### [当脚本的规模不重要时](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id4)

前面的屏幕截图中的脚本使用最简单的方法来检查数值：[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用，它在脚本的显示区域中绘制与变量值相对应的线。我们的示例脚本绘制了[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)内置变量的值，其中包含柱的编号，该值在数据集的第一个柱上从零开始，并在每个后续柱上增加 1。我们使用了[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用来绘制要检查的变量，因为我们的脚本没有绘制任何其他内容；我们并没有专注于保留其他地块的比例以继续正常绘制。这是我们使用的脚本：

```javascript
//@version=5
indicator("Plot `bar_index`")
plot(bar_index, "Bar Index")
```



### [当必须保留脚本的比例时](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id5)

在脚本的显示区域中绘制值并不总是可行。当我们已经有其他绘图正在进行时，添加其值超出脚本绘图边界的变量的调试绘图会使绘图不可读，如果我们想保留其他绘图的比例，则必须使用另一种技术来检查值。

[假设我们想继续检查bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)的值，但这次是在脚本中绘制 RSI：

```javascript
//@version=5
indicator("Plot RSI and `bar_index`")
r = ta.rsi(close, 20)
plot(r, "RSI", color.black)
plot(bar_index, "Bar Index")
```

在包含大量条形的数据集上运行脚本会产生以下显示：

![../_images/调试-DisplayingNumericValues-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DisplayingNumericValues-1.png)

在哪里：

1. [黑色的 RSI 线是平坦的，因为它在 0 到 100 之间变化，但指标的窗格会缩放以显示bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)的最大值，即`25692.0000`。
2. 光标所在柱上的[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)值显示在指标名称旁边，并且其在脚本窗格中的蓝色图是平坦的。
3. 比例尺中显示的`25692.0000`bar_index 值[表示](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)其在最后一个柱上的值，因此数据集包含 25693 个柱。
4. 光标所在柱上的[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)值以及位于其上方的柱的 RSI 值也显示在数据窗口中。

为了保留 RSI 绘图，同时仍然能够检查值或[bar_index ，我们将使用](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)绘制变量，如下所示：

```javascript
//@version=5
indicator("Plot RSI and `bar_index`")
r = ta.rsi(close, 20)
plot(r, "RSI", color.black)
plotchar(bar_index, "Bar index", "", location.top)
```

![../_images/调试-DisplayingNumericValues-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DisplayingNumericValues-2.png)

在哪里：

- [由于bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)的值不再绘制在脚本的窗格中，因此窗格的边界现在是 RSI 的边界，可以正常显示。
- [使用plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)绘制的值显示在脚本名称旁边和数据窗口中。
- 我们没有使用[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)调用来绘制字符，因此第三个参数是空字符串( `""`)。我们还指定[location.top](https://www.tradingview.com/pine-script-reference/v5/#var_location{dot}top)作为`location`参数，这样我们就不会在显示区域边界的计算中考虑符号的价格。

## [显示字符串](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id6)

必须使用 Pine Script™ 标签来显示字符串。标签仅出现在脚本的显示区域；标签中显示的字符串不会出现在数据窗口或其他任何地方。

### [每个栏上的标签](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id7)

以下脚本演示了重复绘制显示符号名称的标签的最简单方法：

```javascript
//@version=5
indicator("Simple label", "", true)
label.new(bar_index, high, syminfo.ticker)
```

![../_images/调试-DisplayingStrings-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DisplayingStrings-1.png)

默认情况下，图表上仅显示最后 50 个标签。您可以通过使用`max_labels_count`脚本的[indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句中的参数将此数量增加到最大500 。例如：

```javascript
indicator("Simple label", "", true, max_labels_count = 500)
```

### [最后一个栏上的标签](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id8)

由于 Pine 脚本中操作的字符串通常不会更改条形，因此最常用的可视化方法是在数据集的最后一个条形上绘制标签。在这里，我们使用一个函数创建一个仅出现在图表最后一个柱上的标签。我们的`f_print()`函数只有一个参数，即要显示的文本字符串：

```javascript
//@version=5
indicator("print()", "", true)
print(txt) =>
    // Create label on the first bar.
    var lbl = label.new(bar_index, na, txt, xloc.bar_index, yloc.price, color(na), label.style_none, color.gray, size.large, text.align_left)
    // On next bars, update the label's x and y position, and the text it displays.
    label.set_xy(lbl, bar_index, ta.highest(10)[1])
    label.set_text(lbl, txt)

print("Multiplier = " + str.tostring(timeframe.multiplier) + "\nPeriod = " + timeframe.period + "\nHigh = " + str.tostring(high))
print("Hello world!\n\n\n\n")
```

![../_images/调试-DisplayingStrings-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DisplayingStrings-2.png)

请注意我们最后一个代码示例中的以下内容：

- 我们使用该`print()`函数来封装标签绘制代码。虽然在每个柱上调用该函数，但仅在数据集的第一个柱上创建标签，因为我们在 函数内声明变量时使用了[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)关键字。`lbl`创建后，我们仅更新标签的*x*和*y*坐标及其每个连续条上的文本。如果我们不更新这些值，标签将保留在数据集的第一个条上，并且仅在该条上显示文本字符串的值。最后，请注意，我们使用垂直定位标签，通过使用**前**`ta.highest(10)[1]`10 个柱的最高点，我们可以防止标签在实时柱中移动。您可能需要在其他情况下调整此*y*位置。
- 我们调用该`print()`函数两次，以表明如果您进行多次调用，因为这样可以更轻松地调试多个字符串，您可以通过使用正确数量的换行符 ( `\n`) 来分隔每个字符串来叠加它们的文本。
- 我们使用[str.tostring()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}tostring)函数将数值转换为字符串，以便包含在要显示的文本中。

## [调试条件](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id9)

### [单一条件](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id10)

可以使用许多方法来显示满足条件的事件。此代码显示了识别 RSI 小于 30 的柱的六种方法：

```javascript
//@version=5
indicator("Single conditions")
r = ta.rsi(close, 20)
rIsLow = r < 30
hline(30)

// Method #1: Change the plot's color.
plot(r, "RSI", rIsLow ? color.fuchsia : color.black)
// Method #2: Plot a character in the bottom region of the display.
plotchar(rIsLow, "rIsLow char at bottom", "▲", location.bottom, size = size.small)
// Method #3: Plot a character on the RSI line.
plotchar(rIsLow ? r : na, "rIsLow char on line", "•", location.absolute, color.red, size = size.small)
// Method #4: Plot a shape in the top region of the display.
plotshape(rIsLow, "rIsLow shape", shape.arrowup, location.top)
// Method #5: Plot an arrow.
plotarrow(rIsLow ? 1 : na, "rIsLow arrow")
// Method #6: Change the background's color.
bgcolor(rIsLow ? color.new(color.green, 90) : na)
```

![../_images/调试-显示条件-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DisplayingConditions-1.png)

注意：

- 我们在布尔变量中定义条件`rIsLow`，并在每个柱上对其进行评估。用于为变量赋值的表达式的计算结果为or （或者当is时，如数据集第一条中的情况）。`r < 30``true``false``na``r``na`
- **方法 #1**根据条件使用 RSI 图的颜色变化。每当绘图的颜色发生变化时，它都会从前一栏开始为绘图着色。
- **方法#2**使用[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)在指标显示的底部绘制一个向上的三角形。使用位置和字符的不同组合可以同时识别单个条上的多个条件。 **这是我们识别图表上的条件的首选方法之一。**
- **方法#3**还使用了[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)调用，但这次角色位于RSI 线上。为了实现这一点，我们使用[location.absolute](https://www.tradingview.com/pine-script-reference/v5/#var_location{dot}absolute)和 Pine Script™ 的 [?:](https://www.tradingview.com/pine-script-reference/v5/#op_{question}{colon})三元条件运算符来定义一个条件表达式，其中仅当条件为真时才使用*y*`rIsLow`位置。如果不为 true，`na`则使用 ，因此不显示任何字符。
- **当满足我们的条件时，方法#4**使用[plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)在指标显示区域的顶部绘制一个蓝色向上箭头。
- **当满足我们的条件时，方法#5**使用[plotarrow()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow)在显示屏底部绘制一个绿色向上箭头。
- **当满足我们的条件时，方法#6**使用[bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor)更改背景颜色。再次使用三元运算符来评估我们的条件。`color.green`当为 true 时它将返回`rIsLow`，当为 false 或`na`时返回颜色（不为背景着色）。`rIsLow``na`
- 最后，请注意带有值的布尔变量如何在数据窗口中`true`显示。值由零值表示。`1``false`

### [复合条件](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id11)

需要识别满足多个条件的情况的程序员必须通过使用[and](https://www.tradingview.com/pine-script-reference/v5/#op_and)逻辑运算符聚合各个条件来构建复合条件。由于只有在各个条件正确触发的情况下，复合条件才会按预期执行，因此如果您在代码中使用复合条件之前验证各个条件的行为，您将会省去很多麻烦。

可以使用像这样的技术来显示多个单独条件的状态，其中使用四个单独条件来构建我们的`bull`复合条件：

```javascript
//@version=5
indicator("Compound conditions")
periodInput    = input.int(20)
bullLevelInput = input.int(55)

r = ta.rsi(close, periodInput)

// Condition #1.
rsiBull = r > bullLevelInput
// Condition #2.
hiChannel = ta.highest(r, periodInput * 2)[1]
aboveHiChannel = r > hiChannel
// Condition #3.
channelIsOld = hiChannel >= hiChannel[periodInput]
// Condition #4.
historyIsBull = math.sum(rsiBull ? 1 : -1, periodInput * 3) > 0
// Compound condition.
bull = rsiBull and aboveHiChannel and channelIsOld and historyIsBull

hline(bullLevelInput)
plot(r, "RSI", color.black)
plot(hiChannel, "High Channel")

plotchar(rsiBull ? bullLevelInput : na, "rIsBull", "1", location.absolute, color.green, size = size.tiny)
plotchar(aboveHiChannel ? r : na, "aboveHiChannel", "2", location.absolute, size = size.tiny)
plotchar(channelIsOld, "channelIsOld", "3", location.bottom, size = size.tiny)
plotchar(historyIsBull, "historyIsBull", "4", location.top, size = size.tiny)
bgcolor(bull ? not bull[1] ? color.new(color.green, 50) : color.new(color.green, 90) : na)
```

![../_images/调试-显示条件-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DisplayingConditions-2.png)

注意：

- 我们使用[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)调用来显示每个条件的数字，注意将它们分布在指标的*y*空间上，这样它们就不会重叠。
- 前两个[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)调用使用绝对定位来放置条件编号，以便帮助我们记住相应的条件。例如，当 RSI 高于用户定义的牛市水平时，第一个显示“1”，将“1”定位在牛市水平上。
- 我们使用两种不同深浅的绿色来为背景着色：较亮的绿色表示复合条件变为 的第一个条形`true`，较浅的绿色表示复合条件继续为 true 的后续条形。
- 虽然并不总是严格需要将单个条件分配给变量，因为它们可以直接在布尔表达式中使用，但当您将条件分配给变量名称时，它会提高代码的可读性，从而提醒您和您的读者它代表什么。在这种情况下，应始终考虑可读性，因为将条件分配给变量名对性能的影响很小或为空。

## [从内部函数调试](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id12)

函数中的变量是函数的本地变量，因此不可用于从脚本的全局范围进行绘图。在此脚本中，我们编写了`hlca()`计算加权平均值的函数：

```javascript
//@version=5
indicator("Debugging from inside functions", "", true)
hlca() =>
    var float avg = na
    hlca = math.avg(high, low, close, nz(avg, close))
    avg := ta.sma(hlca, 20)

h = hlca()
plot(h)
```

`hlca`我们需要在函数计算时逐条检查函数局部范围内的值。我们无法`hlca`从脚本的全局范围访问函数内部使用的变量。因此，我们需要另一种机制来从函数的局部范围内提取该变量的值，同时仍然能够使用函数的结果。我们可以使用 Pine Script™ 的功能让函数返回元组来访问变量：

```javascript
//@version=5
indicator("Debugging from inside functions", "", true)
hlca() =>
    var float avg = na
    instantVal = math.avg(high, low, close, nz(avg, close))
    avg := ta.sma(instantVal, 20)
    // Return two values instead of one.
    [avg, instantVal]

[h, instantVal] = hlca()
plot(h, "h")
plot(instantVal, "instantVal", color.black)
```

![../_images/调试-DebuggingFromInsideFunctions-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DebuggingFromInsideFunctions-1.png)

与全局范围变量相反，全局定义数组的数组元素可以在函数内修改。我们可以利用这个特性来编写一个功能等效的脚本：

```javascript
//@version=5
indicator("Debugging from inside functions", "", true)
// Create an array containing only one float element.
instantValGlobal = array.new_float(1)
hlca() =>
    var float avg = na
    instantVal = math.avg(high, low, close, nz(avg, close))
    // Set the array's only element to the current value of `_instantVal`.
    array.set(instantValGlobal, 0, instantVal)
    avg := ta.sma(instantVal, 20)

h = hlca()
plot(h, "h")
// Retrieve the value of the array's only element which was set from inside the function.
plot(array.get(instantValGlobal, 0), "instantValGlobal", color.black)
```

## [从 `for` 循环内部调试](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id13)

[for](https://www.tradingview.com/pine-script-reference/v5/#op_for)循环内的值无法使用循环中的[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用来绘制。与在函数中一样，此类变量也是循环范围的局部变量。在这里，我们从以下代码示例开始，探索三种不同的技术来检查源自[for](https://www.tradingview.com/pine-script-reference/v5/#op_for)循环的变量值，该代码示例计算回溯期内真实范围值高于/低于当前柱的柱的平衡：

```javascript
//@version=5
indicator("Debugging from inside `for` loops")
lookbackInput = input.int(20, minval = 0)

float trBalance = 0
for i = 1 to lookbackInput
    trBalance := trBalance + math.sign(ta.tr - ta.tr[i])

hline(0)
plot(trBalance)
```

### [提取单个值](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id14)

如果我们想在循环中的单个点检查变量的值，我们可以保存它并在退出循环后绘制它。在这里，我们将[tr](https://www.tradingview.com/pine-script-reference/v5/#var_ta{dot}tr)的值保存在`val`循环最后一次迭代的变量中：

```javascript
//@version=5
indicator("Debugging from inside `for` loops", max_lines_count = 500, max_labels_count = 500)
lookbackInput = input.int(20, minval = 0)

float val = na
float trBalance = 0
for i = 1 to lookbackInput
    trBalance := trBalance + math.sign(ta.tr - ta.tr[i])
    if i == lookbackInput
        val := ta.tr[i]
hline(0)
plot(trBalance)
plot(val, "val", color.black)
```

![../_images/调试-DebuggingFromInsideForLoops-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DebuggingFromInsideForLoops-1.png)

### [使用线条和标签](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id15)

当我们想要从多个循环迭代中提取值时，我们可以使用线条和标签。这里我们画一条线，对应于每次循环迭代中使用的[ta.tr](https://www.tradingview.com/pine-script-reference/v5/#var_ta{dot}tr)的值。我们还使用标签来显示每行的循环索引和行的值。这让我们对每个循环迭代中使用的值有一个大致的了解：

```javascript
//@version=5
indicator("Debugging from inside `for` loops", max_lines_count = 500, max_labels_count = 500)
lookbackInput = input.int(20, minval = 0)

float trBalance = 0
for i = 1 to lookbackInput
    trBalance := trBalance + math.sign(ta.tr - ta.tr[i])
    line.new(bar_index[1], ta.tr[i], bar_index, ta.tr[i], color = color.black)
    label.new(bar_index, ta.tr[i], str.tostring(i) + "•" + str.tostring(ta.tr[i]), style = label.style_none, size = size.small)

hline(0)
plot(trBalance)
```

![../_images/调试-DebuggingFromInsideForLoops-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DebuggingFromInsideForLoops-2.png)

注意：

- 为了显示更多细节，前面的屏幕截图中的比例已通过单击并拖动比例区域来手动扩展。
- 我们在[indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)声明语句中使用来显示最大行数和标签数。`max_lines_count = 500, max_labels_count = 500`
- 每次循环迭代不一定会产生不同的[ta.tr](https://www.tradingview.com/pine-script-reference/v5/#var_ta{dot}tr)值，这就是为什么我们可能看不到每个柱有 20 条不同的线。
- 如果我们只想显示一个级别，我们可以使用相同的技术，同时隔离特定的循环迭代，就像我们在前面的示例中所做的那样。

### [提取多个值](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id16)

我们还可以通过构建单个字符串从循环迭代中提取多个值，我们将在循环执行后使用标签显示该字符串：

```javascript
//@version=5
indicator("Debugging from inside `for` loops", max_lines_count = 500, max_labels_count = 500)
lookbackInput = input.int(20, minval = 0)

string = ""
float trBalance = 0
for i = 1 to lookbackInput
    trBalance := trBalance + math.sign(ta.tr - ta.tr[i])
    string := string + str.tostring(i, "00") + "•" + str.tostring(ta.tr[i]) + "\n"

label.new(bar_index, 0, string, style = label.style_none, size = size.small, textalign = text.align_left)
hline(0)
plot(trBalance)
```

![../_images/调试-DebuggingFromInsideForLoops-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Debugging-DebuggingFromInsideForLoops-3.png)

注意：

- 前面的屏幕截图中的刻度已通过单击并拖动刻度区域来手动扩展，因此指标显示区域的内容可以垂直移动以仅显示其相关部分。
- 我们用来强制循环索引的显示以零填充两位数，以便它们整齐地对齐。`str.tostring(i, "00")`

当具有多次迭代的循环导致显示其所有值不切实际时，您可以对迭代的子集进行采样。此代码使用[%](https://www.tradingview.com/pine-script-reference/v5/#op_{percent})（模）运算符来包含来自每个第二个循环迭代的值：

```javascript
for i = 1 to i_lookBack
    lowerRangeBalance := lowerRangeBalance + math.sign(ta.tr - ta.tr[i])
    if i % 2 == 0
        string := string + str.tostring(i, "00") + "•" + str.tostring(ta.tr[i]) + "\n"
```

## [提示](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#id17)

我们最常用于调试 Pine Script™ 代码的两种技术是：

```javascript
plotchar(v, "v", "", location.top, size = size.tiny)
```

在指标值和数据窗口中绘制*float*、*int*或*bool*`print()`类型的变量，以及用于调试字符串的函数的单行版本：

```javascript
print(txt) => var _label = label.new(bar_index, na, txt, xloc.bar_index, yloc.price, color(na), label.style_none, color.gray, size.large, text.align_left), label.set_xy(_label, bar_index, ta.highest(10)[1]), label.set_text(_label, txt)
print(stringName)
```

当我们使用 Windows 版 AutoHotkey 来加速重复性任务时，我们将这些行包含在 AutoHotkey 脚本中（这不是**Pine** Script™ 代码）：

```javascript
; ————— This is AHK code, not Pine Script™. —————
^+f:: SendInput plotchar(^v, "^v", "", location.top, size = size.tiny){Return}
^+p:: SendInput print(txt) => var lbl = label.new(bar_index, na, txt, xloc.bar_index, yloc.price, color(na), label.style_none, color.gray, size.large, text.align_left), label.set_xy(lbl, bar_index, highest(10)[1]), label.set_text(lbl, txt)`nprint(){Left}
```

第二行将键入调试[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)ctrl调用，其中包括先前在使用++时复制到剪贴板shift的表达式或变量名称f。将`variableName`变量名称或条件表达式复制到剪贴板并点击+ +将分别产生：`close > open`ctrlshiftf

```javascript
plotchar(variableName, "variableName", "", location.top, size = size.tiny)
plotchar(close > open, "close > open", "", location.top, size = size.tiny)
```

第三行在ctrl+ shift+上触发p。它在脚本中键入我们的一行`print()`函数，然后在第二行上对函数进行空调用，并将光标放置在其中，因此剩下要做的就是键入我们要显示的字符串：

```javascript
print(txt) => var lbl = label.new(bar_index, na, txt, xloc.bar_index, yloc.price, color(na), label.style_none, color.gray, size.large, text.align_left), label.set_xy(lbl, bar_index, ta.highest(10)[1]), label.set_text(lbl, txt)
print()
```

注意：AutoHotkey 仅适用于 Windows 系统。 Apple 系统上可以用 Keyboard Maestro 或其他键盘替代。