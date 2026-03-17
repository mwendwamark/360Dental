import About from "./About/About";
import BookingForm from "./Appointment/BookingForm";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Team from "./Team/Team";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Team />
      <Testimonials />
      <BookingForm />
    </div>
  );
};

export default Home;
