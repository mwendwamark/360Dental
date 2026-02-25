import About from "./About/About";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <About/>
      <Services/>
      <Testimonials/>
    </div>
  );
};

export default Home;
