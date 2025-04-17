// on connection get all available offers and call createOfferElse
socket.on('availableOffers', (offers) => {
    console.log('available offers:', offers);
    createOfferElse(offers);
});


// Someone just made a new offer, and we are already here - call createOfferElse

socket.on('newOfferAwaiting', (offers) => {
    console.log('new offer awaiting:', offers);
    createOfferElse(offers);
});


const createOfferElse = (offers) => {
    // make a green call button for the new Offer

    const answerElement = document.querySelector('#answer');
    offers.forEach((offer) => {
        const newAnswerButton = document.createElement('button');
        newAnswerButton.classList.add('btn', 'btn-success', 'btn-sm', 'm-1');
        newAnswerButton.innerText = `Answer ${offer.offererUsername}`;
        newAnswerButton.addEventListener('click', (e) => answerOffer(offer)) // call answerOffer function(scripts.js file)
        answerElement.appendChild(newAnswerButton);
    });
};