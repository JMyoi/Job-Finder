

function ExpandedJobCard({companyName, jobTitle, Location, Salary, Logo, jobDescription, jobPosted, jobExpiration, jobLink}){
    return(
        <div className = "flex border-2 rounded-lg m-5 p-8 flex-col gap-5 items-center">

            <div className = "flex flex-row ">
                <div className = "mr-5">
                   {(Logo === null)? <img src = "src/assets/noImage.png" className = " object-contain w-24 h-24"/>  :<img src={Logo} alt="Company Logo" className = " object-contain w-24 h-24"/>}
                </div>
                    <div className = " flex flex-col justify-center">
                       <p className = "font-bold text-2xl">{companyName}</p>
                        <p className = "text-xl">{jobTitle}</p> 
                    </div>
            </div>


            <div className = "flex">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 cursor-pointer">
                    <a target = "_blank" href = {jobLink}>Apply</a>
                </button>    
            </div>
            <div className = "flex flex-col w-full p-5  items-center">
                <p className = "text-md text-gray-600"> {Location}</p>
                {(Salary !== null) && <p className = "text-md text-green-600 font-semibold">Salary: {Salary}</p>}
                <p className = "text-sm text-gray-500">Posted on: {new Date(jobPosted).toLocaleDateString()}</p>
                <p className = "text-sm text-gray-500">Expires on: {new Date(jobExpiration).toLocaleDateString()}</p>
                <p className = "p-4"> Description: {jobDescription}</p>
            </div>
                
        </div>

    )

}

export default ExpandedJobCard;
