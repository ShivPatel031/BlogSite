import { Link } from "react-router-dom";

export function Logo({ h }) {
  return (
    <Link to="/">
      <img
        src="https://res.cloudinary.com/shivcloudinary/image/upload/v1728883073/blog-site-favicon-color_xi8att.png"
        alt="Blog site logo"
        style={{ height: `${h}px` }}
      />
    </Link>
  );
}
