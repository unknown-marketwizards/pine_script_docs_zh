# 错误消息

## [if 语句太长：The if statement is too long](https://www.tradingview.com/pine-script-docs/en/v5/Error_messages.html#id1)

[当if 语句](https://www.tradingview.com/pine-script-reference/v5/#op_if)内的缩进代码对于编译器来说太大时，就会出现此错误。由于编译器的工作方式，您不会收到一条消息，告诉您到底有多少行代码超出了限制。现在唯一的解决方案是将[if 语句](https://www.tradingview.com/pine-script-reference/v5/#op_if)分解为更小的部分（函数或更小的[if 语句](https://www.tradingview.com/pine-script-reference/v5/#op_if)）。下面的示例显示了一个相当长的[if 语句](https://www.tradingview.com/pine-script-reference/v5/#op_if)；理论上，这会抛出：`line 4: if statement is too long`

```javascript
//@version=5
indicator("My script")
var e = 0
if barstate.islast 
  a = 1  
  b = 2  
  c = 3  
  d = 4 
  e := a + b + c + d
plot(e)
```

要修复此代码，您可以将这些行移动到它们自己的函数中：

```javascript
//@version=5
indicator("My script")
var e = 0
doSomeWork() => 
  a = 1  
  b = 2  
  c = 3  
  d = 4  
  result = a + b + c + d
if barstate.islast  
	e := doSomeWork()
plot(e)
```


## [脚本请求太多证券：Script requesting too many securities](https://www.tradingview.com/pine-script-docs/en/v5/Error_messages.html#id2)

脚本中的最大证券数限制为 40。如果将变量声明为`request.security`函数调用，然后使用该变量作为其他变量和计算的输入，则不会导致多次`request.security`调用。但是，如果您要声明一个调用的函数 `request.security`，则对该函数的每次调用都将被视为一次`request.security`调用。

从源代码来看，很难说会调用多少证券。以下示例`request.security`在编译后恰好有 3 次调用：

```javascript
//@version=5
indicator("Securities count")
a = request.security(syminfo.tickerid, '42', close)  // (1) first unique security call
b = request.security(syminfo.tickerid, '42', close)  // same call as above, will not produce new security call after optimizations

plot(a)
plot(a + 2)
plot(b)

sym(p) =>  // no security call on this line
    request.security(syminfo.tickerid, p, close)
plot(sym('D'))  // (2) one indirect call to security
plot(sym('W'))  // (3) another indirect call to security

request.security(syminfo.tickerid, timeframe.period, open)  // result of this line is never used, and will be optimized out
```

## [脚本无法翻译自null：Script could not be translated from: null](https://www.tradingview.com/pine-script-docs/en/v5/Error_messages.html#id3)

```javascript
study($)
```

通常此错误出现在版本 1 Pine 脚本中，并且意味着代码不正确。 Pine Script™ 版本 2（及更高版本）更擅长解释此类错误。所以你可以尝试通过在第一行添加特殊属性来切换到版本2。你会得到 ：`line 2: no viable alternative at character '$'`

```javascript
// @version=2
study($)
```

## [第 2 行：字符 '$' 处没有可行的替代方案：line 2: no viable alternative at character ‘$’](https://www.tradingview.com/pine-script-docs/en/v5/Error_messages.html#id4)

此错误消息提示了错误所在。`$`代替带有脚本标题的字符串。例如：

```javascript
// @version=2
study("title")
```

## [不匹配的输入 <…> 期望  ：Mismatched input <…> expecting <???>](https://www.tradingview.com/pine-script-docs/en/v5/Error_messages.html#id5)

与 相同，但知道那个地方应该有什么。例子：`no viable alternative`

```Pine Script™Copied
//@version=5
indicator("My Script") 
plot(1)
```
line 3: mismatched input 'plot' expecting 'end of line without line continuation'


`plot`要解决此问题，您应该在没有缩进的情况下以新行开始：

```Pine Script™Copied
//@version=5
indicator("My Script")
plot(1)
```

## [循环太长（> 500 毫秒）:Loop is too long (> 500 ms)](https://www.tradingview.com/pine-script-docs/en/v5/Error_messages.html#id6)

我们限制每个历史柱和实时报价的循环计算时间，以保护我们的服务器免受无限或非常长的循环的影响。此限制还导致计算时间过长的快速失败指标。例如，如果您有 5000 个柱，并且指标需要 500 毫秒来计算每个柱，则加载时间将超过 16 分钟：

```javascript
//@version=5
indicator("Loop is too long", max_bars_back = 101)
s = 0
for i = 1 to 1e3  // to make it longer
    for j = 0 to 100
        if timestamp(2017, 02, 23, 00, 00) <= time[j] and time[j] < timestamp(2017, 02, 23, 23, 59)
            s := s + 1
plot(s)
```

或许可以优化算法来克服这个错误。在这种情况下，算法可以这样优化：

```javascript
//@version=5
indicator("Loop is too long", max_bars_back = 101)
bar_back_at(t) =>
    i = 0
    step = 51
    for j = 1 to 100
        if i < 0
            i := 0
            break
        if step == 0
            break
        if time[i] >= t
            i := i + step
            i
        else
            i := i - step
            i
        step := step / 2
        step
    i

s = 0
for i = 1 to 1e3  // to make it longer
    s := s - bar_back_at(timestamp(2017, 02, 23, 23, 59)) +
         bar_back_at(timestamp(2017, 02, 23, 00, 00))
    s
plot(s)
```

## [脚本有太多局部变量:Script has too many local variables](https://www.tradingview.com/pine-script-docs/en/v5/Error_messages.html#id7)

如果脚本太大而无法编译，则会出现此错误。语句`var=expression`为 创建一个局部变量`var`。除此之外，需要注意的是，辅助变量可以在脚本编译过程中隐式创建。该限制适用于显式和隐式创建的变量。 1000 个变量的限制单独应用于每个函数。事实上，放置在脚本*全局*作用域中的代码也隐式包装到主函数中，并且 1000 个变量的限制也适用于它。您可以尝试进行一些重构来避免此问题：

```javascript
var1 = expr1
var2 = expr2
var3 = var1 + var2
```

可以转换为：

```javascript
var3 = expr1 + expr2
```

## [Pine Script™ 无法确定系列的引用长度。尝试在指标或策略函数中使用 max_bars_back:Pine Script™ cannot determine the referencing length of a series. Try using max_bars_back in the indicator or strategy function¶ ](https://www.tradingview.com/pine-script-docs/en/v5/Error_messages.html#id8)

如果 Pine Script™ 错误地自动检测脚本中使用的系列所需的最大长度，则会出现此错误。当脚本的执行流程不允许 Pine Script™ 检查条件语句（ 、`if`或`iff`）分支中系列的使用情况时`?`，就会发生这种情况，并且 Pine Script™ 无法自动检测引用了多远的系列。以下是导致此问题的脚本示例：

```javascript
//@version=5
indicator("Requires max_bars_back")
test = 0.0
if bar_index > 1000
    test := ta.roc(close, 20)
plot(test)
```

为了帮助 Pine Script™ 进行检测，您应该将`max_bars_back` 参数添加到脚本`indicator`或`strategy`函数中：

```javascript
//@version=5
indicator("Requires max_bars_back", max_bars_back = 20)
test = 0.0
if bar_index > 1000
    test := ta.roc(close, 20)
plot(test)
```

您还可以通过将有问题的表达式从条件分支中取出来解决问题，在这种情况下`max_bars_back` 不需要参数：

```javascript
//@version=5
indicator("My Script")
test = 0.0
roc20 = ta.roc(close, 20)
if bar_index > 1000
    test := roc20
plot(test)
```

如果问题是由**变量**而不是内置**函数**引起的（`vwma`在我们的示例中），您可以使用该`max_bars_back`函数仅显式定义该变量的引用长度。这样做的优点是需要较少的运行时资源，但需要您识别有问题的变量，例如`s`以下示例中的变量：

```javascript
//@version=5
indicator("My Script")
f(off) =>
    t = 0.0
    s = close
    if bar_index > 242
        t := s[off]
    t
plot(f(301))
```

这种情况可以通过使用`max_bars_back` **函数**仅定义变量的引用长度来解决`s`，而不是定义脚本的所有变量：

```javascript
//@version=5
indicator("My Script")
f(off) =>
    t = 0.0
    s = close
    max_bars_back(s, 301)
    if bar_index > 242
        t := s[off]
    t
plot(f(301))
```

当使用引用之前柱形图 至`bar_index[n]`和的绘图时，从该柱形图接收的时间序列将用于在时间轴上定位绘图。因此，如果无法确定缓冲区的正确大小，则可能会发生此错误。为了避免这种情况，您需要使用.有关[绘图的](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Lines_and_boxes.html#pagelinesandboxes-limitations-historicalbufferandmaxbarsback)部分更详细地描述了此行为。`xloc = xloc.bar_index`max_bars_back(time, n)