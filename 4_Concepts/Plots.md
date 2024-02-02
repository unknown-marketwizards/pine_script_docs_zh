# 绘图

# [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id1)

plot [()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot) 函数是最常用的函数，用于显示使用 Pine 脚本计算的信息。它用途广泛，可以绘制不同样式的线条、直方图、面积、柱形（如体积柱）、填充、圆形或十字形。

[Fills](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Fills.html#pagefills) 页面中解释了如何使用[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)创建填充。

该脚本展示了在覆盖脚本中[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)的几种不同用法：

![../_images/Plots-Introduction-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Plots-Introduction-01.png)

```
Pine Script™
Copied//@version=5
indicator("`plot()`", "", true)
plot(high, "Blue `high` line")
plot(math.avg(close, open), "Crosses in body center", close > open ? color.lime : color.purple, 6, plot.style_cross)
plot(math.min(open, close), "Navy step line on body low point", color.navy, 3, plot.style_stepline)
plot(low, "Gray dot on `low`", color.gray, 3, plot.style_circles)

color VIOLET = #AA00FF
color GOLD   = #CCCC00
ma = ta.alma(hl2, 40, 0.85, 6)
var almaColor = color.silver
almaColor := ma > ma[2] ? GOLD : ma < ma[2]  ? VIOLET : almaColor
plot(ma, "Two-color ALMA", almaColor, 2)
```

注意：

- 第一个[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用绘制了一条穿过条形高点的1像素蓝线。
- 第二个图在实体的中点交叉。当条形向上时，十字架呈石灰色；当条形向下时，十字架呈紫色。用于的参数`linewidth`是`6`但它不是像素值；只是相对大小。
- 第三次调用绘制了一条跟随物体低点的 3 像素宽的阶梯线。
- 第四次调用在柱的[最低点](https://www.tradingview.com/pine-script-reference/v5/#var_low)绘制了一个灰色圆圈。
- 最后一个情节需要一些准备。我们首先定义牛市/熊市颜色，计算[Arnaud Legoux 移动平均线](https://www.tradingview.com/support/solutions/43000594683)，然后进行颜色计算。我们使用[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)仅在零柱上初始化颜色变量。我们将其初始化为[color.silver](https://www.tradingview.com/pine-script-reference/v5/#var_color{dot}silver)，因此在数据集的第一个条上，直到我们的一个条件导致颜色发生变化，该线将为银色。改变线条颜色的条件要求它高于/低于两根柱前的值。与我们仅仅寻找比前一个值更高/更低的值相比，这使得颜色过渡的噪音更少。

此脚本在窗格中显示了[plot()的其他用法：](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)

![../_images/Plots-Introduction-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Plots-Introduction-02.png)

```
Pine Script™
Copied//@version=5
indicator("Volume change", format = format.volume)

color GREEN         = #008000
color GREEN_LIGHT   = color.new(GREEN, 50)
color GREEN_LIGHTER = color.new(GREEN, 85)
color PINK          = #FF0080
color PINK_LIGHT    = color.new(PINK, 50)
color PINK_LIGHTER  = color.new(PINK, 90)

bool  barUp = ta.rising(close, 1)
bool  barDn = ta.falling(close, 1)
float volumeChange = ta.change(volume)

volumeColor = barUp ? GREEN_LIGHTER : barDn ? PINK_LIGHTER : color.gray
plot(volume, "Volume columns", volumeColor, style = plot.style_columns)

volumeChangeColor = barUp ? volumeChange > 0 ? GREEN : GREEN_LIGHT : volumeChange > 0 ? PINK : PINK_LIGHT
plot(volumeChange, "Volume change columns", volumeChangeColor, 12, plot.style_histogram)

plot(0, "Zero line", color.gray)
```

注意：

- [我们将正常体积](https://www.tradingview.com/pine-script-reference/v5/#var_volume)值绘制 为零线上方的宽柱（请参阅我们的[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用中的）。`style = plot.style_columns`
- 在绘制列之前，我们使用和布尔变量`volumeColor`的值来计算。当当前柱的[收盘价](https://www.tradingview.com/pine-script-reference/v5/#var_close) 高于/低于前一柱时，它们分别变为。请注意，内置的“Volume”不使用相同的条件；它用 标识一个向上的柱。我们对体积列使用和颜色。`barUp``barDn``true``close > open``GREEN_LIGHTER``PINK_LIGHTER`
- 因为第一个图绘制了列，所以我们不使用该`linewidth`参数，因为它对列没有影响。
- 我们脚本的第二个图是体积的**变化**，我们之前使用 计算过`ta.change(volume)`。该值绘制为直方图，其中`linewidth`参数控制列的宽度。我们设置这个宽度`12`，使直方图元素比第一个图的列更细。正/负值`volumeChange`绘制在零线上方/下方；无需任何操作即可实现此效果。
- 在绘制值的直方图之前`volumeChange`，我们计算其颜色值，它可以是四种不同颜色之一。当条向上/向下并且成交量自最后一个条 ( )以来增加时，我们使用明亮`GREEN`或颜色。因为在本例中为正，所以直方图的元素将绘制在零线上方。当条向上/向下并且自上一个条以来成交量没有增加时，我们使用明亮或颜色。因为在这种情况下为负，所以直方图的元素将绘制在零线下方。`PINK``volumeChange > 0``volumeChange``GREEN_LIGHT``PINK_LIGHT``volumeChange`
- 最后，我们绘制一条零线。我们也可以`hline(0)`在那里使用。
- 我们在[indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)调用中使用，以便该脚本显示的大值被缩写，就像内置的“交易量”指标一样。`format = format.volume`

[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot) 调用必须始终放置在行的第一个位置，这意味着它们始终位于脚本的全局范围内。它们不能放置在用户定义的函数或结构中，如[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)、 [for等。但是，对](https://www.tradingview.com/pine-script-reference/v5/#op_for)[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot) 的调用**可以**设计为以两种方式进行条件绘图，我们将在 本页的条件绘图部分中介绍这些方法。

脚本只能在其自己的视觉空间中进行绘制，无论是在窗格中还是在图表上作为叠加层。在窗格中运行的脚本只能在图表区域中显示[颜色条。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_coloring.html#pagebarcoloring)

## [`plot()` 参数](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id2)

plot [()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)函数具有以下签名：

```
Pine Script™
Copiedplot(series, title, color, linewidth, style, trackprice, histbase, offset, join, editable, show_last, display) → plot
```

[绘图（）](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)的参数是：

- `series`

  它是唯一的强制参数。它的参数必须是“series int/float”类型。请注意，由于 Pine Script™ 中的自动转换规则以 int 🠆 float 🠆 bool 方向进行转换，因此“bool”类型变量不能按原样使用；它必须转换为“int”或“float”才能用作参数。例如，if`newDay`是“bool”类型，则当变量为 时，可用于绘制 1 ，当变量为 时，可用于绘制 0 。`newDay ? 1 : 0``true``false`

- `title`

  需要一个“const string”参数，因此它必须在编译时已知。出现字符串：当选中“图表设置/刻度/指标名称标签”字段时，在脚本的刻度中。在数据窗口中。在“设置/样式”选项卡中。[在input.source()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}source)字段的下拉列表中。当选择脚本时，在“创建警报”对话框的“条件”字段中。作为将图表数据导出到 CSV 文件时的列标题。

- `color`

  接受“系列颜色”，因此可以逐条即时计算。使用[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) 作为颜色或透明度为 100 的任何颜色进行绘图是在不需要绘图时隐藏绘图的一种方法。

- `linewidth`

  是绘制元素的大小，但它并不适用于所有样式。绘制线条时，单位是像素。使用[plot.style_columns](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_columns)时没有影响。

- `style`

  可用的参数有：[plot.style_line](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_line)（默认值）：它使用`linewidth`以像素为单位的参数绘制一条连续线的宽度。 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值不会绘制为一条线，但当非[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值出现时，它们将被桥接。非[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值仅当它们在图表上可见时才被桥接。[plot.style_linebr ：允许通过不在](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_linebr)[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) 值上绘制、不连接间隙（即桥接[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值）来绘制不连续线。[plot.style_stepline](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_stepline)：使用楼梯效果进行绘图。值变化之间的转换是使用在条形中间绘制的垂直线来完成的，而不是使用连接条形中点的点对点对角线。也可用于实现与 [plot.style_linebr](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_linebr)类似的效果，但前提是注意在[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值上不绘制颜色。[plot.style_area](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_area)：绘制一条`linewidth`宽度的线，填充线和 之间的区域`histbase`。该`color`参数用于线条和填充。您可以使用另一个[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用使线条具有不同的颜色。正值绘制在 上方`histbase`，负值绘制在下方。[plot.style_areabr ：这与](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_area)[plot.style_area](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_area)类似 ，但它不会跨越[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值。另一个区别是指标规模的计算方式。只有绘制的值才用于计算脚本视觉空间的*y*范围。例如，如果仅绘制远离 的高值`histbase`，则这些值将用于计算脚本视觉空间的*y*比例。正值绘制在 上方`histbase`，负值绘制在下方。[plot.style_columns](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_columns)：绘制类似于“Volume”内置指标的列。该`linewidth`值不**影响**列的宽度。正值绘制在 上方`histbase`，负值绘制在下方。始终`histbase`在脚本视觉空间的*y*比例中包含 的值。[plot.style_histogram](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_histogram)：绘制与“Volume”内置指标类似的列，不同之处在于该`linewidth`值用于确定直方图条形的宽度（以像素为单位）。请注意，由于`linewidth`需要“输入 int”值，因此直方图条形的宽度不能随条形变化。正值绘制在 上方`histbase`，负值绘制在下方。始终`histbase`在脚本视觉空间的*y*比例中包含 的值。[plot.style_circles](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_circles)和 [plot.style_cross](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_cross)：这些绘制的形状不会跨条连接，除非也使用了。对于这些样式，参数成为相对大小度量 - 它的单位不是像素。`join = true``linewidth`

- `trackprice`

  该值的默认值为`false`。当它是 时`true`，将在脚本视觉空间的整个宽度上绘制一条由小方块组成的虚线。它经常与 结合使用， 以隐藏实际情节，只留下残留的虚线。`show_last = 1, offset = -99999`

- `histbase`

  [它是与plot.style_area](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_area)、 [plot.style_columns](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_columns)和 [plot.style_histogram](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_histogram)一起使用的参考点。它决定了论证的正值和负值的分隔程度`series`。它不能动态计算，因为需要“输入 int/float”。

- `offset`

  这允许使用柱中的负/正偏移来移动过去/未来的图。该值在脚本执行期间不能更改。

- `join`

  这只影响样式[plot.style_circles](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_circles)或 [plot.style_cross](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_cross)。当 时`true`，形状通过单像素线连接。

- `editable`

  该布尔参数控制是否可以在“设置/样式”选项卡中编辑绘图的属性。它的默认值为`true`。

- `show_last`

  允许控制最后有多少条绘制值可见。需要一个“input int”参数，因此无法动态计算。

- `display`

  默认为[display.all](https://www.tradingview.com/pine-script-reference/v5/#var_display{dot}all)。当它设置为[display.none](https://www.tradingview.com/pine-script-reference/v5/#var_display{dot}none)时，绘制的值不会影响脚本视觉空间的比例。该图将不可见，并且不会出现在指标值或数据窗口中。它在用作其他脚本的外部输入的绘图中很有用，或者`{{plot("[plot_title]")}}`在 [alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)调用中与占位符一起使用的绘图中很有用，例如：

```
Pine Script™
Copied//@version=5
indicator("")
r = ta.rsi(close, 14)
xUp = ta.crossover(r, 50)
plot(r, "RSI", display = display.none)
alertcondition(xUp, "xUp alert", message = 'RSI is bullish at: {{plot("RSI")}}')
```



## [有条件地绘图](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id3)

[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用不能在条件结构（例如[if ）](https://www.tradingview.com/pine-script-reference/v5/#op_if)中使用，但可以通过改变其绘制值或颜色来控制它们。当不需要绘图时，您可以绘制[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值，或使用[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)颜色或透明度为 100 的任何颜色（这也使其不可见）绘制值。

### [值控制](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id4)

控制图显示的一种方法是在不需要图时绘制[na值。有时， ](https://www.tradingview.com/pine-script-reference/v5/#var_na)[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)等函数返回的值 将在使用时 返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值。在这两种情况下，绘制不连续线有时很有用。该脚本展示了几种执行此操作的方法：`gaps = barmerge.gaps_on`

![../_images/Plots-PlottingConditionally-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Plots-PlottingConditionally-01.png)

```
Pine Script™
Copied//@version=5
indicator("Discontinuous plots", "", true)
bool plotValues = bar_index % 3 == 0
plot(plotValues ? high : na, color = color.fuchsia, linewidth = 6, style = plot.style_linebr)
plot(plotValues ? high : na)
plot(plotValues ? math.max(open, close) : na, color = color.navy, linewidth = 6, style = plot.style_cross)
plot(plotValues ? math.min(open, close) : na, color = color.navy, linewidth = 6, style = plot.style_circles)
plot(plotValues ? low : na, color = plotValues ? color.green : na, linewidth = 6, style = plot.style_stepline)
```

注意：

- 我们使用 来定义确定绘图时的条件，即当条形索引除以 3 的余数为零时。每三小节就会发生一次这种情况。`bar_index % 3 == 0``true`
- 在第一个图中，我们使用[plot.style_linebr](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_linebr)，它在高点上绘制紫红色线。它以条形的水平中点为中心。
- 第二个图显示了绘制相同值的结果，但没有特别小心地打破线条。这里发生的情况是，普通[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用的细蓝线会自动桥接[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值（或*间隙*），因此绘图不会中断。
- 然后，我们在身体的顶部和底部绘制海军蓝色的十字和圆圈。 plot.style_circles和 [plot.style_cross](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_cross) 样式是绘制不连续值的简单方法，例如，止损或止盈水平，或支撑和阻力水平[。](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_circles)
- 条形最低点上的最后一个绿色图是使用[plot.style_stepline](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_stepline)完成的。请注意它的线段比用[plot.style_linebr](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_linebr)绘制的紫红色线段更宽。另请注意，在最后一个柱上，它仅绘制到下一个柱出现之前的一半。
- 每个情节的绘制顺序由它们在脚本中出现的顺序控制。看

此脚本展示了如何将绘图限制为用户定义日期之后的条形图。我们使用[input.time()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}time)函数创建一个输入小部件，允许脚本用户选择日期和时间，并使用 2021 年 1 月 1 日作为其默认值：

```
Pine Script™
Copied//@version=5
indicator("", "", true)
startInput = input.time(timestamp("2021-01-01"))
plot(time > startInput ? close : na)
```

### [颜色控制](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id5)

颜色页面的条件着色部分讨论了绘图的颜色控制[。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#pagecolors-conditionalcoloring)我们将看几个例子。

[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)`color`中参数的值可以是常量，例如内置[常量颜色](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#pagecolors-constantcolors)之一或[颜色文字](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-color)。在 Pine Script™ 中，此类颜色的限定类型称为**“常量颜色”**（请参阅[类型系统](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem)页面）。它们在编译时是已知的：

```
Pine Script™
Copied//@version=5
indicator("", "", true)
plot(close, color = color.gray)
```

也可以使用仅当脚本开始在图表的第一个历史柱（柱零，即 或）上执行时才知道的信息来确定绘图的颜色，就像确定颜色所需的信息时的情况一样取决于脚本运行的图表。在这里，我们使用[syminfo.type](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}type)内置变量计算绘图颜色，该变量返回图表符号的类型。在这种情况下，合格的类型将是**“simple color”**：`bar_index == 0``barstate.isfirst == true``plotColor`

```
Pine Script™
Copied//@version=5
indicator("", "", true)
plotColor = switch syminfo.type
    "stock"     => color.purple
    "futures"   => color.red
    "index"     => color.gray
    "forex"     => color.fuchsia
    "crypto"    => color.lime
    "fund"      => color.orange
    "dr"        => color.aqua
    "cfd"       => color.blue
plot(close, color = plotColor)
printTable(txt) => var table t = table.new(position.middle_right, 1, 1), table.cell(t, 0, 0, txt, bgcolor = color.yellow)
printTable(syminfo.type)
```

绘图颜色也可以通过脚本的输入来选择。在本例中，`lineColorInput`变量是**“输入颜色”**类型：

```
Pine Script™
Copied//@version=5
indicator("", "", true)
color lineColorInput  = input(#1848CC, "Line color")
plot(close, color = lineColorInput)
```

最后，绘图颜色也可以是*动态*值，即可以在每个条上改变的计算值。这些值属于**“系列颜色”**类型：

```
Pine Script™
Copied//@version=5
indicator("", "", true)
plotColor = close >= open ? color.lime : color.red
plot(close, color = plotColor)
```

绘制枢轴水平时，一项常见要求是避免绘制水平转换。使用[线条](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes)是一种替代方法，但您也可以使用[plot()，](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)如下所示：

![../_images/Plots-PlottingConditionally-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Plots-PlottingConditionally-02.png)

```
Pine Script™
Copied//@version=5
indicator("Pivot plots", "", true)
pivotHigh = fixnan(ta.pivothigh(3,3))
plot(pivotHigh, "High pivot", ta.change(pivotHigh) ? na : color.olive, 3)
plotchar(ta.change(pivotHigh), "ta.change(pivotHigh)", "•", location.top, size = size.small)
```

注意：

- 我们习惯于保持我们的核心价值观。因为[ta.pivothigh()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}pivothigh) 仅在找到新的主元时返回一个值，所以我们使用[fixnan()](https://www.tradingview.com/pine-script-reference/v5/#fun_fixnan) 用最后返回的主元值来填充空白。这里的间隙指的是当没有找到新的主元时[ta.pivothigh()返回的](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}pivothigh)[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值 。`pivotHigh = fixnan(ta.pivothigh(3,3))`
- 我们的枢轴在出现后三个柱被检测到，因为我们在 [ta.pivothigh()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}pivothigh)`3`调用中使用了和参数。`leftbars``rightbars`
- 最后一个图绘制了一个连续值，但当枢轴的值发生变化时，它将图的颜色设置为[na](https://www.tradingview.com/pine-script-reference/v5/#var_na) ，因此此时图不可见。因此，可见的图只会出现在我们使用[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)颜色绘制的图之后的条形图上。
- 蓝点表示何时检测到新的高枢轴点，并且在前一柱和该柱之间没有绘制任何图。请注意如何在实时条形图上检测到箭头指示的条形图上的枢轴（三个条形图之后），以及如何未绘制任何图。该图仅出现在下一个柱上，使得该图在实际枢轴之后的**四个柱上可见。**



## [级别](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id6)

Pine Script™ 有一个[hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline) 函数来绘制水平线（请参阅[“级别”](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Levels.html#pagelevels)页面）。 [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline) 很有用，因为它有一些[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)无法提供的线条样式，但它也有一些限制，即它不接受“系列颜色”，并且它的`price`参数需要“输入 int/float”，因此不能在脚本执行过程中会发生变化。

您可以 通过几种不同的方式使用[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)绘制级别。这显示了[CCI](https://www.tradingview.com/support/solutions/43000502001) 指标，其水平是使用[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)绘制的：

![../_images/Plots-Levels-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Plots-Levels-01.png)

```
Pine Script™
Copied//@version=5
indicator("CCI levels with `plot()`")
plot(ta.cci(close, 20))
plot(0,  "Zero", color.gray, 1, plot.style_circles)
plot(bar_index % 2 == 0 ?  100 : na,  "100", color.lime, 1, plot.style_linebr)
plot(bar_index % 2 == 0 ? -100 : na, "-100", color.fuchsia, 1, plot.style_linebr)
plot( 200,  "200", color.green, 2, trackprice = true, show_last = 1, offset = -99999)
plot(-200, "-200", color.red,   2, trackprice = true, show_last = 1, offset = -99999)
plot( 300,  "300", color.new(color.green, 50), 1)
plot(-300, "-300", color.new(color.red, 50),   1)
```

注意：

- 零水平是使用[plot.style_circles](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_circles)绘制的。
- 100 个级别是使用仅每隔两个条绘制一次的条件值绘制的。为了防止[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值被桥接，我们使用[plot.style_linebr](https://www.tradingview.com/pine-script-reference/v5/#var_plot{dot}style_linebr)线条样式。
- 200 个级别的绘制用于绘制独特的小方块图案，该图案延伸了脚本视觉空间的整个宽度。那里只显示最后一个绘制的值，如果没有使用下一个技巧，该值将显示为单条直线：将单条线段推到过去很远的地方，使其永远不可见。`trackprice = true``show_last = 1``offset = -99999`
- 300 个级别使用连续线绘制，但使用较浅的透明度使它们不那么突出。

## [偏移量](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id7)

该`offset`参数指定绘制线条时使用的偏移（负值偏移到过去，正值偏移到未来）。例如：

```
Pine Script™
Copied//@version=5
indicator("", "", true)
plot(close, color = color.red, offset = -5)
plot(close, color = color.lime, offset = 5)
```

![../_images/Plots-Offsets-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Plots-Offsets-01.png)

从屏幕截图中可以看出，*红色*系列已向左移动（因为参数的值为负），而*绿色* 系列已向右移动（其值为正）。

## [绘图计数限制](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id8)

每个脚本的最大绘图数限制为 64。所有`plot*()`调用和[alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#func_alertcondition)调用都计入脚本的绘图数。某些类型的调用在总绘图计数中的数量不只一次。

[如果他们使用“const color”参数作为参数，plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot) 会在总绘图计数中调用 count 1 `color`，这意味着它在编译时是已知的，例如：

```
Pine Script™
Copiedplot(close, color = color.green)
```

当他们使用另一种限定类型（例如其中任何一种）时，它们将在总绘图计数中计数：

```
Pine Script™
Copiedplot(close, color = syminfo.mintick > 0.0001 ? color.green : color.red) //🠆 "simple color"
plot(close, color = input.color(color.purple)) //🠆 "input color"
plot(close, color = close > open ? color.green : color.red) //🠆 "series color"
plot(close, color = color.new(color.silver, close > open ? 40 : 0)) //🠆 "series color"
```

## [规模](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id9)

并非所有值都可以随处绘制。脚本的视觉空间始终受到上限和下限的限制，上限和下限会根据绘制的值进行动态调整。[RSI](https://www.tradingview.com/support/solutions/43000502338)指标将绘制 0 到 100 之间的值，这就是为什么它通常显示在图表上方或下方的不同*窗格*或区域中的原因。如果 RSI 值在图表上绘制为叠加，则效果将扭曲该符号的正常价格范围，除非它恰好接近 RSI 的 0 到 100 范围。这显示了 RSI 信号线和 50 水平的中心线，脚本在单独的窗格中运行：

![../_images/Plots-Scale-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Plots-Scale-01.png)

```
Pine Script™
Copied//@version=5
indicator("RSI")
myRSI = ta.rsi(close, 20)
bullColor = color.from_gradient(myRSI, 50, 80, color.new(color.lime, 70), color.new(color.lime, 0))
bearColor = color.from_gradient(myRSI, 20, 50, color.new(color.red,   0), color.new(color.red, 70))
myRSIColor = myRSI > 50 ? bullColor : bearColor
plot(myRSI, "RSI", myRSIColor, 3)
hline(50)
```

请注意，我们的脚本视觉空间的*y*轴是使用绘制的值范围（即 RSI 值）自动调整大小的。有关脚本中使用的[color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)函数的更多信息， 请参阅[颜色](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#pagecolors)页面。

如果我们尝试 通过将以下行添加到脚本中来在同一空间中绘制交易品种的[收盘值：](https://www.tradingview.com/pine-script-reference/v5/#var_close)

```
Pine Script™
Copiedplot(close)
```

发生的情况是这样的：

![../_images/Plots-Scale-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Plots-Scale-02.png)

该图表显示的是 BTCUSD 符号，在此期间[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close) 价约为 40000 点。在 40000 范围内绘制值使得我们在 0 到 100 范围内的 RSI 图难以辨别。如果我们将[RSI](https://www.tradingview.com/support/solutions/43000502338)指标作为叠加层放置在图表上，也会出现同样的扭曲图。

### [合并两个指标](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#id10)

如果您计划将两个信号合并到一个脚本中，请首先考虑每个信号的规模。例如，不可能在同一脚本的视觉空间中正确绘制 [RSI](https://www.tradingview.com/support/solutions/43000502338)和[MACD](https://www.tradingview.com/support/solutions/43000502344) ，因为 RSI 有固定范围（0 到 100），而 MACD 则没有，因为它绘制根据价格计算的移动平均线。_

如果您的两个指标都使用固定范围，您可以移动其中之一的值，使它们不重叠。例如，我们可以通过替换其中之一来绘制[RSI](https://www.tradingview.com/support/solutions/43000502338)（0 到 100）和[真实强度指标 (TSI)](https://www.tradingview.com/support/solutions/43000592290) （-100 到 +100）。我们的策略是压缩和移动[TSI值，以便它们在](https://www.tradingview.com/support/solutions/43000592290)[RSI](https://www.tradingview.com/support/solutions/43000502338)上绘制：

![../_images/Plots-Scale-03.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Plots-Scale-03.png)

```
Pine Script™
Copied//@version=5
indicator("RSI and TSI")
myRSI = ta.rsi(close, 20)
bullColor = color.from_gradient(myRSI, 50, 80, color.new(color.lime, 70), color.new(color.lime, 0))
bearColor = color.from_gradient(myRSI, 20, 50, color.new(color.red,   0), color.new(color.red, 70))
myRSIColor = myRSI > 50 ? bullColor : bearColor
plot(myRSI, "RSI", myRSIColor, 3)
hline(100)
hline(50)
hline(0)

// 1. Compress TSI's range from -100/100 to -50/50.
// 2. Shift it higher by 150, so its -50 min value becomes 100.
myTSI = 150 + (100 * ta.tsi(close, 13, 25) / 2)
plot(myTSI, "TSI", color.blue, 2)
plot(ta.ema(myTSI, 13), "TSI EMA", #FF006E)
hline(200)
hline(150)
```

注意：

- [我们使用hline](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)添加了级别 来定位两个信号。
- 为了使两条信号线在相同的 100 范围内振荡，我们将[TSI](https://www.tradingview.com/support/solutions/43000592290)值除以 2，因为它的范围为 200（-100 到 +100）。然后我们将该值上移 150，使其在 100 和 200 之间振荡，使 150 成为其中心线。
- 我们在这里所做的操作是将两个具有不同尺度的指标置于同一视觉空间中所需的典型折衷，即使它们的值（与 [MACD](https://www.tradingview.com/support/solutions/43000502344)相反）限制在固定范围内。