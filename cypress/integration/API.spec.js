describe('API Testing with Cypress', () => {

    let event_id;

    before(() => {
        cy
            .request({
                method: 'GET',
                url: 'https://dev.coursedog.com/api/v1/em/demoschool_ezra/meetings',
                qs: {
                    startDate: "2021-11-20",
                    endDate: "2021-11-20"
                }
            })
            .then((response) => {
                event_id = Object.keys(response["body"])
            })
    })



    it('Validate the header', () => {
        cy
            .request({
                method: 'GET',
                url: 'https://dev.coursedog.com/api/v1/em/demoschool_ezra/meetings',
                qs: {
                    startDate: "2021-11-20",
                    endDate: "2021-11-20"
                }
            })
            //I'm checking here only for some of the properties just to show as an example
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[event_id]).to.have.property("_id")
                expect(response.body[event_id]).to.have.property("endDate")
                expect(response.body[event_id]["endDate"]).to.be.equal("2021-11-20")
                expect(response.body[event_id]["eventData"]).to.have.property("description")
                expect(response.body[event_id]["eventData"]["name"]).to.be.equal("Tokyo: Art and Photography")
            })

    })
});