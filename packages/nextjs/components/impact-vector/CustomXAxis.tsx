interface CustomXAxisProps {
  x: number;
  y: number;
  // payload: any;
}

const CustomXAxisTick: React.FC<CustomXAxisProps> = ({
  x,
  y,
  // payload
}) => {
  return (
    <g transform={`translate(${x},${y})`} style={{ fontSize: 12, fill: "#333" }}>
      {/* on hover display project image or name */}
    </g>
  );
};

export default CustomXAxisTick;
