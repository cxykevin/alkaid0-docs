# Hooks 事件钩子配置

以下简述了配置文件中 Hooks 模块的内容：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "Hooks": {
        "OnCronjobWakeup": [ // cron 定时任务唤醒会话时执行
            "echo \"cron wakeup: $SESSION_ID\" >> /tmp/alkaid0-hooks.log"
        ],
        "OnUserMessage": [ // 用户发送普通消息时执行
            "echo \"user message: $SESSION_ID\" >> /tmp/alkaid0-hooks.log"
        ],
        "OnTaskFinish": [ // 一轮 AI 回合结束时执行
            "./scripts/on-task-finish.sh"
        ]
    }
}
```

:::

Hooks 用于在会话的关键时刻执行外部命令，例如发送系统通知、记录日志或拉起配套服务。每个事件都是一个命令数组，事件发生时会按顺序逐条执行。

:::info 执行方式{open}

- **阻塞执行**：命令会同步执行，必须等待其退出后才会继续会话流程。请尽量让钩子命令快速返回，避免长时间阻塞。
- **Shell**：使用 `Agent.UseShell` 指定的 Shell；未配置时使用平台默认值（Linux 为 `bash`，macOS 为 `zsh`，Windows 为 `powershell.exe`），参数约定与 `run` 工具一致。
- **工作目录**：会话的工作目录。若该目录不存在，则沿用 Alkaid0 进程的当前目录。
- **环境变量**：Alkaid0 进程环境变量加上 `Agent.TerminalEnvs`，并额外注入下表中的会话变量。`SESSION_ID` 与 `SESSION_PATH` 会覆盖 `Agent.TerminalEnvs` 中的同名键。
- **失败处理**：单条命令失败（非零退出码或无法启动）只会记录日志，不会中断后续命令，也不会影响会话本身。
- **配置生效**：每次事件触发时都会读取最新配置，执行 `/reload` 后无需重启即可生效。

:::

| 环境变量 | 说明 |
| ---- | ---- |
| `SESSION_ID` | 当前会话 ID（数字） |
| `SESSION_PATH` | 当前会话工作目录的绝对路径 |

## 转换为 ACP 会话 ID {#acp-session-id}

ACP 协议中的 `sessionId` 不是纯数字，其格式为：

```text
sess_<SESSION_ID>:<SESSION_PATH>
```

也就是说，`SESSION_ID` 只提供数字部分，还需要 `SESSION_PATH` 作为工作目录。可以在钩子命令中直接拼接：

```bash
ACP_SESSION_ID="sess_${SESSION_ID}:${SESSION_PATH}"
```

Windows PowerShell 下：

```powershell
$acpSessionId = "sess_${env:SESSION_ID}:${env:SESSION_PATH}"
```

:::tip

`SESSION_PATH` 是会话工作目录的绝对路径；路径包含空格时，注意在 shell 中正确加引号。

:::

:::info 事件说明{open}

- `OnCronjobWakeup`：**定时任务唤醒**。cron 定时任务唤醒会话后执行，可用于外部通知或拉起配套服务。
- `OnUserMessage`：**用户消息**。用户发送普通消息（非斜杠命令）时，在消息入队前执行。
- `OnTaskFinish`：**回合结束**。一轮 AI 回合结束时执行，包括正常结束、用户取消与出错。

数组为空或为 `null` 表示该事件没有钩子。命令字符串按顺序执行，空字符串会被跳过。

:::

:::tip 示例：调用外部通知脚本

```json
{
    "Hooks": {
        "OnTaskFinish": [
            "/home/user/scripts/notify.sh \"$SESSION_ID\" \"$SESSION_PATH\""
        ]
    }
}
```

脚本路径请根据实际情况修改。由于工作目录是会话工作目录，使用相对路径时需要注意当前目录。

:::

:::warning

Hooks 会在会话流程中同步执行，错误的钩子命令可能导致明显的卡顿。建议先在终端中手动验证命令，并避免在钩子中执行需要交互或长时间运行的程序。

:::