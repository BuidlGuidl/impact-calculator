interface CustomXAxisProps {
  x: number;
  y: number;
  image: any;
  hovered: string | null;
  payload: any;
}

const CustomXAxisTick: React.FC<CustomXAxisProps> = ({ x, y, hovered, image, payload }) => {
  const isHovered = payload && payload.value === hovered;
  return (
    <g transform={`translate(${x},${y})`} style={{ fontSize: 12, fill: "#333" }}>
      {isHovered && image && <image href={image} width={45} height={45} />}
    </g>
  );
};

export default CustomXAxisTick;
