import { Header } from "../Components/Header";
import './NotFoundPage.css';

export const NotFoundPage = ({cart}) => {
    return(
        <>
            <link rel="shortcut icon" href="../../public/404-error.png" type="image/x-icon" />
            <title>404 Page Not Found</title>

            <Header cart={cart}/>

            <div className="not-found-message">
                <h1>Page not found</h1>
            </div>
        </>
    );
}