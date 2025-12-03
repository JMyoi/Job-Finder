import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import JobCard from './components/JobCard.jsx'  
import ExpandedJobCard from './components/ExpandedJobCard.jsx'
import {res} from './Data.js'



function App() {

  const [currentJob, setCurrentJob] = useState(1);//holds the current job Id that is displayed
  const [searchTerm, setSearchTerm] = useState("");//holds the search term
  const [jobData, setJobData] = useState({});//parsed job data using the processData function
  const [dataLoaded, setDataLoaded] = useState(false);//is there data loaded in the jobData used for initial load
  const [loading, setLoading] = useState(false);//if loading then show loading screen2
  const [favPage, setFavPage] = useState(false);
  const [favJobs, setFavJobs] = useState([]);
  //handle search when there are already results and also no data


function processData(inputData){
  //extract each employer_name,  employer_logo, job_title, job_location, job_salary

  const jobsArray = inputData.data;
  let num = 0;

  const ParsedData =  jobsArray.map((job) =>{
    return  {
      id:++num,
      employerName: job.employer_name,
      employerLogo: job.employer_logo,
      jobTitle: job.job_title,
      jobLocation: job.job_location,
      jobSalary : job.job_salary,
      jobId : job.job_id,
      jobLink : job.job_apply_link,
      jobPosted: job.job_posted_at_datetime_utc,
      jobExpiration: job.job_offer_expiration_timestamp,
      jobDescription: job.job_description
    }
  });

  return ParsedData;
};

// const Data = processData(res);

// console.log("output Data: ", Data);//don't use + because it will conver to string.

async function handleSearch(e){
  e.preventDefault();
  setLoading(true);
  console.log("Searching for: ", searchTerm);
  const encodedTerm = encodeURIComponent(searchTerm);

  const url = 'https://jsearch.p.rapidapi.com/search?query=' + encodedTerm + '&page=1&num_pages=1&country=us&date_posted=all';
  console.log("Request URL: ", url);
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '4c52dc0ca5mshb942a13761bed3ap1c1ca6jsn85a19572a504',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Failed');
    const result = await response.json();
    console.log("results from the API", result);
    console.log("Parsing Data");
    const Data = processData(result);
    console.log("Result: ", Data);
    setJobData(Data);
    setDataLoaded(true);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
}


  return (
    <div className = "">
      <Header/>
      
      
      <div className = "flex justify-center items-center ">
        {(favPage)?(
          <div className = "w-full flex justify-center items-center">
            <p>Job Count: </p>
            <p className = "cursor-pointer underline pl-12 text-xl" onClick = {()=>(setFavPage(false))}>Search Jobs</p>
          </div>
        ):
        (<form onSubmit = {handleSearch} className = "w-full flex justify-center items-center">
          <input type = "text" placeholder = "Search jobs... (Job Title and Location, e.g., Software Engineer in New York)" className =  " border-2 rounded-lg m-5 p-2 w-1/2"
            onChange = {(e) => setSearchTerm(e.target.value)} 
          />
          <input type = "submit" value = "Go" className = "border p-1 rounded-lg cursor-pointer hover:bg-slate-100"/>
          <p className = "cursor-pointer underline pl-12 text-xl" onClick = {()=>(setFavPage(true))}>Saved Jobs</p>
        </form>)
        }
      </div>

      <div className = "grid grid-cols-3 border m-5 p-5">{/*grid with 3 columns the cards span one column the expandedCard spans two.*/}
        {(!dataLoaded && !loading)&&(<p className = "col-start-2 text-center text-xl">Welcome</p>)} 
        {(loading)&&(
          <div className = "flex flex-row items-center col-start-2">
          <img src = "src/assets/loading.png" className = "h-10 w-10 m-4 animate-spin"></img>
          <p className = "text-xl">Loading</p>
          </div>
        )}

        <div className = "flex flex-col col-span-1"> 
          {(dataLoaded && !loading)?(jobData.map(job =>(
            <button  onClick = {() => setCurrentJob(job.id)}>
              <div className = {(currentJob === job.id)?"bg-slate-100":""}>
                <JobCard
                key = {job.id}
                companyName = {job.employerName}
                jobTitle = {job.jobTitle}
                Location = {job.jobLocation}
                Salary = {job.jobSalary}
                Logo = {job.employerLogo}
                />
              </div>
              
            </button>
            ))):(<></>)
          }
        </div>
        <div className = "col-span-2 w-full"> 
          {(dataLoaded && !loading)?(
            <ExpandedJobCard
            key = {jobData[currentJob-1]?.id}
            companyName = {jobData[currentJob-1]?.employerName}
            jobTitle = {jobData[currentJob-1]?.jobTitle}
            Location = {jobData[currentJob-1]?.jobLocation}
            Salary = {jobData[currentJob-1]?.jobSalary}
            Logo = {jobData[currentJob-1]?.employerLogo}
            jobDescription = {jobData[currentJob-1]?.jobDescription}
            jobPosted = {jobData[currentJob-1]?.jobPosted}
            jobExpiration = {jobData[currentJob-1]?.jobExpiration}
            jobLink = {jobData[currentJob-1]?.jobLink}
          />):
          (<></>)}
          
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default App
