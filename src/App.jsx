import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import JobCard from './components/JobCard.jsx'  
import ExpandedJobCard from './components/ExpandedJobCard.jsx'
import {res} from './Data.js'



function App() {

  

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

  const [currentJob, setCurrentJob] = useState();//holds the current job Id that is displayed

  return (
    <div className = "">
      <Header/>
      <div className = "grid grid-cols-3 border m-5 p-5">{/*grid with 3 columns the cards span one column the expandedCard spans two.*/}
        <div className = ""> 
          {Data.map(job =>(
            <JobCard
              key = {job.id}
              companyName = {job.employerName}
              jobTitle = {job.jobTitle}
              Location = {job.jobLocation}
              Salary = {job.jobSalary}
              Logo = {job.employerLogo}
            />))
          }
        </div>
        <div className = "col-span-2 justify-self-center"> 
          
          Expanded Job Display
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default App
