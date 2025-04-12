# 프론트엔드 코딩 컨벤션

## 목차
- [1. 명명 규칙 (Naming Conventions)](#1-명명-규칙-naming-conventions)
- [2. JavaScript/TypeScript 규칙](#2-javascripttypescript-규칙)
- [3. Vue 규칙](#3-vue-규칙)
- [4. CSS/SCSS 규칙](#4-cssscss-규칙)
- [5. 파일 구조](#5-파일-구조)
- [6. 작업 환경 설정](#6-작업-환경-설정)
- [7. 프론트엔드 테스트 가이드](#7-프론트엔드-테스트-가이드)

## 1. 명명 규칙 (Naming Conventions)

### 1.1 기본 원칙
- 모든 이름은 영문 사용
- 축약어 사용은 최소화하고 직관적인 이름 사용
- 이름으로 의도와 목적을 파악할 수 있도록 작성
- 예약어 사용 금지 (예: class, enum, extends, super, const, export, import)

### 1.2 네이밍 종류와 사용처

| 종류 | 설명 | 예시 | 사용처 | 상세 규칙 |
| :---- | :---- | :---- | :---- | :---- |
| **kebab-case** | 소문자 사용, 띄어쓰기를 **-**로 구분 | hello-world | 디렉토리, 그 외 확장자 파일 | - |
| **lowerCamelCase** | 소문자 사용, 띄어쓰기를 **대문자**로 구분 | helloWorld | ts/js 파일, 함수, 변수 | 변수명: `const userName = 'John'`<br>함수명: `function getUserData() {}` |
| **PascalCase** | 소문자 사용, 첫글자와 띄어쓰기를 **대문자**로 구분 | HelloWorld | class, type, interface, tsx/vue 파일 | 컴포넌트: `function UserProfile() {}`<br>클래스: `class UserService {}` |
| **snake_case** | 소문자만 사용, 띄어쓰기를 **_**로 구분 | hello_world | - | - |
| **UPPER_CASE** | 대문자만 사용, 띄어쓰기를 **_**로 구분 | HELLO_WORLD | 상수 | `const MAX_COUNT = 100`<br>`const API_KEY = 'xxx'` |

### 1.3 명확한 네이밍을 위한 규칙
- 의미있는 이름 사용
- 배열을 다룰 때는 복수형, 단일 데이터를 다룰 때는 단수형
- 지나친 줄임말 사용 금지

## 2. JavaScript/TypeScript 규칙

### 2.1 기본 문법
- 세미콜론(;) 필수
- 문자열은 작은따옴표(') 사용
- const와 let만 사용 (var 사용 금지)

```javascript
const name = 'John';
let age = 25;
```

### 2.2 들여쓰기
- 2칸 공백 사용
- 중괄호는 같은 줄에서 시작

```javascript
function example() {
  if (condition) {
    // code
  }
}
```

### 2.3 배열과 객체
```javascript
// 배열
const array = [1, 2, 3];
const multiLineArray = [
  1,
  2,
  3,
];

// 객체
const obj = { key: 'value' };
const multiLineObject = {
  key1: 'value1',
  key2: 'value2',
};
```

## 3. Vue 규칙

### 3.1 컴포넌트 작성
- 컴포넌트 이름은 항상 multi-word로 작성 (루트 컴포넌트 App 제외)
- `<script setup>` 문법 사용
- Props 타입 명시 (TypeScript)

```vue
<!-- Good -->
<template>
  <div class="user-info">
    <p>{{ name }}</p>
    <p>{{ age }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  age: number
}

defineProps<Props>()
</script>

<!-- Bad -->
<template>
  <div class="userinfo">...</div>
</template>
```

### 3.2 템플릿 문법
- props는 kebab-case로 전달
- v-for에는 항상 :key 바인딩
- v-if와 v-for는 동시 사용 금지

```vue
<!-- Good -->
<template>
  <user-profile
    :user-name="name"
    :age="age"
  />
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
</template>

<!-- Bad -->
<template>
  <div v-for="item in items" v-if="item.isVisible">
    {{ item.name }}
  </div>
</template>
```

### 3.3 Composition API 규칙
- ref() vs reactive(): 단일 값은 ref, 객체는 reactive 사용
- computed와 watch 적절히 사용
- 생명주기 훅은 on으로 시작

```vue
<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'

// refs
const count = ref(0)

// reactive objects
const user = reactive({
  name: '',
  age: 0
})

// computed
const doubleCount = computed(() => count.value * 2)

// watch
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// lifecycle hooks
onMounted(() => {
  // mounted logic
})
</script>
```

### 3.4 Vuetify 컴포넌트 규칙
- 컴포넌트 prefix는 'v-'로 시작
- 레이아웃 컴포넌트 적절히 활용 (v-container, v-row, v-col)
- 일관된 spacing 시스템 사용

```vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>제목</v-card-title>
          <v-card-text>내용</v-card-text>
          <v-card-actions>
            <v-btn color="primary">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
```

### 3.5 Vuetify 스타일 가이드
- 색상은 theme 시스템 활용
- 반응형 디자인은 Vuetify breakpoints 사용
- spacing 클래스 활용 (ma-4, pa-2 등)

```vue
<template>
  <v-app>
    <!-- 테마 색상 사용 -->
    <v-btn color="primary">Primary Button</v-btn>
    
    <!-- 반응형 디자인 -->
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-card class="ma-2 pa-4">
        콘텐츠
      </v-card>
    </v-col>
  </v-app>
</template>

<script setup lang="ts">
// 테마 커스터마이징
const theme = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
}
</script>
```

## 4. CSS/SCSS 규칙

### 4.1 클래스명
- kebab-case 사용
- BEM 방법론 권장
  - Block__Element--Modifier 구조
  - BEM은 Block, Element, Modifier의 약자로, CSS 클래스 네이밍 방법론입니다.
  - **Block**: 독립적인 컴포넌트 단위 (예: card, menu, button)
  - **Element**: Block의 구성 요소 (예: card__header, menu__item)
  - **Modifier**: Block이나 Element의 상태나 변형 (예: card--active, button--disabled)

```scss
.card {                    // Block
  &__header {              // Element
    &--active { }          // Modifier
  }
  &__body { }              // Element
}
```

### 4.2 스타일 작성
- 속성 선언 순서
  1. Layout (position, display, width, height)
  2. Box Model (margin, padding, border)
  3. Visual (background, color, font)
  4. 기타

```scss
.element {
  // Layout
  position: relative;
  display: flex;
  
  // Box Model
  margin: 10px;
  padding: 15px;
  
  // Visual
  background: #fff;
  color: #000;
}
```

## 5. 파일 구조

### 5.1 원자 디자인 패턴 (Atomic Design Pattern) 기반 구조

```
src/
├── assets/            # 이미지, 폰트 등 정적 파일
├── components/        # 컴포넌트 (원자 디자인 패턴)
│   ├── atoms/        # 원자 레벨 컴포넌트 (버튼, 입력 필드, 라벨 등)
│   ├── molecules/    # 분자 레벨 컴포넌트 (검색 폼, 메뉴 아이템 등)
│   ├── organisms/    # 유기체 레벨 컴포넌트 (헤더, 푸터, 사이드바 등)
│   └── templates/    # 템플릿 레벨 컴포넌트 (페이지 레이아웃)
├── pages/            # 페이지 컴포넌트 (최종 페이지)
├── composables/      # 컴포지션 함수
├── plugins/          # Vue 플러그인 (Vuetify 등)
├── router/           # Vue Router 설정
├── stores/           # Pinia 스토어
├── styles/           # 전역 스타일
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸리티 함수
```

### 5.2 컴포넌트 레벨 설명

#### Atoms (원자)
- 가장 작은 단위의 컴포넌트
- 더 이상 분해할 수 없는 기본 UI 요소들
- **책임 범위**: 
  - 단일 HTML 요소 수준의 스타일링
  - 기본적인 상태 관리 (disabled, active 등)
  - 재사용 가능한 최소 단위
- 예시: Button, Input, Label, Icon

```typescript
// atoms/BaseButton.vue
<template>
  <button class="base-button" :class="variant">
    <slot></slot>
  </button>
</template>
```

#### Molecules (분자)
- 여러 개의 원자를 결합한 단위
- 하나의 단일 책임을 가진 UI 컴포넌트
- **책임 범위**:
  - 2-3개의 원자 컴포넌트를 조합
  - 단일 기능 구현 (검색, 메뉴 아이템 등)
  - 내부 상태 관리 (폼 입력값 등)
- 예시: SearchBar (Input + Button), MenuItem (Icon + Text)

```typescript
// molecules/SearchBar.vue
<template>
  <div class="search-bar">
    <BaseInput v-model="search" placeholder="검색어를 입력하세요" />
    <BaseButton>검색</BaseButton>
  </div>
</template>
```

#### Organisms (유기체)
- 분자와 원자의 조합으로 구성된 복잡한 컴포넌트
- 특정 컨텍스트나 도메인을 가진 UI 섹션
- **책임 범위**:
  - 페이지의 주요 섹션 구성
  - 복잡한 상태 관리
  - API 통신 및 데이터 처리
  - 비즈니스 로직 포함
- 예시: Header, Footer, ProductCard

```typescript
// organisms/Header.vue
<template>
  <header class="header">
    <Logo />
    <Navigation />
    <SearchBar />
    <UserMenu />
  </header>
</template>
```

#### Templates (템플릿)
- 유기체와 분자들을 배치하여 페이지 구조를 형성
- 실제 콘텐츠 대신 와이어프레임 수준의 뼈대 제공
- **책임 범위**:
  - 페이지 레이아웃 정의
  - 그리드 시스템 관리
  - 반응형 디자인 구현
  - 공통 레이아웃 요소 배치
- 예시: DefaultLayout, DashboardLayout

```typescript
// templates/DefaultLayout.vue
<template>
  <div class="default-layout">
    <Header />
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>
```

#### Pages
- 템플릿에 실제 콘텐츠를 채워 넣은 최종 페이지
- 실제 데이터와 상태를 다루는 컨테이너 컴포넌트
- **책임 범위**:
  - 라우팅 처리
  - 페이지 수준의 상태 관리
  - API 호출 및 데이터 페칭
  - 페이지별 비즈니스 로직
- 예시: HomePage, ProductListPage

```typescript
// pages/HomePage.vue
<template>
  <DefaultLayout>
    <HeroBanner :slides="bannerData" />
    <ProductList :products="products" />
    <NewsletterSection />
  </DefaultLayout>
</template>
```

## 6. 작업 환경 설정

### 6.1 패키지 매니저
- npm 사용 (yarn 대신)
- package.json에 버전 명시
- 의존성 추적 관리

### 6.2 Prettier 설정
```json
{
  "semi": true,                // 모든 구문 끝에 세미콜론(;) 추가
  "printWidth": 100,          // 한 줄의 최대 길이를 100자로 제한
  "endOfLine": "auto",        // 운영체제에 따라 자동으로 개행 문자 설정
  "singleQuote": true,        // 문자열에 작은따옴표(') 사용
  "useTabs": false,           // 탭 대신 스페이스 사용
  "tabWidth": 2,             // 들여쓰기 크기를 2칸으로 설정
  "trailingComma": "all",     // 객체/배열의 마지막 항목에도 쉼표 추가 (더 깔끔한 Git diff를 위해)
  "arrowParens": "always",    // 화살표 함수의 매개변수에 항상 괄호 사용
  "bracketSpacing": true,     // 객체 리터럴의 중괄호 주위에 공백 추가
  "vueIndentScriptAndStyle": true,  // Vue 파일의 <script>와 <style> 블록 들여쓰기
  "htmlWhitespaceSensitivity": "css", // CSS display 속성 값에 따라 HTML 요소 공백 처리
  "proseWrap": "preserve",    // 마크다운 파일의 텍스트 줄바꿈을 있는 그대로 유지
  "quoteProps": "as-needed"   // 객체 속성에 따옴표를 필요한 경우에만 추가
}
```

### 6.3 ESLint 설정
```javascript
// eslint.config.js
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
```

### 6.3.1 ESLint 규칙 설정 결정 이유

#### 엄격하게 유지한 규칙들
1. **네이밍 컨벤션 관련 규칙**
   - 컴포넌트, 변수, 타입 등의 네이밍 규칙은 'error'로 유지
   - 이유: 일관된 네이밍은 코드 가독성과 유지보수성에 직접적인 영향을 미침
   - 예: 컴포넌트는 PascalCase, props는 camelCase 등

2. **코드 품질 관련 규칙**
   - `prefer-const`, `no-var` 등은 'error'로 유지
   - 이유: 현대 JavaScript의 모범 사례를 따르고 잠재적 버그 방지

#### 완화한 규칙들
1. **Props 관련 규칙**
   - `require-default-prop`, `require-prop-types`를 'warn'으로 완화
   - 이유: 
     - TypeScript를 사용할 경우 타입 시스템으로 이미 타입 안정성 확보
     - 모든 props에 기본값을 강제하는 것이 때로는 불필요한 코드를 만들 수 있음

2. **Console 관련 규칙**
   - 개발 환경에서는 'off', 운영 환경에서만 'error'로 설정
   - 이유:
     - 개발 중 디버깅은 필수적이며 console.log는 주요 디버깅 도구
     - 운영 환경에서만 제거하여 개발 편의성과 운영 품질 모두 확보

3. **함수 반환 타입**
   - `explicit-function-return-type`을 'warn'으로 설정
   - 이유:
     - TypeScript의 타입 추론이 충분히 정확한 경우가 많음
     - 간단한 함수나 화살표 함수에서 불필요한 타입 선언을 줄여 코드 간결성 확보

이러한 설정은 다음과 같은 이점을 제공합니다:
1. 코드 일관성 유지 (특히 네이밍 규칙)
2. 개발 생산성 향상 (불필요한 제약 완화)
3. 실수 방지 (중요한 규칙은 엄격하게 유지)
4. 디버깅 용이성 (개발 환경에서 console 허용)
5. 운영 환경 품질 보장 (배포 시 엄격한 규칙 적용)

### 6.4 코드 스타일
- **들여쓰기**: space와 tab 혼용 금지
- **문장 종료**: 세미콜론 필수
- **공백 규칙**:
  - 키워드, 연산자와 다른 코드 사이에 공백
  - 시작 괄호 바로 다음과 끝 괄호 바로 이전에는 공백 금지
  - 콤마 다음에는 공백 필수

### 6.5 주석 작성
- 주석은 설명하려는 구문에 맞춰 들여쓰기
- 문장 끝 주석은 한 줄 주석 사용 (공백 추가)
- 여러 줄 주석 작성 시 * 들여쓰기 정렬
- 코드 블록 주석 처리는 한 줄 주석 사용

### 6.6 ESLint & Prettier 설정 방법

#### 필요한 패키지 설치
```bash
# ESLint 관련 패키지 (새로운 Flat Config 시스템)
npm install -D eslint @eslint/js typescript-eslint
npm install -D eslint-plugin-vue @vue/eslint-config-typescript
npm install -D eslint-plugin-import eslint-import-resolver-typescript
npm install -D eslint-config-prettier eslint-plugin-prettier

# Prettier 관련 패키지
npm install -D prettier
```

#### 설정 파일 적용
1. 프로젝트 루트 디렉토리에 `eslint.config.js`와 `.prettierrc` 파일을 생성합니다.
2. `package.json`에 `"type": "module"`을 추가합니다 (ESM 지원을 위해).
3. 각 파일에 제공된 설정을 복사하여 붙여넣습니다.

#### VS Code 추천 확장 프로그램
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Vue Language Features (Volar) (`Vue.volar`)

#### npm 스크립트 추가
`package.json`의 "scripts" 섹션에 다음을 추가합니다:
```json
{
  "scripts": {
    "lint": "eslint --ext .js,.ts,.vue --ignore-path .gitignore .",
    "lint:fix": "eslint --ext .js,.ts,.vue --ignore-path .gitignore . --fix",
    "format": "prettier --write \"**/*.{js,ts,vue,scss,html,md}\""
  }
}
```

#### 사용 방법
- 코드 검사: `npm run lint`
- 코드 자동 수정: `npm run lint:fix`
- 코드 포맷팅: `npm run format`

### 6.7 ESLint & Prettier 강제 적용 가이드

ESLint와 Prettier 설정을 프로젝트에 도입하면 아래와 같이 코딩 컨벤션이 강제됩니다:

#### 1. 실시간 에러/경고 표시
```typescript
// ❌ 에러 발생: 상수는 UPPER_CASE로 작성
const apiKey = 'xxx'  
const API_KEY = 'xxx'  // ✅ 정상

// ❌ 에러 발생: var 대신 const/let 사용
var name = 'John'     
const name = 'John'   // ✅ 정상

// ❌ 에러 발생: 컴포넌트는 PascalCase로 작성
const header = () => <div>...</div>  
const Header = () => <div>...</div>  // ✅ 정상
```

#### 2. 자동 수정 가능한 규칙들
다음 명령어로 자동 수정이 가능합니다:
```bash
npm run lint:fix    # ESLint 규칙 자동 수정
npm run format     # Prettier 포맷팅 자동 수정
```

자동으로 수정되는 항목들:
- 변수/상수 네이밍 (apiKey → API_KEY)
- var → const/let 변환
- 따옴표 통일 (""→ '')
- 들여쓰기 수정
- 불필요한 공백 제거
- 세미콜론 추가/제거
- 후행 쉼표 추가

#### 3. 자동 수정이 불가능한 규칙들
다음과 같은 경우는 수동으로 수정해야 합니다:
```typescript
// 미사용 변수
function badFunction() {
  const unusedVar = 123  // ❌ 에러 표시: 사용되지 않는 변수
}

// 잘못된 컴포넌트 이름
const header = () => <div>...</div>  // ❌ 에러 표시: PascalCase 사용 필요

// 잘못된 import 순서
import axios from 'axios'
import { ref } from 'vue'  // ❌ 에러 표시: Vue import가 먼저 와야 함
```

#### 4. Git Hooks를 통한 자동 검사
`package.json`에 다음 설정을 추가하면 커밋 전 자동 검사가 실행됩니다:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  }
}
```

#### 5. 규칙 예외 처리
특정 코드에서 규칙을 예외적으로 허용해야 하는 경우:
```typescript
// eslint-disable-next-line
const api_key = 'xxx'  // 이 라인만 규칙 무시

/* eslint-disable */
// 이 블록 내 모든 규칙 무시
const some_var = 123
/* eslint-enable */
```

이러한 강제 적용을 통해:
1. 코드 스타일의 일관성 유지
2. 일반적인 실수 방지
3. 팀 컨벤션의 자동 적용
4. 전반적인 코드 품질 향상
5. 코드 리뷰 시간 절약

## 추가 제안사항

### Git Commit Convention
#### 기본 형식
```
type: subject

body

footer
```

#### Commit Type
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드, 리팩토링 테스트 코드 추가
- `chore`: 빌드 업무 수정, 패키지 매니저 수정
- `design`: CSS 등 사용자 UI 디자인 변경

#### Subject 규칙
- 제목은 50자를 넘지 않도록
- 마침표 없이 작성
- 현재시제로 작성
- 명령문으로 작성

#### Body 규칙
- 선택사항
- 무엇을, 왜 변경했는지 설명
- 72자를 넘지 않도록

#### Footer 규칙
- 선택사항
- issue tracker ID 작성
- Breaking Changes 명시

#### 예시
```
feat: 사용자 프로필 이미지 업로드 기능 추가

- 프로필 이미지 업로드 컴포넌트 구현
- 이미지 크기 제한 및 형식 검증 로직 추가
- 업로드 진행 상태 표시 UI 구현

Closes #123
```

```
fix: 로그인 시 세션 만료 오류 수정

- 세션 만료 시간 계산 로직 수정
- 만료 시 자동 로그아웃 처리 추가
- 에러 메시지 개선

Fixes #45
```

```
docs: README.md 업데이트

- 프로젝트 설치 방법 상세 설명 추가
- 환경 변수 설정 가이드 추가
- API 문서 링크 업데이트
```

```
style: 코드 포맷팅 수정

- Prettier 설정에 맞춰 코드 포맷팅
- 불필요한 공백 제거
- import 순서 정렬
```

```
refactor: 사용자 인증 로직 개선

- 인증 관련 코드를 별도 모듈로 분리
- 에러 처리 로직 통합
- 타입 정의 개선

BREAKING CHANGE: 인증 관련 API 응답 형식 변경
```

### 코드 리뷰 체크리스트

#### 자동화 도구로 커버되는 체크 항목
아래 항목들은 ESLint, TypeScript, Vitest 등의 도구로 자동 검사됩니다:

##### 1. 코드 품질
- [ ] 네이밍이 컨벤션을 준수하는가?
  - 자동화 도구: ESLint
  - 관련 규칙: `@typescript-eslint/naming-convention`
  - 설정 방법: ESLint 설정 파일에 규칙 추가

- [ ] 불필요한 console.log가 남아있지 않은가?
  - 자동화 도구: ESLint
  - 관련 규칙: `no-console`
  - 설정 방법: ESLint 설정 파일에 규칙 추가

- [ ] 미사용 변수/import가 없는가?
  - 자동화 도구: ESLint
  - 관련 규칙: `@typescript-eslint/no-unused-vars`
  - 설정 방법: ESLint 설정 파일에 규칙 추가

- [ ] 코드 중복이 없는가?
  - 자동화 도구: ESLint
  - 관련 규칙: `sonarjs/no-duplicate-string`
  - 설정 방법: `eslint-plugin-sonarjs` 설치 및 설정

- [ ] ESLint/Prettier 규칙을 준수하는가?
  - 자동화 도구: ESLint, Prettier
  - 설정 방법: `.eslintrc.js`, `.prettierrc` 파일 설정

- [ ] TypeScript 타입이 적절히 정의되어 있는가?
  - 자동화 도구: TypeScript
  - 설정 방법: `tsconfig.json` 설정

##### 2. 기능
- [ ] 입력값 검증이 충분한가?
  - 자동화 도구: TypeScript
  - 관련 기능: 타입 체크, 유니온 타입, 타입 가드
  - 설정 방법: `tsconfig.json`의 `strict` 옵션 활성화

##### 3. 성능
- [ ] 이벤트 리스너/타이머가 정리되는가?
  - 자동화 도구: ESLint
  - 관련 규칙: `@typescript-eslint/no-misused-promises`
  - 설정 방법: ESLint 설정 파일에 규칙 추가

##### 4. 테스트
- [ ] 테스트 커버리지가 충분한가?
  - 자동화 도구: Vitest
  - 관련 기능: 커버리지 리포트
  - 설정 방법: `vitest.config.ts`에 커버리지 설정 추가

##### 5. 설계
- [ ] props drilling이 과도하지 않은가?
  - 자동화 도구: ESLint
  - 관련 규칙: `vue/no-mutating-props`
  - 설정 방법: ESLint 설정 파일에 규칙 추가

##### 6. 보안
- [ ] 사용자 입력을 검증하는가?
  - 자동화 도구: TypeScript
  - 관련 기능: 타입 체크, 유니온 타입
  - 설정 방법: `tsconfig.json`의 `strict` 옵션 활성화

#### 수동 체크가 필요한 항목
아래 항목들은 자동화 도구로 완전히 커버하기 어렵거나, 추가 도구 설정이 필요한 항목입니다:

##### 1. 코드 품질
- [ ] 주석은 충분하고 명확한가?
  - 자동화 도구: ESLint (기본적인 주석 규칙만 체크)
  - 추가 도구: `eslint-plugin-jsdoc` (JSDoc 주석 체크)

##### 2. 기능
- [ ] 요구사항을 모두 충족하는가?
  - 자동화 도구: 없음 (테스트 코드로 커버 가능)
- [ ] 엣지 케이스를 처리했는가?
  - 자동화 도구: 없음 (테스트 코드로 커버 가능)
- [ ] API 응답 처리가 적절한가?
  - 자동화 도구: 없음
- [ ] 에러 메시지가 사용자 친화적인가?
  - 자동화 도구: 없음

##### 3. 성능
- [ ] Vue DevTools로 불필요한 렌더링을 체크했는가?
  - 자동화 도구: 없음
- [ ] computed/v-memo를 적절히 사용했는가?
  - 자동화 도구: ESLint (기본적인 규칙만 체크)
- [ ] 대용량 데이터의 경우 처리 방법을 적용했는가?
  - 자동화 도구: 없음
- [ ] 이미지/리소스 최적화가 되어 있는가?
  - 자동화 도구: `imagemin`, `webpack-image-loader`
- [ ] 번들 사이즈가 적절한가?
  - 자동화 도구: `webpack-bundle-analyzer`

##### 4. 테스트
- [ ] 브라우저 호환성을 확인했는가?
  - 자동화 도구: `browserstack`, `cypress`
- [ ] 반응형 디자인이 모든 브레이크포인트에서 잘 동작하는가?
  - 자동화 도구: `cypress`, `playwright`
- [ ] 접근성(A11y) 테스트를 수행했는가?
  - 자동화 도구: `@vue-a11y/audit`, `axe-core`

##### 5. 설계
- [ ] 컴포넌트 분리가 적절한가?
  - 자동화 도구: 없음
- [ ] 재사용 가능한 부분을 분리했는가?
  - 자동화 도구: 없음
- [ ] 확장성을 고려한 설계인가?
  - 자동화 도구: 없음
- [ ] 상태 관리가 적절한가?
  - 자동화 도구: 없음

##### 6. 보안
- [ ] API 키 등 민감한 정보가 노출되지 않는가?
  - 자동화 도구: `snyk`, `git-secrets`
- [ ] XSS 등 보안 취약점은 없는가?
  - 자동화 도구: `snyk`, `eslint-plugin-security`
- [ ] CSRF 토큰이 적절히 처리되는가?
  - 자동화 도구: `snyk`
- [ ] 인증/인가 처리가 올바른가?
  - 자동화 도구: `snyk`

#### 추가 자동화 도구 소개

##### 1. 코드 품질 향상
- **SonarQube**
  - 정적 코드 분석 도구
  - 코드 복잡도, 중복, 버그, 보안 취약점 등을 자동으로 검사
  - 설정 방법: `sonarqube-scanner` 설치 및 설정

- **Code Climate**
  - 코드 품질 관리 플랫폼
  - 테스트 커버리지, 코드 복잡도 등을 자동으로 분석
  - 설정 방법: GitHub 연동 및 설정

##### 2. 성능 최적화
- **Lighthouse**
  - 웹 페이지 성능 분석 도구
  - 성능, 접근성, SEO 등을 자동으로 검사
  - 설정 방법: Chrome DevTools 또는 CLI로 실행

- **Webpack Bundle Analyzer**
  - 번들 사이즈 분석 도구
  - 각 모듈의 크기를 시각화하여 분석
  - 설정 방법: `webpack-bundle-analyzer` 설치 및 설정

##### 3. 테스트 자동화
- **Cypress**
  - E2E 테스트 도구
  - 브라우저에서 실제 사용자 시나리오 테스트
  - 설정 방법: `cypress` 설치 및 설정

- **Playwright**
  - 크로스 브라우저 테스트 도구
  - 여러 브라우저에서 동시 테스트 가능
  - 설정 방법: `playwright` 설치 및 설정

##### 4. 보안 검사
- **Snyk**
  - 보안 취약점 스캔 도구
  - 의존성 패키지의 보안 취약점 검사
  - 설정 방법: `snyk` 설치 및 설정

- **ESLint Security Plugin**
  - 보안 관련 ESLint 규칙
  - XSS, SQL Injection 등의 취약점 검사
  - 설정 방법: `eslint-plugin-security` 설치 및 설정

##### 5. 접근성 검사
- **Axe Core**
  - 접근성 검사 도구
  - WCAG 기준에 따른 접근성 검사
  - 설정 방법: `axe-core` 설치 및 설정

- **Vue A11y**
  - Vue 컴포넌트 접근성 검사 도구
  - Vue 컴포넌트의 접근성 이슈 검사
  - 설정 방법: `@vue-a11y/audit` 설치 및 설정

이러한 자동화 도구들을 활용하면:
1. 코드 품질을 자동으로 검사하고 개선할 수 있습니다.
2. 테스트 커버리지를 자동으로 측정하고 관리할 수 있습니다.
3. 보안 취약점을 자동으로 발견하고 수정할 수 있습니다.
4. 성능 이슈를 자동으로 분석하고 최적화할 수 있습니다.
5. 접근성 문제를 자동으로 검사하고 개선할 수 있습니다.

### 7. 프론트엔드 테스트 가이드

#### 7.0 테스트 도구 소개

##### Vue Test Utils
- [Vue Test Utils 공식 문서](https://test-utils.vuejs.org/guide/)
- Vue.js의 공식 테스트 유틸리티 라이브러리
- Vue 컴포넌트를 격리된 환경에서 마운트하고 상호작용할 수 있는 메서드 제공
- Vitest, Cypress, Playwright, WebdriverIO 등 다양한 테스트 러너와 함께 사용 가능
- 컴포넌트의 렌더링, Props, 이벤트, 슬롯 등을 테스트하는 데 최적화

##### Testing Library
- [Testing Library 공식 문서](https://testing-library.com/docs/)
- 사용자 중심 방식으로 UI 컴포넌트를 테스트하는 라이브러리 패밀리
- React, Angular, Vue 등 다양한 프레임워크 지원
- 실제 사용자가 컴포넌트를 사용하는 방식과 유사하게 테스트
- 접근성 기반 셀렉터를 사용하여 더 견고한 테스트 작성 가능
- 구현 세부사항보다는 사용자 관점에서의 테스트에 중점

#### 7.1 테스트 환경 설정
```bash
# Vitest 설치
npm install -D vitest @vue/test-utils happy-dom @testing-library/vue @testing-library/jest-dom

# package.json에 스크립트 추가
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

#### 7.2 테스트 작성 가이드

##### 컴포넌트 테스트
```typescript
// UserProfile.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UserProfile from './UserProfile.vue'

describe('UserProfile 컴포넌트', () => {
  it('사용자 정보를 올바르게 렌더링한다', () => {
    const wrapper = mount(UserProfile, {
      props: {
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      }
    })
    
    expect(wrapper.find('.user-name').text()).toBe('John Doe')
    expect(wrapper.find('.user-email').text()).toBe('john@example.com')
  })

  it('프로필 이미지가 없을 때 기본 아바타를 표시한다', () => {
    const wrapper = mount(UserProfile, {
      props: {
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      }
    })
    
    expect(wrapper.find('.default-avatar').exists()).toBe(true)
  })

  it('사용자 정보 수정 버튼 클릭 시 이벤트를 발생시킨다', async () => {
    const wrapper = mount(UserProfile, {
      props: {
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      }
    })

    await wrapper.find('.edit-button').trigger('click')
    expect(wrapper.emitted('edit')).toBeTruthy()
  })
})
```

##### 상태 관리 테스트
```typescript
// userStore.test.ts
import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from './userStore'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('사용자 로그인 상태를 올바르게 관리한다', async () => {
    const store = useUserStore()
    
    await store.login('john@example.com', 'password')
    expect(store.isLoggedIn).toBe(true)
    expect(store.user).toBeDefined()
  })

  it('로그인 실패 시 에러를 처리한다', async () => {
    const store = useUserStore()
    
    await expect(store.login('wrong@email.com', 'wrong'))
      .rejects.toThrow('Invalid credentials')
    expect(store.isLoggedIn).toBe(false)
  })

  it('로그아웃 시 상태를 초기화한다', () => {
    const store = useUserStore()
    store.user = { id: 1, name: 'John' }
    store.isLoggedIn = true

    store.logout()
    expect(store.user).toBeNull()
    expect(store.isLoggedIn).toBe(false)
  })
})
```

##### API 통합 테스트
```typescript
// userApi.test.ts
import { describe, it, expect, vi } from 'vitest'
import { fetchUser, updateUser } from './userApi'

describe('User API', () => {
  it('사용자 정보를 성공적으로 가져온다', async () => {
    const mockUser = { id: 1, name: 'John' }
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUser
    })

    const user = await fetchUser(1)
    expect(user).toEqual(mockUser)
  })

  it('사용자 정보 업데이트가 성공적으로 이루어진다', async () => {
    const updatedData = { name: 'John Updated' }
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ...updatedData, id: 1 })
    })

    const result = await updateUser(1, updatedData)
    expect(result.name).toBe('John Updated')
  })

  it('네트워크 오류 시 적절히 처리한다', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
    
    await expect(fetchUser(1))
      .rejects.toThrow('Network error')
  })
})
```

##### 사용자 인터랙션 테스트
```typescript
// LoginForm.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LoginForm from './LoginForm.vue'

describe('LoginForm 컴포넌트', () => {
  it('폼 제출 시 이메일과 비밀번호를 전달한다', async () => {
    const wrapper = mount(LoginForm)
    
    await wrapper.find('[data-test="email"]').setValue('john@example.com')
    await wrapper.find('[data-test="password"]').setValue('password')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.emitted('submit')[0]).toEqual([
      {
        email: 'john@example.com',
        password: 'password'
      }
    ])
  })

  it('유효하지 않은 이메일 형식 시 에러를 표시한다', async () => {
    const wrapper = mount(LoginForm)
    
    await wrapper.find('[data-test="email"]').setValue('invalid-email')
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('.error-message').text())
      .toBe('올바른 이메일 형식이 아닙니다')
  })

  it('비밀번호 입력 시 마스킹 처리된다', async () => {
    const wrapper = mount(LoginForm)
    const passwordInput = wrapper.find('[data-test="password"]')
    
    await passwordInput.setValue('password123')
    expect(passwordInput.element.type).toBe('password')
  })
})
```

#### 7.3 테스트 작성 원칙

1. **테스트는 독립적이어야 함**
   - 각 테스트는 다른 테스트에 영향을 주지 않아야 함
   - beforeEach/afterEach를 활용하여 테스트 환경 초기화

2. **의도가 명확해야 함**
   - 테스트 이름은 무엇을 테스트하는지 명확히 표현
   - AAA (Arrange-Act-Assert) 패턴 사용
   - 한 테스트에는 하나의 관심사만 테스트

3. **실제 사용 시나리오를 반영**
   - 실제 사용자가 경험할 수 있는 시나리오를 테스트
   - 엣지 케이스도 고려
   - 사용자 관점에서의 테스트 작성

4. **테스트 커버리지**
   - 핵심 비즈니스 로직은 80% 이상 커버리지 목표
   - UI 컴포넌트는 주요 기능 위주로 테스트
   - 테스트하지 않을 코드는 명시적으로 표시

5. **성능 고려**
   - 테스트 실행 시간이 너무 길지 않도록
   - 불필요한 API 호출이나 렌더링 최소화
   - Mock 데이터 활용

6. **유지보수성**
   - 테스트 코드도 프로덕션 코드처럼 관리
   - 중복 코드 제거
   - 테스트 헬퍼 함수 활용
   - 명확한 주석 작성

#### 7.4 테스트 실행

```bash
# 모든 테스트 실행
npm run test

# 특정 파일만 테스트
npm run test src/components/__tests__/UserProfile.test.ts

# 커버리지 리포트 생성
npm run test:coverage

# UI 모드로 테스트 실행 (Vitest)
npm run test:ui
```

#### 7.5 테스트 자동화

##### Git Hooks 설정
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test",
      "pre-push": "npm run test:coverage"
    }
  }
}
```

##### CI/CD 파이프라인
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run test
      - run: npm run test:coverage
```

### 참고 자료

이 문서는 아래의 자료들을 참고하여 작성되었습니다:

1. [Frontend Fundamentals](https://frontend-fundamentals.com/)
   - 변경하기 쉬운 프론트엔드 코드를 위한 지침서
   - 코드 리뷰와 코드 개선 사례를 다룸

2. [내가 쓰는 프론트엔드 코딩 컨벤션과 네이밍 컨벤션 폴더구조](https://xionwcfm.tistory.com/459)
   - 실무에서 사용되는 프론트엔드 코딩 컨벤션
   - 네이밍 규칙과 폴더 구조에 대한 상세한 가이드

3. [프론트엔드 코딩 컨벤션](https://chaechae.life/blog/frontend-coding-conventions)
   - 프론트엔드 개발을 위한 코딩 컨벤션
   - 코드 스타일과 구조에 대한 가이드

4. [팀바팀 프론트엔드 코드 컨벤션](https://velog.io/@hafnium1923/%ED%8C%80%EB%B0%94%ED%8C%80-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)
   - 팀 단위 개발을 위한 프론트엔드 코드 컨벤션
   - 협업을 위한 코드 스타일 가이드

이 문서는 위의 자료들을 참고하여 작성되었으며, Vue.js와 Vuetify를 사용하는 프로젝트에 특화된 내용을 추가하여 구성되었습니다.

