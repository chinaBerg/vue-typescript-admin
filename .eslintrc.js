module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // 禁用 console，生产环境报错，开发环境关闭
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁用 debugger，生产环境报错，开发环境关闭
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'class-methods-use-this': 'off', // 强制类方法使用this，关闭
    'no-param-reassign': 'off', // 禁止对function的参数进行重新赋值，关闭
    'import/prefer-default-export': 'off', // 优先使用默认导出，关闭
    'vue/no-parsing-error': 'off',
    'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
    'semi': ["error", "always"], // 要求或禁止使用分号代替 ASI
    "no-prototype-builtins": 'off', // 要求禁止直接使用 Object.prototypes 的内置属性，例如hasOwnProperty
    "no-restricted-syntax": 'off', // 要求禁止使用特定的语法
    '@typescript-eslint/no-explicit-any': 'off', // 要求禁止使用any
    'no-throw-literal': 'off', // 要求throw出的是一个error object
    'import/no-cycle': 'off', // 要求禁止出现循环依赖
    'no-plusplus': 'off', // 要求禁止出现++
    'no-continue': 'off', // 要求禁止出现continue
    'no-async-promise-executor': 'off',
    'prefer-rest-params': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      }
    }
  }
};
