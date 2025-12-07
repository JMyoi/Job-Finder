
function JobCard({companyName, jobTitle, Location, Logo, handleSave, handleUnsave, isSaved}){
    return(
        <div className = "border-2 rounded-lg m-2 p-2 hover:shadow-lg hover:bg-gray-100 cursor-pointer">
            <div className = "grid grid-cols-6 gap-3 p-4 justify-items-center items-center">
                <div className = "col-span-2  ">
                    {(Logo === null)? <img src = "src/assets/noImage.png" className = "h-15 w-15 object-contain"/>  :<img src={Logo} alt="Company Logo" className = "h-auto w-auto object-contain"/>}
                </div>
                <div className = "col-span-3  ">
                    <p className = "font-bold text-sm">{jobTitle}</p>
                    <p className = "text-sm">{companyName}</p>
                    <p className = "text-xs text-gray-600">{Location}</p>
                </div>
                

                
                {(isSaved)? (
                    <div className = "size-8 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" onClick = {(e) => { e.stopPropagation(); handleUnsave(); }}>
                      <img src = "src/assets/goldenStar.png"/>
                    </div>
                ): (
                    <div className = "size-8 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" onClick = {(e) => { e.stopPropagation(); handleSave(); }}>
                        <img src = "src/assets/star.png"/>
                    </div>
                )}
                
            </div>
        </div>
    )
}
export default JobCard;

