# Agent AI 代理配置

以下简述了配置文件中 Agent 模块的内容：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "Agent": {
        // Agent 设置
        "GlobalPrompt": "", // 全局提示词
        "Agents": { // SubAgent 列表
            "frontend": {
                "AgentName": "前端工程", // 代理名称
                "AgentDescription": "前端工程Agent", // 代理描述
                "AgentPrompt": "你是一个前端工程师，请根据用户的需求，提供前端工程解决方案。", // 代理提示词
                "AgentModel": 0, // 代理使用的模型
                "AgentShortDescription": "A default subagent", // 代理简短描述
                "AutoApprove": "true", // 自动批准规则
                "AutoReject": "", // 自动拒绝规则
            }
        },

        // 模型设置
        "SummaryModel": 0, // 摘要模型
        "TitleModel": 0, // 标题模型
        "GoalCheckModel": -1, // 目标检查模型
        "MaxCallCount": 50, // 单次循环最大调用次数

        // 自动批准规则
        "AutoApprove": "true", // 自动批准规则
        "AutoReject": "", // 自动拒绝规则
        
        // Run 与 Fetch 设置
        "User": "cxykevin", // 命令运行用户
        "UserGroup": "cxykevin", // 命令运行用户组
        "UseShell": "", // 使用的 Shell
        "DisableSandbox": true, // 禁用沙箱
        "FetchProxy": "", // 请求代理
        "TerminalEnvs": { // 终端运行环境变量
            "LANG": "en_US.UTF-8"
        },
        "Fetch": { // 请求配置
            "RewriteHeaders": { // 请求头重写
                "https\\://api.github.com/.*": {
                    "Authorization": "Bearer ghp_xxx"
                }
            }
        },

        // 高级设置
        "IgnoreBuiltinAgents": false, // 忽略内置代理
        "IgnoreDefaultRules": false, // 忽略默认规则
        "DisablePromptPreprocess": false // 禁用提示词预处理
    },
}
```

:::

:::info Agent 设置{open}

- `GlobalPrompt`：额外的**全局提示词**。注入到 AI 的上下文顶部。
- `Agents`：**SubAgent 列表**。注意：Subagent 只支持串行执行，不支持并发。若需并发请使用 Workflow 功能。
  - `[key]`：**SubAgent ID**。为 string 类型且唯一。
  - `AgentName`：**代理名称**。AI 可读。
  - `AgentDescription`：**代理描述**。仅供人类备注。
  - `AgentPrompt`：**代理提示词**。当代理被激活时，其将会被注入到 AI 的上下文顶部。
  - `AgentModel`：**代理使用的模型**。int32 类型，-1 表示使用当前模型。
  - `AgentShortDescription`：**代理简短描述**。用于 AI 激活代理时的摘要。不建议过长。
  - `AutoApprove`：**自动批准规则**。此规则会 **覆盖** `AutoApprove` 的全局设置。具体写法参见下方规则。为空则不覆盖。
  - `AutoReject`：**自动拒绝规则**。此规则会 **覆盖** `AutoReject` 的全局设置。具体写法参见下方规则。为空则不覆盖。

:::

:::info 模型设置{open}

- `SummaryModel`: **摘要模型**。int32 类型，-1 表示使用当前模型。
- `TitleModel`: **标题生成模型**。int32 类型，-1 表示使用当前模型。
- `GoalCheckModel`: **目标检查模型**。int32 类型，-1 表示使用当前模型。
- `MaxCallCount`: **单次循环最大调用次数**。int32 类型，默认为 50。对于长任务，建议将其设置为 500 或更高。

:::

:::info 自动批准 & 拒绝规则{open}

- `AutoApprove`: **自动批准规则**。具体写法参见 [下方](#rules)。
- `AutoReject`: **自动拒绝规则**。具体写法参见 [下方](#rules)。

:::

<span id="user-config"></span>

:::info Run 与 Fetch 设置{open}

- `User`: **命令运行用户**。**必须设置此参数才能在系统模式下正常运行命令！**应当设置为用户名。
- `UserGroup`: **命令运行用户组**。仅限 MacOS / Linux。
- `UseShell`: **使用的 Shell**。为空则使用默认 Shell。
  
  Windows 下默认为 `powershell`，Linux 下默认为 `bash`，MacOS 下默认为 `zsh`。
- `DisableSandbox`: 是否**禁用沙箱**。
- `FetchProxy` : 请求使用的**HTTP(s)代理**链接。为空则不使用代理。
- `TerminalEnvs`: **终端运行环境变量**。应为 Key-Value 格式。均为 string 类型。
- `Fetch`: **请求配置**。
  - `RewriteHeaders`: **请求头重写**。键为匹配 URL 正则表达式，值为一个 Key-Value 格式的 JSON Object。用于指定请求头及其值。
  
    ***本重写不是强制的！Agent 可以覆盖该值！***

:::warning

必须设置 `User` 参数才能在系统模式运行的 Alkaid0 下正常运行命令！

:::

:::danger 除非你知道你在做什么，否则不要修改以下配置！

- `IgnoreBuiltinAgents`: **忽略内置代理**。内置代理中包括 Goal Check 等关键 Agent，除非您决定修改其行为，否则请勿修改此参数。
- `IgnoreDefaultRules`: **忽略默认规则**。默认规则中包含了一些
- `DisablePromptPreprocess`: **禁用提示词预处理**。bool 类型，默认为 false。

:::

## 自动批准 & 拒绝规则 {#rules}

自动批准与拒绝规则使用类 C 风格的 `expr-lang` 表达式。具体请参考 [规则编写](rules)。

:::tip 匹配规则

匹配规则为对于每一个工具调用均匹配一次 Accept 与 Reject 表达式。

若有任何一个工具为 Reject，那么整批工具调用将会被拒绝。但只有在所有工具均为 Accept 时，才会被自动批准。

:::

:::danger 危险参数

部分工具调用的参数为危险参数。建议根据需要优先写入 Reject 规则。

- `run` 工具：
  - `sandbox`: 当其设置为 false 时，将会禁用沙箱，可能带来安全风险。
  
    ***若无需要此功能建议写入 Reject。***
- `fetch` 工具：
  - `url`: fetch 工具默认允许本地请求。建议根据需要使用正则屏蔽路径。

:::
