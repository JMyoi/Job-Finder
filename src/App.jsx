import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import JobCard from './components/JobCard.jsx'  
import ExpandedJobCard from './components/ExpandedJobCard.jsx'
import {res} from './Data.js'



function App() {

  const [currentJob, setCurrentJob] = useState(1);//holds the current job Id that is displayed
  const [searchTerm, setSearchTerm] = useState("");//holds the search term

async function handleSearch(e){
  e.preventDefault();
  console.log("Searching for: ", searchTerm);
  const encodedTerm = encodeURIComponent(searchTerm);

  const url = 'https://jsearch.p.rapidapi.com/search?query=' + encodedTerm + '&page=1&num_pages=1&country=us&date_posted=all';
  console.log("Request URL: ", url);
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'x-rapidapi-key': '4c52dc0ca5mshb942a13761bed3ap1c1ca6jsn85a19572a504',
  //     'x-rapidapi-host': 'jsearch.p.rapidapi.com'
  //   }
  // };

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.text();
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  // }

}

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

const Data = processData(res);


console.log("output Data: ", Data);//don't use + because it will conver to string.



  return (
    <div className = "">
      <Header/>

      <div className = "flex justify-center items-center ">
        <form onSubmit = {handleSearch} className = "w-full flex justify-center items-center">
          <input type = "text" placeholder = "Search jobs... (Job Title and Location, e.g., Software Engineer in New York)" className =  " border-2 rounded-lg m-5 p-2 w-1/2"
            onChange = {(e) => setSearchTerm(e.target.value)} 
          />
          <input type = "submit" value = "Go" className = "border p-1 rounded-lg cursor-pointer hover:bg-slate-100"/>
        </form>
      </div>

      <div className = "grid grid-cols-3 border m-5 p-5">{/*grid with 3 columns the cards span one column the expandedCard spans two.*/}
        <div className = "flex flex-col col-span-1"> 
          {Data.map(job =>(
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
            ))
          }
        </div>
        <div className = "col-span-2 w-full"> 
          <ExpandedJobCard
            key = {Data[currentJob-1]?.id}
            companyName = {Data[currentJob-1]?.employerName}
            jobTitle = {Data[currentJob-1]?.jobTitle}
            Location = {Data[currentJob-1]?.jobLocation}
            Salary = {Data[currentJob-1]?.jobSalary}
            Logo = {Data[currentJob-1]?.employerLogo}
            jobDescription = {Data[currentJob-1]?.jobDescription}
            jobPosted = {Data[currentJob-1]?.jobPosted}
            jobExpiration = {Data[currentJob-1]?.jobExpiration}
            jobLink = {Data[currentJob-1]?.jobLink}
          />
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default App
