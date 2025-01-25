import { useState } from 'react';
import Home from "./Home";
import NavBar from "./NavBar";
import LoginForm from './LoginForm';

const Main = ()=>{
    let [page,setPage] = useState ('home');
    let currentPage;
    if(page === 'home')
        currentPage=<Home/>

    else if (page === 'login')
        currentPage=<LoginForm />
    
        
    

    return (
        <div>
            <NavBar navigate = {setPage}/>
            {currentPage}
        </div>
    );
};
export default Main;