# 级别

## [`hline()` 级别](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Levels.html#id1)

级别是使用 [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)函数绘制的线。它被设计为使用**单一颜色绘制****水平**水平，即它在不同的条上不会改变。当[hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline) 不能满足您的需要时，请参阅[plot()](https://www.tradingview.com/pine-script-reference/v5/#plot)页面的[“级别”](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Plots.html#pageplots-levels)部分 ，了解绘制级别的替代方法。

该函数具有以下签名：

```
Pine Script™
Copiedhline(price, title, color, linestyle, linewidth, editable) → hline
```

[与plot()相比， ](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)[hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline) 有一些限制 ：

- 由于该函数的目标是绘制水平线，因此其参数需要“输入 int/float”参数，这意味着 不能使用`price`“系列浮点”值，例如[接近值或动态计算值。](https://www.tradingview.com/pine-script-reference/v5/#var_close)
- 它的`color`参数需要一个“input int”参数，这排除了动态颜色的使用，即在每个条上计算的颜色 - 或“系列颜色”值。
- 通过参数支持三种不同的线型`linestyle`： `hline.style_solid`、`hline.style_dotted`和`hline.style_dashed`。

让我们看看[hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline) 在“真实强度指数”指标中的作用：

```
Pine Script™
Copied//@version=5
indicator("TSI")
myTSI = 100 * ta.tsi(close, 25, 13)

hline( 50, "+50",  color.lime)
hline( 25, "+25",  color.green)
hline(  0, "Zero", color.gray, linestyle = hline.style_dotted)
hline(-25, "-25",  color.maroon)
hline(-50, "-50",  color.red)

plot(myTSI)
```

![../_images/Levels-HlineLevels-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Levels-HlineLevels-01.png) ![../_images/Levels-HlineLevels-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Levels-HlineLevels-02.png)

注意：

- 我们显示 5 个级别，每个级别都有不同的颜色。
- 我们对零中心线使用不同的线条样式。
- 我们选择适合浅色和深色主题的颜色。
- 指标值的通常范围是 +100 到 -100。由于[ta.tsi()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}tsi) 内置返回 +1 到 -1 范围内的值，因此我们在代码中进行了调整。

## [级别之间的填充](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Levels.html#id2)

[使用hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)绘制的两个级别之间的空间 可以使用[fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)进行着色。请记住，**这两个**图必须是用 [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)绘制的。

让我们在 TSI 指标中添加一些背景颜色：

```
Pine Script™
Copied//@version=5
indicator("TSI")
myTSI = 100 * ta.tsi(close, 25, 13)

plus50Hline  = hline( 50, "+50",  color.lime)
plus25Hline  = hline( 25, "+25",  color.green)
zeroHline    = hline(  0, "Zero", color.gray, linestyle = hline.style_dotted)
minus25Hline = hline(-25, "-25",  color.maroon)
minus50Hline = hline(-50, "-50",  color.red)

// ————— Function returns a color in a light shade for use as a background.
fillColor(color col) =>
    color.new(col, 90)

fill(plus50Hline,  plus25Hline,  fillColor(color.lime))
fill(plus25Hline,  zeroHline,    fillColor(color.teal))
fill(zeroHline,    minus25Hline, fillColor(color.maroon))
fill(minus25Hline, minus50Hline, fillColor(color.red))

plot(myTSI)
```

![../_images/Levels-FillBetweenLevels-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Levels-FillBetweenLevels-01.png) ![../_images/Levels-FillBetweenLevels-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Levels-FillBetweenLevels-02.png)

注意：

- [现在我们已经使用了hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)函数调用的返回值 ，它是[hline](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types-plotandhline)特殊类型。我们使用`plus50Hline`、`plus25Hline`、`zeroHline`和 变量来存储这些“hline”ID，因为稍后我们将在 `minus25Hline`fill ( [)调用中需要它们。](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)`minus50Hline`
- 为了生成背景颜色较浅的色调，我们声明一个`fillColor()`接受颜色并返回其 90 透明度的函数。我们`color`在 [fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)调用中使用对该函数的调用作为参数。
- 我们在四对不同的级别之间对我们想要的四种不同填充中的每一种进行[fill()调用。](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)
- 我们在第二次填充中使用它`color.teal`，因为它产生的绿色比`color.green`25 级别使用的绿色更适合配色方案。