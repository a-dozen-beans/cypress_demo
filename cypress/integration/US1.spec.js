describe('Coursedog Tests - 1', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Displays main page', () => {
        cy.isMainPageDisplayed()
    })

    it('Checks that the events displayed are only for the given date', () => {
        cy.chooseDate(2019, "Oct", 7)
            .compareDates(2019, "Oct", 7)

    })
})