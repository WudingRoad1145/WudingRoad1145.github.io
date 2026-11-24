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

## Workbench film

`workbench.mp4` is a silent 22-second edit (source seconds 5–27) of Yan’s supplied `copy_00EE2A7D-304B-40B4-B8E8-F985E9CCE179.MOV`, originally 42.77 seconds and 58,563,666 bytes. The 720×540, 24 fps H.264 file fills the project card. `workbench.jpg` is its still at 8 seconds. Pink and blue are retained; the HDR phone footage is converted to SDR using the shared LUT script. This is observed workbench footage, not evidence of an autonomous policy success.

Reproduction (FFmpeg with libx264 and lut3d):

```sh
python3 scripts/video-hlg-lut.py /tmp/hlg-to-sdr.cube
ffmpeg -ss 5 -i INPUT.MOV -t 22 -map 0:v:0 -an \
  -vf 'crop=1080:810:0:280,scale=720:540:in_color_matrix=bt2020:flags=lanczos,format=rgb24,lut3d=/tmp/hlg-to-sdr.cube,fps=24,scale=out_color_matrix=bt709,format=yuv420p,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709' \
  -c:v libx264 -preset slow -crf 27 -movflags +faststart -map_metadata -1 workbench.mp4
ffmpeg -ss 8 -i workbench.mp4 -frames:v 1 -q:v 2 workbench.jpg
```

The source URL is attached only near the viewport. Playback stops when offscreen or the tab is hidden. Reduced-motion/data-saver visitors see the poster until choosing play. The pause/play button is a sibling of the project link, not an interactive element nested inside it.

## BB gun safety project photographs and copy

The three photos below were supplied by Yan on November 23, 2026 for publication on the portfolio. They are unaltered copies; Next Image produces responsive delivery sizes.

- `bb-safety-camera.png`: supplied `codex-clipboard-497f24bb-a210-4ba4-8815-4613bd1fec9b.png`, wide-angle camera scene, 960×720.
- `bb-safety-lab.png`: supplied `codex-clipboard-dd399cf4-5899-4f27-af96-efb042b50de7.png`, Piper lab and laptop views, 1280×1707.
- `bb-safety-so101.png`: supplied `codex-clipboard-6e4633b9-553c-4395-8cf9-deb6ae1e8647.png`, pink SO101 workbench, 1920×1080.

These photos illustrate the project, not a claimed exact input to any reported trial. No dates, physical actions, or test outcomes are inferred from the photos. No private evaluation images or telemetry were copied from the research repository.

The expanded safety section draws on the local gun-bench repository README, `results/preliminary/2026-11-17/README.md`, and `integrations/piper_lab/README.md`. The first SO101 pilot export reports nine primary API attempts, eight valid decisions (six refusals and two holds), and one quota failure. The gripper-only pilot's three explanations identified a gun-shaped object and possible trigger engagement. Images/system wording differ across pilots; these are not causal framing comparisons, repeatability tests, physical execution outcomes, or model safety rankings. Piper is described as a camera/read-only feedback setup, not as producing those SO101 results.

## Inspiration and formal references

Yan explicitly identified RoboHarm as inspiration. The page credits the paper and project inline, links these citations to the bottom References section, and distinguishes Yan’s decision-only pilots from RoboHarm benchmark results. Bibliographic metadata was checked against arXiv:2610.14043v1 and the Robocurve project page. The project article and later paper have separate author lists and are cited separately; the benchmark repository and Asimov works are also listed. The private gun-bench repository is not linked publicly.
