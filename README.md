# Rehearsal Scheduler App

A comprehensive web application for bands and music groups to efficiently schedule rehearsals, track attendance, send reminders, and suggest optimal rehearsal times based on member availability.

## Features

- **User Authentication & Authorization**
  - Secure login/registration system
  - Role-based access (Admin/Band Leader, Band Member)
  - Password reset functionality
  - Social authentication options

- **Band Management**
  - Create and manage bands/groups
  - Invite members via email
  - Assign instruments/roles to members
  - Multiple band membership support

- **Event Scheduling**
  - Create rehearsal events with date, time, location
  - Recurring event patterns
  - Event categorization (rehearsal, performance, meeting)
  - Event notes and attachments

- **Availability Tracking**
  - RSVP system (yes/no/maybe)
  - Bulk availability settings
  - Absence management (vacation, conflicts)
  - Visual availability indicators

- **Intelligent Scheduling**
  - Suggest optimal rehearsal times based on member availability
  - Conflict detection and alerts
  - Prioritize dates with most member availability

- **Notifications & Reminders**
  - Email notifications for new events
  - Customizable reminder intervals
  - Schedule change alerts
  - Attendance follow-up reminders

- **Calendar Integration**
  - Sync with Google/Apple/Outlook calendars
  - iCalendar feed support
  - Calendar view with filtering options
  - Mobile-friendly interface

- **Setlist Management**
  - Create and attach setlists to events
  - Song organization with timing
  - Performance notes per song
  - Song assignment to specific members

- **Venue Management**
  - Save frequent rehearsal locations
  - Location maps and directions
  - Venue notes and requirements
  - Contact information for venues

- **Reporting & Analytics**
  - Attendance statistics
  - Member participation metrics
  - Rehearsal frequency analysis
  - Export options for reports

## Technology Stack

### Front-End
- **Framework**: React.js
- **State Management**: Redux
- **UI Components**: Material-UI
- **Calendar Visualization**: FullCalendar
- **Form Handling**: Formik with Yup validation
- **API Communication**: Axios
- **Testing**: Jest and React Testing Library

### Back-End
- **Framework**: Node.js with Express
- **Authentication**: JWT with Passport.js
- **API Documentation**: Swagger/OpenAPI
- **Email Service**: Nodemailer with SendGrid
- **Validation**: Joi
- **Testing**: Mocha and Chai

### Database
- **Primary Database**: PostgreSQL
- **ORM**: Sequelize
- **Caching**: Redis (for session management and performance)

### DevOps & Infrastructure
- **Hosting**: AWS (EC2 or Elastic Beanstalk)
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Monitoring**: New Relic or Datadog
- **Version Control**: Git/GitHub

## Project Structure

```
rehearsal-scheduler/
├── client/                  # React front-end application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux state management
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── package.json         # Dependencies and scripts
│   └── README.md            # Front-end documentation
│
├── server/                  # Node.js back-end application
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── app.js               # Express app setup
│   ├── server.js            # Server entry point
│   ├── package.json         # Dependencies and scripts
│   └── README.md            # Back-end documentation
│
├── docker/                  # Docker configuration
│   ├── docker-compose.yml   # Multi-container setup
│   ├── Dockerfile.client    # Client Docker configuration
│   └── Dockerfile.server    # Server Docker configuration
│
├── docs/                    # Documentation
│   ├── api/                 # API documentation
│   ├── database/            # Database schema
│   ├── deployment/          # Deployment guides
│   └── development/         # Development guides
│
├── .github/                 # GitHub configuration
│   └── workflows/           # GitHub Actions workflows
│
├── .gitignore               # Git ignore file
├── package.json             # Root dependencies and scripts
└── README.md                # Main documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v13 or higher)
- Redis (v6 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/rehearsal-scheduler-app-20250624.git
   cd rehearsal-scheduler-app-20250624
   ```

2. Install dependencies for both client and server
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables
   ```bash
   # In the server directory
   cp .env.example .env
   # Edit .env with your database credentials and other settings
   ```

4. Set up the database
   ```bash
   # In the server directory
   npm run db:setup
   ```

5. Start the development server
   ```bash
   # In the root directory
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Docker Setup

1. Build and start the Docker containers
   ```bash
   docker-compose up -d
   ```

2. Access the application at `http://localhost:3000`

## Deployment

### AWS Deployment

1. Set up AWS credentials
   ```bash
   aws configure
   ```

2. Deploy using the provided script
   ```bash
   npm run deploy:aws
   ```

### Other Deployment Options

- Heroku: `npm run deploy:heroku`
- Digital Ocean: `npm run deploy:digitalocean`
- Manual deployment instructions are available in the `docs/deployment` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- FullCalendar for the calendar visualization
- Material-UI for the UI components
- All the contributors who have helped with the project

## Contact

For any questions or suggestions, please open an issue in the repository or contact the project maintainers.