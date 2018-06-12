"use strict";
document.addEventListener("DOMContentLoaded", loadJson);
let myarray = [];
let jsondata;

//logo animation
const logo = document.querySelector(".logo");
TweenLite.to(logo, 2, {width:"10%",opacity:1});

function loadJson() {
    let data = FooBar.getData();

    //transfer data to JSON
    jsondata = JSON.parse(data);

    console.log(jsondata);
    //bar section
    document.querySelector("#barname").textContent = "Welcome to " + jsondata.bar.name;
    TweenLite.to("#barname", 2, {
        color: "#808080",
        scale: 0.9
    });
    document.querySelector("#closing").textContent = "Closing time: " + jsondata.bar.closingTime;
    //showing current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    document.querySelector("#currenttime").textContent = "Current time: " + hours + ":" + minutes;
    //data for the queue
    const queue = jsondata.queue.length;
    const serving = jsondata.serving.length;
    const ChartCanva = document.getElementById("myChart");
    //creating a chart with chart.js
    const myChart = new Chart(ChartCanva, {
        type: 'doughnut',
        data: {
            labels: ["Standing in the queue: " + jsondata.queue.length, "Being served: " + jsondata.serving.length],
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
            responsive: true,
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }]

            },
            legend: {
                labels: {
                    fontColor: '#FFFFFF',
                    fontFamily: 'Roboto'
                }

            }
        }

    });
    //bartenders section
    let mytemplate = document.querySelector(".bartenders-temp").content;
    document.querySelector(".bartenders").textContent = '';
    jsondata.bartenders.forEach((e) => {
        let clone = mytemplate.cloneNode(true);

        clone.querySelector(".name").textContent = e.name;
        clone.querySelector(".status").textContent = e.status;
        TweenMax.to(".status", 1, {
            x: 20,
            repeat: 10,
            yoyo: true
        });
        //icons for showing the detailed status
        clone.querySelector(".waiting");
        clone.querySelector(".startServing");
        clone.querySelector(".reserveTap");
        clone.querySelector(".releaseTap");
        clone.querySelector(".pourBeer");
        clone.querySelector(".receivePayment");
        clone.querySelector(".endServing");
        clone.querySelector(".replaceKeg");
        if (e.statusDetail === "waiting") {
            clone.querySelector(".waiting").style.display = "block";
        } else if (e.statusDetail === "startServing") {
            clone.querySelector(".startServing").style.display = "block";
        } else if (e.statusDetail === "reserveTap") {
            clone.querySelector(".reserveTap").style.display = "block";
        } else if (e.statusDetail === "releaseTap") {
            clone.querySelector(".releaseTap").style.display = "block";
        } else if (e.statusDetail === "pourBeer") {
            clone.querySelector(".pourBeer").style.display = "block";
        } else if (e.statusDetail === "receivePayment") {
            clone.querySelector(".receivePayment").style.display = "block";
        } else if (e.statusDetail === "endServing") {
            clone.querySelector(".endServing").style.display = "block";
        } else {
            clone.querySelector(".kegpic").style.display = "block";
        }

        document.querySelector(".bartenders").appendChild(clone);
        //animation for the detailed status pictures
        TweenLite.fromTo(".bticon", 1, {
            opacity: 0,
            scale: 0.2
        }, {
            opacity: 1,
            scale: 1
        });
    });

    //storage section
    let storageTemplate = document.querySelector(".storage-temp").content;
    //document.querySelector(".storage").textContent = '';
    myarray = [];

    jsondata.storage.forEach((e) => {
        myarray.push(e.amount);
        //let amount = clone.querySelector(".beeramount").textContent = e.amount;
        // document.querySelector(".storage").appendChild(clone)
        // console.log(amount);
    });
    const ChartCanva2 = document.getElementById("myChart2");
    const myChart2 = new Chart(ChartCanva2, {
        type: 'bar',
        data: {
            labels: ["lala", "...", "sth", "lala", "Being served", "sth"],
            datasets: [{
                data: myarray,
                backgroundColor: [
                    '#ee609c',
                    '#b966d6',
                    '#b966d6',
                ],
                borderColor: [
                    'transparent',
                    'transparent',
                    'transparent'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    responsive: true

                }],
                yAxes: [{
                    display: true,
                    responsive: true,

                }]
            }
        }
    });

    //beer section
    //console.log(myarray);
    let beersTemplate = document.querySelector(".beers-temp").content;
    document.querySelector(".beerinfo").textContent = '';

    jsondata.taps.forEach((tap) => {
            let clone = beersTemplate.cloneNode(true);
            clone.querySelector(".beername").textContent = tap.beer;
            clone.querySelector(".levelofbeer").textContent = (tap.level / tap.capacity) * 100;
            let levelhelper = (tap.level / tap.capacity);
            clone.querySelector(".beerlevel").style.width =  `${levelhelper * 100}px`;
            clone.querySelector("#myBtn").setAttribute("data-id", tap.beer); 
            clone.querySelector("#myBtn").addEventListener("click", openModal);


            jsondata.beertypes.forEach((beertype) =>{
         
                if (tap.beer == beertype.name){

                    clone.querySelector(".alcohol").textContent = beertype.alc;
                }
    
            });
    

            

            document.querySelector(".beerinfo").appendChild(clone);
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
    
                }}
        });
    }
    //pop-up window
    let modal = document.querySelector('#myModal');
    document.querySelector(".close").addEventListener("click", closeModal);

    function openModal() {
        modal.style.display = "block";
        let dataId = event.target.getAttribute("data-id");
        jsondata.beertypes.forEach((e) => {
            if (dataId == e.name) {
                document.querySelector('.beerlabel').src = "labelimages/" + e.label;
                document.querySelector('.beershortdescription').textContent = e.description.overallImpression;
                document.querySelector('.aroma').textContent = e.description.aroma;
                document.querySelector('.flavor').textContent = e.description.flavor;
                document.querySelector('.mouthfeel').textContent = e.description.mouthfeel;
                document.querySelector('.appearance').textContent = e.description.appearance;
            }

        })
    }
    //for closing the pop-up window
    function closeModal() {
        modal.style.display = "none";
    }


    setInterval(
        loadJson,
        10000);