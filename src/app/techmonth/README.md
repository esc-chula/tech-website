# Intania Tech Month Website

### Features

- Landing Page
- Stamps
  - Login Page
  - Add Stamp Page
  - Stamp List Page

### Implementation

- Postgres to store users' stamps
- Directus for event data management
- Student ID is store in cookie for server-side implementation
- When user add a stamp, it will search for it's event on Directus with strict time condition and add it to the Postgres database.

### Event ID

Each event has an ID that is used to store for stamps. The ID is generated from second part of UUID v4.

[UUID v4 Generator](https://www.uuidgenerator.net/version4)
