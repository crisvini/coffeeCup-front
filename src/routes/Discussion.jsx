import { useParams, useNavigate} from "react-router-dom"

const Discussion = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const handleLike = () => {
        alert('Discussão curtida')
        return navigate('/')
    }

    return (
        <div>
            <div>Discussion {id}</div>
            <button onClick={handleLike}>Curtir</button>
        </div>
    )
}

export default Discussion