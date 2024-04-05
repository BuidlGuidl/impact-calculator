import { useRef, useState } from "react";
import { SearchBar } from "./SearchBar";
import ImpactTableHeader from "./table-components/ImpactTableHeader";
import ImpactTableRow from "./table-components/ImpactTableRow";
import { FiSearch } from "react-icons/fi";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { SelectedVector } from "~~/app/types/data";
import { useGlobalState } from "~~/services/store/store";

const ImpactVectorTable = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { selectedVectors, setSelectedVectors } = useGlobalState();
  const [sortDesc, setSortDesc] = useState(true);
  const [sortBy, setSortBy] = useState<keyof SelectedVector>();

  const updateVectorWeight = (index: number) => (newWeight: number) => {
    const updatedSelectedVectors = selectedVectors.map((vector, i) =>
      i === index ? { ...vector, weight: newWeight } : vector,
    );
    setSelectedVectors(updatedSelectedVectors);

    if (sortBy === "weight") {
      setSortBy(undefined);
      setSortDesc(true);
    }
  };

  const sortedVectors = selectedVectors.sort((a, b) => {
    if (!sortBy) return 0;

    const nameA = a[sortBy];
    const nameB = b[sortBy];
    if (nameA < nameB) {
      return sortDesc ? 1 : -1;
    }
    if (nameA > nameB) {
      return sortDesc ? -1 : 1;
    }
    return 0;
  });

  // modal for vector info
  const openModal = () => {
    modalRef.current?.showModal();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="btn items-center btn-sm rounded-md border-opacity-20 border-stone-500 py-1"
        >
          <span className="flex-row flex items-center whitespace-nowrap gap-1">
            <FunnelIcon className="w-5 h-5" />
            Set filter
          </span>
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead className="">
          <ImpactTableHeader sortDesc={sortDesc} setSortDesc={setSortDesc} sortBy={sortBy} setSortBy={setSortBy} />
        </thead>
        <tbody className="divide-y divide-gray-300 ">
          {sortedVectors.map((vector, index) => (
            <ImpactTableRow key={vector.name} vector={vector} updateWeight={updateVectorWeight(index)} />
          ))}
        </tbody>
      </table>

      {/* modal */}
      <>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box min-h-[300px] relative">
            <p className="whitespace-nowrap flex gap-4 text-sm opacity-60 top-0 absolute left-3 items-center">
              <FiSearch className="w-5 h-5" />
              Press &apos;/&apos; to search filters and &apos;@&apos; to search presets
            </p>

            <div className="modal-action">
              <form method="dialog" className="w-full">
                <button
                  onClick={handleClose}
                  className="btn btn-sm btn-circle outline-none btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
                <SearchBar placeholder="Search filters or presets" />
              </form>
            </div>
          </div>
        </dialog>
      </>
    </>
  );
};

export default ImpactVectorTable;
