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
|                       |                                                                                                                                                                                              |
|                       |                                                                                                                                                                                              |

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
  - This was the first time that I've created an frontend application using Vite. There were some initial challenges with the setup and configuration.

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

## Viewing the Application
* [Web App](http://localhost:5173/)
* [API Documentation](http://localhost:8000/)
