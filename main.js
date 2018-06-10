"use strict";
document.addEventListener("DOMContentLoaded", loadJson);


function loadJson() {
    let data = FooBar.getData();

    //transfer data to JSON
    const jsondata = JSON.parse(data);

    console.log(jsondata);

    document.querySelector("#barname").textContent = jsondata.bar.name;
    document.querySelector("#closing").textContent = jsondata.bar.closingTime;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    document.querySelector("#currenttime").textContent = hours + ":" + minutes;

    const queue = document.querySelector(".number1").textContent = jsondata.queue.length;
    const serving = document.querySelector(".number2").textContent = jsondata.serving.length;
    const ChartCanva = document.getElementById("myChart");
    const myChart = new Chart(ChartCanva, {
        type: 'doughnut',
        data: {
            labels: ["Queued", "Being served"],
            datasets: [{
                data: [queue, serving],
                backgroundColor: [
                    '#ee609c',
                    '#b966d6',
                ],
                borderColor: [
                    'transparent',
                    'transparent'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }]
            }
        
        }
        
    });



    let mytemplate = document.querySelector(".bartenders-temp").content;
    document.querySelector(".bartenders").textContent = '';
    jsondata.bartenders.forEach((e) => {
        let clone = mytemplate.cloneNode(true);

        clone.querySelector(".name").textContent = e.name;
        clone.querySelector(".status").textContent = e.status;
        clone.querySelector(".statusdetail").textContent = e.statusDetail;
        document.querySelector(".bartenders").appendChild(clone);
    })

    let beersTemplate = document.querySelector(".beers-temp").content;
    document.querySelector(".beerinfo").textContent = '';
    jsondata.taps.forEach((e) => {
        let clone = beersTemplate.cloneNode(true);
        clone.querySelector(".beername").textContent = e.beer;
        clone.querySelector(".levelofbeer").textContent = (e.level / e.capacity) * 100;
        //clone.querySelector(".beershortdescription").textContent = ;

        document.querySelector(".beerinfo").appendChild(clone);



    })


}
setInterval(
    loadJson,
    10000);