import eslint from '@eslint/js';                    // ESLint의 핵심 기능을 제공하는 패키지
import tseslint from 'typescript-eslint';           // TypeScript 코드를 ESLint로 검사하기 위한 패키지
import eslintConfigPrettier from 'eslint-config-prettier';  // Prettier와 ESLint의 충돌을 방지하기 위한 패키지
import vue from 'eslint-plugin-vue';                // Vue.js 코드를 ESLint로 검사하기 위한 패키지
import * as importPlugin from 'eslint-plugin-import';  // import/export 문의 사용을 검사하기 위한 패키지

export default [
  {
    rules: {
      // Vue 관련 규칙
      'vue/multi-word-component-names': 'error',    // 컴포넌트 이름 여러 단어 강제
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],  // 컴포넌트 이름은 PascalCase로
      'vue/component-definition-name-casing': ['error', 'PascalCase'],   
      'vue/prop-name-casing': ['error', 'camelCase'],     // props 이름은 camelCase로
      'vue/attribute-hyphenation': ['error', 'always'],  // 템플릿 속성명은 kebab-case로
      'vue/require-default-prop': 'warn',        // props 기본값 경고로만
      'vue/require-prop-types': 'warn',          // props 타입 지정 경고로만
      
      // Import 순서 관련 규칙
      'import/order': ['error', {
        'groups': [
          'builtin',     // node "builtin" 모듈
          'external',    // npm 설치한 패키지
          'internal',    // webpack alias로 설정한 내부 모듈
          ['parent', 'sibling'],    // 상위 디렉토리와 형제 디렉토리
          'index',       // 현재 디렉토리
          'object',      // object-imports
          'type'         // type imports
        ],
        'pathGroups': [
          {
            'pattern': 'vue',
            'group': 'external',
            'position': 'before'
          }
        ],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }],
      
      // TypeScript 관련 규칙
      '@typescript-eslint/naming-convention': [      
        'error',
        {
          'selector': 'interface',
          'format': ['PascalCase']  // prefix 제거, 현대적인 TypeScript 스타일
        },
        {
          'selector': 'typeAlias',
          'format': ['PascalCase']
        },
        {
          'selector': 'variable',
          'format': ['camelCase', 'UPPER_CASE']
        }
      ],
  
      // 일반 규칙
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      
      '@typescript-eslint/explicit-function-return-type': 'warn',
    }
  }
]; 