import { useState } from 'react';
import Home from "./Home";
import NavBar from "./NavBar";

const Main = ()=>{
    let [page,setPage] = useState ('home');
    let currentPage;
    if(page === 'home')
        currentPage=<Home/>
    else {
        currentPage = <div> Page not found</div>;

    }

    return (
        <div>
            <NavBar navigate = {setPage}/>
            {currentPage}
        </div>
    );
};
export default Main;