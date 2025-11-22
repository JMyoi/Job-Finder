function JobCard({companyName, jobTitle, Location, Salary, Logo}){
    return(
        <div className = "">
            <div className = "grid grid-cols-6 gap-3 p-4 justify-items-center px-10 ">
                <div className = "col-span-2 border">
                    Image
                </div>
                <div className = "col-span-3 border">
                    Information
                </div>
                <div className = "border">star</div>
            </div>


        </div>
    )
}
export default JobCard;