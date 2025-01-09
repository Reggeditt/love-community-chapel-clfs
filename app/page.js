import { About } from "@/components/about";
import { Events } from "@/components/events";
import { Hero } from "@/components/hero";
import { MinistriesAndFellowships } from "@/components/ministries-and-fellowships";
import { Nav } from "@/components/nav";
import { ServiceTimes } from "@/components/services";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <ServiceTimes />
      <MinistriesAndFellowships />
      <Events />
      {/* <Testimonials /> */}
      {/* <Footer /> */}
    </main>
  )
}

