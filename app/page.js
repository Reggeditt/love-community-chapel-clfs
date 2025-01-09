import { About } from "@/components/splash/about";
import { Events } from "@/components/splash/events";
import { Footer } from "@/components/splash/footer";
import { Hero } from "@/components/splash/hero";
import { MinistriesAndFellowships } from "@/components/splash/ministries-and-fellowships";
import { Nav } from "@/components/splash/nav";
import { ServiceTimes } from "@/components/splash/services";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <ServiceTimes />
      <MinistriesAndFellowships />
      <Events />
      <Footer />
    </main>
  )
}

