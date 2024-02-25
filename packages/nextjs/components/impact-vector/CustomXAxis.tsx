import Image from "next/image";

interface CustomXAxisProps {
  x: number;
  y: number;
  hovered: string | null;
  payload?: any;
}

const CustomXAxisTick: React.FC<CustomXAxisProps> = ({ x, y, hovered, payload }) => {
  const name = payload && payload.value.split("===")[0];
  const isHovered = hovered === name;
  const imageUrl = payload && payload.value.split("===")[1];

  if (imageUrl)
    return (
      <foreignObject
        className={`duration-100 ${isHovered ? "z-[1000000000]" : "z-0"} h-[55px]`}
        x={isHovered ? x - 22.5 : x}
        y={y}
        width={isHovered ? "45px" : "7px"}
        height={isHovered ? "45px" : "7px"}
      >
        <Image
          width={isHovered ? 45 : 7}
          height={isHovered ? 45 : 7}
          src={imageUrl}
          style={{ borderRadius: "50%", marginTop: isHovered ? "8px" : "0px" }}
          alt={name}
        />
      </foreignObject>
    );
};

export default CustomXAxisTick;
