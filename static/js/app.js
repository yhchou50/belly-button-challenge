// Get the url endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function chart(sample) {
  d3.json(url).then(function (data) {
    let plotdata = data.samples;
    let obj = plotdata.filter((sampleobject) => sampleobject.id == sample)[0];
    console.log(obj);
    let otu_ids = obj.otu_ids;
    let otu_labels = obj.otu_labels;
    let sample_values = obj.sample_values;

    let trace1 = {
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids
        .slice(0, 10)
        .map((otuid) => `OTU ${otuid}`),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    let data1 = [trace1];
    let layout = {
      title: "Top 10",
    };

    Plotly.newPlot("bar", data1, layout);

    let trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Electric",
      },
    };

    let layout2 = {
      title: "Bacteria Per Sample",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };

    Plotly.newPlot("bubble", [trace2], layout2);
  });
}

function keyValue(sample) {
    d3.json(url).then(function (data) {
      let metaData = data.metadata;
      let obj = metaData.filter((sampleobject) => sampleobject.id == sample)[0];
      let infobox = d3.select("#sample-metadata").html("");
      Object.entries(obj).forEach(([key, value]) => {
        infobox.append("h5").text(`${key}: ${value}`);
      });
    });
  }





function init() {
    d3.json(url).then(function (data) {
      console.log(url, data);
      // Set up the DropDown:
      let dropdown = d3.select(`#selDataset`);
      let names = data.names;
  
      names.forEach((id) => {
        dropdown.append(`option`).text(id).property(`value`, id);
      });
      
      const firstSample = names[0];
      chart(firstSample);
      keyValue(firstSample);
      
 
    dropdown.on("change", function () {
        const selectedSample = dropdown.property("value");
        chart(selectedSample);
        keyValue(selectedSample);
      });
    });
  }
  
  init();