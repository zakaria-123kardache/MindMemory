async function fetchCard()
{   
    try{
        let res = await fetch('card.json');
        let data = await res.json();

    }catch(error)
    {
        console.error('Error fetching data:', error);
    }
    
}
fetchCard();