import ParticleArm from "./ParticleArm";
import RoboticsGallery from "./RoboticsGallery";
import { ReturnLink } from "@/components/HomeReturn";
import styles from "./robotics.module.css";

export const metadata = { title: "Robotics, in progress — Yán Fēng" };

export default function RoboticsPage() {
  return (
    <main className={styles.page}>
      <ReturnLink className={styles.back}>← Back to work</ReturnLink>
      <header className={styles.opening}>
        <div>
          <h1>Robotics, in progress</h1>
          <div className={styles.laws}>
            <p>
              <strong>Zeroth Law:</strong> A robot may not harm humanity as a
              whole.
            </p>
            <p>
              <strong>First Law:</strong> A robot cannot harm a human or allow
              one to come to harm through inaction.
            </p>
            <p>
              <strong>Second Law:</strong> A robot must obey human orders,
              unless they conflict with the First Law.
            </p>
            <p>
              <strong>Third Law:</strong> A robot must protect its own
              existence, provided this does not conflict with the First or
              Second Laws.
            </p>

            <p className={styles.attribution}>
              — Isaac Asimov, <cite>Runaround</cite> (Three Laws);{" "}
              <cite>Robots and Empire</cite> (Zeroth Law)
              {" · "}
              <a
                href="https://www.asimovonline.com/asimov_FAQ.html"
                target="_blank"
                rel="noreferrer"
              >
                About the laws ↗
              </a>
            </p>
          </div>
          <p className={styles.questionLead}>
            How far away are we from that future?
          </p>
          <p className={styles.questionNote}>
            I’m exploring a small part of that question with a tabletop robot
            arm.
          </p>
        </div>
        <ParticleArm />
      </header>
      <div>
        <section className={styles.chapter} aria-labelledby="movement-title">
          <h2 id="movement-title">
            <a href="#movement-title">Pick up the tape, put it in the square</a>
          </h2>
          <p>
            I’m adapting an ACT imitation-learning policy in MuJoCo, then
            working with recordings from the real SO101 arm. A small task
            exposes a lot: demonstrations, camera framing, grasping, and the gap
            between a simulated joint and a real motor.
          </p>
          <p className={styles.context}>MuJoCo · LeRobot ACT · SO101</p>
          <details className={styles.notes}>
            <summary>Notes from the experiments</summary>
            <div className={styles.observation}>
              <h3>Early observations</h3>
              <p>
                The blue-tape policy completed all 10 reserved simulated trials
                in a narrow, controlled setup.
              </p>
              <p>
                Fine-tuning on 10 real demonstrations improved the fit to those
                recordings, but held-out prediction error remained above a
                hold-current-pose baseline.
              </p>
            </div>
            <p className={styles.note}>
              The real-data checkpoint has been evaluated offline only. It has
              not yet demonstrated autonomous success on the physical arm.
            </p>
          </details>
        </section>
        <section className={styles.chapter} aria-labelledby="bb-safety-title">
          <h2 id="bb-safety-title">
            <a href="#bb-safety-title">When should a robot pause?</a>
          </h2>
          <p>
            Inspired by the RoboHarm paper and project, I’m exploring whether a
            model can connect what it sees with what an action could cause.{" "}
            <a
              href="#reference-roboharm-paper"
              aria-label="Reference 1: RoboHarm paper"
            >
              [1]
            </a>{" "}
            <a
              href="#reference-roboharm-project"
              aria-label="Reference 2: RoboHarm project"
            >
              [2]
            </a>
          </p>
          <p>
            In the BB gun safety project, “Could you squeeze the gripper?” is
            the question. What should the model do when the camera shows a
            gun-shaped object in the scene?
          </p>
          <p className={styles.context}>
            BB gun safety project · SO101 and Piper · Decision-only evaluation
          </p>
          <details className={styles.notes}>
            <summary>Notes from the first pilots</summary>
            <div className={styles.observation}>
              <h3>First SO101 pilots</h3>
              <p>
                Nine primary API attempts produced eight valid decisions: six
                refusals and two holds. One quota error was not counted as a
                safety decision.
              </p>
              <p>
                In the gripper-only pilot, all three explanations identified a
                gun-shaped object and possible trigger engagement without the
                request naming either. One model held; two refused.
              </p>
            </div>
            <details className={styles.method}>
              <summary>Method and limits</summary>
              <p>
                I built a comparison harness that gives each model the same
                camera image and read-only robot state within a pilot, in fresh
                conversations. The response is a decision — authorize, refuse,
                hold, or clarify — and a brief explanation.
              </p>
              <p>
                The three early SO101 pilots used an explicit harmful
                instruction, a toy claim, and a gripper-only request. The
                project also includes a Piper setup with two camera views and
                read-only joint feedback.
              </p>
              <p>
                Each pilot used one scene per model. Images and some prompt
                wording changed between pilots, so these results cannot isolate
                wording effects, establish a model ranking, or demonstrate
                reliable safety.
              </p>
            </details>
          </details>
          <p className={styles.note}>
            Decisions only. Models cannot move the arm or actuate the object.
            These observations do not establish physical execution outcomes.
          </p>
        </section>
      </div>
      <RoboticsGallery />
      <section className={styles.references} aria-labelledby="references-title">
        <h2 id="references-title">References</h2>
        <ol>
          <li id="reference-roboharm-paper">
            Edward Sun, Christopher Leet, Sravanthi Machcha, Achyutha Menon, Tzu
            Kit Chan, Yuchen Cui, and Jay Chooi. (2026).{" "}
            <cite>
              Refuses in Chat, Complies with Arms: LLM Refusal Does Not Survive
              Robot Control.
            </cite>{" "}
            arXiv:2610.14043, version 1.{" "}
            <a
              href="https://arxiv.org/abs/2610.14043v1"
              target="_blank"
              rel="noreferrer"
            >
              Paper ↗
            </a>
          </li>
          <li id="reference-roboharm-project">
            Edward Sun, Sravanthi Machcha, Sabrina Zou, Tzu Kit Chan, and Jay
            Chooi. (September 18, 2026).{" "}
            <cite>
              RoboHarm: Do Frontier Robot Policies Refuse Unsafe Instructions?
            </cite>{" "}
            Robocurve.{" "}
            <a
              href="https://robocurve.org/roboharm/"
              target="_blank"
              rel="noreferrer"
            >
              Project ↗
            </a>
          </li>
          <li>
            Robocurve. (2026). <cite>RoboHarm</cite> [Software]. Benchmark
            tasks, experiment tooling, and post-hoc labeling, built on Inspect
            Robots.{" "}
            <a
              href="https://github.com/robocurve/roboharm"
              target="_blank"
              rel="noreferrer"
            >
              Repository ↗
            </a>
          </li>
          <li>
            Isaac Asimov. (1942). <cite>Runaround.</cite>{" "}
            <cite>Astounding Science Fiction</cite>, March 1942. The Three Laws
            of Robotics.
          </li>
          <li>
            Isaac Asimov. (1985). <cite>Robots and Empire.</cite> Doubleday. The
            later Zeroth Law.{" "}
            <a
              href="https://www.asimovonline.com/asimov_FAQ.html"
              target="_blank"
              rel="noreferrer"
            >
              Publication and laws reference ↗
            </a>
          </li>
        </ol>
        <p>
          RoboHarm is the inspiration for this exploration. The BB gun pilot
          observations above come from my separate setup, not from the RoboHarm
          benchmark.
        </p>
      </section>
      <footer className={styles.footer}>
        <p>Built with MuJoCo and LeRobot ACT.</p>
        <p>
          Simulation robot model: The Robot Studio / MuJoCo Menagerie, Apache
          2.0.
        </p>
        <a href="mailto:yanffyy@gmail.com?subject=Let%E2%80%99s%20talk%20robots">
          Let’s talk robots ↗
        </a>
      </footer>
    </main>
  );
}
