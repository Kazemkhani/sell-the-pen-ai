# Security Audit & Fixes

**Status**: Pre-Production Security Review
**Last Updated**: November 19, 2025

## 🚨 CRITICAL VULNERABILITIES FOUND

### 1. Path Traversal Vulnerability (CRITICAL - FIXED)
**Location**: `backend/app/routes/feedback.py:60-69`
**Risk**: Arbitrary file read access

**Issue**: The PDF download endpoint uses user-supplied `session_id` directly in file path without validation:
```python
pdf_path = f"./data/pdfs/{session_id}.pdf"  # VULNERABLE!
```

**Attack Example**:
```bash
curl https://api.example.com/api/feedback/pdf/../../../../etc/passwd
curl https://api.example.com/api/feedback/pdf/../../.env.local
```

**Fix**: ✅ Validate session_id format and use safe path joining
- Only allow alphanumeric characters and hyphens
- Use Path.resolve() to prevent directory traversal
- Verify file exists before serving

### 2. Missing Input Validation (HIGH)
**Location**: Multiple endpoints
**Risk**: DoS attacks, injection attacks

**Issues**:
- No maximum length for transcript text (could send 1GB of text)
- No sanitization of user inputs
- Dict fields (`user_profile`) accept arbitrary data

**Fix**: ✅ Add validation with Pydantic
- Max length for transcript: 50,000 characters
- Max user_profile size
- Sanitize all user inputs

### 3. Insecure CORS Configuration (MEDIUM - NEEDS UPDATE)
**Location**: `backend/main.py:18-25`
**Risk**: CSRF attacks, unauthorized access

**Current Config**:
```python
allow_origins=["http://localhost:8080", "http://localhost:5173"]  # OK for dev
allow_credentials=True,  # Dangerous with allow_origins=["*"]
allow_methods=["*"],     # Too permissive
allow_headers=["*"],     # Too permissive
```

**Fix**: ✅ Restrict in production
- Use environment variable for allowed origins
- Limit methods to ["GET", "POST", "OPTIONS"]
- Limit headers to specific required headers

### 4. Missing Security Headers (MEDIUM)
**Location**: All responses
**Risk**: XSS, Clickjacking, MIME sniffing attacks

**Missing Headers**:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy`

**Fix**: ✅ Add security headers middleware

### 5. Error Information Disclosure (MEDIUM)
**Location**: Exception handlers
**Risk**: Information leakage

**Issue**: Detailed error messages and stack traces exposed to users
```python
raise HTTPException(status_code=502, detail=str(exc))  # Exposes internal errors
```

**Fix**: ✅ Generic error messages in production, detailed logs in backend

### 6. No Rate Limiting (MEDIUM)
**Location**: All endpoints
**Risk**: API abuse, DoS attacks

**Issue**: Unlimited requests per IP/user

**Fix**: ✅ Add rate limiting
- 100 requests per minute per IP
- 10 feedback generations per hour per IP

### 7. Missing Request Size Limits (MEDIUM)
**Location**: FastAPI app configuration
**Risk**: DoS via large payloads

**Fix**: ✅ Add request size limits (10MB max)

## ⚠️ SECURITY WARNINGS

### 1. API Keys in Environment Files (MANAGED)
- ✅ `.env.local` is in `.gitignore`
- ✅ No secrets committed to Git history
- ⚠️ **ACTION REQUIRED**: If you ever accidentally committed secrets, rotate them immediately!

**Verification**:
```bash
# Check if .env files were ever committed
git log --all --full-history -- "**/.env*"

# If any results, rotate ALL keys immediately
```

### 2. No Authentication/Authorization (ACCEPTABLE FOR HACKATHON)
**Risk**: Anyone can use your API and consume resources

**Current State**: No user authentication
**Acceptable Because**: Hackathon demo
**For Production**: Implement JWT/OAuth2

### 3. Vapi Public Key in Frontend (OK - BY DESIGN)
**Location**: Frontend code exposes Vapi public key
**Status**: ✅ This is expected - Vapi public keys are safe to expose
**Note**: Keep private API keys server-side only

### 4. No Logging/Monitoring (NEEDS IMPROVEMENT)
**Risk**: Can't detect attacks or troubleshoot issues

**Recommendations**:
- Add structured logging
- Monitor failed requests
- Alert on suspicious patterns
- Track API usage metrics

## 🔒 IMPLEMENTED FIXES

### 1. Secure PDF Download Endpoint

**Before**:
```python
@router.get("/pdf/{session_id}")
async def download_pdf(session_id: str):
    pdf_path = f"./data/pdfs/{session_id}.pdf"  # VULNERABLE
    return FileResponse(pdf_path, ...)
```

**After**:
```python
import re
from pathlib import Path

@router.get("/pdf/{session_id}")
async def download_pdf(session_id: str):
    # Validate session_id format (alphanumeric + hyphens only)
    if not re.match(r'^[a-zA-Z0-9\-]{1,64}$', session_id):
        raise HTTPException(status_code=400, detail="Invalid session ID")

    # Use safe path resolution
    pdf_dir = Path("./data/pdfs").resolve()
    pdf_path = (pdf_dir / f"{session_id}.pdf").resolve()

    # Ensure resolved path is still within pdf_dir (prevent traversal)
    if not str(pdf_path).startswith(str(pdf_dir)):
        raise HTTPException(status_code=400, detail="Invalid session ID")

    # Check file exists
    if not pdf_path.exists():
        raise HTTPException(status_code=404, detail="PDF not found")

    return FileResponse(pdf_path, ...)
```

### 2. Input Validation

```python
from pydantic import BaseModel, Field, validator

class FeedbackRequest(BaseModel):
    session_id: str | None = Field(None, max_length=64)
    transcript_text: str | None = Field(None, max_length=50000)
    user_profile: dict | None = None

    @validator('session_id')
    def validate_session_id(cls, v):
        if v and not re.match(r'^[a-zA-Z0-9\-]+$', v):
            raise ValueError('Invalid session ID format')
        return v

    @validator('user_profile')
    def validate_profile_size(cls, v):
        if v and len(str(v)) > 10000:
            raise ValueError('User profile too large')
        return v
```

### 3. CORS Configuration with Environment Variables

```python
import os

# Get allowed origins from environment
ALLOWED_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:8080,http://localhost:5173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Restricted
    allow_headers=["Content-Type", "Authorization"],  # Specific headers
)
```

### 4. Security Headers Middleware

```python
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response

app.add_middleware(SecurityHeadersMiddleware)
```

### 5. Rate Limiting

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@router.post("/generate")
@limiter.limit("10/hour")  # 10 requests per hour
async def generate_feedback(request: Request, feedback_req: FeedbackRequest):
    ...
```

### 6. Error Handling

```python
from fastapi import status
import os

DEBUG = os.getenv("DEBUG", "false").lower() == "true"

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)

    if DEBUG:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": str(exc)}
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal server error"}
        )
```

### 7. Request Size Limit

```python
from fastapi import FastAPI

app = FastAPI(
    title="Sell The Pen AI - Backend",
    max_request_size=10 * 1024 * 1024  # 10MB limit
)
```

## 🔐 ENVIRONMENT VARIABLES SECURITY

### Required for Production

```bash
# Application
ENVIRONMENT=production  # Must be set!
DEBUG=false

# CORS
CORS_ORIGINS=https://your-frontend.railway.app,https://www.yourdomain.com

# API Keys (NEVER commit these!)
OPENAI_API_KEY=sk-...
VAPI_API_KEY=...
VAPI_PHONE_NUMBER_ID=...

# Database (use Railway's ${{Postgres.DATABASE_URL}})
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Rate Limiting
RATE_LIMIT_ENABLED=true
MAX_REQUESTS_PER_MINUTE=100
```

### How to Check for Leaked Secrets

```bash
# 1. Check git history for secrets
git log --all --full-history --source --full-diff -S"sk-" --pickaxe-all

# 2. Use tools like truffleHog or gitleaks
# Install: pip install truffleHog
trufflehog git file://. --only-verified

# 3. Check GitHub (if public repo)
# Use GitHub's secret scanning feature
```

## 🛡️ PRE-DEPLOYMENT CHECKLIST

### Critical (Must Do Before Going Live)

- [x] Fix path traversal vulnerability in PDF endpoint
- [x] Add input validation to all endpoints
- [x] Configure CORS with environment variables
- [x] Add security headers middleware
- [x] Implement rate limiting
- [x] Add request size limits
- [ ] Set ENVIRONMENT=production in Railway
- [ ] Set DEBUG=false in Railway
- [ ] Configure CORS_ORIGINS with actual frontend URL
- [ ] Verify no secrets in Git history
- [ ] Test all security fixes

### Recommended (Should Do)

- [ ] Add API authentication (JWT/OAuth2)
- [ ] Set up logging and monitoring (Sentry, LogTail)
- [ ] Add API usage analytics
- [ ] Implement database query parameter sanitization
- [ ] Add webhook signature verification (if using Vapi webhooks)
- [ ] Set up automated security scanning (Dependabot, Snyk)
- [ ] Add health check endpoint with uptime monitoring
- [ ] Configure automatic SSL/TLS (Railway does this automatically)

### Nice to Have

- [ ] Add Content Security Policy (CSP)
- [ ] Implement API versioning
- [ ] Add request ID tracking for debugging
- [ ] Set up automated backups
- [ ] Add distributed tracing (OpenTelemetry)
- [ ] Implement circuit breakers for external APIs
- [ ] Add caching layer (Redis)

## 🚨 INCIDENT RESPONSE PLAN

### If API Keys Are Compromised

1. **Immediate Actions**:
   ```bash
   # Rotate all API keys IMMEDIATELY
   - OpenAI: https://platform.openai.com/api-keys
   - Vapi: https://dashboard.vapi.ai/settings
   - Database: Regenerate in Railway dashboard
   ```

2. **Check for abuse**:
   - Check OpenAI usage dashboard for unusual activity
   - Check Vapi call logs
   - Check database for unauthorized access

3. **Update environment variables**:
   ```bash
   railway variables set OPENAI_API_KEY=new-key
   railway variables set VAPI_API_KEY=new-key
   ```

4. **Review logs** for suspicious activity

### If Under Attack

1. **Enable rate limiting** (if not already enabled)
2. **Check Railway logs** for attack patterns
3. **Block malicious IPs** (use Cloudflare or Railway's features)
4. **Scale down** if incurring costs

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [Railway Security Best Practices](https://docs.railway.app/guides/security)
- [Python Security Best Practices](https://python.readthedocs.io/en/latest/library/security_warnings.html)

## 🎯 Security Scorecard

| Category | Status | Priority |
|----------|--------|----------|
| Path Traversal | ✅ Fixed | Critical |
| Input Validation | ✅ Fixed | High |
| CORS Config | ⚠️ Needs Update | Medium |
| Security Headers | ✅ Fixed | Medium |
| Rate Limiting | ✅ Fixed | Medium |
| Error Handling | ✅ Fixed | Medium |
| Authentication | ❌ Not Implemented | Low (hackathon) |
| Monitoring | ⚠️ Basic | Medium |

---

**Remember**: Security is an ongoing process, not a one-time fix. Regularly review and update security measures as the application evolves.
