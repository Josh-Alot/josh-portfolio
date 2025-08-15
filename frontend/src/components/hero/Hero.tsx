import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-container--flex-left">
        <img className="hero-container--flex-left-img" src="" />
      </div>
      <div className="hero-container--flex-right">
        <h1 className="hero-container--flex-right--title">I'm Josh</h1>
        <h2 className="hero-container--flex-right--subtitle">
          I turn your ideas into reality
        </h2>

        <button className="hero-container--flex-right--button">
          Contact Me
        </button>
      </div>
    </section>
  );
};

export default Hero;
