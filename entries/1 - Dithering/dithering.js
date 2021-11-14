function dither(source) {
    const [w, h] = [source.width, source.height]
    let target = new ImageData(w, h)
    let canvas = document.getElementById('canvas')
    canvas.width = w
    canvas.height = h

    function pixelOffset(y, x) {
        return (y * w + x) * 4
    }

    function get(x, y) {
        let offset = pixelOffset(y, x)
        return {
            r: source.data[offset],
            g: source.data[offset + 1],
            b: source.data[offset + 2]
        }
    }

    function put(x, y, pixel) {
        let offset = pixelOffset(y, x)
        target.data[offset] = pixel.r
        target.data[offset + 1] = pixel.g
        target.data[offset + 2] = pixel.b
        target.data[offset + 3] = 255
    }

    function ditheredValue(value, randomValue) {
        let numberOfDifferentValues = 2
        let steps = numberOfDifferentValues - 1
        let valueStep = 0xff / (steps)
        for (let index = 0; index < steps; ++index) {
            if (randomValue < value * (index + 1) / numberOfDifferentValues) {
                let factor = steps - index
                return valueStep * factor
            }
        }
        return 0x00
    }

    function ditheredPixel(pixel) {
        let randomValue = Math.random() * 0xff
        return {
            r: ditheredValue(pixel.r, randomValue),
            g: ditheredValue(pixel.g, randomValue),
            b: ditheredValue(pixel.b, randomValue)
        }
    }

    for (let y = 0; y < h; ++y) {
        for (let x = 0; x < w; ++x) {
            let pixel = ditheredPixel(get(x, y))
            put(x, y, pixel)
        }
    }

    canvas.getContext('2d').putImageData(source, 0, 0)

    canvas.onclick = () => canvas.getContext('2d').putImageData(target, 0, 0)
}

window.onload = () => readSourceImage(dither)
