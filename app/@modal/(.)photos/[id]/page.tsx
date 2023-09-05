import Frame from "@/app/components/Frame";
import Modal from "@/app/components/Modal";
import swagPhoto, { Photo } from "@/app/photos";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const photos = swagPhoto;
  const photo: Photo = photos.find((p) => p.id === photoId)!;

  return (
    <Modal>
      <Frame photo={photo} />
    </Modal>
  );
}
