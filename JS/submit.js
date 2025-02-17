export const onSubmit = (database, renderQuotes, text, file, base64) => {
    const name = 'Anonymous';
    

    if (text.length) {
        const newQuoteRef = database.ref('slader').push();
        const quoteObject = {
            name: name,
            quote: text,
            file: file,
            base64: base64,

            timestamp: Date.now()
        };

        newQuoteRef.set(quoteObject)
            .then(() => {
                renderQuotes(database);
            })
            .catch((error) => {
                console.error('Error adding quote: ', error);
            });
    }
}