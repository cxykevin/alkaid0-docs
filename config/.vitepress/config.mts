import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "../docs",

  title: "Alkaid0 Project Docs",
  description: "Docs for alkaid0, alcoh and other projects",

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Alkaid0', link: '/zh/alkaid0/intro/intro' }
    ],
  },
  locales: {
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        sidebar: {
          '/zh/alkaid0/': [
            {
              text: '简介 / Intro',
              items: [
                { text: '关于 Alkaid0', link: '/zh/alkaid0/intro/intro' },
                { text: '社区', link: '/zh/alkaid0/intro/community' },
                { text: '常见问题', link: '/zh/alkaid0/intro/FAQ' },
                { text: '路线图', link: '/zh/alkaid0/intro/roadmap' },
              ]
            },
            {
              text: '安装 / Install',
              items: [
                { text: 'Windows', link: '/zh/alkaid0/install/windows' },
                { text: 'Linux', link: '/zh/alkaid0/install/linux' },
                { text: 'MacOS', link: '/zh/alkaid0/install/macos' },
              ]
            },
            {
              text: '首次启动 / Startup',
              items: [
                { text: '首次启动', link: '/zh/alkaid0/startup/startup' },
              ]
            },
            {
              text: '配置 / Config',
              items: [
                { text: '配置概览', link: '/zh/alkaid0/config/config' },
                { text: 'Model 模型配置', link: '/zh/alkaid0/config/model' },
                { text: 'Agent AI 代理配置', link: '/zh/alkaid0/config/agent' },
                { text: '- Rules 规则表达式编写', link: '/zh/alkaid0/config/rules' },
                { text: 'Context 上下文配置', link: '/zh/alkaid0/config/context' },
                { text: 'Server 服务端配置', link: '/zh/alkaid0/config/server' },
                { text: 'Python Python 环境配置', link: '/zh/alkaid0/config/python' },
                { text: 'DataMask 数据掩码配置', link: '/zh/alkaid0/config/datamask' },
                { text: 'Hooks 事件钩子配置', link: '/zh/alkaid0/config/hooks' },
                { text: 'Feedback 反馈 & 遥测配置', link: '/zh/alkaid0/config/feedback' },
              ]
            }
          ]
        },

        socialLinks: [
          { icon: 'github', link: 'https://github.com/cxykevin/alkaid0' }
        ]
      }
    }
  }
})
