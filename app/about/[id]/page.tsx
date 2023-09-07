interface Params {
  id: string;
}

export default function Page({ params }: { params: Params }) {
  return (
    <div className="">
      <div className="">[id]: {params.id}</div>
    </div>
  );
}
