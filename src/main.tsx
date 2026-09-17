import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {HttpApp} from "./HttpApp.tsx";
// import App from './App.tsx'

const root = createRoot(document.getElementById('root')!);

// function UseEffectExample() {
//     const [count, setCount] = useState(0);
//
//     useEffect(() => {
//         console.log('count changed')
//     }, [count])
// }

root.render(
    <StrictMode>
        {/*<App />*/}
        <HttpApp/>
    </StrictMode>,
)
