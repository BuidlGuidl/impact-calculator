import ImpactTableHeader from "./table components/ImpactTableHeader";
import ImpactTableRow from "./table components/ImpactTableRow";

const ImpactVectorTable = () => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead className="">
          <ImpactTableHeader />
        </thead>
        <tbody className="divide-y divide-gray-300 ">
          <ImpactTableRow />.
        </tbody>
      </table>
    </>
  );
};

export default ImpactVectorTable;
