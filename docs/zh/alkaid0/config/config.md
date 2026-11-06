# 配置概览 / Config Overview

本文档将介绍 Alkaid0 的配置文件结构，并指引您如何去修改这些配置。

Alkaid0 的配置文件采用 JSON 格式，使用 UTF-8 编码。您可以在 [此处](https://raw.githubusercontent.com/cxykevin/alkaid0/refs/heads/main/docs/schemas/config.json) 找到其 Schema。

:::tip 路径格式规范
本章节文档所有的配置项的路径均以 JSONPath 格式呈现，并附上以 `/` 分割的翻译后的路径。

例如：`Server.host`(`服务端/主机`)
:::

:::tip 数据范围规范
本章节文档所有的配置项的数据范围均以 C / go 格式呈现。

如：

- `int32` - 32 位有符号整数
- `uint32` - 32 位无符号整数
- `int64` - 64 位有符号整数
- `uint64` - 64 位无符号整数
- `float32` - 32 位浮点数
- `float64` - 64 位浮点数
- `string` - 字符串
- `bool` - 布尔值
:::

:::info 历史遗留配置项
Alkaid0 存在一些历史遗留但仍未删除的配置项。这些配置项在配置文件中不起任何作用。本文档将不会对这些配置项进行介绍。
:::

## 配置 & 日志位置

默认情况下，Alkaid0 的配置文件位于以下位置：

- Windows: `C:\ProgramData\alkaid0\config.json`
- Linux: `/etc/alkaid0/config.json`

:::info
如果您以用户态运行 Alkaid0，配置文件将位于 `~/.config/alkaid0/config.json`（Linux） 或 `C:\Users\{你的用户名}\.config\alkaid0\config.json`。
:::

## 配置结构

Alkaid0 的配置文件结构如下：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "Version": 1, // 配置文件版本

    // AI 配置
    "Model": { ... }, // 模型配置
    "Agent": { ... }, // AI 代理配置
    "Context": { ... }, // 网络及上下文配置

    // 服务端与环境配置
    "Server": { ... }, // 服务端配置
    "Python": { ... }, // Python 环境配置
    "DataMask": { ... }, // 数据掩码配置
    "Hooks": { ... }, // 事件钩子配置
    "Feedback": { ... }, // 反馈 & 遥测配置

    // 以下选项用于解决 Alkaid0 在特定环境启动失败的问题，无问题不建议修改
    "ignoreSignals": false, // 是否忽略系统信号
}
```

:::

- AI 配置
  - **[Model](model)** - 模型配置
  - **[Agent](agent)** - AI 代理配置
  - **[Context](context)** - 网络及上下文配置
- 服务端与环境配置
  - **[Server](server)** - 服务端配置
  - **[Python](python)** - Python 环境配置
  - **[DataMask](datamask)** - 数据掩码配置
  - **[Hooks](hooks)** - 事件钩子配置
  - **[Feedback](feedback)** - 反馈 & 遥测配置
  - **ignoreSignals** - 是否忽略系统信号，通常在 Alkaid0 在特定环境启动失败或接受到错误信号退出时使用。启用本参数后，Alkaid0 将忽略所有系统信号。

## 修改配置

您可以在配置文件中直接修改配置项，也可以通过 Alkaid0 专用客户端进行修改。

例如在 Alcoh 中，您可以通过 `/server` 命令打开配置菜单。

:::danger 警告
我们强烈建议您不要直接修改配置文件。部分配置项的修改可能导致 Alkaid0 无法正常运行。若配置文件损坏，则损坏版本会被备份到 `config.json.bak`。
:::

## I18n 配置项国际化翻译

I18n 的官方可靠版本位于 [Alcoh 仓库](https://github.com/cxykevin/alcoh) 中。本文档的所有译名均以其为准。此外，其它官方客户端也与其同步。
