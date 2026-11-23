import Monkay from "@/components/Monkay";
import HumansILove from "@/components/HumansILove";
import BeliefOpening from "@/components/BeliefOpening";
import PersonalDesk from "@/components/PersonalDesk";
import RoborockRescue from "@/components/RoborockRescue";

export default function HomePage() {
  return (
    <main className="portfolio-home">
      <BeliefOpening />
      <section
        className="keepsakes-section"
        id="my-world"
        aria-labelledby="keepsakes-title"
      >
        <PersonalDesk />
      </section>
      <RoborockRescue />
      <Monkay />
      <HumansILove />
    </main>
  );
}
