import "./AboutMe.scss";

const AboutMe = () => {
  return (
    <section className="about-me-container">
      <div className="about-me-container--flex-left">
        <h2 id="about-me" className="about-me-container--flex-left--title">
          About Me
        </h2>
      </div>
      <div className="about-me-container--flex-right">
        <p className="about-me-container--flex-right--description">
          Front-end developer focused on building clean and responsive user
          interfaces. Currently exploring Web3 technologies to create
          decentralized applications with seamless user experiences. Interested
          in integrating blockchain tools like ethers.js and working at the
          intersection of design, usability, and smart contracts.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
