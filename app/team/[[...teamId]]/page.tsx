interface PageProps {
  params: { teamId?: string[] };
}

export default function Page({ params }: PageProps) {
  return <div>my team: {params.teamId?.join("/")}</div>;
}
