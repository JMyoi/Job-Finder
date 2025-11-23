function JobCard({companyName, jobTitle, Location, Salary, Logo}){
    return(
        <div className = "border-2 rounded-lg m-2 p-2 hover:shadow-lg hover:bg-gray-100 cursor-pointer">
            <div className = "grid grid-cols-6 gap-3 p-4 justify-items-center px-10 items-center">
                <div className = "col-span-2 border ">
                    <img src={Logo} alt="Company Logo" className = "h-auto w- object-contain"/>//if no image say no image
                </div>
                <div className = "col-span-3 border ">
                    <p className = "font-bold text-base">{jobTitle}</p>
                    <p className = "text-md">{companyName}</p>
                    <p className = "text-sm text-gray-600">{Location}</p>
                    <p className = "text-sm text-green-600 font-semibold">{Salary}</p>
                </div>
                <div className = "border">star</div>
            </div>
        </div>
    )
}
export default JobCard;