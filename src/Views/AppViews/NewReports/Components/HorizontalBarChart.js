import React, { Component } from "react";
const alphabet = [
    { letter: "Compute", frequency: 7700, color: "#A145FF", unit: "INSTANCE" },
    { letter: "Storage", frequency: 6700, color: "#FA6298", unit: "TB" },
    { letter: "Network", frequency: 6500, color: "#FAA24B", unit: "TB/DAY" },
    { letter: "Database", frequency: 8500, color: "#F9D33D", unit: "INSTANCE" },
  ];
class VerticalBarchart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.ref = React.createRef();
      }
    
      componentDidMount = () => this.renderChart();
    
      renderChart = () => {
        const margin = { top: 20, right: 0, bottom: 30, left: 40 };
        const extent = [
          [margin.left, margin.top],
          [width - margin.right, height - margin.top],
        ];
    
        const svg = d3.select(this.ref.current);
    
        const xScale = d3
          .scaleBand()
          .range([margin.left, width - margin.right])
          .domain(data.map((d) => d.name))
          .padding(0.3);
    
        const yScale = d3
          .scaleLinear()
          .range([height - margin.bottom, margin.top])
          .domain([0, d3.max(data, (d) => d.value)])
          .nice();
    
        const xAxis = (g) =>
          g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickSizeOuter(0));
    
        const yAxis = (g) =>
          g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale).tickFormat((d) => "$" + d))
            .call((g_local) => g_local.select(".domain").remove());
    
        var tooltip = d3
          .select("#root")
          .data(data)
          .append("div")
          .attr("class", "chart-tooltip")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("visibility", "hidden");
    
        const barGroups = svg
          .append("g")
          .attr("class", "bars")
          .selectAll("rect")
          .attr("fill", "#B399FF")
          .data(data)
          .enter();
    
        barGroups
          .append("rect")
          .attr("x", (d) => xScale(d.name))
          .attr("y", (d) => yScale(d.value))
          .attr("width", xScale.bandwidth())
          .attr("height", (d) => yScale(0) - yScale(d.value))
          .style("fill", "#B399FF")
          .attr("rx", 5)
          .attr("ry", 5)
          .on("mouseover", function (d, data) {
            tooltip.html(
              `<div class="chart-tooltip-contents"><div class="cost-text">Cost</div><div class="value">$${data.value}</div><div class="previous-month-data"><span>+16.67%</span> vs previous month</div><div class="name">${data.name}</div></div>`
            );
            return tooltip.style("visibility", "visible");
          })
          .on("mousemove", function (d) {
            return tooltip
              .style("top", d.pageY - 10 + "px")
              .style("left", d.pageX + 10 + "px");
          })
          .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
          });
    
        barGroups
          .append("text")
          .attr("class", "value")
          .attr("x", (a) => xScale(a.name) + xScale.bandwidth() / 2)
          .attr("y", (a) => yScale(a.value) + 30)
          .attr("text-anchor", "middle")
          .text((a) => `$${convertDigitToThousand(a.value)}`);
    
        svg.append("g").attr("class", "x-axis").call(xAxis);
    
        svg.append("g").attr("class", "y-axis").call(yAxis);
    
        d3.select(this.ref.current);
      };

  render() {
    return (
      <svg
        ref={this.ref}
        width={width}
        height={height}
        // viewBox={`0 0 ${width - 600} ${height}`}
      ></svg>
    );
  }
}

export default VerticalBarchart;