import _ from "lodash";
import { Circle } from "phosphor-react";
import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

import { api } from "../../services/api/api";
import {
  Card,
  CardBody,
  CardContainer,
  CardFooter,
  HomeContainer,
  Subtitles,
  SummaryContainer,
  SummaryResults,
  SummaryResultsContainer,
} from "./styles";

export default function Home() {
  const [sales, setSales] = useState([]);
  const [finishedSales, setFinishedSales] = useState(0);
  const [monthlyGoals, setMonthlyGoals] = useState(0);
  const [goals, setGoals] = useState([]);
  const [awaitedMonthlyGoal, setAwaitedMonthlyGoal] = useState(0);
  const [awaitedSales, setAwaitedSales] = useState(0);
  const [dayOfWeekWithMoreSales, setDayOfWeekWithMoreSales] = useState("");
  const [dayOfWeekWithLessSales, setDayOfWeekWithLessSales] = useState("");

  function getAwaitedMonthlyGoal(goal) {
    setAwaitedMonthlyGoal(goal);
  }
  function getAwaitedSales(salesAwaited) {
    setAwaitedSales(salesAwaited);
  }

  function getMonthlyGoals(data) {
    let resultMonthlyGoals = _.map(data, "profit");
    let finalMonthlyGoals = _.sum(resultMonthlyGoals);
    setMonthlyGoals(finalMonthlyGoals);
  }
  function getFinishedSales(data) {
    let r = _.map(data, "sales");
    let f = _.sum(r);
    setFinishedSales(f);
  }

  async function getGoals() {
    await api.get("/goals").then((response) => {
      console.log(response.data[0]);
      setGoals(response.data[0]);
    });
  }
  async function getSales() {
    let salesF = await api
      .get("/sales")
      .then((response) => (response = response.data));
    setSales((sales) => salesF);
  }
  useEffect(() => {
    getSales();
    getGoals();
  }, []);
  useEffect(() => {
    getMonthlyGoals(sales);
    getFinishedSales(sales);
    getAwaitedMonthlyGoal(goals["monthly-goal"]);
    getAwaitedSales(goals["closed-sales"]);
  }, [sales, goals]);
  useEffect(() => {
    function getResultsSummary(data) {
      if (data.length > 0) {
        let sortedData = _.sortBy(data, ["day-of-week", "sales"]);
        console.log(sortedData);
        setDayOfWeekWithLessSales(sortedData[0]["day-of-week"]);
        setDayOfWeekWithMoreSales(
          sortedData[sortedData.length - 1]["day-of-week"]
        );
      }
    }
    getResultsSummary(sales);
  }, [sales]);

  const optionsFinishedDate = [
    {
      title: "alcançado",
      value: finishedSales,
      color: "#e38520",
    },
  ];
  const optionMonthlyGoals = [
    {
      title: "alcançado",
      value: monthlyGoals,
      color: "#e38580",
    },
  ];
  return (
    <HomeContainer>
      <CardContainer>
        <Card width={"296px"} height={"379px"}>
          <h2>NPS geral</h2>
          <CardBody>
            <svg
              width="54"
              height="55"
              viewBox="0 0 54 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="27"
                cy="27.5"
                r="27"
                fill="url(#paint0_linear_201_65)"
              />
              <path
                d="M12.6562 31.2969C11.7243 31.2969 10.9598 32.0544 11.0552 32.9815C11.4405 36.7262 13.1019 40.2451 15.7878 42.931C18.8733 46.0165 23.0582 47.75 27.4219 47.75C31.7855 47.75 35.9704 46.0166 39.056 42.931C41.7419 40.2451 43.4033 36.7262 43.7886 32.9815C43.884 32.0544 43.1195 31.2969 42.1875 31.2969L27.4219 31.2969L12.6562 31.2969Z"
                fill="#363447"
              />
              <path
                d="M23.4981 21.1719C24.0342 21.1719 24.4775 20.734 24.3831 20.2063C24.1871 19.1104 23.6604 18.0918 22.8624 17.2938C21.8339 16.2653 20.4389 15.6875 18.9844 15.6875C17.5298 15.6875 16.1349 16.2653 15.1063 17.2938C14.3083 18.0918 13.7817 19.1104 13.5857 20.2063C13.4913 20.734 13.9346 21.1719 14.4706 21.1719V21.1719C15.0067 21.1719 15.4284 20.7294 15.5734 20.2133C15.7363 19.6337 16.0458 19.0998 16.479 18.6665C17.1435 18.0021 18.0447 17.6288 18.9844 17.6288C19.9241 17.6288 20.8253 18.0021 21.4897 18.6665C21.923 19.0998 22.2324 19.6337 22.3954 20.2133C22.5404 20.7294 22.962 21.1719 23.4981 21.1719V21.1719Z"
                fill="#363447"
              />
              <path
                d="M39.5294 21.1719C40.0654 21.1719 40.5087 20.734 40.4143 20.2063C40.2183 19.1104 39.6917 18.0918 38.8937 17.2938C37.8651 16.2653 36.4702 15.6875 35.0156 15.6875C33.5611 15.6875 32.1661 16.2653 31.1376 17.2938C30.3396 18.0918 29.8129 19.1104 29.6169 20.2063C29.5225 20.734 29.9658 21.1719 30.5019 21.1719V21.1719C31.038 21.1719 31.4596 20.7294 31.6046 20.2133C31.7676 19.6337 32.077 19.0998 32.5103 18.6665C33.1747 18.0021 34.0759 17.6288 35.0156 17.6288C35.9553 17.6288 36.8565 18.0021 37.521 18.6665C37.9542 19.0998 38.2637 19.6337 38.4266 20.2133C38.5716 20.7294 38.9933 21.1719 39.5294 21.1719V21.1719Z"
                fill="#363447"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_201_65"
                  x1="27"
                  y1="0.5"
                  x2="27"
                  y2="54.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#81FBB8" />
                  <stop offset="1" stop-color="#28C76F" />
                </linearGradient>
              </defs>
            </svg>
            <h3 variant={"success"}>Excelent</h3>
          </CardBody>
          <CardFooter>
            <Subtitles>
              <small>NPS Score </small>
              <small>72</small>
            </Subtitles>
          </CardFooter>
        </Card>
        <Card width={"351px"} height={"379px"}>
          <h2>Vendas fechadas</h2>
          <CardBody>
            <PieChart
              data={optionsFinishedDate}
              animate
              background="#1286"
              totalValue={awaitedSales}
            />
          </CardBody>
          <CardFooter>
            <Subtitles>
              <Circle size={32} weight="fill" color="#1286" />
              <small>Esperado</small>
              <small>{awaitedSales}</small>
            </Subtitles>
            <Subtitles>
              <Circle size={32} weight="fill" color="#e38520" />
              <small>Alcançado</small>
              <small>{finishedSales}</small>
            </Subtitles>
          </CardFooter>
        </Card>
        <Card width={"409px"} height={"379px"}>
          <h2>Meta mensal</h2>
          <CardBody>
            <PieChart
              data={optionMonthlyGoals}
              animate
              background="#1286"
              totalValue={awaitedMonthlyGoal}
            />
          </CardBody>
          <CardFooter>
            <Subtitles>
              <Circle size={32} weight="fill" color="#1286" />
              <small>Esperado</small>
              <small>{awaitedMonthlyGoal}</small>
            </Subtitles>
            <Subtitles>
              <Circle size={32} weight="fill" color="#e38580" />
              <small>Alcançado</small>
              <small>{monthlyGoals}</small>
            </Subtitles>
          </CardFooter>
        </Card>
      </CardContainer>
      <SummaryContainer>
        <h2>Vendas por dia da semana</h2>
        <SummaryResults>
          <small hidden={!dayOfWeekWithMoreSales}>
            Dia com maior numero de vendas {dayOfWeekWithMoreSales}
          </small>
          <small hidden={!dayOfWeekWithLessSales}>
            Dia com menor numero de vendas {dayOfWeekWithLessSales}
          </small>
        </SummaryResults>
        <SummaryResultsContainer>
          <BarChart
            width={700}
            height={200}
            data={sales}
            stackOffset="sign"
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day-of-week" />
            <YAxis dataKey="sales" />
            <Tooltip />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="sales" fill="#82ca9d" stackId="stack" />
          </BarChart>
        </SummaryResultsContainer>
      </SummaryContainer>
    </HomeContainer>
  );
}
