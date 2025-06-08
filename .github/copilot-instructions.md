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

````
# Code Commenting Guidelines for GitHub Copilot

Copilot must follow these rules when generating or reviewing code comments:

---

## ✅ General Rules

- Write comments in **clear, concise English**.
- Comments must **explain "why"**, not "what", unless the code is complex or unclear.
- Prefer **high-level reasoning** over low-level narration.
- Never repeat what the code obviously says.

---

## 🧠 Best Practices

1. **Function/Method Headers**
   - Use a comment block before each public function/method to explain:
     - Purpose
     - Parameters
     - Return values
     - Side effects (if any)

   Example:
   ```csharp
   /// Calculates the net balance after applying all transactions.
   /// @param transactions A list of incoming/outgoing values
   /// @returns Final balance after adjustments
````

2. **Complex Logic or Algorithms**

   - Add inline comments to explain:
     - Loops with non-obvious termination conditions
     - Recursion, bitwise ops, regular expressions
     - Domain-specific logic

3. **Magic Numbers or Hardcoded Strings**

   - Always explain them or replace with named constants.

   Example:

   ```python
   MAX_RETRIES = 3  # Prevents infinite retry loop in network calls
   ```

4. **Code That May Break in the Future**

   - Warn future developers about fragile logic, dependencies, or assumptions.

   Example:

   ```javascript
   // This assumes the third-party API always returns status 200 for success
   ```

5. **TODO / FIXME**
   - Use these to highlight work that is incomplete, needs refactoring, or may cause bugs:
     - `// TODO:` — a feature or improvement
     - `// FIXME:` — a known bug or fragile logic

---

## 🚫 Avoid These

- Redundant comments like:
  ```js
  let count = 5; // Set count to 5 ❌
  ```
- Over-commenting simple code
- Writing comments that become outdated easily

---

## ✍️ Style and Format

- Use full sentences with proper punctuation.
- Start with a capital letter.
- Place inline comments on a separate line **above** the code they explain.
- Use `//` for short comments, `/** */` or `///` for structured comments.

---

## 💡 Example Good Comments

```js
// Retry up to 3 times with exponential backoff
for (let i = 0; i < MAX_RETRIES; i++) {
  // ...
}
```

```ts
/**
 * Fetches user profile data with caching.
 * Falls back to remote API if cache is stale or empty.
 */
function getUserProfile(userId: string) {
  // ...
}
```

---

Copilot should generate comments that reflect these principles **automatically**, especially in new code or during code reviews.

```

```
