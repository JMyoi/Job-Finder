import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import JobCard from './components/JobCard.jsx'  
import ExpandedJobCard from './components/ExpandedJobCard.jsx'
import {res} from './Data.js'

//to do 
/*  
  error handle state when eror is caught on handle search.
  save button animation and filled if it is already saved.
  if salary is undefined then hide it
  job count in favorite page
*/

function App() {

  const [currentJob, setCurrentJob] = useState(1);//holds the current job Id that is displayed
  const [searchTerm, setSearchTerm] = useState("");//holds the search term
  const [jobData, setJobData] = useState([]);//parsed job data using the processData function
  const [dataLoaded, setDataLoaded] = useState(false);//is there data loaded in the jobData used for initial load
  const [loading, setLoading] = useState(false);//if loading then show loading screen2
  const [favPage, setFavPage] = useState(false);
  const [favJobs, setFavJobs] = useState([]);
  //handle search when there are already results and also no data

  // use effect, on mount get the setFavJobs from local storage.
  useEffect(() =>{
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setFavJobs(saved);
    console.log("Loaded fav jobs from local storage: ", saved);
    setCurrentJob(saved[0].jobId);// initialize current job to first saved job
    console.log("initial current job: ", saved[0].jobId);
  },[]);

  // useEffect(()=>{
  //   console.log("current job: ", favJobs.find((job)=>(currentJob == job.jobId)));
  // }, [currentJob]);

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
    setCurrentJob(Data[0].jobId);//set current job to first job in results
  } catch (error) {
    console.error(error);
    //state to show error message and screen.
    setLoading(false);
  }
}

function handleSave(jobId){
  const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];// short circuit, if there is no savedJobs key then initialize empty array.

  const jobToSave = jobData.find((job) =>{return job.jobId == jobId});

  // avoid duplicates
  const exists = saved.some(j => j.jobId == jobId);
  if (!exists) {
    saved.push(jobToSave); 
    console.log("saving this job: ", jobToSave);
  } else{
    console.log("job already saved");
  }
  localStorage.setItem("savedJobs", JSON.stringify(saved));
  console.log("Local Storage saved jobs: ", saved);
  setFavJobs(saved);
  console.log("fav job state: ", favJobs);
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
        {(!dataLoaded && !loading && !favPage)&&(<p className = "col-start-2 text-center text-xl">Welcome</p>)} 
        {(loading)&&(
          <div className = "flex flex-row items-center col-start-2">
          <img src = "src/assets/loading.png" className = "h-10 w-10 m-4 animate-spin"></img>
          <p className = "text-xl">Loading</p>
          </div>
        )}

        <div className = "flex flex-col col-span-1"> 
          {(favPage)? (
            favJobs.map( job =>(
              <button  onClick = {() => setCurrentJob(job.jobId)}>
                <div className = {(currentJob == job.jobId)?"bg-slate-100":""}>
                  <JobCard
                  key = {job.id}
                  companyName = {job.employerName}
                  jobTitle = {job.jobTitle}
                  Location = {job.jobLocation}
                  Salary = {job.jobSalary}
                  Logo = {job.employerLogo}
                  jobId = {job.jobId}
                  handleSave = {()=>(handleSave(job.jobId))}
                  />
                </div>
              </button>
            ))
          ): (
            (dataLoaded && !loading)?(jobData.map(job =>(
              <button  onClick = {() => setCurrentJob(job.jobId)}>
                <div className = {(currentJob == job.jobId)?"bg-slate-100":""}>
                  <JobCard
                  key = {job.id}
                  companyName = {job.employerName}
                  jobTitle = {job.jobTitle}
                  Location = {job.jobLocation}
                  Salary = {job.jobSalary}
                  Logo = {job.employerLogo}
                  jobId = {job.jobId}
                  handleSave = {()=>(handleSave(job.jobId))}
                  />
                </div>
                
              </button>
              ))):(<></>)
          )}
        </div>


        <div className = "col-span-2 w-full"> 
          {
          (favPage)?(
            <ExpandedJobCard
            companyName = {favJobs.find((job)=>(currentJob == job.jobId)).employerName}
            jobTitle = {favJobs.find((job)=>(currentJob == job.jobId)).jobTitle}
            Location = {favJobs.find((job)=>(currentJob == job.jobId)).jobLocation}
            Salary = {favJobs.find((job)=>(currentJob == job.jobId)).jobSalary}
            Logo = {favJobs.find((job)=>(currentJob == job.jobId)).employerLogo}
            jobDescription = {favJobs.find((job)=>(currentJob == job.jobId)).jobDescription}
            jobPosted = {favJobs.find((job)=>(currentJob == job.jobId)).jobPosted}
            jobExpiration = {favJobs.find((job)=>(currentJob == job.jobId)).jobExpiration}
            jobLink = {favJobs.find((job)=>(currentJob == job.jobId)).jobLink}
            />
          ):(
          (dataLoaded && !loading)?(
            <ExpandedJobCard
            companyName = {jobData.find((job)=>(currentJob == job.jobId)).employerName}
            jobTitle = {jobData.find((job)=>(currentJob == job.jobId)).jobTitle}
            Location = {jobData.find((job)=>(currentJob == job.jobId)).jobLocation}
            Salary = {jobData.find((job)=>(currentJob == job.jobId)).jobSalary}
            Logo = {jobData.find((job)=>(currentJob == job.jobId)).employerLogo}
            jobDescription = {jobData.find((job)=>(currentJob == job.jobId)).jobDescription}
            jobPosted = {jobData.find((job)=>(currentJob == job.jobId)).jobPosted}
            jobExpiration = {jobData.find((job)=>(currentJob == job.jobId)).jobExpiration}
            jobLink = {jobData.find((job)=>(currentJob == job.jobId)).jobLink}
          />):(<></>)
        )


          }

          
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default App
