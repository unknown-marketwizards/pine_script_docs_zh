# 第一个指标

## Pine编辑器

Pine编辑器是你处理你的脚本的地方。虽然你可以使用任何你想要的文本编辑器来编写你的Pine脚本，但使用我们的编辑器有很多好处。

- 它可以按照Pine的语法突出显示你的代码。
- 当你把鼠标悬停在内置和库函数上时，它会弹出语法提醒。
- 当你用ctrl+单击（Windows）或者cmd+单击（MAC）Pine关键词时，它提供了快速访问Pine参考手册的弹出窗口。
- 它提供了一个自动完成功能，你可以用ctrl + space / cmd + space来激活。
- 它使写/编译/运行周期变得很快，因为保存加载在图表上的新脚本会立即执行它。
- 虽然不像外面的顶级编辑器那样功能丰富，但它提供了关键的功能，如搜索和替换，多光标和版本管理。

要打开编辑器，请点击TradingView图表底部的 "Pine Editor "标签。这将打开编辑器的窗口。



## 第一个版本

我们现在将创建我们的第一个工作的Pine脚本，一个在Pine中实现[MACD](https://www.tradingview.com/support/solutions/43000502344-macd-moving-average-convergence-divergence/)指标的脚本。

```javascript
//@version=5
indicator("MACD #1")
fast = 12
slow = 26
fastMA = ta.ema(close, fast)
slowMA = ta.ema(close, slow)
macd = fastMA - slowMA
signal = ta.ema(macd, 9)
plot(macd, color = color.blue)
plot(signal, color = color.orange)
```

- 首先调出编辑器右上方的 "打开 "(Open)下拉菜单，选择 "新建空白指标"(New blank indicator)。
- 然后复制上面的例子脚本，注意不要把行号包括在你的选择中。
- 选择已经在编辑器中的所有代码，用示例脚本替换它。
- 点击 "保存 "(Save)并为你的脚本选择一个名称。你的脚本现在被保存在TradingView的云端，但在你的账户名下。除了你，没有人可以使用它。
- 在编辑器的菜单栏中点击 "添加到图表"(Add to Chart)。MACD指标出现在你的图表下的一个单独的*窗口*中。

你的第一个Pine脚本正在你的图表上运行，它应该看起来像这样。

![./_images/FirstIndicator-Version1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/FirstIndicator-Version1.png)

让我们逐行看一下我们的脚本代码。

- 第1行：`//@version=5`

  这是一个包含编译器指令的注释，告诉编译器脚本将使用Pine的第5版。

- 第2行。`indicator("MACD #1")`

  定义了脚本的名称，它将在图表上显示为 "MACD"。

- 第3行。`fast = 12`

  定义了一个`fast`整数变量，它将是快速EMA的长度。

- 第4行。`slow = 26`

  定义一个`slow`整数变量，它将是慢速EMA的长度。

- 第5行: `fastMA = ta.ema(close, fast)`

  定义变量 `fastMA`，包含EMA计算的结果（指数移动平均线），其长度等于 `fast`（12），根据每日收盘价而来。

- 第6行: `slowMA = ta.ema(close, slow)`

  定义变量 `slowMA`，包含长度等于 `slow`（26）的EMA计算结果，来自 `close`。

- 第7行: `macd = fastMA - slowMA`

  定义变量`macd`为两个EMA的差值。

- 第8行：`signal = ta.ema(macd, 9)`

  定义变量`signal`为`macd`的平滑值，使用EMA算法（指数移动平均），长度为9。

- 第9行。`plot(macd, color = color.blue)`

  调用`plot`函数，使用蓝线输出变量`macd`。

- 第10行：`plot(signal, color = color.orange)`调用`plot`函数，用蓝色线条输出变量`macd`

  调用`plot`函数，用一条橙色的线来输出变量。
  
  

## 第二个版本

我们脚本的第一个版本是 `手动`计算MACD，但由于Pine是为编写指标和策略而设计的，许多常见的指标都有内置的Pine函数，包括一个用于MACD的函数：[ta.macd()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}macd)。

这是我们脚本的第二个版本：

```javascript
//@version=5
indicator("MACD #2")
fastInput = input(12, "Fast length")
slowInput = input(26, "Slow length")
[macdLine, signalLine, histLine] = ta.macd(close, fastInput, slowInput, 9)
plot(macdLine, color = color.blue)
plot(signalLine, color = color.orange)
```



请注意，我们已经:

- 增加了输入，所以我们可以改变MAs的长度
- 我们现在使用[ta.macd()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}macd)Pine内置函数来计算我们的MACD，这为我们节省了三行，使我们的代码更容易阅读。

让我们重复之前的过程，在一个新的指标中复制该代码：

- 首先调出编辑器右上方的 "打开 "（Open）下拉菜单，选择 "新建空白指标"（New blank indicator）。
- 然后复制上面的例子脚本，同样注意不要把行号复制进去。
- 选择已经在编辑器中的所有代码，用我们的脚本的第二个版本替换它。
- 点击 "保存"（Save），为你的脚本选择一个与前一个不同的名称。
- 在编辑器的菜单栏中点击 "添加到图表"(Add to Chart)。`MACD #2 `指标出现在 `MACD #1`指标下的一个单独的*窗格*中。

你的第二个Pine脚本正在你的图表上运行。如果你在图表上双击该指标的名称，你将调出该脚本的 "设置/输入 "选项卡，现在你可以改变慢速和快速的长度。

![./_images/FirstIndicator-Version2.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/FirstIndicator-Version2.png)

让我们来看看在我们的脚本的第二个版本中，有哪些行发生了变化。

- 第2行:`indicator("MACD #2")`

  我们将`#1`改为`#2`，这样我们的第二个版本的指标就会在图表上显示一个不同的名称。

- 第3行:`fastInput = input(12, "Fast length")`

  我们没有给变量分配一个常量值，而是使用了[input()](https://www.tradingview.com/pine-script-reference/v5/#fun_input)函数，因此我们可以在脚本的 "设置/输入"(Settings/Inputs)标签中改变数值。`12`将是默认值，该字段的标签将是`"快速长度"`。如果在 "输入 "选项卡中改变了数值，`fastInput`变量的内容将包含新的数值，脚本将用这个新的数值在图表上重新执行。请注意，正如我们的[Pine Style Guide](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#pagestyleguide)所建议的，我们在变量名称的后面加上`Input`，以便在以后的脚本中提醒我们，它的值来自于用户的输入。

- 第4行:`slowInput = input(26, "Slow length")`

  我们对慢速长度做同样的处理，注意使用不同的变量名、默认值和字段标签。

- 第5行:`[macdLine, signalLine, histLine] = ta.macd（close, fastInput, slowInput, 9）`

  这就是我们调用[ta.macd()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}macd)内置函数，只用一行就能完成第一版的所有计算。该函数需要四个参数（函数名称后面的值，用圆括号括起来）。它在三个变量中返回三个值，而不是像我们之前使用的函数那样只返回一个值，这就是为什么我们需要将接收函数结果的三个变量列表用方括号括起来，在`=`符号的左边。注意，我们传递给函数的两个值是包含快速和慢速长度的 "输入 "变量：`fastInput`和`slowInput`。

- 第6行和第7行。

  我们绘制的变量名称已经改变了，但这几行所做的事情与我们第一个版本中的相同。

我们的第二个版本所做的计算与第一个版本相同，但我们可以改变用于计算的两个变量。我们的代码也更简单，短了三行。我们已经改进了我们的脚本。

## 接下来

我们现在建议你去我们的[下一步](Next_steps.md)页面。