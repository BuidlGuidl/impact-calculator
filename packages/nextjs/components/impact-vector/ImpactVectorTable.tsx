import { useState } from "react";
import ImpactTableHeader from "./table-components/ImpactTableHeader";
import ImpactTableRow from "./table-components/ImpactTableRow";
import { IFilter, SelectedVector } from "~~/app/types/data";
import { useGlobalState } from "~~/services/store/store";

const ImpactVectorTable = () => {
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

  const onFilteredChange = (newFilters: IFilter[], index: number) => {
    const updatedSelectedVectors = selectedVectors.map((vector, i) =>
      i === index ? { ...vector, filters: newFilters } : vector,
    );
    setSelectedVectors(updatedSelectedVectors);

    if (sortBy === "weight") {
      setSortBy(undefined);
      setSortDesc(true);
    }
  };
  return (
    <>
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead className="">
          <ImpactTableHeader sortDesc={sortDesc} setSortDesc={setSortDesc} sortBy={sortBy} setSortBy={setSortBy} />
        </thead>
        <tbody className="divide-y divide-gray-300 ">
          {sortedVectors.map((vector, index) => {
            return (
              <ImpactTableRow
                key={vector.name}
                vector={vector}
                updateWeight={updateVectorWeight(index)}
                onFilteredChange={(newFilters: IFilter[]) => onFilteredChange(newFilters, index)}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ImpactVectorTable;
