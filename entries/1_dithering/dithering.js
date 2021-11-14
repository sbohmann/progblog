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
        let numberOfDifferentValues = 12
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
