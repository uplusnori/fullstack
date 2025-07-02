import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          My Community
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/posts">게시판</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
