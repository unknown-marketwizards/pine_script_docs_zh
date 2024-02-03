# 背景

bgcolor [()](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor) 函数更改脚本背景的颜色。如果脚本在模式下运行，那么它将为图表的背景着色。`overlay = true`

该函数的签名是：

```javascript
bgcolor(color, offset, editable, show_last, title) → void
```

它的`color`参数允许使用“系列颜色”作为其参数，因此可以在表达式中动态计算它。

如果正确的透明度不是要使用的颜色的一部分，则可以使用[color.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}new)函数生成。

下面是一个为交易时段的背景着色的脚本（例如，在 30 分钟 EURUSD 上尝试）：

```javascript
//@version=5
indicator("Session backgrounds", overlay = true)

// Default color constants using tranparency of 25.
BLUE_COLOR   = #0050FF40
PURPLE_COLOR = #0000FF40
PINK_COLOR   = #5000FF40
NO_COLOR     = color(na)

// Allow user to change the colors.
preMarketColor  = input.color(BLUE_COLOR, "Pre-market")
regSessionColor = input.color(PURPLE_COLOR, "Pre-market")
postMarketColor = input.color(PINK_COLOR, "Pre-market")

// Function returns `true` when the bar's time is
timeInRange(tf, session) =>
    time(tf, session) != 0

// Function prints a message at the bottom-right of the chart.
f_print(_text) =>
    var table _t = table.new(position.bottom_right, 1, 1)
    table.cell(_t, 0, 0, _text, bgcolor = color.yellow)

var chartIs30MinOrLess = timeframe.isseconds or (timeframe.isintraday and timeframe.multiplier <=30)
sessionColor = if chartIs30MinOrLess
    switch
        timeInRange(timeframe.period, "0400-0930") => preMarketColor
        timeInRange(timeframe.period, "0930-1600") => regSessionColor
        timeInRange(timeframe.period, "1600-2000") => postMarketColor
        => NO_COLOR
else
    f_print("No background is displayed.\nChart timeframe must be <= 30min.")
    NO_COLOR

bgcolor(sessionColor)
```

![../_images/背景-Sessions.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Backgrounds-Sessions.png)

注意：

- 该脚本仅适用于 30 分钟或更短的图表时间范围。当图表的时间范围高于 30 分钟时，它会打印一条错误消息。
- 当由于图表的时间范围不正确而使用[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)结构的 `else`分支时，本地块将返回颜色，`NO_COLOR`以便在这种情况下不显示背景。
- 我们首先使用基色初始化常量，其中包括`40`最后的十六进制表示法的透明度。透明度的反向 00-FF 刻度上的十六进制表示法中的 40 对应于 Pine Script™ 透明度的 0-100 十进制刻度中的 75。
- 我们提供颜色输入，允许脚本用户更改我们建议的默认颜色。

在下一个示例中，我们为 CCI 线的背景生成渐变：

```javascript
//@version=5
indicator("CCI Background")

bullColor = input.color(color.lime, "🠅", inline = "1")
bearColor = input.color(color.fuchsia, "🠇", inline = "1")

// Calculate CCI.
myCCI = ta.cci(hlc3, 20)
// Get relative position of CCI in last 100 bars, on a 0-100% scale.
myCCIPosition = ta.percentrank(myCCI, 100)
// Generate a bull gradient when position is 50-100%, bear gradient when position is 0-50%.
backgroundColor = if myCCIPosition >= 50
    color.from_gradient(myCCIPosition, 50, 100, color.new(bullColor, 75), bullColor)
else
    color.from_gradient(myCCIPosition, 0, 50, bearColor, color.new(bearColor, 75))

// Wider white line background.
plot(myCCI, "CCI", color.white, 3)
// Think black line.
plot(myCCI, "CCI", color.black, 1)
// Zero level.
hline(0)
// Gradient background.
bgcolor(backgroundColor)
```

![../_images/背景-CCI.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Backgrounds-CCI.png)

注意：

- 我们使用[ta.cci()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}cci) 内置函数来计算指标值。
- 我们使用[ta.percentrank()](https://www.tradingview.com/pine-script-reference/v5/#ta.percentrank) 内置函数来计算，即 最后 100 个柱中过去值低于当前值的`myCCIPosition`百分比。`myCCI``myCCI`
- 为了计算梯度，我们使用 内置的[color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)`myCCIPosition`的两种不同调用：一种是在 50-100% 范围内时的公牛梯度，这意味着更多过去的值低于其当前值，另一种是对于熊市梯度，当`myCCIPosition`处于 0-49.99% 范围内时，这意味着更多过去的值高于它。
- 我们提供输入，以便用户可以更改牛市/熊市颜色，并且我们将两个颜色输入小部件放置在同一行上，并在两个 [input.color()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}color)调用中使用。`inline = "1"`
- [我们使用两个plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用来绘制CCI信号， 以在繁忙的背景上实现最佳对比度：第一个图是3像素宽的白色背景，第二个[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot) 调用绘制细的1像素宽的黑线。

有关背景的更多示例，请参阅[颜色页面。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Colors.html#pagecolors)