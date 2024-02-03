# 条形图

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_plotting.html#id1)

plotcandle [()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle) 内置函数用于绘制蜡烛图。 [plotbar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotbar) 用于绘制常规条形图。

这两个函数都需要四个参数，这些参数将用于它们将绘制的柱的OHLC 价格（[开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open)、 [最高价](https://www.tradingview.com/pine-script-reference/v5/#var_high)、 [最低价](https://www.tradingview.com/pine-script-reference/v5/#var_low)、 [收盘价](https://www.tradingview.com/pine-script-reference/v5/#var_close)）。如果其中之一是[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，则不会绘制条形图。

## [使用“plotcandle()”绘制蜡烛图](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_plotting.html#id2)

[plotcandle()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle)的签名是：

```javascript
plotcandle(open, high, low, close, title, color, wickcolor, editable, show_last, bordercolor, display) → void
```

这将在单独的窗格中使用习惯的 OHLC 值绘制简单的蜡烛图，全部为蓝色：

```javascript
//@version=5
indicator("Single-color candles")
plotcandle(open, high, low, close)
```

![../_images/BarPlotting-Plotcandle-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BarPlotting-Plotcandle-1.png)

要将它们着色为绿色或红色，我们可以使用以下代码：

```javascript
//@version=5
indicator("Example 2")
paletteColor = close >= open ? color.lime : color.red
plotbar(open, high, low, close, color = paletteColor)
```

![../_images/BarPlotting-Plotcandle-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BarPlotting-Plotcandle-2.png)

请注意，该`color`参数接受“系列颜色”参数，因此常量值（例如`color.red`、`color.lime`、`"#FF9090"`）以及在运行时计算颜色的表达式（如此处对`paletteColor`变量所做的那样）都将起作用。

您可以使用实际 OHLC 值以外的值构建条形图或蜡烛图。例如，您可以使用以下代码计算和绘制平滑蜡烛图，该代码还根据收盘价相对于我们指标的平滑收盘价 ( ) 的位置为烛 [芯](https://www.tradingview.com/pine-script-reference/v5/#var_close)`c`着色 ：

```javascript
//@version=5
indicator("Smoothed candles", overlay = true)
lenInput = input.int(9)
smooth(source, length) =>
    ta.sma(source, length)
o = smooth(open, lenInput)
h = smooth(high, lenInput)
l = smooth(low, lenInput)
c = smooth(close, lenInput)
ourWickColor = close > c ? color.green : color.red
plotcandle(o, h, l, c, wickcolor = ourWickColor)
```

![../_images/BarPlotting-Plotcandle-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BarPlotting-Plotcandle-3.png)

您可能会发现绘制取自较高时间范围的 OHLC 值很有用。例如，您可以在日内图表上绘制日线图：

```javascript
// NOTE: Use this script on an intraday chart.
//@version=5
indicator("Daily bars")

// Use gaps to only return data when the 1D timeframe completes, `na` otherwise.
[o, h, l, c] = request.security(syminfo.tickerid, "D", [open, high, low, close], gaps = barmerge.gaps_on)

var color UP_COLOR = color.silver
var color DN_COLOR = color.blue
color wickColor = c >= o ? UP_COLOR : DN_COLOR
color bodyColor = c >= o ? color.new(UP_COLOR, 70) : color.new(DN_COLOR, 70)
// Only plot candles on intraday timeframes,
// and when non `na` values are returned by `request.security()` because a HTF has completed.
plotcandle(timeframe.isintraday ? o : na, h, l, c, color = bodyColor, wickcolor = wickColor)
```

![../_images/BarPlotting-Plotcandle-4.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BarPlotting-Plotcandle-4.png)

注意：

- 我们在使用脚本的“更多”菜单中的“视觉顺序/置于前面”后显示脚本的情节。这会导致我们脚本的蜡烛图出现在图表蜡烛图的顶部。

- 该脚本仅在满足两个条件时才会显示蜡烛：

  > - [该图表使用日内时间范围（请参阅plotcandle()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle)`timeframe.isintraday`调用中的 检查）。我们这样做是因为在高于或等于 1D 的时间范围内显示每日值没有用。
  > - request.security [()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security) 函数返回非[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)值（请参阅函数调用）。`gaps = barmerge.gaps_on`

- 我们使用元组 ( ) 和 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security) 在一次调用中获取四个值。`[open, high, low, close]`

- 我们仅使用[var](https://www.tradingview.com/pine-script-reference/v5/#op_var)来声明 零柱上的常量`UP_COLOR`和颜色常量。`DN_COLOR`我们使用常量是因为这些颜色在我们的代码中不止一处使用。这样，如果我们需要更改它们，只需在一处进行即可。

- 我们在变量初始化中为蜡烛体创建了较浅的透明度`bodyColor`，因此它们不会遮挡图表的蜡烛。

## [使用“plotbar()”绘制条形图](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_plotting.html#id3)

[plotbar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotbar)的签名是：

```javascript
plotbar(open, high, low, close, title, color, editable, show_last, display) → void
```

请注意，[plotbar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotbar) 没有`bordercolor`或参数`wickcolor`，因为传统条形图上没有边框或影线。

这使用与上一节的第二个示例相同的着色逻辑绘制传统条形：

```javascript
//@version=5
indicator("Dual-color bars")
paletteColor = close >= open ? color.lime : color.red
plotbar(open, high, low, close, color = paletteColor)
```

![../_images/BarPlotting-Plotbar-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BarPlotting-Plotbar-1.png)