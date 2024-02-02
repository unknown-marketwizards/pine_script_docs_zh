# 警报

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id5)

TradingView 警报在我们的服务器上 24x7 运行，不需要用户登录即可执行。警报是从图表用户界面 ( *UI* ) 创建的。您将在帮助中心的[关于 TradingView 警报](https://www.tradingview.com/support/solutions/43000520149)页面的图表 UI 中找到了解警报如何工作以及如何创建警报所需的所有信息。

TradingView 上提供的一些警报类型（*通用警报*、*绘图警报*和订单执行事件*脚本警报*）是根据图表上加载的交易品种或脚本创建的，不需要特定的编码。任何用户都可以从图表 UI 创建这些类型的警报。

其他类型的警报（在*alert()函数调用上触发的**脚本警报*和*alertcondition()警报*）需要脚本中存在特定的Pine Script™代码来创建*警报事件*，然后脚本用户可以使用图表UI从中创建警报。此外，虽然脚本用户可以在其图表上加载的任何策略的图表 UI 上创建触发*订单填写事件的**脚本警报*，但程序员可以在其脚本中为经纪商模拟器填写的每种订单类型指定显式订单填写警报消息。

本页介绍了 Pine Script™ 程序员编写脚本来创建警报事件的不同方式，脚本用户又可以通过图表 UI 创建警报。我们将涵盖：

- 如何使用[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)函数在指标或策略中*调用alert() 函数* ，然后将其包含在从图表UI 创建的*脚本警报中。*
- 如何添加自定义警报消息以包含在触发策略的*订单填充事件的**脚本警报*中。
- 如何使用[alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)函数仅在指标中生成*alertcondition() 事件*，然后可以使用该事件从图表UI创建*alertcondition() 警报。*

请记住：

- 任何与警报相关的 Pine Script™ 代码都无法在图表 UI 中创建正在运行的警报；它只是创建警报事件，然后脚本用户可以使用这些事件从图表 UI 创建运行警报。
- 警报仅在实时栏中触发。因此，处理任何类型警报的 Pine Script™ 代码的操作范围仅限于实时柱。
- 当在图表 UI 中创建警报时，TradingView 会保存脚本及其输入的镜像，以及图表的主要交易品种和时间范围，以在其服务器上运行警报。因此，对脚本输入或图表的后续更改不会影响之前根据它们创建的运行警报。如果您希望对上下文所做的任何更改反映在正在运行的警报的行为中，则需要删除该警报并在新上下文中创建一个新警报。

### [背景](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id6)

如今，Pine 程序员可以使用不同的方法在其脚本中创建警报事件，这些方法是在 Pine Script™ 发展过程中不断部署的增强功能的结果。 Alertcondition [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)函数仅适用于指标，是第一个允许 Pine Script™ 程序员创建警报事件的功能。然后是策略的订单填充警报，当经纪商模拟器创建*订单填充事件*时触发。 *订单执行事件*不需要脚本用户编写特殊代码来创建警报，但通过`alert_message`订单生成`strategy.*()`函数的参数，程序员可以通过为任意数量的订单定义不同的警报消息来自定义在*订单执行事件*上触发的警报消息。订单履行事件。

Alert [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert) 函数是 Pine Script™ 的最新添加功能。它或多或少取代了 [alertcondition() ，并且在策略中使用时，为](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)*订单执行事件*警报提供了有用的补充。

### [哪种类型的警报最好？](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id7)

对于 Pine Script™ 程序员来说，[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)函数通常使用起来更容易、更灵活。与[alertcondition()相反，它允许动态警报消息，适用于指标和策略，并且程序员决定](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)事件的频率 。

虽然可以在 Pine 中的任何可编程逻辑上生成[alert()调用，包括当订单](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)**发送**到策略中的经纪商模拟器时，但它们无法编码为在订单执行**（**或*成交*）时触发，因为在订单发送到经纪商模拟器之后，模拟器控制它们的执行，并且不会将填充事件直接报告回脚本。

当脚本用户想要生成有关策略订单执行事件的警报时，他必须在“创建警报”对话框中创建有关该策略的*脚本警报*时包含这些事件。用户无需在脚本中编写特殊代码即可执行此操作。然而，程序员可以通过`alert_message`在订单生成函数调用中使用参数来自定义与订单填写事件一起发送的消息`strategy.*()`。结合使用[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)`alert_message`调用和在订单生成调用中使用自定义 参数`strategy.*()`，程序员可以在脚本执行中发生的大多数情况下生成警报事件。

为了向后兼容， alertcondition [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)函数保留在 Pine Script™ 中，但它也可以有利地用于生成可在“创建警报”对话框的“条件”字段中作为单独项目选择的不同警报。

## [脚本警报](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id8)

当脚本用户使用“创建警报”对话框创建*脚本警报*时，能够触发警报的事件将根据警报是从指标还是策略创建而有所不同。

从**指标**创建的脚本*警报*将在以下情况下触发：

- 该指标包含[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用。
- 该代码的逻辑允许执行特定的[alert()调用。](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)
- [在alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用中指定的频率允许触发警报。

从**策略**创建的脚本*警报可以在**alert()函数调用*、*订单执行事件*或两者上触发。创建策略警报的脚本用户决定他希望在*脚本警报*中包含哪种类型的事件。虽然用户可以在*订单执行事件*上创建*脚本警报*，而不需要包含特殊代码的策略，但它必须包含[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用，以便用户在其*脚本警报*中包含 *alert() 函数调用*。

### [`alert()` 函数事件](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id9)

Alert [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)函数具有以下签名：

```
Pine Script™
Copiedalert(message, freq)
```

- `message`

  表示警报触发时发送的消息文本的“系列字符串”。因为此参数允许“系列”值，所以它可以在运行时生成，并且条形图与条形图不同，从而使其动态。

- `freq`

  指定警报触发频率的“输入字符串”。有效参数是：`alert.freq_once_per_bar`：只有每个实时栏的第一个调用才会触发警报（默认值）。`alert.freq_once_per_bar_close`：仅当实时栏关闭并且在该脚本迭代期间执行[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用时才会触发警报。`alert.freq_all`：实时栏内的所有来电都会触发警报。

Alert [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)函数可用于指标和策略。对于要 触发在[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)*函数调用*上配置的*脚本警报*的alert()调用，脚本的逻辑必须允许执行 [alert()调用，](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)**并且**参数确定的频率必须允许触发警报。`freq`

请注意，默认情况下，策略会在柱线收盘时重新计算，因此如果 在策略中使用 频率为或的[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)函数，则在柱线收盘时调用该函数的频率不会超过一次。为了使[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert) 函数能够在bar构建过程中被调用，您需要启用该选项。`alert.freq_all``alert.freq_once_per_bar``calc_on_every_tick`

#### [使用所有“alert()”调用](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id10)

让我们看一个检测 RSI 中心线交叉的示例：

```
Pine Script™
Copied//@version=5
indicator("All `alert()` calls")
r = ta.rsi(close, 20)

// Detect crosses.
xUp = ta.crossover( r, 50)
xDn = ta.crossunder(r, 50)
// Trigger an alert on crosses.
if xUp
    alert("Go long (RSI is " + str.tostring(r, "#.00)"))
else if xDn
    alert("Go short (RSI is " + str.tostring(r, "#.00)"))

plotchar(xUp, "Go Long",  "▲", location.bottom, color.lime, size = size.tiny)
plotchar(xDn, "Go Short", "▼", location.top,    color.red,  size = size.tiny)
hline(50)
plot(r)
```

如果从此脚本创建*脚本警报：*

- 当 RSI 向上穿过中心线时，*脚本警报*将触发，并显示“做多...”消息。当 RSI 向下穿过中心线时，*脚本警报*将触发，并显示“做空…”消息。
- [由于没有为alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)`freq`调用中的参数指定参数，因此将使用 默认值，因此警报仅在实时条期间第一次执行每个[alert()调用时触发。](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)`alert.freq_once_per_bar`
- 与警报一起发送的消息由两部分组成：一个常量字符串，然后是 [str.tostring()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}tostring)调用的结果，其中包括脚本执行[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用时的 RSI 值 。交叉上涨的警报消息如下所示：“做多（RSI 为 53.41）”。
- 由于*脚本警报*总是在调用[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)时触发，只要调用中使用的频率允许，该特定脚本不允许脚本用户将其*脚本警报*限制为仅长整型，例如。

注意：

- 与始终放置在第 0 列（在脚本的全局作用域中）的[alertcondition()调用相反， ](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用放置在[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)分支的本地作用域中，因此它仅在满足触发条件时才执行。如果将[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用放置在脚本全局范围的第0 列中，它将在所有柱上执行，这可能不是所需的行为。
- [由于使用了str.tostring()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}tostring)调用， alertcondition [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition) 无法接受与我们用于警报消息的相同字符串 。 [Alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)消息必须是常量字符串。

最后，因为[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)消息可以在运行时动态构造，所以我们可以使用以下代码来生成警报事件：

```
Pine Script™
Copied// Trigger an alert on crosses.
if xUp or xDn
    firstPart = (xUp ? "Go long" : "Go short") + " (RSI is "
    alert(firstPart + str.tostring(r, "#.00)"))
```

#### [使用选择性的“alert()”调用](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id11)

当用户在*alert()函数调用*上创建*脚本警报*时，只要满足其频率限制，该警报就会在脚本对 [alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)函数进行的任何调用时触发。如果您希望允许脚本的用户选择脚本中的哪个[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)函数调用将触发*脚本警报*，您将需要为他们提供在脚本输入中表明他们的偏好的方法，并在您的脚本中编写适当的逻辑。脚本。这样，脚本用户将能够从单个脚本创建多个*脚本警报*，每个脚本警报的行为根据在图表 UI 中创建警报之前在脚本输入中所做的选择而有所不同。

假设，对于我们的下一个示例，我们希望提供仅针对多头、仅空头或两者触发警报的选项。您可以像这样编写脚本：

```
Pine Script™
Copied//@version=5
indicator("Selective `alert()` calls")
detectLongsInput  = input.bool(true,  "Detect Longs")
detectShortsInput = input.bool(true,  "Detect Shorts")
repaintInput      = input.bool(false, "Allow Repainting")

r = ta.rsi(close, 20)
// Detect crosses.
xUp = ta.crossover( r, 50)
xDn = ta.crossunder(r, 50)
// Only generate entries when the trade's direction is allowed in inputs.
enterLong  = detectLongsInput  and xUp and (repaintInput or barstate.isconfirmed)
enterShort = detectShortsInput and xDn and (repaintInput or barstate.isconfirmed)
// Trigger the alerts only when the compound condition is met.
if enterLong
    alert("Go long (RSI is " + str.tostring(r, "#.00)"))
else if enterShort
    alert("Go short (RSI is " + str.tostring(r, "#.00)"))

plotchar(enterLong,  "Go Long",  "▲", location.bottom, color.lime, size = size.tiny)
plotchar(enterShort, "Go Short", "▼", location.top,    color.red,  size = size.tiny)
hline(50)
plot(r)
```

注意如何：

- 我们创建一个复合条件，仅当用户的选择允许朝该方向输入时才满足该条件。仅当脚本的输入中启用了长条目时，中心线交叉处的长条目才会触发警报。
- 我们让用户表明他的重画偏好。当他不允许重新绘制计算时，我们会等到柱形确认后触发复合条件。这样，警报和标记仅出现在实时栏的末尾。
- 如果该脚本的用户想要从此脚本创建两个不同的脚本警报，即一个仅在多头触发，一个仅在空头触发，那么他需要：
  - 在输入中仅选择“检测长整型”，并在脚本上创建第一个*脚本警报。*
  - 在输入中仅选择“检测短裤”，并在脚本上创建另一个*脚本警报。*

#### [在策略中](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id12)

[Alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert) 函数调用也可以在策略中使用，但默认情况下，策略仅在实时柱线[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)时执行。除非在[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) 声明语句中使用，否则所有[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用都将使用频率，无论使用什么参数。`calc_on_every_tick = true``alert.freq_once_per_bar_close``freq`

虽然策略上的*脚本警报*将使用*订单填写事件*在经纪商模拟器填写订单时触发警报，但 可以有利地使用[alert()来生成策略中的其他警报事件。](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)

当 RSI 连续三个柱线走势不利于交易时，此策略会创建*alert()函数调用：*

```
Pine Script™
Copied//@version=5
strategy("Strategy with selective `alert()` calls")
r = ta.rsi(close, 20)

// Detect crosses.
xUp = ta.crossover( r, 50)
xDn = ta.crossunder(r, 50)
// Place orders on crosses.
if xUp
    strategy.entry("Long", strategy.long)
else if xDn
    strategy.entry("Short", strategy.short)

// Trigger an alert when RSI diverges from our trade's direction.
divInLongTrade  = strategy.position_size > 0 and ta.falling(r, 3)
divInShortTrade = strategy.position_size < 0 and ta.rising( r, 3)
if divInLongTrade
    alert("WARNING: Falling RSI", alert.freq_once_per_bar_close)
if divInShortTrade
    alert("WARNING: Rising RSI", alert.freq_once_per_bar_close)

plotchar(xUp, "Go Long",  "▲", location.bottom, color.lime, size = size.tiny)
plotchar(xDn, "Go Short", "▼", location.top,    color.red,  size = size.tiny)
plotchar(divInLongTrade,  "WARNING: Falling RSI", "•", location.top,    color.red,  size = size.tiny)
plotchar(divInShortTrade, "WARNING: Rising RSI",  "•", location.bottom, color.lime, size = size.tiny)
hline(50)
plot(r)
```

如果用户从此策略创建*脚本警报，并在其警报中包含**订单成交事件*和*alert()函数调用*，则每当执行订单或脚本执行其中一个[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用时，警报就会触发在实时栏的结束迭代上，即，当 [barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isrealtime)和 [barstate.isconfirmed](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isconfirmed)都为 true 时。脚本中的alert *() 函数事件*只会在实时柱关闭时触发警报，因为是[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用中参数`alert.freq_once_per_bar_close` 所使用的参数。`freq`

### [订单填写事件](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id13)

当从指标创建*脚本警报时，它只能在调用**alert()函数时触发*。但是，当从策略创建*脚本警报时，用户可以指定**订单执行事件*也触发*脚本警报*。订单*填写事件*是由经纪模拟器生成的导致执行模拟订单的任何事件。它相当于由经纪商/交易所填写的交易订单。订单下达后不一定会被执行。在策略中，订单的执行只能在事后通过分析内置变量（例如 [strategy.opentrades](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}opentrades)或 [strategy.position_size）](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}position_size)的变化来间接检测。 因此，在*订单执行事件*上配置的*脚本警报*非常有用，因为它们允许在脚本逻辑检测到订单执行的精确时刻触发警报。

Pine Script™ 程序员可以自定义执行特定命令时发送的警报消息。虽然这不是*触发订单执行事件*的先决条件，但自定义警报消息可能很有用，因为它们允许将自定义语法包含在警报中，以便将实际订单路由到第三方执行引擎等。为特定*订单成交事件*指定自定义警报消息是通过`alert_message`可以生成订单的函数中的参数来完成的： [strategy.close()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close)、 [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)、 [strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)和 [strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)。

用于参数的参数`alert_message`是“系列字符串”，因此可以使用脚本可用的任何变量动态构造它，只要将其转换为字符串格式即可。

`alert_message`让我们看一下在 [策略.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)调用中使用参数的策略：

```
Pine Script™
Copied//@version=5
strategy("Strategy using `alert_message`")
r = ta.rsi(close, 20)

// Detect crosses.
xUp = ta.crossover( r, 50)
xDn = ta.crossunder(r, 50)
// Place order on crosses using a custom alert message for each.
if xUp
    strategy.entry("Long", strategy.long, stop = high, alert_message = "Stop-buy executed (stop was " + str.tostring(high) + ")")
else if xDn
    strategy.entry("Short", strategy.short, stop = low, alert_message = "Stop-sell executed (stop was " + str.tostring(low) + ")")

plotchar(xUp, "Go Long",  "▲", location.bottom, color.lime, size = size.tiny)
plotchar(xDn, "Go Short", "▼", location.top,    color.red,  size = size.tiny)
hline(50)
plot(r)
```

注意：

- `stop`我们在[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)调用中使用该参数，这会创建止损买入和止损卖出订单。这意味着只有当价格高于`high`下达订单的柱上的价格时，买入订单才会执行，只有当价格低于下达订单的柱上的最低价时，卖出订单才会执行。
- [我们用plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)绘制的向上/向下箭头是**在下**订单时绘制的。在订单实际执行之前，可能会经过任意数量的柱，并且在某些情况下，由于价格不满足所需条件，订单将永远不会被执行。
- 因为我们`id`对所有买单使用相同的参数，所以在满足前一个订单的条件之前下的任何新买单都将替换该订单。这同样适用于卖单。
- 参数中包含的变量`alert_message`在订单执行时（即警报触发时）进行评估。

当该`alert_message`参数用于策略的订单生成`strategy.*()`函数调用时，脚本用户在创建有关订单成交事件的脚本警报时，必须在*“**创建*`{{strategy.order.alert_message}}`警报”对话框的“消息”字段中包含占位符。这是必需的，因此订单生成函数调用中使用的参数将在每个*订单填写事件*触发的警报消息中使用。当仅在“消息”字段中使用占位符且该 参数仅出现在策略中的部分订单生成函数调用中时，空字符串将替换由任何订单生成函数调用触发的警报消息中的占位符不使用参数。`alert_message``strategy.*()``{{strategy.order.alert_message}}``alert_message``strategy.*()``strategy.*()``alert_message`

虽然用户可以在“创建警报”对话框的“消息”字段中使用其他占位符来创建有关*订单成交事件的*警报，但它们不能在 的参数中使用`alert_message`。

## [`alertcondition()` 事件](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id14)

Alertcondition [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)函数允许程序员在其指标中创建单独的*alertcondition 事件*。一个指示器可能包含多个[alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)调用。脚本中每次调用[alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition) 都会创建一个相应的警报，可在“创建警报”对话框的“条件”下拉菜单中进行选择。

**虽然策略**脚本中存在[alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)调用不会导致编译错误，但无法从中创建警报。

Alertcondition [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)函数具有以下签名：

```
Pine Script™
Copiedalertcondition(condition, title, message)
```

- `condition`

  一个“series bool”值（`true`或`false`），决定何时触发警报。这是一个必需的参数。当该值为 时，`true`警报将触发。当该值为 时，`false`警报将不会触发。与[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)函数调用相反， [alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)调用必须从一行的零列开始，因此不能放置在条件块中。

- `title`

  “常量字符串”可选参数，用于设置警报条件的名称，该名称将显示在图表 UI 中“创建警报”对话框的“条件”字段中。如果未提供参数，将使用“Alert”。

- `message`

  “const string”可选参数，指定警报触发时要显示的文本消息。该文本将出现在“创建警报”对话框的“消息”字段中，脚本用户可以在创建警报时对其进行修改。 **由于此参数必须是“const string”，因此必须在编译时已知，因此不能逐条变化。** 但是，它可以包含占位符，这些占位符将在运行时被动态值替换，动态值可能会更改条形。有关列表，请参阅本页的[占位符部分。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#placeholders)

Alertcondition [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)函数不包含 `freq`参数。*Alertcondition() 警报*的频率由用户在“创建警报”对话框中确定。

### [使用一个条件](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id15)

*以下是创建alertcondition()事件*的代码示例：

```
Pine Script™
Copied//@version=5
indicator("`alertcondition()` on single condition")
r = ta.rsi(close, 20)

xUp = ta.crossover( r, 50)
xDn = ta.crossunder(r, 50)

plot(r, "RSI")
hline(50)
plotchar(xUp, "Long",  "▲", location.bottom, color.lime, size = size.tiny)
plotchar(xDn, "Short", "▼", location.top,    color.red,  size = size.tiny)

alertcondition(xUp, "Long Alert",  "Go long")
alertcondition(xDn, "Short Alert", "Go short ")
```

因为我们的脚本中有两个[alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)调用，所以“创建警报”对话框的“条件”字段中将提供两个不同的警报：“长警报”和“短警报”。

如果我们想在交叉发生时包含 RSI 的值，我们不能像在[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)调用或策略中的参数中那样简单地`message`使用 将其值添加到字符串中。但是，我们可以使用占位符将其包含在内。这显示了两种选择：`str.tostring(r)``alert_message`

```
Pine Script™
Copiedalertcondition(xUp, "Long Alert",  "Go long. RSI is {{plot_0}}")
alertcondition(xDn, "Short Alert", 'Go short. RSI is {{plot("RSI")}}')
```

注意：

- 第一行使用`{{plot_0}}`占位符，其中绘图编号对应于脚本中绘图的顺序。
- 第二行使用`{{plot("[plot_title]")}}`占位符类型，其中必须包含脚本`title`中用于绘制 RSI 的[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)调用。双引号用于将绘图标题括在`{{plot("RSI")}}`占位符内。这就要求我们使用单引号来包裹`message`字符串。
- 使用其中一种方法，我们可以包含指标绘制的任何数值，但由于无法绘制字符串，因此无法使用字符串变量。

### [使用复合条件](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id16)

[如果我们想为脚本用户提供使用多个alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)调用从指标创建单个警报的可能性 ，我们需要在脚本的输入中提供选项，用户可以通过这些选项在创建警报之前指示他们想要触发警报的条件。

该脚本演示了一种方法：

```
Pine Script™
Copied//@version=5
indicator("`alertcondition()` on multiple conditions")
detectLongsInput  = input.bool(true, "Detect Longs")
detectShortsInput = input.bool(true, "Detect Shorts")

r = ta.rsi(close, 20)
// Detect crosses.
xUp = ta.crossover( r, 50)
xDn = ta.crossunder(r, 50)
// Only generate entries when the trade's direction is allowed in inputs.
enterLong  = detectLongsInput  and xUp
enterShort = detectShortsInput and xDn

plot(r)
plotchar(enterLong,  "Go Long",  "▲", location.bottom, color.lime, size = size.tiny)
plotchar(enterShort, "Go Short", "▼", location.top,    color.red,  size = size.tiny)
hline(50)
// Trigger the alert when one of the conditions is met.
alertcondition(enterLong or enterShort, "Compound alert", "Entry")
```

请注意如何允许在两个条件之一上触发[alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)调用。仅当用户在创建警报之前在脚本输入中启用每个条件时，才能触发警报。

### [占位符](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id17)

[这些占位符可以在alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)`message`调用的参数中使用。当警报触发时，它们将被动态值替换。它们是在[alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)消息中包含动态值（可以逐条变化的值）的唯一方法 。

请注意，从图表 UI 中的“创建警报”对话框创建*alertcondition() 警报*的用户也可以在对话框的“消息”字段中使用这些占位符。

- `{{exchange}}`

  警报中使用的交易代码（NASDAQ、NYSE、MOEX 等）。请注意，对于延迟符号，交换将以“_DL”或“_DLY”结束。例如，“NYMEX_DL”。

- `{{interval}}`

  返回创建警报的图表的时间范围。请注意，范围图表是根据 1m 数据计算的，因此在范围图表上创建的任何警报上，占位符将始终返回“1”。

- `{{open}}`, `{{high}}`, `{{low}}`, `{{close}}`,`{{volume}}`

  触发警报的柱的相应值。

- `{{plot_0}}`、、`{{plot_1}}`[…]、`{{plot_19}}`

  相应地块编号的值。绘图按照脚本中出现的顺序从 0 到 19 编号，因此只能使用前 20 个绘图中的一个。例如，内置的“成交量”指标有两个输出系列：成交量和成交量 MA，因此您可以使用以下内容：

```
Pine Script™
Copiedalertcondition(volume > ta.sma(volume,20), "Volume alert", "Volume ({{plot_0}}) > average ({{plot_1}})")
```

- `{{plot("[plot_title]")}}`

  当需要使用[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)`title`调用中使用的参数 来引用绘图时，可以使用此占位符。请注意，占位符内**必须**使用双引号 ( )来包裹参数。这需要使用单引号 ( ) 来包裹字符串：`"``title``'``message`

```
Pine Script™
Copied//@version=5
indicator("")
r = ta.rsi(close, 14)
xUp = ta.crossover(r, 50)
plot(r, "RSI", display = display.none)
alertcondition(xUp, "xUp alert", message = 'RSI is bullish at: {{plot("RSI")}}')
```

- `{{ticker}}`

  警报中使用的交易品种代码（AAPL、BTCUSD 等）。

- `{{time}}`

  返回小节开头的时间。时间为 UTC，格式为`yyyy-MM-ddTHH:mm:ssZ`，例如：`2019-08-27T09:56:00Z`。

- `{{timenow}}`

  警报触发的当前时间，格式与 相同`{{time}}`。无论图表的时间范围如何，精度都精确到秒。

## [避免使用警报重新绘制](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#id18)

重绘交易者希望通过警报避免的最常见情况是，他们必须防止在实时柱期间的某个点触发警报，而该警报在收盘时**不会**触发。当满足以下条件时就会发生这种情况：

- 触发警报的条件中使用的计算在实时条期间可能会有所不同。例如，任何使用`high`、`low`或 的计算都会出现这种情况`close`，其中包括几乎所有内置指标。当较高时间范围的当前柱尚未关闭时，使用比图表更高时间范围的任何[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)调用的结果也会出现这种情况。
- 警报可以在实时柱收盘之前触发，因此可以使用除“每柱收盘一次”之外的任何频率。

避免此类重画的最简单方法是配置警报的触发频率，以便它们仅在实时柱收盘时触发。没有灵丹妙药；避免这种类型的重画**总是**需要等待确认的信息，这意味着交易者必须牺牲即时性来获得可靠性。

请注意，其他类型的重画（例如我们的[重画](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#pagerepainting)部分中记录的重画）可能无法通过简单地在实时柱收盘时触发警报来预防。