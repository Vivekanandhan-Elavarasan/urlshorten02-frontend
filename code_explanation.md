# URL Shortener Frontend - Code Explanation

## Overview
This is an Angular 9.1.7 frontend application for a URL shortening service, similar to bit.ly or TinyURL. The application provides user authentication, URL shortening functionality, and analytics dashboard with interactive charts.

## Project Structure

### Core Technologies
- **Framework**: Angular 9.1.7
- **UI Framework**: Bootstrap 4.5.0 with ng-bootstrap 6.1.0
- **Charts**: Chart.js 2.9.3 with ng2-charts 2.3.2
- **HTTP Client**: Angular HttpClient for API communication
- **Forms**: Reactive Forms with validation
- **Backend API**: Heroku-hosted API at `https://urlshorten-02.herokuapp.com`

## Application Architecture

### Main Entry Point (`src/main.ts`)
```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```
- Standard Angular bootstrap process
- Enables production mode based on environment configuration
- Bootstraps the main AppModule

### Application Module (`src/app/app.module.ts`)
Declares and configures all components:
- **Components**: AppComponent, CreateLinkComponent, DashboardComponent, LoginComponent, RegisterComponent, ResetPasswordComponent
- **Imports**: Essential modules like FormsModule, ReactiveFormsModule, HttpClientModule, NgBootstrap
- **Purpose**: Central configuration hub for the entire application

### Routing Configuration (`src/app/app-routing.module.ts`)
Defines the navigation structure:
- `/` → LoginComponent (default route)
- `/login` → LoginComponent
- `/register` → RegisterComponent
- `/reset` → ResetPasswordComponent
- `/createLink` → CreateLinkComponent
- `/dashboard` → DashboardComponent

## Core Components

### 1. App Component (`src/app/app.component.ts` & `.html`)
**Purpose**: Main application shell with navigation and authentication state management

**Key Features**:
- **Navigation Bar**: Dynamic navigation that changes based on login status
- **Authentication State**: Subscribes to user service to track login status
- **Conditional Navigation**: Shows different menu items for logged-in vs. logged-out users
- **Logout Functionality**: Provides logout button that clears authentication and redirects

**Navigation Logic**:
- **Not Logged In**: Shows Login, Register, Reset Password links
- **Logged In**: Shows Dashboard, Create Link, Reset Password, and Logout button

### 2. User Service (`src/app/user-service.service.ts`)
**Purpose**: Centralized authentication state management

**Key Features**:
```typescript
export class UserServiceService {
  private loggedIn = new BehaviorSubject(false);
  currentLoginStatus = this.loggedIn.asObservable();
  private authToken = "";

  logIn(token) {
    this.loggedIn.next(true);
    this.authToken = token;
  }

  logOut() {
    this.loggedIn.next(false);
    this.authToken = "";
  }

  getToken(){
    return this.authToken;
  }
}
```
- **State Management**: Uses BehaviorSubject for reactive login status
- **Token Storage**: Stores authentication token for API requests
- **Observable Pattern**: Allows components to subscribe to login state changes

### 3. Create Link Component (`src/app/create-link/`)
**Purpose**: Core URL shortening functionality

**Key Features**:
- **Form Validation**: Uses Angular Reactive Forms with required validation
- **API Integration**: Makes POST request to `/shorten` endpoint
- **Real-time Feedback**: Displays success/error messages and shortened URL
- **Authentication**: Includes auth token in request headers

**Workflow**:
1. User enters long URL in form
2. Form validation ensures URL is provided
3. Submit triggers API call with authentication
4. Response displays either shortened URL or error message

**API Request Structure**:
```typescript
shortenURL() {
  var body = { url: this.urlForm.get("longURL").value };
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userService.getToken(),
    'responseType': 'json'
  });
  
  this.http.post(environment.apiURL + "/shorten", body, options)
    .subscribe((data) => {
      this.errorMessage = data['message'];
      this.shortURL = data['link'];
    });
}
```

### 4. Dashboard Component (`src/app/dashboard/`)
**Purpose**: Analytics and management interface for shortened URLs

**Key Features**:
- **Interactive Charts**: Bar chart showing click counts for each shortened URL
- **Chart.js Integration**: Uses ng2-charts wrapper for Chart.js
- **Click Interaction**: Users can click on chart bars to view detailed information
- **Real-time Data**: Refresh button to update analytics
- **URL Management**: Displays long URL, short URL, and click count for selected items

**Chart Configuration**:
```typescript
public barChartOptions: ChartOptions = {
  responsive: true,
  scales: {
    yAxes: [{ ticks: { beginAtZero: true } }],
    xAxes: [{ ticks: { beginAtZero: true } }]
  }
};
```

**Data Flow**:
1. Component loads → calls `refresh()` method
2. Makes GET request to `/dashboard` endpoint with auth token
3. Processes response data to populate chart
4. User clicks on chart bars to see individual URL details

## Authentication Flow

### Login Process
1. User submits credentials (handled by LoginComponent)
2. Successful login returns authentication token
3. UserService stores token and updates login status
4. App navigation updates to show authenticated menu
5. Subsequent API requests include token in headers

### Protected Routes
All main functionality (Create Link, Dashboard) requires authentication:
- API requests include `Authorization` header with token
- Navigation shows different options based on login status
- Logout clears token and redirects to login page

## API Integration

### Backend Configuration
- **Environment**: `https://urlshorten-02.herokuapp.com`
- **Production Mode**: Enabled in environment.ts
- **Headers**: All requests include Content-Type and Authorization

### API Endpoints Used
- `POST /shorten` - Create shortened URL
- `GET /dashboard` - Retrieve user's URL analytics
- Authentication endpoints (Login/Register/Reset) - handled by respective components

## UI/UX Design

### Styling Framework
- **Bootstrap 4.5.0**: Responsive grid system and components
- **ng-bootstrap**: Angular-specific Bootstrap components
- **Custom Styling**: Medium turquoise background, dark navbar
- **Responsive Design**: Mobile-friendly layouts

### User Experience Features
- **Form Validation**: Real-time validation with disabled submit buttons
- **Loading States**: Feedback during API requests
- **Error Handling**: User-friendly error messages
- **Interactive Analytics**: Clickable charts for detailed view
- **Intuitive Navigation**: Clear routing between features

## Development Setup

### Dependencies
- Angular CLI 9.1.6 for development
- TypeScript 3.8.3
- Karma/Jasmine for testing
- TSLint for code quality

### Build Configuration
- **Development**: Uses environment.ts
- **Production**: Uses environment.prod.ts with different API configuration
- **Testing**: Configured with Karma and Jasmine

## Key Design Patterns

1. **Service-Oriented Architecture**: UserService manages authentication state
2. **Reactive Forms**: Form validation and state management
3. **Observable Pattern**: Reactive state management with RxJS
4. **Component Communication**: Services facilitate data sharing
5. **Environment Configuration**: Separate configs for dev/prod

This application demonstrates a well-structured Angular application with proper separation of concerns, reactive state management, and modern web development practices for building a functional URL shortening service.