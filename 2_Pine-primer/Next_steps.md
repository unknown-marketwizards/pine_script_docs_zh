# 接下来的步骤

在你的[第一步](2_Pine-primer/First_steps.md)和你的[第一个指标](2_Pine-primer/First_indicator.md)之后，让我们通过分享一些指导你学习Pine的要点，来探索更多的Pine用法。

## "指标 "与 "策略"

Pine的`策略`是用来对历史数据进行回测和对公开市场进行正向测试。除了指标计算外，它们还包含`strategy.*()`调用，用于向Pine的交易所模拟器发送交易指令，然后可以模拟其执行。策略在图表底部的 "策略测试器 "（Strategy Tester）标签中显示回测结果，该标签紧挨着 "Pine编辑器 "（Pine Editor）标签。

Pine指标也包含计算，但不能用于回测。因为它们不需要交易所模拟器，它们使用的资源更少，运行速度也会更快。因此，只要有可能，使用指标是很有利的。

指标和策略都可以以叠加模式（在图表的条形图上）或窗格模式（在图表下方或上方的单独部分）运行。两者都可以在各自的空间中绘制信息，并且都可以生成[警报事件](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Alerts.html#pagealerts)。

## 脚本是如何执行的

Pine脚本不像许多编程语言中的程序，执行一次就停止了。在Pine的*runtime*环境中，脚本的运行相当于一个无形的循环，它在你所处的任何图表的每个K线上从左到右执行一次。脚本执行时已经关闭的图表条被称为*历史条*。当执行到图表的最后一个条形图，并且是开市的，它是在*实时条形图*。然后脚本在每次检测到价格或成交量变化时执行一次，在关闭时对该实时条进行最后一次执行。然后，该实时条就变成了一个*失效的实时条*。请注意，当脚本实时执行时，它不会在每次价格/成交量更新时重新计算图表上的所有历史条。它已经对这些条形图进行了一次计算，所以它不需要在每一个图表刻度上重新计算。更多信息请参见[执行模式](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)页面。

当一个脚本在历史条上执行时，[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)内置变量保持该条的收盘价。当脚本在实时条上执行时，[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)返回符号的**当前**价格，直到该条关闭。

与指标相反，Pine策略通常只在实时条上执行一次，当它们收盘时。如果你需要，它们也可以被配置为在每次价格/成交量更新时执行。更多信息请参见[策略](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Strategies.html#pagestrategies)页面，了解策略的计算方式与指标不同。

## 时间序列

Pine脚本中使用的主要数据结构被称为[时间序列](https://www.tradingview.com/pine-script-docs/en/v5/language/Time_series.html#pagetimeseries)。时间序列对脚本执行的每一个柱状体都包含一个值，所以当脚本在更多的柱状体上执行时，它们会不断扩展。时间序列过去的值可以用Pine的历史引用操作符来引用，例如：[[\]](https://www.tradingview.com/pine-script-reference/v5/#op_[]).close[1]，指的是在执行脚本中前一个k线的[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)的值。

虽然这种索引机制可能会让很多程序员联想到数组，但是时间序列是不同的，用数组的方式思考将不利于理解这个关键的Pine概念。对[执行模型](https://www.tradingview.com/pine-script-docs/en/v5/language/Execution_model.html#pageexecutionmodel)和[时间序列](https://www.tradingview.com/pine-script-docs/en/v5/language/Time_series.html#pagetimeseries)的良好理解是理解Pine脚本如何工作的关键。如果你以前从未处理过以时间序列组织的数据，你将需要练习使它们为你工作。一旦你熟悉了这些关键的概念，你就会发现，通过将时间序列的使用与我们设计的内置函数相结合，只需很少的几行Pine代码就可以完成很多工作。

## 发布脚本

TradingView是一个庞大的Pine开发员社区和来自世界各地的数百万名交易者的家园。一旦你对Pine足够熟练，你可以选择与其他交易者分享你的脚本。在这样做之前，请花时间充分学习Pine，以便为交易者提供一个原创的、可靠的工具。所有公开发布的脚本都会被我们的审核团队分析，并且必须遵守我们的[脚本发布规则](https://www.tradingview.com/house-rules/?solution=43000590599)，该规则要求这些脚本必须是原创的并且有好的文档说明。

如果想使用Pine脚本供自己使用，只需在Pine编辑器中编写，并从那里将其添加到你的图表中；你不必发布它们来使用它们。如果你想与几个朋友分享你的脚本，你可以私下发布它们，并把浏览器的链接发给你的朋友，让他们看到你的私人脚本。更多信息请参见发布页面。

## 了解Pine的文档

尽管从已发布的脚本中阅读代码无疑是有用的，但要达到对Pine的很高的熟练程度，花时间在我们的文档中是必要的。我们在Pine上的两个主要文档来源是：

- 这个Pine用户手册
- 我们的[Pine参考手册](https://www.tradingview.com/pine-script-reference/v5/)

[Pine参考手册](https://www.tradingview.com/pine-script-reference/v5/) 记录了每个变量、函数或Pine关键字的作用。它是所有Pine开发者的必备工具；如果你不参考它而试图编写复杂的脚本，你的过程将是痛苦的。它有两种访问方式：我们刚刚链接到的HTML，以及弹出式版本，可以从Pine编辑器中访问，方法是ctrl+点击一个关键字，或者使用编辑器的 "更多/Pine脚本参考 弹出式"（More/Pine Script reference (pop-up)）菜单。参考手册被翻译成了其他语言。

Pine有五个不同的版本。确保你使用的文档与你正在编码的Pine版本相一致。

## 如何阅读本文档？

这本[Pine用户手册](https://www.tradingview.com/pine-script-docs/en/v5/index.html)包含了许多代码实例。通过阅读它，你既可以学习Pine的基础，又可以研究示例脚本。阅读关键概念并立即用代码进行尝试，是学习任何编程语言的有效方法。希望你已经在[第一个指标](2_Pine-primer/First_indicator.md)页面中尝试了，把文档中示例代码复制到编辑器中然后调试他们。大胆探索! 你不会破坏任何东西。

这就是你正在阅读的Pine用户手册的组织方式。

- [语言](https://www.tradingview.com/pine-script-docs/en/v5/language/index.html#indexlanguage)部分解释了Pine语言的主要组成部分以及脚本如何执行。
- [Concepts](https://www.tradingview.com/pine-script-docs/en/v5/concepts/index.html#indexconcepts) 部分更多的是面向任务。它解释了如何在Pine中做事情。
- [Writing](https://www.tradingview.com/pine-script-docs/en/v5/writing/index.html#indexwriting) 部分探讨了帮助你编写和发布脚本的工具和技巧。
- [FAQ](https://www.tradingview.com/pine-script-docs/en/v5/Faq.html#pagefaq) 部分回答了Pine编码者的常见问题。
- [错误信息](https://www.tradingview.com/pine-script-docs/en/v5/Error_messages.html#pageerrormessages) 页面记录了最常见的运行时和编译器错误的原因和修复方法。
- [发布说明](https://www.tradingview.com/pine-script-docs/en/v5/Release_notes.html#pagereleasenotes)页面是你可以跟踪Pine的频繁更新的地方。
- [迁移指南](https://www.tradingview.com/pine-script-docs/en/v5/migration_guides/index.html#indexmigrationguides)部分解释了如何在不同版本的Pine之间移植。
- [Where can I get more information](https://www.tradingview.com/pine-script-docs/en/v5/Where_can_I_get_more_information.html#pagewherecanigetmoreinformation)页面列出了其他与Pine相关的有用内容，包括当你在代码上遇到困难时可以向哪里提问。

我们祝愿你在使用Pine的过程中获得成功......并进行交易
