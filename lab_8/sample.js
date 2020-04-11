fetch(' https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json') // replace this with the food safety data set
    .then((response) => {
        console.log("response information", response);
        return response;
})
    .then((data) => data.json()) // this is an "implicit return" - we're returning the results of the Fetch request to the next step.
    .then((data) => { // this is an explicit return. If I want my information to go further, I'll need to use the "return" keyword before the brackets close
        console.log(data);
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
        const reformattedData  = Object.defineProperties(data).map((m,i)=>{
            console.log(m);
            return{
                y: m[1].length,
                label: m[0],
            };
        });   
        
        return reformattedData;
    })

    .then((results)=>{
        console.log(results);
        const chart = new CanvasJS.Chart("chartContainer",)
    })