import React from "react";
import "./Testimonials.css";
import patientImg1 from "../../../assets/user1.webp";
import patientImg2 from "../../../assets/user2.webp";
import patientImg3 from "../../../assets/user3.webp";
import B4_After from "../../../assets/B4_After.webp";

const Testimonials = () => {
  const testimonialData = [
    {
      summary: "Wonderful Experience!",
      description:
        "Going to the dentist is never a pleasant experience but if you have to go, I'd definitely recommend Smile 360. Everything about them is commendable - from the aesthetics to the customer service, the professionalism to the environment, the equipment to the well organised structure of their service, I had zero complaints!",
      patientName: "Adewale Manuwa",
      patientImg: patientImg1,
      serviceReceived: "Braces Installation",
    },
    {
      summary: "Highly Recommended!",
      description:
        "I was here to continue my braces treatment at their Lagos office, and I can't praise them enough! Dr. Nidhi, along with the amazing assistants Juliet and Yatunde made every visit comfortable and productive. Their attention to detail and dedication to patient care is unmatched, and the facility itself is top-notch.",
      patientName: "Shola",
      patientImg: patientImg2,
      serviceReceived: "Orthodontic Service",
    },
    {
      summary: "Amazing Experience!",
      description:
        "Absolute professional service all round. From the receptionist to the nurses to the dentists. Very warm, neat and welcoming environment making customers feel at home. The staff were incredibly attentive and made sure I was comfortable throughout. Also, seeing my name on the welcome board outside made the experience even better!",
      patientName: "Kehinde Bamgboye",
      patientImg: patientImg3,
      serviceReceived: "Scaling and Polishing",
    },
  ];

  return (
    <section className="home_testimonial section">
      <div className="home_testimonial_container container">
        {/* Section Header */}
        <div className="home_testimonial_headers">
          <span className="small_section_badge maroon">Testimonials</span>
          <h2 className="section_title blue home_testimonial_title">
            What our patients say.
          </h2>
        </div>

        <div className="home_testimonial_cards">
          {testimonialData.map((testimonial, index) => (
            <div className="home_testimonial_card" key={index}>
              <div className="testimonial_card_title">
                <h3 className="sub_section_title">"{testimonial.summary}"</h3>
                <p>{testimonial.description}</p>
              </div>
              <div className="home_testimonial_capsule">
                <div className="testimonial_image">
                  <img
                    src={testimonial.patientImg}
                    alt={testimonial.patientName}
                    width={100}
                    height={100}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div className="testimonial_service_and_name">
                  <p>{testimonial.serviceReceived}</p>
                  <p>{testimonial.patientName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="home_testimonial_footer">
          <img src={B4_After} alt="Cleaning results before and after in 360 Dental" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
