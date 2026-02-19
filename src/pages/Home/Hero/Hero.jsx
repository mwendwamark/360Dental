import React from "react";
import "./Hero.css";
import homeHero from "../../../assets/Procedure1.webp";
import awardImg from "../../../assets/HomeHeroImg.webp";
import dentistImg from "../../../assets/Dentist.webp";
import SecondaryBtn from "../../../components/SecondaryBtn/SecondaryBtn";
import { MdVerified } from "react-icons/md";

const Hero = () => {
  return (
    <React.Fragment>
      <section className="home_hero below_nav">
        {/* Background */}
        <div className="home_hero_bg">
          <img src={homeHero} alt="360Dental Dental Procedure" />
        </div>

        {/* Overlay */}
        <div className="home_hero_overlay"></div>

        {/* Content */}
        <div className="home_hero_container container">
          {/* Left */}
          <div className="home_hero_left_contents">
            <h1 className="hero_styles">Dentistry done differently</h1>
            <p>
              We love your teeth. That's why we use non-invasive methods and
              state of the art materials to bring out their natural beauty and
              give you another reason to smile.
            </p>
            <div>
              <SecondaryBtn variant="maroon" secBtnText="Book an appointment" />
            </div>
          </div>

          {/* Right — Floating Cards */}
          <div className="home_hero_right_contents">
            <div className="hero_floating_cards">

              {/* Card 1: Award — image IS the background */}
              <div className="hero_card hero_award_card">
                <div className="hero_card_img">
                  <img src={awardImg} alt="Dental Excellence" />
                </div>
                <div className="hero_card_info">
                  <h3>Excellence Is A Process And Not A Destination</h3>
                  <p>Award winning Specialist Orthodontist</p>
                </div>
              </div>

              {/* Card 2: Dentist Profile */}
              <div className="hero_card hero_dentist_card">
                <div className="hero_dentist_img">
                  <img src={dentistImg} alt="Dr. Curteniyo" />
                </div>
                <div className="hero_dentist_info">
                  <h4>
                    Dr. Curteniyo <MdVerified className="verified_icon" />
                  </h4>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Hero;