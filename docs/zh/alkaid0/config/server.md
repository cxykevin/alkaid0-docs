# Server 服务端配置

以下简述了配置文件中 Server 模块的内容：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "Server": {
        "host": "127.0.0.1", // 监听地址
        "port": 7433, // 监听端口
        "key": "alk-xxxxxxxxxxxxxxxx", // 通信密钥
        "path": "/acp", // WebSocket 路径
        "disableStdioServer": false, // 是否禁用 Stdio 服务器
        "sessionTimeout": 60 // 会话重连超时时间（秒）
    }
}
```

:::

:::info 网络设置{open}

- `host`：**监听地址**。string 类型，默认 `127.0.0.1`。改为 `0.0.0.0` 可监听所有网卡。
- `port`：**监听端口**。uint16 类型，默认 `7433`，有效范围为 `1` 到 `65535`。
- `path`：**WebSocket 路径**。string 类型，默认 `/acp`，必须以 `/` 开头。客户端连接地址为 `ws://<host>:<port><path>`。

:::

:::info 鉴权设置{open}

- `key`：**通信密钥**。string 类型，用于 WebSocket 连接与部分 HTTP 端点的鉴权。

  若加载配置时此项为空，Alkaid0 会自动生成一个以 `alk-` 开头的随机密钥并写回配置文件。WebSocket 服务要求密钥非空。

  客户端可以通过查询参数（如 `?key=<key>`）或 `Authorization` 请求头携带密钥，支持 `Bearer <key>` 与裸 `<key>` 两种写法。

  `/info`、`/gc` 等 HTTP 端点也使用同一把密钥进行鉴权。

:::

:::info 运行模式{open}

- `disableStdioServer`：**是否禁用 Stdio 服务器**。bool 类型，默认 `false`。

  Alkaid0 默认同时启动 Stdio 与 WebSocket 两种 JSON-RPC 服务。若只希望通过 WebSocket 连接，可将此项设为 `true`。

- `sessionTimeout`：**会话重连超时时间**。int 类型，单位为秒，默认 `60`，有效范围为 `1` 到 `86400`。

  客户端连接断开后，Alkaid0 会保留该会话及其资源并等待重连；超过此时间后会话将被释放，其 loop 与数据库连接也会一并回收。

:::

:::tip 连接示例

```text
ws://127.0.0.1:7433/acp?key=alk-xxxxxxxxxxxxxxxx
```

或使用请求头：

```text
Authorization: Bearer alk-xxxxxxxxxxxxxxxx
```

:::

:::warning 安全提示

`key` 是访问 Alkaid0 服务的唯一凭据，请勿泄露给不可信的人。

将 `host` 改为 `0.0.0.0` 或公网地址会把服务暴露到网络，请务必确保 `key` 足够随机且强度足够，并根据需要配置防火墙。

:::