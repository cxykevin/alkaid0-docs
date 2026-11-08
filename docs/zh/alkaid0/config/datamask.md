# DataMask 数据掩码配置

以下简述了配置文件中 DataMask 模块的内容：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "DataMask": {
        "enable": true, // 总开关
        "mask_api_key": true, // 脱敏 API Key
        "mask_phone": false, // 脱敏手机号
        "mask_ip": false, // 脱敏公网 IP
        "mask_ip_whitelist": [], // 公网 IP 白名单
        "mask_session_cookie": false, // 脱敏 session/cookie
        "mask_jwt": true, // 脱敏 JWT
        "mask_client_messages": false // 客户端消息也使用脱敏内容
    }
}
```

:::

DataMask 会在请求发送给模型之前，把文本中的敏感数据替换为**同格式的假值**；模型响应中的假值再被还原为原文。这样既能避免敏感信息离开本机，又不会破坏依赖固定格式的上下文。

## 防中转站数据收集泄露密钥 {#anti-relay-key-leak}

使用第三方 API 中转站、代理或聚合服务时，请求内容通常会完整经过对方的服务器，对方可能记录、分析甚至长期保存这些数据。如果对话、代码或工具输出中出现了 API Key、Access Token、JWT，即使只是示例、日志片段或误粘贴的内容，也可能被中转站收集并用于盗用。

DataMask 的“安全 key 上下文”正是为这个场景设计的：

1. 请求离开本机之前，Alkaid0 会识别文本中的密钥类数据，并替换为**格式、长度和字符集都相同的假值**。
2. 中转站与上游模型只能看到假值，无法从请求中提取真实密钥。
3. 模型在响应中引用这些假值时，Alkaid0 会在本地流式还原为原文，因此对话内容不会被破坏。
4. 原值与假值的对应关系只保存在本地，不会随请求发送。

例如你在对话里贴了一段包含 `sk-...` 的配置，中转站收到的会是同样形状的 `sk-...` 假值；你在客户端看到的仍是原文（除非开启了 `mask_client_messages`）。

默认配置下 `mask_api_key` 与 `mask_jwt` 已开启，可以直接获得这层保护；如需覆盖手机号、公网 IP、session/cookie 等类型，可在上方配置项中按需打开。

:::warning 边界

- 此功能保护的是**请求内容中出现的密钥**。当前模型连接所使用的 `ProviderKey` 仍必须按协议发送给模型服务方用于鉴权，无法被隐藏。
- 中转站仍然可以看到未被脱敏的对话内容、模型名称、用量等元数据。它不是网络匿名或反追踪工具。
- 建议为每个中转站使用独立、可随时撤销、带额度限制的密钥，并优先选择可信服务。
- 内置识别规则无法覆盖所有自定义密钥格式；遇到无法识别的值，可通过 `/mask add <值>` 手动加入脱敏列表。

:::

:::info 配置项{open}

- `enable`：**总开关**。bool 类型，默认 `true`。
- `mask_api_key`：**是否脱敏 API Key**。bool 类型，默认 `true`。

  会匹配常见密钥前缀（如 `sk-`、`ghp_`、`AIza` 等），以及长度不少于 80 个字符的无前缀 token。

- `mask_phone`：**是否脱敏手机号**。bool 类型，默认 `false`。仅匹配中国大陆 11 位手机号。
- `mask_ip`：**是否脱敏公网 IP**。bool 类型，默认 `false`。

  仅脱敏公网 IP，本地、回环与私有地址不会被处理。内置白名单包含常见公共 DNS / NTP 地址，这些地址默认不脱敏。

- `mask_ip_whitelist`：**公网 IP 白名单**。string 数组，默认 `[]`。

  可填写单个 IP 或 CIDR（如 `"1.1.1.1"`、`"8.8.8.0/24"`），命中白名单的公网 IP 不会被脱敏。此项用于在**内置白名单之外追加**地址。

- `mask_session_cookie`：**是否脱敏 session / cookie**。bool 类型，默认 `false`。

  会处理 `session`、`sid`、`token`、`cookie` 等关键字后的值，以及完整的 `Cookie` / `Set-Cookie` 请求头。

- `mask_jwt`：**是否脱敏 JWT**。bool 类型，默认 `true`。会构造 header 与 payload 相同、签名伪造的假 JWT。
- `mask_client_messages`：**客户端消息也使用脱敏内容**。bool 类型，默认 `false`。

  开启后，发送给客户端的用户消息、AI 正文与思考、工具调用参数、历史回放及摘要都会显示为同格式假值，适合演示或直播场景。模型输入与本地数据库仍保留原文。此项依赖 `enable` 总开关。

:::

:::warning 误伤与兼容性

脱敏基于格式识别，可能会把普通文本中“看起来像密钥”的内容一并替换。由于响应中的假值会被还原，通常不会影响模型输出；但若上游对内容格式有额外校验，建议按需关闭对应类型。

:::

## 自定义脱敏值

除了内置的识别规则外，还可以为当前会话添加自定义脱敏值：

- `/mask add <值>`：将该值加入脱敏列表。请求出站前会被替换，响应中会还原为原文。
- `/mask del <值>`：将该值移出脱敏列表。

:::warning

`/mask add` 依赖 `DataMask.enable`。总开关关闭时添加自定义值会直接报错，且不会生效。

:::