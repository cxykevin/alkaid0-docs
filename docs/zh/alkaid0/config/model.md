# Model 模型配置

以下简述了配置文件中 Model 模块的内容：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "Model": {
        "DefaultModelID": 0, // 默认模型 ID
        "Models": {
            "0": { // 模型ID，必须为字符串格式的 uint64
                "ModelName": "DeepSeek V4.1 Flash", // 模型名称
                "ModelID": "deepseek-v4.1-flash", // 模型ID
                "ModelDescription": "", // 模型描述
                "ModelAddPrompt": "",  // 附加系统提示词
                "ModelTopP": -1, // Top-P
                "ModelTopK": -1, // Top-K
                "ModelTemperature": -1, // 温度
                "TokenLimit": 1024000, // Token 上限
                "MaxCompletionTokens": 16800, // 单请求最大补全 Token
                "ProviderURL": "https://api.deepseek.com/v1", // 提供方 URL
                "ProviderKey": "sk-your_api_key", // 提供方密钥
                "EnableThinking": true, // 启用思考
                "CompressSize": 400000, // 压缩阈值
                "Hide": false, // 在列表中隐藏
                "Type": "", // 类型（LLM 必须为空）
                "CachePriceMultiplier": 0.02, // 缓存价格倍率
                "CacheRetentionMinutes": 180, // 缓存保留时间
                "ProviderSpecificConfig": { // 提供方专属配置
                    "EnableDeepseekThinking": true, // DeepSeek 思考
                    "EnableReasoningEffort": true, // 启用推理强度
                    "EnableTopP": false, // 启用 Top-P
                    "EnableTemperature": false, // 启用温度
                    "EnableTopK": false, // 启用 Top-K
                    "EnableUsage": true, // 启用用量统计
                    "Dimension": 0, // 维度（仅用于 Embedding 模型）
                    "EnableTrailingUserMessage": false, // 追加尾随用户消息
                    "EnablePromptCacheKey": false, // 启用显式缓存路由键
                    "EnablePromptCacheBreakpoints": false, // 启用显式缓存断点
                    "EnablePhase": false // 启用回复携带阶段
                }
            }
        }
    },
}
```

:::

- `DefaultModelID`：**默认模型 ID**，必须为 uint64 且在下方 Models 中存在。
- `Models`：**模型配置**。
  - `[key]`：**模型 ID**，必须为 string 格式的 uint64。
  - `ModelName`：**模型名称**。此项对 AI Agent 可见。
  - `ModelID`：**模型 ID**。此项将被用于 API 调用。需与上游一致。
  - `ModelDescription`：**模型描述**。此项仅用于备注。
  - `ModelAddPrompt`：**附加系统提示词**。此项将被附加到默认系统提示词之后。
  - `ModelTopP`：**Top-P**。此项将被用于 API 调用。*当下方 `ProviderSpecificConfig` 中 `EnableTopP` 为 `false` 时，此项将被忽略。*
  - `ModelTopK`：**Top-K**。此项将被用于 API 调用。*当下方 `ProviderSpecificConfig` 中 `EnableTopK` 为 `false` 时，此项将被忽略。*
  - `ModelTemperature`：**温度**。此项将被用于 API 调用。*当下方 `ProviderSpecificConfig` 中 `EnableTemperature` 为 `false` 时，此项将被忽略。*
  - `TokenLimit`：模型的输入 **Token 上限**。此项仅用于用量估算。
  - `MaxCompletionTokens`：**单请求最大补全 Token**。此项将被用于 API 调用。
  - `ProviderURL`：**提供方 URL**。此项将被用于 API 调用。需与上游一致。
  - `ProviderKey`：**提供方密钥**。此项将被用于 API 调用。需与上游申请的密钥一致。
  - `EnableThinking`：**启用思考**。此项将被用于 API 调用。当关闭此选项时模型由于上游设置仍可能进行思考。
  - `CompressSize`：**压缩阈值**。此项将被用于 API 调用。当请求长度超过此值时，请求将被压缩。***关于此配置的信息见 [下文](#compress-size)。***
  - `Hide`：在模型列表中**隐藏**。此项将被用于 AI Agent 列表。当打开此选项时，模型将在 AI Agent 列表中显示。
  - `Type`：**类型**。对于 LLM，此项必须为空。对于 Embedding 模型，此项必须为 `embedding`.embedding 模型的配置方法见 [下文](#embedding-config)。
  - `CachePriceMultiplier`：**缓存价格倍率**。此项将被用于缓存价格估算。***错误的配置可能会导致极低的缓存命中率！***
  - `CacheRetentionMinutes`：**缓存保留时间**。此项将被用于缓存保留时间估算。***错误的配置可能会导致极低的缓存命中率！***
  - `ProviderSpecificConfig`：**提供方专属配置**。此选用应根据实际配置的模型和上游提供方进行配置。
    - `EnableDeepseekThinking`：**启用 DeepSeek 思考**。开启此项将主动携带 DeepSeek 格式的思考配置。通常仅在 DeekSeek 官方上游时需启用。
    - `EnableReasoningEffort`：**启用推理强度**。开启此项将主动携带推理强度配置。一般若上游无格式校验则不建议关闭。
    - `EnableTopP`：**启用 Top-P**。开启此项将主动携带 Top-P 配置。一般若上游无格式校验则不建议关闭。对于 DeepSeek 官方，Top-P 携带通常无效。
    - `EnableTopK`：**启用 Top-K**。开启此项将主动携带 Top-K 配置。一般若上游无格式校验则不建议关闭。对于 DeepSeek 官方，Top-K 携带通常无效。
    - `EnableTemperature`：**启用温度**。开启此项将主动携带温度配置。一般若上游无格式校验则不建议关闭。对于 DeepSeek 官方，温度携带通常无效。
    - `EnableUsage`：**启用用量统计**。开启此项将主动携带用量统计配置。除非上游不支持用量统计，一般不建议关闭。
    - `Dimension`：**维度**。仅用于 Embedding 模型。见 [下文](#embedding-config)。
    - `EnableTrailingUserMessage`：**追加尾随用户消息**。开启此项将主动携带尾随用户消息配置。一般不建议打开。
    - `EnablePromptCacheKey`：**启用显式缓存路由键**。开启此项将主动携带显式缓存路由键配置。通常只针对 Claude 路由。
    - `EnablePromptCacheBreakpoints`：**启用显式缓存断点**。开启此项将主动携带显式缓存断点配置。通常只针对 Claude 路由。
    - `EnablePhase`：**启用回复携带阶段**。开启此项将主动携带回复携带阶段配置。

## `CompressSize` 的设置 {#compress-size}

若一次请求的长度超过 `CompressSize` 时，请求将被 compress。

这个值对于不同模型的推荐值不同。

:::warning
此值过小可能会导致频繁压缩，可能会节省费用，也可能会导致模型智商下降。
:::

:::details 模型推荐值{open}

- 对于 Deepseek V4.1 Flash 模型，推荐值为 `400000`。
- 对于 GPT Luna/Terra 系列模型，推荐值为 `180000`。
- 对于 GPT Sol 模型，推荐值为 `600000`（较高成本）或 `200000`（较低成本）。
- 对于 Claude Haiku/Sonnet 模型，推荐值为 `200000`。
- 对于 Claude Opus 模型，推荐值为 `800000`（较高成本）或 `400000`（较低成本）。

:::

:::danger **上限**
无论如何，这个值不要超过 **模型 Token 上限** 的 `90%`！这可能会导致上下文过长从而导致模型返回 `ContextTooLong` 错误并导致死锁。
:::

## Embedding 模型配置 {#embedding-config}

Embedding 目前仅用于 CodeBase 构建。其配置比 LLM 简单：

:::details JSON{open}
:::code-group

```json [config.json]{10-11,13}
{
    "Model": {
        "Models": {
            "1": {
                "ModelName": "Qwen3 Embedding 8B",
                "ModelID": "deepseek-v4.1-flash",
                "ModelDescription": "",
                "ProviderURL": "https://api.deepseek.com/v1",
                "ProviderKey": "sk-your_api_key",
                "Hide": true, // 通常隐藏
                "Type": "embedding", // 类型（必须为 embedding）
                "ProviderSpecificConfig": { // 提供方专属配置
                    "Dimension": 0, // 维度
                }
            }
        }
    },
}
```

:::

- `Hide`: 通常隐藏。
- `Type`: 类型（必须为 `embedding`）。
- `ProviderSpecificConfig`
  - `Dimension`：**维度**。此项将被用于 API 调用。需与上游一致。

## 模型推荐配置

:::details DeepSeek V4.1 Flash (官方)

```json
{
  "Model": {
        "Models": {
            "<ModelID>": {
                "ModelName": "DeepSeek V4.1 Flash",
                "ModelID": "deepseek-v4.1-flash",
                "ModelDescription": "",
                "ModelAddPrompt": "",
                "ModelTopP": -1,
                "ModelTopK": -1,
                "ModelTemperature": -1,
                "TokenLimit": 1024000,
                "MaxCompletionTokens": 16800,
                "ProviderURL": "https://api.deepseek.com/v1",
                "ProviderKey": "sk-your_api_key",
                "EnableThinking": true,
                "CompressSize": 400000,
                "Hide": false,
                "Type": "",
                "CachePriceMultiplier": 0.02,
                "CacheRetentionMinutes": 180,
                "ProviderSpecificConfig": {
                    "EnableDeepseekThinking": true,
                    "EnableReasoningEffort": true,
                    "EnableTopP": false,
                    "EnableTemperature": false,
                    "EnableTopK": false,
                    "EnableUsage": true,
                    "Dimension": 0,
                    "EnableToolCallingCompat": true,
                    "EnableTrailingUserMessage": false,
                    "EnablePromptCacheKey": false,
                    "EnablePromptCacheBreakpoints": false,
                    "EnablePhase": false
                }
            }
        }
    }
}
```

:::

> 欢迎各位读者贡献不同模型的推荐配置！
