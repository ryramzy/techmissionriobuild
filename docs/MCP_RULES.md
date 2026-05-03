# TechMission Rio - MCP (Model Context Protocol) Rules

## 🤖 MCP Integration Guidelines

### Core Principles
1. **Security First**: Never expose sensitive data in MCP responses
2. **Performance**: Keep responses concise and actionable
3. **Context Awareness**: Understand user intent and project state
4. **Error Handling**: Graceful degradation with helpful messages

### MCP Rules for Development

#### Code Generation
- ✅ **DO**: Generate production-ready code with proper error handling
- ✅ **DO**: Include TypeScript types for all components
- ✅ **DO**: Follow existing code patterns and conventions
- ❌ **DON'T**: Generate code without proper imports/exports
- ❌ **DON'T**: Create components without accessibility features
- ❌ **DON'T**: Hardcode values that should be configurable

#### File Operations
- ✅ **DO**: Check if file exists before writing
- ✅ **DO**: Use absolute paths for all file operations
- ✅ **DO**: Preserve existing functionality when editing
- ❌ **DON'T**: Overwrite critical files without backup
- ❌ **DON'T**: Modify files outside project scope
- ❌ **DON'T**: Create files in root directory

#### Dependency Management
- ✅ **DO**: Audit dependencies before adding new ones
- ✅ **DO**: Prefer lightweight alternatives
- ✅ **DO**: Update package.json with semantic versioning
- ❌ **DON'T**: Add dependencies without justification
- ❌ **DON'T**: Use beta versions in production
- ❌ **DON'T**: Ignore security vulnerabilities

#### Build & Deployment
- ✅ **DO**: Run local build before commits
- ✅ **DO**: Test on multiple screen sizes
- ✅ **DO**: Verify environment variables
- ❌ **DON'T**: Commit broken builds
- ❌ **DON'T**: Deploy without testing
- ❌ **DON'T**: Ignore build warnings

### MCP Response Format

#### Success Responses
```json
{
  "status": "success",
  "action": "completed_task",
  "result": "description_of_what_was_done",
  "next_steps": ["optional_next_actions"]
}
```

#### Error Responses
```json
{
  "status": "error",
  "error_type": "specific_error_type",
  "message": "clear_error_description",
  "suggestion": "how_to_fix_or_alternative"
}
```

#### Progress Updates
```json
{
  "status": "in_progress",
  "current_task": "task_being_worked_on",
  "completion_percentage": 75,
  "blockers": ["any_current_issues"]
}
```

### Context Management

#### Project Context
- **Primary Goal**: Donation platform connecting youth with stakeholders
- **Tech Stack**: Next.js 16, TypeScript, Tailwind CSS, Radix UI
- **Target Users**: US donors, Brazilian youth, tech stakeholders
- **Deployment**: Vercel CI/CD

#### Code Standards
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom TMR theme
- **Components**: Functional components with hooks
- **Testing**: Manual QA + automated builds

#### Security Requirements
- **Input Validation**: All forms must validate input
- **Data Protection**: No sensitive data in client-side code
- **Dependencies**: Regular security audits
- **HTTPS**: Enforce SSL in production

### MCP Tool Usage Guidelines

#### When to Use Each Tool
- **`read_file`**: Before editing any file
- **`edit`**: For single, targeted changes
- **`multi_edit`**: For multiple related changes
- **`write_to_file`**: Only for new files
- **`bash`**: For build, test, and deployment commands
- **`todo_list`**: For tracking progress and planning

#### Tool Call Best Practices
1. **Verify paths**: Double-check file paths before operations
2. **Check existence**: Use `list_dir` to verify file structure
3. **Batch operations**: Use parallel calls for independent tasks
4. **Error handling**: Always check command exit codes
5. **Rollback ready**: Keep backup of critical files

### MCP Error Recovery

#### Common Error Scenarios
1. **File not found**: Check path and file existence
2. **Build failure**: Check dependencies and syntax
3. **Type errors**: Verify imports and type definitions
4. **Deployment issues**: Check environment and configuration

#### Recovery Procedures
```bash
# Reset to last working state
git checkout HEAD -- package.json
npm install
npm run build

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### MCP Performance Optimization

#### Response Guidelines
- **Concise**: Maximum 3-4 sentences for status updates
- **Actionable**: Always include next steps
- **Structured**: Use markdown for readability
- **Focused**: Address current task only

#### Batch Operations
- **Parallel**: Run independent file operations together
- **Sequential**: Run dependent operations in order
- **Efficient**: Minimize tool calls with `multi_edit`

### MCP Security Protocols

#### Data Handling
- **No secrets**: Never include API keys or passwords
- **Sanitization**: Clean all user inputs
- **Validation**: Verify data types and formats
- **Logging**: Log errors without sensitive information

#### Access Control
- **Read-only**: Default to read operations
- **Write permissions**: Confirm before file modifications
- **Scope limits**: Stay within project boundaries
- **Audit trail**: Maintain clear change history

### MCP Testing Requirements

#### Before Commit
- [ ] Build completes without errors
- [ ] All pages load correctly
- [ ] Forms submit properly
- [ ] Mobile responsive
- [ ] Console clear of errors
- [ ] Dependencies secure

#### After Deployment
- [ ] Live site loads correctly
- [ ] All functionality works
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Analytics tracking active

### MCP Communication Standards

#### Status Updates
- **Progress**: Use todo_list for tracking
- **Blockers**: Clearly identify any issues
- **ETA**: Provide realistic time estimates
- **Success**: Confirm completion with verification

#### User Interaction
- **Clarity**: Use simple, direct language
- **Helpfulness**: Provide context and next steps
- **Efficiency**: Minimize back-and-forth
- **Professional**: Maintain tech lead tone
