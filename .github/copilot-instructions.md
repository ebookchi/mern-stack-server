```
# Commit Message Guidelines for GitHub Copilot

Please follow these commit message conventions **strictly**. Copilot must generate commit messages that follow these rules to ensure consistency and clarity across all commits.

---

## 🧠 1. Use Conventional Commits Format

Format:
<type>(<scope>): <subject>

Allowed <type> values:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Code style changes (formatting, missing semi-colons, etc.)
- refactor: Code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding or updating tests
- build: Changes that affect the build system or dependencies
- ci: Changes to CI configuration files
- chore: Other changes that don’t modify src or test files
- revert: Revert a previous commit

Scope (optional):
Specifies the area of the codebase affected (e.g., auth, api, db, ui, etc.)

---

## ✍️ 2. Write Clear, Imperative Subject Lines

- Use the present tense, not past.
  - ✅ fix(api): validate request body
  - ❌ fixed validation bug
- Limit to 50 characters or fewer.
- Do not end the subject line with a period.
- Capitalize the first word.

---

## 📄 3. Use a Blank Line Before the Body

Always insert a blank line between the subject and the body (if a body is present).

---

## 🧾 4. Write Detailed Body (Optional but Encouraged)

- Explain the what and why, not the how.
- Wrap lines at 72 characters.
- Reference issues, PRs, or related discussions like:
  Closes #123
  Ref #456

If describing multiple changes:

- Use bullet points:
  - Add input validation on /login
  - Refactor auth middleware

---

## ⚠️ 5. Add Footer for Breaking Changes or Metadata

Breaking changes footer format:
BREAKING CHANGE: <description>

Additional metadata examples:
Signed-off-by: John Smith <john@example.com>
Co-authored-by: Jane Doe <jane@example.com>

---

## ✅ Examples

Feature:
feat(auth): add refresh token endpoint

- Implement POST /auth/refresh to issue new access tokens
- Validate refresh tokens using Redis store
- Update Swagger documentation

Closes #456

---

Bugfix:
fix(ui): prevent dropdown from overflowing

- Set max-width and overflow ellipsis
- Ensure component is responsive on all screen sizes

BREAKING CHANGE: Old dropdown styles removed

---

Chore (Dependencies):
chore(deps): bump lodash from 4.17.21 to 4.17.22

- Resolves security advisory CVE-2025-1234
- No breaking changes expected

---

Copilot must always follow these rules when generating commit messages.
```
