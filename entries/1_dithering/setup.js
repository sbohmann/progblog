function setup(sourceImage) {
    let canvas = document.getElementById('canvas')
    canvas.width = sourceImage.width
    canvas.height = sourceImage.height
    canvas.getContext('2d').putImageData(sourceImage, 0, 0)
    canvas.onclick = () => canvas
        .getContext('2d')
        .putImageData(dither(sourceImage, currentColorDepth), 0, 0)
}

function colorDepth(red, green, blue) {
    return {red, green, blue}
}

let currentColorDepth = colorDepth(12, 12, 12)

window.onload = () => readSourceImage(setup)
