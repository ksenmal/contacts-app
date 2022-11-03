import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="error-page">
      <h1>Sorry, an unexpected error has occured.</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>
        Go to <Link to={'/'}>main</Link> page 
      </p>
    </div>
  );
}