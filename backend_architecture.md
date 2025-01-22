# Kids After School Learning Platform - Backend Architecture

## Backend Component
### Technologies:
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth with JWT
- **Caching**: Redis
- **Task Queue**: Celery
- **Storage**: Supabase Storage

### Key Features:
- RESTful API endpoints with OpenAPI documentation
- User authentication and authorization
- Content delivery service
- Test evaluation engine
- Progress tracking service
- Real-time data synchronization
- Background task processing

### API Contracts:
#### Authentication
- POST /auth/login
  - Request: { email: string, password: string }
  - Response: { access_token: string, refresh_token: string }
  
- POST /auth/refresh
  - Request: { refresh_token: string }
  - Response: { access_token: string }

#### User Management
- POST /users
  - Request: { 
      email: string, 
      password: string, 
      role: "parent" | "student",
      profile: {
        name: string,
        grade_level: number,
        learning_preferences: string[]
      }
    }
  - Response: UserProfile

- GET /users/{id}
  - Response: UserProfile

#### Progress Tracking
- POST /progress
  - Request: {
      student_id: string,
      subject: string,
      topic: string,
      score: number,
      time_spent: number,
      completed: boolean
    }
  - Response: ProgressRecord

- GET /progress/{student_id}
  - Response: ProgressSummary

#### Content Delivery
- GET /content/{grade}/{subject}
  - Response: ContentPackage

- GET /content/{grade}/{subject}/{topic}
  - Response: ContentItem

#### Assessment
- POST /assessments
  - Request: {
      student_id: string,
      subject: string,
      topic: string,
      questions: AssessmentQuestion[]
    }
  - Response: AssessmentResult

### Data Models:
#### UserProfile
```typescript
interface UserProfile {
  id: string;
  email: string;
  role: "parent" | "student";
  profile: {
    name: string;
    grade_level: number;
    learning_preferences: string[];
    created_at: Date;
    updated_at: Date;
  };
}
```

#### ProgressRecord
```typescript
interface ProgressRecord {
  student_id: string;
  subject: string;
  topic: string;
  score: number;
  time_spent: number;
  completed: boolean;
  created_at: Date;
}
```

#### ContentPackage
```typescript
interface ContentPackage {
  grade: number;
  subject: string;
  topics: ContentTopic[];
  created_at: Date;
  updated_at: Date;
}
```

#### ContentItem
```typescript
interface ContentItem {
  id: string;
  grade: number;
  subject: string;
  topic: string;
  content_type: "text" | "video" | "interactive";
  data: any;
  created_at: Date;
  updated_at: Date;
}
```

#### AssessmentQuestion
```typescript
interface AssessmentQuestion {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_in_blank";
  question: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
}
```

### Redis Cache Schema
#### Key Patterns:
- user:{id}:profile - User profile data (JSON)
- user:{id}:progress - Progress summary (JSON)
- content:{grade}:{subject} - Content package (JSON)
- content:{grade}:{subject}:{topic} - Content item (JSON)
- session:{token} - Session data (Hash)
- rate_limit:{ip} - Rate limiting data (String)

#### Cache Invalidation Strategies:
- User profile changes: Invalidate user:{id}:profile
- Progress updates: Invalidate user:{id}:progress
- Content updates: Invalidate content:{grade}:{subject} and content:{grade}:{subject}:{topic}
- Session expiration: Automatic TTL-based invalidation
- Rate limiting: Automatic TTL-based invalidation

### Supabase Authentication Integration
#### Authentication Flow:
1. Client initiates login with Supabase Auth
2. Supabase returns JWT tokens
3. Backend verifies JWT using Supabase public key
4. Backend creates session in Redis
5. Subsequent requests use session token for authentication

#### Profile Storage:
- User profiles stored in Supabase Postgres
- Profile schema:
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  grade_level INTEGER,
  learning_preferences TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Success Tracking:
- Progress stored in Supabase Postgres
- Progress schema:
```sql
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  student_id UUID REFERENCES profiles(id),
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  score NUMERIC(5,2),
  time_spent INTERVAL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Structure:
```plaintext
app/
├── api/              # API endpoints
├── core/             # Core configurations
├── db/               # Database models and migrations
├── services/         # Business logic
├── schemas/          # Pydantic models
├── utils/            # Utility functions
├── tasks/            # Celery background tasks
├── cache/            # Redis cache management
└── auth/             # Supabase authentication integration
```

## Offline Component
### Technologies:
- **LLM Integration**: OpenAI API
- **Database**: PostgreSQL
- **Task Queue**: Celery
- **Storage**: AWS S3 (for media files)

### Key Features:
- Content generation pipeline
- Question generation at multiple difficulty levels
- Content quality assurance
- Bulk content storage and retrieval
- Scheduled content updates

### Structure:
```plaintext
offline/
├── generators/       # Content generation scripts
├── models/           # LLM prompt templates
├── storage/          # Content storage management
├── tasks/            # Celery tasks
└── validators/       # Content validation
```

## Data Flow
1. **Content Generation**:
   - Offline component generates content using LLM
   - Stores content in database
   - Validates and indexes content

2. **Content Delivery**:
   - Backend fetches content from database
   - Serves content to UI via API
   - Tracks user progress

3. **Test Taking**:
   - UI requests questions from backend
   - Backend selects appropriate questions
   - UI displays questions and collects answers
   - Backend evaluates answers and provides feedback

## Database Schema
### Key Tables:
- **users**: Stores parent and student information
- **content**: Stores generated learning materials
- **questions**: Stores test questions and answers
- **progress**: Tracks student progress
- **sessions**: Manages user sessions

## Security Considerations
- HTTPS for all communications
- JWT-based authentication
- Role-based access control
- Data encryption at rest
- Regular security audits

## Scalability
- Horizontal scaling of backend services
- Database connection pooling
- Caching layer for frequently accessed content
- Asynchronous task processing

## Future Extensions
- Mobile app integration
- Live tutoring features
- Advanced analytics
- AI-powered personalization
- Social learning features
