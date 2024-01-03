import { useTheme } from "@mui/material";
import { PieChart, Pie, Cell, Legend } from "recharts";

const PieChartComponent = ({
  data,
  renderCustomizedLabel,
  COLORS,
  width = 400,
  height = 400,
  cx = 120,
  cy = 200,
  innerRadius = 70,
  outerRadius = 100,
}: any) => {
  const theme = useTheme();
  const AllCOLORS = [
    theme.palette.error.main,
    theme.palette.bgPurple.main,
    theme.palette.bgBlue.main,
    theme.palette.primary.main,
  ];
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill="#8884d8"
        paddingAngle={0}
        dataKey="value"
        label={renderCustomizedLabel}
        labelLine={false}
        startAngle={90}
        endAngle={450}
      >
        {data.map((entry: any, index: any) => (
          <Cell
            key={`cell-${index}`}
            fill={AllCOLORS[index % AllCOLORS.length]}
          />
        ))}
      </Pie>
      <Legend
        iconSize={8}
        iconType="circle"
        wrapperStyle={{ width: "100%", fontSize: "12px" }}
        verticalAlign="bottom"
        height={36}
      />
    </PieChart>
  );
};

export default PieChartComponent;
