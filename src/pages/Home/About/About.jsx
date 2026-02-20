import React from "react";
import "./About.css";
import { FaStar } from "react-icons/fa6";
import { TbGridDots } from "react-icons/tb";
import { LuShapes } from "react-icons/lu";

const About = () => {
  const homeCards = [
    {
      number: "01",
      icon: <TbGridDots />,
      title: "Experienced Dentists",
      description:
        "Our team is composed of highly qualified and compassionate dental professionals with years of hands-on experience.",
    },

    {
      number: "02",
      icon: <LuShapes />,
      title: "Advanced Technology",
      description:
        "We invest in the latest dental technology — from digital X-rays to laser treatments — ensuring every procedure is faster, safer, and more comfortable.",
    },
    {
      number: "03",
      icon: <FaStar />,
      title: "Flexible Scheduling",
      description:
        "We understand that visiting the dentist can be stressful for many. That's why our clinic is designed with your comfort in mind.",
    },
  ];
  return (
    <section className="home_about section">
      <div className="home_about_container container">
        <div className="home_about_headers two_col_headers">
          <span className="small_section_badge">About Us</span>
          <div className="home_about_title_div">
            <h1 className="section_title home_about_title">
              From routine checkups to full smile makeovers - we are with you{" "}
              <em>Every step</em>
            </h1>

            <p className="normal_text">
              Our practice has been recently refurbished with cutting-edge
              equipment in a refreshed and contemporary space. The practice has
              been transformed, but it retains its friendly, family-focused, and
              professional service.
            </p>
          </div>
        </div>
        <div className="home_about_cards">
          {homeCards.map((card, index) => {
            const { icon, title, description, number } = card;
            return (
              <div className="home_about_card" key={index}>
                <div className="home_about_card_left">
                  <div className="home_about_card_number">{number}</div>
                  <div className="home_about_card_icon">{icon}</div>
                </div>
                <div className="home_about_card_right">
                  <div className="home_about_card_title_section">
                    <h3 className="home_about_card_title">{title}</h3>
                    <div className="home_about_card_line"></div>
                  </div>
                  <p className="home_about_card_description">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
