# Feedback 反馈 & 遥测配置

以下简述了配置文件中 Feedback 模块的内容：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "Feedback": {
        "URL": "", // 反馈服务端地址
        "DisableAutoTelemetry": false // 是否禁用自动遥测
    }
}
```

:::

:::info 配置项{open}

- `URL`：**反馈服务端地址**。string 类型。

  为空时使用内置的反馈服务端 `https://feed.cxykevin.top/`。配置后将优先使用此处填写的地址，末尾的 `/` 会被自动去除。

  此地址同时用于 `/feedback` 命令与自动 Telemetry 上报。

- `DisableAutoTelemetry`：**是否禁用自动 Telemetry 上报**。bool 类型，默认 `false`。

:::

## 反馈命令

使用 `/feedback <内容>` 可以提交反馈。提交过程是异步的，不会阻塞会话。

- 反馈内容会被截断到 1024 字节以内。
- 提交时会附带系统与版本信息，以及最近的日志尾部（最多约 63 KiB）。
- 日志在写入时已经过敏感信息脱敏；提交前还会额外擦除当前会话通过 `/mask` 添加的自定义值与模型配置中的 `ProviderKey`。
- 提交成功后会返回反馈 ID，失败时会在客户端显示错误信息。

:::info

在调试模式下（`ALKAID0_DEBUG=true` 或日志级别为 debug），`/feedback` 会被禁用。

:::

## 自动 Telemetry

当 `DisableAutoTelemetry` 为 `false` 时，Alkaid0 会以大约 **30 天** 为间隔自动上报一次 Telemetry：

- 首次启动（没有有效的时间戳记录）不会立即上报，只写入基线时间戳。
- 上报成功或失败都会更新时间戳，失败后将推迟到下一个周期再尝试，不会无限重试。
- 时间戳文件 `telemetry.timestamp` 保存在配置文件所在目录。
- Telemetry 内容以 `[Telemetry]` 开头，包含 Alkaid0 版本、提交 ID、Go 版本、操作系统与架构，以及配置中使用的模型 ID 列表；不包含会话日志与对话内容。

:::warning 隐私说明

自动 Telemetry 会向反馈服务端发送版本、系统信息与模型列表。如果您不希望发送这些信息，请将 `DisableAutoTelemetry` 设置为 `true`。

:::

:::tip 自建反馈服务

`URL` 可以指向自建的反馈服务端，只需兼容反馈 SDK 的接口即可。反馈客户端会在首次使用时创建并缓存；如果已经提交过反馈或完成过遥测，修改地址后需要重启 Alkaid0 才会生效。

:::