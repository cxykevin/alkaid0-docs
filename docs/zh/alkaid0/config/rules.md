# Rules 自动批准 & 拒绝规则配置

Alkaid0 的自动批准与拒绝规则使用类 C 风格的 `expr-lang` 表达式。

:::tip 匹配规则

匹配规则为对于每一个工具调用均匹配一次 Accept 与 Reject 表达式。

若有任何一个工具为 Reject，那么整批工具调用将会被拒绝。但只有在所有工具均为 Accept 时，才会被自动批准。

:::

## Expr-lang 语法

:::tip
本文档仅为对 [expr-lang](https://expr-lang.org) 的简单介绍，更多内容请查阅其文档。
:::

### 字面量

- **布尔与空值**：`true`、`false`、`nil`。
- **整数**：支持十进制、十六进制 `0x`、八进制 `0o`、二进制 `0b`，例如 `42`、`0x2A`、`0o52`、`0b101010`。
- **浮点数**：标准小数或省略整数位的 `.5`。
- **字符串**：单/双引号，或反引号（不转义）。支持 `\n`、`\t`、`\uXXXX` 等转义。

### 运算符

- **算术**：`+`、`-`、`*`、`/`、`%`（取模）、`^` 或 `**`（幂）。
- **比较**：`==`、`!=`、`<`、`>`、`<=`、`>=`。
- **逻辑**：`not` / `!`、`and` / `&&`、`or` / `||`。
- **条件**：三元 `?:`。
- **字符串**：`+`（拼接）、`contains`、`matches`（正则）。
- **成员关系**：`in`、`not in`。
- **位运算**：`<<`（左移）、`>>`（右移）、`&`（与）、`^`（异或）、`|`（或）、`~`（非）。

### 成员访问与变量

- **`.`**：访问对象字段。
- **`[]`**：访问数组元素。支持负索引，如 `array[-1]`。

### 内置函数

#### 字符串函数

`trim`（可指定修剪字符集）、`trimPrefix`、`trimSuffix`、`upper`、`lower`、`split`、`splitAfter`、`replace`（替换全部）、`repeat`、`indexOf`、`lastIndexOf`、`hasPrefix`、`hasSuffix`。

#### 数字运算

`max`、`min`、`abs`、`ceil`、`floor`、`round`。

#### 类型转换

`type`、`int`、`float`、`string`、`toJSON`、`fromJSON`、`toBase64`、`fromBase64`。

#### 杂项

- **`len(v)`**：返回数组、map（JSON Object）或字符串的长度。

## Alkaid0 规则变量与函数

### 函数

- **`regex(pattern, text)`**：正则匹配。
- **`contains(s, sub)`**：字符串包含。
- **`hasParam(call, key)`**：参数存在。
- **`param(call, key)`**：参数值。

### 变量

- **`ToolCall`**：当前工具调用。
  - **`ToolCall.Name`**：工具名称。均为小写。
  - **`ToolCall.ID`**：工具调用 ID。
  - **`ToolCall.Parameters`**：工具调用参数。为 Object。Key 为参数名且正确情况下均为小写，Value 为参数值。
- **`Agent`**：当前 Agent 配置。
- **`Workdir`**：当前工作目录。

## 危险参数

:::danger

部分工具调用的参数为危险参数。建议根据需要优先写入 Reject 规则。

- `run` 工具：
  - `sandbox`: 当其设置为 false 时，将会禁用沙箱，可能带来安全风险。
  
    ***若无需要此功能建议写入 Reject。***
- `fetch` 工具：
  - `url`: fetch 工具默认允许本地请求。建议根据需要使用正则屏蔽路径。

:::

## 内置表达式

Alkaid0 对于部分操作提供了内置的批准或拒绝规则。这些规则与用户设置的表达式是 `or` 的关系。

其位于 [approve.expr](https://github.com/cxykevin/alkaid0/blob/main/provider/request/rules/approve.expr) 与 [reject.expr](https://github.com/cxykevin/alkaid0/blob/main/provider/request/rules/reject.expr)。

:::warning

**内置表达式不是万能的！**我们十分建议您根据您的需求检查并编辑自己的规则。

:::

## 示例

### 示例 A：仅允许 Read 自动批准（已经内置）

```c
/*AutoApprove*/ ToolCall.Name == 'read'
```

### 示例 B：拒绝任何包含 rm 的命令

```c
/*AutoReject*/ contains(ToolCall.Name, 'run') && regex('rm\\s', param(ToolCall, 'command'))
```

### 示例 C：只允许 shell 且 command 包含 git status 或 git diff

```c
/*AutoApprove*/ ToolCall.Name == 'run' && (contains(param(ToolCall,'command'), 'git status') || contains(param(ToolCall,'command'), 'git diff'))
```

### 示例 D：拒绝参数 key=path 且 path 以 /etc 开头

```c
/*AutoReject*/ hasParam(ToolCall, 'path') && regex('^/etc', param(ToolCall, 'path'))
```
