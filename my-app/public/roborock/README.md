# Roborock rescue film

Source supplied by Yan: `copy_E1FB2024-5366-4FD9-A748-F52B8A723D7A.MOV` (27.282 seconds, 1080×1920, 39,081,779 bytes). The alternate `IMG_1728.MOV` is 47 minutes 27 seconds and approximately 4 GB. The short timelapse is the website source; neither original is committed.

`rescue.mp4` is silent, 720×840, 15 fps H.264 with fast-start metadata (2,776,729 bytes). The top 1260px retain Yan, the robot, laptop, and laid-out parts. HLG/BT2020 is converted to SDR before a soft monochrome grade. Downsampling to 240×280 and nearest-neighbor upscaling bake a subtle pixel texture into the file. CSS adds feathered edges, an irregular rounded mask, and a translucent finish; no canvas or live pixel-processing work is needed.

Reproduce from the original file with FFmpeg:

```sh
python3 scripts/video-hlg-lut.py /tmp/hlg-to-sdr.cube
ffmpeg -i INPUT.MOV -map 0:v:0 -an \
  -vf 'crop=1080:1260:0:0,fps=15,scale=240:280:in_color_matrix=bt2020:flags=area,format=rgb24,lut3d=/tmp/hlg-to-sdr.cube,format=yuv420p,hue=s=0,eq=contrast=0.92:brightness=0.02,scale=720:840:flags=neighbor,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709' \
  -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart -map_metadata -1 rescue.mp4
ffmpeg -ss 9 -i rescue.mp4 -frames:v 1 -q:v 3 poster.jpg
```

The MP4 has no source URL until its section is nearby. Playback is muted, pauses offscreen or in a hidden tab, and supports chapter seeking. A small pause/play button appears over the film on hover/focus and remains visible when paused or on touch screens. There is no transport bar or restart control. Reduced-motion and data-saver visitors receive the still until choosing play. The Big Woman page reuses the edit with its own manual native controls.

Chapter notes follow visible stages at 0, 6, 16, and 22 seconds: underside cover/screws, removed bumper and covers laid out, access inside the shell, and returning to the housing. The diagrams are illustrative stage annotations, not tracked component highlights or a procedural repair guide.

[The iFixit Q Revo teardown](https://www.ifixit.com/Teardown/Roborock+Q+Revo:+Teardown/177533) informed component terminology and screw organization. It covers the Q Revo, not a verified Qrevo Pro repair or radar replacement, and is linked as a reference only. Yan confirmed the radar servo broke and she replaced the radar. The exact replacement timestamp and final functional test were not supplied; neither is claimed by the timed captions.
