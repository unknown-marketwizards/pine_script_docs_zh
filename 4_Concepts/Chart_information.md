# 图表信息

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Chart_information.html#id1)

脚本可以通过 Pine Script™[内置变量的](https://www.tradingview.com/pine-script-docs/en/v5/language/Built-ins.html#pagebuiltinfunctions-builtinvariables)子集获取有关其当前运行的图表和交易品种的信息。我们在这里介绍的脚本允许脚本访问以下相关信息：

- 图表的价格和成交量
- 图表的符号
- 图表的时间范围
- 交易品种交易的时段（或时间段）

## [价格和数量](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Chart_information.html#id2)

OHLCV 值的内置变量是：

- [open](https://www.tradingview.com/pine-script-reference/v5/#var_open) : 酒吧的开盘价。
- [high](https://www.tradingview.com/pine-script-reference/v5/#var_high)：柱形的最高价格，或实时柱形经过时间内达到的最高价格。
- [low](https://www.tradingview.com/pine-script-reference/v5/#var_low)：柱形的最低价格，或实时柱形经过时间内达到的最低价格。
- [close](https://www.tradingview.com/pine-script-reference/v5/#var_close) : 柱的收盘价，或实时柱中的**当前价格。**
- [成交量](https://www.tradingview.com/pine-script-reference/v5/#var_volume)：柱中的交易量，或实时柱的运行时间内的交易量。体积信息的单位因仪器而异。它体现在股票的股票、外汇的手数、期货合约、加密货币的基础货币等中。

其他值可通过以下方式获得：

- [hl2](https://www.tradingview.com/pine-script-reference/v5/#var_hl2)：柱形图[最高值](https://www.tradingview.com/pine-script-reference/v5/#var_high)和 [最低](https://www.tradingview.com/pine-script-reference/v5/#var_low)值的平均值。
- [hlc3 ：柱线](https://www.tradingview.com/pine-script-reference/v5/#var_hlc3)[最高价](https://www.tradingview.com/pine-script-reference/v5/#var_high)、 [最低价](https://www.tradingview.com/pine-script-reference/v5/#var_low)和 [收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价的平均值。
- [ohlc4 ：柱的](https://www.tradingview.com/pine-script-reference/v5/#var_ohlc4)[开盘价](https://www.tradingview.com/pine-script-reference/v5/#var_open)、 [最高价](https://www.tradingview.com/pine-script-reference/v5/#var_high)、 [最低价](https://www.tradingview.com/pine-script-reference/v5/#var_low)和 [收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价的平均值。

在历史柱上，上述变量的值在柱期间不会变化，因为它们仅提供 OHLCV 信息。当在历史柱上运行时，脚本在柱的收盘 [价处](https://www.tradingview.com/pine-script-reference/v5/#var_close)执行，此时所有柱的信息都是已知的，并且在脚本在柱上执行期间不能更改。

实时酒吧则完全是另一回事。当指标（或使用 的策略）实时运行时，上述变量的值（除了[open](https://www.tradingview.com/pine-script-reference/v5/#var_open)）将在实时柱上的脚本的连续迭代之间变化，因为它们代表了进程进程中某个时间点的**当前**值。实时酒吧。这可能会导致一种形式的[重新绘制](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html#pagerepainting)。有关更多详细信息，请参阅 Pine Script™[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)页面。`calc_on_every_tick = true`

[[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[]) [历史引用运算符](https://www.tradingview.com/pine-script-docs/en/v5/language/Operators.html#pageoperators-historyreferencingoperator)可 用于引用内置变量的过去值，例如，`close[1]`引用前一柱的[收盘](https://www.tradingview.com/pine-script-reference/v5/#var_close)价（相对于脚本正在执行的特定柱）。



## [符号信息](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Chart_information.html#id3)

命名空间中的内置变量为`syminfo`脚本提供有关脚本运行的图表符号的信息。每次脚本用户更改图表符号时，此信息都会更改。然后，该脚本使用内置变量的新值在所有图表的柱上重新执行：

- [syminfo.basecurrency](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}basecurrency)：基础货币，例如“BTCUSD”中的“BTC”，或“EURUSD”中的“EUR”。
- [syminfo.currency](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}currency)：报价货币，例如“BTCUSD”中的“USD”，或“USDCAD”中的“CAD”。
- [syminfo.description](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}description)：符号的详细描述。
- [syminfo.mintick](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}mintick)：交易品种的价格变动值，或者可以变动的最小增量价格。不要与*pips*或*point*混淆。关于“ES1！” （“S&P 500 E-Mini”）刻度大小为 0.25，因为这是价格变动的最小增量。
- [syminfo.pointvalue](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}pointvalue)：点值是确定合约价值的基础资产的倍数。关于“ES1！” （“S&P 500 E-Mini”）点值为 50，因此合约的价值是该工具价格的 50 倍。
- [syminfo.prefix](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}prefix)：前缀是交易所或经纪商的标识符：“NASDAQ”或“BATS”代表“AAPL”，“CME_MINI_DL”代表“ES1！”。
- [syminfo.root](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}root)：它是结构化股票代码（如期货）的股票代码前缀。 “ES1！”是“ES”，“ZW1！”是“ZW”。
- [syminfo.session](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}session)：它反映了图表上该交易品种的会话设置。如果“图表设置/交易品种/会话”字段设置为“扩展”，则仅当交易品种和用户的提要允许扩展会话时，它才会返回“扩展”。它很少显示，主要用作[ticker.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}new)`session`中参数 的参数。
- [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}ticker)：这是交易品种的名称，不包含交易部分（[syminfo.prefix](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}prefix)）：“BTCUSD”、“AAPL”、“ES1!”、“USDCAD”。
- [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}tickerid)：该字符串很少显示。它主要用作 [request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)参数的参数`symbol`。它包括会话、前缀和代码信息。
- [syminfo.timezone](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}timezone)：交易品种的时区。该字符串是[IANA 时区数据库名称](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) （例如“America/New_York”）。
- [syminfo.type](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}type)：交易品种所属的市场类型。值包括“股票”、“期货”、“指数”、“外汇”、“加密货币”、“基金”、“dr”、“CFD”、“债券”、“权证”、“结构性”和“权利” 。

该脚本将在图表上显示这些内置变量的值：

```
Pine Script™
Copied//@version=5
indicator("`syminfo.*` built-ins", "", true)
printTable(txtLeft, txtRight) =>
    var table t = table.new(position.middle_right, 2, 1)
    table.cell(t, 0, 0, txtLeft, bgcolor = color.yellow, text_halign = text.align_right)
    table.cell(t, 1, 0, txtRight, bgcolor = color.yellow, text_halign = text.align_left)

nl = "\n"
left =
  "syminfo.basecurrency: "  + nl +
  "syminfo.currency: "      + nl +
  "syminfo.description: "   + nl +
  "syminfo.mintick: "       + nl +
  "syminfo.pointvalue: "    + nl +
  "syminfo.prefix: "        + nl +
  "syminfo.root: "          + nl +
  "syminfo.session: "       + nl +
  "syminfo.ticker: "        + nl +
  "syminfo.tickerid: "      + nl +
  "syminfo.timezone: "      + nl +
  "syminfo.type: "

right =
  syminfo.basecurrency              + nl +
  syminfo.currency                  + nl +
  syminfo.description               + nl +
  str.tostring(syminfo.mintick)     + nl +
  str.tostring(syminfo.pointvalue)  + nl +
  syminfo.prefix                    + nl +
  syminfo.root                      + nl +
  syminfo.session                   + nl +
  syminfo.ticker                    + nl +
  syminfo.tickerid                  + nl +
  syminfo.timezone                  + nl +
  syminfo.type

printTable(left, right)
```



## [图表时间范围](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Chart_information.html#id4)

脚本可以使用这些内置函数获取图表上使用的时间范围类型的信息，这些内置函数都返回“简单布尔”结果：

- [timeframe.isseconds](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isseconds)
- [timeframe.isminutes](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isminutes)
- [timeframe.isintraday](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isintraday)
- [timeframe.isdaily](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isdaily)
- [timeframe.isweekly](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isweekly)
- [timeframe.ismonthly](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}ismonthly)
- [timeframe.isdwm](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}isdwm)

两个额外的内置函数返回更具体的时间范围信息：

- [timeframe.multiplier](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}multiplier) 返回一个“简单 int”，其中包含时间帧单位的乘数。将返回一小时的图表时间范围，`60`因为日内时间范围以分钟表示。将返回 30 秒时间范围`30`（秒）、每日图表将返回`1`（日）、季度图表将返回`3`（月）、年度图表将返回`12`（月）。此变量的值不能用作`timeframe`内置函数中参数的参数，因为它们需要时间范围规范格式的字符串。
- [timeframe.period](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}period) 返回 Pine Script™ 时间范围规范格式的字符串。

有关详细信息，请参阅[时间范围](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Timeframes.html#pagetimeframes)页面。

## [会话信息](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Chart_information.html#id5)

会话信息有多种形式：

- syminfo.session 内置变量返回一个 [值](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}session)[session.regular](https://www.tradingview.com/pine-script-reference/v5/#var_session{dot}regular)或 [session.extended](https://www.tradingview.com/pine-script-reference/v5/#var_session{dot}extended)。它反映了图表上该交易品种的会话设置。如果“图表设置/交易品种/会话”字段设置为“扩展”，则仅当交易品种和用户的提要允许扩展会话时，它才会返回“扩展”。当需要会话类型时使用它，例如作为[ticker.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}new)`session`中参数 的参数。
- [会话状态内置](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#pagesessions-sessionstates)提供有关柱所属交易会话的信息。