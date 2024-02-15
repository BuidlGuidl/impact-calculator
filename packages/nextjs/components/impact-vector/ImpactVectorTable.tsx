import ImpactTableHeader from "./table-components/ImpactTableHeader";
import { BsCheck } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { useGlobalState } from "~~/services/store/store";

const ImpactVectorTable = () => {
  const { selectedVectors, setSelectedVectors } = useGlobalState();

  const handleRangeChange = (index: number, newValue: number) => {
    const updatedSelectedVectors = selectedVectors.map((vector, i) =>
      i === index ? { ...vector, weight: newValue } : vector,
    );
    setSelectedVectors(updatedSelectedVectors);
  };

  const handleRemoveVector = (vectorName: string) => {
    const updatedSelectedVectors = selectedVectors.filter(vector => vector.name !== vectorName);
    setSelectedVectors(updatedSelectedVectors);
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead className="">
          <ImpactTableHeader />
        </thead>
        <tbody className="divide-y divide-gray-300 ">
          {selectedVectors.map((vector, index) => (
            <tr key={index}>
              <td className="px-2 md:px-4 py-2 sm:py-3 ">
                <div className="flex items-center cursor-pointer w-5 h-5 border border-[#7F56D9] rounded-lg">
                  <BsCheck size={24} className="text-[#7F56D9]" />
                </div>
              </td>
              <td className="py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm ">
                <div className="flex flex-col ">
                  <span className="font-semibold">{vector.name.split(":")[1].substring(1)}</span>
                  <span className="text-gray-500">{vector.name}</span>
                </div>
              </td>
              <td className="px-3 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-sm ">
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max="100"
                    value={vector.weight}
                    className="range range-primary range-xs  w-full bg-[#F9F5FF] h-2"
                    onChange={e => handleRangeChange(index, parseInt(e.target.value, 10))}
                  />
                  <span>{vector.weight}</span>
                </div>
              </td>
              <td className="pr-2 lg:pr-6 py-2 sm:py-4 whitespace-nowrap ">
                <div className="grid gap-2 items-center justify-end grid-flow-col">
                  <div className="flex gap-1 sm:gap-3 ">
                    <button className="w-[20px]">
                      <FiTrash2 size={20} onClick={() => handleRemoveVector(vector.name)} />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ImpactVectorTable;
