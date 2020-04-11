fetch(' https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json') // replace this with the food safety data set
    .then((response) => {
        console.log("response information", response);
        return response;
    })
    .then((data) => data.json()) // this is an "implicit return" - we're returning the results of the Fetch request to the next step.
    .then((data) => { // this is an explicit return. If I want my information to go further, I'll need to use the "return" keyword before the brackets close
        console.log(data);
        console.log("entries", data.length);
        const clearEmpty = data.filter((f) => f.geocoded_column_1);
        const refined = clearEmpty.map((m)=>({
            category: m.category,
            name: m.name,
            latLong: m.geocoded_column_1.coordinates,
        })); 
        return data; // <- this will pass the data to the next "then" statement when I'm ready.
    })

    .then((data) =>{
        return data.reduce((result,current)=>{
            if(!result[current.category]){
                result[current.category] = [];
            }
            result[current.category].push(current);
            return result;
        },{});
    })

    .then((data) =>{
        console.log('new data', data);
        const reformattedData  = Object.entries(data).map((m,i)=>{
            console.log(m);
            return{
                y: m[1].length,
                label: m[0],
            };
        });   
        
        return reformattedData;
    })

    .then((data)=>{
        console.log(data);
        const chart = new CanvasJS.Chart("chartContainer",{
            animationEnabled: true,
	        theme: "light2", // "light1", "light2", "dark1", "dark2"
	        title:{
		        text: "Let's Find Somewhere to Eat"
            },
            axisX:{
                labelFontsize: 8,
                margin: 10,
                interval: 1,
            },

	        axisY: {
                
		        scaleBreaks:{
                    customBreaks: [
                        {
                            startValue: 20,
                            endValue: 35,
                        },
                        {
                            startValue:60,
                            endValue:120 , 
                        },
                        {
                            startValue:160,
                            endValue: 220,
                        },
                    ],
                },  
	        },
	        data: [
                {        
		            type: "bar",
		            dataPoints: data,
                },
            ],
        });
        chart.render();
    });