# Agent AI 代理配置

以下简述了配置文件中 Agent 模块的内容：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "Agent": {
        "Agents": {
            "frontend": {
                "AgentName": "前端工程", // 代理名称
                "AgentDescription": "前端工程Agent", // 代理描述
                "AgentPrompt": "你是一个前端工程师，请根据用户的需求，提供前端工程解决方案。", // 代理提示词
                "AgentModel": 0, // 代理使用的模型
                "AgentShortDescription": "A default subagent", // 代理简短描述
                "AutoApprove": "true", // 自动批准规则
                "AutoReject": "", // 自动拒绝规则
                "DisableSandbox": false, // 是否禁用沙箱
            }
        },
        "GlobalPrompt": "", // 全局提示词
        "SummaryModel": 0, // 摘要模型
        "TitleModel": 0, // 标题模型
        "GoalCheckModel": -1, // 目标检查模型
        "MaxCallCount": 5000000, // 最大调用次数
        "AutoApprove": "true", // 自动批准规则
        "AutoReject": "", // 自动拒绝规则
        "IgnoreBuiltinAgents": false, // 忽略内置代理
        "IgnoreDefaultRules": false, // 忽略默认规则
        "DisablePromptPreprocess": false, // 禁用提示词预处理
        "UseShell": "", // 使用的 Shell
        "User": "cxykevin", // 用户
        "UserGroup": "cxykevin", // 用户组
        "FetchProxy": "", // 请求代理
        "TerminalEnvs": { // 终端运行环境变量
            "LANG": "en_US.UTF-8"
        },
        "DisableSandbox": true, // 禁用沙箱
        "Fetch": {
            "RewriteHeaders": { // 请求头重写
                "https\\://api.github.com/.*": {
                    "Authorization": "Bearer ghp_xxx"
                }
            }
        }
    },
}
```

:::
