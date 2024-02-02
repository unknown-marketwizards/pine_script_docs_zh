# 内置

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Built-ins.html#id1)

Pine Script™ 具有数百个*内置*变量和函数。它们为您的脚本提供有价值的信息并为您进行计算，从而使您无需编写代码。您对内置函数了解得越多，您就能用 Pine 脚本做更多的事情。

在本页中，我们概述了 Pine Script™ 的一些内置变量和函数。本手册中涉及特定主题的页面将更详细地介绍它们。

所有内置变量和函数均在 Pine Script™ [v5 参考手册](https://www.tradingview.com/pine-script-reference/v5/)中定义。它被称为“参考手册”，因为它是 Pine Script™ 语言的权威参考。无论您是初学者还是专家，它都是您在 Pine 中编码时随时陪伴的必备工具。如果您正在学习您的第一门编程语言，请将[参考手册](https://www.tradingview.com/pine-script-reference/v5/)作为 您的朋友。忽略它将使您使用 Pine Script™ 的编程体验变得困难和令人沮丧——就像使用任何其他编程语言一样。

同一族中的变量和函数共享相同的*命名空间*，即函数名称的前缀。例如，ta.sma() 函数位于命名空间中，[代表](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}sma)`ta`“技术分析”。命名空间可以包含变量和函数。

有些变量也有函数版本，例如：

- ta.tr变量返回当前柱的[“](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}tr)真实范围”。 ta.tr [(true)](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}tr) 函数调用也返回“真实范围”，但是当 通常需要计算它的前一个[收盘值是](https://www.tradingview.com/pine-script-reference/v5/#var_close)[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)时，它会改为使用进行计算。`high - low`
- 时间[变量](https://www.tradingview.com/pine-script-reference/v5/#var_time)给出当前柱的[开盘](https://www.tradingview.com/pine-script-reference/v5/#var_open)时间 。 time [(timeframe)](https://www.tradingview.com/pine-script-reference/v5/#fun_time)函数返回 指定的柱线[开盘](https://www.tradingview.com/pine-script-reference/v5/#var_open)时间`timeframe`，即使图表的时间范围不同。 time [(timeframe, session)](https://www.tradingview.com/pine-script-reference/v5/#fun_time)函数返回 指定柱的[开盘](https://www.tradingview.com/pine-script-reference/v5/#var_open)时间`timeframe`，但前提是该时间在指定`session`时间内。 time [(timeframe, session, timezone)](https://www.tradingview.com/pine-script-reference/v5/#fun_time)函数返回 指定的柱线[开盘](https://www.tradingview.com/pine-script-reference/v5/#var_open)时间`timeframe`，但前提是该时间`session`在指定的时间内`timezone`。



## [内置变量](https://www.tradingview.com/pine-script-docs/en/v5/language/Built-ins.html#id2)

内置变量的存在有不同的目的。以下是一些示例：

- 与价格和成交量相关的变量： [开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open)、 [最高价](https://www.tradingview.com/pine-script-reference/v5/#var_high)、 [最低价](https://www.tradingview.com/pine-script-reference/v5/#var_low)、 [收盘价](https://www.tradingview.com/pine-script-reference/v5/#var_close)、 [hl2](https://www.tradingview.com/pine-script-reference/v5/#var_hl2)、 [hlc3](https://www.tradingview.com/pine-script-reference/v5/#var_hlc3)、 [ohlc4](https://www.tradingview.com/pine-script-reference/v5/#var_ohlc4)和 [成交量](https://www.tradingview.com/pine-script-reference/v5/#var_volume)。
- 命名空间中与符号相关的信息`syminfo`： [syminfo.basecurrency](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}basecurrency)、 [syminfo.currency](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}currency)、 [syminfo.description](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}description)、 [syminfo.mintick](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}mintick)、 [syminfo.pointvalue](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}pointvalue)、 [syminfo.prefix](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}prefix)、 [syminfo.root](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}root)、 [syminfo.session](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}session)、 [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}ticker)、 [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}tickerid)、 [syminfo。时区](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}timezone)和 [syminfo.type](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}type)。
- 命名空间中的时间帧（又名“间隔”或“分辨率”，例如 15 秒、30 分钟、60 分钟、1D、3M）变量`timeframe`： [timeframe.isseconds](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isseconds)、 [timeframe.is](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isminutes)分钟、 [timeframe.isintraday](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isintraday)、 [timeframe.isdaily](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isdaily)、 [timeframe.isweekly](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isweekly)、 [timeframe。 ismonthly](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}ismonthly)、 [timeframe.isdwm](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isdwm)、 [timeframe.multiplier](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}multiplier)和 [timeframe.period](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}period)。
- 命名空间中的 Bar 状态`barstate`（请参阅[Bar states](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Bar_states.html#pagebarstates)页面）： [barstate.isconfirmed](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isconfirmed)、 [barstate.isfirst](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isfirst)、 [barstate.ishistory](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}ishistory)、 [barstate.islast](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islast)、 [barstate.islastconfirmedhistory](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}islastconfirmedhistory)、 [barstate.isnew](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isnew)和 [barstate.isrealtime](https://www.tradingview.com/pine-script-reference/v5/#var_barstate{dot}isrealtime)。
- 命名空间中与策略相关的信息`strategy`： [strategy.equity](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}equity)、 [strategy.initial_capital](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}initial_capital)、 [strategy.grossloss](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}grossloss)、 [strategy.grossprofit](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}grossprofit)、 [strategy.wintrades](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}wintrades)、 [strategy.losstrades](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}losstrades)、 [strategy.position_size](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}position_size)、 [strategy.position_avg_price](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}position_avg_price)、 [strategy.wintrades](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}wintrades)等。



## [内置函数](https://www.tradingview.com/pine-script-docs/en/v5/language/Built-ins.html#id3)

许多函数用于返回结果。以下是一些示例：

- 命名空间中与数学相关的函数`math`： [math.abs()](https://www.tradingview.com/pine-script-reference/v5/#fun_math{dot}abs)、 [math.log()](https://www.tradingview.com/pine-script-reference/v5/#fun_math{dot}log)、 [math.max()](https://www.tradingview.com/pine-script-reference/v5/#fun_math{dot}max)、 [math.random()](https://www.tradingview.com/pine-script-reference/v5/#fun_math{dot}random)、 [math.round_to_mintick()](https://www.tradingview.com/pine-script-reference/v5/#fun_math{dot}round_to_mintick)等。
- 命名空间中的技术指标`ta`： [ta.sma()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}sma)、 [ta.ema()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}ema)、 [ta.macd()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}macd)、 [ta.rsi()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}rsi)、 [ta.supertrend()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}supertrend)等。
- 命名空间中常用于计算技术指标的支持函数`ta`： [ta.barssince()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}barssince)、 [ta.crossover()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}crossover)、 [ta.highest()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}highest)等。
- 从命名空间中的其他交易品种或时间范围请求数据的函数`request`： [request.dividends()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}dividends)、 [request.earnings()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}earnings)、 [request.financial()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}financial)、 [request.quandl()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}quandl)、 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)、 [request.splits()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}splits)。
- 操作`str`命名空间中字符串的函数： [str.format()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}format)、 [str.length()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}length)、 [str.tonumber()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}tonumber)、 [str.tostring()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}tostring)等。
- 用于定义脚本用户可以在脚本的“设置/输入”选项卡中修改的输入值的函数，命名空间为`input`： [input()](https://www.tradingview.com/pine-script-reference/v5/#fun_input)、 [input.color()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}color)、 [input.int()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}int)、 [input.session()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}session)、 [input。符号()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}symbol)等
- 用于操作`color`命名空间中颜色的函数： [color.from_gradient()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}from_gradient)、 [color.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}rgb)、 [color.rgb()](https://www.tradingview.com/pine-script-reference/v5/#fun_color{dot}new)等。

有些函数不返回结果，而是因其副作用而被使用，这意味着即使它们不返回结果，它们也会执行某些操作：

- 用作定义三种 Pine 脚本类型之一及其属性的声明语句的函数。每个脚本必须以调用以下函数之一开始： [indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)、 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)或 [library()](https://www.tradingview.com/pine-script-reference/v5/#fun_library)。
- 绘图或着色函数： [bgcolor()](https://www.tradingview.com/pine-script-reference/v5/#fun_bgcolor)、 [plotbar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotbar)、 [plotcandle()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotcandle)、 [plotchar()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotchar)、 [plotshape()](https://www.tradingview.com/pine-script-reference/v5/#fun_plotshape)、 [fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_fill)。
- 下单策略函数，`strategy`命名空间为： [strategy.cancel()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}cancel)、 [strategy.close()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close)、 [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry)、 [strategy.exit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}exit)、 [strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}order)等。
- 策略函数返回有关单个过去交易的信息，在`strategy`命名空间中： [strategy.closetrades.entry_bar_index()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}closedtrades{dot}entry_bar_index)、 [strategy.linedtrades.entry_price()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}closedtrades{dot}entry_price)、 [strategy.latedtrades.entry_time()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}closedtrades{dot}entry_time)、 [strategy.linedtrades.exit_bar_index()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}closedtrades{dot}exit_bar_index)、 [strategy.linedtrades.max_drawdown ()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}closedtrades{dot}max_drawdown)、 [Strategy.Closedtrades.max_runup()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}closedtrades{dot}max_runup)、 [Strategy.Closedtrades.profit()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}closedtrades{dot}profit)等
- 生成警报事件的函数： [alert()](https://www.tradingview.com/pine-script-reference/v5/#fun_alert)和 [alertcondition()](https://www.tradingview.com/pine-script-reference/v5/#fun_alertcondition)。

其他函数返回结果，但我们并不总是使用它，例如： [hline()](https://www.tradingview.com/pine-script-reference/v5/#fun_hline)、 [plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)、 [array.pop()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}pop)、 [label.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}new)等。

所有内置函数均在 Pine Script™ [v5 参考手册](https://www.tradingview.com/pine-script-reference/v5/)中定义。您可以单击此处列出的任何函数名称以转到参考手册中的条目，该条目记录了函数的签名，即它接受的*参数*列表以及它返回的值的限定类型（函数可以返回多个结果）。参考手册条目还将列出每个参数：

- 其名称。
- 它所需的值的限定类型（我们使用*参数*来命名调用函数时传递给函数的值）。
- 是否需要该参数。

所有内置函数都在其签名中定义了一个或多个参数。并非每个函数都需要所有参数。

让我们看一下[ta.vwma()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}vwma)函数，它返回源值的成交量加权移动平均值。这是参考手册中的条目：

![../_images/BuiltIns-BuiltInFunctions.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/BuiltIns-BuiltInFunctions.png)

该条目为我们提供了使用它所需的信息：

- 该函数的作用是什么。
- 它的签名（或定义）：

```
Pine Script™
Copiedta.vwma(source, length) → series float
```

- 它包括的参数：`source`和`length`
- 它返回结果的限定类型：“series float”。
- 显示其使用情况的示例：。`plot(ta.vwma(close, 15))`
- 一个显示其功能的示例，但以长形式显示，以便您可以更好地理解其计算。请注意，这只是为了解释——而不是作为可用的代码，因为它更复杂并且执行时间更长。使用长格式只有缺点。
- “RETURNS”部分准确解释了函数返回的值。
- “ARGUMENTS”部分列出了每个参数，并提供了有关调用函数时使用的参数所需的限定类型的关键信息。
- “另请参阅”部分可让您参考相关的参考手册条目。

```
myVwma`这是对声明变量并将结果分配给它的代码行中的函数的调用：`ta.vwma(close, 20)
Pine Script™
CopiedmyVwma = ta.vwma(close, 20)
```

注意：

- 我们使用内置变量[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)作为参数的参数`source`。
- 我们用作参数`20`的实参`length`。
- 如果放置在全局范围内（即，从一行的第一个位置开始），它将由 Pine Script™ 运行时在图表的每个柱上执行。

我们还可以在调用函数时使用参数名称。在函数调用中使用时，参数名称称为*关键字参数：*

```
Pine Script™
CopiedmyVwma = ta.vwma(source = close, length = 20)
```

使用关键字参数时，您可以更改参数的位置，但前提是您将它们用于所有参数。当调用具有多个参数的函数（例如[indicator()）](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)时，您还可以放弃第一个参数的关键字参数，只要不跳过任何参数即可。如果您跳过某些参数，则必须使用关键字参数，以便 Pine Script™ 编译器能够找出它们对应的参数，例如：

```
Pine Script™
Copiedindicator("Example", "Ex", true, max_bars_back = 100)
```

以这种方式混合是不允许的：

```
Pine Script™
Copiedindicator(precision = 3, "Example") // Compilation error!
```

**调用内置函数时，确保您使用的参数具有所需的限定类型至关重要，该类型因每个参数而异。**

要了解如何做到这一点，需要了解 Pine Script™ 的[类型系统](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem)。每个内置函数的参考手册条目都包含一个“参数”部分，其中列出了提供给每个函数参数的参数所需的限定类型。