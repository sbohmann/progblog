function dither(source) {
    const [w, h] = [source.width, source.height]
    let target = new ImageData(w, h)
    let canvas = document.getElementById('canvas')
    canvas.width = w
    canvas.height = h

    function pixelOffset(x, y) {
        return (y * w + x) * 4
    }

    function get(x, y) {
        let offset = pixelOffset(x, y)
        return {
            r: source.data[offset],
            g: source.data[offset + 1],
            b: source.data[offset + 2]
        }
    }

    function put(x, y, pixel) {
        let offset = pixelOffset(x, y)
        target.data[offset] = pixel.r
        target.data[offset + 1] = pixel.g
        target.data[offset + 2] = pixel.b
        target.data[offset + 3] = 255
    }

    function ditheredValue(value, numberOfDifferentValues, randomValue) {
        let lower = Math.floor(value * numberOfDifferentValues / 0xff) * 0xff / numberOfDifferentValues
        let upper = Math.ceil(value * numberOfDifferentValues / 0xff) * 0xff / numberOfDifferentValues
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
            r: ditheredValue(pixel.r, 16, randomValue),
            g: ditheredValue(pixel.g, 16, randomValue),
            b: ditheredValue(pixel.b, 16, randomValue)
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
