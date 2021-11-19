# 1 - Dithering

[Example](https://sbohmann.github.io/progblog/entries/1_dithering/dithering.html)

Red, green, and blue color depths mean number of possible values, not number of bits.

The default values are 6, 7, 6, as this is possible to represent with one byte per pixel, as

    6 * 7 * 6 = 252

Human visual perception is usually most accurate for green light, hence the assignment of more different values to the green channel, like in the case of 5, 6, 5 bytes per pixel, thius 32, 64, 32 possible values sometimes used to store one pixel in two bytes.

Changes to these values are applied when activating the "Show Dithered Image" button.

New random numbers are used whenever the image is rendered. This would not be done when e.g. rendering a movie, as the different noise in subsequent image would be extremely noticeable. In such scenarios, a fixed random seed or a pre-generated noise image would be used.
