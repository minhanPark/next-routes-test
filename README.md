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

## Intercepting Routes

[예시보기](https://nextgram.vercel.app/)  
[예시 코드 보기](https://github.com/vercel-labs/nextgram)

여기서 하는거 따라하고 있는데 에러가 뜬다.
