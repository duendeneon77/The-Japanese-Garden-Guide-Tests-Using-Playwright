import './VideoDiv.css'
function VideoDiv({titulo, descricao, video}){

    return(
    <div className='videoDiv'>
        <h2>{titulo}</h2>

        <iframe width="100%"
        height="100%"
        src={video}
        title={titulo}
        frameBorder="0"
        allowFullScreen>
        </iframe>
        <p>{descricao}</p>


    </div>
    )

    



}
export default VideoDiv