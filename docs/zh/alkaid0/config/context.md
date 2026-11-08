# Context 上下文配置

以下简述了配置文件中 Context 模块的内容：

:::details JSON{open}
:::code-group

```json [config.json]
{
    "Context": {
        // 模型配置
        "EmbeddingModelID": 0, // Embedding 模型 ID
        "SearchSummaryModel": 0, // 搜索摘要模型 ID

        // 功能配置
        "OnlineSearch": { // 在线搜索配置
            "timeout": 30, // 超时时间
            "proxy_url": "", // 代理 URL
            "retry_count": 3, // 重试次数
            "bing": {
                "enable": true, // 是否启用该搜索源
                ...
            },
            ...
        },
        "LSP": { // LSP(Language Server Protocol) 配置
            "Enabled": false, // 是否启用 LSP 支持
            "LanguageServers": { // 高级语言服务器配置
                ".py": {
                    "Command": "python", // 启动命令
                    "Args": [ // 启动参数
                        "-m",
                        "pylsp"
                    ],
                }
            },
            "IdleTimeout": 0 // 超时时间
        },
        "Codebase": { // 代码库索引配置
            "BM25Weight": 0.7, // BM25 权重
            "VectorMinSimilarity": 0.5, // 向量最小相似度
            "BM25RetentionScore": 0.7 // BM25 保留分数
        },
        "Phrase": { // 短语配置
            "Enable": true, // 是否启用短语
            "Phrases": [ // 短语列表
                {
                    "Short": "h", // 短语 Key
                    "Text": "你好世界", // 短语内容
                    "Desc": "向 AI 发送：你好世界" // 短语描述
                }
            ]
        }
    },
}
```

:::

:::info 模型设置{open}

- `EmbeddingModelID`：**嵌入模型 ID**，用于生成代码库索引。***其 Type 必须为 `embedding`(参考 [此处](model#embedding-config))***，否则会被忽略。
- `SearchSummaryModel`：**搜索摘要模型 ID**，用于生成搜索摘要。其应为一个 LLM。***注意：Agent 不一定会调用搜索摘要！***

:::

:::info 功能设置{open}

- `OnlineSearch`：**在线搜索配置**，用于在线搜索。
  - `timeout`：**超时时间**，单位为秒。
  - `proxy_url`：**代理 URL**，用于代理请求。
  - `retry_count`：**重试次数**，用于请求失败时的重试次数。
  
  - `[搜索源名]`: **搜索源配置**，用于配置搜索源。
    - `enable`: **是否启用该搜索源**。该配置对于所有搜索源都通用。

    关于支持的搜索源，请参考 [下方](#search-source-config)。

- `LSP`：**LSP 配置**，用于 LSP 支持。
  - `Enabled`：**是否启用 LSP 支持**。
  - `LanguageServers`：**高级语言服务器配置**，用于配置在内置清单之外的语言服务器。一般无需配置。

    内置清单请参考 [下方](#language-server-list)。

<span id="codebase-config"></span>

- `Codebase`：**代码库索引配置**，用于代码库索引。
  - `BM25Weight`：**BM25 权重**。
  - `VectorMinSimilarity`：**向量最小相似度**。
  - `BM25RetentionScore`：**BM25 保留分数**。

  关于代码库索引的细节和推荐配置，请参考 [此处](/zh/alkaid0/feature/codebase)。

<span id="parse-config"></span>

- `Phrase`：**短语配置**，用于短语支持。短语使用 `/s` 命令发送。具体细节请参考 [此处](/zh/alkaid0/feature/commands#cmd-s)。
  - `Enable`：**是否启用短语功能**。
  - `Phrases`：**短语列表**。
    - `Short`: **短语 Key**。用户通过 `/s [Short]` 发送短语。
    - `Text`: **短语内容**。将会被发送给 AI 的内容。
    - `Desc`: **短语描述**。人类可读。

:::

## 内置语言服务器清单{#language-server-list}

:::warning 注意{open}

除非您在使用 **该清单之外的语言**、**与清单不同的语言服务器实现** 或者 **非标准的语言服务器配置**，否则不建议修改该配置。

:::

> 清单服务器的原始定义位于 [此处](https://github.com/cxykevin/alkaid0/blob/main/context/lsp/language.go)。始终以源代码为准。

| 扩展名 | 语言 | 语言服务器（启动命令） |
| ---- | ---- | ---------- |
| `.go` | Go | `gopls` |
| `.py` | Python | `pylsp` |
| `.c` / `.h` | C | `clangd` |
| `.cpp` / `.hpp` / `.cc` / `.cxx` | C++ | `clangd` |
| `.rs` | Rust | `rust-analyzer` |
| `.java` | Java | `jdtls` |
| `.kt` / `.kts` | Kotlin | `kotlin-language-server` |
| `.cs` | C# | `csharp-ls` |
| `.js` / `.jsx` | JavaScript | `typescript-language-server --stdio` |
| `.ts` / `.tsx` | TypeScript | `typescript-language-server --stdio` |
| `.vue` | Vue | `vue-language-server --stdio` |
| `.css` / `.scss` / `.sass` / `.less` | CSS (Include Extends) | `vscode-css-language-server --stdio` |

:::tip 内置处理的扩展
以下扩展名对于 Alkaid0 内置了一套处理方案，无需通常也不必或不能配置语言服务器：

| 扩展名 | 语言 |
| ---- | ---- |
| `.json` | JSON |
| `.jsonl` | JSON Lines |
| `.yaml` / `.yml` | YAML |
| `.txt` | Text |
| `.toml` | TOML |
| `.ini` | INI |
| `.makefile` | Makefile |
| `.dockerfile` | Dockerfile |
| `.license` | License |
| `.md` / `.mdx` | Markdown (Include Extends) |

:::

## 搜索源配置{#search-source-config}

搜索源引擎位于独立的 [alkaid0-search-engine](https://github.com/cxykevin/alkaid0-search-engine) 项目中。有关搜索源的问题、改进与反馈请提交到该项目。

:::::tip 支持的搜索源及配置

:::details Bing

Bing 搜索源基于爬虫，可能被风控并且实测效果并不理想。因此更建议使用其它搜索源。

> Bing 搜索源默认启用 SSL 伪装。

- `user_agent`: User-Agent。
- `min_delay` 和 `max_delay`: 请求间隔时间（秒）。在此区间内随机选择。
- `proxy_url`: 代理地址。
- `enable_ssl`: 是否启用 SSL 伪装。
- `market`: 市场区域（如 `"zh-CN"`）。
- `set_lang`: UI 语言（如 `"en-US"`, `"zh-Hans"`）。
- `country`: 国家（如 `"US"`, `"CN"`）。
- `safe_search`: 安全搜索级别。不建议更改。
- `freshness`: 时间筛选（`"Day"`, `"Week"`, `"Month"`）。
- `max_results`: 最大返回结果数（0 表示不限制）。

:::

:::details Tavily

Tavily 需要您配置 API 密钥。您可以在 [此处](https://tavily.com/) 免费注册并获取 API 密钥。免费额度截至本文档编写时为 1000 次/天。

- `api_key`: Tavily API 密钥。应为 `tvly-` 开头。
- `search_depth`: 搜索深度。可选值：`"basic"`（基础搜索）、`"advanced"`（高级搜索）。
- `include_answer`: 是否包含 AI 摘要。不建议开启。
- `include_raw`: 是否包含原始搜索内容。
- `proxy_url`: 代理地址。
- `max_results`: 返回结果数。

:::

:::details DeepSeek

DeepSeek 需要您配置 API 密钥。您可以在 [此处](https://platform.deepseek.com/) 注册。价格为 1000 次 / 5 人民币。本 API 为 Deepseek 新版搜索 API。

- `api_key`: DeepSeek API 密钥。应为 `ds-` 开头。
- `proxy_url`: 代理地址。
- `max_results`: 返回结果数。
- `need_content`: 是否需要返回内容。
- `localization`: 用于本地化搜索结果的 IP 地址。可选。

:::

::::details GitHub

GitHub 搜索使用 Github API。强烈建议您配置一个 API 密钥后使用。

:::info
本接口仅会搜索 **公开仓库** 与 **代码片段**。若需要更加复杂的搜索请引导 AI 使用 `gh` 命令或使用 `fetch` 工具请求 GitHub API。
:::

- `api_key`: GitHub API 密钥。应为 PAT Token。若未配置则使用匿名低配额。
- `proxy_url`: 代理地址。
- `max_results`: 返回结果数。

::::

:::details arXiv

arXiv 搜索源基于官方 API。官方 API 限制每分钟 20 次请求。

- `proxy_url`: 代理地址。
- `max_results`: 返回结果数。

:::

:::details Zread

Zread 搜索源基于爬虫，可能被风控并且并无实测。

- `user_agent`: User-Agent。
- `locale`: 语言（如 `"zh"`）。
- `min_delay` 和 `max_delay`: 请求间隔时间（秒）。在此区间内随机选择。
- `proxy_url`: 代理地址。
- `max_results`: 返回结果数。

:::

:::details Brave

Brave 搜索源使用官方 API。

- `country`: 国家（如 `"US"`, `"CN"`）。
- `search_lang`: 搜索语言（如 `"en"`, `"zh"`）。
- `ui_lang`: UI 语言（如 `"en-US"`, `"zh-Hans"`）。
- `safesearch`: 安全搜索级别。不建议更改。
- `result_filter`: 结果过滤。
- `freshness`: 时间筛选。
- `proxy_url`: 代理地址。
- `max_results`: 返回结果数。

:::

:::details 其它搜索源

搜索聚合引擎还支持其它搜索源。这些搜索源请参考 [源代码](https://github.com/cxykevin/alkaid0-search-engine/blob/main/config/config.go#L30-L169) 手动进行配置。

- `GrepApp`
- `Sourcegraph`
- `StackOverflow`
- `HackerNews`
- `Devto`
- `LibrariesIO`

:::

:::::

搜索会在 AI 使用 `search` 工具且 `type` = `online` 时调用。AI 可以进行宽泛搜索或指定一个或多个搜索源。

:::warning

配置的搜索源不建议超过 5 个，且不建议配置两个及以上的通用搜索源！

推荐配置：(`tavily` / `deepseek`) + `arXiv` + `github`

:::
