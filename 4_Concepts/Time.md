# 时间

# [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id3)

### [四个参考文献](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id4)

在 Pine Script™ 中使用日期和时间值时，有四种不同的参考发挥作用：

1. **UTC 时区**：Pine Script™ 中时间值的本机格式是**Unix 时间（以毫秒为单位）**。 Unix 时间是自**1970 年 1 月 1 日 Unix Epoch**以来经过的时间。请参阅此处了解[当前 Unix 时间（以秒为单位） ，并参阅此处了解有关](https://www.unixtimestamp.com/)[Unix 时间](https://en.wikipedia.org/wiki/Unix_time) 的更多信息。 Unix 时间的值称为*时间戳*。 Unix 时间戳始终以 UTC（或“GMT”或“GMT+0”）时区表示。它们是根据固定参考（即 Unix 纪元）测量的，并且不随时区变化。一些内置程序使用 UTC 时区作为参考。
2. **交易所时区**：交易者的第二个与时间相关的关键参考是交易工具的交易所的时区。一些内置函数例如 默认情况下以交易所时区返回[小时值。](https://www.tradingview.com/pine-script-reference/v5/#var_hour)
3. `timezone`参数：某些通常返回交易所时区值的函数（例如[hour()）](https://www.tradingview.com/pine-script-reference/v5/#fun_hour) 包含一个`timezone`参数，允许您将函数的结果调整为另一个时区。其他函数（如[time()）](https://www.tradingview.com/pine-script-reference/v5/#fun_time) 包含`session`和`timezone`参数。在这些情况下，`timezone`参数适用于`session`参数的解释方式，而不是函数返回的时间值。
4. **图表时区**：这是用户使用“图表设置/交易品种/时区”字段从图表中选择的时区。此设置仅影响图表上日期和时间的显示。它不会影响 Pine 脚本的行为，并且它们对此设置不可见。

在讨论变量或函数时，我们会注意它们是否返回 UTC 或交换时区的日期或时间。脚本无法查看用户图表上的时区设置。

### [时间内置](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id5)

Pine Script™ 具有内置**变量**，用于：

- 从当前柱（UTC 时区）获取时间戳信息： [time](https://www.tradingview.com/pine-script-reference/v5/#var_time)和 [time_close](https://www.tradingview.com/pine-script-reference/v5/#var_time_close)
- 获取当前交易日开始的时间戳信息（UTC时区）： [time_tradingday](https://www.tradingview.com/pine-script-reference/v5/#var_time_tradingday)
- 以一秒为增量获取当前时间（UTC 时区）： [timenow](https://www.tradingview.com/pine-script-reference/v5/#var_timenow)
- 从栏检索日历和时间值（交换时区）： [year](https://www.tradingview.com/pine-script-reference/v5/#var_year)、 [month](https://www.tradingview.com/pine-script-reference/v5/#var_month)、 [weekofyear](https://www.tradingview.com/pine-script-reference/v5/#var_weekofyear)、 [dayofmonth](https://www.tradingview.com/pine-script-reference/v5/#var_dayofmonth)、 [dayofweek](https://www.tradingview.com/pine-script-reference/v5/#var_dayofweek)、 [hour](https://www.tradingview.com/pine-script-reference/v5/#var_hour)、 [min](https://www.tradingview.com/pine-script-reference/v5/#var_minute)和 [Second](https://www.tradingview.com/pine-script-reference/v5/#var_second)
- [使用syminfo.timezone](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}timezone)返回图表交易品种的时区

还有一些内置**函数**可以：

- [使用time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)和 [time_close()](https://www.tradingview.com/pine-script-reference/v5/#fun_time_close)从其他时间帧返回柱的时间戳，无需调用request.security [()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security)
- 从任何时间戳检索日历和时间值，可以使用时区进行偏移： [year()](https://www.tradingview.com/pine-script-reference/v5/#fun_year)、 [month()](https://www.tradingview.com/pine-script-reference/v5/#fun_month)、 [weekofyear()](https://www.tradingview.com/pine-script-reference/v5/#fun_weekofyear)、 [dayofmonth()](https://www.tradingview.com/pine-script-reference/v5/#fun_dayofmonth)、 [dayofweek()](https://www.tradingview.com/pine-script-reference/v5/#fun_dayofweek)、 [hour()](https://www.tradingview.com/pine-script-reference/v5/#fun_hour)、 [min()](https://www.tradingview.com/pine-script-reference/v5/#fun_minute)和 [Second()](https://www.tradingview.com/pine-script-reference/v5/#fun_second)
- [使用timestamp()](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp)创建时间戳
- [使用str.format()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}format)将时间戳转换为格式化的日期/时间字符串以供显示
- 输入数据和时间值。请参阅有关[输入](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Inputs.html#pageinputs)的部分。
- 使用[会话信息](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#pagesessions)。

### [时区](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id6)

TradingViewers 可以更改用于在其图表上显示柱时间的时区。 Pine 脚本对此设置不可见。虽然有一个[syminfo.timezone](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}timezone) 变量可以返回图表工具交易的交易所的时区，但没有**等效** `chart.timezone`的变量。

当在图表上显示时间时，这显示了一种为用户提供将脚本的时间值调整为图表时间值的方法。这样，您显示的时间就可以与交易者在图表上使用的时区相匹配：

![../_images/时间-TimeZones-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Time-TimeZones-01.png)

```javascript
//@version=5
indicator("Time zone control")
MS_IN_1H = 1000 * 60 * 60
TOOLTIP01 = "Enter your time zone's offset (+ or −), including a decimal fraction if needed."
hoursOffsetInput = input.float(0.0, "Timezone offset (in hours)", minval = -12.0, maxval = 14.0, step = 0.5, tooltip = TOOLTIP01)

printTable(txt) =>
    var table t = table.new(position.middle_right, 1, 1)
    table.cell(t, 0, 0, txt, text_halign = text.align_right, bgcolor = color.yellow)

msOffsetInput = hoursOffsetInput * MS_IN_1H
printTable(
  str.format("Last bar''s open time UTC: {0,date,HH:mm:ss yyyy.MM.dd}", time) +
  str.format("\nLast bar''s close time UTC: {0,date,HH:mm:ss yyyy.MM.dd}", time_close) +
  str.format("\n\nLast bar''s open time EXCHANGE: {0,date,HH:mm:ss yyyy.MM.dd}", time(timeframe.period, syminfo.session, syminfo.timezone)) +
  str.format("\nLast bar''s close time EXCHANGE: {0,date,HH:mm:ss yyyy.MM.dd}", time_close(timeframe.period, syminfo.session, syminfo.timezone)) +
  str.format("\n\nLast bar''s open time OFFSET ({0}): {1,date,HH:mm:ss yyyy.MM.dd}", hoursOffsetInput, time + msOffsetInput) +
  str.format("\nLast bar''s close time OFFSET ({0}): {1,date,HH:mm:ss yyyy.MM.dd}", hoursOffsetInput, time_close + msOffsetInput) +
  str.format("\n\nCurrent time OFFSET ({0}): {1,date,HH:mm:ss yyyy.MM.dd}", hoursOffsetInput, timenow + msOffsetInput))
```

注意：

- 我们使用 将以小时为单位的用户偏移量转换为毫秒`msOffsetInput`。然后，我们将该偏移量添加到 UTC 格式的时间戳中，然后再将其转换为显示格式，例如和。`time + msOffsetInput``timenow + msOffsetInput`
- 我们使用工具提示向用户提供说明。
- 我们提供`minval`和`maxval`值来保护输入字段，并提供`step`值 0.5，这样当他们使用字段的向上/向下箭头时，他们可以直观地找出可以使用分数。
- str.format [()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}format) 函数格式化我们的时间值，即最后一根柱的时间和当前时间。

一些通常返回交易所时区值的函数提供了通过`timezone`参数将其结果适应另一个时区的方法。此脚本说明了如何使用[hour()](https://www.tradingview.com/pine-script-reference/v5/#fun_hour)执行此操作：

![../_images/时间-TimeZones-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Time-TimeZones-02.png)

```javascript
//@version=5
indicator('`hour(time, "GMT+0")` in orange')
color BLUE_LIGHT = #0000FF30
plot(hour, "", BLUE_LIGHT, 8)
plot(hour(time, syminfo.timezone))
plot(hour(time, "GMT+0"),"UTC", color.orange)
```

注意：

- hour变量和 hour [( ](https://www.tradingview.com/pine-script-reference/v5/#var_hour)[)](https://www.tradingview.com/pine-script-reference/v5/#fun_hour)函数通常返回交易所时区的值。因此，`hour`和两者的图都呈蓝色重叠。因此，如果需要交换时间，则使用函数形式 with是多余的。`hour(time, syminfo.timezone)``syminfo.timezone`
- 然而，绘制的橙色线返回柱形图在 UTC 或“GMT+0”时间的时间，在本例中比交易所时间少四个小时，因为 MSFT 在时区为 UTC-4 的纳斯达克进行交易。`hour(time, "GMT+0")`



#### [时区字符串](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id7)

[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)、 [timestamp()](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp)、 [hour()](https://www.tradingview.com/pine-script-reference/v5/#fun_hour)`timezone`等函数中的参数 使用的参数可以采用不同的格式，您可以在[IANA 时区数据库名称](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)参考页面中找到这些格式。可以使用该页面表的“TZ 数据库名称”、“UTC 偏移±hh:mm”和“UTC DST 偏移±hh:mm”列中的内容。

为了表示距 UTC +5.5 小时的偏移量，参考页中找到的这些字符串都是等效的：

- `"GMT+05:30"`
- `"Asia/Calcutta"`
- `"Asia/Colombo"`
- `"Asia/Kolkata"`

非小数偏移量可以用以下形式表示`"GMT+5"`。`"GMT+5.5"`不允许。

## [时间变量](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id8)

### [`time` 和 `time_close` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id9)

让我们首先绘制[time](https://www.tradingview.com/pine-script-reference/v5/#var_time)和 [time_close](https://www.tradingview.com/pine-script-reference/v5/#var_time_close)，即柱状图开盘和收盘时间的 Unix 时间戳（以毫秒为单位）：

![../_images/Time-TimeAndTimeclose-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Time-TimeAndTimeclose-01.png)

```javascript
//@version=5
indicator("`time` and `time_close` values on bars")
plot(time, "`time`")
plot(time_close, "`time_close`")
```

注意：

- time和 [time_close变量返回](https://www.tradingview.com/pine-script-reference/v5/#var_time_close)[UNIX 时间](https://en.wikipedia.org/wiki/Unix_time)中的时间戳，该时间戳[与](https://www.tradingview.com/pine-script-reference/v5/#var_time)用户在图表上选择的时区无关。在这种情况下，**图表的**时区设置是交易所时区，因此无论图表上有什么符号，其交易所时区都将用于在图表光标上显示日期和时间值。纳斯达克的时区是 UTC-4，但这仅影响图表的日期/时间值的显示；它不会影响脚本绘制的值。
- 比例尺中显示的绘图的最后一个[时间](https://www.tradingview.com/pine-script-reference/v5/#var_time) 值是从 1970 年 1 月 1 日 00:00:00 UTC（世界标准时间）到酒吧开放时间所经过的毫秒数。它对应于 2021 年 9 月 27 日的 17:30。但是，由于该图表使用 UTC-4 时区（纳斯达克时区），因此它显示的是 13:30 时间，比 UTC 时间早四个小时。
- 最后一根柱上两个值之间的差异是一小时内的毫秒数 (1000 * 60 * 60 = 3,600,000)，因为我们使用的是 1H 图表。

### [`时间_交易日](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id10)

当品种在不同日历日开始和结束的隔夜交易时段进行交易时，[time_tradingday](https://www.tradingview.com/pine-script-reference/v5/#var_time_tradingday)非常有用。例如，这种情况发生在外汇市场中，其中一个交易时段可以在周日 17:00 开盘，并在周一 17:00 收盘。

[当在 1D 或更小的时间范围内使用时，该变量返回以UNIX 时间](https://en.wikipedia.org/wiki/Unix_time)表示的交易日开始时间。当用于高于 1D 的时间范围时，它将返回柱中最后一个交易日的开始时间（例如，在 1W 时，它将返回本周最后一个交易日的开始时间）。

### [`现在时间](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id11)

[timenow返回](https://www.tradingview.com/pine-script-reference/v5/#var_timenow)[UNIX 时间](https://en.wikipedia.org/wiki/Unix_time)中的当前时间。它可以实时工作，也可以在历史柱上执行脚本时工作。实时地，您的脚本仅在执行提要更新时才会感知更改。当没有发生更新时，脚本处于空闲状态，因此无法更新其显示。有关更多信息，请参阅 Pine Script™[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)页面。

[该脚本使用timenow](https://www.tradingview.com/pine-script-reference/v5/#var_timenow) 和[time_close](https://www.tradingview.com/pine-script-reference/v5/#var_time_close)的值 来计算日内柱的实时倒计时。与图表上的倒计时相反，只有当提要更新导致脚本执行另一次迭代时，此倒计时才会更新：

```javascript
//@version=5
indicator("", "", true)

printTable(txt) =>
    var table t = table.new(position.middle_right, 1, 1)
    table.cell(t, 0, 0, txt, text_halign = text.align_right, bgcolor = color.yellow)

printTable(str.format("{0,time,HH:mm:ss.SSS}", time_close - timenow))
```

### [日历日期和时间](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id12)

日历日期和时间变量（例如 [year](https://www.tradingview.com/pine-script-reference/v5/#var_year)、 [month](https://www.tradingview.com/pine-script-reference/v5/#var_month)、 [weekofyear](https://www.tradingview.com/pine-script-reference/v5/#var_weekofyear)、 [dayofmonth](https://www.tradingview.com/pine-script-reference/v5/#var_dayofmonth)、 [dayofweek](https://www.tradingview.com/pine-script-reference/v5/#var_dayofweek)、 [hour](https://www.tradingview.com/pine-script-reference/v5/#var_hour)、 [min](https://www.tradingview.com/pine-script-reference/v5/#var_minute)和 [sec）](https://www.tradingview.com/pine-script-reference/v5/#var_second) 可用于测试特定日期或时间，并作为 [timestamp()](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp)的参数。

在测试特定日期或时间时，需要考虑脚本在无法检测到测试条件的时间范围内执行的可能性，或者在不存在具有特定要求的柱的情况下。例如，假设我们想要检测该月的第一个交易日。此脚本显示了 当使用周图表或当月 1 日没有交易发生时，仅使用[dayofmonth不起作用：](https://www.tradingview.com/pine-script-reference/v5/#var_dayofmonth)

![../_images/时间-CalendarDatesAndTimes-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Time-CalendarDatesAndTimes-01.png)

```javascript
//@version=5
indicator("", "", true)
firstDayIncorrect = dayofmonth == 1
firstDay = ta.change(time("M"))
plotchar(firstDayIncorrect, "firstDayIncorrect", "•", location.top, size = size.small)
bgcolor(firstDay ? color.silver : na)
```

注意：

- 使用`ta.change(time("M"))`更加稳健，因为它适用于所有月份（#1 和 #2），显示为银色背景，而检测到使用的蓝点在 9 月第一个交易日发生在 2 号时不起作用 (#1)。`dayofmonth == 1`
- 该条件将出现在该月第一天的所有内部柱上，但仅出现在第一天。`dayofmonth == 1``true``ta.change(time("M"))``true`

如果您希望脚本仅在 2020 年及以后显示，您可以使用：

```javascript
//@version=5
indicator("", "", true)
plot(year >= 2020 ? close : na, linewidth = 3)
```

### [`syminfo.timezone()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id13)

[syminfo.timezone](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}timezone) 返回图表交易品种的时区。当`timezone`函数中的参数可用时，并且您想明确指出您正在使用交易所的时区，这会很有帮助。它通常是多余的，因为当没有向 提供参数时`timezone`，将假定交换的时区。

## [时间函数](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id14)

### [`time()` 和 `time_close()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id15)

time [()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)和 [time_close()](https://www.tradingview.com/pine-script-reference/v5/#fun_time_close) 函数具有以下签名：

```javascript
time(timeframe, session, timezone) → series int
time_close(timeframe, session, timezone) → series int
```

他们接受三个论点：

- `timeframe`

  [timeframe.period](https://www.tradingview.com/pine-script-reference/v5/#var_timeframe{dot}period)格式的字符串。

- `session`

  会话规范格式的可选字符串：`"hhmm-hhmm[:days]"`，其中该`[:days]`部分是可选的。请参阅[会话](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Sessions.html#pagesessions)页面以获取更多信息。

- `timezone`

  `session`一个可选值，用于限定使用时的参数。

有关详细信息，请参阅《参考手册》中的[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)和 [time_close()条目。](https://www.tradingview.com/pine-script-reference/v5/#fun_time_close)

time [()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)函数最常用于：

1. 测试柱是否处于特定时间段内，这需要使用该`session`参数。在这些情况下，`timeframe.period`通常将 ，即图表的时间范围用作第一个参数。当以这种方式使用该函数时，我们依赖这样一个事实： 当柱形图不属于参数中指定的周期时，它将返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)`session`。
2. 通过使用参数的更高时间范围来检测比图表更高的时间范围内的变化`timeframe`。当为此目的使用该函数时，我们正在寻找返回值的变化，这意味着较高的时间范围柱已发生变化。这通常需要使用[ta.change()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}change)进行测试，例如，`ta.change(time("D"))`当新的更高时间范围柱出现时，将返回时间变化，因此在条件表达式中使用时，表达式的结果将转换为“bool”值。`true`当有变化和`false`没有变化时，结果将是“bool” 。

#### [测试会话](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id16)

让我们看一下第一种情况的示例，我们想要确定柱的开始时间是否属于 11:00 到 13:00 之间的时间段的一部分：

![../_images/Time-Time()AndTimeclose()-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Time-Time()AndTimeclose()-01.png)

```javascript
//@version=5
indicator("Session bars", "", true)
inSession = not na(time(timeframe.period, "1100-1300"))
bgcolor(inSession ? color.silver : na)
```

注意：

- 我们使用，它表示：“如果当前柱的开盘时间在 11:00 到 13:00 之间（含 11:00 和 13:00），则检查图表的时间范围”。如果柱在会话中，该函数将返回其开盘时间。如果不是**，**该函数返回 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。`time(timeframe.period, "1100-1300")`
- [我们有兴趣识别time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time) 不返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)的实例， 因为这意味着柱形图位于会话中，因此我们测试。当[time()](https://www.tradingview.com/pine-script-reference/v5/#fun_time)不是 [na](https://www.tradingview.com/pine-script-reference/v5/#var_na)时，我们不使用它的实际返回值；我们只关心它是否返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。`not na(...)`



#### [测试更高时间范围内的变化](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id17)

在较长的时间范围内检测变化通常很有帮助。例如，您可能希望在日内图表上检测交易日的变化。对于这些情况，您可以使用返回 1D 柱的开盘时间的事实`time("D")`，即使图表处于日内时间范围（例如 1H）：

![../_images/Time-TestingForChangesInHTF-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Time-TestingForChangesInHTF-01.png)

```javascript
//@version=5
indicator("", "", true)
bool newDay = ta.change(time("D"))
bgcolor(newDay ? color.silver : na)

newExchangeDay = ta.change(dayofmonth)
plotchar(newExchangeDay, "newExchangeDay", "🠇", location.top, size = size.small)
```

注意：

- 该`newDay`变量检测一维柱线开盘时间的变化，因此它遵循图表符号的约定，即使用 17:00 到 17:00 的隔夜时段。当新会话进入时它会更改值。
- 因为`newExchangeDay`检测 日历日中的[dayofmonth的变化，所以当图表上的日期变化时它也会变化。](https://www.tradingview.com/pine-script-reference/v5/#var_dayofmonth)
- 只有当有几天没有交易时，这两种变化检测方法才会在图表上重合。例如，在周日，两种检测方法都会检测到变化，因为日历日从最后一个交易日（周五）更改为新一周的第一个日历日（周日），即周一隔夜交易时段从 17:00 开始。

### [日历日期和时间](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id18)

日历日期和时间函数，例如 [year()](https://www.tradingview.com/pine-script-reference/v5/#fun_year)、 [month()](https://www.tradingview.com/pine-script-reference/v5/#fun_month)、 [weekofyear()](https://www.tradingview.com/pine-script-reference/v5/#fun_weekofyear)、 [dayofmonth()](https://www.tradingview.com/pine-script-reference/v5/#fun_dayofmonth)、 [dayofweek()](https://www.tradingview.com/pine-script-reference/v5/#fun_dayofweek)、 [hour()](https://www.tradingview.com/pine-script-reference/v5/#fun_hour)、 [min()](https://www.tradingview.com/pine-script-reference/v5/#fun_minute)和 [second()](https://www.tradingview.com/pine-script-reference/v5/#fun_second) 可用于测试特定日期或时间。它们都具有与此处所示的[dayofmonth()](https://www.tradingview.com/pine-script-reference/v5/#fun_dayofmonth)类似的签名 ：

```javascript
dayofmonth(time) → series int
dayofmonth(time, timezone) → series int
```

这将绘制柱线开盘日，其中 2021 年 1 月 1 日 00:00 时间位于其 [time](https://www.tradingview.com/pine-script-reference/v5/#var_time_close)和 [time_close](https://www.tradingview.com/pine-script-reference/v5/#var_time_close)值之间：

```javascript
//@version=5
indicator("")
exchangeDay = dayofmonth(timestamp("2021-01-01"))
plot(exchangeDay)
```

该值将是 31 日或 1 日，具体取决于图表符号上会话开始的日历日。使用 UTC 时区的交易所 24x7 交易品种的日期将为第一天。对于在 UTC-4 交易所交易的品种，该日期将为 31 日。

### [`时间戳()` ](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id19)

timestamp [()](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp)函数有几个不同的签名：

```javascript
timestamp(year, month, day, hour, minute, second) → simple/series int
timestamp(timezone, year, month, day, hour, minute, second) → simple/series int
timestamp(dateString) → const int
```

前两者之间的唯一区别是`timezone`参数。它的默认值为[syminfo.timezone](https://www.tradingview.com/pine-script-reference/v5/#var_syminfo{dot}timezone)。有关有效值，请参阅本页的[时区字符串部分。](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#pagetime-timezonestrings)

第三种形式用作[input.time()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}time)`defval`中的值。有关详细信息，请参阅参考手册中的[timestamp()条目。](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp)

[timestamp()](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp) 对于生成特定日期的时间戳非常有用。要生成 2021 年 1 月 1 日的时间戳，请使用以下方法之一：

```javascript
//@version=5
indicator("")
yearBeginning1 = timestamp("2021-01-01")
yearBeginning2 = timestamp(2021, 1, 1, 0, 0)
printTable(txt) => var table t = table.new(position.middle_right, 1, 1), table.cell(t, 0, 0, txt, bgcolor = color.yellow)
printTable(str.format("yearBeginning1: {0,date,yyyy.MM.dd hh:mm}\nyearBeginning2: {1,date,yyyy.MM.dd hh:mm}", yearBeginning1, yearBeginning1))
```

[您可以在timestamp()](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp)参数中使用偏移量。在这里，我们从为其`day`参数提供的值中减去 2，以获取图表两天前最后一个柱的日期/时间。请注意，由于各种工具上的柱线对齐方式不同，图表上标识的柱线可能并不总是正好位于 48 小时之外，尽管函数的返回值是正确的：

```javascript
//@version=5
indicator("")
twoDaysAgo = timestamp(year, month, dayofmonth - 2, hour, minute)
printTable(txt) => var table t = table.new(position.middle_right, 1, 1), table.cell(t, 0, 0, txt, bgcolor = color.yellow)
printTable(str.format("{0,date,yyyy.MM.dd hh:mm}", twoDaysAgo))
```

## [设置日期和时间的格式](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Time.html#id20)

[可以使用str.format()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}format)格式化时间戳。这些是各种格式的示例：

![../_images/时间-FormattingDatesAndTime-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Time-FormattingDatesAndTime-01.png)

```javascript
//@version=5
indicator("", "", true)

print(txt, styl) =>
    var alignment = styl == label.style_label_right ? text.align_right : text.align_left
    var lbl = label.new(na, na, "", xloc.bar_index, yloc.price, color(na), styl, color.black, size.large, alignment)
    if barstate.islast
        label.set_xy(lbl, bar_index, hl2[1])
        label.set_text(lbl, txt)

var string format =
  "{0,date,yyyy.MM.dd hh:mm:ss}\n" +
  "{1,date,short}\n" +
  "{2,date,medium}\n" +
  "{3,date,long}\n" +
  "{4,date,full}\n" +
  "{5,date,h a z (zzzz)}\n" +
  "{6,time,short}\n" +
  "{7,time,medium}\n" +
  "{8,date,'Month 'MM, 'Week' ww, 'Day 'DD}\n" +
  "{9,time,full}\n" +
  "{10,time,hh:mm:ss}\n" +
  "{11,time,HH:mm:ss}\n" +
  "{12,time,HH:mm:ss} Left in bar\n"

print(format, label.style_label_right)
print(str.format(format,
  time, time, time, time, time, time, time,
  timenow, timenow, timenow, timenow,
  timenow - time, time_close - timenow), label.style_label_left)
```