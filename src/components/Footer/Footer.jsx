import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import SecondaryButton from "../ActionButton/ActionButton";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { FaInstagram, FaFacebookF, FaTiktok, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

/* ─────────────────────────────────────────────
   Footer Component
───────────────────────────────────────────── */
const Footer = ({ heroImage }) => {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact Us", to: "/contact" },
  ];

  const serviceLinks = [
    { label: "Preventive Care", to: "/services" },
    { label: "Oral Surgery", to: "/services" },
    { label: "Emergency Care", to: "/services" },
    { label: "Orthodontics", to: "/services" },
  ];

  const servicePills = [
    "Preventive Care",
    "Oral Surgery",
    "Emergency Care",
    "Orthodontics",
  ];

  const socialLinks = [
    { label: "Instagram", icon: <FaInstagram />, href: "#" },
    { label: "Facebook", icon: <FaFacebookF />, href: "#" },
    { label: "TikTok", icon: <FaTiktok />, href: "#" },
    { label: "LinkedIn", icon: <FaLinkedinIn />, href: "#" },
    { label: "Twitter / X", icon: <FaXTwitter />, href: "#" },
  ];

  return (
    <footer className="footer__root">
      {/* ── ZONE 1: CTA Banner Card ───────────────── */}
      <div className="footer__cta_wrapper">
        <div className="footer__cta_card">
          {/* Left half */}
          <div className="footer__cta_left">
            {/* <span className="footer__cta_badge">Our Services</span> */}

            <h2 className="footer__cta_heading section_title blue">
              Smile Brighter.
              <br />
              We've Got You Covered.
            </h2>

            <p className="footer__cta_body">
              From routine check-ups to advanced orthodontic treatments, our
              expert team at Smile 360 is here to give you the healthy,
              confident smile you deserve.
            </p>

            <span className="footer__cta_specialties_label">
              Our Specialties:
            </span>

            {/* <div className="footer__cta_pills">
              {servicePills.map((pill) => (
                <span key={pill} className="footer__cta_pill">
                  {pill}
                </span>
              ))}
            </div> */}
            <div>
              <PrimaryBtn priBtnText="View Our Services" to="/services" />
            </div>
          </div>

          {/* Right half — image with fade mask */}
          <div className="footer__cta_image_wrap">
            <img
              src={heroImage}
              alt="Smile 360 Dental Clinic"
              className="footer__cta_image"
            />
          </div>
        </div>
      </div>

      {/* ── ZONE 2: Main Footer Body ──────────────── */}
      <div className="footer__body">
        <div className="footer__body_inner">
          {/* Row A — Three columns */}
          <div className="footer__columns">
            {/* Column 1 — Quick Links */}
            <div className="footer__col">
              <h3 className="footer__col_heading">Quick Links</h3>
              <ul className="footer__link_list">
                {quickLinks.map(({ label, to }) => (
                  <li key={label}>
                    <NavLink to={to} className="footer__link">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 — Our Services */}
            <div className="footer__col">
              <h3 className="footer__col_heading">Our Services</h3>
              <ul className="footer__link_list">
                {serviceLinks.map(({ label, to }) => (
                  <li key={label}>
                    <NavLink to={to} className="footer__link">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Connect */}
            <div className="footer__col">
              <h3 className="footer__col_heading">Connect With Us</h3>
              <p className="footer__connect_tagline">
                Follow us for tips, updates &amp; smiles.
              </p>

              <div className="footer__social_row">
                {socialLinks.map(({ label, icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="footer__social_btn"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>

              <p className="footer__contact_info">info@smile360.com</p>
              <p className="footer__contact_info">+254 700 000 000</p>
            </div>
          </div>

          {/* Row B — Giant brand name */}
          <div className="footer__brand_row">
            <p className="footer__brand_name" aria-hidden="true">
              360 Dental<sup className="footer__brand_sup">°</sup>
            </p>
          </div>
        </div>
      </div>

      {/* ── ZONE 3: Bottom Bar ────────────────────── */}
      <div className="footer__bottom_bar">
        <p className="footer__bottom_text">
          &copy; 2025 Smile 360 Dental. All rights reserved.&nbsp;|&nbsp;
          <a href="#" className="footer__privacy_link">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
