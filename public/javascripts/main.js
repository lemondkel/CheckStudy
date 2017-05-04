
$(document).ready(function() {

    var pie_data = [
        {
            value: 300,
            color:"#4DAF7C",
            highlight: "#55BC75",
            label: "Programming"
        },
        {
            value: 50,
            color: "#EAC85D",
            highlight: "#f9d463",
            label: "Game"
        },
        {
            value: 100,
            color: "#E25331",
            highlight: "#f45e3d",
            label: "Music"
        },
        {
            value: 35,
            color: "#F4EDE7",
            highlight: "#e0dcd9",
            label: "etc"
        }
    ];

    var line_data = {
        labels: ["2017-04-15", "2017-04-16", "2017-04-17", "2017-04-18", "2017-04-19",
            "2017-04-20", "2017-04-21", "2017-04-22", "2017-04-23", "2017-04-24",
            "2017-04-25", "2017-04-26", "2017-04-27", "Today"],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(77, 175, 124,1)",
                strokeColor: "rgba(255,255,255,1)",
                pointColor: "rgba(255,255,255,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [70, 50, 100, 30, 90, 100, 20, 30, 50, 40, 70, 40, 80, 100]
            }
        ]
    };


    var bar_data = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thrusday", "May", "June", "July"],
        datasets: [
            {
                fillColor: "rgba(226,83,49,1)",
                strokeColor: "rgba(226,83,49,1)",
                highlightFill: "rgba(226,83,49,0.5)",
                highlightStroke: "rgba(226,83,49,0.5)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };


    // PIE CHART WIDGET
    var ctx = document.getElementById("myPieChart").getContext("2d");
    var myDoughnutChart = new Chart(ctx).Doughnut(pie_data,
        {
            responsive:true,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> Gb"
        });


    // LINE CHART WIDGET
    var ctx2 = document.getElementById("myLineChart").getContext("2d");
    var myLineChart = new Chart(ctx2).Line(line_data,
        {
            responsive:true,
            scaleShowGridLines : false,
            scaleShowLabels: false,
            showScale: false,
            pointDot : true,
            bezierCurveTension : 0.2,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 5,
            datasetStroke : false,
            tooltipTemplate: "<%= value %>% <%if (label){%>(<%=label%>)<%}%>"
        });

    // BAR CHART ON LINE WIDGET
    var ctx3 = document.getElementById("myBarChart").getContext("2d");
    var myBarChart = new Chart(ctx3).Bar(bar_data,
        {
            responsive:true,
            scaleShowGridLines : false,
            scaleShowLabels: false,
            showScale: false,
            pointDot : true,
            datasetStroke : false,
            tooltipTemplate: "<%= value %><%if (label){%> - <%=label%><%}%>"
        });

    var first_sum = 0;

    for(var i=0; i<line_data.datasets[0].data.length; i++)
        first_sum += line_data.datasets[0].data[i];

    first_sum = parseInt(first_sum / line_data.datasets[0].data.length);

    $('#first-chart-all-sum').text("최근 2주일 정답률: " + first_sum + "%");
    $('#first-chart-week-sum').text(first_sum + " %");

});