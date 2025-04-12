# Python 코드 컨벤션 가이드

## 목차
1. [PEP 8 기본 가이드라인](#pep-8-기본-가이드라인)
2. [Django 스타일 가이드](#django-스타일-가이드)
3. [Flask 스타일 가이드](#flask-스타일-가이드)
4. [FastAPI 스타일 가이드](#fastapi-스타일-가이드)
5. [공통적인 모범 사례](#공통적인-모범-사례)

## 1. 명명 규칙 (Naming Conventions)

### 1.1 기본 원칙
- 모든 이름은 영문 사용
- 축약어 사용은 최소화하고 직관적인 이름 사용
- 이름으로 의도와 목적을 파악할 수 있도록 작성
- 예약어 사용 금지 (예: class, def, import, from, as, with, async, await)

### 1.2 Python 기본 명명 규칙

| 종류 | 설명 | 예시 | 사용처 | 상세 규칙 |
| :---- | :---- | :---- | :---- | :---- |
| **snake_case** | 소문자 사용, 띄어쓰기를 **_**(언더스코어)로 구분 | hello_world | 변수, 함수, 메서드, 모듈, 패키지 | 변수: `user_name = 'John'`<br>함수: `def get_user_data():`<br>메서드: `def calculate_total():` |
| **PascalCase** | 첫글자와 띄어쓰기를 **대문자**로 구분 | HelloWorld | 클래스, 타입 | 클래스: `class UserProfile:`<br>타입: `class UserType(Enum):` |
| **UPPER_CASE** | 대문자만 사용, 띄어쓰기를 **_**(언더스코어)로 구분 | HELLO_WORLD | 상수, 클래스 상수 | `MAX_COUNT = 100`<br>`API_KEY = 'xxx'` |
| **_single_leading_underscore** | 단일 언더스코어로 시작 | _internal_var | 내부 사용 변수/메서드 | `_internal_method()` |
| **__double_leading_underscore** | 이중 언더스코어로 시작 | __private_var | 클래스 내부에서만 사용 | `__private_method()` |
| **__double_leading_and_trailing_underscore__** | 이중 언더스코어로 시작과 끝 | __init__ | 매직 메서드 | `__init__`, `__str__`, `__repr__` |

### 1.3 명확한 네이밍을 위한 규칙
- 의미있는 이름 사용
- 배열/리스트는 복수형, 단일 데이터는 단수형 사용
- 불리언 변수는 is, has, can 등의 접두사 사용
- 지나친 줄임말 사용 금지
- 동사로 시작하는 함수/메서드 이름 사용
- 명사로 시작하는 클래스 이름 사용

## PEP 8 기본 가이드라인

### 들여쓰기
- 4개의 공백을 사용합니다.
- 탭 대신 공백을 사용합니다.

### 최대 줄 길이
- 모든 줄은 최대 79자로 제한합니다.
- 문서화 문자열이나 주석은 72자로 제한합니다.

### 빈 줄
- 최상위 함수와 클래스 정의는 두 줄의 빈 줄로 구분합니다.
- 클래스 내의 메서드 정의는 한 줄의 빈 줄로 구분합니다.

### 임포트
- 임포트는 다음과 같은 순서로 그룹화합니다:
  1. 표준 라이브러리
  2. 관련 서드파티 라이브러리
  3. 로컬 애플리케이션/라이브러리 특정 임포트
- 각 그룹은 빈 줄로 구분합니다.

### 공백
- 괄호, 대괄호, 중괄호 안에는 공백을 넣지 않습니다.
- 쉼표, 세미콜론, 콜론 앞에는 공백을 넣지 않습니다.
- 이진 연산자 주변에는 한 칸의 공백을 넣습니다.

## Django 스타일 가이드

### 명명 규칙

| 종류 | 설명 | 예시 | 사용처 | 상세 규칙 |
| :---- | :---- | :---- | :---- | :---- |
| **snake_case** | 소문자 사용, 띄어쓰기를 **_**(언더스코어)로 구분 | user_profile | 모델 필드, URL 패턴, 뷰 함수 | 필드: `first_name = models.CharField()`<br>URL: `user-profile/`<br>뷰: `def user_profile_view():` |
| **PascalCase** | 첫글자와 띄어쓰기를 **대문자**로 구분 | UserProfile | 모델 클래스, 폼 클래스, 뷰 클래스 | 모델: `class UserProfile(models.Model):`<br>폼: `class UserProfileForm(forms.Form):`<br>뷰: `class UserProfileView(View):` |
| **camelCase** | 첫글자는 소문자, 띄어쓰기는 대문자 | userProfile | JavaScript 변수/함수 | `const userProfile = {}` |

### 프로젝트 구조
```
project_name/
    ├── manage.py
    ├── project_name/
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   ├── asgi.py
    │   └── wsgi.py
    ├── apps/
    │   ├── __init__.py
    │   └── app_name/
    │       ├── __init__.py
    │       ├── admin.py
    │       ├── apps.py
    │       ├── models.py
    │       ├── views.py
    │       ├── urls.py
    │       ├── forms.py
    │       ├── tests/
    │       │   ├── __init__.py
    │       │   ├── test_models.py
    │       │   └── test_views.py
    │       ├── templates/
    │       │   └── app_name/
    │       │       └── template_name.html
    │       └── static/
    │           └── app_name/
    │               ├── css/
    │               ├── js/
    │               └── images/
    ├── static/
    │   ├── css/
    │   ├── js/
    │   └── images/
    ├── templates/
    │   └── base.html
    ├── media/
    ├── requirements/
    │   ├── base.txt
    │   ├── development.txt
    │   └── production.txt
    ├── .env
    ├── .gitignore
    └── README.md
```

### 주요 디렉토리 설명
- `project_name/`: 프로젝트의 메인 설정 디렉토리
- `apps/`: 애플리케이션들을 모아두는 디렉토리
- `static/`: 프로젝트 전체에서 사용하는 정적 파일
- `templates/`: 프로젝트 전체에서 사용하는 템플릿
- `media/`: 사용자가 업로드한 파일 저장
- `requirements/`: 환경별 의존성 파일

### Django 프로젝트 구조 특징
1. **앱 중심의 구조**
   - 각 기능을 독립적인 앱으로 분리하여 관리
   - 앱은 재사용 가능한 단위로 설계
   - 앱별로 모델, 뷰, 템플릿, 정적 파일을 포함

2. **정적 파일과 템플릿 관리**
   - 프로젝트 레벨과 앱 레벨의 정적 파일 분리
   - 템플릿 상속을 통한 일관된 UI 관리
   - collectstatic을 통한 정적 파일 배포 최적화

3. **환경별 requirements 파일 관리**
   - base.txt: 공통 의존성
   - development.txt: 개발 환경용 추가 의존성
   - production.txt: 프로덕션 환경용 추가 의존성

### Django 추가 특징 및 권장사항
1. **MVT 패턴 준수**
   - Model: 데이터베이스 스키마와 비즈니스 로직
   - View: 요청 처리와 응답 생성
   - Template: 프레젠테이션 레이어

2. **모델 설계**
   - 모델 클래스는 단수형으로 명명
   - 필드 이름은 소문자와 언더스코어 사용
   - Meta 클래스를 통한 모델 메타데이터 정의
   - 적절한 필드 타입과 옵션 사용

3. **뷰 설계**
   - 클래스형 뷰(CBV) 권장
   - 믹스인을 통한 코드 재사용
   - 적절한 HTTP 메서드 사용
   - 권한 체크와 데코레이터 활용

4. **URL 설계**
   - URL 패턴은 명확하고 RESTful하게 구성
   - URL 네임스페이스 활용
   - URL 파라미터 타입 지정
   - URL 역방향 해석(reverse) 사용

## Flask 스타일 가이드

### 명명 규칙

| 종류 | 설명 | 예시 | 사용처 | 상세 규칙 |
| :---- | :---- | :---- | :---- | :---- |
| **snake_case** | 소문자 사용, 띄어쓰기를 **_**(언더스코어)로 구분 | user_profile | 뷰 함수, 변수, 모듈 | 뷰: `def user_profile():`<br>변수: `user_data = {}` |
| **PascalCase** | 첫글자와 띄어쓰기를 **대문자**로 구분 | UserProfile | 클래스, 블루프린트 | 클래스: `class UserProfile:`<br>블루프린트: `user_bp = Blueprint('user', __name__)` |
| **lowercase** | 소문자만 사용 | userprofile | URL 엔드포인트 | `@app.route('/userprofile')` |

### 프로젝트 구조
```
project_name/
    ├── app/
    │   ├── __init__.py
    │   ├── models.py
    │   ├── views.py
    │   ├── forms.py
    │   ├── extensions.py
    │   ├── config.py
    │   ├── static/
    │   │   ├── css/
    │   │   ├── js/
    │   │   └── images/
    │   ├── templates/
    │   │   └── base.html
    │   └── blueprints/
    │       ├── __init__.py
    │       ├── auth/
    │       │   ├── __init__.py
    │       │   ├── views.py
    │       │   └── forms.py
    │       └── main/
    │           ├── __init__.py
    │           └── views.py
    ├── migrations/
    ├── tests/
    │   ├── __init__.py
    │   ├── test_models.py
    │   └── test_views.py
    ├── instance/
    ├── venv/
    ├── .env
    ├── .gitignore
    ├── config.py
    ├── requirements.txt
    └── run.py
```

### 주요 디렉토리 설명
- `app/`: 애플리케이션의 메인 코드
- `blueprints/`: 기능별로 분리된 블루프린트
- `migrations/`: 데이터베이스 마이그레이션 파일
- `tests/`: 테스트 코드
- `instance/`: 인스턴스별 설정 파일
- `venv/`: 가상 환경

### Flask 프로젝트 구조 특징
1. **블루프린트 기반 구조**
   - 기능별로 블루프린트를 분리하여 관리
   - 각 블루프린트는 독립적인 URL 접두사와 템플릿 폴더를 가짐
   - 애플리케이션의 확장성과 유지보수성 향상

2. **애플리케이션 팩토리 패턴**
   - create_app() 함수를 통한 애플리케이션 인스턴스 생성
   - 확장(Extension)의 지연 초기화 지원
   - 테스트와 배포 환경에서의 유연한 설정 관리

3. **인스턴스별 설정 관리**
   - instance 폴더를 통한 환경별 설정 분리
   - .env 파일을 통한 환경 변수 관리
   - 보안 관련 설정의 안전한 관리

### Flask 추가 특징 및 권장사항
1. **블루프린트 활용**
   - 기능별로 블루프린트 분리
   - URL 접두사와 템플릿 폴더 지정
   - 확장 가능한 구조 설계

2. **라우트 설계**
   - 라우트 데코레이터 사용
   - HTTP 메서드 명시
   - URL 파라미터 타입 지정
   - 에러 핸들링 구현

3. **설정 관리**
   - config.py에 설정 집중
   - 환경별 설정 분리
   - 보안 관련 설정 관리
   - 확장 설정 통합

4. **템플릿 설계**
   - 템플릿 상속 활용
   - 매크로 사용
   - 필터와 테스트 활용
   - 정적 파일 관리

## FastAPI 스타일 가이드

### 명명 규칙

| 종류 | 설명 | 예시 | 사용처 | 상세 규칙 |
| :---- | :---- | :---- | :---- | :---- |
| **snake_case** | 소문자 사용, 띄어쓰기를 **_**(언더스코어)로 구분 | user_profile | 경로 함수, 변수, 모델 필드 | 경로: `def get_user_profile():`<br>변수: `user_data = {}` |
| **PascalCase** | 첫글자와 띄어쓰기를 **대문자**로 구분 | UserProfile | Pydantic 모델, 클래스 | 모델: `class UserProfile(BaseModel):`<br>클래스: `class UserService:` |
| **camelCase** | 첫글자는 소문자, 띄어쓰기는 대문자 | userProfile | JSON 필드 | `{"userProfile": {...}}` |

### 프로젝트 구조
```
project_name/
    ├── app/
    │   ├── __init__.py
    │   ├── main.py
    │   ├── config.py
    │   ├── models/
    │   │   ├── __init__.py
    │   │   └── user.py
    │   ├── schemas/
    │   │   ├── __init__.py
    │   │   └── user.py
    │   ├── api/
    │   │   ├── __init__.py
    │   │   ├── v1/
    │   │   │   ├── __init__.py
    │   │   │   ├── endpoints/
    │   │   │   │   ├── __init__.py
    │   │   │   │   └── users.py
    │   │   │   └── api.py
    │   │   └── deps.py
    │   ├── core/
    │   │   ├── __init__.py
    │   │   ├── config.py
    │   │   └── security.py
    │   ├── db/
    │   │   ├── __init__.py
    │   │   └── session.py
    │   └── utils/
    │       ├── __init__.py
    │       └── security.py
    ├── tests/
    │   ├── __init__.py
    │   ├── api/
    │   │   ├── __init__.py
    │   │   └── v1/
    │   │       ├── __init__.py
    │   │       └── test_users.py
    │   └── conftest.py
    ├── alembic/
    │   ├── versions/
    │   └── env.py
    ├── .env
    ├── .gitignore
    ├── alembic.ini
    ├── requirements.txt
    └── README.md
```

### 주요 디렉토리 설명
- `app/`: 애플리케이션의 메인 코드
- `models/`: SQLAlchemy 모델
- `schemas/`: Pydantic 모델
- `api/`: API 엔드포인트
- `core/`: 핵심 설정과 유틸리티
- `db/`: 데이터베이스 관련 코드
- `tests/`: 테스트 코드
- `alembic/`: 데이터베이스 마이그레이션

### FastAPI 프로젝트 구조 특징
1. **API 버전 관리**
   - v1, v2 등의 버전별 API 엔드포인트 분리
   - 각 버전별 독립적인 라우터와 의존성 관리
   - 하위 호환성 유지를 위한 체계적인 버전 관리

2. **모델과 스키마 분리**
   - SQLAlchemy 모델: 데이터베이스 스키마 정의
   - Pydantic 모델: API 요청/응답 스키마 정의
   - 관심사의 분리를 통한 유지보수성 향상

3. **의존성 주입 구조**
   - deps.py를 통한 의존성 함수 중앙 관리
   - 재사용 가능한 의존성 컴포넌트
   - 테스트 용이성을 위한 의존성 분리

### FastAPI 추가 특징 및 권장사항
1. **Pydantic 모델 활용**
   - 요청/응답 스키마 정의
   - 데이터 검증
   - 중첩 모델 사용
   - 커스텀 유효성 검사기 구현

2. **타입 힌트**
   - 모든 함수에 타입 힌트 사용
   - 제네릭 타입 활용
   - 커스텀 타입 정의
   - Optional과 Union 타입 활용

3. **비동기 프로그래밍**
   - 비동기 함수 사용 권장
   - 동기 함수는 별도 스레드에서 실행
   - 비동기 컨텍스트 매니저 사용
   - 적절한 예외 처리

4. **API 문서화**
   - OpenAPI 자동 생성
   - 경로 작업 함수에 독스트링 작성
   - 응답 모델 명시
   - 예제 값 제공

## 공통적인 모범 사례

### 문서화
- 모든 공개 모듈, 함수, 클래스, 메서드에 독스트링을 작성합니다.
- 독스트링은 Google 스타일을 따릅니다.

### 테스트
- 테스트 파일은 `test_` 접두사를 사용합니다.
- 테스트 클래스는 `Test` 접미사를 사용합니다.
- 테스트 메서드는 `test_` 접두사를 사용합니다.

### 예외 처리
- 구체적인 예외를 잡습니다.
- 예외 메시지는 명확하고 유용한 정보를 제공합니다.

### 로깅
- 적절한 로그 레벨을 사용합니다.
- 로그 메시지는 문맥을 포함합니다.

### 보안
- 민감한 정보는 환경 변수로 관리합니다.
- 입력 데이터는 항상 검증합니다.

## Python 테스트 작성 가이드라인

### 1. pytest 기본 사용법

#### 1.1 테스트 파일 구조
```python
# test_example.py
import pytest

def test_addition():
    assert 1 + 1 == 2

def test_subtraction():
    assert 3 - 1 == 2

class TestCalculator:
    def test_multiplication(self):
        assert 2 * 3 == 6
    
    def test_division(self):
        assert 6 / 2 == 3
```

#### 1.2 테스트 실행 방법
```bash
# 모든 테스트 실행
pytest

# 특정 파일의 테스트 실행
pytest tests/test_example.py

# 특정 클래스의 테스트 실행
pytest tests/test_example.py::TestCalculator

# 특정 메서드의 테스트 실행
pytest tests/test_example.py::TestCalculator::test_multiplication

# 테스트 커버리지 리포트 생성
pytest --cov=. --cov-report=html
```

#### 1.3 테스트 데코레이터
```python
import pytest

@pytest.mark.parametrize("input,expected", [
    (1, 2),
    (2, 3),
    (3, 4)
])
def test_increment(input, expected):
    assert input + 1 == expected

@pytest.mark.skip(reason="아직 구현되지 않음")
def test_unimplemented():
    assert False

@pytest.mark.xfail
def test_expected_failure():
    assert False
```

### 2. 프레임워크별 테스트 방법

#### 2.1 Django 테스트
```python
# tests/test_views.py
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from myapp.models import Post

class PostViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.post = Post.objects.create(
            title='Test Post',
            content='Test Content',
            author=self.user
        )

    def test_post_list_view(self):
        response = self.client.get(reverse('post-list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test Post')

    def test_post_detail_view(self):
        response = self.client.get(
            reverse('post-detail', kwargs={'pk': self.post.pk})
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test Content')
```

#### 2.2 Flask 테스트
```python
# tests/test_app.py
import pytest
from myapp import create_app, db
from myapp.models import User

@pytest.fixture
def app():
    app = create_app('testing')
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_index_page(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Welcome' in response.data

def test_user_creation(app, client):
    with app.app_context():
        user = User(username='testuser', email='test@example.com')
        db.session.add(user)
        db.session.commit()
        assert User.query.count() == 1
```

#### 2.3 FastAPI 테스트
```python
# tests/test_api.py
from fastapi.testclient import TestClient
from myapp.main import app
from myapp.models import Item

client = TestClient(app)

def test_read_item():
    response = client.get("/items/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "name": "Test Item",
        "description": "Test Description"
    }

def test_create_item():
    response = client.post(
        "/items/",
        json={"name": "New Item", "description": "New Description"}
    )
    assert response.status_code == 201
    assert response.json()["name"] == "New Item"
```

### 3. 테스트 모범 사례

#### 3.1 테스트 구조
- 테스트는 독립적이어야 함
- 각 테스트는 하나의 기능만 테스트
- 테스트 이름은 명확하고 설명적이어야 함
- 테스트는 예상되는 결과를 명시해야 함

#### 3.2 테스트 데이터 관리
```python
# conftest.py
import pytest
from myapp.models import User

@pytest.fixture
def test_user():
    return User(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )

@pytest.fixture
def test_post(test_user):
    return Post(
        title='Test Post',
        content='Test Content',
        author=test_user
    )
```

#### 3.3 테스트 커버리지
```bash
# 커버리지 리포트 생성
pytest --cov=. --cov-report=html

# 특정 모듈만 커버리지 측정
pytest --cov=myapp --cov-report=html

# 커버리지 임계값 설정
pytest --cov=. --cov-report=term-missing --cov-fail-under=80
```

#### 3.4 테스트 데이터베이스
```python
# pytest.ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = --cov=. --cov-report=term-missing
```

### 4. 테스트 유형

#### 4.1 단위 테스트
```python
def test_calculate_total():
    items = [
        {'price': 1000, 'quantity': 2},
        {'price': 2000, 'quantity': 1}
    ]
    total = calculate_total(items)
    assert total == 4000
```

#### 4.2 통합 테스트
```python
def test_order_creation():
    # 사용자 생성
    user = create_user()
    # 상품 생성
    product = create_product()
    # 주문 생성
    order = create_order(user, product)
    # 주문 확인
    assert order.user == user
    assert order.product == product
```

#### 4.3 API 테스트
```python
def test_api_endpoint():
    response = client.get("/api/v1/users/1")
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"
```

### 5. 테스트 디버깅

#### 5.1 테스트 실패 시 디버깅
```python
def test_complex_calculation():
    result = complex_calculation()
    # 실패 시 중간값 확인
    print(f"Intermediate value: {result}")
    assert result == expected_value
```

#### 5.2 pytest 디버깅 옵션
```bash
# 실패한 테스트만 실행
pytest --lf

# 실패한 테스트부터 실행
pytest --ff

# 상세한 출력
pytest -v

# 디버깅 모드
pytest --pdb
```

## Git 커밋 컨벤션

### 1. 기본 형식
```
type: subject

body

footer
```

### 2. 커밋 타입
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드, 리팩토링 테스트 코드 추가
- `chore`: 빌드 업무 수정, 패키지 매니저 수정
- `ci`: CI 설정 파일 수정
- `perf`: 성능 개선
- `build`: 빌드 시스템 또는 외부 의존성 변경

### 3. Subject 규칙
- 제목은 50자를 넘지 않도록
- 마침표 없이 작성
- 현재시제로 작성
- 명령문으로 작성

### 4. Body 규칙
- 선택사항
- 무엇을, 왜 변경했는지 설명
- 72자를 넘지 않도록

### 5. Footer 규칙
- 선택사항
- issue tracker ID 작성
- Breaking Changes 명시

### 6. 예시

#### 기능 추가
```
feat: 사용자 인증 API 구현

- JWT 기반 인증 시스템 구현
- 로그인/회원가입 엔드포인트 추가
- 토큰 갱신 기능 구현

Closes #123
```

#### 버그 수정
```
fix: 데이터베이스 연결 오류 해결

- 연결 풀 타임아웃 설정 수정
- 재연결 로직 개선
- 에러 로깅 추가

Fixes #45
```

#### 문서 수정
```
docs: API 문서 업데이트

- Swagger 문서 보완
- 엔드포인트 설명 추가
- 예제 코드 업데이트
```

#### 코드 스타일
```
style: PEP 8 준수 포맷팅

- black으로 코드 포맷팅
- isort로 import 정렬
- flake8 규칙 준수
```

#### 리팩토링
```
refactor: 모델 계층 개선

- 데이터베이스 모델 리팩토링
- 쿼리 최적화
- 타입 힌트 추가

BREAKING CHANGE: 모델 필드명 변경
```

#### 테스트
```
test: 사용자 API 테스트 추가

- 로그인 테스트 케이스 추가
- 회원가입 테스트 케이스 추가
- 토큰 검증 테스트 추가
```

#### CI/CD
```
ci: GitHub Actions 워크플로우 추가

- 테스트 자동화 설정
- 코드 품질 검사 추가
- 보안 검사 통합
```

#### 의존성 관리
```
chore: 의존성 패키지 업데이트

- Django 4.2로 업그레이드
- 보안 패치 적용
- 불필요한 패키지 제거
```

### 7. 브랜치 전략
- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `bugfix/*`: 버그 수정 브랜치
- `hotfix/*`: 긴급 수정 브랜치
- `release/*`: 릴리스 준비 브랜치

### 8. PR 템플릿
```markdown
## 변경 사항
- [ ] 기능 추가
- [ ] 버그 수정
- [ ] 문서 수정
- [ ] 코드 스타일
- [ ] 리팩토링
- [ ] 테스트
- [ ] 기타

## 설명
<!-- 변경 사항에 대한 상세 설명 -->

## 테스트
- [ ] 테스트 코드 작성/수정
- [ ] 기존 테스트 통과 확인

## 관련 이슈
<!-- 연결된 이슈 번호 -->

## 체크리스트
- [ ] 코드 리뷰 요청
- [ ] CI 테스트 통과
- [ ] 문서 업데이트
```

## 참고 자료

이 문서는 아래의 자료들을 참고하여 작성되었습니다:

1. [PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)
   - Python 코드 스타일 가이드의 공식 문서
   - 코드 포맷팅, 명명 규칙, 문서화 등에 대한 상세한 가이드라인

2. [Django Documentation](https://docs.djangoproject.com/)
   - Django 프레임워크의 공식 문서
   - Django 프로젝트 구조와 코딩 컨벤션에 대한 가이드

3. [Flask Documentation](https://flask.palletsprojects.com/)
   - Flask 프레임워크의 공식 문서
   - Flask 애플리케이션 구조와 모범 사례

4. [FastAPI Documentation](https://fastapi.tiangolo.com/)
   - FastAPI 프레임워크의 공식 문서
   - API 설계와 비동기 프로그래밍에 대한 가이드

5. [Python Testing with pytest](https://pytest.org/)
   - pytest 공식 문서
   - Python 테스트 작성과 실행에 대한 상세한 가이드

6. [Real Python](https://realpython.com/)
   - Python 개발을 위한 실용적인 튜토리얼과 가이드
   - 다양한 Python 패턴과 모범 사례를 다룸

7. [Python Packaging User Guide](https://packaging.python.org/)
   - Python 패키징과 배포에 대한 공식 가이드
   - 프로젝트 구조와 의존성 관리에 대한 가이드라인

8. [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
   - Google의 Python 스타일 가이드
   - 대규모 프로젝트를 위한 코딩 컨벤션과 모범 사례

이 문서는 위의 자료들을 참고하여 작성되었으며, Django, Flask, FastAPI 프레임워크를 사용하는 프로젝트에 특화된 내용을 추가하여 구성되었습니다.
