# 会话

# [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#id1)

会话信息在 Pine Script™ 中可以通过三种不同的方式使用：

1. 包含从开始时间到开始时间和日期信息的**会话字符串，可在**[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)和 [time_close()](https://www.tradingview.com/pine-script-reference/v5/#fun_time_close)等函数中使用 ，以检测柱线何时处于特定时间段，并可选择将有效会话限制为特定日期。 input.session [()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}session)函数提供了一种允许脚本用户通过脚本的“输入”选项卡定义会话值的方法（有关更多信息，请参阅[会话输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#pageinputs-sessioninput)部分）。
2. **会话状态**内置变量（例如[session.ismarket）](https://www.tradingview.com/pine-script-reference/v5/#var_session{dot}ismarket) 可以识别柱属于哪个会话。
3. 使用[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)获取数据时 ，您还可以选择仅从*常规*会话或*扩展*会话返回数据。在这种情况下，**常规会话和扩展会话**的定义就是交换。它是仪器属性的一部分 - 不是用户定义的，如第 1 点所示。*常规*和*扩展*会话的概念与图表界面中使用的概念相同，例如在“图表设置/交易品种/会话”字段中。

以下部分介绍了在 Pine Script™ 中使用会话信息的两种方法。

注意：

- 并非 TradingView 上的所有用户帐户都有权访问扩展会话信息。
- Pine Script™ 中没有特殊的“会话”类型。相反，会话字符串是“string”类型，但必须符合会话字符串语法。

## [会话字符串](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#id2)

### [会话字符串规范](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#id3)

[与time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)和 [time_close()](https://www.tradingview.com/pine-script-reference/v5/#fun_time_close)一起使用的会话字符串必须具有特定的格式。它们的语法是：

```
Pine Script™
Copied<time_period>:<days>
```

在哪里：

- <time_period> 使用“hhmm”格式的时间，“hh”采用 24 小时格式，因此`1700`为下午 5 点。时间段的格式为“hhmm-hhmm”，逗号可以分隔多个时间段以指定离散时间段的组合。

- 例如，- <days> 是一组从 1 到 7 的数字，指定会话的有效日期。

  1 是星期日，7 是星期六。

笔记

**默认日期为**: ，这在 Pine Script™ v5 中与使用 (工作日) 的`1234567`早期版本不同 。`23456`对于要重现以前版本的行为的 v5 代码，它应该明确提及工作日，如 中所示`"0930-1700:23456"`。

这些是会话字符串的示例：

- `"24x7"`

  为期 7 天、24 小时的会议从午夜开始。

- `"0000-0000:1234567"`

  相当于前面的例子。

- `"0000-0000"`

  相当于前两个示例，因为默认天数为`1234567`。

- `"0000-0000:23456"`

  与前面的示例相同，但仅限周一至周五。

- `"2000-1630:1234567"`

  隔夜时段从 20:00 开始，到次日 16:30 结束。它在一周中的所有日子都有效。

- `"0930-1700:146"`

  每周日 (1)、周三 (4) 和周五 (6) 的会议于 9:30 开始并于 17:00 结束。

- `"1700-1700:23456"`

  *通宵*会议。周一会议于周日 17:00 开始，周一 17:00 结束。周一至周五有效。

- `"1000-1001:26"`

  周一 (2) 和周五 (6) 的奇怪会议仅持续一分钟。

- `"0900-1600,1700-2000"`

  会议从 9:00 开始，从 16:00 到 17:00 休息，一直持续到 20:00。适用于一周中的每一天。

### [使用会话字符串](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#id4)

使用会话字符串定义的会话属性独立于交易所定义的会话（确定工具何时可以交易）。程序员可以完全自由地创建适合其目的的任何会话定义，这通常是检测柱线何时属于特定时间段。这是通过使用[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)函数的以下两个签名之一在 Pine Script™ 中完成的 ：

```
Pine Script™
Copiedtime(timeframe, session, timezone) → series int
time(timeframe, session) → series int
```

在这里，我们使用 带有参数的[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)在日内图表上`session`显示市场的开盘 [高点](https://www.tradingview.com/pine-script-reference/v5/#var_high)和 [低点值：](https://www.tradingview.com/pine-script-reference/v5/#var_low)

![../_images/Sessions-UsingSessionStrings-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Sessions-UsingSessionStrings-01.png)

```
Pine Script™
Copied//@version=5
indicator("Opening high/low", overlay = true)

sessionInput = input.session("0930-0935")

sessionBegins(sess) =>
    t = time("", sess)
    timeframe.isintraday and (not barstate.isfirst) and na(t[1]) and not na(t)

var float hi = na
var float lo = na
if sessionBegins(sessionInput)
    hi := high
    lo := low

plot(lo, "lo", color.fuchsia, 2, plot.style_circles)
plot(hi, "hi", color.lime,    2, plot.style_circles)
```

注意：

- 我们使用会话输入来允许用户指定他们想要检测的时间。我们仅在柱上查找会话的开始时间，因此我们在`"0930-0935"`默认值的开始时间和结束时间之间使用五分钟的间隔。

- 我们创建一个`sessionBegins()`函数来检测会话的开始。它的调用使用空字符串作为函数的参数，这意味着它使用图表的时间范围，无论是什么。该函数在以下情况下返回：`time("", sess)``timeframe``true`

  > - 该图表使用日内时间范围（秒或分钟）。
  > - 该脚本不在图表的第一个柱上，我们用 来确保这一点。此检查可防止代码始终检测从第一个柱开始的会话，因为它始终存在。`(not barstate.isfirst)``na(t[1]) and not na(t)``true`
  > - time [()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)调用在前一个柱上返回了[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)，因为它不在会话的时间段内，并且它返回的值不是 当前柱上的[na ，这意味着该柱](https://www.tradingview.com/pine-script-reference/v5/#var_na)**在**会话的时间段内。



## [会话状态](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#id5)

三个内置变量允许您区分当前柱所属的会话类型。它们仅对日内时间范围有帮助：

- `true`当柱属于常规交易时间时，[session.ismarket](https://www.tradingview.com/pine-script-reference/v5/#var_session{dot}ismarket) 返回。
- `true`当柱属于常规交易时间之前的延长时段时，[session.ispremarket](https://www.tradingview.com/pine-script-reference/v5/#var_session{dot}ispremarket) 返回。
- `true`当柱属于常规交易时间之后的延长时段时，[session.ispostmarket](https://www.tradingview.com/pine-script-reference/v5/#var_session{dot}ispostmarket) 返回。



## [使用带有 `request.security()` 的会话](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#id6)

当您的 TradingView 账户提供扩展会话访问权限时，您可以选择使用“设置/交易品种/会话”字段查看其柱形。有两种类型的会话：

- **常规**（不包括上市前和上市后数据），以及
- **扩展**（包括上市前和上市后数据）。

使用[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security) 函数访问数据的脚本可以返回扩展会话数据，也可以不返回。这是仅获取常规会话数据的示例：

![../_images/Sessions-RegularAndExtendedSessions-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Sessions-RegularAndExtendedSessions-01.png)

```
Pine Script™
Copied//@version=5
indicator("Example 1: Regular Session Data")
regularSessionData = request.security("NASDAQ:AAPL", timeframe.period, close, barmerge.gaps_on)
plot(regularSessionData, style = plot.style_linebr)
```

如果您希望[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)调用返回扩展会话数据，则必须首先使用[ticker.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}new)函数构建[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)调用的第一个参数：

![../_images/Sessions-RegularAndExtendedSessions-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Sessions-RegularAndExtendedSessions-02.png)

```
Pine Script™
Copied//@version=5
indicator("Example 2: Extended Session Data")
t = ticker.new("NASDAQ", "AAPL", session.extended)
extendedSessionData = request.security(t, timeframe.period, close, barmerge.gaps_on)
plot(extendedSessionData, style = plot.style_linebr)
```

请注意，脚本情节中先前图表的空白现已填充。另外，请记住，我们的示例脚本不会在图表上产生背景颜色；这是由于图表的设置显示延长的时间。

ticker.new [()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}new) 函数具有以下签名：

```
Pine Script™
Copiedticker.new(prefix, ticker, session, adjustment) → simple string
```

在哪里：

- `prefix`是交换前缀，例如，`"NASDAQ"`
- `ticker`是一个符号名称，例如，`"AAPL"`
- `session`可以是`session.extended`或`session.regular`。请注意，这不是**会话**字符串。
- `adjustment`使用不同的标准调整价格：`adjustment.none`、`adjustment.splits`、`adjustment.dividends`。

我们的第一个例子可以重写为：

```
Pine Script™
Copied//@version=5
indicator("Example 1: Regular Session Data")
t = ticker.new("NASDAQ", "AAPL", session.regular)
regularSessionData = request.security(t, timeframe.period, close, barmerge.gaps_on)
plot(regularSessionData, style = plot.style_linebr)
```

如果您想使用与图表主要交易品种相同的会话规范，请省略[ticker.new()](https://www.tradingview.com/pine-script-reference/v5/#fun_ticker{dot}new)中的第三个参数；它是可选的。如果您希望代码明确声明您的意图，请使用[syminfo.session](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}session) 内置变量。它保存图表主要交易品种的会话类型：

```
Pine Script™
Copied//@version=5
indicator("Example 1: Regular Session Data")
t = ticker.new("NASDAQ", "AAPL", syminfo.session)
regularSessionData = request.security(t, timeframe.period, close, barmerge.gaps_on)
plot(regularSessionData, style = plot.style_linebr)
```