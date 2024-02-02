# 重画

# [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id1)

我们将重绘定义为：**导致历史与实时计算或绘图表现不同的脚本行为**。

重新喷漆行为非常普遍，并且有多种因素可能导致这种行为。根据我们的定义，我们估计超过 95% 的现有指标都表现出某种形式的重绘行为。例如，MACD 和 RSI 等常用指标在历史柱上显示已确认的值，但会在实时、未经确认的图表柱上波动，直至收盘。因此，它们在历史状态和实时状态下的行为*有所不同*。

**并非所有重画行为本质上都是无用或具有误导性的**，此类行为也不会阻止知识渊博的交易者使用具有此类行为的指标。例如，谁会仅仅因为交易量剖面指标更新实时柱上的值而认为它不可信？

人们可能会在他们使用的脚本中遇到以下任何形式的重画，具体取决于脚本的计算所涉及的内容：

- **广泛但通常可以接受**：脚本可以使用随未确认柱上的实时价格变化而更新的值。例如，如果在打开的图表柱上执行的计算中使用[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)变量，则其值将反映柱中的最新价格。然而，一旦柱线关闭，脚本只会向其历史系列提交新的数据点。另一种常见情况是使用 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)获取实时柱上较高时间范围的数据，如[其他时间范围和数据](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata)页面 的[历史和实时行为](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata-historicalandrealtimebehavior)部分中所述。与图表时间范围内的未确认图表条一样，[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)可以跟踪实时条上较高时间范围上下文中的未确认值，这可能导致脚本重新开始执行后重新绘制。只要您了解它们的工作原理，使用此类脚本通常不会有任何问题。然而，当选择使用此类脚本来发出警报或交易订单时，重要的是要了解它们的实时行为和历史行为之间的差异，并自行决定它是否可以满足您的需求。
- **可能具有误导性**：将值绘制到过去、在实时柱上计算无法在历史柱上复制的结果或重新定位过去事件的脚本可能会产生误导。例如，Ichimoku、大多数基于枢轴的脚本、大多数使用的策略 、使用[request.security() 的](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)脚本 （当它在实时柱上表现不同时）、许多使用[varip 的](https://www.tradingview.com/pine-script-reference/v5/#kw_varip)脚本、许多使用[timenow 的](https://www.tradingview.com/pine-script-reference/v5/#var_timenow)脚本以及一些使用 变量的脚本可能会出现误导性的重画行为。`calc_on_every_tick = true``barstate.*`
- **不可接受**：将未来信息泄漏到过去的脚本、在[非标准图表](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Non-standard_charts_data.html#pagenonstandardchartsdata)上执行的策略以及使用实时柱内图生成警报或订单的脚本，都是可能产生严重误导性重画行为的示例。
- **不可避免的**：来自提供商的数据馈送的修订以及图表历史记录起始栏的变化可能会导致脚本中不可避免的重画行为。

如果满足以下条件，前两种类型的重新绘制是完全可以接受的：

1. 您了解该行为。
2. 你可以忍受它，或者
3. 你可以绕过它。

现在应该清楚的是，并非**所有**重画行为都是错误的，需要不惜一切代价避免。在许多情况下，某些形式的重画可能正是脚本所需要的。重要的是要知道什么时候重画行为不能**满足**一个人的需要。为了避免不可接受的重新绘制，了解工具的工作原理或应该如何设计您构建的工具非常重要。如果您[发布](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#pagepublishing)脚本，请确保在出版物的描述中提及任何潜在的误导行为以及脚本的其他限制。

笔记

我们不会讨论在非标准图表上使用策略的危险，因为这个问题与重新绘制无关。请参阅[非标准图表上的回测：小心！](https://www.tradingview.com/script/q9laJNG9-Backtesting-on-Non-Standard-Charts-Caution-PineCoders-FAQ/) 讨论该主题的脚本。

### [对于脚本用户](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id2)

如果人们了解该行为以及该行为是否满足其分析要求，则可以决定使用重绘指标。不要成为那些在已发表的剧本上“重画”句子以试图抹黑它们的新人之一，因为这样做暴露了对该主题缺乏基础知识。

考虑到脚本中存在完全可以接受的某些形式的重绘行为，简单地询问脚本是否重绘是相对没有意义的。因此，这样的问题不会产生有意义的答案。人们应该询问有关脚本潜在重画行为的*具体问题，例如：*

- 脚本在历史柱和实时柱上的计算/显示方式是否相同？
- 脚本中的警报是否会等待实时条结束后再触发？
- 脚本显示的信号标记是否会等待实时条的末尾才显示？
- 脚本是否将值绘制/绘制到过去？
- 策略使用吗？`calc_on_every_tick = true`
- 脚本的[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)调用是否会将未来的信息泄漏到历史柱上的过去？

重要的是您了解您使用的工具如何工作，以及它们的行为是否与您的目标兼容，无论是否重新绘制。如果您阅读本页，您将会了解到，重新绘制是一件复杂的事情。它有很多面孔和很多原因。即使您不使用 Pine Script™ 进行编程，此页面也将帮助您了解可能导致重新绘制的一系列原因，并希望能够与脚本作者进行更有意义的讨论。

### [对于 Pine Script™ 程序员](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id3)

如上所述，并非所有形式的重画行为都必须不惜一切代价避免，也并非所有潜在的重画行为都一定可以避免。我们希望本页面可以帮助您更好地了解正在发生的动态，以便您可以在设计交易工具时考虑到这些行为。此页面的内容应帮助您了解会产生误导性重画结果的常见编码错误。

无论您的设计决策是什么，如果您[发布](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#pagepublishing)脚本，请向交易者解释该脚本，以便他们了解其行为方式。

本页涵盖了重画原因的三大类：

- [历史与实时计算](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#pagerepainting-historicalvsrealtimecalculations)
- [过去的情节](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#pagerepainting-plottinginthepast)
- [数据集变化](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#pagerepainting-datasetvariations)



## [历史与实时计算](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id4)



### [流体数据值](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id5)

历史数据不包括金条中间价格变动的记录；仅 [开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open)、 [最高价](https://www.tradingview.com/pine-script-reference/v5/#var_high)、 [最低价](https://www.tradingview.com/pine-script-reference/v5/#var_low)和 [收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价 (OHLC)。

然而，在实时柱（工具市场开盘时运行的柱）上， [最高](https://www.tradingview.com/pine-script-reference/v5/#var_high)价、 [最低价](https://www.tradingview.com/pine-script-reference/v5/#var_low)和 [收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价不是固定的；在实时柱关闭且其 HLC 值固定之前，它们可以多次更改值。它们是*流动的*。这导致脚本有时对历史数据和实时数据的工作方式不同，其中只有开盘价[在](https://www.tradingview.com/pine-script-reference/v5/#var_open)柱期间不会改变。

[任何实时使用最高价](https://www.tradingview.com/pine-script-reference/v5/#var_high)、 [最低价](https://www.tradingview.com/pine-script-reference/v5/#var_low)和 [收盘价](https://www.tradingview.com/pine-script-reference/v5/#var_close)等值的脚本 都会产生可能无法在历史柱上重复的计算 — 因此需要重新绘制。

让我们看一下这个简单的脚本。它检测 [EMA之上和之下的](https://www.tradingview.com/support/solutions/43000592270)[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价（在实时柱中，这对应于工具的当前价格）的交叉：

![../_images/Repainting-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Repainting-01.png)

```
Pine Script™
Copied//@version=5
indicator("Repainting", "", true)
ma = ta.ema(close, 5)
xUp = ta.crossover(close, ma)
xDn = ta.crossunder(close, ma)
plot(ma, "MA", color.black, 2)
bgcolor(xUp ? color.new(color.lime, 80) : xDn ? color.new(color.fuchsia, 80) : na)
```

- 注意：

  该脚本使用[bgcolor()在](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor)[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close) 价穿过 EMA 时将背景着色为绿色，在 EMA 下方交叉时将背景着色为红色。屏幕快照在 30 秒图表上实时显示脚本。已检测到 EMA 交叉，因此实时柱的背景为绿色。这里的问题是，没有任何东西可以保证这个条件在实时条结束之前一直成立。箭头指向的计时器显示实时栏中还剩 21 秒，在此之前任何事情都可能发生。我们正在见证一个重新绘制的脚本。

为了防止这种重新绘制，我们必须重写脚本，使其不使用实时柱期间波动的值。这将需要使用已过去的柱（通常是前一个柱）的值，或开盘价[，](https://www.tradingview.com/pine-script-reference/v5/#var_open) 这些值不会实时变化。

我们可以通过多种方式实现这一目标。此方法 为我们的交叉检测添加了一个条件，这要求脚本在柱的最后一次迭代（即收盘价和价格确认时）执行。这是避免重画的简单方法：`and barstate.isconfirmed`

```
Pine Script™
Copied//@version=5
indicator("Repainting", "", true)
ma = ta.ema(close, 5)
xUp = ta.crossover(close, ma) and barstate.isconfirmed
xDn = ta.crossunder(close, ma) and barstate.isconfirmed
plot(ma, "MA", color.black, 2)
bgcolor(xUp ? color.new(color.lime, 80) : xDn ? color.new(color.fuchsia, 80) : na)
```

这使用在前一柱上检测到的交叉：

```
Pine Script™
Copied//@version=5
indicator("Repainting", "", true)
ma = ta.ema(close, 5)
xUp = ta.crossover(close, ma)[1]
xDn = ta.crossunder(close, ma)[1]
plot(ma, "MA", color.black, 2)
bgcolor(xUp ? color.new(color.lime, 80) : xDn ? color.new(color.fuchsia, 80) : na)
```

这仅使用确认的[收盘价](https://www.tradingview.com/pine-script-reference/v5/#var_close) 和 EMA 值进行计算：

```
Pine Script™
Copied//@version=5
indicator("Repainting", "", true)
ma = ta.ema(close[1], 5)
xUp = ta.crossover(close[1], ma)
xDn = ta.crossunder(close[1], ma)
plot(ma, "MA", color.black, 2)
bgcolor(xUp ? color.new(color.lime, 80) : xDn ? color.new(color.fuchsia, 80) : na)
```

这会检测实时柱的[开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open) 与前一柱的 EMA 值之间的交叉。请注意，EMA 是使用 [close](https://www.tradingview.com/pine-script-reference/v5/#var_close)计算的，因此它会重新绘制。我们必须确保使用确认值来检测交叉，因此`ma[1]` 在交叉检测逻辑中：

```
Pine Script™
Copied//@version=5
indicator("Repainting", "", true)
ma = ta.ema(close, 5)
xUp = ta.crossover(open, ma[1])
xDn = ta.crossunder(open, ma[1])
plot(ma, "MA", color.black, 2)
bgcolor(xUp ? color.new(color.lime, 80) : xDn ? color.new(color.fuchsia, 80) : na)
```

**所有这些方法都有一个共同点：虽然它们阻止重绘，但它们也会晚于重绘脚本触发信号。如果想避免重新粉刷，这是不可避免的妥协。你不能鱼与熊掌兼得。**



### [重新绘制 `request.security()` 调用](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id6)

request.security [()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security) 函数在历史柱和实时柱上的行为不同。在历史柱上，它仅从其请求的上下文中返回 *已确认的*值，而在实时柱上，它可以返回*未确认的*值。当脚本重新开始执行时，具有实时状态的柱形图将变为历史柱形图，因此将仅包含它在这些柱形图上确认的值。如果[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)返回的值 在没有上下文确认的情况下在实时柱上波动，脚本将在重新启动执行时重新绘制它们。有关详细说明，请参阅[其他时间范围和数据](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata)页面 的[历史和实时行为部分。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata-historicalandrealtimebehavior)

[通过使用历史引用运算符[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[])`expression`将参数偏移至少一根柱 ，并使用 [barmerge.lookahead_on](https://www.tradingview.com/pine-script-reference/v5/#var_barmerge.lookahead_on)作为 请求中的参数，可以确保较高时间范围的数据请求仅返回所有柱上的确认值，而不管柱状态如何[。 security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security) 调用，如此处[所述](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata-historicalandrealtimebehavior-avoidingrepainting-highertimeframedata)。`lookahead`

下面的脚本演示了重绘和非重绘 HTF 数据请求之间的区别。它包含两个[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security)调用。第一个函数调用请求来自 的[关闭](https://www.tradingview.com/pine-script-reference/v5/#var_close)数据而 无需额外指定，第二个函数调用请求具有偏移量和[barmerge.lookahead_on](https://www.tradingview.com/pine-script-reference/v5/#var_barmerge.lookahead_on)`higherTimeframe`的相同系列。

正如我们在所有[实时](https://www.tradingview.com/pine-script-reference/v5/#var_barstate.isrealtime)柱（具有橙色背景的柱）上看到的，`repaintingClose`包含未经 确认而波动的值，这意味着当脚本重新启动其执行时`higherTimeframe`它将*重新绘制*。另一方面`nonRepaintingClose`，在实时和历史柱上的行为相同，即，它仅在新的、已确认的数据可用时更改其值：

![../_images/Repainting-Repainting-request-security-calls-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Repainting-Repainting-request-security-calls-1.png)

```
Pine Script™
Copied//@version=5
indicator("Repainting vs non-repainting `request.security()` demo", overlay = true)

//@variable The timeframe to request data from.
string higherTimeframe = input.timeframe("30", "Timeframe")

if timeframe.in_seconds() > timeframe.in_seconds(higherTimeframe)
    runtime.error("The 'Timeframe' input is smaller than the chart's timeframe. Choose a higher timeframe.")

//@variable The current `close` requested from the `higherTimeframe`. Fluctuates without confirmation on realtime bars.
float repaintingClose = request.security(syminfo.tickerid, higherTimeframe, close)
//@variable The last confirmed `close` requested from the `higherTimeframe`.
// Behaves the same on historical and realtime bars.
float nonRepaintingClose = request.security(
     syminfo.tickerid, higherTimeframe, close[1], lookahead = barmerge.lookahead_on
 )

// Plot the values.
plot(repaintingClose, "Repainting close", color.new(color.purple, 50), 8)
plot(nonRepaintingClose, "Non-repainting close", color.teal, 3)
// Plot a shape when a new `higherTimeframe` starts.
plotshape(timeframe.change(higherTimeframe), "Timeframe change marker", shape.square, location.top, size = size.small)
// Color the background on realtime bars.
bgcolor(barstate.isrealtime ? color.new(color.orange, 60) : na, title = "Realtime bar highlight")
```

- 注意：

  当[.](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape) _ [_](https://www.tradingview.com/pine-script-reference/v5/#fun_timeframe.change) _ `higherTimeframe`_如果 低于图表的时间范围，此脚本会产生[运行时错误。](https://www.tradingview.com/pine-script-reference/v5/#fun_runtime.error)`higherTimeframe`在历史柱上， 和在每个时间范围*结束*`repaintingClose`时都有一个新值，并且在每个时间范围*开始*时都有一个新值。`nonRepaintingClose`

为了便于重用，下面是一个简单的`noRepaintSecurity()`函数，可以在脚本中应用该函数来请求非重绘更高的时间范围值：

```
Pine Script™
Copied//@function Requests non-repainting `expression` values from the context of the `symbol` and `timeframe`.
noRepaintSecurity(symbol, timeframe, expression) =>
    request.security(symbol, timeframe, expression[1], lookahead = barmerge.lookahead_on)
```

- 注意：

  系列的偏移`[1]`量和 的使用是相互依赖的。在不损害功能完整性的情况下**无法**删除其中一个。`lookahead = barmerge.lookahead_on`与普通的[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security) 调用不同，此包装函数不能接受元组`expression`参数。对于多元素用例，可以传递 [用户定义的类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)，其字段包含要请求的所需元素。



### [在较低的时间范围内使用 `request.security()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id7)

某些脚本使用[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security) 来请求**低于**图表时间范围的数据。当专门设计用于处理较低时间范围内的柱线的函数在时间范围内发送时，这会很有用。当这种类型的用户定义函数需要检测柱内的第一个柱时（大多数情况都是如此），该技术将仅适用于历史柱。这是因为实时内部条尚未排序。其影响是此类脚本无法实时重现其在历史柱上的行为。例如，任何生成警报的逻辑都会有缺陷，并且需要不断刷新才能将经过的实时柱重新计算为历史柱。

当在低于图表的时间范围使用时，没有能够区分内部柱的专门函数， [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)将仅返回图表柱扩张中**最后** 一个内部柱的值，这通常没有用，也不会重现实时，因此导致重新绘制。

[出于所有这些原因，除非您了解在低于图表的时间范围内使用request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)的微妙之处 ，否则最好避免在这些时间范围内使用该函数。更高质量的脚本将具有检测此类异常的逻辑，并防止显示在使用较低时间范围时无效的结果。

对于更可靠的较低时间范围数据请求，请使用 [request.security_lower_tf()](https://www.tradingview.com/pine-script-reference/v5/#fun_request.security_lower_tf)，如[其他时间范围和数据页面的](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata)[本](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata-historicalandrealtimebehavior-avoidingrepainting-lowertimeframedata) 节中所述。



### [未来通过 `request.security()` 进行泄漏](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id8)

当[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security) 与 一起使用来获取价格而不用 抵消系列时，它将返回历史柱上的未来数据，这是危险的误导。`lookahead = barmerge.lookahead_on``[1]`

虽然历史柱会神奇地在知道未来价格之前显示它们，但实时预测是不可能的，因为未来是未知的，而它应该是未知的，所以不存在未来柱。

这是一个例子：

![../_images/Repainting-FutureLeakWithRequestSecurity-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Repainting-FutureLeakWithRequestSecurity-01.png)

```
Pine Script™
Copied// FUTURE LEAK! DO NOT USE!
//@version=5
indicator("Future leak", "", true)
futureHigh = request.security(syminfo.tickerid, "1D", high, lookahead = barmerge.lookahead_on)
plot(futureHigh)
```

请注意较高的时间范围线如何显示时间范围 发生之前的[高值。避免这种影响的解决方案是使用](https://www.tradingview.com/pine-script-reference/v5/#var_high)[本节](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#pagerepainting-historicalvsrealtimecalculations-repaintingrequestsecuritycalls)中演示的函数 。

脚本出版物中不允许使用前瞻来产生误导性结果，如[其他时间范围和数据页面的](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata)[前瞻](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Other_timeframes_and_data.html#pageothertimeframesanddata-commoncharacteristics-lookahead)部分 中所述。使用这种误导性技术的脚本出版物**将受到审核**。



### [`瓦里普](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id9)

[使用变量的varip](https://www.tradingview.com/pine-script-reference/v5/#op_varip)声明模式的脚本（请参阅有关[varip 的](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-varip) 部分了解更多信息）跨实时更新保存信息，这些信息无法在仅可用 OHLC 信息的历史柱上重现。此类脚本可能在实时中很有用，包括生成警报，但它们的逻辑无法进行回溯测试，它们在历史柱上的图也不能反映将实时完成的计算。



### [条形状态内置](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id10)

[使用条形状态的](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#pagebarstates)脚本可能会也可能不会重新绘制。正如我们在上一节中看到的，使用[barstate.isconfirmed](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isconfirmed) 实际上是**避免**重绘的一种方法，重绘**会**在历史柱上重现，而历史柱总是“已确认”。但是，使用其他栏状态（例如[barstate.isnew](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isnew)）将导致重新绘制。原因是，在历史柱上， [barstate.isnew](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isnew)位于`true`柱的收盘 [价](https://www.tradingview.com/pine-script-reference/v5/#var_close)处，但在实时中，它位于`true`柱的 [开盘价](https://www.tradingview.com/pine-script-reference/v5/#open)上。使用其他柱状态变量通常会导致历史柱和实时柱之间出现某种类型的行为差异。



### [`现在时间](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id11)

内置的[timenow](https://www.tradingview.com/pine-script-reference/v5/#var_timenow)返回当前时间。使用此变量的脚本无法显示一致的历史和实时行为，因此它们必须重新绘制。



### [策略](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id12)

策略在每次实时更新时执行，而策略则在历史柱[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)时运行 。它们很可能不会生成相同的顺序执行，因此需要重新绘制。请注意，发生这种情况时，回测结果也会失效，因为它们不能实时代表策略的行为。`calc_on_every_tick = true`



## [过去的绘图](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id13)

在 5 个柱过去后检测枢轴的脚本通常会回到过去，以在过去 5 个柱的实际枢轴上绘制枢轴水平或值。这通常会导致毫无戒心的交易者查看历史柱上的图来推断，当枢轴实时发生时，相同的图将出现在枢轴发生时，而不是检测到时。

让我们看一个显示高枢轴价格的脚本，该脚本将价格置于过去（检测到枢轴后 5 个柱）：

```
Pine Script™
Copied//@version=5
indicator("Plotting in the past", "", true)
pHi = ta.pivothigh(5, 5)
if not na(pHi)
    label.new(bar_index[5], na, str.tostring(pHi, format.mintick) + "\n🠇", yloc = yloc.abovebar, style = label.style_none, textcolor = color.black, size = size.normal)
```

![../_images/Repainting-PlottingInThePast-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Repainting-PlottingInThePast-01.png)

注意：

- 此脚本会重新绘制，因为如果未显示价格的已过去实时柱被识别为枢轴（在实际枢轴发生后 5 个柱），则可能会在其上放置价格。
- 显示看起来很棒，但可能会产生误导。

为其他人开发脚本时解决此问题的最佳解决方案是默认情况下**不带**偏移量地进行绘图，但为脚本用户提供过去通过输入打开绘图的选项，因此他们必须知道脚本正在做什么，例如:

```
Pine Script™
Copied//@version=5
indicator("Plotting in the past", "", true)
plotInThePast = input(false, "Plot in the past")
pHi = ta.pivothigh(5, 5)
if not na(pHi)
    label.new(bar_index[plotInThePast ? 5 : 0], na, str.tostring(pHi, format.mintick) + "\n🠇", yloc = yloc.abovebar, style = label.style_none, textcolor = color.black, size = size.normal)
```



## [数据集变化](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id14)



### [起点](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id15)

脚本开始在图表的第一个历史柱上执行，然后按顺序在每个柱上执行，如本手册有关 Pine Script™ 执行[模型的](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)页面中所述。如果第一个柱发生变化，则脚本通常不会像数据集在不同时间点开始时那样进行计算。

以下因素会影响您在图表上看到的柱形数量及其*起点*：

- 您持有的账户类型
- 数据供应商提供的历史数据
- 数据集的对齐要求，决定了其*起点*

这些是特定于账户的酒吧限制：

- 高级计划有 20000 个历史柱。
- Pro 和 Pro+ 计划的 10000 个历史柱。
- 其他计划的 5000 个历史酒吧。

起点是使用以下规则确定的，这些规则取决于图表的时间范围：

- **1、5、10、15、30 秒**：与一天的开始对齐。
- **1 - 14 分钟**：与一周的开始对齐。
- **15 - 29 分钟**：与月初对齐。
- **30 - 1439 分钟**：与年初对齐。
- **1440 分钟及以上**：与第一个可用历史数据点对齐。

随着时间的推移，这些因素会导致图表的历史记录在不同的时间点开始。这通常会对您的脚本计算产生影响，因为早期柱中计算结果的变化可能会波及数据集中的所有其他柱。例如，使用[ta.valuewhen()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}valuewhen)、 [ta.barssince()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}barssince)或 [ta.ema()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}ema)等函数将产生随早期历史而变化的结果。



### [历史数据的修改](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#id16)

历史和实时柱是使用交易所/经纪商提供的两种不同的数据源构建的：历史数据和实时数据。当实时金条过去时，交易所/经纪商有时会对金条价格进行通常较小的调整，然后将其写入其历史数据。当刷新图表或在那些已过去的实时柱上重新执行脚本时，将使用历史数据构建和计算它们，其中将包含那些通常较小的价格修正（如果有）。

历史数据也可能因其他原因而被修改，例如股票分割。