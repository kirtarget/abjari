import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <span>
        © 2022
        <a href="/">Abjari</a>. All Rights Reserved.
      </span>
      <ul>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <a href="#">Licensing</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
