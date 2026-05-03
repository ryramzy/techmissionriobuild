# TechMission Rio - Debugging Guide

## 🐛 Debugging Procedures

### Local Development
```bash
# Start development server
npm run dev

# Check for build issues
npm run build

# Run linting
npm run lint

# Check dependencies
npm audit
```

### Common Issues & Solutions

#### 1. Build Failures
- **Issue**: TypeScript compilation errors
- **Solution**: Check `tsconfig.json` and component types
- **Command**: `npx tsc --noEmit`

#### 2. Styling Issues
- **Issue**: Tailwind classes not applying
- **Solution**: Check `tailwind.config.js` and imports
- **Debug**: Add border to see element boundaries

#### 3. Dependency Issues
- **Issue**: Vulnerabilities or conflicts
- **Solution**: Clean install
- **Command**: 
```bash
rm -rf node_modules package-lock.json
npm install
npm audit fix
```

#### 4. Performance Issues
- **Issue**: Slow page loads
- **Solution**: Check bundle size and images
- **Debug**: 
```bash
npm run build
npx bundle-analyzer .next
```

### Environment Variables
```bash
# Development
cp .env.example .env.local

# Production
# Set in Vercel dashboard
NEXT_PUBLIC_PAYPAL_BUTTON_ID=your_button_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
```

### Testing Checklist
- [ ] Homepage loads without errors
- [ ] Navigation works on all pages
- [ ] Donation forms submit correctly
- [ ] Mobile responsive design
- [ ] Console is clear of errors
- [ ] Build completes successfully

### Browser Console Commands
```javascript
// Check for React errors
console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)

// Monitor network requests
console.table(performance.getEntriesByType('resource'))

// Check bundle size
console.log(performance.memory)
```

### Deployment Issues
- **Vercel Build**: Check logs in Vercel dashboard
- **Environment**: Verify all env vars are set
- **Domain**: Check DNS settings

### Performance Monitoring
- **Lighthouse**: Run in Chrome DevTools
- **Core Web Vitals**: Monitor in Vercel Analytics
- **Bundle Size**: Keep under 1MB initial load

### Security Checklist
- [ ] No hardcoded secrets
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] Dependencies up to date
- [ ] Input validation on forms

### Contact for Debugging Help
- **GitHub Issues**: Create new issue with error details
- **Slack**: #tech-support channel
- **Email**: dev@techmissionrio.org
