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
