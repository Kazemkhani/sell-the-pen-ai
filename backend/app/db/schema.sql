-- Sell The Pen AI - Database Schema
-- Minimal MVP schema for hackathon

-- Sessions table: stores call session data + transcript
CREATE TABLE sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- User info (from frontend profile)
    user_name VARCHAR(255),
    user_company VARCHAR(255),

    -- Session details
    persona VARCHAR(50) NOT NULL,  -- 'dominant', 'analytical', 'timid'
    skill_type VARCHAR(50) NOT NULL,  -- 'lead-outreach', 'pitching', 'objection-handling'

    -- Transcript (stored as JSONB for flexibility)
    -- Format: [{"speaker": "User", "text": "...", "timestamp": "..."}, ...]
    transcript JSONB,

    -- User profile (optional, for personalization)
    user_profile JSONB,

    -- Metadata
    duration_seconds INTEGER,
    status VARCHAR(20) DEFAULT 'active',  -- 'active', 'completed', 'disconnected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Feedback table: stores analysis results
CREATE TABLE feedback (
    feedback_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,

    -- Scores (0-100)
    opening_score INTEGER CHECK (opening_score >= 0 AND opening_score <= 100),
    control_score INTEGER CHECK (control_score >= 0 AND control_score <= 100),
    objection_score INTEGER CHECK (objection_score >= 0 AND objection_score <= 100),
    closing_score INTEGER CHECK (closing_score >= 0 AND closing_score <= 100),

    -- Overall score (average or weighted)
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),

    -- Detailed feedback
    narrative TEXT,  -- Full narrative analysis
    strengths TEXT[],  -- Array of strength points
    improvements TEXT[],  -- Array of improvement areas
    mike_ferry_concepts JSONB,  -- Matched Mike Ferry concepts from RAG

    -- PDF report
    pdf_path VARCHAR(500),

    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_sessions_created ON sessions(created_at DESC);
CREATE INDEX idx_sessions_user ON sessions(user_name);
CREATE INDEX idx_feedback_session ON feedback(session_id);

-- Optional: Chat history table (for feedback chatbot)
CREATE TABLE feedback_chat (
    chat_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,

    question TEXT NOT NULL,
    answer TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_chat_session ON feedback_chat(session_id, created_at DESC);
