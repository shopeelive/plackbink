import { createQuoteItem } from './QuoteItem.js';

export const createQuote = (database, renderQuotes) => {
    const div = document.createElement('div');
    div.id = `quoteList`;
    

    database.ref('slader').limitToLast(50).on('value', (snapshot) => {
        div.replaceChildren();
        
        const quotesArray = [];
        snapshot.forEach((childSnapshot) => {
            quotesArray.push({ quoteId: childSnapshot.key, quoteData: childSnapshot.val() });
        });    
        
        quotesArray.reverse();    
        
        quotesArray.forEach(({ quoteId, quoteData }) => {
            quoteData && div.appendChild(createQuoteItem(quoteData, quoteId, database, renderQuotes));
        });
    });    
        
        

    return div;
};
