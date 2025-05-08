// eslint.config.mjs
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import next from 'eslint-plugin-next'

export default [
  // Первым — базовый JS-рекомендуемый конфиг
  js.configs.recommended,

  // Подключаем плагин React
  {
    plugins: { react },
    rules: {
      ...react.configs.recommended.rules,
    },
  },

  // Подключаем плагин Next.js
  {
    plugins: { next },
    rules: {
      ...next.configs.recommended.rules,
    },
  },

  // Игнорируем артефакты сборки
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
]
