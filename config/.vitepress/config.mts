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
