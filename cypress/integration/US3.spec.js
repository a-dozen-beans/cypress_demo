describe('Coursedog Tests - 3', () => {
    beforeEach(() => {
        cy.clock(Date.UTC(2021, 8, 2), ['Date']);
        cy.visit('/')
    })

    it('Checks if there are no events for 2nd of September', () => {
        cy.seeTodaysEvents()
            .getEventNumber()
            .should('have.length', 0)
            .checkForNoEvents()
    })

    it('Checks if there are 3 upcoming featured events', () => {
        cy.seeFeaturedEvents()
            .getEventNumber()
            .should('have.length', 3)
    })

    it('Displays details about event "QA Task Submission" when I click on it', () => {
        cy.searchPhrase("QA Task Submission")
            .searchResultsForPhraseVisible("QA Task Submission")
            .clickOnEventCard("QA Task Submission")
            .eventDetailsVisible()
    })
})