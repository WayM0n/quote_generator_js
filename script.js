const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitter = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
function loading(){
    loader.hidden = false;
    quoteAuthor.hidden = true;
}
function complete(){
    loader.hidden = true;
    quoteAuthor.hidden = false;
}
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    let getAuthor=quote.author.split(',')[0];
    quoteAuthor.textContent = ((getAuthor=='type.fit')?"Unknown":getAuthor);
    if(quote.text.length >25){
        quoteText.classList.add('long-quote-text');
    }else{
        quoteText.classList.remove('long-quote-text');
    }
    quoteText.textContent = quote.text;
    complete();

}
async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){

    }
}
//Tweet Quote
function tweetQuote(){
    const xUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(xUrl,'_blank');
}
twitter.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click',()=>newQuote());


//on Load
getQuotes();