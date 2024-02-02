# 方法[¶](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#methods)

提示：

此页面包含高级材料。如果您是一名初级 Pine Script™ 程序员，我们建议您在冒险之前熟悉其他更易于使用的 Pine Script™ 功能。

## [介绍](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#id1)

Pine Script™ 方法是与内置或用户定义[类型](https://www.tradingview.com/pine-script-docs/en/v5/language/Type_system.html#pagetypesystem)的特定实例相关的专用函数。它们在大多数方面与常规函数本质上相同，但提供了更短、更方便的语法。用户可以直接使用变量上的点表示法来访问方法，就像访问 Pine Script™[对象](https://www.tradingview.com/pine-script-docs/en/v5/language/Objects.html#pageobjects)的字段一样。



## [内置方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#id2)

*Pine Script™ 包含适用于所有特殊类型的*内置方法，包括 [数组](https://www.tradingview.com/pine-script-reference/v5/#type_array)、 [矩阵](https://www.tradingview.com/pine-script-reference/v5/#type_matrix)、 [地图](https://www.tradingview.com/pine-script-reference/v5/#type_map)、 [线](https://www.tradingview.com/pine-script-reference/v5/#type_line)、 [线填充](https://www.tradingview.com/pine-script-reference/v5/#type_linefill)、 [框](https://www.tradingview.com/pine-script-reference/v5/#type_box)、 [折线](https://www.tradingview.com/pine-script-reference/v5/#type_polyline)、 [标签](https://www.tradingview.com/pine-script-reference/v5/#type_label)和 [表格](https://www.tradingview.com/pine-script-reference/v5/#type_table)。这些方法为用户提供了一种更简洁的方法来在其脚本中调用这些类型的专用例程。

当使用这些特殊类型时，表达式：

```
Pine Script™
Copied<namespace>.<functionName>([paramName =] <objectName>, …)
```

和：

```
Pine Script™
Copied<objectName>.<functionName>(…)
```

是等价的。例如，而不是使用：

```
Pine Script™
Copiedarray.get(id, index)
```

`id`要从指定的数组中获取值`index`，我们可以简单地使用：

```
Pine Script™
Copiedid.get(index)
```

以达到同样的效果。这种表示法消除了用户引用函数的名称空间的需要，因为 [get()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}get)`id`是此上下文中的一种方法。

下面编写一个实际示例来演示如何使用内置方法代替函数。

以下脚本根据每条`n`柱采样一次的指定数量的价格来计算布林线。它调用[array.push()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}push)和 [array.shift()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}shift)通过排列`sourceInput`值`sourceArray`，然后[调用 array.avg()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}avg)和 [array.stdev()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}stdev)来计算`sampleMean`和`sampleDev`。然后，该脚本使用这些值来计算`highBand`和`lowBand`，并将其与 一起绘制在图表上`sampleMean`：

![../_images/Methods_custom_bb.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Methods_custom_bb.png)

```
Pine Script™
Copied//@version=5
indicator("Custom Sample BB", overlay = true)

float sourceInput  = input.source(close, "Source")
int   samplesInput = input.int(20, "Samples")
int   n            = input.int(10, "Bars")
float multiplier   = input.float(2.0, "StdDev")

var array<float> sourceArray = array.new<float>(samplesInput)
var float        sampleMean  = na
var float        sampleDev   = na

// Identify if `n` bars have passed.
if bar_index % n == 0
    // Update the queue.
    array.push(sourceArray, sourceInput)
    array.shift(sourceArray)
    // Update the mean and standard deviaiton values.
    sampleMean := array.avg(sourceArray)
    sampleDev  := array.stdev(sourceArray) * multiplier

// Calculate bands.
float highBand = sampleMean + sampleDev
float lowBand  = sampleMean - sampleDev

plot(sampleMean, "Basis", color.orange)
plot(highBand, "Upper", color.lime)
plot(lowBand, "Lower", color.red)
```

让我们重写这段代码以使用方法而不是内置函数。在此版本中，我们已将 脚本中的所有内置[array.*函数替换为等效方法：](https://www.tradingview.com/pine-script-reference/v5/#op_array)

```
Pine Script™
Copied//@version=5
indicator("Custom Sample BB", overlay = true)

float sourceInput  = input.source(close, "Source")
int   samplesInput = input.int(20, "Samples")
int   n            = input.int(10, "Bars")
float multiplier   = input.float(2.0, "StdDev")

var array<float> sourceArray = array.new<float>(samplesInput)
var float        sampleMean  = na
var float        sampleDev   = na

// Identify if `n` bars have passed.
if bar_index % n == 0
    // Update the queue.
    sourceArray.push(sourceInput)
    sourceArray.shift()
    // Update the mean and standard deviaiton values.
    sampleMean := sourceArray.avg()
    sampleDev  := sourceArray.stdev() * multiplier

// Calculate band values.
float highBand = sampleMean + sampleDev
float lowBand  = sampleMean - sampleDev

plot(sampleMean, "Basis", color.orange)
plot(highBand, "Upper", color.lime)
plot(lowBand, "Lower", color.red)
```

- 注意：

  `sourceArray.*`我们使用而不是引用[数组](https://www.tradingview.com/pine-script-reference/v5/#op_array)命名空间来调用数组方法。当我们调用这些方法时，我们不会将其`sourceArray`作为参数包含在内，因为它们已经引用了该对象。



## [用户定义的方法](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#id3)

Pine Script™ 允许用户定义与任何内置或用户定义类型的对象一起使用的自定义方法。定义方法本质上与定义函数相同，但有两个关键区别：

- method关键字必须包含在函数名称之前[。](https://www.tradingview.com/pine-script-reference/v5/#op_method)
- 签名中第一个参数的类型必须显式声明，因为它表示该方法将与之关联的对象的类型。

```
Pine Script™
Copied[export] method <functionName>(<paramType> <paramName> [= <defaultValue>], …) =>
    <functionBlock>
```

让我们将用户定义的方法应用到之前的布林线示例中，以封装全局范围内的操作，这将简化代码并提高可重用性。请参阅示例中的这一部分：

```
Pine Script™
Copied// Identify if `n` bars have passed.
if bar_index % n == 0
    // Update the queue.
    sourceArray.push(sourceInput)
    sourceArray.shift()
    // Update the mean and standard deviaiton values.
    sampleMean := sourceArray.avg()
    sampleDev  := sourceArray.stdev() * multiplier

// Calculate band values.
float highBand = sampleMean + sampleDev
float lowBand  = sampleMean - sampleDev
```

我们将首先定义一个简单的方法，在一次调用中通过数组对值进行排队。

当为 true 时，此`maintainQueue()`方法调用[push()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}push)和 [shift()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}shift)方法并返回对象：`srcArray``takeSample`

```
Pine Script™
Copied// @function         Maintains a queue of the size of `srcArray`.
//                   It appends a `value` to the array and removes its oldest element at position zero.
// @param srcArray   (array<float>) The array where the queue is maintained.
// @param value      (float) The new value to be added to the queue.
//                   The queue's oldest value is also removed, so its size is constant.
// @param takeSample (bool) A new `value` is only pushed into the queue if this is true.
// @returns          (array<float>) `srcArray` object.
method maintainQueue(array<float> srcArray, float value, bool takeSample = true) =>
    if takeSample
        srcArray.push(value)
        srcArray.shift()
    srcArray
```

- 注意：

  就像用户定义的函数一样，我们使用`@function` [编译器注释](https://www.tradingview.com/pine-script-docs/en/v5/language/Script_structure.html#pagescriptstructure-compilerannotations)来记录方法描述。

现在我们可以在示例中替换`sourceArray.push()`and ：`sourceArray.shift()``sourceArray.maintainQueue()`

```
Pine Script™
Copied// Identify if `n` bars have passed.
if bar_index % n == 0
    // Update the queue.
    sourceArray.maintainQueue(sourceInput)
    // Update the mean and standard deviaiton values.
    sampleMean  := sourceArray.avg()
    sampleDev   := sourceArray.stdev() * multiplier

// Calculate band values.
float highBand  = sampleMean + sampleDev
float lowBand   = sampleMean - sampleDev
```

从这里开始，我们将通过定义一个处理其范围内所有布林带计算的方法来进一步简化我们的代码。

当为true时，此`calcBB()`方法调用[avg()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}avg)和 [stdev()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}stdev)方法来`srcArray`更新`mean`和`dev`值。`calculate`该方法使用这些值返回一个分别包含基础值、上限值和下限值的元组：

```
Pine Script™
Copied// @function         Computes Bollinger Band values from an array of data.
// @param srcArray   (array<float>) The array where the queue is maintained.
// @param multiplier (float) Standard deviaiton multiplier.
// @param calcuate   (bool) The method will only calculate new values when this is true.
// @returns          A tuple containing the basis, upper band, and lower band respectively.
method calcBB(array<float> srcArray, float mult, bool calculate = true) =>
    var float mean = na
    var float dev  = na
    if calculate
        // Compute the mean and standard deviation of the array.
        mean := srcArray.avg()
        dev  := srcArray.stdev() * mult
    [mean, mean + dev, mean - dev]
```

通过这种方法，我们现在可以从全局范围中删除布林带计算并提高代码可读性：

```
Pine Script™
Copied// Identify if `n` bars have passed.
bool newSample = bar_index % n == 0

// Update the queue and compute new BB values on each new sample.
[sampleMean, highBand, lowBand] = sourceArray.maintainQueue(sourceInput, newSample).calcBB(multiplier, newSample)
```

- 注意：

  我们没有`if`在全局范围内使用块，而是定义了一个`newSample`每条柱只为 true 一次的变量`n`。和方法将此值用作各自的`maintainQueue()`和参数。`calcBB()``takeSample``calculate`由于该`maintainQueue()`方法返回它引用的对象，因此我们可以`calcBB()`从同一行代码进行调用，因为这两种方法都适用于`array<float>`实例。

现在我们已经应用了用户定义的方法，完整的脚本示例如下所示：

```
Pine Script™
Copied//@version=5
indicator("Custom Sample BB", overlay = true)

float sourceInput  = input.source(close, "Source")
int   samplesInput = input.int(20, "Samples")
int   n            = input.int(10, "Bars")
float multiplier   = input.float(2.0, "StdDev")

var array<float> sourceArray = array.new<float>(samplesInput)

// @function         Maintains a queue of the size of `srcArray`.
//                   It appends a `value` to the array and removes its oldest element at position zero.
// @param srcArray   (array<float>) The array where the queue is maintained.
// @param value      (float) The new value to be added to the queue.
//                   The queue's oldest value is also removed, so its size is constant.
// @param takeSample (bool) A new `value` is only pushed into the queue if this is true.
// @returns          (array<float>) `srcArray` object.
method maintainQueue(array<float> srcArray, float value, bool takeSample = true) =>
    if takeSample
        srcArray.push(value)
        srcArray.shift()
    srcArray

// @function         Computes Bollinger Band values from an array of data.
// @param srcArray   (array<float>) The array where the queue is maintained.
// @param multiplier (float) Standard deviaiton multiplier.
// @param calcuate   (bool) The method will only calculate new values when this is true.
// @returns          A tuple containing the basis, upper band, and lower band respectively.
method calcBB(array<float> srcArray, float mult, bool calculate = true) =>
    var float mean = na
    var float dev  = na
    if calculate
        // Compute the mean and standard deviation of the array.
        mean := srcArray.avg()
        dev  := srcArray.stdev() * mult
    [mean, mean + dev, mean - dev]

// Identify if `n` bars have passed.
bool newSample = bar_index % n == 0

// Update the queue and compute new BB values on each new sample.
[sampleMean, highBand, lowBand] = sourceArray.maintainQueue(sourceInput, newSample).calcBB(multiplier, newSample)

plot(sampleMean, "Basis", color.orange)
plot(highBand, "Upper", color.lime)
plot(lowBand, "Lower", color.red)
```



## [方法重载](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#id4)

用户定义的方法可以覆盖和重载具有相同标识符的现有内置方法和用户定义的方法。此功能允许用户在同一方法名称下定义与不同参数签名关联的多个例程。

作为一个简单的例子，假设我们想要定义一个方法来识别变量的类型。由于我们必须显式指定与用户定义方法关联的对象类型，因此我们需要为我们希望它识别的每种类型定义重载。

下面，我们定义了一个`getType()`方法，该方法返回变量类型的字符串表示形式，并具有五种基本类型的重载：

```
Pine Script™
Copied// @function   Identifies an object's type.
// @param this Object to inspect.
// @returns    (string) A string representation of the type.
method getType(int this) =>
    na(this) ? "int(na)" : "int"

method getType(float this) =>
    na(this) ? "float(na)" : "float"

method getType(bool this) =>
    na(this) ? "bool(na)" : "bool"

method getType(color this) =>
    na(this) ? "color(na)" : "color"

method getType(string this) =>
    na(this) ? "string(na)" : "string"
```

现在我们可以使用这些重载来检查一些变量。此脚本使用[str.format()](https://www.tradingview.com/pine-script-reference/v5/#fun_str{dot}format) 将在五个不同变量上调用该方法的结果格式化`getType()`为单个字符串，然后使用内置 [set_text()](https://www.tradingview.com/pine-script-reference/v5/#fun_label{dot}set_text)`results`方法在标签中显示该字符串：`lbl`

![../_images/Methods_overloads_type_inspection.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Methods_overloads_type_inspection.png)

```
Pine Script™
Copied//@version=5
indicator("Type Inspection")

// @function   Identifies an object's type.
// @param this Object to inspect.
// @returns    (string) A string representation of the type.
method getType(int this) =>
    na(this) ? "int(na)" : "int"

method getType(float this) =>
    na(this) ? "float(na)" : "float"

method getType(bool this) =>
    na(this) ? "bool(na)" : "bool"

method getType(color this) =>
    na(this) ? "color(na)" : "color"

method getType(string this) =>
    na(this) ? "string(na)" : "string"

a = 1
b = 1.0
c = true
d = color.white
e = "1"

// Inspect variables and format results.
results = str.format(
 "a: {0}\nb: {1}\nc: {2}\nd: {3}\ne: {4}",
 a.getType(), b.getType(), c.getType(), d.getType(), e.getType()
 )

var label lbl = label.new(0, 0)
lbl.set_x(bar_index)
lbl.set_text(results)
```

- 注意：

  每个变量的基础类型决定`getType()`编译器将使用哪种重载。`na`当变量要标定它为空时，该方法会将“(na)”附加到输出字符串。



## [高级示例](https://www.tradingview.com/pine-script-docs/en/v5/language/Methods.html#id5)

让我们应用我们所学到的知识来构建一个脚本，用于估计数组中元素的累积分布，即数组中小于或等于任何给定值的元素的分数。

我们可以选择多种方式来实现这一目标。对于这个例子，我们将首先定义一个方法来替换数组的元素，这将帮助我们计算某个值范围内元素的出现次数。

下面写的是实例的内置[fill()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}fill) 方法的重载`array<float>`。此重载将 a 中的元素替换为和之间`srcArray`的范围内的 元素，并用 替换该范围之外的所有元素：`lowerBound``upperBound``innerValue``outerValue`

```
Pine Script™
Copied// @function          Replaces elements in a `srcArray` between `lowerBound` and `upperBound` with an `innerValue`,
//                    and replaces elements outside the range with an `outerValue`.
// @param srcArray    (array<float>) Array to modify.
// @param innerValue  (float) Value to replace elements within the range with.
// @param outerValue  (float) Value to replace elements outside the range with.
// @param lowerBound  (float) Lowest value to replace with `innerValue`.
// @param upperBound  (float) Highest value to replace with `innerValue`.
// @returns           (array<float>) `srcArray` object.
method fill(array<float> srcArray, float innerValue, float outerValue, float lowerBound, float upperBound) =>
    for [i, element] in srcArray
        if (element >= lowerBound or na(lowerBound)) and (element <= upperBound or na(upperBound))
            srcArray.set(i, innerValue)
        else
            srcArray.set(i, outerValue)
    srcArray
```

使用此方法，我们可以按值范围过滤数组以生成出现次数的数组。例如，表达式：

```
Pine Script™
CopiedsrcArray.copy().fill(1.0, 0.0, min, val)
```

复制`srcArray`对象，将1.0`min`和1.0 之间的所有元素替换`val`为 1.0，然后将上面的所有元素替换`val`为 0.0。从这里，很容易估计 处累积分布函数的输出`val`，因为它只是结果数组的平均值：

```
Pine Script™
CopiedsrcArray.copy().fill(1.0, 0.0, min, val).avg()
```

- 注意：

  `fill()`当用户在调用中提供`innerValue`、`outerValue`、`lowerBound`和参数时，编译器将仅使用此重载而不是内置重载`upperBound`。如果 或`lowerBound`是`upperBound`，`na`则在过滤填充范围时忽略其值。我们能够在同一行代码上连续调用`copy()`、`fill()`、 和 ，因为前两个方法返回一个实例。`avg()``array<float>`

我们现在可以用它来定义一种方法来计算我们的经验分布值。以下方法从 a 的累积分布函数`eCDF()`估计多个均匀分布的升序，并将结果推入 a ：`steps``srcArray``cdfArray`

```
Pine Script™
Copied// @function       Estimates the empirical CDF of a `srcArray`.
// @param srcArray (array<float>) Array to calculate on.
// @param steps    (int) Number of steps in the estimation.
// @returns        (array<float>) Array of estimated CDF ratios.
method eCDF(array<float> srcArray, int steps) =>
    float min = srcArray.min()
    float rng = srcArray.range() / steps
    array<float> cdfArray = array.new<float>()
    // Add averages of `srcArray` filtered by value region to the `cdfArray`.
    float val = min
    for i = 1 to steps
        val += rng
        cdfArray.push(srcArray.copy().fill(1.0, 0.0, min, val).avg())
    cdfArray
```

最后，为了确保我们的`eCDF()`方法对于包含小值和大值的数组正常运行，我们将定义一个方法来规范化我们的数组。

此`featureScale()`方法使用数组[min()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}min) 和[range()](https://www.tradingview.com/pine-script-reference/v5/#fun_array{dot}range)方法来生成`srcArray`.在调用该方法之前，我们将使用它来标准化我们的数组`eCDF()`：

```
Pine Script™
Copied// @function        Rescales the elements within a `srcArray` to the interval [0, 1].
// @param srcArray  (array<float>) Array to normalize.
// @returns         (array<float>) Normalized copy of the `srcArray`.
method featureScale(array<float> srcArray) =>
    float min = srcArray.min()
    float rng = srcArray.range()
    array<float> scaledArray = array.new<float>()
    // Push normalized `element` values into the `scaledArray`.
    for element in srcArray
        scaledArray.push((element - min) / rng)
    scaledArray
```

- 注意：

  此方法不包括对除零条件的特殊处理。如果`rng`为 0，则数组元素的值为`na`。

下面的完整示例使用我们之前的方法`sourceArray`对 size 的`length`值进行排队，使用该方法对数组的元素进行标准化，然后调用该方法来获取分布上均匀间隔步长的估计值数组 。然后，该脚本调用用户定义的函数以在图表右侧的标签中显示估计值和价格：`sourceInput``maintainQueue()``featureScale()``eCDF()``n``makeLabel()`

![../_images/Methods_empirical_distribution.png](https://www.tradingview.com/pine-script-docs/en/v5/_images/Methods_empirical_distribution.png)

```
Pine Script™
Copied//@version=5
indicator("Empirical Distribution", overlay = true)

float sourceInput = input.source(close, "Source")
int length        = input.int(20, "Length")
int n             = input.int(20, "Steps")

// @function         Maintains a queue of the size of `srcArray`.
//                   It appends a `value` to the array and removes its oldest element at position zero.
// @param srcArray   (array<float>) The array where the queue is maintained.
// @param value      (float) The new value to be added to the queue.
//                   The queue's oldest value is also removed, so its size is constant.
// @param takeSample (bool) A new `value` is only pushed into the queue if this is true.
// @returns          (array<float>) `srcArray` object.
method maintainQueue(array<float> srcArray, float value, bool takeSample = true) =>
    if takeSample
        srcArray.push(value)
        srcArray.shift()
    srcArray

// @function          Replaces elements in a `srcArray` between `lowerBound` and `upperBound` with an `innerValue`,
//                    and replaces elements outside the range with an `outerValue`.
// @param srcArray    (array<float>) Array to modify.
// @param innerValue  (float) Value to replace elements within the range with.
// @param outerValue  (float) Value to replace elements outside the range with.
// @param lowerBound  (float) Lowest value to replace with `innerValue`.
// @param upperBound  (float) Highest value to replace with `innerValue`.
// @returns           (array<float>) `srcArray` object.
method fill(array<float> srcArray, float innerValue, float outerValue, float lowerBound, float upperBound) =>
    for [i, element] in srcArray
        if (element >= lowerBound or na(lowerBound)) and (element <= upperBound or na(upperBound))
            srcArray.set(i, innerValue)
        else
            srcArray.set(i, outerValue)
    srcArray

// @function       Estimates the empirical CDF of a `srcArray`.
// @param srcArray (array<float>) Array to calculate on.
// @param steps    (int) Number of steps in the estimation.
// @returns        (array<float>) Array of estimated CDF ratios.
method eCDF(array<float> srcArray, int steps) =>
    float min = srcArray.min()
    float rng = srcArray.range() / steps
    array<float> cdfArray = array.new<float>()
    // Add averages of `srcArray` filtered by value region to the `cdfArray`.
    float val = min
    for i = 1 to steps
        val += rng
        cdfArray.push(srcArray.copy().fill(1.0, 0.0, min, val).avg())
    cdfArray

// @function        Rescales the elements within a `srcArray` to the interval [0, 1].
// @param srcArray  (array<float>) Array to normalize.
// @returns         (array<float>) Normalized copy of the `srcArray`.
method featureScale(array<float> srcArray) =>
    float min = srcArray.min()
    float rng = srcArray.range()
    array<float> scaledArray = array.new<float>()
    // Push normalized `element` values into the `scaledArray`.
    for element in srcArray
        scaledArray.push((element - min) / rng)
    scaledArray

// @function        Draws a label containing eCDF estimates in the format "{price}: {percent}%"
// @param srcArray  (array<float>) Array of source values.
// @param cdfArray  (array<float>) Array of CDF estimates.
// @returns         (void)
makeLabel(array<float> srcArray, array<float> cdfArray) =>
    float max      = srcArray.max()
    float rng      = srcArray.range() / cdfArray.size()
    string results = ""
    var label lbl  = label.new(0, 0, "", style = label.style_label_left, text_font_family = font.family_monospace)
    // Add percentage strings to `results` starting from the `max`.
    cdfArray.reverse()
    for [i, element] in cdfArray
        results += str.format("{0}: {1}%\n", max - i * rng, element * 100)
    // Update `lbl` attributes.
    lbl.set_xy(bar_index + 1, srcArray.avg())
    lbl.set_text(results)

var array<float> sourceArray = array.new<float>(length)

// Add background color for the last `length` bars.
bgcolor(bar_index > last_bar_index - length ? color.new(color.orange, 80) : na)

// Queue `sourceArray`, feature scale, then estimate the distribution over `n` steps.
array<float> distArray = sourceArray.maintainQueue(sourceInput).featureScale().eCDF(n)
// Draw label.
makeLabel(sourceArray, distArray)
```