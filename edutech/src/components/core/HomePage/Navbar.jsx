import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavbarLinks } from '../../../data/Navbar-Link';
import Logo from '../../../assets/Logo/Logo-Full-Light.png';
import { useSelector, useDispatch } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { categories } from '../../../services/apis';
import { logout } from '../../../services/operations/authAPI';
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.cart || { totalItems: 0 });

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth || { token: null });
  const { user } = useSelector((state) => state.profile || { user: null });
  console.log("token:", token);
  console.log("user:", user);
  console.log("user image:", user?.image);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res?.data?.data || []);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex h-14 items-center justify-center border-b border-b-richblack-700 bg-richblack-900 w-full fixed top-0 left-0 z-50">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="StudyNotion" width={160} height={42} loading="lazy" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className={`group relative flex cursor-pointer items-center gap-1 ${location.pathname.startsWith("/catalog") ? "text-yellow-25" : "text-richblack-25"}`}>
                    <p>{link.title}</p>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="mt-0.5">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>

                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks?.length ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={i}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path || "/"}>
                    <p className={`${location.pathname === link?.path ? "text-yellow-25" : "text-richblack-25"} hover:text-yellow-25 transition-all duration-200`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Icons and Login / Signup */}
        <div className="flex gap-x-4 items-center">
          {/* Search Icon */}
          {token !== null && (
            <button className="text-richblack-25 hover:text-yellow-25 transition-all duration-200 cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}

          {/* Cart Icon */}
          {token !== null && (
            <Link to="/dashboard/cart" className="relative text-richblack-25 hover:text-yellow-25 transition-all duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && location.pathname !== "/login" && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-95 transition-all duration-200 cursor-pointer">
                Log in
              </button>
            </Link>
          )}
          {token === null && location.pathname !== "/signup" && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-95 transition-all duration-200 cursor-pointer">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && user && (
            <div className="relative cursor-pointer group flex items-center">
              <div className="border border-richblack-700 flex items-center justify-center rounded-full w-[30px] h-[30px] overflow-hidden bg-richblack-700">
                <img
                  src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || "U"} ${user?.lastName || ""}`}
                  alt={`${user?.firstName || "User"}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || "U"} ${user?.lastName || ""}`;
                  }}
                />
              </div>

              <div className="invisible absolute top-[118%] right-0 z-[1000] flex w-[120px] flex-col rounded-md bg-richblack-800 border border-richblack-700 text-richblack-100 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 overflow-hidden">
                <Link to="/dashboard/my-profile" className="w-full">
                  <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm hover:bg-richblack-700 hover:text-richblack-25 transition-all duration-200">
                    Dashboard
                  </div>
                </Link>
                <div
                  onClick={() => dispatch(logout(navigate))}
                  className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm hover:bg-richblack-700 hover:text-richblack-25 transition-all duration-200"
                >
                  Log Out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
