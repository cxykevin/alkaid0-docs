# Linux Install

在 Linux 上，我们提供以下几种安装方式：

> 无论使用哪种安装方式，您都需要确保您的发行版使用以下支持的服务管理器之一：
>
> - Systemd
> - OpenRC（支持尚不完善）
> - SysVinit（支持尚不完善）
>
> 如果您使用的是其他服务管理器，您可能需要自行编写服务管理脚本或手动启动。

## 1. 使用一键安装脚本

> 使用本安装方式，您需要准备一个可以稳定访问 Github 的网络环境。

```bash
curl -sSL https://alk.cxykevin.top/i.sh | bash
```

> 我们更建议您使用以下安装脚本以在安装 Alkaid0 的同时安装 TUI 工具 Alcoh：
>
> ```bash
> curl -sSL https://alk.cxykevin.top/c.sh | bash
> ```

## 2. 使用系统包管理器

1. 从[Releases](https://github.com/cxykevin/alkaid0/releases)页面下载最新的 Linux 安装包。必须使用和您的 Linux 发行版使用的包管理器对应的安装包。

   我们支持以下包管理器
   - `pacman(Arch Linux)`: `.pkg.zst`
   - `apt(Debian/Ubuntu)`: `.deb`
   - `apk(Alpine Linux)`: `.apk`
   - `yum(RHEL/CentOS)` / `dnf(Fedora)`: `.rpm`

2. 使用您的包管理器安装本包。
3. 启动 Alkaid0。

   ```bash
   systemctl start alkaid0
   ```

## 3. 手动部署

> 除非您需要以用户态而非 root 运行 Alkaid0，否则我们极其不建议您使用此安装方式。本安装方式需要您对 Linux 系统有较高的了解。

1. 从[Releases](https://github.com/cxykevin/alkaid0/releases)页面下载最新的 Linux 可执行文件。其通常没有后缀名。
2. 将可执行文件重命名为 alkaid0，并移动到 `/usr/bin` 目录下。
3. 从[Services](https://github.com/cxykevin/alkaid0/tree/main/installer/linux/service)下载您的 Linux 发行版对应的服务管理脚本，并手动注册到您的服务管理器中。
4. 启动 Alkaid0。
