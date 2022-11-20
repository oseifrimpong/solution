# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
- UI & API integration change for creating Agent and updating Agent
- Database change in the Agents Table (existing data, nullable to accommodate existing data assuming we use database migrations)
  - add a `customAgentId` field, text field
- `getShiftsByFacility` should return custom Agent ID together with the existing Agent metadata
- `generateReport` should attempt to use `customAgentId` field if it is available otherwise it should fallback to the original agentId
  - Query to retrieve shift details should be modified to also select the customAgentId on the Agents relationship lookup
d
### Tickets
#### Notes
- 1 Story Point (SP) = 0.5 Dev Days
- All implementation should include unit and integration tests

1. (1 SP) Add a `customAgentId` field to the Agents table
#### Acceptance Criteria
   1. `customAgentId` should be a nullable field
   2. `customAgentId` should be a VARCHAR(255) field


- (3 SP) Modify `getShiftsByFacility` function to return `customAgentId` from Agents table when returning the list of Shifts 
#### Acceptance Criteria
   1. Data response should include `customAgentId` as part of the Agent Metadata


- (5 SP) Modify `generateReport` function to use `customAgentId` first when generating the report PDF. If the `customAgentId` is not available, fallback to the AgentID
#### Acceptance Criteria
  1. The ID on the generated PDF should be the `customAgentId` if the Agent has a `customAgentId` specified
  2. When retreiving details of the shift, the customAgentId field should be added to the SELECT criteria `SELECT ...FIELDS FROM Shifts LEFT Join Agents on id = Shifts.AgentId`

- (3 SP) Add a `Custom Agent ID` field to the Create Agent & Update Agent forms
#### Acceptance Criteria
  1. As a user with permissions to create or update agents
  2. When I visit the agent creation or update form
  3. I should see a required field called Custom Agent ID
  4. If i fail to fill the value, I should be met with an error
  5. When I save the form, I should see the Custom Agent ID on the agent detail page

## Assumptions
- Assuming there is a simple frontend for creating new Agents and updating existing agents
- Assume we use a Postgres DB
- Assume all agents should have 