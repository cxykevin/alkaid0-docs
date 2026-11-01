# Windows Install

在 Windows 上，我们提供以下几种安装方式：

> 无论使用哪种安装方式，您都需要确保您的 Windows 版本高于 Windows 10 22H2。
>
> 在 Windows 上安装暂时会遇到证书问题。我们正在修复，您可能需要手动从 MSIX 安装包中安装证书。

## 1. 使用一键安装脚本

> 由于证书问题，本功能暂时无法使用。
>
> 使用本安装方式，您需要准备一个可以稳定访问 Github 的网络环境。

```bash
irm https://alk.cxykevin.top/i.ps1 | iex
```

> 我们更建议您使用以下安装脚本以在安装 Alkaid0 的同时安装 TUI 工具 Alcoh：
>
> ```bash
> irm https://alk.cxykevin.top/c.ps1 | iex
> ```

## 2. 安装 MSIX 包

1. 从[Releases](https://github.com/cxykevin/alkaid0/releases)页面下载最新的 Windows 安装包。后缀应为 `.msix`。
2. 右键安装包并手动从安装包导入证书。
3. 双击安装包打开，使用系统安装器安装。
4. 启动 Alkaid0。

> 由于 Windows 的已知 Bug，您在升级 Alkaid0 后可能需要重启操作系统才可使新版本生效。

## 3. 直接运行可执行文件

> Windows 上直接执行可执行文件对于沙盒等重要功能是无法预测的行为。你需要以管理员身份运行可执行文件。沙盒所需特权通常会自动授权，但是应需要在 LLM 首次运行任意命令后重启。
>
> 我们十分不建议使用此方法。

1. 从[Releases](https://github.com/cxykevin/alkaid0/releases)页面下载最新的 Windows 可执行文件。后缀应为 `.exe`。
2. 直接运行。
