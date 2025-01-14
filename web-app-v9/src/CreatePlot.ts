import Plotly from 'plotly.js';
import { Data } from 'plotly.js';
import { APIData } from './Options';

let width = 0;
let height = 0;

window.onload = () => {
  width = document.getElementsByClassName("flexlayout__tab")[0].clientWidth - 5;
  height = document.getElementsByClassName("flexlayout__tab")[0].clientHeight - 5;
  localStorage.removeItem('data');

}


export default function createPlot(index: number, points: Array<APIData>) {


  let data: Data[] = [];
  //Gets the height and width of each of the tabs

  for (let i = 0; i < points.length; i++) {
    let x: number[] = [];
    let y1: number[] = [];
    let y2: number[] = [];

    points[i].data.forEach((value) => x.push(value['x']));
    points[i].data.forEach((value) => y1.push(value['xu']));
    points[i].data.forEach((value) => y2.push(value['xd']));


    let trace1: Data = {
      type: 'scatter',
      mode: 'lines',
      x: x,
      y: y1,
      name: `${points[i].options.gpd}_UP(xbj=${points[i].options.xbj}, t=${points[i].options.t}, q2=${points[i].options.q2})`,
      fill: 'tozerox',
    };

    let trace2: Data = {
      type: 'scatter',
      mode: 'lines',
      x: x,
      y: y2,
      name: `${points[i].options.gpd}_DOWN(xbj=${points[i].options.xbj}, t=${points[i].options.t}, q2=${points[i].options.q2})`,
      fill: 'tozerox',
    };

    data.push(trace1, trace2);
  }

  var layout = {
    autosize: false,
    width: width,
    height: height,
    font: { size: 12 },
    yaxis: {
      title: 'GPD',
    },
  };

  var config = { responsive: true };

  Plotly.newPlot(`results-${index}`, data, layout, config)
}