# 填充

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Fills.html#id1)

有两种不同的机制专门用于填充 Pine 视觉效果之间的空间：

- fill [()函数允许您为使用](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)[plot()绘制的两个图或使用](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)[hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline) 绘制的两条水平线之间的背景着色。
- linefill.new [()函数填充使用](https://www.tradingview.com/pine-script-reference/v5/#fun_linefill{dot}new)[line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line{dot}new)创建的行之间的空间 。

## [`plot()` 和 `hline()` 填充](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Fills.html#id2)

fill [()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)函数有两个签名：

```
Pine Script™
Copiedfill(plot1, plot2, color, title, editable, show_last, fillgaps) → void
fill(hline1, hline2, color, title, editable, fillgaps) → void
```

用于`plot1`、`plot2`和参数 的参数必须是由[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)`hline1`和[hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)`hline2`调用返回的ID 。 fill [()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)函数是唯一使用这些 ID 的内置函数。

请参阅第一个示例，了解如何 在、、、 和、和变量中捕获由[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)和 [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)调用返回的 ID ，以便重用为[fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)参数：`p1``p2``p3``h1``h2``h3``h4`

![../_images/Fills-Fill-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Fills-Fill-1.png)

```
Pine Script™
Copied//@version=5
indicator("Example 1")
p1 = plot(math.sin(high))
p2 = plot(math.cos(low))
p3 = plot(math.sin(close))
fill(p1, p3, color.new(color.red, 90))
fill(p2, p3, color.new(color.blue, 90))
h1 = hline(0)
h2 = hline(1.0)
h3 = hline(0.5)
h4 = hline(1.5)
fill(h1, h2, color.new(color.yellow, 90))
fill(h3, h4, color.new(color.lime, 90))
```

由于[fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill) 需要来自同一函数的两个 ID，因此我们有时需要使用[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot) 调用，否则我们会使用[hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline) 调用，如下例所示：

![../_images/Fills-Fill-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Fills-Fill-2.png)

```
Pine Script™
Copied//@version=5
indicator("Example 2")
src = close
ma = ta.sma(src, 10)
osc = 100 * (ma - src) / ma
oscPlotID  = plot(osc)
// An `hline()` would not work here because two `plot()` calls are needed.
zeroPlotID = plot(0, "Zero", color.silver, 1, plot.style_circles)
fill(oscPlotID, zeroPlotID, color.new(color.blue, 90))
```

因为“系列颜色”可以用作[fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)`color`中的参数 的参数，所以您可以使用像或 之类的常量，以及计算每个条形上颜色的表达式，如下例所示：`color.red``#FF001A`

![../_images/Fills-Fill-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Fills-Fill-3.png)

```
Pine Script™
Copied//@version=5
indicator("Example 3", "", true)
line1 = ta.sma(close, 5)
line2 = ta.sma(close, 20)
p1PlotID = plot(line1)
p2PlotID = plot(line2)
fill(p1PlotID, p2PlotID, line1 > line2 ? color.new(color.green, 90) : color.new(color.red, 90))
```

## [线条填充](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Fills.html#id3)

线条填充是允许您填充通过[line.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_line{dot}new)函数创建的两个线条图之间的空间的对象。当调用[linefill.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_linefill{dot}new)函数时，图表上会显示一个 linefill 对象 。该函数具有以下签名：

```
Pine Script™
Copiedlinefill.new(line1, line2, color) → series linefill
```

和参数是要在其间填充`line1`的`line2`两行的行 ID。参数`color`是填充的颜色。任何两行对之间只能有一个行填充，因此 在同一对行上连续调用[linefill.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_linefill{dot}new)会将前一个行填充替换为新的行填充。该函数返回它创建的对象的 ID `linefill`，该 ID 可以保存在变量中，以便在 [linefill.set_color()](https://www.tradingview.com/pine-script-reference/v5/#fun_linefill{dot}set_color)调用中使用，该调用将更改现有线条填充的颜色。

行填充的行为取决于它们所附加的行。无法直接移动换行符；它们的坐标遵循它们所绑定的线的坐标。如果两条线朝同一方向延伸，则线填充也会延伸。

请注意，为了使直线延伸正常工作，直线的`x1`坐标必须小于其`x2`坐标。如果一条线的`x1`参数大于其`x2`参数并被`extend.left`使用，则该线实际上会向右延伸，因为`x2`假定它是最右边的*x*坐标。

在下面的示例中，我们的指标绘制了两条线连接图表的最后两个高点和低点枢轴点。我们将线条向右延伸以预测图表的短期走势，并填充线条之间的空间以增强线条创建的通道的可见性：

![../_images/Fills-Linefill-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Fills-Linefill-01.png)

```
Pine Script™
Copied//@version=5
indicator("Channel", overlay = true)

LEN_LEFT = 15
LEN_RIGHT = 5
pH = ta.pivothigh(LEN_LEFT, LEN_RIGHT)
pL = ta.pivotlow(LEN_LEFT, LEN_RIGHT)

// Bar indices of pivot points
pH_x1 = ta.valuewhen(pH, bar_index, 1) - LEN_RIGHT
pH_x2 = ta.valuewhen(pH, bar_index, 0) - LEN_RIGHT
pL_x1 = ta.valuewhen(pL, bar_index, 1) - LEN_RIGHT
pL_x2 = ta.valuewhen(pL, bar_index, 0) - LEN_RIGHT
// Price values of pivot points
pH_y1 = ta.valuewhen(pH, pH, 1)
pH_y2 = ta.valuewhen(pH, pH, 0)
pL_y1 = ta.valuewhen(pL, pL, 1)
pL_y2 = ta.valuewhen(pL, pL, 0)

if barstate.islastconfirmedhistory
    // Lines
    lH = line.new(pH_x1, pH_y1, pH_x2, pH_y2, extend = extend.right)
    lL = line.new(pL_x1, pL_y1, pL_x2, pL_y2, extend = extend.right)
    // Fill
    fillColor = switch
        pH_y2 > pH_y1 and pL_y2 > pL_y1 => color.green
        pH_y2 < pH_y1 and pL_y2 < pL_y1 => color.red
        => color.silver
    linefill.new(lH, lL, color.new(fillColor, 90))
```