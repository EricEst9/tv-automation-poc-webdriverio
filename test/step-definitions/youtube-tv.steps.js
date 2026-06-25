const { Given, When, Then } = require('@wdio/cucumber-framework');

// Helper functions for remote control and DOM synchronization
async function pulsarMando(tecla, esperaMs = 500) {
    console.log(`>>> REMOTE: Pressing ${tecla}`);
    await browser.keys([tecla]);
    await browser.pause(esperaMs);
}

async function waitForDOMText(texto) {
    await browser.waitUntil(async () => {
        return await browser.execute((t) => {
            return document.documentElement.textContent.toLowerCase().includes(t.toLowerCase());
        }, texto);
    }, { timeout: 15000, timeoutMsg: `Timeout waiting for DOM text: ${texto}` });
}

Given('I open the YouTube TV app', async () => {
    console.log('>>> Opening app...');
    await browser.url('https://www.youtube.com/tv');
    await waitForDOMText('empezar');
    await browser.pause(1000); 
});

Given('I skip the Privacy and Sign In screens', async () => {
    console.log('>>> Skipping Privacy...');
    await pulsarMando('ArrowDown');
    await pulsarMando('Enter');
    await waitForDOMText('privacidad'); 
    
    await pulsarMando('Escape'); 
    await waitForDOMText('empezar');

    console.log('>>> Skipping Sign In / QR...');
    await pulsarMando('ArrowUp');
    await pulsarMando('Enter');
    await waitForDOMText('yt.be'); 

    console.log('>>> Selecting Guest Mode...');
    await pulsarMando('ArrowDown');
    await waitForDOMText('infantil');
    await pulsarMando('ArrowDown');
    await pulsarMando('Enter');

    await waitForDOMText('inicio'); 
    await browser.pause(1000);
});

When('I open the search bar from the sidebar', async () => {
    console.log('>>> Opening Search...');
    await pulsarMando('ArrowLeft');
    await pulsarMando('ArrowLeft'); 
    await pulsarMando('ArrowUp');   
    await pulsarMando('Enter');
    await waitForDOMText('buscar'); 
});

When(/^I type "(.*)" using the on-screen virtual keyboard$/, async (palabra) => {
    console.log(`>>> Typing ${palabra} on virtual keyboard...`);
    for (let i = 0; i < palabra.length; i++) {
        const letra = palabra[i].toUpperCase();
        const tecla = await $(`//*[text()="${letra}"]`);
        await tecla.waitForDisplayed({ timeout: 5000 });
        await tecla.click();
        await browser.pause(400); 
    }

    console.log('>>> Clicking SEARCH button...');
    const btnBuscar = await $('//*[text()="BUSCAR" or text()="SEARCH" or text()="Buscar"]');
    await btnBuscar.waitForDisplayed({ timeout: 5000 });
    await btnBuscar.click();
});

Then('I can navigate to the results and play the first video for 10 seconds', async () => {
    console.log('>>> Navigating to video...');
    await browser.pause(4000); 
    await pulsarMando('ArrowDown');
    await pulsarMando('ArrowDown');
    await pulsarMando('Enter');

    console.log('>>> Watching video for 10 seconds...');
    await browser.pause(10000);
    console.log('>>> TEST COMPLETED.');
});
