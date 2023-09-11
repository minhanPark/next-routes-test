# Nextjs 라우팅 확인

## Dynamic Routes

- /blog/[blogId]/page.tsx
  > 위와 같은 형태는 아이디를 path를 알 수 있을 때 좋다.  
  > params: {blogId: 1} 형태로 받을 수 있음
- /blog/[...slug]/page.tsx
  > path가 어디까지 이어질 지 모를 때 사용 가능  
  > params: {slug: ["배열", "형태로 들어옴"]}
- /blog/[...slug]/page.tsx
  > 위에는 옵셔널하게 안들어와도 에러를 안띄운다.  
  > /blog 접속 시에도 페이지를 잡는다

## Loading

- 로딩은 Soft Navigation 일 때 발생한다.
- 파일명은 loading.tsx이다.

## Error Handling

- 파일명은 error.tsx이다
- layout 아래로 nesting이 된다. 즉 해당 폴더의 layout에서 발생한 에러는 잡지 못하고 그 윗폴더의 error.tsx가 잡게 된다.
- global-error.tsx를 사용하면 레이아웃도 잡을 수 있음. 또한 App 디렉토리의 레이아웃에서 발생하는 에러를 잡기 위해선 global-error.tsx가 필수이다.

## Parallel Routes & Intercepting Routes

Parallel Routes은 동일한 url에서 조건에 따른 페이지를 보여주거나 컨텍스트를 유지한 채 모달을 보여줄 수 있다.

> 위와 같이 모달을 보여주려면 slot을 만들어야 하는데 해당 컨벤션은 @폴더이름 이다.

1. url을 통해 모달 콘텐츠를 공유할 수 있게 만들기
2. 페이지가 새로 고쳐질 때 모달을 닫는 대신 컨텍스트 유지
3. 이전 경로로 이동하지 않고 뒤로 탐색할 때 모달 닫기
4. 앞으로 탐색할 때 모달 다시 열기

그렇게 모달을 만들면 위와 같이 4개를 해결할 수 있다.

[예시보기](https://nextgram.vercel.app/)  
[예시 코드 보기](https://github.com/vercel-labs/nextgram)

- intercepting routing은 무엇을 할까?

모달을 링크 공유했을 때는 실제 해당 페이지로 이동하려면 거기에 맞는 주소로 페이지를 만들어야 하는데 이때 모달 & 페이지가 동시에 보여지게 된다.  
그럴 때 soft navigation 일때는 인터셉트해서 실제 페이지로는 이동하지 않게 한다. 또한 hard navigation 일때는 인터셉트하지 않고 실제 페이지로 이동하게 한다.

> 인터셉터 하는 (.)photos와 photos 폴더의 위치를 보자. 둘을 비교할 때 (.)photos는 한단계 아래 폴더인것 같지만  
> @modal은 세그먼트가 아니고 slot이라 포함되지 않고 같은 선상에 있다고 (.)를 썼다.

## Middleware

- 예전에는 미들웨어가 폴더마다 생겼는데, 이제는 파일 하나로만 되어 있다.
- 파일의 위치는 app 디렉토리랑 같은 위치에 있어야 한다.

```ts
export function middleware(request: NextRequest) {
  // 미들웨어 내부에서 조건절을 통해서 로직을 분리할 수 있다.
  if (request.nextUrl.pathname.startsWith("/about")) {
    // 보여지는 url에 내용은 다시 씀
    return NextResponse.rewrite(new URL("/about/1", request.url));
  }
}

// config를 통해서 matcher를 지정해서 미들웨어를 실행할 수 있다.
export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
```

- 미들웨어에서 NextResponse.next를 사용하면 설정 등을 추가한 뒤에 라우트로 보낼 수 있다.

```ts
if (request.nextUrl.pathname.startsWith("/api")) {
  const newResponseHeaders = new Headers(request.headers);
  newResponseHeaders.set("x-something", "hello world");

  const response = NextResponse.next({
    request: {
      headers: newResponseHeaders,
    },
  });
  response.cookies.set({
    name: "x-hi",
    value: "bye",
    path: "/",
  });
  return response;
}
```

이렇게 보내면 실제로 헤더에 쿠키를 받을 때는 아래처럼 받을 수 있음.

```ts
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const httpHeaders = headers();
  console.info("httpHeaders: ", httpHeaders.get("x-something"));
  console.info("request.headers: ", request.headers.get("x-something"));
  return NextResponse.json({ message: "/api/post" });
}
```

둘다 같은 헤더에 쿠키를 확인할 수 있는 방법이다.

## 프로젝트 구조

### private 폴더

기본적으로 app 디렉토리 내부의 폴더에 route 파일이나 page 파일을 만들지 않는다면 공개되지 않는다.  
하지만 명시적으로 private 폴더를 만들 수가 있는데, 이때는 \_폴더명 형태로 만들면 된다.  
그 폴더나 자식들의 route나 page 파일은 공개되지 않는다.

또한 이렇게 되면 생각할 수 있는 장점은

1. ui 로직과 라우팅 로직을 분리할 수 있음
2. 내부 파일을 일관되게 구성 가능
3. 코드 편집기에서 정렬 및 그룹화
4. 향후 Nextjs 파일 규칙과의 잠재적인 명명 충돌 방지  
   등을 생각할 수 있다.

### route 그룹

폴더를 괄호로 묶어서 경로 그룹을 만들 수 있다.

> (폴더이름)

폴더를 구분 및 정리할 때 사용하는 것이고 url 경로에 포함되서는 안된다는 것을 나타낸다.

1. 그룹으로 묶어서 의도나 팀 등으로 나눌 수 있다
2. 동일한 주소 안에서 레이아웃을 다르게 만들 수 있다.
3. 레이아웃을 추가해서 만들 수 있다.

### 모듈 경로 별칭

```ts
// before
import { Button } from "../../../components/button";

// after
import { Button } from "@/components/button";
```

위처럼 기본적으로 사용가능한데 이것은 tsconfig에 설정되어 있기 때문이다.

```json
"paths": {
      "@/*": ["./*"]
    }
```

모듈경로를 절대 경로로 생각하면 깊이 파고 들어갈 때 덜 헷갈리기도 하고 복사 붙여넣기 하기도 쉬워짐.

### 프로젝트 구성 전략

1. app 디렉토리를 순수하게 라우팅 목적으로만 이용하고 components 폴더나 lib 폴더 등은 프로젝트의 루트에 둔다.
2. components나 lib 등의 폴더 도 app 폴더 내부에 둔다.
3. 각 폴더마다 사용하는 components와 lib를 각각 두고 사용한다.

보통 3가지 전략으로 폴더를 구성하면 된다.
