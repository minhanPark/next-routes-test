import Frame from "@/app/components/Frame";
import swagPhoto, { Photo } from "@/app/photos";

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo: Photo = swagPhoto.find((p) => p.id === id)!;

  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <Frame photo={photo} />
      </div>
    </div>
  );
}
