# cypress_demo
 
This is a Coursedog QA Task. Tests are written with Cypress.io

## Suggestions / explanation
* According to the task, there should be 3 events for the week of 2nd of September, however there were only 2: Talking Threads - Palestinian Textiles Day on Thu Sep 09 2021 and DEV College vs. FC Dallas also on Thu Sep 09 2021. As the task stated there are 3, I left 3 in the assertion so please note that this particular test fails. 
* I have some experience with writing API tests using Cypress as well, so I added one scenario that uses API requests. 
* For the UI tests - I decided not to use "traditional" page objects and use custom commands that Cypress offers. However, I don't have a strong preference and it's always better to decide what would we better for the particular project and the team.
* Would be nice to have some ids for the elements or “cy-data” parameters for Cypress. Basing selectors on text or CSS attributes can be prone to fail once the text is changed or there are multiple elements with same styling etc. 
* I also used Moment.js for this task - it used to be built in Cypress but was removed with one of the newer versions. 
* I mostly worked on the task in one day (Friday) and I uploaded it to Github in one commit not to put too much time into pushing changes to repo, for the purpose of the task I didn't find it neccessaary to create separate branch, PR etc. 

## Questions 

I would have the following questions to the team: 
* Number of results is shown in a way that is a bit confusing. Indexing of results starts with 0 - is that on purpose? 
* Pagination - how many entries should there be per page (for events pages and search results)?
* What is the time range for displaying the Upcoming events and Featured events? 


