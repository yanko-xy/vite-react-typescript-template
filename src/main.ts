import ReactDOM from 'react-dom/client';
import MyRouter from './router';
console.log('main');


ReactDOM.createRoot(document.getElementById('root')!).render(
    MyRouter()
);