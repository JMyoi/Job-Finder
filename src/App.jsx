import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import JobCard from './components/JobCard.jsx'    


function App() {

  return (
    <div className = "">
      <Header/>
      <div className = "">//grid with 3 columns the cards span one column the expandedCard spans two.
        <JobCard/>  
      </div>
      <Footer/>
    </div>
  )
}

export default App
