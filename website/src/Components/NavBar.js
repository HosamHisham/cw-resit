import './NavBar.css'
const NavBar=({navigate})=>{
    return(
        <nav>
            <div clasName="logo" onClick={()=>{
                navigate('home')
            }}>
            cook book
        </div>
        <div>
            <ul>
                <li onCick={()=>{
                    navigate('login')
                }}>login</li>
                <li onClick={()=>{
                    navigate('register')
                }}>register</li>
            </ul>
        </div>
        </nav>
    );
}
export default NavBar