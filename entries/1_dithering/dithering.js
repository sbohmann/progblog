function dither(sourceImage, colorDepth) {
    const [w, h] = [sourceImage.width, sourceImage.height]
    let target = new ImageData(w, h)

    function pixelOffset(x, y) {
        return (y * w + x) * 4
    }

    function getPixel(x, y) {
        let offset = pixelOffset(x, y)
        return {
            r: sourceImage.data[offset],
            g: sourceImage.data[offset + 1],
            b: sourceImage.data[offset + 2]
        }
    }

    function putPixel(x, y, pixel) {
        let offset = pixelOffset(x, y)
        target.data[offset] = pixel.r
        target.data[offset + 1] = pixel.g
        target.data[offset + 2] = pixel.b
        target.data[offset + 3] = 255
    }

    function ditheredValue(value, depth, randomValue) {
        let lower = Math.floor(value * depth / 0xff) * 0xff / depth
        let upper = Math.ceil(value * depth / 0xff) * 0xff / depth
        let sentinel = lower + randomValue * (upper - lower)
        if (sentinel < value) {
            return upper
        } else {
            return lower
        }
    }

    function ditheredPixel(pixel) {
        let randomValue = Math.random()
        return {
            r: ditheredValue(pixel.r, colorDepth.red, randomValue),
            g: ditheredValue(pixel.g, colorDepth.green, randomValue),
            b: ditheredValue(pixel.b, colorDepth.blue, randomValue)
        }
    }

    for (let y = 0; y < h; ++y) {
        for (let x = 0; x < w; ++x) {
            let pixel = ditheredPixel(getPixel(x, y))
            putPixel(x, y, pixel)
        }
    }

    return target
}
