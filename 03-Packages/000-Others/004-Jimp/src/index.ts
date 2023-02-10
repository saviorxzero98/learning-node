import * as jimp from 'jimp';

const imagePath = 'image.png';

let convertImage = async (path, type) => {
    let image = await jimp.read(path);
    let thumbFileBuffer = await image.resize(10, 10).getBufferAsync(type);
    let base64 = thumbFileBuffer.toString('base64');
    console.log(base64);
}

convertImage(imagePath, jimp.MIME_JPEG);