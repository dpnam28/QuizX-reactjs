import {
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { getDashboardOverview } from "../../services/apiServices";
import { useEffect, useState } from "react";

const DashBoard = (props) => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataDashboard();
  }, []);

  useEffect(() => {
    const data = [
      {
        name: "Quizes",
        total: dataOverView?.others?.countQuiz ?? 0,
        color: "#0d6efd",
      },
      {
        name: "Questions",
        total: dataOverView?.others?.countQuestions ?? 0,
        color: "#2ca02c",
      },
      {
        name: "Answers",
        total: dataOverView?.others?.countAnswers ?? 0,
        color: "#fd7e14",
      },
    ];
    setDataChart(data);
  }, [dataOverView]);

  const fetchDataDashboard = async () => {
    let res = await getDashboardOverview();
    setDataOverView(res?.DT ?? []);
  };
  return (
    <>
      <div className="text-center text-5xl text-black font-black">
        Dashboard page
      </div>
      <div className="mx-auto mt-15 grid lg:grid-cols-2 grid-cols-1 justify-items-center items-center lg:w-[90%] lg:gap-0 gap-20">
        <div className="w-[70%] lg:h-85 h-100 flex flex-wrap gap-5">
          <div className="size-[var(--dashboard-gap)] flex flex-col justify-center items-center rounded-3xl drop-shadow-2xl shadow-xl">
            <span className="text-xl">Total user</span>
            <span className="text-3xl font-bold">
              {dataOverView?.users?.total ?? 0}
            </span>
          </div>
          <div className="size-[var(--dashboard-gap)] flex flex-col justify-center items-center shadow-xl drop-shadow-2xl rounded-3xl">
            <span className="text-xl">Total Quiz</span>
            <span className="text-3xl font-bold">
              {dataOverView?.others?.countQuiz ?? 0}
            </span>
          </div>
          <div className="size-[var(--dashboard-gap)] flex flex-col justify-center items-center shadow-xl drop-shadow-2xl rounded-3xl">
            <span className="text-xl">Total Questions</span>
            <span className="text-3xl font-bold">
              {dataOverView?.others?.countQuestions ?? 0}
            </span>
          </div>
          <div className="size-[var(--dashboard-gap)] flex flex-col justify-center items-center shadow-xl drop-shadow-2xl rounded-3xl">
            <span className="text-xl">Total Answers</span>
            <span className="text-3xl font-bold">
              {dataOverView?.others?.countAnswers ?? 0}
            </span>
          </div>
        </div>

        <ResponsiveContainer width={"80%"} height={300}>
          <BarChart data={dataChart}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="total" barSize={50}>
              {dataChart.map((item, index) => (
                <Cell key={`cell-${index}`} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DashBoard;
