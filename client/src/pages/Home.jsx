import "../styles/Main.css";
import "../styles/Home.css";

export default function Home() {
  const redirectLogin = () => {
    window.location.href = "/login";
  };
  const redirectCreateAcc = () => {
    window.location.href = "/create-acc";
  };

  return (
    <div className="homePage">
      <h1>Welcome to the Tank Blog</h1>
      
      <h2>
        <button className="button" onClick={redirectLogin}>
          Login
        </button>
        or
        <button className="createButton" onClick={redirectCreateAcc}>
          Create An Account
        </button>
        to get the full experience!
      </h2>
      
    </div>
  );
}
