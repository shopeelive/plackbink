export const createQuoteItem = (quote, quoteId, database, renderQuotes) => {
    const { name: newName, quote: text, timestamp: date, file: myFile, base64: base64} = quote;

    const content = (quote, file, base64) => {
        if (base64) {
            return `
                <details>
                    <summary>${quote.length ? quote : `Uploaded an Image`}</summary>
                    <img src="${base64}" alt="Image" style = "border-radius: 0%; width: 50%;height: auto;"> 
                    <br>
                    <a href="${file.link}">${file.fileName } | ${file.size}kB</a> 
                </details>`
        }

        if (file) {
            return `
                <details>
                    <summary>${quote.length ? quote : `Uploaded a File`}</summary>
                    <a href="${file.link}">${file.fileName } | ${file.size}kB</a> 
                </details>`
        }

        return `
        <span>${quote}</span>
        `
    }

    const deleteQuote = (quoteId, db) => {
        if (db.textContent === 'Delete') {
            db.textContent = 'Confirm Delete';
            setTimeout(() => db.innerText = `Delete`, 2000);
        } else {
            (database.ref('slader').child(quoteId).remove()
                .then(() => renderQuotes(database))
                .catch((error) => console.error('Error deleting quote: ', error)))
        }
    };

    const copyQuote = (text, cb) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                cb.innerText = `Copied`;
                setTimeout(() => cb.innerText = `Copy`, 2000);
            })
            .catch((error) => console.error('Failed to copy quote: ', error));
    };

    
    const div = document.createElement('div');
    const $ = (selector) => div.querySelector(selector);

    div.className = 'quote-item';
    div.innerHTML = /*html*/`
        <div class = 'tweet'>
        <img src="data:image/webp;base64,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" alt="Image">
        <div class="tweet-content">
            <p><b>User123</b> <span style="color: #888888;">${moment(date).fromNow()}</span></p>


            ${content(text, myFile, base64)}

            <div class="tweet-actions">
                <span id="copy-button">Copy</span>
                <span id="delete-button">Delete</span>
             </div>
        </div>
        <span class="tweet-options">⋮</span>
        </div>
    `;

    $('#copy-button').addEventListener('click', () => copyQuote(text, $('#copy-button')));
    $('#delete-button').addEventListener('click', () => deleteQuote(quoteId, $('#delete-button')));

    return div;
};
