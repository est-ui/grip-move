---
name: grip-move-design-system
description: 그립앤무브(Grip & Move) 골프 클래스의 고정 디자인 시스템 — 컬러 토큰, Paperlogy 서체, Bootstrap 기반 레이아웃 패턴(스티키 헤더, 히어로, 아코디언, 통계 카운터, 탭, 카드 그리드, 하단 아이콘 내비게이션, mailto 문의 폼)과 재사용 가능한 CSS/JS/vendor 자산을 담고 있다. 이 브랜드(그립앤무브, 송세환 코치, 골프 클래스)를 위한 새 상세페이지·랜딩페이지·소개페이지 등 어떤 HTML 페이지를 만들거나 기존 페이지를 수정할 때는 반드시 이 스킬을 먼저 확인하고, 여기 정의된 컬러/폰트/컴포넌트 패턴을 그대로 재사용해야 한다. "새 클래스 상세페이지 만들어줘", "이벤트 페이지 하나 더", "이 브랜드로 랜딩페이지" 같은 요청뿐 아니라, 페이지 일부만 손보는 요청(문의 폼 수정, 카드 섹션 추가 등)에도 적용한다. 사용자가 명시적으로 다른 디자인을 요청하지 않는 한 임의로 새로운 컬러나 폰트를 쓰지 않는다.
---

# 그립앤무브 디자인 시스템

그립앤무브(골프 코치 송세환이 운영하는 골프 클래스)의 모든 웹페이지가 따라야 할 고정 디자인 시스템이다. `그립앤무브_템플릿랜딩/` 페이지에서 확정된 버전이 기준이며, 이 스킬은 그 산출물을 재사용 가능한 형태로 패키징한 것이다.

이 시스템을 쓰는 이유: 페이지마다 컬러·폰트·컴포넌트가 제각각이면 브랜드가 흔들린다. 이미 검증된 톤(차분한 그린 + 골드 포인트, 둥글둥글한 Paperlogy 서체, 과장 없는 카피)을 계속 재사용해야 사용자가 여러 페이지를 만들어도 하나의 브랜드로 보인다.

## 1. 컬러 토큰

라이트/다크 모드 모두 정의되어 있다. 새 페이지를 만들 때도 아래 CSS 변수를 그대로 가져다 쓴다 (직접 값 만들지 말 것).

```css
:root{
  --bg:#f6f3e9;        /* 배경 (아이보리) */
  --surface:#ffffff;    /* 카드/패널 배경 */
  --surface-2:#eee9d9;  /* 카드 안의 보조 배경 (뱃지, info-table 등) */
  --ink:#16241c;        /* 본문/헤딩 색 (짙은 포레스트 블랙) */
  --muted:#5c6b5c;      /* 보조 텍스트 */
  --accent:#2f6b4f;     /* 메인 그린 (버튼, 링크, 포인트) */
  --accent-2:#1f4e3a;   /* 그린 그라디언트 짝 (accent보다 어두움) */
  --accent-ink:#ffffff; /* accent 배경 위의 텍스트 색 */
  --gold:#b8892f;       /* 골드 포인트 (뱃지, hover, 강조 단어) */
  --line:#dcd5bf;       /* 보더/구분선 */
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#10170f; --surface:#182018; --surface-2:#1f291d;
    --ink:#efe9d8; --muted:#9aa896; --accent:#5ea886; --accent-2:#2c4a3a;
    --accent-ink:#0d1710; --gold:#e0b64f; --line:#2b3327;
  }
}
:root[data-theme="dark"]{ /* 위와 동일한 값 — 명시적 다크모드 토글용 */ }
```

새 섹션을 추가할 때 하드코딩된 hex를 쓰지 말고 반드시 이 변수를 참조한다. 그래야 다크모드가 계속 작동한다.

## 2. 타이포그래피 — Paperlogy

폰트는 **페이퍼로지(Paperlogy)** 로 고정한다. 다른 한글 폰트(노토산스, Pretendard 등)로 바꾸지 않는다.

```html
<!-- head 안에 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

```css
@import url("https://cdn.jsdelivr.net/gh/fonts-archive/Paperlogy/Paperlogy.css");
html, body{
  font-family: 'Paperlogy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

- 이 `@import`는 `assets/css/golf-agency.css` 최상단에 이미 들어있다. 새 CSS 파일을 만드는 대신 가능하면 `golf-agency.css`를 그대로 링크한다.
- 헤딩(h1~h3)은 `font-weight:700~800`으로 굵게, 본문은 400~500을 쓴다.
- 숫자/라벨(통계, 기간 뱃지, STEP 번호 등)에는 살짝 다른 결로 `JetBrains Mono`를 써도 되지만, 굳이 로드할 필요는 없다 — 지금 시스템은 Paperlogy 하나로 통일되어 있다. 과거 버전(소개페이지.html 등)에서 쓰던 Fraunces/Source Sans/Noto Sans 조합은 더 이상 쓰지 않는다.

## 3. 페이지 뼈대 (섹션 패턴)

`templatemo 591 villa agency` 템플릿의 레이아웃 문법을 가져와 골프 브랜드로 재구성한 구조다. 페이지 성격에 따라 필요한 섹션만 골라 쓰면 되고, 모든 섹션을 다 넣을 필요는 없다.

| 섹션 | 역할 | 언제 쓰나 |
|---|---|---|
| `sub-header` | 상단 얇은 바, 이메일·역할 표시 | 모든 페이지 상단 |
| `header-area header-sticky` | 로고 + 내비 + CTA, 스크롤 시 배경 생김(`background-header`) | 모든 페이지 |
| `main-banner` (owl-carousel) | 큰 헤드라인 히어로, 그린 그라디언트 배경 + SVG 타겟/깃발 그래픽 | 랜딩/메인 페이지 |
| `featured` (accordion + info-table) | FAQ/가치 제안 + 아이콘 4개 요약 | 설득이 필요한 섹션 |
| `fun-facts` (counter) | 숫자 카운터 애니메이션 | **실제 보유한 수치만** (클래스 수, 대회 입상 횟수 등) — 지어내지 않는다 |
| `video` + `video-frame.coach-panel` | 그라디언트 배경 위 코치 인용구 패널 (가짜 영상/재생버튼 쓰지 않음) | 코치 소개 |
| `best-deal` (nav-tabs) | 소수 항목(2~3개)을 탭으로 스포트라이트 | 대표 상품 비교 |
| `properties` (card grid) | 전체 항목 카드 그리드, 각 카드 상세페이지로 링크 | 클래스 목록 등 |
| `process-grid` | 번호 붙은 단계 카드 | **진짜 순서가 있는 절차**일 때만 (STEP 01~04 등) |
| `contact` + `contact-content` | 그라디언트 밴드 + mailto 문의 폼 | 문의/CTA 섹션 |
| `bottom-nav` | 화면 하단에 떠 있는 작은 원형 아이콘 내비게이션 | 모든 페이지 (섹션 5개 이하 추천) |

전체 예시는 `assets/index-reference.html` (그립앤무브_템플릿랜딩/index.html의 사본)을 참고한다.

## 4. 컴포넌트 규칙

- **이미지 대신 SVG**: 실제 사진 자산이 없으므로 부동산 템플릿의 스톡사진을 쓰지 않는다. 대신 `--accent`→`--accent-2` 그라디언트 배경 위에 동심원(타겟) + 깃발 + 점선 궤적으로 이루어진 인라인 SVG를 카드/히어로 비주얼로 반복 사용한다. 색만 바꿔 변주를 준다.
- **아이콘**: Font Awesome 6 Free (`fa fa-xxx` 클래스)만 쓴다. 이모지를 아이콘으로 쓰지 않는다.
- **버튼은 실제로 동작해야 한다**: 장식용 `href="#"` 버튼을 만들지 않는다. 실제 링크(다른 페이지, 섹션 앵커)가 없다면 `mailto:gng1013@hrdncs.co.kr`로 연결하거나, 문의 폼처럼 JS로 mailto 링크를 만들어 이메일 앱이 뜨게 한다 (`assets/js/golf-custom.js`의 `contact-form` 서브밋 핸들러 참고). 백엔드가 없는데 있는 척하는 `action="#"` 폼 제출을 가짜로 처리하지 않는다.
- **통계/후기/자격 조작 금지**: 카운터 숫자, 수강 후기, 수상 실적은 사용자가 실제로 알려준 값만 쓴다. 모르면 물어보거나 섹션을 뺀다.
- **번호 매기기는 진짜 순서일 때만**: STEP 01~04, WEEK 01~04처럼 숫자를 붙이는 건 실제로 순서가 있는 내용일 때만 (예: 등록 절차, 주차별 커리큘럼). 단순 목록에 억지로 번호를 붙이지 않는다.
- **하단 내비게이션**: 화면을 가리지 않도록 아이콘만 있는 작은 원형 pill 형태로, 스크롤 260px 이상일 때만 나타난다(`is-visible` 클래스, `golf-custom.js`의 scroll 핸들러). 라벨은 hover 시 툴팁으로만 보여준다. 현재 스크롤 위치에 맞는 항목이 자동으로 활성화된다(scrollspy).

## 5. 톤 & 카피 가이드

- 과장 금지: "누구나 싱글", "최고의 전문가" 같은 결과를 보장하는 표현을 쓰지 않는다.
- 진행자 소개, 클래스 커리큘럼, 지도 철학(힘 빼는 법 / 어드레스 / 힘주는 구간 인식 등)은 이미 확정된 내용이 있으면 그것을 재사용하고, 새로 지어낼 때는 사용자에게 확인한다.
- 문의 연락처는 `gng1013@hrdncs.co.kr` (송세환)로 고정.

## 6. 새 페이지 만드는 법

1. 새 HTML 파일을 만들 위치를 정한다. 이 스킬의 `assets/`, `vendor/` 폴더를 새 페이지 옆에 복사하거나(독립 폴더로 만들 때), 이미 자산이 있는 `그립앤무브_템플릿랜딩/` 폴더 안에 페이지를 추가하고 상대경로로 기존 `assets/`, `vendor/`를 재사용한다 (에셋을 중복 복사하지 않는 쪽을 우선한다).
2. `<head>`에 Bootstrap CSS → `assets/css/fontawesome.css` → `assets/css/owl.css` → `assets/css/golf-agency.css` 순서로 링크한다 (이 순서가 캐스케이드 우선순위에 중요하다).
3. `<body>` 끝에 jQuery → Bootstrap JS → `owl-carousel.js`(캐러셀 쓸 때만) → `counter.js`(통계 카운터 쓸 때만) → `golf-custom.js` 순서로 스크립트를 넣는다.
4. `golf-custom.js`의 스크롤스파이는 `document.getElementById(id)`로 섹션을 찾는 방식이라, **섹션 id 배열(`sectionIds`)을 새 페이지의 실제 섹션 id에 맞게 고쳐야 한다** — 안 고치면 하단 내비 active 상태가 틀어진다.
5. 섹션은 위 "3. 페이지 뼈대" 표에서 그 페이지에 필요한 것만 골라 조합한다. 참고용 전체 구현은 `assets/index-reference.html`에 있다.
6. 새로 만든 페이지는 꼭 Bash로 로컬 정적 서버(`python -m http.server`)를 띄우고 Browser 도구로 스크롤/클릭까지 확인한다 — `file://`로 직접 열면 상대경로 리소스가 깨질 수 있다는 걸 이미 이번 프로젝트에서 겪었다.

## 7. 번들 자산

```
assets/
  css/golf-agency.css   ← 메인 스타일시트 (컬러/폰트/컴포넌트 전부 포함)
  css/fontawesome.css
  css/owl.css
  js/golf-custom.js     ← 스티키헤더, 캐러셀 init, 스무스스크롤, scrollspy, mailto 폼
  js/owl-carousel.js
  js/counter.js
  webfonts/              ← Font Awesome 웹폰트
  index-reference.html   ← 전체 패턴이 적용된 참고용 완성 페이지
vendor/
  bootstrap/             ← 그리드, 아코디언, 탭 collapse 기능
  jquery/
```
