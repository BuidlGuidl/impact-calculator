import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { SaveIcon } from "./SaveIcon";
import { useAccount } from "wagmi";
import { VectorList } from "~~/app/types/data";
import { useGlobalState } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

export const SaveList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);
  const { selectedVectors } = useGlobalState();
  const [isSaving, setIsSaving] = useState(false);
  const { address } = useAccount();

  const openModal = () => {
    modalRef.current?.showModal();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const body: VectorList = {
      creator: address as string,
      title,
      description,
      vectors: selectedVectors,
    };

    const res = await fetch("/api/lists", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSaving(false);
    if (res.ok) {
      notification.success("List saved.");
      setTitle("");
      setDescription("");
    } else {
      notification.error("List not saved. Please try again.");
    }
    closeModal();
  };
  const handleClose = () => {
    setTitle("");
    setDescription("");
    closeModal();
  };
  const readyToSave = title.length > 0;

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Save List</h3>
          <p className="py-4">
            Save your selected Impact Vectors and weights so that you can reference this combination in the future.
          </p>
          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  disabled={isSaving}
                  value={title}
                  onChange={handleChangeTitle}
                  type="text"
                  placeholder="Github Activity"
                  className="input input-bordered w-full input-sm"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <textarea
                  disabled={isSaving}
                  value={description}
                  onChange={handleChangeDescription}
                  placeholder="Projects ranked only by Github stats, prioritizing recent growth in contributors"
                  className="textarea textarea-bordered textarea-md"
                />
              </label>
              <div className="flex justify-end mt-4">
                <button onClick={handleSave} disabled={!readyToSave || isSaving} className="btn btn-primary">
                  {isSaving ? <span className="loading loading-spinner loading-sm"></span> : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <button onClick={openModal} className="btn btn-sm mr-2">
        <SaveIcon />
        Save List
      </button>
    </>
  );
};
