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

### Add column to DB
* Ticket 1: Add unique ID to facilities table for each Agent (Estimated Time: 1 hour)
  - Facilities table does not seem to have a column for custom agent ID
  - Use `alter table` function and add a new column for customAgentID

### Add relation between tables (Agent and Facilities)
* Ticket 2: Create relation between agents table and facilities table (Estimated Time: 1 hour)
  - Add relation between customAgentID of the agent to the ID in the Agents table using `FOREIGN KEY` function
    - This allows referencing information to be more organized
    - ASSUMPTION: This is assuming that the databases are all on the same server

### Edit generateReport Function
* Ticket 3: Edit generateReport function (Estimated Time: 1.5 hours)
  - When generating the report, the report will be using the internal database ID for the agent
  - Edit the function so that instead of using the database ID, use the customAgentID to reference the agent
