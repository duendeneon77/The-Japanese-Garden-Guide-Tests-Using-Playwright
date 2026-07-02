import './Header.css'
import Topbar from '../TopBarComponent/Topbar';
import logoTitle from '/headerImages/logoTitle.png'

function Header(){

    return(
        <div
  className="header-div"
>
            
                <img src={logoTitle} alt="" />
            
                <Topbar/>
        </div>
    )
}
export default Header;