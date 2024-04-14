import { useRef, useState } from "react";
import { SelectInput } from "./inputs/select";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IFilter, SelectedVector } from "~~/app/types/data";

const FilterModal = ({ vector, onFiltered }: { vector: SelectedVector; onFiltered: (filters: IFilter[]) => void }) => {
  const [localFilters, setLocalFilters] = useState<IFilter[]>(vector.filters || []);

  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };

  const onFilterApply = () => {
    onFiltered(localFilters);
    closeModal();
  };
  const clearAll = () => {
    setLocalFilters([]);
  };
  const onFilterDelete = (index: number) => {
    setLocalFilters(current => [...current.slice(0, index), ...current.slice(index + 1)]);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === "Escape") {
      setLocalFilters(vector.filters || []);
      closeModal();
    }
  };

  const handleOutsideClick: React.MouseEventHandler<HTMLDialogElement> = e => {
    if (e.target === modalRef.current) {
      setLocalFilters(vector.filters || []);
      closeModal();
    }
  };

  const onAddFilterClick = () => {
    setLocalFilters(current => [...current, { action: "include", condition: "==", value: "" }]);
  };

  const onUpdateFilter = (newValue: IFilter, index: number) => {
    setLocalFilters(current => [...current.slice(0, index), newValue, ...current.slice(index + 1)]);
  };

  return (
    <>
      <div onKeyDown={handleKeyDown} className="lg:mr-5 flex justify-end">
        <button className="w-[10px]">
          <PiSlidersHorizontalBold size={20} onClick={() => openModal()} />
        </button>
      </div>

      <dialog role="dialog" ref={modalRef} className="modal" onClick={handleOutsideClick}>
        <div className="modal-box min-h-[400px] min-w-[600px] flex flex-col relative">
          <h3 className="font-bold text-lg justify-between">{vector.name}</h3>
          <IoClose
            className="absolute right-4"
            size={24}
            onClick={() => {
              setLocalFilters(vector.filters || []);
              closeModal();
            }}
          ></IoClose>
          <div className="modal-content min-h-[100%]  flex justify-between flex-col flex-grow">
            <div className="modal-content min-h-[100%] flex-col mt-2">
              {localFilters.map((item, i) => (
                <FilterItem
                  onChange={arg => onUpdateFilter(arg, i)}
                  item={item}
                  key={i}
                  onDelete={() => onFilterDelete(i)}
                />
              ))}
              <button
                className="flex items-center text-primary font-[600] "
                onClick={() => onAddFilterClick()}
                type="button"
              >
                <FiPlus /> <span className="ml-2">Add filter</span>
              </button>
            </div>
          </div>
          <div className="modal-action flex justify-between bottom-0">
            <button className="btn btn-secondary btn-md w-[50%]" onClick={clearAll} type="button">
              Clear all
            </button>
            <button className="btn btn-primary btn-md w-[50%]" onClick={onFilterApply}>
              Apply
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

interface IFilterItemProps {
  item: IFilter;
  onChange: (arg: IFilter) => void;
  onDelete: () => void;
}
const FilterItem = ({ item, onChange, onDelete }: IFilterItemProps) => {
  return (
    <div className="modal-content min-h-[100%] gap-2 flex-grow flex items-center flex-row mb-2">
      <SelectInput
        value={item.action}
        onChange={(value: string) => {
          onChange({ ...item, action: value as "include" | "exclude" | "multiply" });
        }}
        name={"action"}
        placeholder={"Action"}
        options={[
          {
            value: "include",
            label: "Include",
          },
          {
            value: "exclude",
            label: "Exclude",
          },
          {
            value: "multiply",
            label: "Multiply",
          },
        ]}
      />
      <p>{item.action != "multiply" ? "where" : "by"}</p>

      {item.action != "multiply" ? (
        <SelectInput
          value={item.condition}
          onChange={(value: string) => {
            onChange({ ...item, condition: value });
          }}
          name={"exactValue"}
          placeholder={"is equal to"}
          options={[
            {
              value: "==",
              label: "equal to",
            },
            {
              value: "!=",
              label: "not equal to",
            },
            {
              value: ">",
              label: "greater than",
            },
            {
              value: "<",
              label: "less than",
            },
            {
              value: ">=",
              label: "greater or equal to",
            },
            {
              value: "<=",
              label: "less or equal to",
            },
            {
              value: "<>",
              label: "is between",
            },
          ]}
        />
      ) : (
        <></>
      )}
      <input
        type="number"
        className=" max-w-[60px] pl-2 p-0 input input-info input-bordered bg-secondary focus:outline-none border border-neutral hover:border-gray-400 rounded-xl text-neutral-500"
        placeholder="0"
        onChange={e => {
          onChange({ ...item, value: e.target.value });
        }}
        value={item.value}
      />
      {item.condition == "<>" ? (
        <>
          <p>and</p>
          <input
            type="number"
            className=" max-w-[60px] pl-2 p-0  input input-info input-bordered bg-secondary focus:outline-none border border-neutral hover:border-gray-400 rounded-xl text-neutral-500"
            placeholder="0"
            onChange={e => {
              onChange({ ...item, value: e.target.value });
            }}
            value={item.value}
          />
        </>
      ) : (
        <></>
      )}
      <div className="flex-grow justify-end flex items-center">
        <button className="w-[20px]">
          <FiTrash2 size={20} onClick={() => onDelete()} />
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
