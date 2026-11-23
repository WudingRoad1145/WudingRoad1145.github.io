# Roborock rescue film

Source supplied by Yan: `copy_E1FB2024-5366-4FD9-A748-F52B8A723D7A.MOV` (27.282 seconds, 1080×1920, 39,081,779 bytes). The alternate `IMG_1728.MOV` is 47 minutes 27 seconds and approximately 4 GB. The short timelapse is the website source; neither original is committed.

`rescue.mp4` is a silent, 720×840, 15 fps H.264 edit with fast-start metadata. At 3,420,984 bytes it is about 91% smaller than the supplied short clip. The top 1260px are retained, removing unused floor/boxes while keeping Yan, the robot, the laptop, and laid-out parts. Black-and-white grading, a little contrast and sharpening, and a stepped frame rate create a repair-diary film treatment. This is a deterministic video edit, not a generative reconstruction of the repair.

Reproduce from the original file with FFmpeg:

```sh
ffmpeg -i INPUT.MOV -map 0:v:0 -an \
  -vf 'crop=1080:1260:0:0,scale=720:840:flags=lanczos,fps=15,hue=s=0,eq=contrast=1.12:brightness=0.012:gamma=1.03,unsharp=3:3:0.3' \
  -c:v libx264 -preset slow -crf 27 -maxrate 1600k -bufsize 3200k \
  -pix_fmt yuv420p -movflags +faststart -map_metadata -1 rescue.mp4
ffmpeg -ss 9 -i rescue.mp4 -frames:v 1 -q:v 3 poster.jpg
```

The approximately 70 KB poster can load with the page. The MP4 has no source URL until its section is nearby. Playback is muted, pauses offscreen or in a hidden tab, and supports pause/restart plus chapter seeking. Reduced-motion and data-saver visitors receive the still until choosing play. Only one video is decoded; annotations are small SVG overlays with no per-frame analysis, shaders, or canvas processing.

Chapter notes follow visible actions at 0, 7, 14, and 20 seconds: opening the robot, keeping track of parts, consulting the laptop, and returning to the screws. The specific fault and repair outcome have not been supplied, so the film does not claim a particular diagnosis or successful repair. Update those captions if Yan adds the story.
