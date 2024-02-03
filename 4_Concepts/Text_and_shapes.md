# 文本和形状

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id5)

您可以使用 Pine Script™ 使用五种不同的方式显示文本或形状：

- [plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)
- [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)
- [plotarrow()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow)
- [使用label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)创建的标签
- 使用[table.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_table{dot}new)创建的表 （参见[Tables](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#pagetables)）

使用哪一种取决于您的需求：

- 表格可以在图表上的各种相对位置显示文本，当用户水平滚动或缩放图表时，这些文本不会移动。他们的内容不受酒吧限制。相比之下，使用 [plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)、 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)或 [label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)显示的文本始终与特定的条形图相连，因此它将随着条形图在图表上的位置而移动。有关[表格](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#pagetables)的更多信息，请参阅表格页面。
- 包括三个函数能够显示预定义的形状： [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)、 [plotarrow()和使用](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow)[label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)创建的标签。
- [plotarrow()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow)不能显示文本，只能显示向上或向下箭头。
- [plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)和 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape) 可以在图表的任何条形或所有条形上显示非动态文本。
- [plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar) 只能显示一个字符，而[plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape) 可以显示字符串，包括换行符。
- [label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new) 最多可以在图表上显示 500 个标签。其文本**可以**包含动态文本或“系列字符串”。标签文本也支持换行符。
- 虽然[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)和 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape) 可以以过去或未来的固定偏移量显示文本，并且在脚本执行期间不能更改，但每个[label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)调用可以使用可以在飞。

关于 Pine Script™ 字符串，需要记住以下几点：

- 由于[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)和 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)`text`中的参数都 需要“const string”参数，因此它不能包含只能在柱上知道的价格等值（“系列字符串”）。
- [要在使用label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)显示的文本中包含“系列”值，首先需要使用 [str.tostring()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}tostring)将它们转换为字符串。
- Pine 中字符串的连接运算符是`+`。它用于将字符串组件连接到一个字符串中，例如 （其中[syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}tickerid) 是一个内置变量，它以字符串格式返回图表的交易所和交易品种信息）。`msg = "Chart symbol: " + syminfo.tickerid`
- 所有这些函数显示的字符都可以是 Unicode 字符，其中可能包括 Unicode 符号。请参阅此[探索 Unicode](https://www.tradingview.com/script/0rFQOCKf-Exploring-Unicode/) 脚本以了解可以使用 Unicode 字符执行哪些操作。
- 有时可以使用函数参数控制文本的颜色或大小，但无法进行内联格式（粗体、斜体、等宽字体等）。
- 来自 Pine 脚本的文本始终以 Trebuchet MS 字体显示在图表上，该字体在许多 TradingView 文本中使用，包括本文本。

该脚本使用 Pine Script™ 中可用的四种方法显示文本：

```javascript
//@version=5
indicator("Four displays of text", overlay = true)
plotchar(ta.rising(close, 5), "`plotchar()`", "🠅", location.belowbar, color.lime, size = size.small)
plotshape(ta.falling(close, 5), "`plotchar()`", location = location.abovebar, color = na, text = "•`plotshape()•`\n🠇", textcolor = color.fuchsia, size = size.huge)

if bar_index % 25 == 0
    label.new(bar_index, na, "•LABEL•\nHigh = " + str.tostring(high, format.mintick) + "\n🠇", yloc = yloc.abovebar, style = label.style_none, textcolor = color.black, size = size.normal)

printTable(txt) => var table t = table.new(position.middle_right, 1, 1), table.cell(t, 0, 0, txt, bgcolor = color.yellow)
printTable("•TABLE•\n" + str.tostring(bar_index + 1) + " bars\nin the dataset")
```

![../_images/TextAndShapes-Introduction-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-Introduction-01.png)

注意：

- 用于显示每个文本字符串的方法与文本一起显示，但使用 [plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)显示的石灰向上箭头除外，因为它只能显示一个字符。
- 标签和表调用可以插入条件结构中以控制它们的执行时间，而[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)和 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)则不能。它们的条件绘图必须使用第一个参数进行控制，该参数是一个“series bool”，其值决定`true`何时`false`显示文本。
- 表和标签中显示的数值首先使用 [str.tostring()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}tostring)转换为字符串。
- 我们使用`+`运算符来连接字符串组件。
- [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)旨在显示带有文本的形状。它的`size`参数控制形状的大小，而不是文本的大小。我们使用[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)作为其`color`参数，以便形状不可见。
- 与其他文本相反，当您滚动或缩放图表时，表格文本不会移动。
- 某些文本字符串包含 🠇 Unicode 箭头 (U+1F807)。
- 某些文本字符串包含`\n`表示新行的序列。

## [`plotchar()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id6)

此函数对于在条上显示单个字符很有用。它具有以下语法：

```javascript
plotchar(series, title, char, location, color, offset, text, textcolor, editable, size, show_last, display) → void
```

有关其参数的详细信息，请参阅[plotchar() 的参考手册条目。](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)

[正如调试页面](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#pagedebugging)[的何时必须保留脚本的比例](https://www.tradingview.com/pine-script-docs/en/v5/writing/Debugging.html#pagedebugging-whenthescriptsscalemustbepreserved) 部分中所述，该函数可用于显示和检查数据窗口中的值或图表上脚本名称右侧显示的指标值中的值：

```javascript
//@version=5
indicator("", "", true)
plotchar(bar_index, "Bar index", "", location.top)
```

![../_images/TextAndShapes-Plotchar-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-Plotchar-01.png)

注意：

- 光标位于图表的最后一个柱上。
- **该** 柱上的[bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)值显示在指标值 (1) 和数据窗口 (2) 中。
- 我们使用[location.top](https://www.tradingview.com/pine-script-reference/v5/#var_location{dot}top) 因为默认的[location.abovebar](https://www.tradingview.com/pine-script-reference/v5/#var_location{dot}abovebar) 会将价格按照脚本的比例发挥作用，这通常会干扰其他图。

[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar) 还可以很好地识别图表上的特定点或验证条件是否`true`符合我们的预期。此示例在柱形下方显示一个向上箭头，其中 [收盘价](https://www.tradingview.com/pine-script-reference/v5/#var_close)、 [最高价](https://www.tradingview.com/pine-script-reference/v5/#var_high)和 [交易量](https://www.tradingview.com/pine-script-reference/v5/#var_volume) 在两根柱形中均呈上升趋势：

```javascript
//@version=5
indicator("", "", true)
bool longSignal = ta.rising(close, 2) and ta.rising(high, 2) and (na(volume) or ta.rising(volume, 2))
plotchar(longSignal, "Long", "▲", location.belowbar, color = na(volume) ? color.gray : color.blue, size = size.tiny)
```

![../_images/TextAndShapes-Plotchar-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-Plotchar-02.png)

注意：

- 我们使用这样我们的脚本就可以在没有 [体积](https://www.tradingview.com/pine-script-reference/v5/#var_volume)数据的符号上运行。如果我们没有在没有[交易量](https://www.tradingview.com/pine-script-reference/v5/#var_volume)数据时做出规定（这就是在没有交易量时所做的） ，那么变量的值将永远不会是，因为在这些情况下会产生收益。`(na(volume) or ta.rising(volume, 2))``na(volume)``true``longSignal``true``ta.rising(volume, 2)``false`
- 当没有交易量时，我们将箭头显示为灰色，以提醒我们所有三个基本条件均未满足。
- 因为[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar) 现在在图表上显示一个字符，所以我们用它来控制它的大小。`size = size.tiny`
- 我们已经调整了`location`参数以在条形下显示字符。

如果您不介意只绘制圆形，您也可以使用[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot) 来实现类似的效果：

```javascript
//@version=5
indicator("", "", true)
longSignal = ta.rising(close, 2) and ta.rising(high, 2) and (na(volume) or ta.rising(volume, 2))
plot(longSignal ? low - ta.tr : na, "Long", color.blue, 2, plot.style_circles)
```

[此方法的不便之处在于，由于plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)没有相对定位机制，因此 必须使用类似[ta.tr](https://www.tradingview.com/pine-script-reference/v5/#var_ta{dot}tr) （条形图的“真实范围”） 之类的方法将圆圈向下移动 ：

![../_images/TextAndShapes-Plotchar-03.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-Plotchar-03.png)

## [`plotshape()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id7)

此功能对于在条形上显示预定义的形状和/或文本非常有用。它具有以下语法：

```javascript
plotshape(series, title, style, location, color, offset, text, textcolor, editable, size, show_last, display) → void
```

有关其参数的详细信息，请参阅[plotshape() 的参考手册条目。](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)

让我们使用该函数来实现与上一节的第二个示例大致相同的结果：

```javascript
//@version=5
indicator("", "", true)
longSignal = ta.rising(close, 2) and ta.rising(high, 2) and (na(volume) or ta.rising(volume, 2))
plotshape(longSignal, "Long", shape.arrowup, location.belowbar)
```

请注意，这里我们没有使用箭头字符，而是使用参数`shape.arrowup`的实参`style`。

![../_images/TextAndShapes-Plotshape-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-Plotshape-01.png)

可以使用不同的[plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape) 调用在条形图上叠加文本。您将需要使用`\n`后跟一个特殊的非打印字符，该字符不会被删除以保留换行符的功能。这里我们使用 Unicode 零宽度空格 (U+200E)。虽然您在以下代码的字符串中看不到它，但它确实存在并且可以复制/粘贴。特殊的 Unicode 字符必须是字符串中的**最后**一个字符，以便文本向上，并且当您在条形图下方绘图且文本向下时，**第一个字符必须是：**

```javascript
//@version=5
indicator("Lift text", "", true)
plotshape(true, "", shape.arrowup,   location.abovebar, color.green,  text = "A")
plotshape(true, "", shape.arrowup,   location.abovebar, color.lime,   text = "B\n")
plotshape(true, "", shape.arrowdown, location.belowbar, color.red,    text = "C")
plotshape(true, "", shape.arrowdown, location.belowbar, color.maroon, text = "\nD")
```

![../_images/TextAndShapes-Plotshape-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-Plotshape-02.png)

您可以与该参数一起使用的可用形状`style`有：

| 争论                 | 形状                                                         | 带文字                                                       |      | 争论              | 形状                                                         | 带文字                                                       |
| :------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :--- | :---------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `shape.xcross`       | ![Plotshape_xcross](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Xcross.png) | ![Xcross_with_text](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Xcross_with_text.png) |      | `shape.arrowup`   | ![Plotshape_arrowup](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Arrowup.png) | ![带有文本的箭头](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Arrowup_with_text.png) |
| `shape.cross`        | ![绘图形状_交叉](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Cross.png) | ![与文本交叉](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Cross_with_text.png) |      | `shape.arrowdown` | ![绘图形状_arrowdown](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Arrowdown.png) | ![带有文本的箭头向下](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Arrowdown_with_text.png) |
| `shape.circle`       | ![绘图形状_圆](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Circle.png) | ![带文本的圆圈](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Circle_with_text.png) |      | `shape.square`    | ![绘图形状_正方形](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Square.png) | ![带文本的正方形](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Square_with_text.png) |
| `shape.triangleup`   | ![Plotshape_triangleup](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Triangleup.png) | ![带文本的三角形](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Triangleup_with_text.png) |      | `shape.diamond`   | ![绘图形状_钻石](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Diamond.png) | ![钻石_带_文本](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Diamond_with_text.png) |
| `shape.triangledown` | ![绘图形状_triangledown](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Triangledown.png) | ![带文本的三角形向下](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Triangledown_with_text.png) |      | `shape.labelup`   | ![绘图形状_标签](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Labelup.png) | ![带文本的标签](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Labelup_with_text.png) |
| `shape.flag`         | ![绘图形状标志](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Flag.png) | ![带文本的标志](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Flag_with_text.png) |      | `shape.labeldown` | ![绘图形状_labeldown](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Labeldown.png) | ![带文本的标签](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-PlotshapeStyles-Labeldown_with_text.png) |

## [`plotarrow()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id8)

plotarrow 函数根据函数第一个参数中使用的系列的相对值显示可变长度的向上或向下箭头[。](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow)它具有以下语法：

```javascript
plotarrow(series, title, colorup, colordown, offset, minheight, maxheight, editable, show_last, display) → void
```

有关其参数的详细信息，请参阅[plotarrow() 的参考手册条目。](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow)

[plotarrow()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow)`series`中的参数不是 像[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)和 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)中那样的“series bool” ；它是一个“series int/float”，它不仅仅是一个简单的或确定何时绘制箭头的值。这是控制提供的参数如何影响[plotarrow()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow) 的行为的逻辑：`true``false``series`

- `series > 0`：显示向上箭头，其长度与该条上的系列相对于其他系列值的相对值成正比。
- `series < 0`：显示向下箭头，使用相同的规则按比例调整大小。
- `series == 0 or na(series)`：不显示箭头。

`minheight`可以使用和参数控制箭头的最大和最小可能尺寸（以像素为单位）`maxheight`。

这是一个简单的脚本，说明了[plotarrow()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotarrow)的工作原理：

```javascript
//@version=5
indicator("", "", true)
body = close - open
plotarrow(body, colorup = color.teal, colordown = color.orange)
```

![../_images/TextAndShapes-Plotarrow-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-Plotarrow-01.png)

请注意箭头的高度与条形体的相对尺寸成正比。

您可以使用任何系列来绘制箭头。这里我们使用“Chaikin Oscillator”的值来控制箭头的位置和大小：

```javascript
//@version=5
indicator("Chaikin Oscillator Arrows", overlay = true)
fastLengthInput = input.int(3,  minval = 1)
slowLengthInput = input.int(10, minval = 1)
osc = ta.ema(ta.accdist, fastLengthInput) - ta.ema(ta.accdist, slowLengthInput)
plotarrow(osc)
```

![../_images/TextAndShapes-Plotarrow-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-Plotarrow-02.png)

请注意，我们在图表下方的窗格中显示实际的“柴金振荡器”，因此您可以看到使用哪些值来确定箭头的位置和大小。



## [标签](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id9)

标签仅在 v4 及更高版本的 Pine Script™ 中可用。它们的工作方式与[plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)和 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)非常不同 。

标签是对象，例如[线条和框](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes)或[表格](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Tables.html#pagetables)。与它们一样，它们也使用 ID 来引用，ID 的作用类似于指针。标签 ID 是“标签”类型。与其他对象一样，标签 ID 是“时间序列”，所有用于管理它们的函数都接受“序列”参数，这使得它们非常灵活。

笔记

在 TradingView 图表上，一整套*绘图工具* 允许用户使用鼠标操作创建和修改绘图。虽然它们有时看起来类似于使用 Pine Script™ 代码创建的绘图对象，但它们是不相关的实体。使用 Pine 代码创建的绘图对象无法通过鼠标操作进行修改，并且图表用户界面中的手绘绘图在 Pine 脚本中不可见。

标签是有利的，因为：

- 它们允许将“系列”值转换为文本并放置在图表上。这意味着它们非常适合显示之前无法知道的值，例如脚本计算的任何其他值的价格值、支撑位和阻力位。
- 它们的定位选项比功能的定位选项更灵活`plot*()`。
- 他们提供更多的显示模式。
- 与`plot*()`函数相反，标签处理函数可以插入条件或循环结构中，从而更容易控制其行为。
- 您可以向标签添加工具提示。

[与plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)和 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)相比，使用标签的一个缺点 是您只能在图表上绘制有限数量的标签。默认值为~50，但您可以`max_labels_count`在 [indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) 声明语句中使用该参数来指定最多500个。标签（如[lines和boxes](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes)）使用垃圾收集机制进行管理，该机制会删除最旧的标签图表，这样只有最近绘制的标签可见。

用于管理标签的内置工具箱都位于`label`命名空间中。他们包括：

- [label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)创建标签。
- `label.set_*()`函数来修改现有标签的属性。
- `label.get_*()`函数读取现有标签的属性。
- [label.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}delete)删除标签
- label.all数组始终包含图表[上](https://www.tradingview.com/pine-script-reference/v5/#var_label{dot}all) 所有可见标签的 ID。数组的大小取决于脚本的最大标签计数以及您绘制的标签数量。 `aray.size(label.all)`将返回数组的大小。

### [创建和修改标签](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id10)

label.new [()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new) 函数创建一个新标签。它具有以下签名：

```javascript
label.new(x, y, text, xloc, yloc, color, style, textcolor, size, textalign, tooltip) → series label
```

允许您更改标签属性的*setter*函数有：

- [label.set_x()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_x)
- [label.set_y()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_y)
- [label.set_xy()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_xy)
- [label.set_text()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_text)
- [label.set_xloc()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_xloc)
- [label.set_yloc()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_yloc)
- [label.set_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_color)
- [label.set_style()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_style)
- [label.set_textcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_textcolor)
- [label.set_size()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_size)
- [label.set_textalign()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_set_textalign)
- [label.set_tooltip()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_tooltip)

他们都有一个相似的签名。[label.set_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_color)的一个是：

```javascript
label.set_color(id, color) → void
```

在哪里：

- `id`是要修改属性的标签的ID。
- 下一个参数是要修改的标签的属性。这取决于所使用的 setter 函数。 [label.set_xy()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_xy)更改了两个属性，因此它有两个这样的参数。

您可以通过以下方式以最简单的形式创建标签：

```javascript
//@version=5
indicator("", "", true)
label.new(bar_index, high)
```

![../_images/TextAndShapes-CreatingLabels-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-CreatingLabels-01.png)

注意：

- 该标签是使用参数（当前柱的索引 [bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)）和 （柱的[最高](https://www.tradingview.com/pine-script-reference/v5/#var_high)值）创建的。`x = bar_index``y = high`
- 我们不为函数的`text`参数提供实参。它的默认值为空字符串，不显示任何文本。
- 没有逻辑控制我们的[label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)调用，因此在每个柱上创建标签。
- 仅显示最后 54 个标签，因为我们的 [Indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)调用不使用`max_labels_count`参数来指定默认值 ~50 以外的值。
- [标签会一直保留在条上，直到您的脚本使用label.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}delete)删除它们 ，或者垃圾收集将它们删除。

在下一个示例中，我们在最近 50 个柱中具有最高[高](https://www.tradingview.com/pine-script-reference/v5/#var_high)值的柱上显示一个标签：

```javascript
//@version=5
indicator("", "", true)

// Find the highest `high` in last 50 bars and its offset. Change it's sign so it is positive.
LOOKBACK = 50
hi = ta.highest(LOOKBACK)
highestBarOffset = - ta.highestbars(LOOKBACK)

// Create label on bar zero only.
var lbl = label.new(na, na, "", color = color.orange, style = label.style_label_lower_left)
// When a new high is found, move the label there and update its text and tooltip.
if ta.change(hi)
    // Build label and tooltip strings.
    labelText = "High: " + str.tostring(hi, format.mintick)
    tooltipText = "Offest in bars: " + str.tostring(highestBarOffset) + "\nLow: " + str.tostring(low[highestBarOffset], format.mintick)
    // Update the label's position, text and tooltip.
    label.set_xy(lbl, bar_index[highestBarOffset], hi)
    label.set_text(lbl, labelText)
    label.set_tooltip(lbl, tooltipText)
```

![../_images/TextAndShapes-CreatingLabels-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-CreatingLabels-02.png)

注意：

- [我们仅通过使用var](https://www.tradingview.com/pine-script-reference/v5/#op_var) 关键字来声明`lbl`包含标签 ID 的变量，从而在第一个栏上创建标签。 [label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)调用中的 `x`,`y`和参数是无关紧要的，因为标签将在以后的柱上更新。但是，我们确实小心地使用了和 我们想要的标签，因此以后不需要更新它们。`text``color``style`
- 在每个柱上，我们通过测试值的变化来检测是否发现新高`hi`
- 当高值发生变化时，我们会用新信息更新标签。为此，我们使用三个`label.set*()`调用来更改标签的相关信息。我们使用`lbl`变量引用我们的标签，该变量包含我们标签的 ID。因此，该脚本在所有柱中保持相同的标签，但在检测到新高时移动它并更新其信息。

在这里，我们在每个条形上创建一个标签，但我们根据条形的极性有条件地设置其属性：

```javascript
//@version=5
indicator("", "", true)
lbl = label.new(bar_index, na)
if close >= open
    label.set_text( lbl, "green")
    label.set_color(lbl, color.green)
    label.set_yloc( lbl, yloc.belowbar)
    label.set_style(lbl, label.style_label_up)
else
    label.set_text( lbl, "red")
    label.set_color(lbl, color.red)
    label.set_yloc( lbl, yloc.abovebar)
    label.set_style(lbl, label.style_label_down)
```

![../_images/TextAndShapes-CreatingLabels-03.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-CreatingLabels-03.png)

### [定位标签](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id11)

标签根据*x*（柱形）和*y*（价格）坐标放置在图表上。有五个参数影响此行为：`x`、`y`、`xloc`和：`yloc``style`

- `x`

  是柱形索引或时间值。当使用柱线索引时，该值可以在过去或未来偏移（未来最多 500 个柱线）。使用时间值时也可以计算过去或未来的偏移量。可以使用[label.set_x()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_x)或 [label.set_xy()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_xy)`x`修改现有标签的值。

- `xloc`

  是[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc{dot}bar_index)（默认值）或[xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc{dot}bar_time)。它确定必须与 一起使用哪种类型的参数`x`。对于[xloc.bar_index](https://www.tradingview.com/pine-script-reference/v5/#var_xloc{dot}bar_index)，`x`必须是绝对柱索引。对于[xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc{dot}bar_time)，必须是与柱的[开盘](https://www.tradingview.com/pine-script-reference/v5/#var_open)[时间](https://www.tradingview.com/pine-script-reference/v5/#var_time)`x`值相对应的 UNIX 时间（以毫秒为单位）。可以使用[label.set_xloc()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_xloc)修改现有标签的值。`xloc`

- `y`

  是标签所在的价格水平。仅在使用默认`yloc`值时才考虑它`yloc.price`。如果`yloc`是[yloc.abovebar](https://www.tradingview.com/pine-script-reference/v5/#var_yloc{dot}abovebar)或 [yloc.belowbar](https://www.tradingview.com/pine-script-reference/v5/#var_yloc{dot}belowbar) 则`y`忽略该参数。可以使用[label.set_y()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_y)或 [label.set_xy()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_xy)`y`修改现有标签的值。

- `yloc`

  可以是[yloc.price](https://www.tradingview.com/pine-script-reference/v5/#var_yloc{dot}price)（默认）、 [yloc.abovebar](https://www.tradingview.com/pine-script-reference/v5/#var_yloc{dot}abovebar)或 [yloc.belowbar](https://www.tradingview.com/pine-script-reference/v5/#var_yloc{dot}belowbar)。用于的参数仅在[yloc.price](https://www.tradingview.com/pine-script-reference/v5/#var_yloc{dot}price)`y`中考虑。可以使用[label.set_yloc()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_yloc)修改现有标签的值。`yloc`

- `style`

  [当使用yloc.abovebar](https://www.tradingview.com/pine-script-reference/v5/#var_yloc{dot}abovebar)或 [yloc.belowbar](https://www.tradingview.com/pine-script-reference/v5/#var_yloc{dot}belowbar)时，使用的参数会影响标签的视觉外观及其相对于由值`y`或条的顶部/底部 确定的参考点的位置。可以使用[label.set_style()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_style)修改现有标签的。`style`

这些是可用的`style`参数：

| 参数                       | 标签                                                         | 带文字的标签                                                 |      | 参数                            | 标签                                                         | 带文字的标签                                                 |
| :------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :--- | :------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `label.style_xcross`       | ![标签样式xcross](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-xcross.png) | ![标签样式xcross_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-xcross_t.png) |      | `label.style_label_up`          | ![标签样式标签向上](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelup.png) | ![标签样式标签up_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelup_t.png) |
| `label.style_cross`        | ![标签样式交叉](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-cross.png) | ![标签样式交叉t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-cross_t.png) |      | `label.style_label_down`        | ![标签样式标签向下](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labeldown.png) | ![标签样式标签向下t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labeldown_t.png) |
| `label.style_flag`         | ![标签样式标志](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-flag.png) | ![标签样式标志_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-flag_t.png) |      | `label.style_label_left`        | ![标签样式标签左](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelleft.png) | ![标签样式标签左t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelleft_t.png) |
| `label.style_circle`       | ![标签样式圆](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-circle.png) | ![标签样式圆t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-circle_t.png) |      | `label.style_label_right`       | ![标签样式标签右](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelright.png) | ![标签样式_标签_right_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelright_t.png) |
| `label.style_square`       | ![标签样式方块](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-square.png) | ![标签样式方形t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-square_t.png) |      | `label.style_label_lower_left`  | ![label_style_label_lower_left](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labellowerleft.png) | ![标签样式标签_lower_left_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labellowerleft_t.png) |
| `label.style_diamond`      | ![标签样式钻石](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-diamond.png) | ![标签样式钻石_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-diamond_t.png) |      | `label.style_label_lower_right` | ![标签样式标签_lower_right](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labellowerright.png) | ![标签样式标签_lower_right_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labellowerright_t.png) |
| `label.style_triangleup`   | ![标签样式三角形](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-triangleup.png) | ![label_style_triangleup_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-triangleup_t.png) |      | `label.style_label_upper_left`  | ![label_style_label_upper_left](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelupperleft.png) | ![标签样式标签_upper_left_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelupperleft_t.png) |
| `label.style_triangledown` | ![label_style_triangledown](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-triangledown.png) | ![label_style_triangledown_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-triangledown_t.png) |      | `label.style_label_upper_right` | ![标签样式标签_右上](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelupperright.png) | ![标签样式标签_upper_right_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelupperright_t.png) |
| `label.style_arrowup`      | ![标签样式箭头](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-arrowup.png) | ![标签样式箭头t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-arrowup_t.png) |      | `label.style_label_center`      | ![标签样式标签中心](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelcenter.png) | ![标签样式标签中心t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-labelcenter_t.png) |
| `label.style_arrowdown`    | ![标签样式箭头向下](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-arrowdown.png) | ![标签样式_arrowdown_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-arrowdown_t.png) |      | `label.style_none`              |                                                              | ![标签样式无_t](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-LabelStyles-none_t.png) |

使用[xloc.bar_time](https://www.tradingview.com/pine-script-reference/v5/#var_xloc{dot}bar_time)时，该`x`值必须是以毫秒为单位的 UNIX 时间戳。请参阅[“时间”](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#pagetime)页面以获取更多信息。当前柱的开始时间可以从[time](https://www.tradingview.com/pine-script-reference/v5/#var_time)内置变量中获取 。之前柱的柱时间为`time[1]`，`time[2]`依此类推。还可以使用[时间戳](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp)函数将时间设置为绝对值 。您可以添加或减去时间段以实现相对时间偏移。

让我们在最后一个柱上的日期前一天放置一个标签：

```javascript
//@version=5
indicator("")
daysAgoInput = input.int(1, tooltip = "Use negative values to offset in the future")
if barstate.islast
    MS_IN_ONE_DAY = 24 * 60 * 60 * 1000
    oneDayAgo = time - (daysAgoInput * MS_IN_ONE_DAY)
    label.new(oneDayAgo, high, xloc = xloc.bar_time, style = label.style_label_right)
```

请注意，由于市场休市时的时间间隔和缺失柱的变化不同，标签的位置可能并不总是准确的。此类时间偏移在 24x7 市场上往往更可靠。

您还可以使用值的柱索引进行偏移`x`，例如：

```javascript
label.new(bar_index + 10, high)
label.new(bar_index - 10, high[10])
label.new(bar_index[10], high[10])
```

### [读取标签属性](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id12)

以下*getter*函数可用于标签：

- [标签.get_x()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}get_x)
- [标签.get_y()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}get_y)
- [标签.get_text()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}get_text)

他们都有一个相似的签名。[label.get_text()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}get_text)的一个是：

```javascript
label.get_text(id) → series string
```

其中`id`是要检索其文本的标签。

### [克隆标签](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id13)

label.copy [()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}copy) 函数用于克隆标签。其语法为：

```javascript
label.copy(id) → void
```

### [删除标签](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id14)

label.delete [()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}delete) 函数用于删除标签。其语法为：

```javascript
label.delete(id) → void
```

要仅在图表上保留用户定义数量的标签，可以使用如下代码：

```javascript
//@version=5
MAX_LABELS = 500
indicator("", max_labels_count = MAX_LABELS)
qtyLabelsInput = input.int(5, "Labels to keep", minval = 0, maxval = MAX_LABELS)
myRSI = ta.rsi(close, 20)
if myRSI > ta.highest(myRSI, 20)[1]
    label.new(bar_index, myRSI, str.tostring(myRSI, "#.00"), style = label.style_none)
    if array.size(label.all) > qtyLabelsInput
        label.delete(array.get(label.all, 0))
plot(myRSI)
```

![../_images/TextAndShapes-DeletingLabels-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/TextAndShapes-DeletingLabels-01.png)

注意：

- 我们定义一个`MAX_LABELS`常量来保存脚本可以容纳的最大标签数量。我们使用该值在我们的[indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)调用中设置`max_labels_count`参数的值，并且也作为我们在[input.int()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}int)调用中的值来限制用户值。`maxval`
- 当 RSI 突破最后 20 根柱线的最高值时，我们创建一个新标签。注意`[1]`我们在 中使用的偏移量。这是必要的。如果没有它， [ta.highest()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}highest)返回的值 将始终包含 的当前值，因此永远不会高于函数的返回值。`if myRSI > ta.highest(myRSI, 20)[1]``myRSI``myRSI`
- 之后，我们删除[label.all](https://www.tradingview.com/pine-script-reference/v5/#var_label{dot}all) 数组中最旧的标签，该数组由 Pine Script™ 运行时自动维护，并包含我们的脚本绘制的所有可见标签的 ID。我们使用[array.get()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}get) 函数来检索索引零处的数组元素（最旧的可见标签 ID）。然后我们使用[label.delete()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}delete) 删除与该 ID 链接的标签。

请注意，如果只想将标签放置在最后一个柱上，则当脚本在所有柱上执行时创建和删除标签是不必要且低效的，因此仅保留最后一个标签：

```javascript
// INEFFICENT!
//@version=5
indicator("", "", true)
lbl = label.new(bar_index, high, str.tostring(high, format.mintick))
label.delete(lbl[1])
```

这是实现相同任务的有效方法：

```javascript
//@version=5
indicator("", "", true)
if barstate.islast
    // Create the label once, the first time the block executes on the last bar.
    var lbl = label.new(na, na)
    // On all iterations of the script on the last bar, update the label's information.
    label.set_xy(lbl, bar_index, high)
    label.set_text(lbl, str.tostring(high, format.mintick))
```

### [实时行为](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Text_and_shapes.html#id15)

标签会受到*提交*和*回滚*操作的影响，这会影响脚本在实时栏中执行时的行为。请参阅有关 Pine Script™执行模型的页面。

该脚本演示了在实时栏运行时回滚的效果：

```javascript
//@version=5
indicator("", "", true)
label.new(bar_index, high)
```

在实时柱上，[label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new) 在每次脚本更新时创建一个新标签，但由于回滚过程，同一柱上先前更新创建的标签将被删除。只有在实时柱关闭之前创建的最后一个标签才会被提交，从而持续存在。