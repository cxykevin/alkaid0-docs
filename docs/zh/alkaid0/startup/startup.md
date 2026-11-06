# 首次启动 / Startup

在您完成安装后，Alkaid0 通常会立刻启动或随着操作系统启动而启动。

## 配置 & 日志位置

默认情况下，Alkaid0 的配置文件位于以下位置：

- Windows: `C:\ProgramData\alkaid0\config.json`
- Linux: `/etc/alkaid0/config.json`

:::info
如果您以用户态运行 Alkaid0，配置文件将位于 `~/.config/alkaid0/config.json`（Linux） 或 `C:\Users\{你的用户名}\.config\alkaid0\config.json`。
:::

日志一般位于配置文件同级别的 `log.log` 与 `log-{n}.log`（其中 n 为 0-99）。特别地，在 Linux 且以系统服务模式运行时，日志文件位于 `/var/log/alkaid0/`。

## 使用客户端链接

在 Alkaid0 启动后，您可以使用客户端链接来连接到 Alkaid0。通常 Alcoh 等客户端默认会链接到本机的 Alkaid0，您也可以手动指定链接地址。

通常情况下，Alkaid0 会监听 `127.0.0.1:7433`。您可以在配置文件的 Server 字段中修改监听地址与端口。

```json{11-12}
{
  "$schema": "https://raw.githubusercontent.com/cxykevin/alkaid0/refs/heads/main/docs/schemas/config.json",
  "Version": 1,
  "Model": {
    ...
  },
  "Agent": {
    ...
  },
  "Server": {
    "host": "127.0.0.1",
    "port": 7433,
    "key": "alk-thisisthekey",
    "path": "/acp",
    "disableStdioServer": false,
    "sessionTimeout": 600
  },
  ...
}

```

:::tip
如果客户端要求您提供 Key，您可以在配置文件的 `Server.key` 字段中找到。

Key 默认以 `alk-` 开头。您也可以修改为自定义的 Key。

例如：

```json{5}
{
  "Server": {
    "host": "127.0.0.1",
    "port": 7433,
    "key": "alk-thisisthekey",
    "path": "/acp",
    ...
  },
  ...
}

```

:::info
如果客户端要求您提供 Websocket 链接地址，或您正在使用 ACP 兼容的客户端：

您可以使用 `ws://127.0.0.1:7433/acp?k={这里填写你的 Key}` 链接到 Alkaid0。
:::

:::warning
如果 Alcoh 等客户端在访问 Alkaid0 的时候遇到了权限问题，您可能需要执行：

:::code-group

```powershell [Windows]
mkdir "${env:USERPROFILE}\.config\alkaid0"
cp "C:\ProgramData\alkaid0\config.json" "${env:USERPROFILE}\.config\alkaid0"
```

```bash [Linux]
mkdir -p "~/.config/alkaid0"
cp "/etc/alkaid0/config.json" "~/.config/alkaid0/config.json"
```

:::

启动成功后，您可以直接访问 `http://127.0.0.1:7433` 查看 Alkaid0 是否启动成功。

使用 `http://127.0.0.1:7433/info?k={你的 Key}` 可以查看 Alkaid0 的状态。

## 模型配置

通常客户端会帮助你完成初步配置。配置方式因客户端而异。

:::info
如果您需要手动配置，请参考 [模型配置](/zh/alkaid0/config/models)。我们更推荐您使用客户端进行配置。
:::

## 大功告成

恭喜！您已经成功启动了 Alkaid0。接下来，您可以开始愉快地使用 Alkaid0 了。
