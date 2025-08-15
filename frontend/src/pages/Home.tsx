import AboutMe from "../components/about-me/AboutMe";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";

const Home = () => {
  return (
    <div className="home-container">
      <Header></Header>
      <Hero></Hero>
      <AboutMe></AboutMe>
    </div>
  );
};

export default Home;
