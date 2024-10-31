import './Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
    return <div>
    <h1 className='headings'>Welcome to My Blog Platform</h1>
    <Link to='/register'>Go to the Register-Page</Link>
    </div>
}

export default Home