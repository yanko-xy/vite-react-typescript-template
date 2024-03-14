module.exports = {
    // 使 eslint 支持 node 与 ES6
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        './.eslintrc-auto-import.json'
    ],
    overrides: [],
    // 选择使用的解析器
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // 使用最新版 ES 语法
        ecmaVersion: 'latest',
        // 使用 ES 模块化规范
        sourceType: 'module'
    },
    // 使用的插件
    plugins: ['react', '@typescript-eslint', 'prettier'],
    // 自定义规则
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        semi: 'off',
        'eslintno-debugger': 'off',
        'no-constant-condition': 'off',
        'react/jsx-no-undef': 'off',
        'react/react-in-jsx-scope': 'off'
        // "no-undef": "off",
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect'
        }
    }
};
