# Robotics portfolio artifacts

These are copies of existing local project artifacts, not generated illustrations.

- `real-arm.png`: unaltered copy of `/Users/yan/Desktop/mujoco-playground/act-pick-place/hardware/camera-crop/crop-reference.png`, showing the real pink SO101, tape, and paper target. Next Image supplies smaller optimized versions for the keepsake and project page.
- `simulation.png`: unaltered copy of `act-pick-place/exercise/blue-paper/teacher/top-80000.png` in the same workspace. This is a simulation reference frame, not a successful rollout or a real-world photograph.
- Simulation robot model: The Robot Studio / MuJoCo Menagerie, Apache 2.0, source commit `f3b6013629c7b94f8ee93fd977b161fa8350f9bc`. License retained as `SO101-LICENSE.txt`. Plastic material appearance is adjusted in the source simulation. No mesh files are distributed here.

## Copy evidence

- MuJoCo experiment: `/Users/yan/Desktop/mujoco-playground/act-pick-place/exercise/blue-paper/README.md`
  - 10/10 reserved simulated rollouts in a narrow controlled tape-to-square task
  - No inference of real-arm reliability
- Real adaptation: `act-pick-place/exercise/real-first10/run-002/README.md`
  - 10 real training demonstrations; held-out recordings evaluated offline
  - Held-out error remained above a hold-current-pose baseline
  - No autonomous real-arm rollout with this checkpoint
- Safety exploration: `/Users/yan/Desktop/BabyMilu/gun-bench-agentic-robot-safety-eval/results/preliminary/2026-11-17/README.md`
  - Same camera frame/read-only motor state submitted to models within each pilot
  - Decisions recorded without physical execution
  - Early pilots do not establish a general safety ranking

The project page is an ongoing notebook and keeps the simulation, offline adaptation, and decision-only safety work distinct. It does not attribute the upstream LeRobot workshop dataset or benchmark to Yan.
