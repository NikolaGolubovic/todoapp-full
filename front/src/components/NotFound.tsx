import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container-notfound">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content">
        <h1 className="main-heading">This page is gone.</h1>
        <p>...maybe the page youre looking for is not found or never existed.</p>
        <Link to="/" target="blank" className="btn-back">
          Back to home <i className="far fa-hand-point-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
