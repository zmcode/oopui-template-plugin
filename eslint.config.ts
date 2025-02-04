import antfu from '@antfu/eslint-config'

export default antfu({}, {
  rules: {
    // 禁用 curly 规则
    'curly': 'off',
    'no-cond-assign': 'off',
  },
})
