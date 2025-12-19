# Security Policy

## 🔒 Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🐛 Reporting a Vulnerability

We take the security of Priority Strip seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do NOT:
- ❌ Open a public GitHub issue
- ❌ Discuss the vulnerability publicly
- ❌ Exploit the vulnerability

### Please DO:
- ✅ Email us at: **thealokkumarsingh@gmail.com**
- ✅ Provide detailed information about the vulnerability
- ✅ Include steps to reproduce (if possible)
- ✅ Give us reasonable time to fix the issue before public disclosure

## 📧 What to Include in Your Report

Please include as much of the following information as possible:

1. **Type of vulnerability** (e.g., SQL injection, XSS, authentication bypass)
2. **Full paths of affected source files**
3. **Location of the affected code** (tag/branch/commit or direct URL)
4. **Step-by-step instructions to reproduce**
5. **Proof-of-concept or exploit code** (if possible)
6. **Impact of the vulnerability**
7. **Suggested fix** (if you have one)

## ⏱️ Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: Within 7 days
  - High: Within 14 days
  - Medium: Within 30 days
  - Low: Next release cycle

## 🎁 Recognition

We appreciate security researchers who responsibly disclose vulnerabilities. With your permission, we will:

- ✅ Acknowledge your contribution in our CHANGELOG
- ✅ Credit you in the security advisory
- ✅ Add you to our Hall of Fame (if applicable)

## 🛡️ Security Measures

Priority Strip implements the following security measures:

### Authentication & Authorization
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ Session-based authentication with NextAuth
- ✅ Protected API routes
- ✅ CSRF protection

### Data Protection
- ✅ Environment variables for sensitive data
- ✅ No sensitive data in client-side code
- ✅ MongoDB connection encryption
- ✅ Secure session storage

### Input Validation
- ✅ Server-side validation for all inputs
- ✅ TypeScript for type safety
- ✅ Mongoose schema validation
- ✅ Sanitized user inputs

### Dependencies
- ✅ Regular dependency updates
- ✅ Automated security scanning
- ✅ No known vulnerabilities in dependencies

## 📚 Security Best Practices for Users

### For Self-Hosting

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use strong, unique `NEXTAUTH_SECRET`
   - Rotate secrets regularly

2. **Database**
   - Use strong MongoDB passwords
   - Enable MongoDB authentication
   - Restrict network access
   - Regular backups

3. **Deployment**
   - Use HTTPS in production
   - Keep Node.js and dependencies updated
   - Monitor logs for suspicious activity
   - Implement rate limiting (if needed)

4. **Access Control**
   - Change default credentials immediately
   - Use strong passwords
   - Limit user access as needed

## 🔄 Security Updates

We will:
- Release security patches as soon as possible
- Notify users via GitHub Security Advisories
- Update this document with security best practices
- Maintain a security changelog

## 📞 Contact

For security concerns: **thealokkumarsingh@gmail.com**

For general questions: [GitHub Discussions](https://github.com/YOUR_USERNAME/priority-strip/discussions)

---

**Thank you for helping keep Priority Strip and our users safe! 🙏**

