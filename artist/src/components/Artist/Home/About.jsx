import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="about" id="H2">
        <div className="a-left">
          <div className="blue">About Us</div>
          <div className="tt-title">
            <h1 className="nam">Government of India</h1>
            <h1 className="nam">Artist Registration Portal</h1>
          </div>
          <div className="s-title">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            reprehenderit dolor doloribus neque, facilis maxime voluptas atque.
            Quas vero temporibus repudiandae accusantium recusandae aperiam.
            Dolor error sint facilis impedit nobis!
          </div>
          <div className="s-title">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
            minus sit quae quos atque tempore blanditiis porro explicabo
            dignissimos corporis, iusto ea quod mollitia tenetur in? Explicabo
            ullam id maiores, ea similique facere illum pariatur architecto sed?
            Error, incidunt illum!
          </div>

          <div className="s-title">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            reprehenderit dolor doloribus neque, facilis maxime voluptas atque.
            Quas vero temporibus repudiandae
          </div>
          {/* <Link to="/signup">
            <div className="btn">Explore Events</div>
          </Link> */}
        </div>
        <div className="a-right">
          <img
            src="https://idcardgenrator.s3.ap-northeast-1.amazonaws.com/siteimage/divyanshi-verma-h3SyJYsqYSo-unsplash.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default About;
