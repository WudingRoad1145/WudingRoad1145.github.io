"""Generate the portfolio phone-video LUT

Usage: python3 scripts/video-hlg-lut.py /tmp/hlg-to-sdr.cube
Assumes HLG/BT2020, a 1000-nit display and 1.2 system gamma
Hable rolloff and a 2.2 display curve produce the SDR709 edit
No generative frames or changes to the recorded action
"""

import math
import sys

SIZE = 33


def linear(value):
    if value <= 0.5:
        return value * value / 3
    return (math.exp((value - 0.55991073) / 0.17883277) + 0.28466892) / 12


def hable(value):
    return (
        (value * (0.15 * value + 0.05) + 0.004)
        / (value * (0.15 * value + 0.5) + 0.06)
    ) - 0.02 / 0.3


if len(sys.argv) != 2:
    sys.exit("Usage: video-hlg-lut.py OUTPUT.cube")

with open(sys.argv[1], "w") as output:
    output.write('TITLE "HLG BT2020 to SDR709"\nLUT_3D_SIZE 33\n')
    for blue in range(SIZE):
        for green in range(SIZE):
            for red in range(SIZE):
                rgb = [linear(v / (SIZE - 1)) for v in (red, green, blue)]
                luminance = max(1e-8, 0.2627 * rgb[0] + 0.678 * rgb[1] + 0.0593 * rgb[2])
                rgb = [v * luminance ** 0.2 * 10 for v in rgb]
                converted = [
                    1.6605 * rgb[0] - 0.5876 * rgb[1] - 0.0728 * rgb[2],
                    -0.1246 * rgb[0] + 1.1329 * rgb[1] - 0.0083 * rgb[2],
                    -0.0182 * rgb[0] - 0.1006 * rgb[1] + 1.1187 * rgb[2],
                ]
                encoded = [max(0, min(1, hable(max(0, v)) / hable(10))) ** (1 / 2.2) for v in converted]
                output.write(" ".join(f"{v:.6f}" for v in encoded) + "\n")
