# User Flows for Kids After School

## Parent User Journey

```mermaid
graph TD
    A[Landing Page] --> B[Sign Up/Login]
    B --> C[Parent Dashboard]
    C --> D[View Child Progress]
    D --> E{Skill Improvement?}
    E -- Yes --> F[Donation Page]
    E -- No --> G[Continue Monitoring]
    C --> H[Manage Child Account]
    C --> I[View Curriculum]
    C --> J[Contact Support]
```

## Child User Journey

```mermaid
graph TD
    A[Landing Page] --> B[Sign Up/Login]
    B --> C[Child Dashboard]
    C --> D[Select Lesson]
    D --> E[Interactive Lesson]
    E --> F{Complete Lesson?}
    F -- Yes --> G[View Progress]
    F -- No --> H[Continue Lesson]
    C --> I[View Achievements]
    C --> J[Practice Area]
```

## Common Paths

```mermaid
graph TD
    A[Landing Page] --> B[Sign Up/Login]
    B --> C[Parent Dashboard]
    B --> D[Child Dashboard]
    C --> E[View Child Progress]
    D --> F[Complete Lessons]
    E --> G{Skill Improvement?}
    G -- Yes --> H[Donation Page]
    G -- No --> I[Continue Monitoring]
```

## Donation Flow Integration

```mermaid
graph TD
    A[Parent Dashboard] --> B[View Child Progress]
    B --> C{Significant Skill Improvement?}
    C -- Yes --> D[Donation Suggestion]
    D --> E[Donation Page]
    E --> F[Select Donation Amount]
    F --> G[Payment Processing]
    G --> H[Thank You Page]
    H --> A[Parent Dashboard]
    C -- No --> I[Continue Monitoring Progress]
    I --> A[Parent Dashboard]
```

## Key Features

1. **Parent Dashboard**
   - Quick access to child progress
   - Donation prompts based on skill improvement
   - Account management
   - Curriculum overview

2. **Child Dashboard**
   - Lesson selection
   - Progress tracking
   - Achievement display
   - Practice area

3. **Shared Features**
   - Responsive navigation
   - Clear progress indicators
   - Seamless transitions between parent/child views
   - Integrated donation flow
