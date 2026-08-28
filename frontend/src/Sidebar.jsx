import "./Sidebar.css"


function Sidebar() {
    return (

        <section className="sidebar">
            <button>
                <img src="src/assets/blacklogo.png" alt="gptlogo" className="logo"></img>
               <span> <i className="fa-solid fa-pen-to-square"></i> </span>
                 </button>


                <div className="history">
                    <li>History 1</li>
                    <li>History 1</li>
                    <li>History 1</li>
                    <li>History 1</li>
                    <li>History 1</li>
                    <li>History 1</li>
                    <li>History 1</li> 
                    <li>History 1</li>

                </div>

                <div className="sign">
                    <p>By Abhishek Kumar &hearts;</p>
                </div>

        </section>
    )
}

export default Sidebar