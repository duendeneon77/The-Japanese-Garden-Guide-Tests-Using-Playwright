import { useNavigate } from 'react-router-dom'
import './MoreMenu.css'

function MoreMenu() {
    const navigate = useNavigate()
    const base = import.meta.env.BASE_URL;

    return (
        <div className="moreMenuContent">
            <div className="categoryDiv" onClick={() => navigate("/others/rocks" )}>
                <img
                    src={`${base}menuOthersImages/rocks.png`}
                    alt="coverImage"
                />
                <h3>A importância das Pedras</h3>
            </div>

            <div className="categoryDiv" onClick={() => navigate("/others/toro" )}>
                <img
                    src={`${base}menuOthersImages/toro.png`}
                    alt="coverImage"
                />
                <h3>Torô, a luminária de pedra</h3>
            </div>

            <div className="categoryDiv" onClick={() => navigate("/others/water" )}>
                <img
                    src={`${base}menuOthersImages/water.png`}
                    alt="coverImage"
                />
                <h3>A presença da Água no Jardim japonês</h3>
            </div>

            <div className="categoryDiv" onClick={() => navigate("/others/bridge" )}>
                <img
                    src={`${base}menuOthersImages/bridge.png`}
                    alt="coverImage"
                />
                <h3>Pontes no jardim japonês</h3>
            </div>
        </div>
    )
}

export default MoreMenu