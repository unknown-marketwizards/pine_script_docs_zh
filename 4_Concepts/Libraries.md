# 库函数

# [介绍](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#id1)

Pine Script™ 库是包含可在指标、策略或其他库中重用的函数的出版物。它们对于定义常用函数很有用，因此不必将其源代码包含在需要它们的每个脚本中。

库必须先发布（私下或公开），然后才能在另一个脚本中使用。所有库都是开源发布的。公共脚本只能使用公共库，并且它们必须是开源的。保存在 Pine Script™ 编辑器中的私有脚本或个人脚本可以使用公共或私有库。一个库可以使用其他库，甚至可以使用其自身的早期版本。

库程序员应该熟悉 Pine Script™ 的类型命名法、范围和用户定义的函数。如果您需要温习合格的类型，请参阅[类型系统](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem)上的用户手册页面。有关用户定义函数和作用域的更多信息，请参阅[用户定义函数](https://www.tradingview.com/pine-script-docs/en/v5/language/User-defined_functions.html#pageuserdefinedfunctions)页面。

您可以在 TradingView[社区脚本](https://www.tradingview.com/scripts/?script_type=libraries)中浏览成员公开发布的库脚本。

## [创建库](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#id2)

库是一种特殊类型的脚本，以[library()](https://www.tradingview.com/pine-script-reference/v5/#fun_library)声明语句开头，而不是[indicator()](https://www.tradingview.com/pine-script-reference/v5/#fun_indicator)或[strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy)。库包含可导出的函数定义，当另一个脚本使用库时，它们构成库的唯一可见部分。库还可以在其全局范围内使用其他 Pine Script™ 代码，就像普通指示器一样。该代码通常用于演示如何使用库的函数。

库脚本具有以下结构，其中必须定义一个或多个可导出函数：

```javascript
//@version=5

// @description <library_description>
library(title, overlay)

<script_code>

// @function <function_description>
// @param <parameter> <parameter_description>
// @returns <return_value_description>
export <function_name>([simple/series] <parameter_type> <parameter_name> [= <default_value>] [, ...]) =>
    <function_code>

<script_code>
```

注意：

- 、和[编译器注释](https://www.tradingview.com/pine-script-docs/en/v5/language/Script_structure.html#pagescriptstructure-compilerannotations)是可选的，但我们强烈建议您使用它们。它们有双重目的：记录库的代码并填充作者在发布库时可以使用的默认库描述。`// @description``// @function``// @param``// @returns`
- 导出关键字是强制性[的](https://www.tradingview.com/pine-script-reference/v5/#op_export)。
- <parameter_type> 是强制性的，这与指标或策略中用户定义的函数参数定义相反，后者是无类型的。
- <script_code> 可以是您通常在指标中使用的任何代码，包括输入或绘图。

这是一个示例库：

```javascript
//@version=5

// @description Provides functions calculating the all-time high/low of values.
library("AllTimeHighLow", true)

// @function Calculates the all-time high of a series.
// @param val Series to use (`high` is used if no argument is supplied).
// @returns The all-time high for the series.
export hi(float val = high) =>
    var float ath = val
    ath := math.max(ath, val)

// @function Calculates the all-time low of a series.
// @param val Series to use (`low` is used if no argument is supplied).
// @returns The all-time low for the series.
export lo(float val = low) =>
    var float atl = val
    atl := math.min(atl, val)

plot(hi())
plot(lo())
```



### [库函数](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#id3)

库中的函数定义与指标和策略中的用户定义函数略有不同。库函数体内可以包含的内容是有限制的。

在库函数签名中（第一行）：

- 导出关键字是强制性[的](https://www.tradingview.com/pine-script-reference/v5/#op_export)。
- 必须明确提及每个参数所需的参数类型。
- simple或 [series关键字可以限制允许的参数](https://www.tradingview.com/pine-script-reference/v5/#op_simple)[限定](https://www.tradingview.com/pine-script-reference/v5/#op_series) 类型（下一节将解释它们的用途）。

这些是对库函数施加的约束：

- 它们不能使用库全局范围内的变量，除非它们被限定为“const”。这意味着您不能使用例如从脚本输入初始化的全局变量或全局声明的数组。
- `request.*()`不允许打电话。
- `input.*()`不允许打电话。
- `plot*()`，`fill()`并且`bgcolor()`不允许打电话。

库函数总是返回被限定为“简单”或“系列”的结果。您不能在需要“const”或“input”限定值的地方使用它们，就像某些内置函数的情况一样。例如，库函数不能用于计算[plot()](https://www.tradingview.com/pine-script-reference/v5/#fun_plot)`show_last`调用中参数 的参数，因为它需要“输入int”值。

### [合格的类型控制](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#id4)

调用库函数时提供的参数的限定类型是根据每个参数在函数内部的使用方式自动检测的。如果论证可以用作“系列”，那么它就被限定为“系列”。如果不能，则尝试使用“simple”类型限定符。这解释了为什么这段代码：

```javascript
export myEma(int x) =>
    ta.ema(close, x)
```

`myCustomLibrary.myEma(20)`即使[ta.ema()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}ema)的`length`参数需要一个“简单 int”参数，使用 using 调用时也会起作用。当 Pine Script™ 编译器检测到“系列”长度不能与 [ta.ema()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}ema)一起使用时，它会尝试“简单”限定符，在本例中这是允许的。

虽然库函数不能返回“常量”或“输入”值，但可以编写它们来产生“简单”结果。这使得它们比返回“系列”结果的函数在更多上下文中有用，因为某些内置函数不允许“系列”参数。例如，[request.security()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}security) 需要一个“简单字符串”作为其`symbol`参数。如果我们编写一个库函数来按以下方式组装参数`symbol`，则该函数的结果将不起作用，因为它是“系列字符串”限定类型：

```javascript
export makeTickerid(string prefix, string ticker) =>
    prefix + ":" + ticker
```

然而，通过将参数限定符限制为“simple”，我们可以强制函数产生“simple”结果。我们可以通过在参数类型前加上 [simple](https://www.tradingview.com/pine-script-reference/v5/#op_simple)关键字来实现这一点：

```javascript
export makeTickerid(simple string prefix, simple string ticker) =>
    prefix + ":" + ticker
```

请注意，对于返回“简单”值的函数，在其计算中不能使用“系列”值；否则结果将是一个“系列”值。

还可以使用[series](https://www.tradingview.com/pine-script-reference/v5/#op_simple) 关键字作为库函数参数类型的前缀。但是，由于默认情况下参数被限定为“系列”，因此使用 [系列](https://www.tradingview.com/pine-script-reference/v5/#op_simple)修饰符是多余的。



### [用户定义的类型和对象](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#id5)

您可以从库中导出[用户定义类型 (UDT)](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-userdefinedtypes)，并且库函数可以返回[对象](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#pageobjects)。

要导出 UDT，请在其定义前加上[导出](https://www.tradingview.com/pine-script-reference/v5/#op_export) 关键字，就像导出函数一样：

```javascript
//@version=5
library("Point")

export type point
    int x
    float y
    bool isHi
    bool wasBreached = false
```

导入该库并从其`point`UDT 创建对象的脚本看起来有点像这样：

```javascript
//@version=5
indicator("")
import userName/Point/1 as pt
newPoint = pt.point.new()
```

注意：

- 此代码无法编译，因为没有发布“Point”库，并且脚本不显示任何内容。
- `userName`需要替换为库发布者的 TradingView 用户名。
- 我们使用内置`new()`方法从 UDT 创建对象`point`。
- [我们使用import](https://www.tradingview.com/pine-script-reference/v5/#op_import)语句中定义的别名 作为对库`point`UDT的引用的前缀，就像使用导入库中的函数一样。`pt`

如果库中使用的 UDT的任何导出函数使用参数或返回该用户定义类型的结果，则**必须导出该 UDT。**

当库仅在内部使用 UDT 时，无需将其导出。以下库`point`内部使用了 UDT，但仅`drawPivots()`导出其函数，不使用参数也不返回`point`类型的结果：

```javascript
//@version=5
library("PivotLabels", true)

// We use this `point` UDT in the library, but it does NOT require exporting because:
//   1. The exported function's parameters do not use the UDT.
//   2. The exported function does not return a UDT result.
type point
    int x
    float y
    bool isHi
    bool wasBreached = false


fillPivotsArray(qtyLabels, leftLegs, rightLegs) =>
    // Create an array of the specified qty of pivots to maintain.
    var pivotsArray = array.new<point>(math.max(qtyLabels, 0))

    // Detect pivots.
    float pivotHi = ta.pivothigh(leftLegs, rightLegs)
    float pivotLo = ta.pivotlow(leftLegs, rightLegs)

    // Create a new `point` object when a pivot is found.
    point foundPoint = switch
        pivotHi => point.new(time[rightLegs], pivotHi, true)
        pivotLo => point.new(time[rightLegs], pivotLo, false)
        => na

    // Add new pivot info to the array and remove the oldest pivot.
    if not na(foundPoint)
        array.push(pivotsArray, foundPoint)
        array.shift(pivotsArray)

    array<point> result = pivotsArray


detectBreaches(pivotsArray) =>
    // Detect breaches.
    for [i, eachPoint] in pivotsArray
        if not na(eachPoint)
            if not eachPoint.wasBreached
                bool hiWasBreached =     eachPoint.isHi and high[1] <= eachPoint.y and high > eachPoint.y
                bool loWasBreached = not eachPoint.isHi and low[1]  >= eachPoint.y and low  < eachPoint.y
                if hiWasBreached or loWasBreached
                    // This pivot was breached; change its `wasBreached` field.
                    point p = array.get(pivotsArray, i)
                    p.wasBreached := true
                    array.set(pivotsArray, i, p)


drawLabels(pivotsArray) =>
    for eachPoint in pivotsArray
        if not na(eachPoint)
            label.new(
              eachPoint.x,
              eachPoint.y,
              str.tostring(eachPoint.y, format.mintick),
              xloc.bar_time,
              color = eachPoint.wasBreached ? color.gray : eachPoint.isHi ? color.teal : color.red,
              style = eachPoint.isHi ? label.style_label_down: label.style_label_up,
              textcolor = eachPoint.wasBreached ? color.silver : color.white)


// @function        Displays a label for each of the last `qtyLabels` pivots.
//                  Colors high pivots in green, low pivots in red, and breached pivots in gray.
// @param qtyLabels (simple int) Quantity of last labels to display.
// @param leftLegs  (simple int) Left pivot legs.
// @param rightLegs (simple int) Right pivot legs.
// @returns         Nothing.
export drawPivots(int qtyLabels, int leftLegs, int rightLegs) =>
    // Gather pivots as they occur.
    pointsArray = fillPivotsArray(qtyLabels, leftLegs, rightLegs)

    // Mark breached pivots.
    detectBreaches(pointsArray)

    // Draw labels once.
    if barstate.islastconfirmedhistory
        drawLabels(pointsArray)


// Example use of the function.
drawPivots(20, 10, 5)
```

如果 TradingView 用户发布了上述库，则可以这样使用：

```javascript
//@version=5
indicator("")
import TradingView/PivotLabels/1 as dpl
dpl.drawPivots(20, 10, 10)
```

## [发布库](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#id6)

在您或其他 Pine Script™ 程序员可以重用任何库之前，必须先发布该库。如果您想与所有 TradingViewers 共享您的库，请公开发布。要私人使用它，请使用私人出版物。与指标或策略一样，当您发布库时，活动图表将同时出现在其小部件（表示 TradingView 脚本流中的库的小占位符）和脚本页面（用户单击小部件时看到的页面）中。

私有库可以在公共受保护或仅限邀请的脚本中使用。

将我们的示例库添加到图表并设置一个干净的图表以我们想要的方式显示我们的库绘图后，我们使用 Pine 编辑器的“发布脚本”按钮。出现“发布库”窗口：

![../_images/Libraries-CreatingALibrary-PublishWindow.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Libraries-CreatingALibrary-PublishWindow.png)

注意：

- 我们保留库的标题不变（[library()](https://www.tradingview.com/pine-script-reference/v5/#fun_library)`title`声明语句中的参数 用作默认值）。虽然您可以更改出版物的标题，但最好保留其默认值，因为该参数用于引用 [导入](https://www.tradingview.com/pine-script-reference/v5/#op_import)语句中的导入库。当您的出版物标题与图书馆的实际名称相匹配时，图书馆用户的生活会更轻松。`title`
- 默认描述是根据我们在库中使用的[编译器注释](https://www.tradingview.com/pine-script-docs/en/v5/language/Script_structure.html#pagescriptstructure-compilerannotations)构建的。我们将发布该库而不对其进行修改。
- 我们选择公开发布我们的库，因此所有 TradingViewers 都可以看到它。
- 我们无法选择“开放”以外的可见性类型，因为库始终是开源的。
- 图书馆的类别列表与指标和策略的类别列表不同。我们选择了“统计和指标”类别。
- 我们添加了一些自定义标签：“历史上”、“最高”和“最低”。

公共库的目标用户是其他 Pine 程序员；您对库的功能解释和记录得越好，其他人使用它们的机会就越大。提供示例来演示如何在出版物的代码中使用库的函数也会有所帮助。

### [家庭规则](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#id7)

[在我们的《脚本发布内部规则》](https://www.tradingview.com/support/solutions/43000590599)中，Pine 库被视为“公共领域”代码 ，这意味着如果您在开源脚本中调用它们的函数或重用它们的代码，则不需要获得其作者的许可。但是，如果您打算在公共受保护或仅限邀请的出版物中重用 Pine Script™ 库函数中的代码，则需要获得其作者的明确许可才能以该形式重用。

无论是使用库的函数还是重用其代码，您都必须在出版物的描述中注明作者。这也是在开源评论中值得赞扬的好形式。



## [使用库](https://www.tradingview.com/pine-script-docs/en/v5/concepts/Libraries.html#id8)

使用另一个脚本中的库（可以是指标、策略或另一个库）是通过[import](https://www.tradingview.com/pine-script-reference/v5/#op_import)语句完成的：

```javascript
import <username>/<libraryName>/<libraryVersion> [as <alias>]
```

在哪里：

- <用户名>/<库名称>/<库版本> 路径将唯一标识该库。
- 必须显式指定 <libraryVersion>。为了确保使用库的脚本的可靠性，无法自动使用最新版本的库。每次作者发布库更新时，库的版本号都会增加。如果您打算使用最新版本的库，则需要在[导入](https://www.tradingview.com/pine-script-reference/v5/#op_import)语句中更新 <libraryVersion> 值。
- 该部分是可选的。使用时，它定义将引用库函数的名称空间。例如，如果您像下面的示例中那样使用别名导入库，您将将该库的函数称为.当未定义别名时，库的名称将成为其命名空间。`as <alias>``allTime``allTime.<function_mame>()`

要使用我们在上一节中发布的库，我们的下一个脚本将需要一个[import](https://www.tradingview.com/pine-script-reference/v5/#op_import)语句：

```javascript
import PineCoders/AllTimeHighLow/1 as allTime
```

当您键入库作者的用户名时，您可以使用编辑器的ctrl+ space/ cmd+ space“自动完成”命令显示一个弹出窗口，提供与可用库匹配的选择：

![../_images/Libraries-UsingALibrary-1.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Libraries-UsingALibrary-1.png)

这是一个重用我们库的指标：

```javascript
//@version=5
indicator("Using AllTimeHighLow library", "", true)
import PineCoders/AllTimeHighLow/1 as allTime

plot(allTime.hi())
plot(allTime.lo())
plot(allTime.hi(close))
```

注意：

- 我们选择在脚本中使用库实例的“allTime”别名。在编辑器中输入该别名时，将出现一个弹出窗口，帮助您从库中选择要使用的特定函数。
- 我们使用不带参数的库`hi()`和函数，因此默认的[high](https://www.tradingview.com/pine-script-reference/v5/#var_high)和 [low](https://www.tradingview.com/pine-script-reference/v5/#var_low)内置变量将分别用于它们的系列。`lo()`
- 我们第二次调用`allTime.hi()`，但这次使用[close](https://www.tradingview.com/pine-script-reference/v5/#var_close)作为其参数，以绘制图表历史中的最高[收盘价。](https://www.tradingview.com/pine-script-reference/v5/#var_close)