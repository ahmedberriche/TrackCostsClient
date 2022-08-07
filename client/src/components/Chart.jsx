import React from "react";
import {
    VictoryAxis,
    VictoryChart,
    VictoryGroup,    
    VictoryLine,
    VictoryTooltip,
  } from "victory";
const LineChart = ({dataTableCa, dataTableNa}) => {
	
	return (
        <VictoryChart
        width={300}
        height={180}
    
      >
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 2, padding: 30 },
            grid: { stroke: "grey" },
            ticks: { stroke: "grey", size: 1 },
            tickLabels: { fontSize: 5, padding: 5 },
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 2, padding: 30 },
            ticks: { stroke: "grey", size: 1 },
            tickLabels: { fontSize: 5, padding: 5 },
          }}
        />
        <VictoryGroup
          labels={({ datum }) => `y: ${datum.y}`}
          labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
          data={dataTableCa}
        >
          <VictoryLine
            style={{
              data: { stroke: "#03c2fc", strokeWidth: 1 },
              parent: { border: "1px solid #ccc" },
            }}
          />
        </VictoryGroup>
        <VictoryGroup
          labels={({ datum }) => `y: ${datum.y}`}
          labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
          data={dataTableNa}
        >
          <VictoryLine
            style={{
              data: { stroke: "#fcca03", strokeWidth: 1 },
              parent: { border: "1px solid #ccc" },
            }}
          />
        </VictoryGroup>
    
      </VictoryChart>
	);
}



export default LineChart;