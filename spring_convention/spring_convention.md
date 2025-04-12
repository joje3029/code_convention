# Spring Boot 프로젝트 코드 컨벤션

## 목차
- [1. 기본 규칙](#1-기본-규칙)
- [2. 명명 규칙](#2-명명-규칙)
- [3. 패키지 구조](#3-패키지-구조)
- [4. 보안](#4-보안)
- [5. 성능](#5-성능)
- [6. 코드 스타일](#6-코드-스타일)
- [7. Spring Boot 특화 규칙](#7-spring-boot-특화-규칙)
- [8. 테스트 코드](#8-테스트-코드)
- [9. 예외 처리](#9-예외-처리)
- [10. 로깅](#10-로깅)
- [11. 문서화](#11-문서화)
- [12. 코드 품질 관리](#12-코드-품질-관리)
- [13. 빌드 도구 설정](#13-빌드-도구-설정)
- [14. 의존성 관리](#14-의존성-관리)
- [15. 배포 전략](#15-배포-전략)
- [16. 모니터링](#16-모니터링)
- [17. 국제화(i18n)](#17-국제화i18n)
- [18. 파일 구조](#18-파일-구조)
- [19. 선언 규칙](#19-선언-규칙)
- [20. 소스 파일 구조](#20-소스-파일-구조)
- [21. 형식화 (Formatting)](#21-형식화-formatting)
- [22. 프로그래밍 관행](#22-프로그래밍-관행)
- [23. 코드 리뷰 프로세스](#23-코드-리뷰-프로세스)
- [24. 성능 최적화 가이드라인](#24-성능-최적화-가이드라인)
- [25. 보안 가이드라인](#25-보안-가이드라인)
- [26. Git 관리](#26-git-관리)

## 1. 기본 규칙

### 1.1 파일 인코딩
- 모든 소스 파일은 UTF-8 인코딩을 사용합니다.
- 새줄 문자는 LF(Line Feed)를 사용합니다.
- 파일의 마지막에는 새줄 문자를 포함합니다.

### 1.2 들여쓰기
- 들여쓰기는 4개의 스페이스를 사용합니다.
- 탭 문자는 사용하지 않습니다.

### 1.3 줄 길이
- 한 줄의 최대 길이는 120자로 제한합니다.
- 120자를 초과하는 경우 적절한 위치에서 줄바꿈을 합니다.

## 2. 명명 규칙

### 2.1 기본 원칙
- 모든 이름은 영문 사용
- 축약어 사용은 최소화하고 직관적인 이름 사용
- 이름으로 의도와 목적을 파악할 수 있도록 작성
- 예약어 사용 금지 (예: class, enum, extends, super, const, export, import)
- 의미있는 이름 사용
- 지나친 줄임말 사용 금지

### 2.2 네이밍 종류와 사용처

| 종류 | 설명 | 예시 | 사용처 | 상세 규칙 |
| :---- | :---- | :---- | :---- | :---- |
| **lowerCamelCase** | 소문자 사용, 띄어쓰기를 **대문자**로 구분 | helloWorld | 메서드, 변수, 파라미터 | 메서드: `getUserData()`<br>변수: `String userName`<br>파라미터: `(String userId)` |
| **PascalCase** | 첫글자와 띄어쓰기를 **대문자**로 구분 | HelloWorld | 클래스, 인터페이스, 열거형, 어노테이션 | 클래스: `class UserService {}`<br>인터페이스: `interface IUserService {}`<br>열거형: `enum UserRole {}` |
| **UPPER_CASE** | 대문자만 사용, 띄어쓰기를 **_**로 구분 | HELLO_WORLD | 상수 | `static final String API_KEY`<br>`static final int MAX_COUNT` |
| **kebab-case** | 소문자 사용, 띄어쓰기를 **-**로 구분 | hello-world | URL 패턴, 프로퍼티 키 | `@RequestMapping("/user-profile")`<br>`spring.datasource.url` |
| **snake_case** | 소문자만 사용, 띄어쓰기를 **_**로 구분 | hello_world | 데이터베이스 컬럼명 | `user_name`, `created_at` |

### 2.3 특수 케이스

| 종류 | 설명 | 예시 | 사용처 |
| :---- | :---- | :---- | :---- |
| **Impl** | 구현체 클래스 접미사 | UserServiceImpl | 서비스 구현체 |
| **DTO** | 데이터 전송 객체 접미사 | UserDTO | 데이터 전송 객체 |
| **VO** | 값 객체 접미사 | UserVO | 값 객체 |
| **Repository** | 데이터 접근 계층 접미사 | UserRepository | 리포지토리 인터페이스 |
| **Controller** | 컨트롤러 접미사 | UserController | REST 컨트롤러 |
| **Service** | 서비스 계층 접미사 | UserService | 서비스 인터페이스 |
| **Config** | 설정 클래스 접미사 | SecurityConfig | 설정 클래스 |
| **Exception** | 예외 클래스 접미사 | UserNotFoundException | 커스텀 예외 |

## 3. 패키지 구조

### 3.1 DDD 기반 패키지 구조
Spring Boot에서는 DDD(Domain-Driven Design) 패키지 구조를 추천합니다. 도메인 중심으로 코드를 구성하여 비즈니스 로직의 응집도를 높이고, 유지보수성을 향상시킬 수 있습니다.

```
com.example.project
├── domain/                    # 도메인 계층
│   ├── model/                 # 도메인 모델 (엔티티, 값 객체)
│   ├── repository/            # 도메인 리포지토리 인터페이스
│   ├── service/               # 도메인 서비스
│   └── exception/             # 도메인 예외
├── application/               # 애플리케이션 계층
│   ├── service/               # 애플리케이션 서비스
│   ├── dto/                   # DTO (Data Transfer Object)
│   └── port/                  # 포트 (인터페이스)
├── infrastructure/            # 인프라스트럭처 계층
│   ├── persistence/           # 영속성 구현
│   │   ├── entity/            # JPA 엔티티
│   │   └── repository/        # 리포지토리 구현체
│   ├── web/                   # 웹 계층
│   │   ├── controller/        # REST 컨트롤러
│   │   └── dto/               # 웹 DTO
│   └── config/                # 설정 클래스
└── common/                    # 공통 유틸리티
    ├── exception/             # 공통 예외
    ├── util/                  # 유틸리티 클래스
    └── constant/              # 상수
```

### 3.2 각 계층의 역할

| 계층 | 설명 | 주요 컴포넌트 |
| :---- | :---- | :---- |
| **Domain** | 비즈니스 로직의 핵심 | 엔티티, 값 객체, 도메인 서비스, 도메인 리포지토리 |
| **Application** | 도메인 계층을 조정하고 사용자 요청 처리 | 애플리케이션 서비스, DTO |
| **Infrastructure** | 기술적 구현 세부사항 | 영속성 구현, 웹 컨트롤러, 설정 |
| **Common** | 공통으로 사용되는 유틸리티 | 예외, 유틸리티, 상수 |

### 3.3 패키지 구조 선택 가이드

### 3.4 패키지 구조 원칙
- 도메인 계층은 인프라스트럭처에 의존하지 않아야 합니다.
- 각 계층은 자신의 하위 계층에만 의존해야 합니다.
- 도메인 모델은 순수한 비즈니스 로직만 포함해야 합니다.
- 인프라스트럭처 계층은 기술적 구현 세부사항을 캡슐화합니다.

#### 3.3.1 작은 프로젝트 (계층형 아키텍처)
작은 규모의 프로젝트에서는 단순한 계층형 구조를 사용할 수 있습니다:
```
com.example.project
├── controller/       # 프레젠테이션 계층
├── service/          # 비즈니스 계층
├── repository/       # 데이터 접근 계층
├── domain/           # 도메인 모델
└── config/           # 설정
```

#### 3.3.2 중간 규모 프로젝트 (도메인 중심 구조)
중간 규모의 프로젝트에서는 도메인 중심 구조를 사용합니다:
```
com.example.project
├── domain/
│   ├── model/
│   ├── repository/
│   └── service/
├── web/
│   ├── controller/
│   └── dto/
└── config/
```

#### 3.3.3 대규모 프로젝트 (완전한 DDD 구조)
대규모 프로젝트에서는 완전한 DDD 구조를 사용합니다:
```
com.example.project
├── domain/
├── application/
├── infrastructure/
└── common/
```

### 3.4 DDD의 장단점

#### 3.4.1 DDD의 장점
- 비즈니스 도메인에 대한 깊은 이해 반영
- 도메인 전문가와 개발자 간의 소통 향상
- 복잡한 비즈니스 로직의 명확한 표현
- 도메인 모델의 재사용성 향상
- 유지보수성과 확장성 개선

#### 3.4.2 DDD의 단점
- 학습 곡선이 높음
- 초기 설계 시간이 많이 소요
- 작은 프로젝트에서는 오버엔지니어링이 될 수 있음
- 도메인 전문가의 참여가 필수적
- 구현 비용이 높을 수 있음

### 3.5 혼합 구조 (Hybrid Architecture)

#### 3.5.1 혼합 구조의 필요성
- 프로젝트의 특성상 일부는 DDD, 일부는 계층형 구조가 더 적합할 수 있음
- 점진적인 DDD 도입이 필요한 경우
- 레거시 시스템과의 통합이 필요한 경우

#### 3.5.2 혼합 구조 예시
```
com.example.project
├── domain/                    # DDD 구조
│   ├── model/
│   ├── repository/
│   └── service/
├── controller/                # 계층형 구조
├── service/                   # 계층형 구조
├── repository/                # 계층형 구조
└── config/
```

#### 3.5.3 혼합 구조 사용 시 주의사항
- 도메인 모델의 일관성 유지
- 계층 간 의존성 관리
- 명확한 경계 설정
- 점진적인 리팩토링 계획 수립

### 3.6 패키지 구조 선택 기준

| 기준 | 계층형 | DDD | 혼합 |
| :---- | :---- | :---- | :---- |
| 프로젝트 규모 | 작음 | 큼 | 중간 |
| 도메인 복잡도 | 낮음 | 높음 | 중간 |
| 개발 기간 | 짧음 | 김 | 중간 |
| 팀 규모 | 작음 | 큼 | 중간 |
| 도메인 전문가 참여 | 낮음 | 높음 | 중간 |
| 유지보수성 | 중간 | 높음 | 중간 |
| 학습 곡선 | 낮음 | 높음 | 중간 |

## 4. 보안

### 4.1 인증/인가
- Spring Security 사용
- 적절한 권한 체크
- 민감 정보 암호화

### 4.2 입력 검증
- @Valid 사용
- 커스텀 검증 로직 구현
- XSS 방지

## 5. 성능

### 5.1 데이터베이스
- 적절한 인덱스 사용
- N+1 문제 방지
- 배치 처리 사용

### 5.2 캐싱
- @Cacheable 사용
- 적절한 캐시 전략 수립
- 캐시 만료 시간 설정

## 6. 코드 스타일

### 6.1 중괄호
- K&R 스타일 사용
- 조건문/반복문에 중괄호 필수 사용

```java
if (condition) {
    // 코드
} else {
    // 코드
}
```

### 6.2 공백
- 연산자 주변에 공백 사용
- 메서드 파라미터 사이에 공백 사용
- 콤마 뒤에 공백 사용

### 6.3 임포트
- 와일드카드(*) 사용 금지
- 정적 임포트는 static import 사용
- 임포트 순서: java > javax > org > com > 프로젝트 내부

## 7. Spring Boot 특화 규칙

### 7.1 컨트롤러
- @RestController 사용
- URL 패턴은 소문자와 하이픈 사용
- 메서드명은 HTTP 메서드와 동작을 명확히 표현

### 7.2 서비스
- 인터페이스와 구현체 분리
- 트랜잭션 처리는 @Transactional 사용
- 비즈니스 로직 중심으로 작성

### 7.3 리포지토리
- JPA 사용 시 메서드명은 쿼리 의도를 명확히 표현
- 커스텀 쿼리는 @Query 사용

### 7.4 Entity

#### 7.4.1 기본 규칙
- `@Entity` 어노테이션 사용
- 기본 생성자 필수 (protected 또는 public)
- final 클래스 사용 금지
- Getter/Setter는 필요한 경우에만 구현
- `equals()`, `hashCode()` 메서드 구현 시 주의

#### 7.4.2 필드 규칙
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

#### 7.4.3 연관 관계
- 양방향 연관관계는 필요한 경우에만 사용
- 연관관계 주인 명시 (`mappedBy` 사용)
- 지연 로딩(Lazy Loading) 기본 사용
- 즉시 로딩(Eager Loading)은 필요한 경우에만 사용

```java
@Entity
public class Order {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();
}
```

#### 7.4.4 상속 관계
- 단일 테이블 전략(`@Inheritance(strategy = InheritanceType.SINGLE_TABLE)`) 권장
- 구분 컬럼은 `@DiscriminatorColumn` 사용
- 구분 값은 `@DiscriminatorValue` 사용

```java
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
public abstract class Payment {
    @Id
    @GeneratedValue
    private Long id;
    
    private BigDecimal amount;
}

@Entity
@DiscriminatorValue("CARD")
public class CardPayment extends Payment {
    private String cardNumber;
}

@Entity
@DiscriminatorValue("BANK")
public class BankPayment extends Payment {
    private String accountNumber;
}
```

#### 7.4.5 값 타입
- 불변 객체로 설계
- `@Embeddable` 사용
- `equals()`, `hashCode()` 구현 필수

```java
@Embeddable
public class Address {
    private String city;
    private String street;
    private String zipcode;

    // equals(), hashCode() 구현
}

@Entity
public class User {
    @Embedded
    private Address address;
}
```

#### 7.4.6 감사(Auditing)
- 생성일, 수정일은 `@CreatedDate`, `@LastModifiedDate` 사용
- 생성자, 수정자는 `@CreatedBy`, `@LastModifiedBy` 사용
- `@EntityListeners(AuditingEntityListener.class)` 사용

```java
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User {
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @CreatedBy
    @Column(updatable = false)
    private String createdBy;

    @LastModifiedBy
    private String updatedBy;
}
```

#### 7.4.7 제약사항
- 데이터베이스 제약조건 명시 (`@Column` 어노테이션 사용)
- 유니크 제약조건은 `@Table(uniqueConstraints = ...)` 사용
- 인덱스는 `@Table(indexes = ...)` 사용

```java
@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email"})
    },
    indexes = {
        @Index(columnList = "name"),
        @Index(columnList = "createdAt")
    }
)
public class User {
    // 필드 정의
}
```

### 7.5 DTO
- 불변 객체로 설계
- 필요한 필드만 포함
- Builder 패턴 사용 권장

## 8. 테스트 코드

### 8.1 테스트 프레임워크 선택

#### 8.1.1 JUnit 5 사용 이유
- Spring Boot 2.2+ 버전에서 기본 테스트 프레임워크로 채택
- 모듈화된 아키텍처로 확장성 향상
- 람다 표현식 지원으로 테스트 코드 간결화
- 파라미터화된 테스트 개선
- 확장 모델 개선 (Extension API)
- JUnit 4와의 하위 호환성

#### 8.1.2 테스트 의존성
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.8.2</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 8.2 테스트 코드 작성 규칙

#### 8.2.1 테스트 클래스 구조
```java
@DisplayName("사용자 서비스 테스트")
class UserServiceTest {
    @Test
    @DisplayName("사용자 생성 성공")
    void createUser_success() {
        // given
        UserDto userDto = new UserDto("test@example.com", "password");
        
        // when
        User createdUser = userService.createUser(userDto);
        
        // then
        assertNotNull(createdUser);
        assertEquals(userDto.getEmail(), createdUser.getEmail());
    }
}
```

#### 8.2.2 테스트 메서드 네이밍
- `메서드명_시나리오_예상결과` 형식 사용
- `@DisplayName` 어노테이션으로 가독성 향상
- 한글 사용 가능 (국내 개발 환경 고려)

#### 8.2.3 테스트 주석
```java
@Test
@DisplayName("사용자 생성 시 이메일 중복 체크")
void createUser_duplicateEmail_throwsException() {
    // given: 테스트 데이터 준비
    UserDto existingUser = createExistingUser();
    
    // when: 테스트 대상 메서드 실행
    Executable executable = () -> userService.createUser(existingUser);
    
    // then: 결과 검증
    assertThrows(DuplicateEmailException.class, executable);
}
```

### 8.3 테스트 유형

#### 8.3.1 단위 테스트
```java
@ExtendWith(MockitoExtension.class)
class UserServiceUnitTest {
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void getUserById_success() {
        // given
        User expectedUser = new User(1L, "test@example.com");
        when(userRepository.findById(1L)).thenReturn(Optional.of(expectedUser));
        
        // when
        User actualUser = userService.getUserById(1L);
        
        // then
        assertEquals(expectedUser, actualUser);
    }
}
```

#### 8.3.2 통합 테스트
```java
@SpringBootTest
@Transactional
class UserServiceIntegrationTest {
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void createAndFindUser_success() {
        // given
        UserDto userDto = new UserDto("test@example.com", "password");
        
        // when
        User createdUser = userService.createUser(userDto);
        User foundUser = userService.getUserById(createdUser.getId());
        
        // then
        assertEquals(createdUser, foundUser);
    }
}
```

#### 8.3.3 API 테스트
```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserApiTest {
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void getUserApi_success() {
        // when
        ResponseEntity<UserDto> response = restTemplate.getForEntity(
            "/api/users/1", UserDto.class);
        
        // then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}
```

### 8.4 테스트 유호리티

#### 8.4.1 Assertions
```java
@Test
void assertions_examples() {
    // 기본 assertions
    assertEquals(expected, actual);
    assertTrue(condition);
    assertFalse(condition);
    assertNull(object);
    assertNotNull(object);
    
    // 예외 assertions
    assertThrows(ExpectedException.class, () -> {
        // 예외가 발생할 코드
    });
    
    // 시간 assertions
    assertTimeout(Duration.ofSeconds(1), () -> {
        // 실행 시간이 1초 이내여야 하는 코드
    });
}
```

#### 8.4.2 Assumptions
```java
@Test
void assumptions_examples() {
    // 조건부 테스트 실행
    assumeTrue(System.getProperty("os.name").contains("Windows"));
    
    // 조건이 맞지 않으면 테스트 스킵
    assumingThat("DEV".equals(System.getenv("ENV")),
        () -> {
            // 개발 환경에서만 실행할 테스트
        });
}
```

### 8.5 테스트 설정

#### 8.5.1 테스트 프로필
```properties
# application-test.properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop
```

#### 8.5.2 테스트 데이터베이스
```java
@SpringBootTest
@ActiveProfiles("test")
class DatabaseTest {
    @Autowired
    private DataSource dataSource;
    
    @Test
    void databaseConnection_success() {
        assertNotNull(dataSource);
    }
}
```

### 8.6 테스트 모범 사례

#### 8.6.1 테스트 격리
- 각 테스트는 독립적으로 실행되어야 함
- `@Transactional` 사용으로 테스트 데이터 롤백
- `@DirtiesContext`로 컨텍스트 재생성

#### 8.6.2 테스트 데이터 관리
- 테스트 데이터는 테스트 클래스 내에서 관리
- `@BeforeEach`, `@AfterEach` 활용
- 테스트 데이터 생성 유틸리티 클래스 사용

#### 8.6.3 성능 테스트
```java
@Test
@Timeout(value = 1000, unit = TimeUnit.MILLISECONDS)
void performanceTest() {
    // 성능 테스트 코드
}
```

### 8.7 테스트 커버리지

#### 8.7.1 JaCoCo 소개
JaCoCo(Java Code Coverage)는 Java 코드의 테스트 커버리지를 측정하는 도구입니다. 테스트 코드가 실제 코드를 얼마나 커버하는지 측정하여 테스트의 완성도를 객관적으로 평가할 수 있습니다.

##### JaCoCo의 필요성
- 테스트 코드의 완성도 객관적 평가
- 테스트되지 않은 코드 영역 식별
- 코드 품질 향상 및 버그 예방
- 테스트 우선순위 결정 지원

##### JaCoCo 측정 항목
- 라인 커버리지: 실행된 코드 라인의 비율
- 브랜치 커버리지: 조건문의 분기점 커버리지
- 메서드 커버리지: 실행된 메서드의 비율
- 클래스 커버리지: 실행된 클래스의 비율
- 명령어 커버리지: 실행된 바이트코드 명령어의 비율

#### 8.7.2 JaCoCo 설정
```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.7</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

#### 8.7.3 커버리지 기준
- 라인 커버리지: 80% 이상
- 브랜치 커버리지: 70% 이상
- 복잡한 비즈니스 로직: 90% 이상

## 9. 예외 처리

### 9.1 커스텀 예외
- RuntimeException 상속
- 명확한 메시지 포함
- 적절한 예외 계층 구조 설계

### 9.2 예외 처리
- @ControllerAdvice 사용
- 적절한 HTTP 상태 코드 반환
- 로깅 필수

## 10. 로깅

### 10.1 로그 레벨

#### 10.1.1 개발 환경
- DEBUG: 상세 디버깅 정보 (기본 설정)
- INFO: 주요 비즈니스 로직
- WARN: 경고 상황
- ERROR: 시스템 오류

#### 10.1.2 운영 환경
- INFO: 주요 비즈니스 로직 (기본 설정)
- WARN: 경고 상황
- ERROR: 시스템 오류
- DEBUG, TRACE: 필요한 경우에만 활성화

### 10.2 로그 메시지

#### 10.2.1 개발 환경
- 상세한 디버깅 정보 포함
- 스택 트레이스 전체 출력
- 민감 정보 마스킹 생략 (개발자 확인용)
- 메서드 진입/종료 로깅 활성화

```java
// 개발 환경 예시
log.debug("메서드 진입 - 파라미터: {}", param);
log.debug("중간 처리 결과: {}", result);
log.debug("메서드 종료 - 반환값: {}", returnValue);
```

#### 10.2.2 운영 환경
- 핵심 비즈니스 로직만 로깅
- 스택 트레이스 간소화
- 민감 정보 필수 마스킹
- 성능 고려한 로깅 최적화

```java
// 운영 환경 예시
log.info("사용자 로그인 시도 - ID: {}", maskedUserId);
log.warn("비정상 접근 감지 - IP: {}", clientIp);
log.error("시스템 오류 발생 - 트랜잭션 ID: {}", transactionId, e);
```

### 10.3 환경별 로깅 설정

#### 10.3.1 개발 환경 (application-dev.properties)
```properties
# 로그 레벨
logging.level.root=DEBUG
logging.level.org.springframework=DEBUG
logging.level.org.hibernate=DEBUG

# 로그 포맷
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n

# 스택 트레이스
logging.exception-conversion-word=%wEx
```

#### 10.3.2 운영 환경 (application-prod.properties)
```properties
# 로그 레벨
logging.level.root=INFO
logging.level.org.springframework=WARN
logging.level.org.hibernate=WARN

# 로그 포맷
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n

# 스택 트레이스 간소화
logging.exception-conversion-word=%wEx{n}

# 로그 파일 설정
logging.file.name=application.log
logging.file.max-size=10MB
logging.file.max-history=30
```

### 10.4 로깅 모범 사례

#### 10.4.1 공통 규칙
- 의미 있는 메시지 작성
- 파라미터는 {} 사용
- 예외는 마지막 파라미터로 전달
- 로그 레벨 적절히 사용

#### 10.4.2 환경별 주의사항
- **개발 환경**
  - 과도한 로깅으로 인한 성능 저하 주의
  - 민감 정보 노출 방지
  - 로그 파일 크기 관리

- **운영 환경**
  - 로그 볼륨 최적화
  - 로그 로테이션 설정
  - 모니터링 시스템 연동
  - 보안 로그 분리 저장

### 10.5 로깅 유틸리티

#### 10.5.1 로그 마스킹
```java
public class LogMaskingUtil {
    public static String maskEmail(String email) {
        if (email == null) return null;
        return email.replaceAll("(^[^@]{3}|(?!^)\\G)[^@]", "$1*");
    }
    
    public static String maskPhone(String phone) {
        if (phone == null) return null;
        return phone.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");
    }
}
```

#### 10.5.2 로그 포맷터
```java
public class CustomLogFormatter extends PatternLayout {
    @Override
    public String format(LoggingEvent event) {
        // 운영 환경에서만 마스킹 적용
        if (isProduction()) {
            String message = event.getMessage().toString();
            message = maskSensitiveData(message);
            event.setMessage(message);
        }
        return super.format(event);
    }
}
```

## 11. 문서화

### 11.1 API 문서화

#### 11.1.1 Javadoc과 Swagger UI 조합 사용
- Javadoc: 개발자용 상세 문서
- Swagger UI: API 테스트 및 시각화
- 두 가지를 함께 사용하여 최적의 문서화 구현

#### 11.1.2 Javadoc 작성 규칙
```java
/**
 * 사용자 정보를 조회하는 API
 * 
 * @param userId 사용자 ID
 * @return 사용자 정보
 * 
 * @ApiOperation(value = "사용자 정보 조회", notes = "사용자의 상세 정보를 조회합니다.")
 * @ApiResponses(value = {
 *     @ApiResponse(code = 200, message = "성공"),
 *     @ApiResponse(code = 404, message = "사용자를 찾을 수 없음")
 * })
 */
@GetMapping("/users/{userId}")
public UserDto getUser(@PathVariable String userId) {
    // 구현
}
```

#### 11.1.3 Swagger 어노테이션 사용 규칙

| 어노테이션 | 설명 | 사용 예시 |
| :---- | :---- | :---- |
| `@Api` | 컨트롤러 설명 | `@Api(tags = "사용자 관리")` |
| `@ApiOperation` | API 작업 설명 | `@ApiOperation(value = "사용자 생성")` |
| `@ApiParam` | 파라미터 설명 | `@ApiParam(value = "사용자 ID")` |
| `@ApiResponse` | 응답 설명 | `@ApiResponse(code = 200, message = "성공")` |
| `@ApiModel` | 모델 설명 | `@ApiModel(description = "사용자 정보")` |
| `@ApiModelProperty` | 모델 속성 설명 | `@ApiModelProperty(value = "이메일")` |

#### 11.1.4 API 문서화 원칙
- 모든 공개 API에 문서화 적용
- 응답 코드와 메시지 명확히 정의
- 예외 케이스 문서화
- API 버전 관리
- 변경 이력 기록

#### 11.1.5 Swagger 설정
```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.example.api"))
            .paths(PathSelectors.any())
            .build()
            .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("API 문서")
            .description("API 상세 설명")
            .version("1.0.0")
            .build();
    }
}
```

### 11.2 코드 문서화

#### 11.2.1 README.md 작성 규칙
- 프로젝트 개요
- 기술 스택
- 설치 및 실행 방법
- API 문서 링크
- 개발 환경 설정
- 기여 방법

#### 11.2.2 변경 로그 관리
- 버전별 변경사항 기록
- 주요 기능 추가/수정/삭제
- 버그 수정
- 의존성 업데이트

#### 11.2.3 아키텍처 문서
- 시스템 아키텍처 다이어그램
- 데이터베이스 스키마
- API 명세
- 보안 정책
- 배포 프로세스

### 11.3 문서화 도구

#### 11.3.1 Javadoc 생성
```bash
# Javadoc 생성 명령어
mvn javadoc:javadoc
```

#### 11.3.2 Swagger UI 접근
- 개발 환경: `http://localhost:8080/swagger-ui.html`
- 운영 환경: 보안 설정 필요

#### 11.3.3 문서화 검사
- Checkstyle의 Javadoc 규칙
- SonarQube의 문서화 품질 검사
- Swagger UI 테스트

## 12. 코드 품질 관리

### 12.1 정적 코드 분석 도구 통합

#### 12.1.0 도입 배경과 필요성
JavaScript/TypeScript 프로젝트에서는 ESLint를 통해 강력한 코드 품질 관리와 자동화된 코드 스타일 적용이 가능합니다. Spring Boot 프로젝트에서도 이와 유사한 수준의 코드 품질 관리를 위해 Checkstyle, PMD, SpotBugs를 통합하여 사용합니다.

##### 도입 목적
1. **일관된 코드 스타일 강제**
   - 팀 전체의 코드 스타일 통일
   - 자동화된 코드 포맷팅
   - 코드 리뷰 부담 감소

2. **코드 품질 향상**
   - 잠재적 버그 사전 발견
   - 보안 취약점 검출
   - 성능 이슈 식별

3. **개발 생산성 향상**
   - IDE 통합으로 실시간 피드백
   - 자동화된 코드 검사로 수동 검토 시간 감소
   - CI/CD 파이프라인과 통합으로 품질 게이트 역할

4. **팀 협업 효율화**
   - 명확한 코드 품질 기준 제공
   - 자동화된 검사로 팀원 간 의견 충돌 감소
   - 코드 리뷰 시간 단축

##### 도구 선택 이유
- **Checkstyle**: 코드 스타일과 코딩 표준 검사
- **PMD**: 복잡한 코드, 중복 코드, 최적화되지 않은 코드 검사
- **SpotBugs**: 잠재적 버그와 보안 취약점 검사

이러한 도구들의 통합은 ESLint와 유사한 수준의 자동화된 코드 품질 관리를 가능하게 하며, Spring Boot 프로젝트의 전반적인 코드 품질 향상에 기여합니다.

#### 12.1.1 Gradle 설정
```groovy
plugins {
    id 'org.springframework.boot' version '2.7.0'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    
    runtimeOnly 'com.h2database:h2'
    runtimeOnly 'org.postgresql:postgresql'
    
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
}

test {
    useJUnitPlatform()
}

tasks.withType(JavaCompile) {
    options.encoding = 'UTF-8'
}

tasks.withType(Test) {
    systemProperty "file.encoding", "UTF-8"
}
```

#### 12.1.2 Maven 설정
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>Demo project for Spring Boot</description>
    
    <properties>
        <java.version>11</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### 12.2 도구별 규칙 설정

#### 12.2.1 Checkstyle 규칙 (checkstyle.xml)
```xml
<?xml version="1.0"?>
<!DOCTYPE module PUBLIC
    "-//Checkstyle//DTD Checkstyle Configuration 1.3//EN"
    "https://checkstyle.org/dtds/configuration_1_3.dtd">
<module name="Checker">
    <module name="TreeWalker">
        <!-- 들여쓰기 -->
        <module name="Indentation">
            <property name="basicOffset" value="4"/>
            <property name="braceAdjustment" value="0"/>
            <property name="caseIndent" value="4"/>
        </module>
        
        <!-- 네이밍 규칙 -->
        <module name="ConstantName"/>
        <module name="LocalFinalVariableName"/>
        <module name="LocalVariableName"/>
        <module name="MemberName"/>
        <module name="MethodName"/>
        <module name="PackageName"/>
        <module name="ParameterName"/>
        <module name="StaticVariableName"/>
        <module name="TypeName"/>
        
        <!-- 주석 규칙 -->
        <module name="JavadocType"/>
        <module name="JavadocMethod"/>
        <module name="JavadocVariable"/>
        
        <!-- 임포트 규칙 -->
        <module name="AvoidStarImport"/>
        <module name="IllegalImport"/>
        <module name="RedundantImport"/>
        <module name="UnusedImports"/>
        
        <!-- 코드 스타일 -->
        <module name="EmptyBlock"/>
        <module name="NeedBraces"/>
        <module name="LeftCurly"/>
        <module name="RightCurly"/>
        <module name="WhitespaceAround"/>
    </module>
</module>
```

#### 12.2.2 PMD 규칙 (ruleset.xml)
```xml
<?xml version="1.0"?>
<ruleset name="Custom Rules"
    xmlns="http://pmd.sourceforge.net/ruleset/2.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://pmd.sourceforge.net/ruleset/2.0.0 https://pmd.sourceforge.io/ruleset_2_0_0.xsd">
    
    <rule ref="category/java/bestpractices.xml">
        <exclude name="GuardLogStatement"/>
        <exclude name="JUnitTestsShouldIncludeAssert"/>
    </rule>
    
    <rule ref="category/java/codestyle.xml">
        <exclude name="ClassNamingConventions"/>
        <exclude name="MethodNamingConventions"/>
    </rule>
    
    <rule ref="category/java/design.xml">
        <exclude name="LawOfDemeter"/>
        <exclude name="UseUtilityClass"/>
    </rule>
    
    <rule ref="category/java/errorprone.xml">
        <exclude name="DataflowAnomalyAnalysis"/>
    </rule>
    
    <rule ref="category/java/multithreading.xml"/>
    <rule ref="category/java/performance.xml"/>
</ruleset>
```

#### 12.2.3 SpotBugs 필터 (excludeFilter.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<FindBugsFilter>
    <!-- DTO 클래스의 불변성 경고 무시 -->
    <Match>
        <Class name="~.*DTO"/>
        <Bug pattern="EI_EXPOSE_REP,EI_EXPOSE_REP2"/>
    </Match>
    
    <!-- JPA 엔티티의 equals/hashCode 경고 무시 -->
    <Match>
        <Class name="~.*Entity"/>
        <Bug pattern="EQ_DOESNT_OVERRIDE_EQUALS,EQ_UNUSUAL"/>
    </Match>
    
    <!-- 테스트 코드의 일부 경고 무시 -->
    <Match>
        <Class name="~.*Test"/>
        <Bug pattern="ST_WRITE_TO_STATIC_FROM_INSTANCE_METHOD"/>
    </Match>
</FindBugsFilter>
```

### 12.3 CI/CD 통합

#### 12.3.1 GitHub Actions 설정
```yaml
name: Code Quality Check

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK
      uses: actions/setup-java@v2
      with:
        java-version: '11'
        distribution: 'adopt'
        
    - name: Build with Gradle
      run: ./gradlew build
      
    - name: Upload Checkstyle Report
      uses: actions/upload-artifact@v2
      if: always()
      with:
        name: checkstyle-report
        path: build/reports/checkstyle/
        
    - name: Upload PMD Report
      uses: actions/upload-artifact@v2
      if: always()
      with:
        name: pmd-report
        path: build/reports/pmd/
        
    - name: Upload SpotBugs Report
      uses: actions/upload-artifact@v2
      if: always()
      with:
        name: spotbugs-report
        path: build/reports/spotbugs/
```

### 12.4 IDE 통합

#### 12.4.1 IntelliJ IDEA 설정
1. Checkstyle-IDEA 플러그인 설치
2. PMD 플러그인 설치
3. SpotBugs 플러그인 설치
4. 각 도구의 설정 파일 경로 지정
5. 실시간 검사 활성화

#### 12.4.2 Eclipse 설정
1. Checkstyle 플러그인 설치
2. PMD 플러그인 설치
3. SpotBugs 플러그인 설치
4. 각 도구의 설정 파일 경로 지정
5. 자동 빌드 시 검사 활성화

### 12.5 코드 품질 관리 프로세스

#### 12.5.1 개발 단계
- IDE 플러그인을 통한 실시간 검사
- 커밋 전 로컬 빌드로 검사
- PR 생성 전 로컬 빌드로 검사

#### 12.5.2 CI/CD 단계
- PR 머지 전 자동 검사
- 빌드 실패 시 PR 머지 차단
- 검사 결과 리포트 생성

#### 12.5.3 모니터링
- 주간 코드 품질 리포트 생성
- 품질 지표 추적
- 개선 필요 항목 식별

## 13. 빌드 도구 설정

### 13.1 Gradle 설정
```groovy
plugins {
    id 'org.springframework.boot' version '2.7.0'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    
    runtimeOnly 'com.h2database:h2'
    runtimeOnly 'org.postgresql:postgresql'
    
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
}

test {
    useJUnitPlatform()
}

tasks.withType(JavaCompile) {
    options.encoding = 'UTF-8'
}

tasks.withType(Test) {
    systemProperty "file.encoding", "UTF-8"
}
```

### 13.2 Maven 설정
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>Demo project for Spring Boot</description>
    
    <properties>
        <java.version>11</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### 13.3 빌드 도구 선택 가이드

#### 13.3.1 Gradle 선택 시
- 장점:
  - 더 빠른 빌드 속도
  - 더 유연한 설정
  - Kotlin DSL 지원
  - 증분 빌드 지원
- 단점:
  - 학습 곡선이 높음
  - 설정이 복잡할 수 있음

#### 13.3.2 Maven 선택 시
- 장점:
  - 널리 사용되는 표준
  - XML 기반의 명확한 구조
  - 풍부한 플러그인 생태계
- 단점:
  - 빌드 속도가 느림
  - 설정이 덜 유연함

### 13.4 빌드 최적화

#### 13.4.1 Gradle 최적화
```groovy
// 빌드 캐시 설정
org.gradle.caching=true
org.gradle.parallel=true
org.gradle.daemon=true

// 메모리 설정
org.gradle.jvmargs=-Xmx2g -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError

// 빌드 스캔 활성화
buildScan {
    termsOfServiceUrl = "https://gradle.com/terms-of-service"
    termsOfServiceAgree = "yes"
}
```

#### 13.4.2 Maven 최적화
```xml
<settings>
    <mirrors>
        <mirror>
            <id>central</id>
            <url>https://repo.maven.apache.org/maven2</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
    </mirrors>
    
    <profiles>
        <profile>
            <id>jdk-11</id>
            <activation>
                <jdk>11</jdk>
            </activation>
            <properties>
                <maven.compiler.source>11</maven.compiler.source>
                <maven.compiler.target>11</maven.compiler.target>
            </properties>
        </profile>
    </profiles>
</settings>
```

### 13.5 의존성 관리

#### 13.5.1 의존성 버전 관리

##### 13.5.1.1 Spring Boot BOM 사용
```xml
<!-- Maven -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.7.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- Gradle -->
plugins {
    id 'org.springframework.boot' version '2.7.0'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
}
```

##### 13.5.1.2 버전 관리 전략
- Spring Boot BOM을 통한 버전 관리
- 명시적 버전 지정은 필요한 경우에만
- 정기적인 의존성 업데이트
- 버전 충돌 해결

#### 13.5.2 의존성 범위

##### 13.5.2.1 Maven 의존성 범위
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
</dependency>

<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

##### 13.5.2.2 Gradle 의존성 범위
```groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

##### 13.5.2.3 의존성 충돌 해결
```xml
<!-- Maven -->
<dependency>
    <groupId>com.example</groupId>
    <artifactId>example-library</artifactId>
    <version>1.0.0</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- Gradle -->
dependencies {
    implementation('com.example:example-library:1.0.0') {
        exclude group: 'org.slf4j', module: 'slf4j-api'
    }
}
```

##### 13.5.2.4 의존성 업데이트
```xml
<!-- Maven -->
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>versions-maven-plugin</artifactId>
    <version>2.8.1</version>
    <configuration>
        <generateBackupPoms>false</generateBackupPoms>
    </configuration>
</plugin>
```

##### 13.5.2.5 의존성 보안
```xml
<!-- Maven -->
<plugin>
    <groupId>org.owasp</groupId>
    <artifactId>dependency-check-maven</artifactId>
    <version>6.5.3</version>
    <executions>
        <execution>
            <goals>
                <goal>check</goal>
            </goals>
        </execution>
    </executions>
</plugin>

<!-- Gradle -->
plugins {
    id 'org.owasp.dependencycheck' version '6.5.3'
}
```

#### 13.5.3 의존성 보안

##### 13.5.3.1 취약점 검사
```xml
<!-- Maven -->
<plugin>
    <groupId>org.owasp</groupId>
    <artifactId>dependency-check-maven</artifactId>
    <version>6.5.3</version>
    <executions>
        <execution>
            <goals>
                <goal>check</goal>
            </goals>
        </execution>
    </executions>
</plugin>

<!-- Gradle -->
plugins {
    id 'org.owasp.dependencycheck' version '6.5.3'
}
```

##### 13.5.3.2 보안 업데이트 정책
- 정기적인 취약점 검사
- 보안 패치 즉시 적용
- 취약한 의존성 제거
- 보안 업데이트 로그 관리

## 14. 의존성 관리

### 14.1 의존성 관리 도구 선택
- Maven 또는 Gradle 선택
- 선택한 도구의 설정 파일 작성

### 14.2 의존성 관리 예시

#### 14.2.1 Maven 설정
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

#### 14.2.2 Gradle 설정
```groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

## 15. 배포 전략

### 15.1 배포 도구 선택
- Docker 또는 클라우드 플랫폼 선택
- 선택한 도구의 설정 파일 작성

### 15.2 배포 설정 예시

#### 15.2.1 Docker 설정
```dockerfile
FROM openjdk:11-jre-slim

WORKDIR /app

COPY target/your-project-1.0.0.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### 15.2.2 클라우드 플랫폼 설정
- 선택한 클라우드 플랫폼의 설정 파일 작성

## 16. 모니터링

### 16.1 모니터링 도구 선택
- Prometheus 또는 Grafana 선택
- 선택한 도구의 설정 파일 작성

### 16.2 모니터링 설정 예시

#### 16.2.1 Prometheus 설정
```yaml
scrape_configs:
  - job_name: 'spring-boot'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['localhost:8080']
```

#### 16.2.2 Grafana 설정
- Grafana 웹사이트에서 설정 파일 작성

## 17. 국제화(i18n)

### 17.1 국제화 도구 선택
- MessageSource 또는 타사 도구 선택
- 선택한 도구의 설정 파일 작성

### 17.2 국제화 설정 예시

#### 17.2.1 MessageSource 설정
```java
@Configuration
public class MessageSourceConfig {
    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
```

#### 17.2.2 타사 도구 설정
- 선택한 타사 도구의 설정 파일 작성

## 18. 파일 구조

### 18.1 파일 구조 원칙
- 도메인 계층은 인프라스트럭처에 의존하지 않아야 합니다.
- 각 계층은 자신의 하위 계층에만 의존해야 합니다.
- 도메인 모델은 순수한 비즈니스 로직만 포함해야 합니다.
- 인프라스트럭처 계층은 기술적 구현 세부사항을 캡슐화합니다.

#### 18.1.1 작은 프로젝트 (계층형 아키텍처)
작은 규모의 프로젝트에서는 단순한 계층형 구조를 사용할 수 있습니다:
```
com.example.project
├── controller/       # 프레젠테이션 계층
├── service/          # 비즈니스 계층
├── repository/       # 데이터 접근 계층
├── domain/           # 도메인 모델
└── config/           # 설정
```

#### 18.1.2 중간 규모 프로젝트 (도메인 중심 구조)
중간 규모의 프로젝트에서는 도메인 중심 구조를 사용합니다:
```
com.example.project
├── domain/
│   ├── model/
│   ├── repository/
│   └── service/
├── web/
│   ├── controller/
│   └── dto/
└── config/
```

#### 18.1.3 대규모 프로젝트 (완전한 DDD 구조)
대규모 프로젝트에서는 완전한 DDD 구조를 사용합니다:
```
com.example.project
├── domain/
├── application/
├── infrastructure/
└── common/
```

## 19. 선언 규칙

### 19.1 선언 규칙 원칙
- 선언은 최소화하고 직관적인 방식으로 작성
- 의도와 목적을 명확히 설명
- 중복 선언 금지

### 19.2 선언 예시

#### 19.2.1 클래스 선언
```java
public class UserService {
    // 구현
}
```

#### 19.2.2 메서드 선언
```java
public User getUser(String userId) {
    // 구현
}
```

#### 19.2.3 필드 선언
```java
private String email;
```

### 19.3 선언 작성 시 주의사항
- 현재 코드 상태를 정확히 반영해야 함
- 명확하고 간결하게 작성
- 불필요한 선언은 작성하지 않음
- TODO, FIXME 등의 태그는 적절히 사용
- 영어로 작성하는 것을 권장 (국제화 고려)
- 일관된 스타일 유지

### 19.4 특수 선언 태그
```java
// TODO: 향후 구현 예정인 기능
// FIXME: 수정이 필요한 부분
// XXX: 주의가 필요한 부분
// HACK: 임시 해결책
// NOTE: 특별한 주의사항
```

### 19.5 선언 검사 도구
- Checkstyle의 선언 규칙 사용
- SonarQube의 선언 품질 검사
- IDE의 선언 템플릿 활용

## 20. 소스 파일 구조

### 20.1 파일 구성
- 각 파일은 하나의 최상위 클래스만 포함
- 파일 이름은 포함된 최상위 클래스의 이름과 동일
- 파일 확장자는 .java 사용

### 20.2 소스 파일 구조
1. 라이센스 또는 저작권 정보 (있는 경우)
2. 패키지 선언
3. 임포트 문
4. 정확히 하나의 최상위 클래스

### 20.3 임포트 문 순서
1. 정적 임포트
2. 표준 라이브러리
3. 서드파티 라이브러리
4. 프로젝트 내부 패키지

## 21. 형식화 (Formatting)

### 21.1 중괄호
- K&R 스타일 사용
- 조건문/반복문에 중괄호 필수 사용
- 빈 블록은 간결하게 표현

```java
// 올바른 예
if (condition) {
    // 코드
} else {
    // 코드
}

// 빈 블록
void doNothing() {}
```

### 21.2 들여쓰기
- 들여쓰기는 4개의 스페이스 사용
- 탭 문자 사용 금지
- 연속된 줄은 8개의 스페이스로 들여쓰기

### 21.3 한 줄 최대 길이
- 한 줄의 최대 길이는 100자로 제한
- 100자를 초과하는 경우 적절한 위치에서 줄바꿈

### 21.4 줄바꿈 규칙
- 연산자 앞에서 줄바꿈
- 콤마 뒤에서 줄바꿈
- 메서드 호출의 점(.) 앞에서 줄바꿈

## 22. 프로그래밍 관행

### 22.1 @Override
- 상위 클래스의 메서드를 재정의할 때는 항상 @Override 어노테이션 사용

### 22.2 예외 처리
- 예외는 가능한 구체적으로 잡기
- 예외를 무시하지 않기
- 예외를 잡아서 로깅하고 다시 던지기

```java
try {
    // 코드
} catch (SpecificException e) {
    log.error("에러 발생", e);
    throw e;
}
```

### 22.3 정적 멤버
- 정적 멤버는 클래스 이름으로 참조
- 인스턴스를 통한 정적 멤버 접근 금지

```java
// 올바른 예
ClassName.staticMethod();

// 잘못된 예
instance.staticMethod();
```

## 23. 코드 리뷰 프로세스

### 23.1 리뷰 체크리스트
- 코드 스타일 준수 여부
- 테스트 코드 작성 여부
- 성능 영향 검토
- 보안 취약점 검토
- 문서화 완성도

### 23.2 리뷰 코멘트 작성 가이드
- 구체적이고 명확한 피드백
- 개선 제안 시 대안 제시
- 긍정적인 피드백도 포함
- 코드 스타일 이슈는 자동화 도구 활용

### 23.3 리뷰 프로세스
1. PR 생성
2. 자동화된 코드 검사 실행
3. 팀원 리뷰 요청
4. 피드백 반영
5. 승인 및 머지

## 24. 성능 최적화 가이드라인

### 24.1 데이터베이스
- 적절한 인덱스 사용
- N+1 문제 방지
- 배치 처리 활용
- 쿼리 최적화

### 24.2 메모리 관리
- 불필요한 객체 생성 최소화
- 적절한 캐시 전략 수립
- 메모리 누수 방지

### 24.3 동시성
- 스레드 안전성 보장
- 적절한 동기화 전략 사용
- 데드락 방지

## 25. 보안 가이드라인

### 25.1 입력 검증
- 모든 사용자 입력 검증
- SQL 인젝션 방지
- XSS 방지
- CSRF 방지

### 25.2 인증/인가
- 강력한 암호화 사용
- 세션 관리
- 접근 제어
- 보안 헤더 설정

### 25.3 데이터 보호
- 민감 정보 암호화
- 로깅 시 개인정보 마스킹
- 보안 취약점 정기 점검

## 26. Git 관리

### 26.1 .gitignore 가이드

#### 26.1.1 반드시 무시해야 하는 파일/디렉토리
- `target/` - 빌드 결과물 디렉토리
- `.gradle/` - Gradle 캐시
- `.mvn/` - Maven Wrapper
- `mvnw` - Maven Wrapper 스크립트
- `mvnw.cmd` - Maven Wrapper 스크립트
- `gradlew` - Gradle Wrapper 스크립트
- `gradlew.bat` - Gradle Wrapper 스크립트
- `.idea/` - IntelliJ IDE 설정
- `.vscode/` - VS Code 설정
- `*.iml` - IntelliJ 모듈 파일
- `*.log` - 로그 파일
- `logs/` - 로그 디렉토리
- `application-*.yml` - 환경별 설정 파일
- `application-*.properties` - 환경별 설정 파일
- `.DS_Store` - macOS 시스템 파일
- `Thumbs.db` - Windows 썸네일 캐시 파일

#### 26.1.2 선택적으로 무시할 수 있는 파일/디렉토리
- `.vscode/` - VS Code 설정 (팀 공통 설정은 포함)
- `.idea/` - IntelliJ IDE 설정 (팀 공통 설정은 포함)
- `*.local` - 로컬 설정 파일
- `*.bak` - 백업 파일
- `*.tmp` - 임시 파일

#### 26.1.3 절대 무시하면 안 되는 파일/디렉토리
- `pom.xml` - Maven 프로젝트 설정
- `build.gradle` - Gradle 프로젝트 설정
- `settings.gradle` - Gradle 설정
- `src/` - 소스 코드
- `README.md` - 프로젝트 문서
- `.gitignore` - Git 무시 설정 파일
- `application.yml` - 기본 설정 파일
- `application.properties` - 기본 설정 파일

#### 26.1.4 보안 관련 주의사항
- API 키, 비밀번호, 토큰 등 민감한 정보가 포함된 파일은 절대 커밋하지 마세요
- `application-*.yml` 파일은 반드시 `.gitignore`에 포함되어야 합니다
- 민감한 정보는 환경 변수로 관리하고, `application-example.yml` 파일을 통해 필요한 설정 목록을 공유하세요

### 26.2 Git Commit Convention

#### 26.2.1 기본 형식
```
type: subject

body

footer
```

#### 26.2.2 Commit Type
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드, 리팩토링 테스트 코드 추가
- `chore`: 빌드 업무 수정, 패키지 매니저 수정
- `ci`: CI 관련 설정 변경
- `perf`: 성능 개선
- `build`: 빌드 시스템 또는 외부 의존성 변경

#### 26.2.3 Subject 규칙
- 제목은 50자를 넘지 않도록
- 마침표 없이 작성
- 현재시제로 작성
- 명령문으로 작성

#### 26.2.4 Body 규칙
- 선택사항
- 무엇을, 왜 변경했는지 설명
- 72자를 넘지 않도록

#### 26.2.5 Footer 규칙
- 선택사항
- issue tracker ID 작성
- Breaking Changes 명시

#### 26.2.6 예시
```
feat: 사용자 인증 기능 구현

- Spring Security 통합
- JWT 토큰 기반 인증 구현
- 로그인/로그아웃 API 구현

Closes #123
```

```
fix: N+1 문제 해결

- User 엔티티의 연관관계 FetchType.LAZY로 변경
- JPQL 쿼리 최적화
- 테스트 코드 추가

Fixes #45
```

```
docs: API 문서 업데이트

- Swagger 어노테이션 추가
- API 응답 예제 추가
- 에러 코드 문서화
```

```
style: 코드 포맷팅 수정

- Checkstyle 규칙에 맞춰 코드 포맷팅
- 불필요한 공백 제거
- import 순서 정렬
```

```
refactor: 서비스 계층 리팩토링

- 비즈니스 로직 도메인 서비스로 이동
- 트랜잭션 경계 명확화
- 예외 처리 통합

BREAKING CHANGE: 서비스 메서드 시그니처 변경
```
