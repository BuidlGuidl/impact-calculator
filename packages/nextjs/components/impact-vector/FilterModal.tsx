import { useRef } from "react";
import { SearchBar } from "./SearchBar";
import { FunnelIcon } from "@heroicons/react/24/outline";

const FilterModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleOutsideClick: React.MouseEventHandler<HTMLDialogElement> = e => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <>
      <div onKeyDown={handleKeyDown} className="lg:mr-5 flex justify-end">
        <button
          onClick={openModal}
          className="btn items-center btn-sm rounded-md border-opacity-20 outline-none font-light border-stone-500"
        >
          <span className="flex-row flex items-center whitespace-nowrap justify-center gap-x-1 text-sm">
            <FunnelIcon className="w-5 h-4" />
            Set filter
          </span>
          <span className="badge badge-xs rounded-[0.3rem] bg-slate-500 text-xs text-white p-1 py-2 h-[0.01rem]">
            0
          </span>
        </button>
      </div>

      <dialog role="dialog" ref={modalRef} className="modal" onClick={handleOutsideClick}>
        <div className="modal-box min-h-[300px] relative">
          <SearchBar placeholder="Search filters or presets" />

          <div className="modal-action"></div>
        </div>
      </dialog>
    </>
  );
};

export default FilterModal;
