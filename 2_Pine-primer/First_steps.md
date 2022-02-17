# 第一步



## 介绍

欢迎来到《Pine脚本用户手册》，它将伴随你学习用Pine编程自己的交易工具的旅程。也欢迎你加入TradingView上非常活跃的Pine开发者社区。

在本页面中，我们将介绍一种循序渐进的方法，你可以按照这种方法逐步熟悉[TradingView](https://www.tradingview.com/)上用Pine编程语言编写的指标和策略（也称为脚本）。我们将让你开始你的旅程:

1. **使用**平台上现有的脚本中的一些。
2. **阅读**现有脚本的Pine代码。
3. **写**Pine的脚本。

如果您已经熟悉了TradingView上Pine脚本的使用，并且现在准备学习如何编写自己的脚本，那么请跳到本页面的[编写脚本](#写脚本)部分。

如果您是我们平台的新手，那么请继续阅读!

## 使用脚本

如果您有兴趣在TradingView上使用技术指标或策略，您可以首先开始探索我们平台上已有的数千个指标。你可以通过两种不同的方式访问平台上的现有指标。

- 通过使用图表的 "指标和策略 "按钮，或
- 通过浏览TradingView的[社区脚本](#)，这是世界上最大的交易脚本库，有超过10万个脚本，其中大部分是免费和开源的，这意味着你可以看到它们的Pine代码。

如果你能找到已经为你写好的你所需要的工具，这可能是一个很好的开始，并逐渐成为熟练的脚本用户，直到你准备好在Pine中开始你的编程之旅。

### 从图表中加载脚本

要探索并从你的图表中加载脚本，请使用 "指标和策略 "按钮。

![./_images/FirstSteps-LoadingScriptsFromTheChart-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/FirstSteps-LoadingScriptsFromTheChart-01.png)

对话框的左窗格中显示了不同类别的脚本。

- **收藏夹**（**Favorites**）列出了你已经 "收藏 "的脚本，你可以点击它的名字左边的星星，当你把鼠标放在它上面时，它就会出现。
- **我的脚本**（**My scripts**）显示您在Pine Editor中编写并保存的脚本。它们被保存在TradingView的云中。
- **内置插件**（**Built-ins** ）将所有TradingVIew内置插件分为四类：指标、策略、蜡烛图和成交量信息。大多数是用Pine编写的，可免费使用。
- **社区脚本**（**Community Scripts**）是您可以从TradingView用户编写的100,000多个已发布的脚本中搜索的地方。
- **仅限邀请的脚本**（**Invite-only scripts**）包含您已被其作者授予访问权的仅限邀请的脚本列表。

在这里，包含TradingView内置脚本的部分被选中。

![./_images/FirstSteps-LoadingScriptsFromTheChart-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/FirstSteps-LoadingScriptsFromTheChart-02.png)

当你点击其中一个指标或策略（名字后面有绿色和红色箭头的那些），它就会加载到你的图表上。

### 浏览社区脚本

从[TradingView的主页](https://www.tradingview.com/)，你可以从 "社区 "菜单中调出社区脚本流。这里，我们指的是 "编辑精选 "部分，但还有许多其他类别，你可以选择。

![../_images/FirstSteps-BrowsingCommunityScripts-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/FirstSteps-BrowsingCommunityScripts-01.png)

你也可以用主页上的 "搜索 "栏来搜索脚本，并使用不同的标准来过滤脚本。帮助中心有一个页面解释了[不同类型的脚本](https://www.tradingview.com/scripts/?solution=43000558522)。

脚本流显示了脚本的*图标*，即占位符，显示了每个出版物的图表和描述以及作者的小视图。通过点击它，你将打开*脚本的页面*，在那里你可以在图表上看到该脚本，阅读作者的描述，喜欢该脚本，留下评论或阅读该脚本的源代码（如果它是开源发布的）。

一旦你在社区脚本中找到了一个有趣的脚本，请按照帮助中心的指示来[把它加载到你的图表上](https://www.tradingview.com/script/?solution=43000555216)。

### 改变脚本设置

一旦一个脚本被加载到图表上，你可以双击它的名字(#1)来调出它的 "设置/输入"（Settings/Inputs）标签(#2)。

![./_images/FirstSteps-ChangingScriptSettings-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/FirstSteps-ChangingScriptSettings-01.png)

在 "输入"（Inputs）选项卡中，你可以编辑作者设置可编辑的设置。你可以用同一对话框中的 "风格 "选项卡来配置脚本的一些视觉效果，用 "可见性" （Visibility）选项卡来配置脚本应该出现在哪个时间段。

其他的设置可以从所有脚本的名字右边的按钮中获得，当你把鼠标放在它上面时，也可以从 "更多"菜单（三个点）中获得。

![./_images/FirstSteps-ChangingScriptSettings-02.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/FirstSteps-ChangingScriptSettings-02.png)

## 阅读脚本

阅读由**好**的程序员编写的代码是发展你对语言理解的最好方法。对于Pine来说，这和其他所有的编程语言一样，都是如此。找到好的开源Pine代码是相对容易的。这些都是由TradingView上的优秀程序员编写的可靠的代码来源：

- TradingView的内置指标
- 被选为[编辑推荐](https://www.tradingview.com/scripts/editors-picks/)的脚本
- 由[PineCoders官方账户关注的作者](https://www.tradingview.com/u/PineCoders/#following-people)编写的脚本
- 许多脚本由具有较高声誉和开源出版物的作者编写。

阅读你在[开放库](https://www.tradingview.com/scripts/)中找到的脚本的代码是很容易的；如果你在脚本小部件的右上角没有看到灰色或红色的 "锁 "图标，这表明该脚本是开源的。打开它的脚本页面，你就可以看到它的源代码。

要查看TradingView内置程序的代码，请在您的图表上加载该指标，然后将鼠标悬停在其名称上并选择 "源代码 "大括号图标（如果您没有看到它，那是因为该指标的源代码不可用）。当你点击该图标时，Pine编辑器将打开，从那里你可以看到脚本的代码。如果你想调试它，你需要使用编辑器窗格右上方的 "更多 "菜单按钮，并选择 "复制一份..."（Make a copy...）。然后你将能够修改和保存代码。因为你已经创建了一个不同版本的脚本，所以你需要使用编辑器的 "添加到图表 "按钮，将这个新副本添加到图表中。

这显示了我们在图表上选择了指标的 "查看来源 "（View source）按钮后，Pine编辑器刚刚打开。我们即将对其源文件进行复制，因为它现在是只读的（在编辑器中其文件名附近的 "锁 "图标表示）。

![./_images/FirstSteps-ReadingScripts-01.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/FirstSteps-ReadingScripts-01.png)

你也可以通过使用 "打开/新的默认内置脚本...... "（Open/New default built-in script…）菜单选择，从Pine编辑器（可从图表底部的 "Pine Editor "标签进入）打开TradingView内置指标。

## 写脚本

我们建立Pine Script的目的是为了让初出茅庐的交易者和经验丰富的交易者都能创建自己的交易工具。我们的设计使它对于第一次学习的程序员来说相对容易--尽管学习第一种编程语言，如交易，对任何人来说都**很**容易--但对于有知识的程序员来说，它又足够强大，可以建立中等复杂度的工具。

Pine允许你编写三种类型的脚本。

- **指标**如RSI、MACD等。
- **策略**，包括发出交易指令的逻辑，可以进行回测和正向测试。
- **库**，由更高级的程序员使用，将经常使用的函数打包，可以被其他脚本重复使用。

我们推荐的下一步是编写你的[第一个指标](2_Pine-primer/First_indicator.md)。)

