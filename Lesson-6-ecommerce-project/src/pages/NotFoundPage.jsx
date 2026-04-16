import { Header } from "../Components/Header";
import './NotFoundPage.css';

export const NotFoundPage = () => {
    return(
        <>
            <link rel="shortcut icon" href="../../public/404-error.png" type="image/x-icon" />
            <title>404 Page Not Found</title>

            <Header />

            <div className="not-found-message">
                <h1>Page not found</h1>
            </div>
        </>
    );
}