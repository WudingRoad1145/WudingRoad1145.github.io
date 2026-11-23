import Image from "next/image";
import Link from "next/link";
import styles from "./robotics.module.css";

export const metadata = { title: "Robotics, in progress — Yán Fēng" };

export default function RoboticsPage() {
  return (
    <main className={styles.page}>
      <Link className="text-link" href="/#my-world">
        Back to my little world
      </Link>
      <header className={styles.opening}>
        <span className="handwritten">on my workbench right now</span>
        <h1>
          A little arm,
          <br />
          some big questions
        </h1>
        <p>
          Learning how to teach a robot to act — and exploring when it should
          stop and question an instruction.
        </p>
        <span className={styles.status}>
          MuJoCo policy training + SO101 safety exploration · Ongoing
        </span>
      </header>
      <div className={styles.photos}>
        <figure>
          <Image
            src="/robotics/simulation.png"
            width={640}
            height={640}
            alt="A simulated yellow SO101 arm beside blue tape and a paper target in MuJoCo"
          />
          <figcaption>first, a little world in simulation</figcaption>
        </figure>
        <figure>
          <Image
            src="/robotics/real-arm.png"
            width={1000}
            height={1000}
            alt="The real pink SO101 on my workbench, with blue tape and a hand-drawn target"
            priority
          />
          <figcaption>then, the messiness of my real desk</figcaption>
        </figure>
      </div>
      <section className={styles.chapter}>
        <span className="handwritten">01 / learning to move</span>
        <h2>
          Pick up the tape
          <br />
          Put it in the square
        </h2>
        <p>
          A small task with a lot hiding inside it: demonstrations, camera
          framing, grasping, and the gap between a simulated joint and a real
          motor.
        </p>
        <p>
          I’m adapting an ACT imitation-learning policy in MuJoCo, then working
          with recordings from the real SO101 arm.
        </p>
        <div className={styles.observation}>
          <h3>What the experiments show so far</h3>
          <p>
            The blue-tape policy completed all 10 reserved simulated trials in a
            narrow, controlled setup.
          </p>
          <p>
            Fine-tuning on 10 real demonstrations improved the fit to those
            recordings, but held-out prediction error remained high — even a
            hold-current-pose baseline performed better.
          </p>
          <span className="handwritten">
            fitting the recordings isn’t the same as knowing what to do
          </span>
        </div>
        <p>
          This real-data checkpoint has been evaluated offline only — it hasn’t
          yet demonstrated autonomous success on the physical arm.
        </p>
      </section>
      <section className={styles.chapter}>
        <span className="handwritten">02 / learning when to pause</span>
        <h2>
          Should it follow
          <br />
          that instruction?
        </h2>
        <p>
          Alongside policy training, I’m exploring how vision models judge
          proposed actions using the same real camera image and read-only SO101
          arm state.
        </p>
        <p>
          The first pilots record whether a model would authorize, refuse, hold,
          or ask for clarification. The arm does not execute those decisions.
        </p>
        <p>
          These are early observations, not a general safety ranking or evidence
          that a robot is safe in the world.
        </p>
        <span className="handwritten">
          still building, still asking questions
        </span>
      </section>
      <footer className={styles.footer}>
        <p>Built with MuJoCo and LeRobot ACT</p>
        <p>
          Simulation robot model: The Robot Studio / MuJoCo Menagerie, Apache
          2.0
        </p>
        <a
          className="text-link"
          href="mailto:yanffyy@gmail.com?subject=Let%E2%80%99s%20talk%20robots"
        >
          Let’s talk robots ↗
        </a>
      </footer>
    </main>
  );
}
