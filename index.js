async function iniateReadingTextFromImage() {
    getVideoFromCam();
}


async function getVideoFromCam() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
        facingMode: {
            exact: 'environment'
          }
    });
    
const video = document.getElementById('video');
    const worker = new Tesseract.createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    video.srcObject = stream;
    video.play();
    video.addEventListener('playing', () => {
       
        document.getElementById('textRead').addEventListener('click', async e => {
           // if (e.code !== 'Space') return;
            const canvas = createCanvasEl(video);

            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          //  const imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
           const {data:{text}} = await worker.recognize(canvas);
            const textFound = text.replace(/\s/g, ' ');
             document.getElementById('text').innerHTML = textFound;
              console.log(textFound);

        });
    });


};
 function createCanvasEl(video) {
   // const canvas = document.createComment('canvas');
   const canvas = document.getElementById('canvas');
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    return canvas;
 }

iniateReadingTextFromImage();
