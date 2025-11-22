import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import JobCard from './components/JobCard.jsx'  


function App() {




  return (
    <div className = "">
      <Header/>
      <div className = "grid grid-cols-3 border m-5 p-5">{/*grid with 3 columns the cards span one column the expandedCard spans two.*/}
        <div className = ""> 
          <JobCard/> 
          <JobCard/>
          <JobCard/>
          <JobCard/>
          <JobCard/>
          <JobCard/>
          <JobCard/>
        </div>
        <div className = "col-span-2 justify-self-center"> Expanded Job Display</div>
      </div>
      <Footer/>
    </div>
  )
}

export default App
