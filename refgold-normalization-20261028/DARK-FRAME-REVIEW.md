# Dark-frame crop review

These 23 flags concern automatic boundary detection, not a finding that the artwork is too dark. No brightness, contrast, color, text or artwork edits were made. The printed frame inside the outer black padding can be very dark and can fail the row/column brightness threshold. Expanded crops preserve that frame.

The initial detector required pixels brighter than 30/255 in more than 20% of each row/column. Visible pixels outside a proposal (maximum channel above 60/255) or an unusual aspect ratio triggered review. Pixel counts below are evidence of an unsafe initial crop, not a recommendation to lighten the card. Two cases were caught by aspect ratio alone.

| Image | Bright pixels outside initial crop | Highest outside channel | Initial crop (x,y,w,h) | Final crop |
|---|---:|---:|---|---|
| [RG-TH-Hiding-In-The-Garbage.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Hiding-In-The-Garbage.png) | 2726 | 194 | 176,160,1681,1171 | 131,128,1770,1232 |
| [RG-TH-Launching-The-Assault.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Launching-The-Assault.png) | 2341 | 194 | 177,160,1680,1170 | 130,128,1772,1232 |
| [RG-TH-Revolution.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Revolution.png) | 3246 | 174 | 175,129,1685,1229 | 131,128,1770,1231 |
| [RG-TH-Scramble.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Scramble.png) | 4554 | 204 | 138,160,1720,1171 | 130,128,1772,1232 |
| [RG-TH-Traffic-Control.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Traffic-Control.png) | 0 | 30 | 131,160,1771,1199 | 130,128,1772,1232 |
| [RG-TH-A-Few-Maneuvers.png](https://wiki.swccg.com/wiki/File:RG-GEMP-A-Few-Maneuvers.png) | 2400 | 204 | 176,159,1682,1172 | 131,129,1770,1231 |
| [RG-TH-All-Wings-Report-In.png](https://wiki.swccg.com/wiki/File:RG-GEMP-All-Wings-Report-In.png) | 4656 | 255 | 175,128,1727,1203 | 131,128,1772,1231 |
| [RG-TH-Clash-Of-Sabers.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Clash-Of-Sabers.png) | 51 | 70 | 174,128,1727,1232 | 132,128,1769,1232 |
| [RG-TH-Corellian-Slip.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Corellian-Slip.png) | 9387 | 226 | 176,160,1683,1171 | 133,132,1769,1227 |
| [RG-TH-Sorry-About-The-Mess.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Sorry-About-The-Mess.png) | 0 | 46 | 132,129,1769,1202 | 131,128,1771,1231 |
| [RG-TH-Strangle.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Strangle.png) | 13 | 80 | 176,129,1725,1231 | 132,128,1770,1232 |
| [RG-TH-We-Can-Still-Outmaneuver-Them.png](https://wiki.swccg.com/wiki/File:RG-GEMP-We-Can-Still-Outmaneuver-Them.png) | 159 | 104 | 176,130,1724,1201 | 131,128,1771,1232 |
| [RG-TH-Expand-The-Empire.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Expand-The-Empire.png) | 663 | 195 | 131,128,1727,1203 | 129,127,1773,1233 |
| [RG-TH-Flagship-Operations.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Flagship-Operations.png) | 3008 | 173 | 176,160,1683,1171 | 132,128,1769,1231 |
| [RG-TH-I-Had-No-Choice.png](https://wiki.swccg.com/wiki/File:RG-GEMP-I-Had-No-Choice.png) | 50 | 177 | 131,128,1771,1227 | 130,127,1772,1233 |
| [RG-TH-Responsibility-Of-Command.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Responsibility-Of-Command.png) | 2163 | 182 | 132,129,1728,1202 | 130,129,1771,1231 |
| [RG-TH-Weapon-Malfunction.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Weapon-Malfunction.png) | 205 | 177 | 132,128,1770,1221 | 131,128,1771,1232 |
| [RG-TH-Atmospheric-Assault.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Atmospheric-Assault.png) | 2819 | 147 | 131,128,1728,1203 | 130,128,1772,1230 |
| [RG-TH-Dark-Maneuvers.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Dark-Maneuvers.png) | 1197 | 206 | 176,160,1683,1171 | 132,129,1767,1231 |
| [RG-TH-Our-First-Catch-Of-The-Day.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Our-First-Catch-Of-The-Day.png) | 169 | 137 | 131,133,1728,1226 | 130,129,1771,1230 |
| [RG-TH-Short-Range-Fighters.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Short-Range-Fighters.png) | 535 | 163 | 176,129,1725,1202 | 132,128,1769,1232 |
| [RG-TH-Tallon-Roll.png](https://wiki.swccg.com/wiki/File:RG-GEMP-Tallon-Roll.png) | 449 | 137 | 132,160,1727,1200 | 131,129,1770,1231 |
| [RG-TH-We-Have-A-Prisoner.png](https://wiki.swccg.com/wiki/File:RG-GEMP-We-Have-A-Prisoner.png) | 179 | 107 | 131,128,1767,1232 | 130,127,1772,1233 |

Evidence: `sheets/review-*.png` shows initial green crop proposals; `sheets/exceptions-*.png` shows corrected faces. Original full-resolution files are in the verified original-remasters.zip archive. Any future brightness adjustment should be a separate reviewed pass using side-by-side comparisons, not an automatic normalization step.
