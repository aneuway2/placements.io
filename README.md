# Placements.io Coding Challenge

**Author**: [Andrew Bowman](https://www.linkedin.com/in/gabow/)

**Creation Date**: 2024-07-23

## Overview

This project is a web application built using React, TypeScript, and various other technologies.
It includes components for managing and displaying data, such as line item adjustments and campaign metrics.

## Technologies Used

| Tech                  | Usage Notes                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Docker/Docker Compose | Docker and Docker Compose are used to containerize the application. Run `docker-compose up` to start the application                                                                         |
| Python                | Used for the backend API                                                                                                                                                                     |
| SQLite3               | Used to process the seed data JSON file and store it as 2 database tables for the application to query for campaigns and line items. A Docker build will reset the database to the defaults. |
| FastAPI               | Creates the API based on typehints and also creates auto documentation of the api at http://localhost:8000                                                                                   |
| React/Vite            | Used for the frontend                                                                                                                                                                        |
| TypeScript            | Used for the frontend to enforce types                                                                                                                                                       |
| Yarn                  | Package Manager for the frontend dependencies                                                                                                                                                |
| React Query           | Used to connect to the backend API                                                                                                                                                           |
| FluentUI              | Used for standardized elements and graphing capabilities                                                                                                                                     |
| Prettier / Black      | Used for standardization of code across frontend and backend                                                                                                                                 |

## Challenge Objectives

### Bucket 1

- [x] Implement the backend data model and seed it with the entire sample data
- [x] The core objects (campaigns, line items, and potentially invoices) you model should
      have list views and detail views, with appropriate columns in the list views and
      appropriate fields and layouts in the detail views
- [x] The only field that needs to support editing is the invoice “adjustments”

### Bucket 2

- [x] Support for sorting across various columns on the list views
- [x] Subtotal rows on list views where appropriate
- [ ] Support for filtering on various columns in list views, any subtotals should respect filters

  - The API is setup to handle this in a limited way. The frontend is not setup to handle this yet.

- [ ] A global search feature
- [ ] A change history for editable objects/fields
- [ ] Ability to export invoices to _.CSV, _.XLS, etc.
- [ ] Campaign and line item create and update operations
- [ ] The ability to archive objects
- [ ] 1:many mapping of campaigns to invoices - being able to generate new invoices for a
      campaign and management
- [ ] Good unit tests

### Bucket 3

- [ ] An integration into an external service that makes sense (eg. a currency conversion
      service, an export to Amazon S3, etc)
- [x] A reporting module that can show campaign booked vs actual data
- [ ] A commenting system for appropriate objects in the app (eg a user might leave
      instructions on a campaign for another user by tagging them in a comment)
- [x] A feature you think is interesting and can show off your skill set
  - I'm a proponent of using solutions for APIs that auto-document themselves, and I'm fully behind solutions that implement the Open API Specification to do that. Go to http://localhost:8000/ to see the auto-generated API documentation with the ability to run requests and see responses.

## Design Process
### Getting started

The initial design process of paper drafting the website layout was crucial in guiding the APIs I needed to build. This planning phase was instrumental in shaping the subsequent development process.

![inital paper draft of website design](doc%2Fdesign-process-1.jpg)
![refined paper draft of website design](doc%2Fdesign-process-2.jpg)

### Docker Compose
The framework was set up with Docker and Docker Compose as the heart of the project. This would allow me to easily replicate the process so that you (the reader) can easily start the app on your computer without any additional package installs. This would also make it easier to deploy to a service since the docker-compose generally follows what other vendors like Kubernetes use for their deploy configuration files. (There also is an application called Kompose for easily converting this to helm configs).

### Backend and Database Setup
From here, I set out to create the backend. The first thing that needed to be tackled was loading the JSON file that contained the seed data. A proper database seemed like the best option here since it would allow for easier filtering of the data later on if I were to add filtering capabilities. SQLite3 was chosen since it's a built-in database within Python, and this database is short-lived. Normally, I would have chosen some other database solution (MySQL/Postgres/etc.) that was properly hosted to allow data to be persistent.

To access the database, I used Python since that is the language I have primarily worked in for the last 5+ years. FastAPI was my framework of choice here since I recently started using it. I really am a fan of the enforced type hinting in the code, the auto-generated documentation, and the API "try it" page it creates. I could have broken out the APIs into separate files to make things more segregated, but at 240 lines of code, it is still manageable as a single file.

### List and Item Responses
The backend APIs were all created to support the functionalities I believed would be needed. You'll see here that I decided to make each API respond as if it were a list of multiple items. This allowed me to support a summary field for each response, which then correlates back to the design decision to have the graphical top on the webpage. The values here also update based on the filter, which would have checked off the filtering requirements in one of the challenges.

Some of these APIs also share inheritance in their outputs, allowing code to be reused.

An invoice endpoint was also created to generate the invoice, assuming I had time to meet that requirement.

### Booked, Actual, Adjustment, and Recorded amounts
You'll see a concept of the `recorded_amount` field, which was not part of the requirements. I added this to the API to make it easier to generate the graphs and reports on the frontend. Also, as a finance person doing end-of-month billing in the platform, this field would be critical for them to visualize since this is the dollar amount that will hit their bank account after the campaign order transactions have been settled.

### React, TypeScript, Vite, and Docker
Moving on to the front end, I knew that I wanted to use FluentUI for the graphical components since I am familiar with them, they are accessible, and they have the React charting plugin that generates the graphs that I wanted at the top of the webpages. React and Typescript were also solutions I chose since I was familiar with them. Also, TypeScript is a nice frontend comparison to the FastAPI backend type hinting.

Vite was a new framework that I decided to use on this project. I had explored it previously when I was working with apps created with Create React App (CRA). Also, CRA is currently abandonware, so I don't think it would have been a good decision for a new app layout.

Out of the gate, I ran into some issues getting Vite running within Docker, and this ate up a lot of the development time I had put into achieving this. This was mainly due to a quirky [bug](https://github.com/vitejs/vite/discussions/15532) that caused issues resolving the `@rollup/rollup-linux-x64-gnu` dependency. While I would have wanted to have a Dockerfile that supported running Vite in dev mode for local development, this was not possible given the time needed for other things. I came up with a solution using Ngnix to serve the built files, which seems reasonable enough to allow you to view the outcome of my work. I'd like to fix this if I continue developing this project.

### Frontend
Given that I started with a paper design, creating the website's structure was pretty straightforward. You'll see that I got rid of any original CSS files in favor of Griffle's CSS-In-JS solution, which provides a good solution for being purposeful about where styles are shared in the templates so that styles don't overflow into other pages/content. FluentUI also works quite well with Griffle, and I needed that for the graphing abilities that I wanted to achieve.

### React Query and Graphing
From here, I implemented React Query because I knew I would need to make API calls for all of the content and also invalidate that later when updating an adjustment. Creating the graph was of modest difficulty -- mainly because there is no great documentation on how to use these.
One tradeoff I did here was to set the adjustment value to `0` if it was less than `0`. This is because it caused some issues with the graph by shifting it upwards, which was unexpected. Ideally, I'd want to show a greyed-out amount over the portion that was adjusted away and a "positive" color on top for anything that was added.

### Dont Repeat Yourself
As I went to build out more of the list and detail pages that followed the API structure I created earlier, I noticed that I was repeating myself in some regions of the code. I corrected for this in places like the left-hand tiles next to the graph (e.g. [CampaignTile.tsx](web%2Fsrc%2FMetrics%2FCampaignTile.tsx) ) by allowing customized content to be filled into the existing objects created.

I left some reuse of code in the tables since I was unsure if I would need to customize this area more so that it was specific to the object (Campaign/Line Item/etc.), which is likely not the case in reality.

### Adjustments
I was initially still determining where I wanted to handle adjustments and the ability to edit them. Inline editing within the list view would have been nice to implement. Still, I needed to figure out what to display on the line item detail page without getting too in-depth with multiple invoicing functionality.

I went back to the original audience of the "finance person" and formatted this almost as if it were a mathematical calculation. This would seem contextually relevant to the user, and it also provides a visual of the exact numbers that get rounded away in the graphs. There were some issues in getting this implemented, as documentation on React Query `mutation` was sparse, and it took some time to understand how to get the framework to submit the body of the API request as I expected.

Once I figured this out, I also needed to invalidate the React Query used for the graph since it didn't update after submitting the form. I achieved this, but there is a flicker on the screen because the React Query used to get the data also creates the entire header section consisting of the tile and graph. In hindsight, having a dedicated query for just the graph would have fixed this but would have also been inefficient, given the data was already returned to the page. A separate API service dedicated to formatting the objects might make sense for future implementations where multiple months of data are returned.

### Wrapping up
After getting the application working as expected, I cleaned up linting issues and ran prettier and Black to ensure that the code you see is as clean and readable as possible.

I also added some FluentUI Skeletons for the loading states since that seemed more visually appealing than the plain text "loading" message I had while developing things.

Overall, I spent a lot of time on this project, but it was a labor of love, and I like the way that it came out over the past two days.

![website screenshot](doc%2Fwebsite.png)
![api website screenshot](doc%2Fapi.png)
[Visual Demo]((doc%2Fdemo.gif)


## Getting Started

### Prerequisites

- Docker
- [Vite](https://www.npmjs.com/package/vite) (for local development)

### Installation

1. `git clone <this repo>`
2. `docker-compose up`

### Local Development

The api frontend currently doesnt support hot reloading. To develop the frontend, shutdown the web docker container after starting `docker-compose up` and run the following command:

1. `cd web`
2. `yarn run dev`
3. Open the web app: http://localhost:5173/

## Viewing the Application

- [Web App (Port 3000)](http://localhost:3000/)
- [API Documentation (Port 8000)](http://localhost:8000/)
