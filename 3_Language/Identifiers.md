
# 标识符

标识符是用于用户定义的变量和函数的名称。

- 它们必须以大写字母(`A-Z`)或小写字母(`a-z`)开头，或下划线(`_`)。
- 接下来的字符可以是字母、下划线或数字（`0-9`）。
- 它们是区分大小写的。

下面是一些例子。

```
myVar
_myVar
my123Var
functionName
MAX_LEN
max_len
maxLen
3barsDown // 不是有效的!
```

[Pine Style Guide ](https://www.tradingview.com/pine-script-docs/en/v5/writing/Style_guide.html#pagestyleguide) 官方建议对常量使用大写的蛇形，对其他标识符使用驼峰写法。

```
GREEN_COLOR = #4CAF50
MAX_LOOKBACK = 100
int fastLength = 7
// 如果参数是`true`，则返回1，如果是`false`或`na`，则返回0。
zeroOne(boolValue) => boolValue ? 1 : 0
```
