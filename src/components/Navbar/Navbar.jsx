import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import "./Navbar.css";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Nav links data
  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contacts" },
  ];

  // Handle scroll behavior (hide/show)
  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Add shadow/border on scroll
    if (currentScrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Always show at top
    if (currentScrollY < 100) {
      setIsVisible(true);
    } else {
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      // Simple throttle for performance
      window.requestAnimationFrame(controlNavbar);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlNavbar]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <nav
        className={`navbar ${!isVisible ? "navbar-hidden" : ""} ${
          isScrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="container navbar_container">
          {/* Logo */}
          <Link to="/" className="navbar_logo" onClick={closeDrawer}>
            360Dental
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar_links_desktop">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav_link ${isActive ? "nav_link_active" : ""}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Action Button */}
          <div className="navbar_action_desktop">
            <SecondaryBtn secBtnText="Book Appointment" variant="white" />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="navbar_hamburger"
            onClick={toggleDrawer}
            aria-label="Toggle Menu"
          >
            <MdMenu size={32} color="white" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`navbar_backdrop ${isDrawerOpen ? "backdrop_open" : ""}`}
        onClick={closeDrawer}
      />

      {/* Mobile Drawer */}
      <div className={`navbar_drawer ${isDrawerOpen ? "drawer_open" : ""}`}>
        <button
          className="drawer_close"
          onClick={closeDrawer}
          aria-label="Close Menu"
        >
          <MdClose size={36} color="white" />
        </button>

        <div className="drawer_content">
          <div className="drawer_links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `drawer_link ${isActive ? "drawer_link_active" : ""}`
                }
                onClick={closeDrawer}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="drawer_action" onClick={closeDrawer}>
            <SecondaryBtn secBtnText="Book Appointment" variant="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
