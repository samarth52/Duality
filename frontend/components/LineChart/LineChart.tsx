import { styled } from "stitches.config";
import TagSearch from "../TagSearch/TagSearch";
import {
  LineChart as LineRechart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

function LineChart({ tags, user } : any) {
  const [selectedTags, setSelectedTags] = useState<any>([])
  const [chartData, setChartData] = useState<any>([])
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    console.log(selectedTags)
    console.log(user)
    fetch('http://127.0.0.1:8000/api/sentiment_graph', {
      method: 'POST',
      body: JSON.stringify({ topics: selectedTags, id: user})
    }).then((
      resp => {
        resp.json().then(data => {
          setChartData(data.avgSentiment.map((item: any, index : any) => {
            return {
              name: index + 1,
              pv: parseFloat(item.toFixed(2)),
              amt: parseFloat(item.toFixed(2))
            }
          }))
        })
      }
    ))
  }, [selectedTags])

  return (
    <>
      <TagSearch selectedTags={selectedTags} setSelectedTags={setSelectedTags} allTags={tags}></TagSearch>
      <Wrapper>
        <Container>
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <LineRechart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="1 2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#82ca9d"
              strokeDasharray="3 4 5 2"
            />
          </LineRechart>
          {/* </ResponsiveContainer> */}
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled("div", {
  width: "100%",
  height: "100%",
  // backgroundImage: svgString,
  backgroundColor: "$grayOne",
  borderRadius: "38px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const Container = styled("div", {
  height: "100%",
  width: "100%",
  padding: "25px",
});

export default LineChart;
