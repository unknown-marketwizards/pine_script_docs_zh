# 发布脚本

希望与其他交易者分享 Pine 脚本的程序员可以发布它们。

提示：

*如果您编写的脚本供个人使用，则无需发布；您可以将它们保存在 Pine 编辑器中，然后使用“添加到图表”按钮将脚本添加到图表中。*

## [脚本可见性和访问](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id1)

当您发布脚本时，您可以控制其**可见性**和**访问权限**：

- **通过选择公开**或**私下**发布来控制**可见性**。请参阅[私人想法和脚本与公共想法和脚本有何不同？](https://www.tradingview.com/support/solutions/43000548335)请在帮助中心了解更多详细信息。当您编写了您认为对 TradingViewers 有用的脚本时，请公开发布。公共脚本需要经过审核。为了避免审核，请确保您的出版物符合我们的[内部规则](https://www.tradingview.com/support/solutions/43000591638)和 [脚本出版规则](https://www.tradingview.com/support/solutions/43000590599)。当您不希望所有其他用户看到您的脚本，但希望与一些朋友共享时，可以私下发布。
- **访问权限**决定用户是否会看到您的源代码，以及他们如何使用您的脚本。共有三种访问类型：*开放*、*受保护*（保留给付费帐户）或*仅限邀请*（保留给高级帐户）。请参阅[已发布的脚本有哪些不同类型？](https://www.tradingview.com/support/solutions/43000482573)请在帮助中心了解更多详细信息。

### [当您发布脚本时](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id2)

- `title`出版物的标题由脚本的 [indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句中的参数所使用的参数确定。当 TradingViewers 搜索脚本名称时也会使用该标题。
- 图表上脚本的名称将是用于`shorttitle`脚本的 [dicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或 [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)声明语句中的参数的参数，或者是[library()中的](https://www.tradingview.com/pine-script-reference/v5/#fun_library)title参数。
- 您的脚本必须有一个说明，解释您的脚本的用途以及如何使用它。
- 您发布时使用的图表将在您的出版物中可见，包括其中的任何其他脚本或绘图。在发布脚本之前，从图表中删除不相关的脚本或绘图。
- 您的脚本代码稍后可以更新。每个更新都可以包含*发行说明*，这些发行说明将显示在您的原始描述下方并注明日期。
- 脚本可以被其他用户点赞、分享、评论或举报。
- 您发布的脚本将显示在您的用户个人资料的“脚本”选项卡下。
- *为您的脚本*创建脚本小部件和*脚本页面*。脚本小部件是脚本的占位符，显示在平台上的脚本源中。它包含脚本的标题、图表和描述的前几行。当用户单击您的脚本**小部件**时，脚本的**页面**将打开。它包含与您的脚本相关的所有信息。

### [可见性](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id3)

#### [民众](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id4)

当您发布公共脚本时：

- 您的脚本将包含在我们的[社区脚本](https://www.tradingview.com/scripts/)中 ，该脚本对网站所有国际化版本上的数百万 TradingViewers 可见。
- 您的出版物必须遵守[《内部规则》](https://www.tradingview.com/support/solutions/43000591638) 和[《剧本出版规则》](https://www.tradingview.com/support/solutions/43000590599)。
- 如果您的脚本是仅限邀请的脚本，您必须遵守我们的[供应商要求](https://www.tradingview.com/support/solutions/43000549951)。
- 它可以通过脚本的搜索功能进行访问。
- 您将无法编辑原始描述或其标题，也无法更改其公共/私人可见性及其访问类型（开源、受保护、仅限邀请）。
- 您将无法删除您的出版物。

#### [私人的](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id5)

当您发布私有脚本时：

- 除非您与其他用户共享其 URL，否则其他用户将看不到它。
- 您可以从用户个人资料的“脚本”选项卡中看到它。
- 私有脚本可以通过其小部件右上角的“X”和“锁定”图标来识别。 “X”用于删除它。
- 它不会受到监管，除非您出售对它的访问权或将其公开提供，因为这样它就不再是“私有的”。
- 您可以更新其原始描述和标题。
- 您不能在任何公共 TradingView 内容（想法、脚本描述、评论、聊天等）中链接或提及它。
- 无法通过脚本搜索功能访问它。

### [使用权](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id6)

可以使用三种访问类型之一发布公共或私人脚本：开放、受保护或仅限邀请。您可以选择的访问类型将根据您持有的帐户类型而有所不同。

#### [打开](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id7)

**公开**发布的脚本的 Pine Script™ 代码对所有用户都可见。 TradingView 上的开源脚本默认使用 Mozilla 许可证，但您可以选择任何您想要的许可证。您可以在[GitHub](https://help.github.com/articles/licensing-a-repository/)上找到有关许可的信息。

#### [受保护](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id8)

**受保护**脚本的代码是隐藏的，除了其作者之外，没有人可以访问它。虽然脚本的代码不可访问，但任何用户都可以自由使用受保护的脚本。只有 Pro、Pro+ 或 Premium 帐户可以发布公共受保护的脚本。

#### [只有邀请](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id9)

**仅限邀请的**访问类型可以保护脚本的代码及其使用。仅限邀请的脚本的发布者必须明确向各个用户授予访问权限。仅限邀请的脚本主要由脚本供应商使用，提供对其脚本的付费访问。只有高级帐户才能发布仅限邀请的脚本，并且它们必须符合我们的[供应商要求](https://www.tradingview.com/support/solutions/43000549951)。

TradingView 不会从脚本销售中受益。仅限邀请的脚本的交易严格在用户和供应商之间进行；他们不涉及 TradingView。

仅限公开邀请的脚本是唯一允许供应商在 TradingView 上要求付款的脚本。

在仅限邀请的脚本页面上，作者将看到“管理访问”按钮。 “管理访问”窗口允许作者控制谁有权访问其脚本。

![PublishingScripts-Access-1](https://www.tradingview.com/pine-script-docs/en/v5/_images/PublishingScripts-Access-1.png)

## [准备出版物](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id10)

1. 即使您打算公开发布，最好从私人出版物开始，因为您可以使用它来验证最终出版物的外观。您可以编辑私人出版物的标题、描述、代码或图表，与公共脚本相反，您可以在不再需要私人脚本时将其删除，因此它们是公开共享脚本之前练习的完美方式。您可以在[《我们如何编写和格式化脚本描述》](https://www.tradingview.com/chart/SSP/aOYEvBxw-How-We-Write-and-Format-Script-Descriptions/)出版物中阅读有关准备脚本描述的更多信息。
2. 准备你的图表。将您的脚本加载到图表上，并删除其他无法帮助用户理解您的脚本的脚本或绘图。您的脚本的绘图应该很容易在将随其发布的图表上识别。
3. 如果尚未在 Pine 编辑器中加载您的代码。在编辑器中，单击“发布脚本”按钮：![PublishingScripts-PreparingAPublication-1](https://www.tradingview.com/pine-script-docs/en/v5/_images/PublishingScripts-PreparingAPublication-1.png)
4. 弹出窗口会提醒您，如果您公开发表文章，那么您的出版物必须遵守众议院规则，这一点很重要。完成弹出窗口后，将您的描述放入脚本标题下方的字段中。为您的出版物建议的默认标题是`title`脚本代码中的字段。最好使用该标题；如果您的脚本是公开的，它可以让用户更轻松地搜索您的脚本。选择您的出版物的可见性。我们想要发布私人出版物，因此我们选中“发布脚本”窗口右下角的“私人脚本”复选框：![PublishingScripts-PreparingAPublication-2](https://www.tradingview.com/pine-script-docs/en/v5/_images/PublishingScripts-PreparingAPublication-2.png)
5. 选择您想要的脚本访问类型：开放、受保护或仅限邀请。我们为开源选择了“开放”。![PublishingScripts-PreparingAPublication-3](https://www.tradingview.com/pine-script-docs/en/v5/_images/PublishingScripts-PreparingAPublication-3.png)
6. 为您的脚本选择适当的类别（至少有一个是强制性的）并输入可选的自定义标签。![PublishingScripts-PreparingAPublication-4](https://www.tradingview.com/pine-script-docs/en/v5/_images/PublishingScripts-PreparingAPublication-4.png)
7. 单击窗口右下角的“发布私有脚本”按钮。发布完成后，将出现您发布的脚本页面。你完成了！您可以通过转到您的用户个人资料并查看“脚本”选项卡来确认发布。从那里，您将能够打开脚本页面并使用脚本页面右上角的“编辑”按钮编辑您的私人出版物。请注意，您也可以更新私人出版物，就像更新公共出版物一样。如果您想与朋友分享您的私人出版物，请私下向她发送脚本页面的网址。请记住，您不得在公共 TradingView 内容中共享私人出版物的链接。

## [发布脚本](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id11)

无论您打算私下发布还是公开发布，请首先按照上一节中的步骤进行操作。如果您打算私下发布，就可以了。如果您打算公开发布并且对验证私人出版物的准备过程感到满意，请按照与上述相同的步骤操作，但不要选中“私人脚本”复选框，然后单击页面右下角的“发布公共脚本”按钮“发布脚本”页面。

当您发布新的公共脚本时，您有 15 分钟的时间来更改描述或删除出版物。此后，您将无法再更改出版物的标题、描述、可见性或访问类型。如果您犯了错误，请向[PineCoders](https://www.tradingview.com/u/PineCoders/)版主帐户发送消息；他们负责审核剧本出版物并提供帮助。

## [更新出版物](https://www.tradingview.com/pine-script-docs/en/v5/writing/Publishing.html#id12)

您可以更新公共或私人脚本出版物。更新脚本时，其代码必须与之前发布版本的代码不同。您可以在更新中添加发行说明。它们将出现在脚本页面中脚本的原始描述之后。

默认情况下，更新时使用的图表将替换脚本页面中以前的图表。但是，您可以选择不更新脚本页面的图表。请注意，虽然您可以更新脚本页面中显示的图表，但脚本小部件中的图表不会更新。

同样，您可以通过首先发布私有脚本来验证公共发布，您也可以先验证私有发布的更新，然后再在公共发布上进行更新。对于公共脚本和私有脚本，更新已发布脚本的过程是相同的。

如果您打算更新已发布脚本的代码和图表，请按照与新出版物相同的方式准备图表。在以下示例中，我们将**不会**更新出版物的图表：

1. 就像发布新出版物一样，在编辑器中加载脚本并单击“发布脚本”按钮。
2. 进入“发布脚本”窗口后，选择“更新现有脚本”按钮。然后从“选择脚本”下拉菜单中选择要更新的脚本：![PublishingScripts-UpdatingAPublication-1](https://www.tradingview.com/pine-script-docs/en/v5/_images/PublishingScripts-UpdatingAPublication-1.png)
3. 在文本字段中输入您的发行说明。代码中的差异在发行说明下方突出显示。
4. 我们不想更新出版物的图表，因此我们选中“不更新图表”复选框：![PublishingScripts-UpdatingAPublication-2](https://www.tradingview.com/pine-script-docs/en/v5/_images/PublishingScripts-UpdatingAPublication-2.png)
5. 单击“发布新版本”按钮。你完成了。