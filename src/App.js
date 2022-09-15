import React, {useEffect ,useState} from "react" 
import axios from "axios";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';


function App() {
  

  let bgimage='rain.gif'
  const[weatherdata,setData]=useState({})
  const[city,setCity]=useState('Newcastle')
  const sorceURL=`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},UK&key=a9ff03b3cd404cf98d3c94dfc571e6c0`




  function search(){
    axios.get(sorceURL).then((response) => {
      setData(response.data)
      //console.log(response.data.data[1].temp)
    })
  }


  const getcityweather = (event)=>{
    
    if(event.key==="Enter"){
      search()
      setCity('')
    }
  }


  useEffect(() => {
     search();
  }, []); // 👈️ empty dependencies array


    const final = [];
    const fiveDay=[]
    
    const fiveDay2=[]
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

   


    if(weatherdata.data)
    {
      
      
      if (  weatherdata.data[0].weather.description==="Clear Sky" || 
            weatherdata.data[0].weather.description==="Few clouds")
            bgimage=("sunny.webp")
      else if ( weatherdata.data[0].weather.description==="Broken clouds" ||
                weatherdata.data[0].weather.description==="Scattered clouds" ||
                weatherdata.data[0].weather.description==="Overcast clouds"  )
            bgimage=('cloudy.gif')
      else if (   weatherdata.data[0].weather.description==="Heavy rain" 	||
                  weatherdata.data[0].weather.description==="Thunderstorm with rain" )
            bgimage=('rain.gif')

        



          let i=1
          for (let  item of weatherdata.data) 
          {
    
            const d = new Date(item.valid_date);
            let day = weekday[d.getDay()];
            
    
            fiveDay.push(
            
              <div className="pred columns">
                        <p>
                           <b> {day} </b>
                        </p>
                        
                        <p>
                        <img className="smalicona" src={`./icons/${item.weather.icon}.png`} />
                        </p>
                        <p>
                            Min :{item.min_temp}<sup>o</sup>
                        </p>
                        <p>
                            Max :{item.min_temp}<sup>o</sup>
                        </p>
                      </div>
              
              );    
            
          }

          let l=fiveDay.length
          for (let i = 0; i < l; i+=5) {
           final.push(  
                <MDBAccordionItem collapseId={(i/5)} headerTitle={`Wheater Group ${(i/5)}`}>
                  {fiveDay.splice(0,5)}
                </MDBAccordionItem>
                
              );
  
        }
          
         
        
    }
  


  return (
    <div className="app"  style ={{ backgroundImage: `url(./assets/${bgimage})`}}>
        <div className="container">
          <header className="header">
          <section className="search">
            <input  type="search" 
                    value={city} 
                    onChange={event=>setCity(event.target.value)}
                    onKeyPress={getcityweather} 
                    placeholder="Enter City Name"
                    />
          </section>

            <section className="sec1">
              <div className="city">
                <p><b>{weatherdata.city_name? <span>{weatherdata.city_name}, {weatherdata.country_code}</span>:null}</b></p>
              </div>
              <div className="temp">
                {weatherdata.data?<h1>{weatherdata.data[0].temp}<sup>o</sup></h1>:null}
                {weatherdata.data?<img className="icona" src={`./icons/${weatherdata.data[0].weather.icon}.png`} />:null}
                {weatherdata.data?<p>{weatherdata.data[0].weather.description}</p>:null}
                {weatherdata.data?<p>Min:{weatherdata.data[0].min_temp}<sup>o</sup> Max:{weatherdata.data[0].max_temp}<sup>o</sup> </p>:null}
              </div>
            </section>
          </header>
          <main>
            <section className="sec2">
                <div className="pred">
                  <p><b>16 Days Prediction</b></p>
                </div>
                <MDBAccordion initialActive={1}>
                {final}
                </MDBAccordion>
                <div className="pred columns"><p> </p> </div>
                
              </section>
          </main>
          <footer className="footer">
             
          </footer>
        </div>
    </div>
  );
}


export default App;
