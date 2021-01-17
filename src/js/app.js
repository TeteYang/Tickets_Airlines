import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';

document.addEventListener('DOMContentLoaded', ()=>{
    initApp();
    const form = formUI.form;
    //events
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        onFormSubmit();
    })
    //handlers
    async function initApp(){
        await locations.init();
        formUI.setAutocompleteData(locations.shortCities)
    }
    async function onFormSubmit(){
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const departDate = formUI.departDateValue;
        const returnDate = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;
        await locations.fetchTikets({
            origin, 
            destination, 
            departDate, 
            returnDate,
            currency,
        });
        ticketsUI.renderTickets(locations.lastSearch)
    }
});