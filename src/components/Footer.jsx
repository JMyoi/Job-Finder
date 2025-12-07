
function Footer(){

    return(
        <div className = "flex flex-col items-center justify-center py-5 bg-blue-100 ">
            <div className = "flex flex-row justify-center gap-4 my-4">
                <a href = "https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch" target = "_blank"> <p className = "text-sm underline">JSearchAPI</p> </a>
                <a target = "_blank" href = "https://github.com/JMyoi/Job-Finder"><p className = "text-sm underline">GitHub</p></a>    
            </div>
            <p>@ 2025 Jay Chen</p>
        </div>
    )

}

export default Footer;