// let numsArr = [1,3,5,2,4]

fetch('http://localhost:3000/getData')
.then(res => res.json())
.then(result => {
    //get 50 BLOBs
    const info = result.data.map(elem => elem.data)
    console.log('info=', info)
    let finalConvertedArr = [];

    info.forEach(elem=>{

        //covert from decimal to hex for each BLOB
        const hexInfo = elem.map(elem => elem.toString(16))

        //wrap into 4 bytes group, then convert to 32 bit signed integer 
        let finalInfo =[];
        let fourBytesGroup = ''
        hexInfo.forEach((elem, idx) => {
            if (elem.length === 2) {
                fourBytesGroup +=elem
            } else {
                fourBytesGroup+= '0'+elem
            }
            if ((idx+1)%4 === 0) {
                const finalNum = parseInt(fourBytesGroup,16)
                const signedFinalNum = finalNum | 0
                finalInfo.push(signedFinalNum/1000)
                fourBytesGroup =''
            }
        })
        finalConvertedArr.push(finalInfo)      
    })
    console.log('finalConvertedArr=', finalConvertedArr)

    //Slow down the iteration, draw the graph every 2 seconds
    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time))
    }

    const showEvery5Seconds = async () => {
        for (let i = 0; i < 50; i++) {
          await sleep(2000)
          const eachBlob = finalConvertedArr[i]
          console.log('eachBlob =', eachBlob)
            //making chart with highcharts.js
            Highcharts.chart('container', {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: 'Highcharts drawing 601 points'
                },
                subtitle: {
                    text: 'Using the Boost module'
                },
                accessibility: {
                    screenReaderSection: {
                        beforeChartFormat: '<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>'
                    }
                },
                tooltip: {
                    valueDecimals: 2
                },
                xAxis: {
                    // type: 'datetime',
                },
                series: [{
                    data: eachBlob,
                    lineWidth: 0.5,
                    name: '601 data points'
                }]
            
            });
        }
    }
    showEvery5Seconds()

})
