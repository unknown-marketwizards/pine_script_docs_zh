# 循环

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#id1)

### [当不需要循环时](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#id2)

Pine Script™ 的运行时及其内置函数使得在许多情况下不需要循环。尚未熟悉 Pine Script™ 运行时和内置程序的新晋 Pine Script™ 程序员如果想要计算最后 10 个 [接近](https://www.tradingview.com/pine-script-reference/v5/#var_close)值的平均值，通常会编写如下代码：

```
Pine Script™
Copied//@version=5
indicator("Inefficient MA", "", true)
MA_LENGTH = 10
sumOfCloses = 0.0
for offset = 0 to MA_LENGTH - 1
    sumOfCloses := sumOfCloses + close[offset]
inefficientMA = sumOfCloses / MA_LENGTH
plot(inefficientMA)
```

在 Pine 中完成此类任务时，[for](https://www.tradingview.com/pine-script-reference/v5/#op_for)循环是不必要的且效率低下。应该这样做。此代码更短*并且*运行速度更快，因为它不使用循环并使用 [ta.sma()](https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}sma) 内置函数来完成任务：

```
Pine Script™
Copied//@version=5
indicator("Efficient MA", "", true)
thePineMA = ta.sma(close, 10)
plot(thePineMA)
```

计算最后一个条中某个条件的出现次数也是 Pine Script™ 初学者经常认为必须使用循环完成的一项任务。要计算最后 10 个柱中的上涨柱数，他们将使用：

```
Pine Script™
Copied//@version=5
indicator("Inefficient sum")
MA_LENGTH = 10
upBars = 0.0
for offset = 0 to MA_LENGTH - 1
    if close[offset] > open[offset]
        upBars := upBars + 1
plot(upBars)
```

在 Pine 中编写此代码的有效方法（对于程序员来说，因为它可以节省时间，实现最快加载图表，并最公平地共享我们的公共资源），是使用 math.sum [()](https://www.tradingview.com/pine-script-reference/v5/#fun_math{dot}sum) 内置函数来完成任务：

```
Pine Script™
Copied//@version=5
indicator("Efficient sum")
upBars = math.sum(close > open ? 1 : 0, 10)
plot(upBars)
```

那里发生的事情是：

- 我们使用[?:](https://www.tradingview.com/pine-script-reference/v5/#op_{question}{colon}) 三元运算符构建一个表达式，在向上的柱上生成 1，在其他柱上生成 0。
- 我们使用[math.sum()](https://www.tradingview.com/pine-script-reference/v5/#fun_math{dot}sum) 内置函数来保存最后 10 个柱的该值的运行总和。

### [何时需要循环](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#id3)

循环的存在有充分的理由，因为即使在 Pine Script™ 中，它们在某些情况下也是必要的。这些案例通常包括：

- [集合（数组](https://www.tradingview.com/pine-script-docs/en/v5/language/Arrays.html#pagearrays)、[矩阵](https://www.tradingview.com/pine-script-docs/en/v5/language/Matrices.html#pagematrices)和[映射](https://www.tradingview.com/pine-script-docs/en/v5/language/Maps.html#pagemaps)）的操作。
- 回顾历史，使用只能在当前柱上知道的参考值来分析柱，例如，找出有多少过去的高点高于 当前柱的[高点](https://www.tradingview.com/pine-script-reference/v5/#var_high)。由于当前柱的[最高价](https://www.tradingview.com/pine-script-reference/v5/#var_high) 仅在脚本运行的柱上已知，因此需要一个循环来及时返回并分析过去的柱。
- 对过去的柱进行无法使用内置函数完成的计算。



## [`for`](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#id4)

for[结构](https://www.tradingview.com/pine-script-reference/v5/#op_for) 允许使用计数器重复执行语句。其语法为：

```
Pine Script™
Copied[[<declaration_mode>] [<type>] <identifier> = ]for <identifier> = <expression> to <expression>[ by <expression>]
    <local_block_loop>
```

在哪里：

- 方括号 ( `[]`) 中的部分可以出现零次或一次，大括号 ( `{}`) 中的部分可以出现零次或多次。
- <declaration_mode> 是变量的[声明模式](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-declarationmodes)
- <type> 是可选的，就像在几乎所有 Pine Script™ 变量声明中一样（请参阅[types](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types)）
- <identifier> 是变量的[名称](https://www.tradingview.com/pine-script-docs/en/v5/language/Identifiers.html#pageidentifiers)
- <表达式> 可以是文字、变量、表达式或函数调用。
- <local_block_loop> 由零个或多个语句组成，后跟一个返回值，该返回值可以是值的元组。它必须缩进四个空格或制表符。它可以包含`break`退出循环的语句，或`continue`退出当前迭代并继续下一个迭代的语句。
- 分配给该变量的值是<local_block_loop>的返回值，即循环最后一次迭代计算的最后一个值，或者如果循环未执行则为[na 。](https://www.tradingview.com/pine-script-reference/v5/#var_na)
- 中的标识符是循环的计数器*初始值*。`for <identifier>`
- 中的表达式是计数器的*起始值。*`= <expression>`
- 中的表达式是计数器的*最终值。***它仅在进入循环时才被评估**。`to <expression>`
- 中的表达式是可选的。这是循环计数器在循环的每次迭代中增加或减少的步骤。当 时，其默认值为 1 。时为-1 。用作默认值的步长（+1 或-1）由开始值和结束值确定。`by <expression>``start value < end value``start value > end value`

此示例使用[for](https://www.tradingview.com/pine-script-reference/v5/#op_for) 语句来回顾用户定义的柱形数量，以确定有多少柱形的 [最高点](https://www.tradingview.com/pine-script-reference/v5/#var_high)高于或低于 图表上最后一个柱形的[最高点](https://www.tradingview.com/pine-script-reference/v5/#var_high)。这里需要一个[for](https://www.tradingview.com/pine-script-reference/v5/#op_for)循环，因为脚本只能访问图表最后一个柱上的参考值。这里，Pine Script™ 的运行时不能用于动态计算，因为脚本正在逐条执行：

```
Pine Script™
Copied//@version=5
indicator("`for` loop")
lookbackInput = input.int(50, "Lookback in bars", minval = 1, maxval = 4999)
higherBars = 0
lowerBars = 0
if barstate.islast
    var label lbl = label.new(na, na, "", style = label.style_label_left)
    for i = 1 to lookbackInput
        if high[i] > high
            higherBars += 1
        else if high[i] < high
            lowerBars += 1
    label.set_xy(lbl, bar_index, high)
    label.set_text(lbl, str.tostring(higherBars, "# higher bars\n") + str.tostring(lowerBars, "# lower bars"))
```

此示例在其函数中使用循环`checkLinesForBreaches()`来遍历枢轴线数组，并在价格穿过枢轴线时将其删除。这里需要一个循环，因为必须在每个柱上检查每个`hiPivotLines`和数组中的所有行`loPivotLines` ，并且没有内置函数可以为我们执行此操作：

```
Pine Script™
Copied//@version=5
MAX_LINES_COUNT = 100
indicator("Pivot line breaches", "", true, max_lines_count = MAX_LINES_COUNT)

color hiPivotColorInput  = input(color.new(color.lime, 0), "High pivots")
color loPivotColorInput  = input(color.new(color.fuchsia, 0), "Low pivots")
int   pivotLegsInput     = input.int(5, "Pivot legs")
int   qtyOfPivotsInput   = input.int(50, "Quantity of last pivots to remember", minval = 0, maxval = MAX_LINES_COUNT / 2)
int   maxLineLengthInput = input.int(400, "Maximum line length in bars", minval = 2)

// ————— Queues a new element in an array and de-queues its first element.
qDq(array, qtyOfElements, arrayElement) =>
    array.push(array, arrayElement)
    if array.size(array) > qtyOfElements
        // Only deqeue if array has reached capacity.
        array.shift(array)

// —————— Loop through an array of lines, extending those that price has not crossed and deleting those crossed.
checkLinesForBreaches(arrayOfLines) =>
    int qtyOfLines = array.size(arrayOfLines)
    // Don't loop in case there are no lines to check because "to" value will be `na` then`.
    for lineNo = 0 to (qtyOfLines > 0 ? qtyOfLines - 1 : na)
        // Need to check that array size still warrants a loop because we may have deleted array elements in the loop.
        if lineNo < array.size(arrayOfLines)
            line  currentLine    = array.get(arrayOfLines, lineNo)
            float lineLevel      = line.get_price(currentLine, bar_index)
            bool  lineWasCrossed = math.sign(close[1] - lineLevel) != math.sign(close - lineLevel)
            bool  lineIsTooLong  = bar_index - line.get_x1(currentLine) > maxLineLengthInput
            if lineWasCrossed or lineIsTooLong
                // Line stays on the chart but will no longer be extend on further bars.
                array.remove(arrayOfLines, lineNo)
                // Force type of both local blocks to same type.
                int(na)
            else
                line.set_x2(currentLine, bar_index)
                int(na)

// Arrays of lines containing non-crossed pivot lines.
var array<line> hiPivotLines = array.new_line(qtyOfPivotsInput)
var array<line> loPivotLines = array.new_line(qtyOfPivotsInput)

// Detect new pivots.
float hiPivot = ta.pivothigh(pivotLegsInput, pivotLegsInput)
float loPivot = ta.pivotlow(pivotLegsInput, pivotLegsInput)

// Create new lines on new pivots.
if not na(hiPivot)
    line newLine = line.new(bar_index[pivotLegsInput], hiPivot, bar_index, hiPivot, color = hiPivotColorInput)
    line.delete(qDq(hiPivotLines, qtyOfPivotsInput, newLine))
else if not na(loPivot)
    line newLine = line.new(bar_index[pivotLegsInput], loPivot, bar_index, loPivot, color = loPivotColorInput)
    line.delete(qDq(loPivotLines, qtyOfPivotsInput, newLine))

// Extend lines if they haven't been crossed by price.
checkLinesForBreaches(hiPivotLines)
checkLinesForBreaches(loPivotLines)
```



## [`while`](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#id5)

while 结构允许重复执行语句，直到条件为假为止。其语法为：

```
Pine Script™
Copied[[<declaration_mode>] [<type>] <identifier> = ]while <expression>
    <local_block_loop>
```

在哪里：

- 方括号 ( `[]`) 中的部分可以出现零次或一次。
- <declaration_mode> 是变量的[声明模式](https://www.tradingview.com/pine-script-docs/en/v5/language/Variable_declarations.html#pagevariabledeclarations-declarationmodes)
- <type> 是可选的，就像在几乎所有 Pine Script™ 变量声明中一样（请参阅[types](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem-types)）
- <identifier> 是变量的[名称](https://www.tradingview.com/pine-script-docs/en/v5/language/Identifiers.html#pageidentifiers)
- <表达式> 可以是文字、变量、表达式或函数调用。它在循环的每次迭代时进行评估。当它的计算结果为 时`true`，循环就会执行。当它求值时`false`循环停止。请注意，表达式的计算仅在每次迭代之前完成。循环内表达式值的更改只会影响下一次迭代。
- <local_block_loop> 由零个或多个语句组成，后跟一个返回值，该返回值可以是值的元组。它必须缩进四个空格或制表符。它可以包含`break`退出循环的语句，或`continue`退出当前迭代并继续下一个迭代的语句。
- 分配给<identifier>变量的值是<local_block_loop>的返回值，即循环最后一次迭代计算的最后一个值，或者如果循环没有执行则为[na 。](https://www.tradingview.com/pine-script-reference/v5/#var_na)

这是使用 [while](https://www.tradingview.com/pine-script-reference/v5/#op_while)结构而不是 [for one 编写的](https://www.tradingview.com/pine-script-reference/v5/#op_for)[for](https://www.tradingview.com/pine-script-docs/en/v5/language/Loops.html#pageloops-for)部分的第一个代码示例：

```
Pine Script™
Copied//@version=5
indicator("`for` loop")
lookbackInput = input.int(50, "Lookback in bars", minval = 1, maxval = 4999)
higherBars = 0
lowerBars = 0
if barstate.islast
    var label lbl = label.new(na, na, "", style = label.style_label_left)
    // Initialize the loop counter to its start value.
    i = 1
    // Loop until the `i` counter's value is <= the `lookbackInput` value.
    while i <= lookbackInput
        if high[i] > high
            higherBars += 1
        else if high[i] < high
            lowerBars += 1
        // Counter must be managed "manually".
        i += 1
    label.set_xy(lbl, bar_index, high)
    label.set_text(lbl, str.tostring(higherBars, "# higher bars\n") + str.tostring(lowerBars, "# lower bars"))
```

注意：

- 计数器必须在[while](https://www.tradingview.com/pine-script-reference/v5/#op_while)的本地块`i`内显式递增 1 。
- 我们使用[+=](https://www.tradingview.com/pine-script-reference/v5/#op_{plus}=) 运算符将计数器加一。相当于.`lowerBars += 1``lowerBars := lowerBars + 1`

[让我们使用while](https://www.tradingview.com/pine-script-reference/v5/#op_while)结构来计算阶乘函数 ：

```
Pine Script™
Copied//@version=5
indicator("")
int n = input.int(10, "Factorial of", minval=0)

factorial(int val = na) =>
    int counter = val
    int fact = 1
    result = while counter > 0
        fact := fact * counter
        counter := counter - 1
        fact

// Only evaluate the function on the first bar.
var answer = factorial(n)
plot(answer)
```

注意：

- 我们使用[input.int()](https://www.tradingview.com/pine-script-reference/v5/#fun_input{dot}int) 作为输入，因为我们需要指定一个`minval`值来保护我们的代码。虽然[input()](https://www.tradingview.com/pine-script-reference/v5/#fun_input) 也支持int类型值的输入，但不支持参数`minval`。
- 我们将脚本的功能封装在一个`factorial()`函数中，该函数接受必须计算其阶乘的值作为参数。我们已经习惯了声明函数的参数，这表示如果调用函数时不带参数（如 in ），则参数将初始化为[na ，这将阻止](https://www.tradingview.com/pine-script-reference/v5/#var_na)[while](https://www.tradingview.com/pine-script-reference/v5/#op_while)循环的执行，因为其表达式将返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。因此[， while](https://www.tradingview.com/pine-script-reference/v5/#op_while)结构会将变量初始化为[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。反过来，因为 的初始化是函数本地块的返回值，所以该函数将返回[na](https://www.tradingview.com/pine-script-reference/v5/#var_na)。`int val = na``factorial()``val``counter > 0``result``result`
- [请注意while](https://www.tradingview.com/pine-script-reference/v5/#op_while)本地块的最后一行： `fact`。它是本地块的返回值，即[while](https://www.tradingview.com/pine-script-reference/v5/#op_while) 结构最后一次迭代时的值。
- 我们的初始化`result`不是必需的；我们这样做是为了可读性。我们也可以使用：

```
Pine Script™
Copiedwhile counter > 0
    fact := fact * counter
    counter := counter - 1
    fact
```

[
](https://www.tradingview.com/)