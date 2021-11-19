describe('Coursedog Tests - 2', () => {
  beforeEach(() => {
    cy.clock(Date.UTC(2021, 10, 20), ['Date']);
    cy.visit('/')
  })


  it('Checks if there is only one event for 20th of November 2021', () => {
    cy.seeTodaysEvents()
      .getEventNumber()
      .should('have.length', 1)
  })

  it('Checks if there is one event matching "Tokyo" phrase in search results', () => {
    cy.searchPhrase("Tokyo")
      .searchResultsForPhraseVisible("Tokyo")
      .searchEventsWithPhrase("Tokyo")
      .should('have.length', 1)
      .checkTotalNumberOfSearchResults(1)
  })

  //I've also added a case for different number of results than one, as some of Cypress functions 
  //return only one element (for example first found), so wanted to show that I don't have any falsely positive assertions
  it('Checks if there are three events matching "Model UN" phrase in search results', () => {
    cy.searchPhrase("Model UN")
      .searchResultsForPhraseVisible("Model UN")
      .searchEventsWithPhrase("Model UN")
      .should('have.length', 3)
      .checkTotalNumberOfSearchResults(3)
  })

  it('Checks if there are 3 events when filtering by Organization "Model UN"', () => {
    cy.filterByOrganization("Model UN")
      .getSearchResultNumber()
      .should('have.length', 3)
  })


  it('Checks if there are 6 events when filtering by Event Type "Speaker"', () => {
    cy.filterByEventType("Speaker")
      .getSearchResultNumber()
      .should('have.length', 6)
  })

})