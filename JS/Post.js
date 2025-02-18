import { onSubmit } from "./submit.js";
import { onUpload } from "./upload.js";
import { onConvert64 } from "./convert64.js";

export const createPost = (storage, database, renderQuotes) => {
    const div = document.createElement('div');
    div.id = `files`;
    div.className = `tweet-box`;

    const $ = (selector) => div.querySelector(selector);


    const uploadFile = async (fileInput, textInput, progressCallback, database, renderQuotes) => {
        const file = fileInput.files[0];
        if (!file && textInput) {
            return onSubmit(database, renderQuotes, textInput, '', '');
        }

        const storageRef = storage.ref(`uploads/${file.name}`);
    
        if (file.type.startsWith("image/")) {
            onConvert64(fileInput)
                .then((base64) => onUpload(file, storageRef, progressCallback)
                    .then((downloadLink) => onSubmit(database, renderQuotes, textInput || `Uploaded an Image`, downloadLink, base64)));
        } else {
            onUpload(file, storageRef, progressCallback)
                .then((downloadLink) => onSubmit(database, renderQuotes, textInput || `Uploaded a File`, downloadLink, ''));
        } 

    };

    div.innerHTML = /*html*/`
            <div>
                <textarea rows="2" placeholder="What's on your mind?" id="textInput"></textarea><br>
                <input type="file" id="fileInput" style="width:50%">
                <span id="progressText"></span>
                <p id="uploadBtn">Post</p>
            </div>

            
            
            
    `

    $('#uploadBtn').addEventListener('click', () => {
        const cbprogress = (progress) => {
            $('#progressText').textContent = `Uploading: ${+progress ? Math.round(progress) + '%' : progress}`;
        }
        uploadFile($('#fileInput'), $('#textInput').value, cbprogress, database, renderQuotes);
    });

    return div;
};
