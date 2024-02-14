interface CustomXAxisProps {
  x: number;
  y: number;
  payload: any;
}

const CustomXAxisTick: React.FC<CustomXAxisProps> = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`} style={{ fontSize: 12, fill: "#333" }}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-25)">
        {payload.value}
      </text>
    </g>
  );
};

export default CustomXAxisTick;
