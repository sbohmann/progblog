function readSourceImage(handler) {
    let rawImage = new Image()
    rawImage.src = 'sourceImage.jpg'
    rawImage.addEventListener('load', () => {
        let canvas = document.createElement('canvas');
        canvas.width = rawImage.width;
        canvas.height = rawImage.height;
        let context = canvas.getContext('2d')
        context.drawImage(rawImage, 0, 0, rawImage.width, rawImage.height);
        handler(context.getImageData(0, 0, rawImage.width, rawImage.height))
    })
}
