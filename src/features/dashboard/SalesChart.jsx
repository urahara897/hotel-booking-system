import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useState } from "react";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.6rem;
    cursor: pointer;

    & h3 {
      font-size: 1.4rem;
      text-align: center;
      margin-bottom: 1.2rem;
    }

    & .chart-container {
      display: none;
    }
  }
`;

const Dialog = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.show ? "block" : "none")};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-grey-0);
    padding: 2.4rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    width: 90%;
    max-width: 48rem;
    max-height: 90vh;
    overflow-y: auto;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.show ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-grey-500);
  cursor: pointer;
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
`;

const SummaryBox = styled.div`
  @media (max-width: 768px) {
    text-align: center;
    cursor: pointer;
    padding: 2rem;

    & h4 {
      font-size: 1.6rem;
      margin-bottom: 0.8rem;
    }

    & p {
      font-size: 2.4rem;
      font-weight: 500;
      color: var(--color-brand-600);
      margin-bottom: 1.6rem;
    }
  }
`;

const ViewChartButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    padding: 0.8rem 1.6rem;
    border: none;
    border-radius: var(--border-radius-sm);
    font-size: 1.4rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

/* eslint-disable react/prop-types */
function SalesChart({ bookings, numDays }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extraSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const totalSales = data.reduce((acc, cur) => acc + cur.totalSales, 0);

  function handleClick() {
    if (window.innerWidth <= 768) {
      setIsDialogOpen(true);
    }
  }

  return (
    <>
      <StyledSalesChart onClick={handleClick}>
        <Heading as="h3">
          Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
          {format(allDates.at(-1), "MMM dd yyyy")}
        </Heading>

        {/* Mobile Summary */}
        <SummaryBox>
          <h4>Total Sales</h4>
          <p>${totalSales.toLocaleString()}</p>
          <ViewChartButton onClick={handleClick}>View chart</ViewChartButton>
        </SummaryBox>

        {/* Desktop Chart */}
        <div className="chart-container">
          <ResponsiveContainer height={300} width="100%">
            <AreaChart data={data}>
              <XAxis
                dataKey="label"
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
              />
              <YAxis
                unit="$"
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
              />
              <CartesianGrid strokeDasharray="4" />
              <Tooltip contentStyle={{ backgroundColor: colors.background }} />
              <Area
                dataKey="totalSales"
                type="monotone"
                stroke={colors.totalSales.stroke}
                fill={colors.totalSales.fill}
                strokeWidth={2}
                name="Total Sales"
                unit="$"
              />
              <Area
                dataKey="extraSales"
                type="monotone"
                stroke={colors.extraSales.stroke}
                fill={colors.extraSales.fill}
                strokeWidth={2}
                name="Extra Sales"
                unit="$"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </StyledSalesChart>

      {/* Mobile Dialog */}
      <Overlay show={isDialogOpen} onClick={() => setIsDialogOpen(false)} />
      <Dialog show={isDialogOpen}>
        <CloseButton onClick={() => setIsDialogOpen(false)}>✕</CloseButton>
        <Heading as="h2">Sales Chart</Heading>
        <ResponsiveContainer height={400} width="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="label"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <YAxis
              unit="$"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <CartesianGrid strokeDasharray="4" />
            <Tooltip contentStyle={{ backgroundColor: colors.background }} />
            <Area
              dataKey="totalSales"
              type="monotone"
              stroke={colors.totalSales.stroke}
              fill={colors.totalSales.fill}
              strokeWidth={2}
              name="Total Sales"
              unit="$"
            />
            <Area
              dataKey="extraSales"
              type="monotone"
              stroke={colors.extraSales.stroke}
              fill={colors.extraSales.fill}
              strokeWidth={2}
              name="Extra Sales"
              unit="$"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Dialog>
    </>
  );
}

export default SalesChart;
