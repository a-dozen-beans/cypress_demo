import moment from 'moment'


Cypress.Commands.add('isMainPageDisplayed', () => {
    cy.get('#__layout > div > nav')
        .should('exist')
        .get('#main-content')
        .should('exist')
        .get('#main-content > section > h1 > span')
        .should('contain', 'Upcoming events')
})

Cypress.Commands.add('chooseDate', (year, month, day) => {
    //this solution works only for a couple of years before and after 2021 (those that are visible in the datepicker
    // would be good to also add navigating between different year ranges
    cy.get('.vc-title')
        .click()
        .get('.vc-nav-title')
        .click()
        .get(`[aria-label="${year}"]`)
        .click()
        .get(`[aria-label^="${month}"]`)
        .click()
        //would be better to avoid using waits like that but I am a bit time constrained
        .wait(1000)
        .get('.vc-weeks div')
        .contains(day)
        .click()
})

Cypress.Commands.add('compareDates', (year, month, day) => {
    var date_header = moment(`${year}-${month}-${day}`).format("dddd, MMMM D, YYYY")
    var date_eventcard = moment(`${year}-${month}-${day}`).format("ddd MMM D YYYY")
    cy.get('#main-content > section > h1 > span')
        .should('be.visible')
        .and('contain', date_header)
        .log(date_header)
        .log(date_eventcard)
        .get('#main-content > section')
        .find('[aria-label^="Event date is"]')
        .each(($el) => cy.wrap($el).should('contain', date_eventcard))

})

Cypress.Commands.add('checkForNoEvents', () => {
    cy.get('#main-content > section > div > h1')
        .should('contain', 'No events today')
})

Cypress.Commands.add('seeTodaysEvents', () => {
    cy.get('[href="/today"]')
        .click()
    cy.url().should('contain', '/today')
    cy.get('#main-content > section > h1 > span')
        .should('be.visible')
        .should('contain', 'Today’s events:')
})


Cypress.Commands.add('seeFeaturedEvents', () => {
    cy.get('[href="/featured"]')
        .click()
    cy.url()
        .should('contain', '/featured')
    cy.get('#main-content > section > h1 > span')
        .should('be.visible')
        .should('contain', 'Featured Events:')
})


Cypress.Commands.add('getEventNumber', () => {
    return cy.get('#main-content > section > div')
        .find('[aria-label^="Event card"]')
})

Cypress.Commands.add('clickOnEventCard', (value) => {
    cy.get('#search-results')
        .find(`[aria-label^="Event card"]:contains(${value})`)
        .click()
})
Cypress.Commands.add('getSearchResultNumber', () => {
    return cy.get('#search-results')
        .find('[aria-label^="Event card"]')
})

Cypress.Commands.add('searchPhrase', (value) => {
    cy.get('.search__input')
        .type(value)
        .type('{enter}')
})

Cypress.Commands.add('searchEventsWithPhrase', (value) => {
    return cy.get('#search-results')
        .find(`[aria-label^="Event card"]:contains(${value})`)
})

Cypress.Commands.add('searchResultsForPhraseVisible', (value) => {
    cy.get('#search-results-header')
        .should('be.visible')
        .contains(`Search results for "${value}"`)
        .get('#search-results')
        .should('be.visible')
})

//add check if the search results total number is correct

Cypress.Commands.add('checkTotalNumberOfSearchResults', (value) =>{
    cy.get('#main-content > section > div > p')
        .should('contain', `Showing 0 to ${value} of ${value} total results`)
})

Cypress.Commands.add('filterByOrganization', (value) => {
    cy.get('#orgSelect')
        .select(value)
        .get('#search-results')
        .find('label:contains("Organized by")')
        .siblings(`:contains(${value})`)
})


Cypress.Commands.add('eventDetailsVisible', () => {
    cy.get('button:contains("Add to calendar")').should('be.visible')
        .get('button:contains("Add to Google Calendar")').should('be.visible')
        .get('#main-content > div > article > div > div > div')
        .children('label:contains("Event Type")').should('be.visible')
        .siblings().should('exist').and('have.attr', 'href')
        //it would probably be good to make a separate command for the labels and links, as there are a few repetitions 
        .get('#main-content > div > article > div > div > div')
        .children('label:contains("Organized by")').should('be.visible')
        .siblings().should('exist').and('have.attr', 'href')
        .get('#main-content > div > article > div > div > div')
        .children('label:contains("Contacts")').should('be.visible')
        .siblings().should('exist')
        .children().invoke('text').should('be.a', 'string').and('be.not.empty')
        .get('#main-content > div > article > h3').should('be.visible').and('contain', 'Event Description:')
        .get('#main-content > div > article > p').should('be.visible')
        .invoke('text').should('be.a', 'string').and('be.not.empty')

})

Cypress.Commands.add('filterByEventType', (value) => {
    cy.get('#typeSelect')
        .select(value)
        .get('#search-results')
        .find('label:contains("Event Type")')
        .siblings(`:contains(${value})`)
})