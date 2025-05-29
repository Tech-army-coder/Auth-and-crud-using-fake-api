import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'; 
const Footer = () => {
  const currentYear = new Date().getFullYear(); 
  return (
    <footer className="bg-dark text-light d-flex flex-wrap justify-content-between align-items-center pt-4 pb-4 border-top px-3 fixed-bottom">
      <div className="col-md-4 mb-0 text-center text-md-start ">
        <p className="mb-0">&copy; {currentYear} Company, Inc</p>
      </div>   

      <ul className="list-unstyled d-flex justify-content-center mb-0">
        <li className="ms-3">
          <a href="https://twitter.com" className="text-light" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
        </li>
        <li className="ms-3">
          <a href="https://instagram.com" className="text-light" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
        </li>
        <li className="ms-3">
          <a href="https://facebook.com" className="text-light" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;