import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import AntdResolver from "unplugin-auto-import-antd";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { viteMockServe } from "vite-plugin-mock";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 获取当前工作目录
  const root = process.cwd();
  // 获取环境变量
  const env = loadEnv(mode, root);
  console.log(env);
  return {
    // 项目根目录
    root,
    // 项目部署的基础路径
    base: "./",
    // 无需处理的静态资源位置
    publicDir: fileURLToPath(new URL("./public", import.meta.url)),
    // 需要处理的静态资源位置
    assetsInclude: fileURLToPath(new URL("./src/assets", import.meta.url)),

    plugins: [
      // react支持热更新
      react(),
      // 开启mock服务器
      viteMockServe({
        // 如果接口为 mock/xxx 以mock开头就会被拦截响应配置的内容
        mockPath: "mock", // 数据模拟需要拦截的请求起始url
        enable: true, // 本地环境是否开启 mock 功能
      }),
      // 静态自动导入
      AutoImport({
        // 声明文件路径
        dts: fileURLToPath(
          new URL("./types/auto-imports.d.ts", import.meta.url)
        ),
        // 改目录下自动导入
        dirs: [fileURLToPath(new URL('./src/components/**/**', import.meta.url))],
        include: [/\.[tj]sx?$/, /\.md$/],
        // 预设
        imports: [
          "react",
          "react-router-dom",
          // {
          //   from: "",
          //   imports: []
          // }
        ],
        // 处理 eslint
        eslintrc: {
          enabled: false,
        },
        // 动态自动引入
        resolvers: [
          AntdResolver({ prefix: "Antd" }), // 动态引入antd
          IconsResolver({ // 动态引入 Iconify 图标
            prefix: "Icon",
            extension: "jsx",
          }),
        ],
      }),
      // 自动安装图标  图标来源 Iconify
      Icons({
        autoInstall: true,
        compiler: 'jsx',
        jsx: 'react',
      }),
    ],
    // 运行后本地预览的服务器
    server: {
      // 是否开启https
      // https: ,
      // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      host: true,
      // 开发环境预览服务器端口
      port: 9000,
      // 启动后是否自动打开浏览器
      open: false,
      // 是否开启CORS跨域
      cors: true,
      // 代理服务器
      // 帮助我们开发时解决跨域问题
      proxy: {
        // 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:9000
        [env.VITE_APP_API_BASEURL]: {
          target: "http://localhost:9000",
          // 改变 Host Header
          changeOrigin: true,
          // 发起请求时将 '/api' 替换为 ''
          //rewrite: (path) => path.replace(/^\/api/, ""),
        },
        [env.VITE_APP_MOCK_BASEURL]: {
          target: "http://localhost:9000",
          // 改变 Host Header
          changeOrigin: true,
          // 发起请求时将 '/api' 替换为 ''
          //rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    // 配置别名
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "#": fileURLToPath(new URL("./types", import.meta.url)),
      },
    },
  };
});
