# Spring 코드 컨벤션

## 목차
- [1. 명명 규칙 (Naming Conventions)](#1-명명-규칙-naming-conventions)
- [2. 파일 구조](#2-파일-구조)
- [3. 코드 포맷팅](#3-코드-포맷팅)
- [4. 주석 규칙](#4-주석-규칙)
- [5. 레이어별 코드 작성 규칙](#5-레이어별-코드-작성-규칙)
- [6. 예외 처리](#6-예외-처리)
- [7. 테스트 코드](#7-테스트-코드)
- [8. 로깅](#8-로깅)
- [9. 보안](#9-보안)
- [10. 추천 사항](#10-추천-사항)
- [11. 도구 설정](#11-도구-설정)

## 0. 파일 공통 요건
- 파일 인코딩: UTF-8 사용
- 새줄 문자: LF(Line Feed, 0x0A) 사용
- 파일 끝에는 새줄 문자 필수

## 1. 명명 규칙 (Naming Conventions)

### 1.1 기본 원칙
- 모든 이름은 영문 사용
- 축약어 사용은 최소화하고 직관적인 이름 사용
- 이름으로 의도와 목적을 파악할 수 있도록 작성
- 한글 발음을 그대로 사용하지 않음
- 예약어 사용 금지
- 임시 변수 외 1글자 이름 사용 금지
- 식별자는 영문/숫자/언더스코어만 허용

### 1.2 네이밍 종류

| 종류 | 설명 | 용도 | 예시 |
| :---- | :---- | :---- | :---- |
| **PascalCase** | 첫 글자와 각 단어의 첫 글자를 대문자로 | 클래스(Entity, DTO, VO, Controller, Service 등) | UserService, UserEntity |
| **camelCase** | 첫 글자는 소문자, 각 단어의 첫 글자를 대문자로 | 메서드, 변수, 파라미터 | getUserById, firstName |
| **UPPER_SNAKE_CASE** | 모두 대문자, 단어 사이는 언더스코어(_) | 상수 | MAX_USER_COUNT |
| **kebab-case** | 모두 소문자, 단어 사이는 하이픈(-) | 설정 파일, URL | user-service.properties |

### 1.3 Entity와 VO의 차이
- **Entity**: 데이터베이스 테이블과 매핑되는 객체
  ```java
  @Entity
  @Table(name = "users")
  public class UserEntity {
      @Id
      private Long id;
      private String name;
  }
  ```

- **VO(Value Object)**: 값 자체를 표현하는 불변 객체
  ```java
  @Getter
  @EqualsAndHashCode
  public class AddressVO {
      private final String city;
      private final String street;
      private final String zipCode;
      
      // 생성자를 통해서만 값을 설정할 수 있음
      public AddressVO(String city, String street, String zipCode) {
          this.city = city;
          this.street = street;
          this.zipCode = zipCode;
      }
  }
  ```

주요 차이점:
- Entity는 식별자(ID)를 가지며 데이터베이스 레코드와 매핑됨
- VO는 식별자가 없으며 값 자체가 의미를 가짐
- Entity는 가변적이지만, VO는 불변(Immutable)
- VO는 값이 같다면 동일한 객체로 취급 (equals, hashCode 구현)

### 1.3 용도별 명명 규칙

#### 클래스 (PascalCase)
```java
// Entity
public class UserEntity { }

// DTO
public class UserResponseDto { }
public class CreateUserRequestDto { }

// Controller
public class UserController { }

// Service
public class UserService { }
public class UserServiceImpl { }

// Repository
public class UserRepository { }
```

#### 메서드 (camelCase)
```java
// 조회
public User findById(Long id) { }
public List<User> findAll() { }

// 생성
public User createUser(CreateUserRequestDto dto) { }

// 수정
public User updateUser(Long id, UpdateUserRequestDto dto) { }

// 삭제
public void deleteUser(Long id) { }

// Boolean 반환
public boolean isExist(Long id) { }
public boolean hasPermission(Long userId) { }
```

#### 변수 (camelCase)
```java
private final UserService userService;
private List<User> userList;
private String firstName;
```

#### 상수 (UPPER_SNAKE_CASE)
```java
public static final int MAX_USER_COUNT = 100;
public static final String API_KEY = "your-api-key";
private static final String ERROR_MESSAGE = "Invalid user id";
```

### 1.4 패키지 명명 규칙
- 모두 소문자 사용
- 단어 구분 없이 연결
```
com.company.project.user.controller
com.company.project.user.service
com.company.project.user.repository
com.company.project.user.dto
com.company.project.common.util
```

## 2. 파일 구조

### 2.1 권장 프로젝트 구조
```
src/
├── main/
│   ├── java/
│   │   └── com/company/project/
│   │       ├── domain/           # 도메인별 패키지
│   │       │   ├── user/         # 사용자 도메인
│   │       │   │   ├── controller/
│   │       │   │   ├── service/
│   │       │   │   ├── repository/
│   │       │   │   ├── dto/
│   │       │   │   └── entity/
│   │       │   └── product/      # 상품 도메인
│   │       ├── global/           # 전역 설정
│   │       │   ├── config/       # 설정 클래스
│   │       │   ├── error/        # 에러 처리
│   │       │   ├── security/     # 보안 관련
│   │       │   └── util/         # 유틸리티
│   │       └── Application.java   # 메인 클래스
│   └── resources/
│       ├── application.yml       # 애플리케이션 설정
│       ├── application-dev.yml   # 개발 환경 설정
│       └── application-prod.yml  # 운영 환경 설정
└── test/                        # 테스트 코드
    └── java/
        └── com/company/project/
            └── domain/
                └── user/
                    ├── controller/
                    ├── service/
                    └── repository/
```

## 3. 코드 포맷팅

### 3.1 들여쓰기
- 하드탭 사용 (탭 크기: 4개의 스페이스)
- 최대 줄 길이는 120자
- 한 줄에 하나의 문장

```java
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }
}
```

### 3.2 공백 규칙
- 연산자 전후에 공백 추가
- 콤마 뒤에 공백 추가
- 중괄호 전후에 공백 추가
- 줄 끝 공백 없음
- 제어문 키워드와 소괄호 사이 공백
- 주석문 기호 전후 공백

```java
// Good
int sum = a + b;
method(x, y, z);
if (condition) {
    // code
}

// Bad
int sum=a+b;
method(x,y,z);
if(condition){
    // code
}
```

### 3.3 줄바꿈 규칙
- 메서드 체이닝 시 각 메서드마다 새 줄
- 파라미터가 많은 경우 각각 새 줄
```java
// 메서드 체이닝
return userRepository.findById(id)
    .map(UserMapper::toDto)
    .orElseThrow(() -> new UserNotFoundException(id));

// 긴 파라미터
public UserResponseDto createUser(
    @RequestBody CreateUserRequestDto requestDto,
    @RequestParam String role,
    @PathVariable Long groupId
) {
    // code
}
```

### 3.4 중괄호 규칙
- K&R 스타일로 중괄호 선언
- else, catch, finally, while는 닫는 중괄호와 같은 줄에 선언
- 조건/반복문에 중괄호 필수

```java
// Good
if (condition) {
    // code
}

// Bad
if (condition)
    // code
```

### 3.5 빈 줄 규칙
- package 선언 후 빈 줄 삽입
- import 선언 그룹 사이 빈 줄 삽입
- 메소드 사이 빈 줄 삽입

## 4. 주석 규칙

### 4.1 Javadoc 주석
- 모든 public API에 대해 Javadoc 작성
- 클래스, 인터페이스, public/protected 메서드에 사용
```java
/**
 * 사용자 정보를 관리하는 서비스
 */
@Service
public class UserService {
    /**
     * 사용자 ID로 사용자를 조회합니다.
     *
     * @param id 조회할 사용자의 ID
     * @return 조회된 사용자 정보
     * @throws UserNotFoundException 사용자를 찾을 수 없는 경우
     */
    public User findById(Long id) {
        // code
    }
}
```

### 4.2 구현 주석
- 복잡한 로직에 대한 설명
- 임시 코드나 TODO 표시
```java
// TODO: 추후 캐시 적용 필요
public List<User> findAll() {
    return userRepository.findAll();
}

// 비밀번호 유효성 검사
// 1. 최소 8자 이상
// 2. 특수문자 포함
// 3. 숫자 포함
private boolean isValidPassword(String password) {
    // code
}
```

## 5. 레이어별 코드 작성 규칙

### 5.1 Controller
- 요청과 응답의 처리만 담당
- 비즈니스 로직은 포함하지 않음
- DTO를 통한 데이터 전달
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Long id) {
        UserResponseDto user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(
        @Valid @RequestBody CreateUserRequestDto requestDto
    ) {
        UserResponseDto user = userService.createUser(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
```

### 5.2 Service
- 비즈니스 로직 구현
- 트랜잭션 관리
- Repository 계층과 통신
```java
@Service
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Transactional
    public UserResponseDto createUser(CreateUserRequestDto dto) {
        validateDuplicateEmail(dto.getEmail());
        
        User user = User.builder()
            .email(dto.getEmail())
            .password(passwordEncoder.encode(dto.getPassword()))
            .name(dto.getName())
            .build();
            
        User savedUser = userRepository.save(user);
        return UserMapper.toDto(savedUser);
    }
    
    private void validateDuplicateEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateEmailException(email);
        }
    }
}
```

### 5.3 Repository
- 데이터 접근 로직
- 단순 CRUD 작업 수행
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.status = :status")
    List<User> findAllByStatus(@Param("status") UserStatus status);
}
```

### 5.4 Entity
- JPA 엔티티 클래스
- 비즈니스 로직은 최소화
```java
@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    private UserStatus status;
    
    @Builder
    public User(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.status = UserStatus.ACTIVE;
    }
    
    public void updatePassword(String newPassword) {
        this.password = newPassword;
    }
}
```

## 6. 예외 처리

### 6.1 예외 클래스 정의
```java
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;
    
    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}

public class UserNotFoundException extends BusinessException {
    public UserNotFoundException(Long id) {
        super(ErrorCode.USER_NOT_FOUND);
    }
}
```

### 6.2 전역 예외 처리
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, e.getErrorCode().getStatus());
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
        MethodArgumentNotValidException e
    ) {
        ErrorResponse response = new ErrorResponse(
            ErrorCode.INVALID_INPUT,
            e.getBindingResult()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
```

## 7. 테스트 코드

### 7.1 테스트 클래스 및 메서드 명명 규칙
```java
class UserServiceTest {
    @Test
    void findById_존재하는_사용자ID_사용자정보_반환() {
        // given
        Long userId = 1L;
        given(userRepository.findById(userId))
            .willReturn(Optional.of(user));
            
        // when
        UserResponseDto result = userService.findById(userId);
        
        // then
        assertThat(result.getId()).isEqualTo(userId);
    }
    
    @Test
    void findById_존재하지_않는_사용자ID_예외발생() {
        // given
        Long userId = 999L;
        given(userRepository.findById(userId))
            .willReturn(Optional.empty());
            
        // when & then
        assertThatThrownBy(() -> userService.findById(userId))
            .isInstanceOf(UserNotFoundException.class);
    }
}
```

### 7.2 테스트 데이터 생성
```java
public class UserTestFactory {
    public static User createUser() {
        return User.builder()
            .email("test@example.com")
            .password("password123!")
            .name("Test User")
            .build();
    }
    
    public static CreateUserRequestDto createUserRequestDto() {
        return CreateUserRequestDto.builder()
            .email("test@example.com")
            .password("password123!")
            .name("Test User")
            .build();
    }
}
```

## 8. 로깅

### 8.1 로그 레벨 사용
```java
@Slf4j
public class UserService {
    public User findById(Long id) {
        log.debug("Finding user by id: {}", id);
        
        return userRepository.findById(id)
            .orElseThrow(() -> {
                log.error("User not found with id: {}", id);
                return new UserNotFoundException(id);
            });
    }
}
```

### 8.2 로그 포맷
```java
// Good
log.info("User {} has been created successfully", user.getId());
log.error("Failed to create user: {}", ex.getMessage(), ex);

// Bad
log.info("User " + user.getId() + " has been created successfully");
log.error("Failed to create user: " + ex.getMessage());
```

## 9. 보안

### 9.1 비밀번호 처리
```java
@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    
    public void updatePassword(Long userId, String newPassword) {
        User user = findById(userId);
        
        // 비밀번호 유효성 검사
        validatePassword(newPassword);
        
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.updatePassword(encodedPassword);
    }
}
```

### 9.2 API 보안
```java
@RestController
@RequestMapping("/api")
public class UserController {
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<UserResponseDto> getAllUsers() {
        return userService.findAll();
    }
    
    @PreAuthorize("#userId == authentication.principal.id")
    @PutMapping("/users/{userId}")
    public UserResponseDto updateUser(
        @PathVariable Long userId,
        @RequestBody UpdateUserRequestDto dto
    ) {
        return userService.updateUser(userId, dto);
    }
}
```

## 10. 추천 사항

### 10.1 Lombok 사용 규칙
```java
// Entity
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    // Setter 대신 명시적인 메서드 사용
    public void updateProfile(String name) {
        this.name = name;
    }
}

// DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {
    private Long id;
    private String email;
    private String name;
}
```

### 10.2 Stream API 사용
```java
// Good
List<UserResponseDto> dtos = users.stream()
    .filter(user -> user.getStatus() == UserStatus.ACTIVE)
    .map(UserMapper::toDto)
    .collect(Collectors.toList());

// Bad
List<UserResponseDto> dtos = new ArrayList<>();
for (User user : users) {
    if (user.getStatus() == UserStatus.ACTIVE) {
        dtos.add(UserMapper.toDto(user));
    }
}
```

### 10.3 Optional 사용
```java
// Good
public User findById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
}

// Bad
public User findById(Long id) {
    User user = userRepository.findById(id);
    if (user == null) {
        throw new UserNotFoundException(id);
    }
    return user;
}
```

### 10.4 상수 정의
```java
public class UserConstants {
    public static final int MAX_NAME_LENGTH = 50;
    public static final int MIN_PASSWORD_LENGTH = 8;
    public static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    
    private UserConstants() {
        throw new AssertionError("No instances for you!");
    }
}
```

### 10.5 빌더 패턴 사용
```java
// Entity 생성
User user = User.builder()
    .email("test@example.com")
    .password(encodedPassword)
    .name("Test User")
    .build();

// DTO 생성
UserResponseDto dto = UserResponseDto.builder()
    .id(user.getId())
    .email(user.getEmail())
    .name(user.getName())
    .build();
```

### 10.6 Enum 활용
```java
public enum UserStatus {
    ACTIVE("활성"),
    INACTIVE("비활성"),
    BLOCKED("차단됨");
    
    private final String description;
    
    UserStatus(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
}
```

### 10.7 유효성 검사
```java
@Validated
@Service
public class UserService {
    public UserResponseDto createUser(
        @Valid CreateUserRequestDto dto
    ) {
        validateBusinessLogic(dto);
        // ...
    }
    
    private void validateBusinessLogic(CreateUserRequestDto dto) {
        // 비즈니스 규칙 검증
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateEmailException(dto.getEmail());
        }
    }
}

@Getter
@NoArgsConstructor
public class CreateUserRequestDto {
    @Email
    @NotBlank
    private String email;
    
    @NotBlank
    @Size(min = 8, max = 20)
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$")
    private String password;
    
    @NotBlank
    @Size(max = 50)
    private String name;
}
```

## 11. 도구 설정

### 11.1 기본 설정
- .editorconfig 파일로 기본 설정
```editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = tab
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true
max_line_length = 120
```

### 11.2 IDE 설정
- Eclipse, IntelliJ, VSCode 모두 동일한 설정 적용
- Checkstyle 플러그인 설치 및 설정
- SonarLint 플러그인 설치 및 설정

### 11.3 Git 설정
```bash
# 줄바꿈 설정
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # Mac/Linux

# 파일 모드 변경 무시
git config --global core.filemode false
```
