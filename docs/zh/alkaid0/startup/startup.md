# 首次启动 / Startup

在您完成安装后，Alkaid0 通常会立刻启动或随着操作系统启动而启动。

## 配置 & 日志位置

默认情况下，Alkaid0 的配置文件位于以下位置：

- Windows: `C:\ProgramData\Alkaid0\config.json`
- Linux: `/etc/alkaid0/config.json`

> 如果您以用户态运行 Alkaid0，配置文件将位于 `~/.config/alkaid0/config.json`。

日志一般位于配置文件同级别的 `log.log` 与 `log-{n}.log`（其中 n 默认为 0-99）。特别第，在 Linux 下，日志文件位于 `/var/log/alkaid0/`。
