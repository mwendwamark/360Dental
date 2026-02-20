import React from "react";
import "./Services.css";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import ActionButton from "../../../components/ActionButton/ActionButton";
import TeethCleaning from "../../../assets/TeethCleaning.svg";
import TeethProsthesis from "../../../assets/TeethProsthesis.svg";
import Braces from "../../../assets/Braces.svg";
import DentalCare from "../../../assets/DentalCare.svg";
import ToothFilling from "../../../assets/ToothFilling.svg";
import DentalCheckup from "../../../assets/DentalCheckup.svg";

const Services = () => {
  const servicesHomeCards = [
    {
      icon: DentalCheckup,
      title: "Dental Checkup",
      description:
        "From fillings to crowns and bridges, we restore damaged teeth, improving both their function and appearance.",
    },
    {
      icon: TeethProsthesis,
      title: "Oral Surgery",
      description:
        "For complex needs, we provide dental implants, wisdom teeth extractions, and surgery to restore appearance.",
    },
    {
      icon: DentalCare,
      title: "Emergency Care",
      description:
        "If you're in pain or facing an urgent dental issue, we offer prompt, gentle, attentive care to help you feel better.",
    },
    {
      icon: Braces,
      title: "Orthodontics",
      description:
        "Straighten your teeth and improve your smile with traditional braces or clear aligners for lasting confidence.",
    },
    {
      icon: TeethCleaning,
      title: "Cosmetic Dentistry",
      description:
        "Enhance the natural beauty of your smile with services like teeth whitening, veneers, and smile makeovers.",
    },
    {
      icon: ToothFilling,
      title: "Dental Repair",
      description:
        "From fillings to crowns and bridges, we restore damaged teeth, improving both their function and appearance.",
    },
  ];

  return (
    <section className="home_services section">
      <div className="home_services_container container">
        <div className="home_services_headers two_col_headers">
          <div className="home_services_headers_left">
            <span className="small_section_badge maroon">our services</span>
            <h2 className="section_title">
              We are committed to providing a range of dental services.
            </h2>
          </div>

          <div className="home_services_headers_right">
            <PrimaryBtn priBtnText="View All Services" />
          </div>
        </div>

        <div className="home_services_cards">
          {servicesHomeCards.map((service, index) => (
            <div className="home_services_card" key={index}>
              <div className="home_services_card_icon">
                <img src={service.icon} alt={service.title} />
              </div>
              <h3 className="home_services_card_title sub_section_title">
                {service.title}
              </h3>
              <p className="home_services_card_description">
                {service.description}
              </p>
              <div className="home_services_card_btn_wrapper">
                <ActionButton
                  text="Learn More"
                  to={`/services#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                  variant="outline"
                  color="blue"
                  className="service_card_btn"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
