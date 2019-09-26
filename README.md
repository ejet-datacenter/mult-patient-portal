# 修改webpack配置

这里展示一下我的项目目录

```
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── package.json
├── src
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── Hello.vue
│   │   └── Search.vue
│   └── pages
│       ├── search
│       │   ├── search.html
│       │   ├── search.js
│       │   └── Search.vue
│       └── index
│           ├── index.html
│           ├── index.js
│           ├── index.vue
│           └── router
│               └── index.js
└── static
```

- utils.js
- webpack.base.conf.js
- webpack.dev.conf.js
- webpack.prod.conf.js


# 打包

npm run build


# 运行
npm run dev