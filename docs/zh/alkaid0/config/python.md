# Python Python 环境配置

以下简述了配置文件中 Python 模块的内容：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "Python": {
        "Path": "", // Python 可执行文件
        "Source": "" // pip 安装源
    }
}
```

:::

:::info 配置项{open}

- `Path`：**Python 可执行文件**。string 类型。用于创建全局 IPython 虚拟环境。

  可以填写命令名（如 `python3`），也可以填写绝对路径。为空时 Alkaid0 会依次在 `PATH` 中查找 `python3` 与 `python`。

- `Source`：**pip 安装源**。string 类型。非空时，在虚拟环境内安装依赖时会追加 `--index-url <Source>`；为空则使用 pip 的默认源。

:::

## 全局虚拟环境

`run` 工具的 `python` 类型会在一个全局 IPython 虚拟环境中执行代码。该虚拟环境由 Alkaid0 自动维护：

- **位置**：配置文件所在目录下的 `venv` 目录。

  例如系统模式下通常为 `/etc/alkaid0/venv`，用户模式下通常为 `~/.config/alkaid0/venv`。

- **Python 版本要求**：Python 3.12 或更高版本。版本过低时初始化会失败。
- **依赖**：初始化时会检查并按需安装 `ipython`、`openai` 与 `dynworkflow`。
- **初始化时机**：Alkaid0 启动后在后台异步初始化，不会阻塞启动流程。初始化完成前调用 `python` 类型任务会提示等待。
- **就绪标记**：初始化成功后会在虚拟环境目录中写入 `alkaid0_inited.txt`。

:::warning 注意

初始化虚拟环境与安装依赖需要网络连接，并且可能耗时较长。若初始化失败，错误会记录在日志中，`python` 类型任务将无法使用。

:::

:::tip 关于修改配置

- `Path` 指定的是**创建虚拟环境所使用的解释器**，不是虚拟环境内部的 Python。
- 已存在的虚拟环境会被直接复用，不会因为修改 `Path` 而自动重建。若需要更换解释器，请停止 Alkaid0 后删除 `venv` 目录并重新启动。
- 若 `venv` 目录存在但缺少就绪标记，Alkaid0 会删除并重新创建它。
- `Source` 只会在需要安装缺失依赖时生效；依赖已存在时修改此项不会重新安装。

:::