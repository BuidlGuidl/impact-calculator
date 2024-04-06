import React from "react";
import { SelectedVector } from "~~/app/types/data";
import { useGlobalState } from "~~/services/store/store";

const ImpactVectorListCard = ({
  title,
  description,
  vectors,
  creator,
}: {
  title: string;
  description: string;
  vectors: SelectedVector[];
  creator: string;
}) => {
  const { setSelectedVectors } = useGlobalState();

  return (
    <div
      onClick={() => setSelectedVectors(vectors)}
      className="mr-1  flex gap-2 flex-col cursor-pointer rounded-xl text-sm border-[0.2px] border-secondary-text/50 p-4 bg-base-300 my-2"
    >
      <h2 className=" m-0 font-bold">{title}</h2>

      <div className=" text-base-content-100 max-w-sm pr-4">
        <p className="m-0 p-0">{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
      </div>
      <p className="m-0 p-0">@{creator.slice(0, 7)}...</p>
    </div>
  );
};

export default ImpactVectorListCard;
