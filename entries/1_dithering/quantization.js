function quantize(sourceImage, colorDepth) {
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

    function quantizedValue(value, depth, randomValue) {
        return Math.round(value * depth / 0xff) * 0xff / depth
    }

    function ditheredPixel(pixel) {
        let randomValue = Math.random()
        return {
            r: quantizedValue(pixel.r, colorDepth.red, randomValue),
            g: quantizedValue(pixel.g, colorDepth.green, randomValue),
            b: quantizedValue(pixel.b, colorDepth.blue, randomValue)
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
