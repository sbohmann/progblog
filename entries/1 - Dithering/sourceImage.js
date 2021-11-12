function readSourceImage(handler) {
    let rawImage = new Image()
    rawImage.src = 'sourceImage.jpg'
    rawImage.addEventListener('load', () => {
        createImageBitmap(rawImage)
            .then(handler)
    })
}
