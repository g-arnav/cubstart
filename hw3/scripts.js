const runCoco = async () => {
    // BEGIN PART 3
    const net = await cocoSsd.load();
    console.log("Coco loaded");
    detect(net);
    // END PART 3
};

const detect = async (net) => {
    const img = document.getElementById("img");
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Set canvas height and width
    const canvas = document.getElementById("mesh");
    // BEGIN PART 4
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    // END PART 4

    // Make predictions
    // BEGIN PART 5
    const obj = await net.detect(img);
    // END PART 5

    // Draw mesh
    // BEGIN PART 6
    const ctx = canvas.getContext("2d");
    // END PART 6
    drawRect(obj, ctx);
    // Generate caption
    getCaption(obj);
    // Make image visible after applying boxes
    img.style.visibility = "visible";
};

const drawRect = (predictions, ctx) => {
    // Loop through each prediction
    predictions.forEach((prediction) => {
        // Extract boxes and classes
        const [x, y, width, height] = prediction["bbox"];
        const text = prediction["class"];

        // Set styling
        const color = Math.floor(Math.random() * 16777215).toString(16);
        ctx.strokeStyle = "#" + color;
        ctx.font = "18px Arial";

        // Draw rectangles and text
        ctx.beginPath();
        ctx.fillStyle = "#" + color;
        ctx.fillText(text, x, y);
        ctx.rect(x, y, width, height);
        ctx.stroke();
    });
};

const getCaption = (predictions) => {
    // BEGIN PART 7
    predictions.forEach(async (prediction) => {
        const caption = document.getElementById("caption");
        const entity = prediction["class"];
        try {
            // Access token provided
            const accessToken = "e1d1588c7928ec2a9c5d07fc1f7c4a3022ed1ffb";
            // Store the response from GET request
            const response = await axios.get(
                `https://owlbot.info/api/v4/dictionary/${entity}`,
                {headers: {Authorization: `Token ${accessToken}`}}
            );
            const data = response.data;
            const entry = data.definitions[0];
            let lineText = " ";
            if (entry.example) {
                lineText = entry.example;
            } else {
                lineText = entry.definition;
            }
            if (entry.emoji) {
                lineText += ' ' + entry.emoji
            }
            const line = document.createElement("p");
            line.innerText = lineText;
            caption.appendChild(line);
        } catch (e) {
            const line = document.createElement("p");
            line.innerText = data;
            caption.appendChild(line);
            console.log(e);
        }

    })
    // END PART 7
}

// BEGIN PART 8
// "input" is current undefined, since it hasn't been initialized yet.
// Initialize it here to the appropriate element on the HTML document.
const img_upload = document.getElementById("img-upload")
img_upload.addEventListener("change", (event) => {
    const caption = document.getElementById("caption");
    caption.replaceChildren();
    const img = document.getElementById("img");
    img.src = URL.createObjectURL(event.target.files[0])
    runCoco();
})
// END PART 8
