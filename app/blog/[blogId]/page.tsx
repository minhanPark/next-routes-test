import Link from "next/link";

interface PageProps {
  params: { blogId: string };
}

export default async function Page({ params }: PageProps) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.blogId}`
  );
  const data = await res.json();
  return (
    <>
      <div>my post: {params.blogId}</div>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <div>
        <Link href={`/blog/${Number(params.blogId) + 1}`}>다음 페이지</Link>
      </div>
    </>
  );
}
