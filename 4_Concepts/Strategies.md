# 策略

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id1)

Pine Script™ 策略根据历史和实时数据模拟交易的执行，以促进交易系统的回溯测试和前向测试。它们包含许多与 Pine Script™ 指标相同的功能，同时提供下达、修改和取消假设订单以及分析结果的能力。

当脚本使用 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) 函数进行声明时，它可以访问`strategy.*`命名空间，在其中可以调用函数和变量来模拟订单并访问基本策略信息。此外，该脚本将在“策略测试器”选项卡中向外部显示信息和模拟结果。



## [一个简单的策略示例](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id2)

以下脚本是一个简单的策略，模拟在两条移动平均线交叉时建立多头或空头头寸：

```javascript
//@version=5
strategy("test", overlay = true)

// Calculate two moving averages with different lengths.
float fastMA = ta.sma(close, 14)
float slowMA = ta.sma(close, 28)

// Enter a long position when `fastMA` crosses over `slowMA`.
if ta.crossover(fastMA, slowMA)
    strategy.entry("buy", strategy.long)

// Enter a short position when `fastMA` crosses under `slowMA`.
if ta.crossunder(fastMA, slowMA)
    strategy.entry("sell", strategy.short)

// Plot the moving averages.
plot(fastMA, "Fast MA", color.aqua)
plot(slowMA, "Slow MA", color.orange)
```

- 注意：

  该行声明该脚本是一个名为“test”的策略，其视觉输出覆盖在主图表窗格上。`strategy("test" overlay = true)`[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry) 是脚本用来模拟“买入”和“卖出”订单的命令。当脚本下订单时，它还会`id`在图表上绘制订单并用箭头指示方向。两个[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)函数用两种不同的颜色绘制移动平均值以供视觉参考。



## [将策略应用于图表](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id3)

要测试策略，请将其应用于图表。您可以使用“指标和策略”对话框中的内置策略，也可以在 Pine 编辑器中编写自己的策略。单击“Pine Editor”选项卡中的“添加到图表”，将脚本应用到图表：

![../_images/Strategies-将策略应用于-a-chart-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Applying-a-strategy-to-a-chart-1.png)

策略脚本编译并应用于图表后，它将在主图表窗格上绘制订单标记，并在下面的“策略测试器”选项卡中显示模拟性能结果：

![../_images/Strategies-将策略应用于-a-chart-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Applying-a-strategy-to-a-chart-2.png)

笔记

默认情况下，应用于非标准图表（[Heikin Ashi](https://www.tradingview.com/support/solutions/43000619436)、 [Renko](https://www.tradingview.com/support/solutions/43000502284)、 [Line Break](https://www.tradingview.com/support/solutions/43000502273)、 [Kagi](https://www.tradingview.com/support/solutions/43000502272)、 [Point & Figure](https://www.tradingview.com/support/solutions/43000502276)和[Range](https://www.tradingview.com/support/solutions/43000474007)）的策略结果并不反映实际市场状况。策略脚本将在模拟过程中使用这些图表中的合成价格值，这些值通常与实际市场价格不一致，从而产生不切实际的回测结果。因此，我们强烈建议使用标准图表类型进行回测策略。或者，在 Heikin Ashi 图表上，用户可以通过启用“[策略”属性](https://www.tradingview.com/support/solutions/43000628599)中的“使用标准 OHLC 执行订单”选项，使用实际价格模拟订单 。



## [策略测试器](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id4)

策略测试器模块可用于使用 [策略（）](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) 函数声明的所有脚本。用户可以从图表下方的“策略测试器”选项卡访问此模块，在这里他们可以方便地可视化他们的策略并分析假设的绩效结果。



### [概述](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id5)

[策略测试器的“概述”](https://www.tradingview.com/support/solutions/43000681733)选项卡显示了模拟交易序列的基本绩效指标以及净值和回撤曲线，可以快速查看策略绩效，而无需深入了解具体细节。本节中的图表将策略的[净值曲线](https://www.tradingview.com/support/solutions/43000681735)显示 为以初始值为中心的基线图， [买入并持有净值曲线显示](https://www.tradingview.com/support/solutions/43000681736)为折线图，[回撤曲线](https://www.tradingview.com/support/solutions/43000681734) 显示为直方图。用户可以使用图表下方的选项切换这些图并将其缩放为绝对值或百分比。

![../_images/Strategies-Strategy-tester-Overview-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Strategy-tester-Overview-1.png)

- 注意：

  概览图使用两种尺度；左边是净值曲线，右边是回撤曲线。当用户单击这些图上的某个点时，这会将主图表视图定向到交易平仓的点。



### [性能总结](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id6)

该模块的[“绩效摘要”](https://www.tradingview.com/support/solutions/43000681683)选项卡全面概述了策略的绩效指标。它显示三列：一列代表所有交易，一列代表所有多头，一列代表所有空头，为交易者提供有关策略的多头、空头和整体模拟交易表现的更详细的见解。

![../_images/Strategies-Strategy-tester-Performance-summary-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Strategy-tester-Performance-summary-1.png)



### [交易列表](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id7)

[交易列表选项](https://www.tradingview.com/support/solutions/43000681737)卡提供了策略模拟交易的详细视图，其中包含基本信息，包括执行日期和时间、使用的订单类型（进场或出场）、交易的合约/股票/手数/单位数量、价格以及一些关键的贸易绩效指标。

![../_images/Strategies-Strategy-tester-List-of-trades-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Strategy-tester-List-of-trades-1.png)

- 注意：

  用户可以通过单击此列表中的特定交易来浏览图表上的特定交易时间。通过点击列表上方的“交易号”字段，用户可以按从第一个开始的升序或从最后一个开始的降序排列交易。



### [特性](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id8)

“属性”选项卡提供有关策略配置及其应用的数据集的详细信息。它包括策略的日期范围、品种信息、脚本设置和策略属性。

- **日期范围**- 包括模拟交易的日期范围和总可用回测范围。
- **交易品种信息**- 包含交易品种名称和经纪商/交易所、图表的时间范围和类型、刻度大小、图表的点值以及基础货币。
- **策略输入**- 概述脚本设置的“输入”选项卡中提供的策略脚本中使用的各种参数和变量。
- **策略属性**- 提供交易策略配置的概述。它包括基本细节，例如初始资本、基础货币、订单大小、保证金、金字塔、佣金和滑点。此外，本节还重点介绍了对策略计算行为所做的任何修改。

![../_images/Strategies-Strategy-tester-Properties-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Strategy-tester-Properties-1.png)



## [经纪商模拟器](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id9)

TradingView 利用*经纪商模拟器*来模拟交易策略的性能。与现实生活中的交易不同，模拟器严格使用可用的图表价格进行订单模拟。因此，模拟只能在柱线收盘后进行历史交易，并且只能在新的价格变动上进行实时交易。有关此行为的更多信息，请参阅 Pine Script™[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)。

由于模拟器只能使用图表数据，因此它会对柱内价格变动做出假设。它使用柱的开盘价、最高价和最低价来推断柱内活动，同时使用以下逻辑计算订单填充：

- 如果最高价比最低价更接近开盘价，则假定价格在柱上按以下顺序移动：开盘→最高价→最低价→收盘价。
- 如果最低价比最高价更接近开盘价，则假定价格在柱上按以下顺序移动：开盘→最低价→最高价→收盘价。
- 经纪商模拟器假设条形内的价格之间不存在差距；在模拟器的“眼睛”中，所有的柱内价格均可用于订单执行。

![../_images/Strategies-Broker-emulator-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Broker-emulator-1.png)



### [条形放大镜](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id10)

[高级账户持有者可以通过strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)`use_bar_magnifier`函数的参数 或脚本设置的“属性”选项卡中的“使用柱形放大镜”输入来覆盖经纪商模拟器的柱内假设 。条形[放大镜](https://www.tradingview.com/support/solutions/43000669285)检查比图表更小的时间范围内的数据，以获得有关条形内价格行为的更精细信息，从而在模拟过程中实现更精确的订单填充。

为了进行演示，以下脚本在[时间](https://www.tradingview.com/pine-script-reference/v5/#var_time)值穿过时 在 处放置“买入”限价单`entryPrice` ，并在 处放置“退出”限价单，并绘制两条水平线以可视化订单价格。该脚本还使用 突出显示背景，以指示策略下订单的时间：`exitPrice``orderTime``orderColor`

![../_images/Strategies-Broker-emulator-Bar-magnifier-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Broker-emulator-Bar-magnifier-1.png)

```javascript
//@version=5
strategy("Bar Magnifier Demo", overlay = true, use_bar_magnifier = false)

//@variable The UNIX timestamp to place the order at.
int orderTime = timestamp("UTC", 2023, 3, 22, 18)

//@variable Returns `color.orange` when `time` crosses the `orderTime`, false otherwise.
color orderColor = na

// Entry and exit prices.
float entryPrice = hl2 - (high - low)
float exitPrice  = entryPrice + (high - low) * 0.25

// Entry and exit lines.
var line entryLine = na
var line exitLine  = na

if ta.cross(time, orderTime)
    // Draw new entry and exit lines.
    entryLine := line.new(bar_index, entryPrice, bar_index + 1, entryPrice, color = color.green, width = 2)
    exitLine  := line.new(bar_index, exitPrice, bar_index + 1, exitPrice, color = color.red, width = 2)

    // Update order highlight color.
    orderColor := color.new(color.orange, 80)

    // Place limit orders at the `entryPrice` and `exitPrice`.
    strategy.entry("Buy", strategy.long, limit = entryPrice)
    strategy.exit("Exit", "Buy", limit = exitPrice)

// Update lines while the position is open.
else if strategy.position_size > 0.0
    entryLine.set_x2(bar_index + 1)
    exitLine.set_x2(bar_index + 1)

bgcolor(orderColor)
```

正如我们在上图中看到的，经纪商模拟器假设柱内价格从开盘到高点，然后从高点到低点，然后从低点到收盘，这意味着模拟器假设“退出”订单无法在同一栏上填写。然而，在声明声明中包含之后，我们看到了不同的情况：`use_bar_magnifier = true`

![../_images/Strategies-Broker-emulator-Bar-magnifier-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Broker-emulator-Bar-magnifier-2.png)

笔记

脚本可以请求的最大内柱数为 200,000。由于此限制，一些具有较长历史记录的品种可能无法完全覆盖其开始图表条形，这意味着这些条形图上的模拟交易不会受到条形放大镜的影响。



## [订单和条目](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id11)

就像现实生活中的交易一样，Pine 策略使用订单来管理仓位。在这种情况下，*订单*是模拟市场行为的命令，交易*是*订单执行后的结果。因此，要使用 Pine 建仓或平仓，用户必须创建带有指定其行为方式的参数的订单。

为了更仔细地了解订单如何运作以及它们如何成为交易，让我们编写一个简单的策略脚本：

```javascript
//@version=5
strategy("My strategy", overlay = true, margin_long = 100, margin_short = 100)

//@function Displays text passed to `txt` when called.
debugLabel(txt) =>
    label.new(
         bar_index, high, text = txt, color=color.lime, style = label.style_label_lower_right,
         textcolor = color.black, size = size.large
     )

longCondition = bar_index % 20 == 0 // true on every 20th bar
if (longCondition)
    debugLabel("Long entry order created")
    strategy.entry("My Long Entry Id", strategy.long)
strategy.close_all()
```

在此脚本中，我们定义了 a ，`longCondition`只要 可以被 20 整除，即每 20 个柱，则 a 为真`bar_index`。该策略在[if](https://www.tradingview.com/pine-script-reference/v5/#op_if)结构中使用此条件， 通过[Strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)模拟入场订单 ，并使用用户定义的`debugLabel()`函数在入场价格处绘制标签。该脚本 从全局范围调用 [strategy.close_all()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close_all)来模拟平掉任何未平仓头寸的市价订单。让我们看看将脚本添加到图表后会发生什么：

![../_images/Strategies-Orders-and-entries-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-1.png)

图表上的蓝色箭头表示入场位置，紫色箭头表示策略平仓的点。请注意，标签位于实际入场点之前，而不是出现在同一柱上 - 这是正在执行的订单。默认情况下，Pine 策略会在执行订单之前等待下一个可用的价格变动，因为在同一价格变动上执行订单是不现实的。此外，它们会在每个历史柱的收盘价时重新计算，这意味着在这种情况下，下一个可用的订单执行价格是下一个柱的开盘价。因此，默认情况下，所有订单都会延迟一个图表栏。

需要注意的是，虽然脚本从全局范围调用 [strategy.close_all()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close_all) ，强制在每个柱上执行，但如果策略不模拟未平仓头寸，则函数调用不会执行任何操作。如果有未平仓头寸，该命令会发出市价单来平仓，该订单在下一个可用报价时执行。例如，当`longCondition`20 柱上的 为 true 时，该策略将下一个挂单以在下一个价格变动处（即第 21 柱的开盘价）处成交。一旦脚本在该柱的收盘价上重新计算其值，该函数就会下一个订单平仓，该仓位在第 22 条柱的开盘价处填充。



### [订单类型](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id12)

Pine Script™ 策略允许用户根据其特定需求模拟不同的订单类型。主要值得注意的类型有*市价*、*限价*、*止损*和*止损限价*。



#### [市价订单](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id13)

市价订单是最基本的订单类型。他们制定了尽快买入或卖出证券的策略，无论价格如何。因此，它们总是在下一个可用价格变动时执行。默认情况下，所有`strategy.*()`生成订单的函数都会专门生成市价订单。

以下脚本模拟 可以被`bar_index`整除时的多头市价单。否则，当可以被 整除时，它会模拟空头市价单，从而产生每条柱交替进行多头和空头交易的策略：`2 * cycleLength``bar_index``cycleLength``cycleLength`

![../_images/Strategies-Orders-and-entries-Order-types-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-types-1.png)

```javascript
//@version=5
strategy("Market order demo", overlay = true, margin_long = 100, margin_short = 100)

//@variable Number of bars between long and short entries.
cycleLength = input.int(10, "Cycle length")

//@function Displays text passed to `txt` when called.
debugLabel(txt, lblColor) => label.new(
     bar_index, high, text = txt, color = lblColor, textcolor = color.white,
     style = label.style_label_lower_right, size = size.large
 )

//@variable Returns `true` every `2 * cycleLength` bars.
longCondition = bar_index % (2 * cycleLength) == 0
//@variable Returns `true` every `cycleLength` bars.
shortCondition = bar_index % cycleLength == 0

// Generate a long market order with a `color.green` label on `longCondition`.
if longCondition
    debugLabel("Long market order created", color.green)
    strategy.entry("My Long Entry Id", strategy.long)
// Otherwise, generate a short market order with a `color.red` label on `shortCondition`.
else if shortCondition
    debugLabel("Short market order created", color.red)
    strategy.entry("My Short Entry Id", strategy.short)
```



#### [限价订单](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id14)

限价订单命令策略以特定价格或更好的价格建仓（多头订单低于指定价格，空头订单高于指定价格）。当当前市场价格优于订单命令的`limit` 参数时，订单将被执行，而无需等待市场价格达到限价水平。

要在脚本中模拟限价单，请使用参数将价格值传递给下单命令`limit`。以下示例在 之前 100 根柱线收盘价下方 800 个报价点处设置限价单`last_bar_index`：

![../_images/Strategies-Orders-and-entries-Order-types-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-types-2.png)

```javascript
//@version=5
strategy("Limit order demo", overlay = true, margin_long = 100, margin_short = 100)

//@function Displays text passed to `txt` and a horizontal line at `price` when called.
debugLabel(price, txt) =>
    label.new(
         bar_index, price, text = txt, color = color.teal, textcolor = color.white,
         style = label.style_label_lower_right, size = size.large
     )
    line.new(
         bar_index, price, bar_index + 1, price, color = color.teal, extend = extend.right,
         style = line.style_dashed
     )

// Generate a long limit order with a label and line 100 bars before the `last_bar_index`.
if last_bar_index - bar_index == 100
    limitPrice = close - syminfo.mintick * 800
    debugLabel(limitPrice, "Long Limit order created")
    strategy.entry("Long", strategy.long, limit = limitPrice)
```

请注意脚本如何放置标签并在交易前几根柱线开始该线。只要价格保持在`limitPrice`价值之上，订单就无法执行。一旦市场价格达到限制，该策略就会执行中线交易。如果我们将`limitPrice`800 个报价点设置*为高于*收盘价而不是*低于*800 个报价点，则订单将立即成交，因为价格已经处于更好的值：

![../_images/Strategies-Orders-and-entries-Order-types-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-types-3.png)

```javascript
//@version=5
strategy("Limit order demo", overlay = true, margin_long = 100, margin_short = 100)

//@function Displays text passed to `txt` and a horizontal line at `price` when called.
debugLabel(price, txt) =>
    label.new(
         bar_index, price, text = txt, color = color.teal, textcolor = color.white,
         style = label.style_label_lower_right, size = size.large
     )
    line.new(
         bar_index, price, bar_index + 1, price, color = color.teal, extend = extend.right,
         style = line.style_dashed
     )

// Generate a long limit order with a label and line 100 bars before the `last_bar_index`.
if last_bar_index - bar_index == 100
    limitPrice = close + syminfo.mintick * 800
    debugLabel(limitPrice, "Long Limit order created")
    strategy.entry("Long", strategy.long, limit = limitPrice)
```



#### [止损单和止损限价单](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id15)

止损订单命令一种策略在价格达到指定`stop`价格或更差的值（多头订单高于指定价格，空头订单低于指定价格）后模拟另一个订单。它们本质上与限价订单相反。当当前市场价格差于`stop`参数时，策略将触发后续订单，而无需等待当前价格达到止损水平。如果下单命令包含`limit` 参数，则后续订单将是指定值的限价订单。否则，这将是市价订单。

下面的脚本在 100 根柱线上方 800 个点处设置了止损单`close`。在此示例中，策略`stop`在下单后市场价格与价格交叉一些柱时进入多头头寸。请注意，下订单时的初始价格优于传递给 的价格`stop`。等效的限价订单将在以下图表栏上填写：

![../_images/Strategies-Orders-and-entries-Order-types-4.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-types-4.png)

```javascript
//@version=5
strategy("Stop order demo", overlay = true, margin_long = 100, margin_short = 100)

//@function Displays text passed to `txt` when called and shows the `price` level on the chart.
debugLabel(price, txt) =>
    label.new(
         bar_index, high, text = txt, color = color.teal, textcolor = color.white,
         style = label.style_label_lower_right, size = size.large
     )
    line.new(bar_index, high, bar_index, price, style = line.style_dotted, color = color.teal)
    line.new(
         bar_index, price, bar_index + 1, price, color = color.teal, extend = extend.right,
         style = line.style_dashed
     )

// Generate a long stop order with a label and lines 100 bars before the last bar.
if last_bar_index - bar_index == 100
    stopPrice = close + syminfo.mintick * 800
    debugLabel(stopPrice, "Long Stop order created")
    strategy.entry("Long", strategy.long, stop = stopPrice)
```

`limit`同时使用和参数的下单命令`stop`会生成止损限价订单。该订单类型等待价格突破止损水平，然后以指定`limit`价格下限价单。

让我们修改之前的脚本来模拟和可视化止损限价单。在此示例中，我们使用`low`100 个柱之前的值作为`limit`入场命令中的价格。该脚本还显示标签和价格水平，以指示策略何时穿越`stopPrice`，即策略何时激活限价单。请注意市场价格最初如何达到限价水平，但该策略不会模拟交易，因为价格必须穿过 才能将 `stopPrice`挂起的限价订单放置在`limitPrice`：

![../_images/Strategies-Orders-and-entries-Order-types-5.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-types-5.png)

```javascript
//@version=5
strategy("Stop-Limit order demo", overlay = true, margin_long = 100, margin_short = 100)

//@function Displays text passed to `txt` when called and shows the `price` level on the chart.
debugLabel(price, txt, lblColor, lineWidth = 1) =>
    label.new(
         bar_index, high, text = txt, color = lblColor, textcolor = color.white,
         style = label.style_label_lower_right, size = size.large
     )
    line.new(bar_index, close, bar_index, price, style = line.style_dotted, color = lblColor, width = lineWidth)
    line.new(
         bar_index, price, bar_index + 1, price, color = lblColor, extend = extend.right,
         style = line.style_dashed, width = lineWidth
     )

var float stopPrice  = na
var float limitPrice = na

// Generate a long stop-limit order with a label and lines 100 bars before the last bar.
if last_bar_index - bar_index == 100
    stopPrice  := close + syminfo.mintick * 800
    limitPrice := low
    debugLabel(limitPrice, "", color.gray)
    debugLabel(stopPrice, "Long Stop-Limit order created", color.teal)
    strategy.entry("Long", strategy.long, stop = stopPrice, limit = limitPrice)

// Draw a line and label once the strategy activates the limit order.
if high >= stopPrice
    debugLabel(limitPrice, "Limit order activated", color.green, 2)
    stopPrice := na
```



### [下单命令](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id16)

Pine Script™ 策略具有多种模拟下单功能，称为*下单命令*。每个命令都有其独特的用途，其行为也与其他命令不同。



#### [`strategy.entry()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id17)

该命令模拟挂单。默认情况下，策略在调用此函数时下达市价单，但在使用`stop`和参数时，它们也可以创建止损单、限价单和止损限价单`limit`。

为了简化开仓，[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry) 具有多种独特的行为。其中一种行为是，该命令可以反转公开市场头寸，而无需额外的函数调用。当使用[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)下的订单被执行时 ，该函数将自动计算该策略需要平仓的金额，并`qty` 默认以相反方向交易合约/股票/手数/单位。例如，如果某个策略在 [strategy.long](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}long)方向上有15股的未平仓合约，并调用 [strategy.entry()在](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)[strategy.short](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}short)方向下市价单 ，则该策略下单时交易的金额为15股股票加上`qty`新空头订单的 。

下面的示例演示了仅使用[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry) 调用来下挂单的策略。它每 100 根柱创建一次价值 15 股的多头市价订单`qty`，每 25 根柱创建一次价值 5 股的空头市价订单`qty`。该脚本针对出现的`buyCondition`和分别突出显示背景蓝色和红色`sellCondition`：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-1.png)

```javascript
//@version=5
strategy("Entry demo", "test", overlay = true)

//@variable Is `true` on every 100th bar.
buyCondition = bar_index % 100 == 0
//@variable Is `true` on every 25th bar except for those that are divisible by 100.
sellCondition = bar_index % 25 == 0 and not buyCondition

if buyCondition
    strategy.entry("buy", strategy.long, qty = 15)
if sellCondition
    strategy.entry("sell", strategy.short, qty = 5)

bgcolor(buyCondition  ? color.new(color.blue, 90) : na)
bgcolor(sellCondition ? color.new(color.red, 90) : na)
```

正如我们在上图中看到的，订单标记显示该策略在每次订单执行时交易了 20 股，而不是 15 股和 5 股。由于[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry) 会自动反转头寸，除非通过 [strategy.risk.allow_entry_in()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}risk{dot}allow_entry_in)另有指定 函数中，当方向改变时，它将未平仓头寸规模（多头入场 15 股）添加到新订单的规模（空头入场 5 股）中，从而导致交易数量为 20 股。

请注意，在上面的示例中，尽管`sellCondition`在另一个 之前出现了 3 次`buyCondition`，但该策略仅在第一次出现时下达“卖出”订单。[Strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)命令的另一个独特行为 是它受脚本*金字塔*设置的影响。金字塔指定策略可以在同一方向上填充的连续订单的数量。默认情况下，其值为 1，这意味着该策略仅允许一个连续订单在任一方向上成交。用户可以通过[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)`pyramiding`函数调用的参数 或脚本设置的“属性”选项卡中的“金字塔”输入来设置策略金字塔值。

如果我们添加到之前脚本的声明语句中，该策略将允许同一方向最多三个连续交易，这意味着它可以在每次出现时模拟新的市价订单：`pyramiding = 3``sellCondition`

![../_images/Strategies-Orders-and-entries-Order-placement-commands-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-2.png)



#### [`strategy.order()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id18)

该命令模拟基本命令。与大多数下单命令包含内部逻辑以简化与策略的接口不同，[strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)使用指定的参数，而不考虑大多数其他策略设置。通过[strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)下的订单 可以开立新仓位并修改或平仓现有仓位。

以下脚本仅使用[strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)调用来创建和修改条目。该策略模拟每 100 个柱状图 15 个单位的多头市价订单，然后每 25 个柱状图模拟 5 个单位的三个空头订单。该脚本突出显示背景蓝色和红色，以指示策略何时模拟“买入”和“卖出”订单：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-3.png)

```javascript
//@version=5
strategy("Order demo", "test", overlay = true)

//@variable Is `true` on every 100th bar.
buyCond = bar_index % 100 == 0
//@variable Is `true` on every 25th bar except for those that are divisible by 100.
sellCond = bar_index % 25 == 0 and not buyCond

if buyCond
    strategy.order("buy", strategy.long, qty = 15) // Enter a long position of 15 units.
if sellCond
    strategy.order("sell", strategy.short, qty = 5) // Exit 5 units from the long position.

bgcolor(buyCond  ? color.new(color.blue, 90) : na)
bgcolor(sellCond ? color.new(color.red, 90) : na)
```

这个特定的策略永远不会模拟空头头寸，因为与 [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)不同， [strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order) 不会自动反转头寸。使用该命令时，得出的市场持仓量为当前市场持仓量与已成交订单数量的净和。策略填写 15 个单位的“买入”订单后，它会执行三个“卖出”订单，每个订单将未平仓头寸减少 5 个单位，即 15 - 5 * 3 = 0。使用 Strategy.entry( 相同的脚本会有不同的 [行为) ，如上](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)[节](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#pagestrategies-ordersandentries-orderplacementcommands-strategyentry)所示的示例。



#### [`strategy.exit()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id19)

该命令模拟退出命令。它的独特之处在于它允许策略通过`loss`、`stop`、 `profit`、`limit`和参数以止损、止盈和追踪止损订单的形式退出市场头寸或形成多个退出`trail_*`。

[Strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)命令最基本的用途 是创建级别，在该级别中，策略将因损失过多资金（止损）、赚取足够资金（止盈）或两者（括号）而退出仓位。

该命令的止损和获利功能与两个参数相关。该函数的`loss`和`profit` 参数将止损和止盈值指定为距挂单价格的定义数量，而其`stop`和`limit` 参数则提供特定的止损和止盈价格值。函数调用中的绝对参数取代相对参数。如果[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit) 调用包含`profit`和`limit`参数，该命令将优先考虑该`limit`值并忽略该`profit`值。同样，只有`stop`当函数调用包含`stop`和`loss`参数时，它才会考虑该值。

笔记

[尽管与strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry) 和[strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)命令中的参数共享相同的名称，但在[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)`limit`中， 和`stop`参数的工作方式有所不同。在第一种情况下，在命令中使用和将创建一个止损限价订单，该订单会在超过止损价格后打开一个限价订单。在第二种情况下，该命令将创建一个单独的限价和止损订单以从未平仓头寸退出。`limit``stop`

带有参数的[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)中的所有退出订单`from_entry`都绑定到`id`相应的入市订单；当没有与`from_entry`ID 关联的公开市场头寸或活跃挂单时，策略无法模拟退出订单。

[以下策略通过strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)下达“买入”挂单，并通过[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)命令每100 个柱 下达止损和止盈订单 。请注意，该脚本调用[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit) 两次。 “exit1”命令引用“buy1”挂单，“exit2”引用“buy”订单。该策略将仅模拟来自“exit2”的退出订单，因为“exit1”引用了不存在的订单 ID：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-4.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-4.png)

```javascript
//@version=5
strategy("Exit demo", "test", overlay = true)

//@variable Is `true` on every 100th bar.
buyCondition = bar_index % 100 == 0

//@variable Stop-loss price for exit commands.
var float stopLoss   = na
//@variable Take-profit price for exit commands.
var float takeProfit = na

// Place orders upon `buyCondition`.
if buyCondition
    if strategy.position_size == 0.0
        stopLoss   := close * 0.99
        takeProfit := close * 1.01
    strategy.entry("buy", strategy.long)
    strategy.exit("exit1", "buy1", stop = stopLoss, limit = takeProfit) // Does nothing. "buy1" order doesn't exist.
    strategy.exit("exit2", "buy", stop = stopLoss, limit = takeProfit)

// Set `stopLoss` and `takeProfit` to `na` when price touches either, i.e., when the strategy simulates an exit.
if low <= stopLoss or high >= takeProfit
    stopLoss   := na
    takeProfit := na

plot(stopLoss, "SL", color.red, style = plot.style_circles)
plot(takeProfit, "TP", color.green, style = plot.style_circles)
```

- 注意：

  每个退出命令发出的限价单和止损单不一定以指定价格成交。策略可以以更好的价格填写限价单，以更差的价格止损单，具体取决于经纪商模拟器可用的值范围。

如果用户未`from_entry`在[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit) 调用中提供参数，该函数将为每个打开的条目创建退出订单。

在此示例中，策略创建“buy1”和“buy2”挂单，并 每 100 个柱调用[strategy.exit()（](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)不带参数）。`from_entry`从图表上的订单标记中我们可以看到，一旦市场价格达到 或`stopLoss`值`takeProfit` ，该策略就会为“buy1”和“buy2”条目填写退出订单：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-4a.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-4a.png)

```javascript
//@version=5
strategy("Exit all demo", "test", overlay = true, pyramiding = 2)

//@variable Is `true` on every 100th bar.
buyCondition = bar_index % 100 == 0

//@variable Stop-loss price for exit commands.
var float stopLoss   = na
//@variable Take-profit price for exit commands.
var float takeProfit = na

// Place orders upon `buyCondition`.
if buyCondition
    if strategy.position_size == 0.0
        stopLoss   := close * 0.99
        takeProfit := close * 1.01
    strategy.entry("buy1", strategy.long)
    strategy.entry("buy2", strategy.long)
    strategy.exit("exit", stop = stopLoss, limit = takeProfit) // Places orders to exit all open entries.

// Set `stopLoss` and `takeProfit` to `na` when price touches either, i.e., when the strategy simulates an exit.
if low <= stopLoss or high >= takeProfit
    stopLoss   := na
    takeProfit := na

plot(stopLoss, "SL", color.red, style = plot.style_circles)
plot(takeProfit, "TP", color.green, style = plot.style_circles)
```

一个策略可以从同一个入口ID多次退出，这有利于形成多级退出策略。执行多个平仓指令时，每笔订单数量必须是成交数量的一部分，且总和不得超过持仓量。如果`qty`函数的 小于当前市场头寸的规模，该策略将模拟部分退出。如果`qty`价值超过未平仓头寸数量，它将减少订单，因为它无法填充比未平仓头寸更多的合约/股票/手数/单位。

在下面的示例中，我们修改了之前的“退出演示”脚本，以模拟每个入场点的两个止损和止盈订单。该策略下达`qty`两股的“买入”订单，一股的“退出1”止损和止盈订单，以及三股的`qty`“退出2”止损和止盈订单：`qty`

![../_images/Strategies-Orders-and-entries-Order-placement-commands-5.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-5.png)

```javascript
//@version=5
strategy("Multiple exit demo", "test", overlay = true)

//@variable Is `true` on every 100th bar.
buyCondition = bar_index % 100 == 0

//@variable Stop-loss price for "exit1" commands.
var float stopLoss1 = na
//@variable Stop-loss price for "exit2" commands.
var float stopLoss2 = na
//@variable Take-profit price for "exit1" commands.
var float takeProfit1 = na
//@variable Take-profit price for "exit2" commands.
var float takeProfit2 = na

// Place orders upon `buyCondition`.
if buyCondition
    if strategy.position_size == 0.0
        stopLoss1   := close * 0.99
        stopLoss2   := close * 0.98
        takeProfit1 := close * 1.01
        takeProfit2 := close * 1.02
    strategy.entry("buy", strategy.long, qty = 2)
    strategy.exit("exit1", "buy", stop = stopLoss1, limit = takeProfit1, qty = 1)
    strategy.exit("exit2", "buy", stop = stopLoss2, limit = takeProfit2, qty = 3)

// Set `stopLoss1` and `takeProfit1` to `na` when price touches either.
if low <= stopLoss1 or high >= takeProfit1
    stopLoss1   := na
    takeProfit1 := na
// Set `stopLoss2` and `takeProfit2` to `na` when price touches either.
if low <= stopLoss2 or high >= takeProfit2
    stopLoss2   := na
    takeProfit2 := na

plot(stopLoss1, "SL1", color.red, style = plot.style_circles)
plot(stopLoss2, "SL2", color.red, style = plot.style_circles)
plot(takeProfit1, "TP1", color.green, style = plot.style_circles)
plot(takeProfit2, "TP2", color.green, style = plot.style_circles)
```

从图表上的订单标记可以看出，尽管指定`qty`值超过了交易金额，该策略还是执行了“exit2”订单。该脚本没有使用此数量，而是减小了订单大小以匹配剩余头寸。

- 注意：

  [通过strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)调用生成的所有订单都 属于同一个[strategy.oca.reduce](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#pagestrategies-ocagroups-strategyocareduce)组，这意味着当任一订单成交时，该策略会减少所有其他订单以匹配未平仓头寸。

值得注意的是，该命令生成的订单会保留一部分公开市场头寸以供退出。 [strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)无法发出订单以退出已由另一个退出命令保留用于退出的部分仓位。

以下脚本模拟 100 根柱前 20 股的“买入”市价订单，其中“限价”订单和“止损”订单分别为 19 股和 20 股。正如我们在图表上看到的，该策略首先执行“止损”订单。但成交量仅为一股。由于脚本首先放置了“限价”订单，因此该策略保留其`qty`（19 股）来平仓，仅留下一股由“止损”订单平仓：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-5a.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-5a.png)

```javascript
//@version=5
strategy("Reserved exit demo", "test", overlay = true)

//@variable "stop" exit order price.
var float stop   = na
//@variable "limit" exit order price
var float limit  = na
//@variable Is `true` 100 bars before the `last_bar_index`.
longCondition = last_bar_index - bar_index == 100

if longCondition
    stop  := close * 0.99
    limit := close * 1.01
    strategy.entry("buy", strategy.long, 20)
    strategy.exit("limit", limit = limit,  qty = 19)
    strategy.exit("stop", stop = stop, qty = 20)

bool showPlot = strategy.position_size != 0
plot(showPlot ? stop : na, "Stop", color.red, 2, plot.style_linebr)
plot(showPlot ? limit : na, "Limit 1", color.green, 2, plot.style_linebr)
```

[Strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)函数的另一个关键功能是，它可以创建*追踪止损*，即每当价格朝有利方向移动到更好的值时，止损订单会落后于市场价格指定的金额。这些订单有两个组成部分：激活级别和跟踪偏移量。激活水平是市场价格必须交叉才能激活追踪止损计算的值，通过参数以价格变动表示`trail_points`或通过参数表示为价格值`trail_price`。如果退出调用包含两个参数，则该`trail_price`参数优先。追踪偏移量是止损点跟随市场价格的距离，通过参数以价格变动来表示`trail_offset`。对于要创建和激活追踪止损的[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)，函数调用必须包含`trail_offset`和`trail_price`或`trail_points`参数。

下面的示例显示了正在运行的追踪止损并可视化其行为。该策略模拟图表上最后一个柱之前 100 个柱的多头入场订单，然后在下一个柱上设置追踪止损。该脚本有两个输入：一个控制激活水平偏移（即，超过激活止损所需的入场价格的金额），另一个控制跟踪偏移（即，当市场价格移动到所需方向上的更好值）。

图表上的绿色虚线显示市场价格必须穿越的水平才能触发追踪止损单。价格穿过该水平后，脚本会绘制一条蓝线来表示追踪止损。当价格上升到新的高值时，这对策略有利，因为这意味着头寸的价值正在增加，止损也会上升，以保持`trailingStopOffset`当前价格后面的价格变动距离。当价格下跌或没有达到新的高点时，止损值保持不变。最终，价格跌破止损，触发退出：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-5b.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-5b.png)

```javascript
//@version=5
strategy("Trailing stop order demo", overlay = true, margin_long = 100, margin_short = 100)

//@variable Offset used to determine how far above the entry price (in ticks) the activation level will be located.
activationLevelOffset = input(1000, "Activation Level Offset (in ticks)")
//@variable Offset used to determine how far below the high price (in ticks) the trailing stop will trail the chart.
trailingStopOffset = input(2000, "Trailing Stop Offset (in ticks)")

//@function Displays text passed to `txt` when called and shows the `price` level on the chart.
debugLabel(price, txt, lblColor, hasLine = false) =>
    label.new(
         bar_index, price, text = txt, color = lblColor, textcolor = color.white,
         style = label.style_label_lower_right, size = size.large
     )
    if hasLine
        line.new(
             bar_index, price, bar_index + 1, price, color = lblColor, extend = extend.right,
             style = line.style_dashed
         )

//@variable The price at which the trailing stop activation level is located.
var float trailPriceActivationLevel = na
//@variable The price at which the trailing stop itself is located.
var float trailingStop = na
//@variable Caclulates the value that Trailing Stop would have if it were active at the moment.
theoreticalStopPrice = high - trailingStopOffset * syminfo.mintick

// Generate a long market order to enter 100 bars before the last bar.
if last_bar_index - bar_index == 100
    strategy.entry("Long", strategy.long)

// Generate a trailing stop 99 bars before the last bar.
if last_bar_index - bar_index == 99
    trailPriceActivationLevel := open + syminfo.mintick * activationLevelOffset
    strategy.exit(
         "Trailing Stop", from_entry = "Long", trail_price = trailPriceActivationLevel,
         trail_offset = trailingStopOffset
     )
    debugLabel(trailPriceActivationLevel, "Trailing Stop Activation Level", color.green, true)

// Visualize the trailing stop mechanic in action.
// If there is an open trade, check whether the Activation Level has been achieved.
// If it has been achieved, track the trailing stop by assigning its value to a variable.
if strategy.opentrades == 1
    if na(trailingStop) and high > trailPriceActivationLevel
        debugLabel(trailPriceActivationLevel, "Activation level crossed", color.green)
        trailingStop := theoreticalStopPrice
        debugLabel(trailingStop, "Trailing Stop Activated", color.blue)

    else if theoreticalStopPrice > trailingStop
        trailingStop := theoreticalStopPrice

// Visualize the movement of the trailing stop.
plot(trailingStop, "Trailing Stop")
```



#### [`strategy.close()` 和 `strategy.close_all()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id20)

这些命令使用市价订单模拟退出头寸。这些函数在被调用时关闭交易，而不是以特定价格关闭交易。

下面的示例演示了一个简单的策略，该策略每 50 根柱线通过 [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)下一次“买入”订单，并 在 25 根柱线后使用[strategy.close()执行市价订单平仓：](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close)

![../_images/Strategies-Orders-and-entries-Order-placement-commands-6.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-6.png)

```javascript
//@version=5
strategy("Close demo", "test", overlay = true)

//@variable Is `true` on every 50th bar.
buyCond = bar_index % 50 == 0
//@variable Is `true` on every 25th bar except for those that are divisible by 50.
sellCond = bar_index % 25 == 0 and not buyCond

if buyCond
    strategy.entry("buy", strategy.long)
if sellCond
    strategy.close("buy")

bgcolor(buyCond  ? color.new(color.blue, 90) : na)
bgcolor(sellCond ? color.new(color.red, 90) : na)
```

与大多数其他下单命令不同，[strategy.close()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close)`id`的参数 引用现有的条目 ID 来关闭。如果指定的不存在，该命令将不会执行命令。如果持仓由具有相同 ID 的多个条目组成，该命令将同时退出所有条目。`id`

为了进行演示，以下脚本每 25 个柱线下一次“买入”订单。该脚本每 100 个柱关闭一次所有“买入”条目。我们在[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) 声明语句中加入了允许策略模拟最多三个相同方向的订单：`pyramiding = 3`

![../_images/Strategies-Orders-and-entries-Order-placement-commands-7.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-7.png)

```javascript
//@version=5
strategy("Multiple close demo", "test", overlay = true, pyramiding = 3)

//@variable Is `true` on every 100th bar.
sellCond = bar_index % 100 == 0
//@variable Is `true` on every 25th bar except for those that are divisible by 100.
buyCond = bar_index % 25 == 0 and not sellCond

if buyCond
    strategy.entry("buy", strategy.long)
if sellCond
    strategy.close("buy")

bgcolor(buyCond  ? color.new(color.blue, 90) : na)
bgcolor(sellCond ? color.new(color.red, 90) : na)
```

对于脚本具有多个具有不同 ID 的条目的情况， [strategy.close_all()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close_all) 命令会派上用场，因为它会关闭所有条目，无论其 ID 为何。

下面的脚本根据未平仓交易的数量依次放置“A”、“B”和“C”挂单，然后用单个市价订单平仓所有订单：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-8.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-8.png)

```javascript
//@version=5
strategy("Close multiple ID demo", "test", overlay = true, pyramiding = 3)

switch strategy.opentrades
    0 => strategy.entry("A", strategy.long)
    1 => strategy.entry("B", strategy.long)
    2 => strategy.entry("C", strategy.long)
    3 => strategy.close_all()
```



#### [`strategy.cancel()` 和 `strategy.cancel_all()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id21)

这些命令允许策略取消挂单，即 当使用或参数时由[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit) 或[strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order) 或[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)生成的挂单。`limit``stop`

以下策略模拟 100 个柱前收盘价下方 500 个点的“买入”限价单，然后取消下一个柱的订单。该脚本在 处绘制一条水平线，并将`limitPrice`背景颜色设置为绿色和橙色，以分别指示何时下达和取消限价单。正如我们所看到的，一旦市场价格越过 ，什么也没有发生，`limitPrice`因为该策略已经取消了订单：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-9.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-9.png)

```javascript
//@version=5
strategy("Cancel demo", "test", overlay = true)

//@variable Draws a horizontal line at the `limit` price of the "buy" order.
var line limitLine = na

//@variable Returns `color.green` when the strategy places the "buy" order, `color.orange` when it cancels the order.
color bgColor = na

if last_bar_index - bar_index == 100
    float limitPrice = close - syminfo.mintick * 500
    strategy.entry("buy", strategy.long, limit = limitPrice)
    limitLine := line.new(bar_index, limitPrice, bar_index + 1, limitPrice, extend = extend.right)
    bgColor := color.new(color.green, 50)

if last_bar_index - bar_index == 99
    strategy.cancel("buy")
    bgColor := color.new(color.orange, 50)

bgcolor(bgColor)
```

与[strategy.close()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close)一样，[strategy.cancel()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}cancel)`id` 的参数 指的是现有条目的ID。如果参数引用不存在的 ID，则此命令将不执行任何操作。当有多个相同ID的挂单时，该命令将一次性取消所有挂单。`id`

在此示例中，我们修改了之前的脚本，在从 100 根柱之前开始的三个连续柱上放置“买入”限价单。该策略在距最近柱线 97 根柱线后取消所有柱线`bar_index`，导致当价格穿过任何线时它不执行任何操作：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-10.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-10.png)

```javascript
//@version=5
strategy("Multiple cancel demo", "test", overlay = true, pyramiding = 3)

//@variable Draws a horizontal line at the `limit` price of the "buy" order.
var line limitLine = na

//@variable Returns `color.green` when the strategy places the "buy" order, `color.orange` when it cancels the order.
color bgColor = na

if last_bar_index - bar_index <= 100 and last_bar_index - bar_index >= 98
    float limitPrice = close - syminfo.mintick * 500
    strategy.entry("buy", strategy.long, limit = limitPrice)
    limitLine := line.new(bar_index, limitPrice, bar_index + 1, limitPrice, extend = extend.right)
    bgColor := color.new(color.green, 50)

if last_bar_index - bar_index == 97
    strategy.cancel("buy")
    bgColor := color.new(color.orange, 50)

bgcolor(bgColor)
```

- 注意：

  我们在脚本的声明语句中添加了允许执行三个 [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry) 订单的功能。或者，脚本可以使用 [strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)实现相同的输出 ，因为它对设置不敏感。`pyramiding = 3``pyramiding`

需要注意的是，[strategy.cancel()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}cancel) 和[strategy.cancel_all()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}cancel_all)都 不能取消*市价*订单，因为策略会在下一个价格变动时立即执行它们。策略在成交后无法取消订单。要平仓，请使用 [strategy.close()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close)或 [strategy.close_all()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close_all)。

此示例模拟 100 个柱前的“买入”市价单，然后尝试取消下一个柱上的所有挂单。由于策略已经填写了“买入”订单，因此 在这种情况下， [strategy.cancel_all()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}cancel_all)命令不执行任何操作，因为没有待取消的订单：

![../_images/Strategies-Orders-and-entries-Order-placement-commands-11.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Orders-and-entries-Order-placement-commands-11.png)

```javascript
//@version=5
strategy("Cancel market demo", "test", overlay = true)

//@variable Returns `color.green` when the strategy places the "buy" order, `color.orange` when it tries to cancel.
color bgColor = na

if last_bar_index - bar_index == 100
    strategy.entry("buy", strategy.long)
    bgColor := color.new(color.green, 50)

if last_bar_index - bar_index == 99
    strategy.cancel_all()
    bgColor := color.new(color.orange, 50)

bgcolor(bgColor)
```



## [头寸规模](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id22)

Pine Script™ 策略有两种控制模拟交易规模的方法：

- [使用strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)`default_qty_type`函数中的和`default_qty_value`参数为所有订单设置默认的固定数量类型和值，该函数还会在脚本设置的“属性”选项卡中设置默认值。
- [调用strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)`qty`时指定参数。当用户向函数提供此参数时，脚本会忽略策略的默认数量值和类型。

以下示例模拟`longAmount`每当`low` 价格等于价值时的“买入”订单规模，以及当 价格等于价值时的`lowest`“卖出”订单规模：`shortAmount``high``highest`

![../_images/Strategies-Position-sizing-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Position-sizing-1.png)

```javascript
//@version=5
strategy("Buy low, sell high", overlay = true, default_qty_type = strategy.cash, default_qty_value = 5000)

int   length      = input.int(20, "Length")
float longAmount  = input.float(4.0, "Long Amount")
float shortAmount = input.float(2.0, "Short Amount")

float highest = ta.highest(length)
float lowest  = ta.lowest(length)

switch
    low == lowest   => strategy.entry("Buy", strategy.long, longAmount)
    high == highest => strategy.entry("Sell", strategy.short, shortAmount)
```

请注意，在上面的示例中，尽管我们在声明语句中指定了`default_qty_type` 和`default_qty_value`参数，但脚本并未将这些默认值用于模拟订单。相反，它将它们的大小设置为单位 `longAmount`和`shortAmount`单位。如果我们希望脚本使用默认类型和值，则必须`qty`从 [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry) 调用中删除该规范：

![../_images/Strategies-Position-sizing-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Position-sizing-2.png)

```javascript
//@version=5
strategy("Buy low, sell high", overlay = true, default_qty_type = strategy.cash, default_qty_value = 5000)

int length = input.int(20, "Length")

float highest = ta.highest(length)
float lowest  = ta.lowest(length)

switch
    low == lowest   => strategy.entry("Buy", strategy.long)
    high == highest => strategy.entry("Sell", strategy.short)
```



## [平仓市场](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id23)

尽管可以模拟 [策略测试器](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#pagestrategies-strategytester)模块 交易列表选项卡中显示的特定挂单的退出，但所有订单均根据 FIFO（先进先出）规则链接。如果用户未指定[strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)调用的参数 ，策略将从开仓的第一个挂单开始退出未平仓市场头寸。`from_entry`

以下示例按顺序模拟两个订单：以最后 100 个柱的市场价格“Buy1”，一旦头寸大小与“Buy1”的大小匹配，则“Buy2”。该策略仅在 15 个单位时下达退出指令`positionSize`。该脚本不`from_entry`向 [strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit) 命令提供参数，因此该策略每次调用该函数时都会为所有未平仓头寸下达退出指令，从第一个指令开始。它将在单独的窗格中绘制`positionSize`以供视觉参考：

![../_images/Strategies-Closing-a-market-position-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Closing-a-market-position-1.png)

```javascript
//@version=5
strategy("Exit Demo", pyramiding = 2)

float positionSize = strategy.position_size

if positionSize == 0 and last_bar_index - bar_index <= 100
    strategy.entry("Buy1", strategy.long, 5)
else if positionSize == 5
    strategy.entry("Buy2", strategy.long, 10)
else if positionSize == 15
    strategy.exit("bracket", loss = 10, profit = 10)

plot(positionSize == 0 ? na : positionSize, "Position Size", color.lime, 4, plot.style_histogram)
```

- 注意：

  我们在脚本的声明语句中包含了它，以允许它模拟同一方向的两个连续订单。`pyramiding = 2`

假设我们想在“Buy1”之前退出“Buy2”。让我们看看如果我们指示策略在满足两个订单时在“Buy1”之前关闭“Buy2”会发生什么：

![../_images/Strategies-Closing-a-market-position-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Closing-a-market-position-2.png)

```javascript
//@version=5
strategy("Exit Demo", pyramiding = 2)

float positionSize = strategy.position_size

if positionSize == 0 and last_bar_index - bar_index <= 100
    strategy.entry("Buy1", strategy.long, 5)
else if positionSize == 5
    strategy.entry("Buy2", strategy.long, 10)
else if positionSize == 15
    strategy.close("Buy2")
    strategy.exit("bracket", "Buy1", loss = 10, profit = 10)

plot(positionSize == 0 ? na : positionSize, "Position Size", color.lime, 4, plot.style_histogram)
```

正如我们在策略测试器的“交易列表”选项卡中看到的，它不是使用[Strategy.close()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close)关闭“Buy2”头寸，而是首先关闭“Buy1”的数量，这是平仓订单数量的一半，然后关闭一半的“Buy2”头寸，因为经纪商模拟器默认遵循 FIFO 规则。用户可以通过在[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)函数中 指定来更改此行为。`close_entries_rule = "ANY"`



## [OCA 团体](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id24)

一取消全部（OCA）组允许策略在执行下单命令时全部或部分取消其他订单，包括 [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry) 和[strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)，具有相同的`oca_name`，具体取决于`oca_type`用户在函数调用中提供。



### [`strategy.oca.cancel` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id25)

strategy.oca.cancel OCA 类型在订单组中的订单执行或部分执行后 取消所有具有相同订单的订单[。](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}oca{dot}cancel)`oca_name`

例如，以下策略在`ma1`交叉时执行订单`ma2`。当 [strategy.position_size](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}position_size)为0时，它会在柱的`high`和 处放置多头和空头止损订单。`low`否则，它调用 [strategy.close_all()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close_all) 以市价订单平仓所有未平仓头寸。根据价格行为，策略可能会在发出平仓订单之前填写两个订单。此外，如果经纪商模拟器的柱内假设支持它，则两个订单可能会在同一柱上填充。在这种情况下， strategy.close_all [()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close_all)命令不会执行任何操作，因为在执行完两个订单之前，脚本无法调用该操作：

![../_images/Strategies-OCA-groups-Strategy-oca-cancel-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-OCA-groups-Strategy-oca-cancel-1.png)

```javascript
//@version=5
strategy("OCA Cancel Demo", overlay=true)

float ma1 = ta.sma(close, 5)
float ma2 = ta.sma(close, 9)

if ta.cross(ma1, ma2)
    if strategy.position_size == 0
        strategy.order("Long",  strategy.long, stop = high)
        strategy.order("Short", strategy.short, stop = low)
    else
        strategy.close_all()

plot(ma1, "Fast MA", color.aqua)
plot(ma2, "Slow MA", color.orange)
```

为了消除策略在平仓订单之前填写多头和空头订单的情况，我们可以指示它在执行另一订单后取消另一订单。在此示例中，我们将[Strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)`oca_name`命令的 和它们的分别 设置 为“Entry”和：`oca_type``strategy.oca.cancel`

![../_images/Strategies-OCA-groups-Strategy-oca-cancel-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-OCA-groups-Strategy-oca-cancel-2.png)

```javascript
//@version=5
strategy("OCA Cancel Demo", overlay=true)

float ma1 = ta.sma(close, 5)
float ma2 = ta.sma(close, 9)

if ta.cross(ma1, ma2)
    if strategy.position_size == 0
        strategy.order("Long",  strategy.long, stop = high, oca_name = "Entry", oca_type = strategy.oca.cancel)
        strategy.order("Short", strategy.short, stop = low, oca_name = "Entry", oca_type = strategy.oca.cancel)
    else
        strategy.close_all()

plot(ma1, "Fast MA", color.aqua)
plot(ma2, "Slow MA", color.orange)
```



### [`strategy.oca.reduce` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id26)

Strategy.oca.reduce OCA 类型不会取消订单[。](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}oca{dot}reduce)相反，它会根据已平仓合约/股票/手数/单位的数量减少每次新成交时相同订单的规模`oca_name`，这对于退出策略特别有用。

以下示例演示了仅多头退出策略的尝试，该策略为每个新入场生成一个止损订单和两个止盈订单。在两条移动平均线交叉时，它使用[Strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)模拟 6 个单位的“多头” 挂单，然后 使用[Strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)`qty`模拟 6、3 和 3 个单位的止损/限价单 、、 和分别是价格。`stop``limit1``limit2`

将策略添加到图表后，我们发现它没有按预期工作。该脚本的问题是，与 [strategy.exit( ](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)[)不同，strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit) 默认不属于OCA组 。由于我们没有明确地将订单分配给 OCA 组，因此该策略在执行订单时不会取消或减少订单，这意味着可以交易比未平仓头寸更大的数量并反转方向：

![../_images/Strategies-OCA-groups-Strategy-oca-reduce-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-OCA-groups-Strategy-oca-reduce-1.png)

```javascript
//@version=5
strategy("Multiple TP Demo", overlay = true)

var float stop   = na
var float limit1 = na
var float limit2 = na

bool longCondition = ta.crossover(ta.sma(close, 5), ta.sma(close, 9))
if longCondition and strategy.position_size == 0
    stop   := close * 0.99
    limit1 := close * 1.01
    limit2 := close * 1.02
    strategy.entry("Long",  strategy.long, 6)
    strategy.order("Stop",  strategy.short, stop = stop, qty = 6)
    strategy.order("Limit 1", strategy.short, limit = limit1, qty = 3)
    strategy.order("Limit 2", strategy.short, limit = limit2, qty = 3)

bool showPlot = strategy.position_size != 0
plot(showPlot ? stop   : na, "Stop",    color.red,   style = plot.style_linebr)
plot(showPlot ? limit1 : na, "Limit 1", color.green, style = plot.style_linebr)
plot(showPlot ? limit2 : na, "Limit 2", color.green, style = plot.style_linebr)
```

为了使我们的策略按预期发挥作用，我们必须指示其减少其他止损/止盈订单的单位数量，以便它们不超过剩余未平仓头寸的规模。

在下面的示例中，我们将`oca_name`退出策略中的每个订单设置为“Bracket”，并设置 `oca_type`为 [strategy.oca.reduce](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}oca{dot}reduce)。这些设置告诉策略在执行其中一个订单时，`qty`将“Bracket”组中的订单值减少为已`qty` 成交，以防止其交易过多单位并导致逆转：

![../_images/Strategies-OCA-groups-Strategy-oca-reduce-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-OCA-groups-Strategy-oca-reduce-2.png)

```javascript
//@version=5
strategy("Multiple TP Demo", overlay = true)

var float stop   = na
var float limit1 = na
var float limit2 = na

bool longCondition = ta.crossover(ta.sma(close, 5), ta.sma(close, 9))
if longCondition and strategy.position_size == 0
    stop   := close * 0.99
    limit1 := close * 1.01
    limit2 := close * 1.02
    strategy.entry("Long",  strategy.long, 6)
    strategy.order("Stop",  strategy.short, stop = stop, qty = 6, oca_name = "Bracket", oca_type = strategy.oca.reduce)
    strategy.order("Limit 1", strategy.short, limit = limit1, qty = 3, oca_name = "Bracket", oca_type = strategy.oca.reduce)
    strategy.order("Limit 2", strategy.short, limit = limit2, qty = 6, oca_name = "Bracket", oca_type = strategy.oca.reduce)

bool showPlot = strategy.position_size != 0
plot(showPlot ? stop   : na, "Stop",    color.red,   style = plot.style_linebr)
plot(showPlot ? limit1 : na, "Limit 1", color.green, style = plot.style_linebr)
plot(showPlot ? limit2 : na, "Limit 2", color.green, style = plot.style_linebr)
```

- 注意：

  我们将`qty`“Limit 2”订单的 值从 3 更改为 6，因为该策略在执行“Limit 1”订单时会将其价值减少 3。保留`qty`值 3 会导致其降至 0，并且在填写第一个限价订单后永远不会填写。



### [`strategy.oca.none` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id27)

strategy.oca.none OCA 类型指定订单独立于任何 OCA 组执行[。该值是](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}oca{dot}none)[strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order) 和[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry) 下单命令`oca_type` 的默认值。

笔记

如果两个下单命令具有相同`oca_name`但不同的`oca_type`值，则该策略认为它们来自两个不同的组。即，OCA 组不能组合 [strategy.oca.cancel](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}oca{dot}cancel)、 [strategy.oca.reduce](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}oca{dot}reduce)和[strategy.oca.none](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}oca{dot}none) OCA 类型。



## [货币](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id28)

Pine Script™ 策略可以使用与其计算工具不同的基础货币。用户可以通过在 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)函数中包含一个`currency.*`变量作为参数来指定模拟账户的基础货币 ，这将更改脚本的 [strategy.account_currency](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}account_currency) 值。策略的默认值为，这意味着脚本使用图表上工具的基础货币。`currency``currency``currency.NONE`

当策略脚本使用指定的基础货币时，它将模拟利润乘以前一个交易日的 FX_IDC 汇率。例如，下面的策略下一个标准手（100,000 单位）的挂单，在最后 500 个图表柱上每个都设定利润目标和 1 点止损，然后将净利润与反向日收盘价一起绘制出来。符号在单独的窗格中。我们已将基础货币设置为`currency.EUR`。当我们将此脚本添加到 FX_IDC:EURUSD 时，两个图对齐，确认该策略使用该交易品种前一天的汇率进行计算：

![../_images/Strategies-Currency-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Currency-1.png)

```javascript
//@version=5
strategy("Currency Test", currency = currency.EUR)

if last_bar_index - bar_index < 500
    strategy.entry("LE", strategy.long, 100000)
    strategy.exit("LX", "LE", profit = 1, loss = 1)
plot(math.abs(ta.change(strategy.netprofit)), "1 Point profit", color = color.fuchsia, linewidth = 4)
plot(request.security(syminfo.tickerid, "D", 1 / close)[1], "Previous day's inverted price", color = color.lime)
```

- 注意：

  当交易时间范围高于每日时，该策略将使用柱线收盘前一个交易日的收盘价来计算历史柱线的交叉汇率。例如，在每周时间范围内，交叉汇率将基于上周四的收盘价，但该策略仍将使用实时柱线的每日收盘价。



## [改变计算行为](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id29)

策略在图表中所有可用的历史柱上执行，然后在新数据可用时自动继续实时计算。默认情况下，策略脚本仅对每个已确认的柱计算一次。我们可以通过更改[策略（）](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)函数的参数 或单击脚本“属性”选项卡的“重新计算”部分中的复选框来更改此行为。



### [`calc_on_every_tick` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id30)

`calc_on_every_tick`是一个可选设置，用于控制实时数据的计算行为。启用此参数后，脚本将在每个新的价格变动时重新计算其值。默认情况下，其值为 false，这意味着脚本仅在确认柱后执行计算。

启用此计算行为在前向测试时可能特别有用，因为它有利于精细的实时策略模拟。然而，值得注意的是，这种行为会在实时和历史模拟之间引入数据差异，因为历史柱不包含报价信息。用户应谨慎对待此设置，因为数据差异可能会导致策略重新绘制其历史记录。

```
close`每次达到输入的`highest`或 值时，以下脚本将模拟一个新订单。由于在策略声明中启用，因此脚本将在编译后在每个新的实时价格变动上模拟新订单：`lowest``length``calc_on_every_tick
Pine Script™
Copied//@version=5
strategy("Donchian Channel Break", overlay = true, calc_on_every_tick = true, pyramiding = 20)

int length = input.int(15, "Length")

float highest = ta.highest(close, length)
float lowest  = ta.lowest(close, length)

if close == highest
    strategy.entry("Buy", strategy.long)
if close == lowest
    strategy.entry("Sell", strategy.short)

//@variable The starting time for real-time bars.
var realTimeStart = timenow

// Color the background of real-time bars.
bgcolor(time_close >= realTimeStart ? color.new(color.orange, 80) : na)

plot(highest, "Highest", color = color.lime)
plot(lowest, "Lowest", color = color.red)
```

- 注意：

  该脚本在其声明中使用`pyramiding`值 20，这允许策略最多模拟同一方向的 20 笔交易。为了直观地划分策略将哪些柱形处理为实时柱形，脚本为自上次编译以来所有柱形的背景 [着色](https://www.tradingview.com/pine-script-reference/v5/#var_timenow) 。

将脚本应用到图表并让它计算一些实时柱后，我们可能会看到如下输出：

![../_images/Strategies-Altering-calculation-behavior-Calc-on-every-tick-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Altering-calculation-behavior-Calc-on-every-tick-1.png)

该脚本在条件有效的每个新的实时报价上放置“买入”订单，从而导致每条柱有多个订单。然而，不熟悉此行为的用户在重新编译脚本后看到策略的输出发生变化可能会感到惊讶，因为之前执行实时计算的柱现在是历史柱，它们不保存报价信息：

![../_images/Strategies-Altering-calculation-behavior-Calc-on-every-tick-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Altering-calculation-behavior-Calc-on-every-tick-2.png)



### [`calc_on_order_fills` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id31)

可选`calc_on_order_fills`设置允许在模拟订单执行后立即重新计算策略，这允许脚本使用更细粒度的价格并下额外的订单，而无需等待柱线被确认。

启用此设置可以为脚本提供附加数据，否则这些数据在柱关闭后才可用，例如未确认柱上模拟头寸的当前平均价格。

下面的示例显示了一个使用启用声明的简单策略，当[strategy.position_size](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}position_size)为0 `calc_on_order_fills`时模拟“买入”订单。 该脚本使用[strategy.position_avg_price](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}position_avg_price) 来计算a和并在价格交叉时模拟“退出”订单，无论价格如何该栏是否已确认。因此，一旦触发退出，策略就会重新计算并下达新的入场订单，因为strategy.position_size[再次](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}position_size) 等于0。策略在退出发生后下订单，并在退出后的下一个价格变动时执行该订单。退出，这将是柱的 OHLC 值之一，具体取决于模拟的柱内运动：`stopLoss``takeProfit`

![../_images/Strategies-Altering-calculation-behavior-Calc-on-order-fills-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Altering-calculation-behavior-Calc-on-order-fills-1.png)

```javascript
//@version=5
strategy("Intrabar exit", overlay = true, calc_on_order_fills = true)

float stopSize   = input.float(5.0, "SL %", minval = 0.0) / 100.0
float profitSize = input.float(5.0, "TP %", minval = 0.0) / 100.0

if strategy.position_size == 0.0
    strategy.entry("Buy", strategy.long)

float stopLoss   = strategy.position_avg_price * (1.0 - stopSize)
float takeProfit = strategy.position_avg_price * (1.0 + profitSize)

strategy.exit("Exit", stop = stopLoss, limit = takeProfit)
```

- 注意：

  关闭后`calc_on_order_fills`，相同的策略在触发退出订单后将仅进入一根柱线。首先，会发生中线退出，但不会出现进场指令。然后，该策略将在柱线收盘后模拟入场订单，并将在下一个价格变动（即下一个柱线开盘）时填充该订单。

值得注意的是，启用`calc_on_order_fills`可能会产生不切实际的策略结果，因为经纪商模拟器可能会假设实时交易时不可能的订单价格。用户必须谨慎对待此设置，并仔细考虑脚本中的逻辑。

当脚本加载到图表上时，以下示例模拟从last_bar_index开始的25条柱窗口中每次新订单成交和柱确认后的“买入”订单 [。](https://www.tradingview.com/pine-script-reference/v5/#var_last_bar_index)启用该设置后，该策略会模拟每个柱形图的四个条目，因为模拟器认为每个柱形图有四个价格变动（开盘价、最高价、最低价、收盘价），这是不切实际的行为，因为订单通常不可能在准确的位置填写柱线的高点或低点：

![../_images/Strategies-Altering-calculation-behavior-Calc-on-order-fills-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Altering-calculation-behavior-Calc-on-order-fills-2.png)

```javascript
//@version=5
strategy("buy on every fill", overlay = true, calc_on_order_fills = true, pyramiding = 100)

if last_bar_index - bar_index <= 25
    strategy.entry("Buy", strategy.long)
```



### [`process_orders_on_close` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id32)

默认策略行为模拟每个柱线收盘时的订单，这意味着最早执行订单并执行策略计算和警报的机会是在下一个柱线开盘时。交易者可以通过启用该设置来更改此行为，以使用每个柱的收盘价来处理策略`process_orders_on_close`。

在回测手动策略（交易者在柱线收盘前退出头寸）或非 24x7 市场中的算法交易者设置盘后交易功能以便收盘后发送的警报仍有希望在后续交易之前成交的情况下，此行为非常有用。天。

- 注意：

  重要的是要意识到，`process_orders_on_close`在实时交易环境中使用策略可能会导致重新绘制策略，因为收盘时仍然会出现柱线收盘警报，并且订单可能要等到下一个市场开盘时才会填写。



## [模拟交易成本](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id33)

为了使策略绩效报告包含相关的、有意义的数据，交易者应努力在策略结果中考虑潜在的现实成本。忽视这一点可能会让交易者对策略表现产生不切实际的看法，并损害测试结果的可信度。如果不对其交易相关的潜在成本进行建模，交易者可能会高估策略的历史盈利能力，从而可能导致实时交易中的决策不理想。 Pine Script™ 策略包括用于在绩效结果中模拟交易成本的输入和参数。



### [委员会](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id34)

佣金是指经纪商/交易所在执行交易时收取的费用。根据经纪商/交易所的不同，有些经纪商/交易所可能会对每笔交易或合约/股票/手数/单位收取固定费用，而另一些经纪商/交易所可能会收取总交易价值的一定百分比。用户可以通过在[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)`commission_type`函数中包含 参数 或在策略设置的“属性”选项卡中设置“佣金”输入来设置其策略的佣金属性。`commission_value`

以下脚本是一个简单的策略，当`close`等于`highest`的值时，模拟 2% 权益的“多头”头寸`length`，并在等于该值时平仓`lowest`：

![../_images/策略-模拟-交易-成本-Commission-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Simulating-trading-costs-Commission-1.png)

```javascript
//@version=5
strategy("Commission Demo", overlay=true, default_qty_value = 2, default_qty_type = strategy.percent_of_equity)

length = input.int(10, "Length")

float highest = ta.highest(close, length)
float lowest  = ta.lowest(close, length)

switch close
    highest => strategy.entry("Long", strategy.long)
    lowest  => strategy.close("Long")

plot(highest, color = color.new(color.lime, 50))
plot(lowest, color = color.new(color.red, 50))
```

在检查策略测试器中的结果后，我们发现该策略在测试范围内的净值正增长为 17.61%。然而，回测结果并未考虑经纪商/交易所可能收取的费用。让我们看看当我们在策略模拟中的每笔交易中加入少量佣金时，这些结果会发生什么。在这个例子中，我们在[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明中包含了 and ，这意味着它将模拟所有执行订单的 1% 佣金：`commission_type = strategy.commission.percent``commission_value = 1`

![../_images/策略-模拟-交易-成本-Commission-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Simulating-trading-costs-Commission-2.png)

```javascript
//@version=5
strategy(
     "Commission Demo", overlay=true, default_qty_value = 2, default_qty_type = strategy.percent_of_equity,
     commission_type = strategy.commission.percent, commission_value = 1
 )

length = input.int(10, "Length")

float highest = ta.highest(close, length)
float lowest  = ta.lowest(close, length)

switch close
    highest => strategy.entry("Long", strategy.long)
    lowest  => strategy.close("Long")

plot(highest, color = color.new(color.lime, 50))
plot(lowest, color = color.new(color.red, 50))
```

正如我们在上面的例子中看到的，在回测中应用 1% 的佣金后，该策略模拟净利润显着下降，仅为 1.42%，并且股票曲线波动更大，最大回撤也更高，这凸显了佣金模拟的影响策略的测试结果。



### [滑点和未履行限额](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id35)

在现实交易中，由于波动性、流动性、订单规模和其他市场因素，经纪商/交易所可能会以与交易者预期略有不同的价格执行订单，这可能会对策略的表现产生深远的影响。经纪商/交易所执行交易的预期价格与实际价格之间的差异就是我们所说的滑点。滑点是动态的且不可预测的，因此无法精确模拟。然而，在回溯测试或前向测试期间考虑每笔交易的少量滑点可能有助于结果更好地符合现实。用户可以通过`slippage`在 [策略（）](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) 声明中包含参数或在策略设置的“属性”选项卡中设置“滑点”输入，在其策略结果中对滑点进行建模，大小为固定数量的价格变动。

以下示例演示了滑点模拟如何影响策略测试中市价订单的执行价格。当市场价格高于 EMA 且 EMA 上升时，下面的脚本会下达 2% 股票的“买入”市价单；当价格低于 EMA 且下降时，则平仓。我们已将其纳入 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)函数中 ，该函数声明每个模拟订单的价格将沿交易方向滑动 20 个报价点。该脚本使用 [strategy.opentrades.entry_bar_index()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}opentrades{dot}entry_bar_index) 和[strategy.closetrades.exit_bar_index()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}closedtrades{dot}exit_bar_index) 来获取和，并利用它来获取订单的 。当柱索引位于 时，是第一个 [strategy.opentrades.entry_price()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}opentrades{dot}entry_price)值。处，是 上次平仓交易的[strategy.closetrades.exit_price()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}closedtrades{dot}exit_price)值。该脚本绘制了预期成交价格以及滑点后的模拟成交价格，以直观地比较差异：`slippage = 20``entryIndex``exitIndex``fillPrice``entryIndex``fillPrice``exitIndex``fillPrice`

![../_images/Strategies-模拟交易成本-Slippage-and-unfilled-limits-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Simulating-trading-costs-Slippage-and-unfilled-limits-1.png)

```javascript
//@version=5
strategy(
     "Slippage Demo", overlay = true, slippage = 20,
     default_qty_value = 2, default_qty_type = strategy.percent_of_equity
 )

int length = input.int(5, "Length")

//@variable Exponential moving average with an input `length`.
float ma = ta.ema(close, length)

//@variable Returns `true` when `ma` has increased and `close` is greater than it, `false` otherwise.
bool longCondition = close > ma and ma > ma[1]
//@variable Returns `true` when `ma` has decreased and `close` is less than it, `false` otherwise.
bool shortCondition = close < ma and ma < ma[1]

// Enter a long market position on `longCondition`, close the position on `shortCondition`.
if longCondition
    strategy.entry("Buy", strategy.long)
if shortCondition
    strategy.close("Buy")

//@variable The `bar_index` of the position's entry order fill.
int entryIndex = strategy.opentrades.entry_bar_index(0)
//@variable The `bar_index` of the position's close order fill.
int exitIndex  = strategy.closedtrades.exit_bar_index(strategy.closedtrades - 1)

//@variable The fill price simulated by the strategy.
float fillPrice = switch bar_index
    entryIndex => strategy.opentrades.entry_price(0)
    exitIndex  => strategy.closedtrades.exit_price(strategy.closedtrades - 1)

//@variable The expected fill price of the open market position.
float expectedPrice = fillPrice ? open : na

color expectedColor = na
color filledColor   = na

if bar_index == entryIndex
    expectedColor := color.green
    filledColor   := color.blue
else if bar_index == exitIndex
    expectedColor := color.red
    filledColor   := color.fuchsia

plot(ma, color = color.new(color.orange, 50))

plotchar(fillPrice ? open : na, "Expected fill price", "—", location.absolute, expectedColor)
plotchar(fillPrice, "Fill price after slippage", "—", location.absolute, filledColor)
```

- 注意：

  由于该策略对所有订单成交应用恒定滑点，因此某些订单可能会在模拟中的蜡烛范围之外成交。因此，用户应谨慎使用此设置，因为过度的模拟滑点可能会产生不切实际的更差的测试结果。

一些交易者可能认为他们可以通过使用限价单来避免滑点的不利影响，因为与市价单不同，限价单不能以比指定值更差的价格执行。然而，根据现实市场的状况，即使市场价格达到订单价格，限价订单也有可能无法成交，因为限价订单只有在证券具有足够的流动性和价格行为时才能成交。价值。为了考虑回测中未成交订单的可能性，用户可以 `backtest_fill_limits_assumption`在声明语句中指定该值，或使用“属性”选项卡中输入的“验证限价订单价格”来指示策略仅在价格变动后才填写限价订单过去订单价格的指定数量的价格变动。

以下示例在柱上放置 2% 净值的限价单，`hlcc4`此时`high`是`highest` 过去`length`柱的值并且没有待处理的条目。当`low`为该值时，该策略会平仓并取消所有订单`lowest`。每次策略触发订单时，它都会在 处绘制一条水平线`limitPrice`，并在每个柱上更新该水平线，直到平仓或取消订单：

![../_images/Strategies-模拟交易成本-Slippage-and-unfilled-limits-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Simulating-trading-costs-Slippage-and-unfilled-limits-2.png)

```javascript
//@version=5
strategy(
     "Verify price for limits example", overlay = true,
     default_qty_type = strategy.percent_of_equity, default_qty_value = 2
 )

int length = input.int(25, title = "Length")

//@variable Draws a line at the limit price of the most recent entry order.
var line limitLine = na

// Highest high and lowest low
highest = ta.highest(length)
lowest  = ta.lowest(length)

// Place an entry order and draw a new line when the the `high` equals the `highest` value and `limitLine` is `na`.
if high == highest and na(limitLine)
    float limitPrice = hlcc4
    strategy.entry("Long", strategy.long, limit = limitPrice)
    limitLine := line.new(bar_index, limitPrice, bar_index + 1, limitPrice)

// Close the open market position, cancel orders, and set `limitLine` to `na` when the `low` equals the `lowest` value.
if low == lowest
    strategy.cancel_all()
    limitLine := na
    strategy.close_all()

// Update the `x2` value of `limitLine` if it isn't `na`.
if not na(limitLine)
    limitLine.set_x2(bar_index + 1)

plot(highest, "Highest High", color = color.new(color.green, 50))
plot(lowest, "Lowest Low", color = color.new(color.red, 50))
```

默认情况下，脚本假定所有限价单都保证成交。然而，现实交易中的情况往往并非如此。让我们在限价订单中添加价格验证，以解决可能未成交的订单。在这个例子中，我们已经包含在 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)函数调用中。正如我们所看到的，使用限价验证会省略一些模拟订单成交并更改其他订单的时间，因为挂单现在只能在价格突破限价三个跳动点后才能成交：`backtest_fill_limits_assumption = 3`

![../_images/Strategies-模拟交易成本-Slippage-and-unfilled-limits-3.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Simulating-trading-costs-Slippage-and-unfilled-limits-3.png)

笔记

值得注意的是，尽管限价验证改变了某些订单执行的*时间*，但该策略以相同的*价格*模拟它们。这种“时间扭曲”效应是一种折衷方案，可以保留已验证限价订单的价格，但它可能会导致策略有时模拟其填充，而这在现实世界中不一定是可能的。用户在分析策略结果时应谨慎对待此设置并了解其局限性。



## [风险管理](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id36)

设计一种表现良好的策略是一项具有挑战性的任务，更不用说在广泛的市场中执行的策略了。大多数是针对特定市场模式/条件而设计的，当应用于其他数据时可能会产生无法控制的损失。因此，策略的风险管理质量对其绩效至关重要。用户可以使用带有前缀的特殊命令在策略脚本中设置风险管理标准`strategy.risk`。

策略可以包含任意数量的风险管理标准的任意组合。所有风险管理命令都会在每个价格变动和订单执行事件上执行，无论策略的计算行为发生任何变化。无法在脚本运行时禁用任何这些命令。无论风险规则位于何处，它都将始终适用于策略，除非用户从代码中删除调用。

- [Strategy.risk.allow_entry_in()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}risk{dot}allow_entry_in)

  [该命令会覆盖strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)命令允许的市场方向 。当用户使用此函数指定交易方向（例如， [strategy.direction.long](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}direction{dot}long)）时，策略将仅在该方向上输入交易。但是，需要注意的是，如果脚本在有未平仓头寸的情况下调用相反方向的入场命令，则该策略将模拟市价订单以退出该头寸。

- [Strategy.risk.max_cons_loss_days()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}risk{dot}max_cons_loss_days)

  在策略模拟指定数量的交易日连续亏损后，此命令会取消所有挂单、平仓市场头寸并停止所有其他交易操作。

- [Strategy.risk.max_drawdown()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}risk{dot}max_drawdown)

  在策略的回撤达到函数调用中指定的金额后，此命令将取消所有挂单、平仓市场头寸并停止所有其他交易操作。

- [Strategy.risk.max_intraday_filled_orders()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}risk{dot}max_intraday_filled_orders)

  此命令指定每个交易日（或每个图表栏，如果时间范围高于每日）执行订单的最大数量。一旦该策略执行了当天的最大数量的订单，它就会取消所有挂单，平仓，并停止交易活动，直到当前交易时段结束。

- [Strategy.risk.max_intraday_loss()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}risk{dot}max_intraday_loss)

  此命令控制策略在每个交易日（或每个图表条，如果时间范围高于每日）允许的最大损失。当策略的损失达到此阈值时，它将取消所有挂单，关闭公开市场头寸，并停止所有交易活动，直到当前交易时段结束。

- [Strategy.risk.max_position_size()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}risk{dot}max_position_size)

  [该命令指定使用strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)命令时可能的最大头寸大小 。如果进场命令的数量导致市场头寸超过此阈值，策略将减少订单数量，以使结果头寸不超过限制。



## [利润](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id37)

保证金是交易者必须在其账户中作为抵押品持有的市场头寸的最低百分比，以从经纪人处接收和维持贷款，以实现其所需的杠杆率。[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明的 `margin_long`和参数 以及脚本设置的“属性”选项卡中的“多头/空头头寸保证金”输入允许策略指定多头和空头头寸的保证金百分比。例如，如果交易者将多头头寸的保证金设置为 25%，则他们必须有足够的资金来覆盖未平仓多头头寸的 25%。这一保证金百分比还意味着交易者有可能将高达 400% 的资产用于交易。`margin_short`

如果策略的模拟资金无法弥补保证金交易的损失，经纪商模拟器会触发追加保证金通知，强制清算全部或部分头寸。模拟器清算的合约/股票/手数/单位的确切数量是弥补损失所需的四倍，以防止后续金条持续追加保证金。模拟器使用以下算法计算金额：

1. 计算该头寸花费的资本金额：`Money Spent = Quantity * Entry Price`
2. 计算证券的市场价值 (MVS)：`MVS = Position Size * Current Price`
3. `MVS`将未平仓利润计算为和之间的差值。如果头寸是空头，我们将其乘以-1。`Money Spent`
4. 计算策略的股权价值：`Equity = Initial Capital + Net Profit + Open Profit`
5. 计算保证金比例：`Margin Ratio = Margin Percent / 100`
6. 计算保证金值，即平仓交易者部分头寸所需的现金：`Margin = MVS * Margin Ratio`
7. 计算可用资金：`Available Funds = Equity - Margin`
8. 计算交易者损失的总金额：`Loss = Available Funds / Margin Ratio`
9. 计算交易者需要清算多少合约/股票/手数/单位来弥补损失。我们将此值截断为与当前交易品种的最小头寸大小相同的小数精度：`Cover Amount = TRUNCATE(Loss / Current Price).`
10. 计算经纪人将清算多少单位来弥补损失：`Margin Call = Cover Amount * 4`

为了详细检查此计算，让我们将内置的超级趋势策略添加到 NASDAQ:TSLA 图表上的 1D 时间范围，并将“订单大小”设置为权益的 300%，将“多头头寸保证金”设置为 25%。策略设置的“属性”选项卡：

![../_images/Strategies-Margin-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Margin-1.png)

第一次入场发生在 2010 年 9 月 16 日柱的开盘价。该策略以 4.43 美元（入场价）买入 682,438 股（头寸规模）。然后，在2010年9月23日，当价格跌至3.9（当前价格）时，模拟器通过追加保证金强制平仓了111,052股。

```javascript
Money spent: 682438 * 4.43 = 3023200.34
MVS: 682438 * 3.9 = 2661508.2
Open Profit: −361692.14
Equity: 1000000 + 0 − 361692.14 = 638307.86
Margin Ratio: 25 / 100 = 0.25
Margin: 2661508.2 * 0.25 = 665377.05
Available Funds: 638307.86 - 665377.05 = -27069.19
Money Lost: -27069.19 / 0.25 = -108276.76
Cover Amount: TRUNCATE(-108276.76 / 3.9) = TRUNCATE(-27763.27) = -27763
Margin Call Size: -27763 * 4 = - 111052
```



## [策略提醒](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id38)

常规 Pine Script™ 指标有两种不同的机制来设置自定义警报条件：alertcondition [()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition) 函数，跟踪每个函数调用的一个特定条件；[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert) 函数，同时跟踪其所有调用，但在以下方面提供了更大的灵活性：来电数量、警报消息等。

Pine Script™ 策略不适用于 [alertcondition()调用，但它们支持通过](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)函数 生成自定义警报 。除此之外，每个创建订单的函数还带有自己的内置警报功能，不需要任何额外的代码来实现。因此，任何使用下单命令的策略都可以在订单执行时发出警报。我们的用户手册中[警报](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#pagealerts)页面的订单执行事件部分 描述了此类内置策略警报的精确机制 。

当策略`alert()`同时使用创建订单的函数和函数时，警报创建对话框提供了触发条件之间的选择：它可以在`alert()`事件、订单执行事件或两者上触发。

对于许多交易策略来说，触发条件和实时交易之间的延迟可能是一个关键的性能因素。默认情况下，策略脚本只能 在实时柱线收盘时 执行[alert()函数调用，考虑它们使用](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)[alert.freq_once_per_bar_close](https://www.tradingview.com/pine-script-reference/v5/#var_alert{dot}freq_once_per_bar_close)`freq` ，无论调用中的参数如何。在创建警报之前，用户还可以通过 在[策略（）](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) 调用中包含或选择策略设置的“属性”选项卡中的“每次报价时重新计算”选项来更改警报频率。但是，根据脚本的不同，这也可能会对策略的行为产生不利影响，因此在使用此方法时请务必谨慎并注意其局限性。`calc_on_every_tick = true`

当向第三方发送警报以实现策略自动化时，我们建议使用订单填写警报而不是[alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert) 函数，因为它们没有相同的限制；来自订单执行事件的警报立即执行，不受脚本`calc_on_every_tick`设置的影响。用户可以通过编译器注释设置订单执行警报的默认消息`@strategy_alert_message`。此注释提供的文本将填充“消息”字段，以便填写警报创建对话框。

以下脚本显示了默认订单填写警报消息的简单示例。在[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句上方 ，它与消息文本中的交易操作、头寸规模、股票代码和填充价格值的*占位符*`@strategy_alert_message`一起使用：

```javascript
//@version=5
//@strategy_alert_message {{strategy.order.action}} {{strategy.position_size}} {{ticker}} @ {{strategy.order.price}}
strategy("Alert Message Demo", overlay = true)
float fastMa = ta.sma(close, 5)
float slowMa = ta.sma(close, 10)

if ta.crossover(fastMa, slowMa)
    strategy.entry("buy", strategy.long)

if ta.crossunder(fastMa, slowMa)
    strategy.entry("sell", strategy.short)

plot(fastMa, "Fast MA", color.aqua)
plot(slowMa, "Slow MA", color.orange)
```

当用户从“条件”下拉选项卡中选择其名称时，此脚本将使用其默认消息填充警报创建对话框：

![../_images/Strategies-Strategy-alerts-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Strategy-alerts-1.png)

警报触发后，策略将使用相应的值填充警报消息中的占位符。例如：

![../_images/Strategies-Strategy-alerts-2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Strategies-Strategy-alerts-2.png)



## [测试策略注意事项](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id39)

交易者通常会在历史和实时市场条件下测试和调整他们的策略，因为许多人认为分析结果可以提供有关策略特征、潜在弱点以及可能的未来潜力的宝贵见解。然而，交易者应始终意识到模拟策略结果的偏差和局限性，特别是在使用结果支持实时交易决策时。本节概述了与策略验证和调整相关的一些注意事项以及减轻其影响的可能解决方案。

笔记

虽然根据现有数据测试策略可能会为交易者提供有关策略质量的有用信息，但重要的是要注意，过去和现在都不能保证未来。金融市场可能会快速且不可预测地变化，这可能会导致策略承受无法控制的损失。此外，模拟结果可能无法完全考虑可能影响交易表现的其他现实因素。因此，我们建议交易者在评估回溯测试和前向测试时彻底了解局限性和风险，并在验证过程中将它们视为“整体的一部分”，而不是仅根据结果做出决策。



### [回溯测试和前向测试](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id40)

回溯测试是交易者通过模拟和分析历史市场数据的过去结果来评估交易策略或模型的历史表现的技术；该技术假设对过去数据的策略结果进行分析可以深入了解其优势和劣势。在回测时，许多交易者会调整策略的参数以尝试优化其结果。历史结果的分析和优化可以帮助交易者更深入地了解策略。然而，交易者在根据优化回测结果做出决策时应始终了解风险和限制。

与回溯测试并行，审慎的交易系统开发通常还涉及将实时分析作为前瞻性评估交易系统的工具。前瞻性测试旨在衡量策略在实时、真实市场条件下的表现，其中交易成本、滑点和流动性等因素可能会对其表现产生重大影响。前向测试具有不受某些类型偏差（例如，前瞻偏差或“未来数据泄漏”）影响的明显优点，但缺点是要测试的数据量受到限制。因此，它通常不是用于策略验证的独立解决方案，但它可以提供有关策略在当前市场条件下的表现的有用见解。

回溯测试和前向测试是同一枚硬币的两个方面，因为这两种方法都旨在验证策略的有效性并确定其优点和缺点。通过结合回溯测试和前瞻测试，交易者也许能够弥补一些限制，并更清晰地了解其策略的表现。然而，交易者有责任清理他们的策略和评估流程，以确保见解尽可能与现实保持一致。



### [前瞻偏差](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id41)

回测某些策略（即请求备用时间范围数据、使用重绘变量（例如[timenow](https://www.tradingview.com/pine-script-reference/v5/#var_timenow)）或更改柱内订单填充的计算行为的策略）的一个典型问题是在评估期间未来数据泄漏到过去，这称为前瞻偏差。这种偏差不仅是导致不切实际的策略结果的常见原因，因为未来实际上是事先无法得知的，而且它也是策略重绘的典型原因之一。交易者通常可以通过前向测试他们的系统来确认这种偏差，因为前瞻偏差不适用于当前柱线之外不存在已知数据的实时数据。用户可以通过确保不使用将未来泄漏到过去的重绘变量来消除策略中的这种偏差，`request.*()`函数不包括 [barmerge.lookahead_on](https://www.tradingview.com/pine-script-reference/v5/#var_barmerge{dot}lookahead_on) 而不偏移数据系列，如 [重绘](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#pagerepainting) 页面的[这一](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html?highlight=barmerge#future-leak-with-request-security)部分所述，他们使用现实的计算行为。



### [选择偏差](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id42)

选择偏差是许多交易者在测试策略时遇到的常见问题。当交易者仅分析特定工具或时间范围的结果而忽略其他工具时，就会发生这种情况。这种偏差可能会导致策略稳健性的扭曲，从而可能影响交易决策和性能优化。交易者可以通过在多个、理想情况下多样化的交易品种和时间框架上评估其策略来减少选择偏差的影响，因此不要忽视其分析或精选测试范围中的不良表现结果。



### [过度拟合](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#id43)

优化回测时的一个常见陷阱是可能出现过度拟合（“曲线拟合”），当策略针对特定数据量身定制并且无法很好地概括新的、未见过的数据时，就会发生这种情况。一种广泛使用的方法有助于减少过度拟合的可能性并促进更好的泛化，即将仪器的数据分成两个或多个部分，以测试用于优化的样本之外的策略，也称为“样本内”(IS) 和“样本外”（OOS）回测。在这种方法中，交易者使用 IS 数据进行策略优化，而 OOS 部分用于在新数据上测试和评估 IS 优化的性能，而无需进一步优化。虽然这种方法和其他更强大的方法可以让您了解优化后策略的表现，但交易者应该谨慎行事，因为未来本质上是不可知的。无论用于测试和优化的数据如何，任何交易策略都无法保证未来的表现。