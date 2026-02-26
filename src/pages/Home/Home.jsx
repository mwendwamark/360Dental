import About from "./About/About";
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
    </div>
  );
};

export default Home;
