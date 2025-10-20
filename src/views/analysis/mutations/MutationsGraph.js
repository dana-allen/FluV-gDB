import React, { useRef, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { toPng } from 'html-to-image';
import { Button } from 'react-bootstrap';
// import { processMutationsData } from "../../../utils/mutationsHelper";
import html2canvas from 'html2canvas';
import * as d3 from "d3";

  function valueFormatter(value) {
    if (value > 0 && value != undefined) {
      return `${value.toFixed(2)}%`;
    }
  }
const processMutationsData = (data) => {


  // Unique list of hosts (used for consistent ordering)
  const hosts = [...new Set(data.map(item => item.host))];

  // Convert mutation object to a consistent label string, like "1-T_60-A"
  const mutationLabel = (mutations) =>
    Object.entries(mutations)
      .sort((a, b) => a[0] - b[0])
      .map(([codon, aa]) => `${codon}-${aa}`)
      .join('_');

  // Count total entries per host
  const totalPerHost = new Array(hosts.length).fill(0);
  data.forEach(({ host }) => {
    const index = hosts.indexOf(host);
    totalPerHost[index]++;
  });

  // Count occurrences of each mutation combo per host
  const counts = {};
  data.forEach(({ host, mutations }) => {
    const label = mutationLabel(mutations);
    if (!counts[label]) counts[label] = new Array(hosts.length).fill(0);
    const hostIndex = hosts.indexOf(host);
    counts[label][hostIndex]++;
  });

  // Create a flat array of all entries with total counts
  const mutationEntries = Object.entries(counts).map(([label, countArr]) => ({
    label,
    data: countArr,
    total: countArr.reduce((sum, v) => sum + v, 0),
  }));

  // Sort by total descending and compute cumulative percentage
  const grandTotal = mutationEntries.reduce((sum, e) => sum + e.total, 0);
  mutationEntries.sort((a, b) => b.total - a.total);

  let cumulative = 0;
  const selected = [];
  const otherData = new Array(hosts.length).fill(0);
  const otherDataLabels = [];
  const otherDetails = []; // to track what's in "Other"

for (const entry of mutationEntries) {
  const percent = (entry.total / grandTotal) * 100;
  if (cumulative < 85) {
    selected.push(entry);
    cumulative += percent;
  } else {
    // Track individual entry in "Other"
    otherDetails.push({
      label: entry.label,
      total: entry.total,
      percent: Number(percent.toFixed(2)),
      data: entry.data,
    });
    
    // Add to merged "Other" counts
    entry.data.forEach((count, i) => {
      otherData[i] += count;
    });
  }
}

  // Include "Other" if needed
  if (otherData.some(count => count > 0)) {
    selected.push({
      label: 'Other',
      data: otherData,
      dataLabels: otherDataLabels,
      total: otherData.reduce((sum, v) => sum + v, 0),
    });
  }
  // Create color scale for selected labels
  const colorScale = d3.scaleOrdinal()
    .domain(selected.map(d => d.label))
    .range(selected.map((_, i) =>
      d3.interpolateTurbo(i / selected.length * 0.8 + 0.1)
    ));

  // Value formatter (optional helper)
  const valueFormatter = (value) => `${value.toFixed(1)}%`;
  // Convert to percentage series
  var seriesId = -1;
  const series = selected.map(({ label, data, dataLabels }) => {
    const percentArr = data.map((count, i) =>
      totalPerHost[i] > 0 ? (count / totalPerHost[i]) * 100 : 0
    );

    return {
      id: seriesId += 1,
      label,
      data: percentArr,
      stack: 'total',
      color: colorScale(label),
      valueFormatter,
      highlightScope:{highlight:'item'},
      dataLabels: dataLabels ? dataLabels : label
    };
  });

  const xLabels = hosts.map((i) => ({ label: i }));

  return { xLabels, series };
};

const MutationsGraph = ({data}) => {
  
  const { xLabels, series } = processMutationsData(data);
  const chartContainerRef = useRef();

  const handleDownload = async () => {
    if (!chartContainerRef.current) return;

    const canvas = await html2canvas(chartContainerRef.current, {
      backgroundColor: '#ffffff', // Prevent transparent background
      scale: 2, // Higher resolution
    });

    const imgData = canvas.toDataURL('image/png');

    const a = document.createElement('a');
    a.href = imgData;
    a.download = 'chart.png';
    a.click();
  };

  const [legendClicked, setLegendClicked] = useState('')
  const clickHandler = (
      event, // The click event.
      context, // An object that identifies the clicked item.
      series, // The index of the clicked item.
    ) => {
      setLegendClicked(series[context.seriesId].dataLabels)
    };

  
  return (
    <div>
      <Button className='btn-main-filled' style={{float:'right'}} size="sm" onClick={handleDownload}>Download Chart</Button>
      
      <div ref={chartContainerRef}>
        <BarChart
        
          onItemClick={(event, d) => clickHandler(event, d, series)}
          xAxis={[
            {
              scaleType: "band",
              data: xLabels.map(({ label }) => label),
              label: "Percentage of sequences with given combination of mutations",
            },
          ]}
          yAxis={[{ label: "Percentage (%)", max: 100 }]} // Ensure Y-axis is 0-100%
          series={series}
          // width={800}
          height={400}
          slotProps={{
            legend: {
              sx: { padding: 25 },
              position: { 
                vertical: 'top',
                horizontal: 'end'
              }
            }
          }}
        />
          
      </div>
      <div>{Array.isArray(legendClicked) ? legendClicked.join(', ') : legendClicked}</div>
    </div>
  );
};

export default MutationsGraph;



