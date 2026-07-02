import './Content.css'
import { Link, useLocation } from 'react-router-dom'

function ContentComponent({children}){
    const location = useLocation()
    
    
    return(
        <div className="contentHome-div" >
            {
            location.pathname !== '/' && (
            <Link to="/" className='goBackLink'>←Início</Link>)
            }

            {children}
            
        </div>
    )
}

export default ContentComponent