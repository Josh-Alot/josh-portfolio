import "./Header.scss";

const Header = () => {
  return (
    <header className="header-container">
      <nav className="navbar">
        <ul>
          <li>
            <a href="#about-me">About me</a>
          </li>
          <li>
            <a href="#my-skills">My skills</a>
          </li>
          <li>
            <a href="#contact-me">Contact me</a>
          </li>
          <li>
            <a href="business-card">Get a business card</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
