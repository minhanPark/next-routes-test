interface PageProps {
  params: { slug: string[] };
}

export default function Page({ params }: PageProps) {
  return <div>my post: {params.slug.join("/")}</div>;
}
