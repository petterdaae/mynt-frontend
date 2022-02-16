import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const gradientOffset = (data: any) => {
  const dataMax = Math.max(...data.map((i: any) => i.amount));
  const dataMin = Math.min(...data.map((i: any) => i.amount));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

interface Props {
  data: any;
}

function Chart({ data }: Props) {
  const off = gradientOffset(data);
  return (
    <AreaChart
      width={500}
      height={400}
      data={data.map((e: any) => ({
        ...e,
        name: e.month,
        amount: e.amount / 100,
      }))}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <defs>
        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset={off} stopColor="green" stopOpacity={1} />
          <stop offset={off} stopColor="red" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="amount"
        stroke="#000"
        fill="url(#splitColor)"
      />
    </AreaChart>
  );
}

export default Chart;
