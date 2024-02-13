import ImpactVectorCard from "./ImpactVectorCard";
import impactVectorJson from "~~/public/data/ImpactVectors.json";

const ImpactVectorDisplay = () => {
  return (
    <div
      className="max-h-[700px] overflow-y-auto
scrollbar-none "
    >
      {/* this is hard coded for now */}
      {impactVectorJson.map((vector, index) => (
        <ImpactVectorCard
          key={index}
          name={vector.split(":")[1]}
          description=" This impact vector measures the growth and activity levels of users within the optimism ecosystem
             "
          username="chatgpt"
        />
      ))}
    </div>
  );
};

export default ImpactVectorDisplay;
