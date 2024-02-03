# 非标准图表数据

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id10)

这些函数允许脚本从非标准条形图或图表类型获取信息，无论脚本运行的图表类型如何。它们是： [ticker.heikinashi()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}heikinashi)、 [ticker.renko()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}renko)、 [ticker.linebreak()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}linebreak)、 [ticker.kagi()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}kagi)和 [ticker.pointfigure()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}pointfigure)。它们都以相同的方式工作；他们创建一个特殊的代码标识符，用作[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)函数调用中的第一个参数。

## [`ticker.heikinashi()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id11)

*Heikin-Ashi*在日语中的意思是*“平均酒吧”*。 Heikin-Ashi 蜡烛图的开盘价/最高价/最低价/收盘价是合成的；它们不是实际的市场价格。它们是通过对当前柱和前一柱的实际 OHLC 值的组合进行平均来计算的。使用的计算使 Heikin-Ashi 柱形图比普通烛形图的噪音要小。它们对于进行视觉评估很有用，但不适合回溯测试或自动交易，因为订单按市场价格执行，而不是平均足价格。

ticker.heikinashi [()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}heikinashi) 函数创建一个特殊的代码标识符，用于使用[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)函数请求 Heikin-Ashi 数据。

此脚本请求 Heikin-Ashi 柱的收盘值并将它们绘制在正常蜡烛图的顶部：

![../_images/NonStandardCharts-TickerHeikinAshi-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/NonStandardCharts-TickerHeikinAshi-01.png)

```javascript
//@version=5
indicator("HA Close", "", true)
haTicker = ticker.heikinashi(syminfo.tickerid)
haClose = request.security(haTicker, timeframe.period, close)
plot(haClose, "HA Close", color.black, 3)
```

注意：

- 绘制为黑线的 Heikin-Ashi 柱的收盘价与使用市场价格的真实蜡烛的收盘价非常不同。它们的表现更像是移动平均线。
- 黑线出现在图表条上，因为我们从脚本的“更多”菜单中选择了“视觉顺序/置于前面”。

如果您想在上一个示例中省略延长时间的值，则需要首先创建一个没有延长会话信息的中间代码：

![../_images/NonStandardCharts-TickerHeikinAshi-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/NonStandardCharts-TickerHeikinAshi-02.png)

```javascript
//@version=5
indicator("HA Close", "", true)
regularSessionTicker = ticker.new(syminfo.prefix, syminfo.ticker, session.regular)
haTicker = ticker.heikinashi(regularSessionTicker)
haClose = request.security(haTicker, timeframe.period, close, gaps = barmerge.gaps_on)
plot(haClose, "HA Close", color.black, 3, plot.style_linebr)
```

注意：

- 我们首先使用[ticker.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}new)函数来创建一个没有扩展会话信息的股票代码。
- 我们在 [ticker.heikinashi()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}heikinashi)调用中使用该股票而不是[syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}tickerid)。
- 在[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)调用中，我们将`gaps`参数的值设置为`barmerge.gaps_on`。这指示函数不要使用以前的值来填充缺少数据的槽。这使得它可以 在常规会话之外返回[na值。](https://www.tradingview.com/pine-script-reference/v5/#var_na)
- 为了能够在图表上看到这一点，我们还需要使用特殊的样式，它会破坏[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)`plot.style_linebr`值上的绘图。

此脚本在图表下绘制 Heikin-Ashi 蜡烛图：

![../_images/NonStandardCharts-TickerHeikinAshi-03.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/NonStandardCharts-TickerHeikinAshi-03.png)

```javascript
//@version=5
indicator("Heikin-Ashi candles")
CANDLE_GREEN = #26A69A
CANDLE_RED   = #EF5350

haTicker = ticker.heikinashi(syminfo.tickerid)
[haO, haH, haL, haC] = request.security(haTicker, timeframe.period, [open, high, low, close])
candleColor = haC >= haO ? CANDLE_GREEN : CANDLE_RED
plotcandle(haO, haH, haL, haC, color = candleColor)
```

注意：

- 我们使用带有 [request.security()的](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)[元组](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-tupledeclarations) 通过同一调用获取四个值。
- 我们使用[plotcandle()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle) 来绘制蜡烛图。有关详细信息，请参阅[条形图绘制页面。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_plotting.html#pagebarplotting)

## [`ticker.renko()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id12)

*砖形*图仅绘制价格变动，而不考虑时间或交易量。它们看起来就像堆叠在相邻列中的砖块[[1\]](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#ticks)。仅当价格超过顶部或底部预定金额后才会绘制新砖。 ticker.renko [()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}renko) 函数创建一个股票代码 id，可与 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)一起使用 来获取砖形图值，但没有 Pine Script™ 函数可以在图表上绘制砖形图：

```javascript
//@version=5
indicator("", "", true)
renkoTicker = ticker.renko(syminfo.tickerid, "ATR", 10)
renkoLow = request.security(renkoTicker, timeframe.period, low)
plot(renkoLow)
```

## [`ticker.linebreak()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id13)

折线图表*类型*显示一系列基于价格变化的垂直框[[1\]](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#ticks)。 ticker.linebreak [()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}linebreak) 函数创建一个股票代码 id，可与 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)一起使用 来获取“换行符”值，但没有 Pine Script™ 函数可以在图表上绘制此类条形：

```javascript
//@version=5
indicator("", "", true)
lineBreakTicker = ticker.linebreak(syminfo.tickerid, 3)
lineBreakClose = request.security(lineBreakTicker, timeframe.period, close)
plot(lineBreakClose)
```

## [`ticker.kagi()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id14)

*卡吉*图由改变方向的连续线组成。当价格变化[[1\]](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#ticks) 超出预定金额时，方向就会发生变化。 ticker.kagi [()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}kagi) 函数创建一个股票代码 id，可与 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)一起使用 来获取“Kagi”值，但没有 Pine Script™ 函数可以在图表上绘制此类条形：

```javascript
//@version=5
indicator("", "", true)
kagiBreakTicker = ticker.linebreak(syminfo.tickerid, 3)
kagiBreakClose = request.security(kagiBreakTicker, timeframe.period, close)
plot(kagiBreakClose)
```

## [`ticker.pointfigure()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id15)

*点数图*(PnF) 图表仅绘制价格变动[[1\]](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#ticks)，而不考虑时间。当价格上涨时绘制 X 列，当价格下跌时绘制 O 列。 ticker.pointfigure [()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}pointfigure) 函数创建一个股票代码 id，可与 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)一起使用 来获取“PnF”值，但没有 Pine Script™ 函数可以在图表上绘制此类条形。每列 X 或 O 都由四个数字表示。您可以将它们视为合成的 OHLC PnF 值：

```javascript
//@version=5
indicator("", "", true)
pnfTicker = ticker.pointfigure(syminfo.tickerid, "hl", "ATR", 14, 3)
[pnfO, pnfC] = request.security(pnfTicker, timeframe.period, [open, close], barmerge.gaps_on)
plot(pnfO, "PnF Open", color.green, 4, plot.style_linebr)
plot(pnfC, "PnF Close", color.red, 4, plot.style_linebr)
```



**脚注**

 *[1]   ( [1](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id3) , [2](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id5) , [3](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id7) , [4](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#id9) )在 TradingView 上，Renko、Line Break、Kagi 和 PnF 图表类型是根据较低时间范围内的 OHLC 值生成的。因此，这些图表类型仅代表从报价数据生成时的近似值。* 
