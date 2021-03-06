const productConfig = {
  mysql: {
    port: 3306,
    host: '127.0.0.1',
    user: 'root1',
    password: 'root',
    database: 'nest_demo_01', // 库名
    connectionLimit: 10, // 连接限制
    charset: 'utf8mb4',
  },
};

const localConfig = {
  mysql: {
    port: 3306,
    host: '127.0.0.1',
    user: 'root1',
    password: 'root',
    database: 'nest_demo_01', // 库名
    connectionLimit: 10, // 连接限制
    charset: 'utf8mb4',
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
