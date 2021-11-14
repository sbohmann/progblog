function setup(sourceImage) {
    let currentColorDepth = colorDepth(12, 12, 12)
    let canvas = document.getElementById('canvas')
    let context = canvas.getContext('2d')
    let textFields = {
        red: document.getElementById('redColorDepth'),
        green: document.getElementById('greenColorDepth'),
        blue: document.getElementById('blueColorDepth')
    }

    function setupControls() {
        setupColorDepthControls()
        setupOriginalImageButton()
    }

    function showDitheredImage() {
        context.putImageData(dither(sourceImage, currentColorDepth), 0, 0)
    }

    function setupColorDepthControls() {
        document.getElementById('applyColorDapth')
            .onclick = applyColorDepth
    }

    function applyColorDepth() {
        let newColorDepth = {}
        let inputIsApplicable = true
        for (let key in textFields) {
            let value = readColorDepthValue(textFields[key])
            if (value === undefined) {
                inputIsApplicable = false
            } else {
                newColorDepth[key] = value
            }
        }
        if (inputIsApplicable) {
            currentColorDepth = newColorDepth
            showDitheredImage()
        }
    }

    function readColorDepthValue(textField) {
        if (isNaN(textField.value)) {
            return undefined
        }
        let value = Number(textField.value)
        if (!Number.isInteger(value)) {
            return undefined
        }
        if (!colorDepthValueInRange(value)) {
            return undefined
        }
        return value
    }

    function colorDepthValueInRange(value) {
        return value >= 2 && value <= 255
    }

    function setupOriginalImageButton() {
        let originalImageButton = document.getElementById('originalImage')
        originalImageButton.onclick = () => context.putImageData(sourceImage, 0, 0)
    }

    canvas.width = sourceImage.width
    canvas.height = sourceImage.height
    context.putImageData(sourceImage, 0, 0)
    canvas.onclick = showDitheredImage
    setupControls()
}

function colorDepth(red, green, blue) {
    return {red, green, blue}
}

window.onload = () => readSourceImage(setup)
