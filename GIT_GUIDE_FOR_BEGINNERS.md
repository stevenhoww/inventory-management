# Git Guide for Beginners - What We Just Did

## What is Git?

Git is like a **time machine for your code**. It tracks every change you make, who made it, and when. Think of it like:
- **Google Docs version history** but for code files
- A **backup system** that saves your work at important checkpoints
- A **collaboration tool** so multiple people can work on the same project without overwriting each other

---

## Key Concepts

### 1. **Repository (Repo)**
Your project folder with all its files, tracked by git. It's like a folder that remembers all its history.

```
my-project/          ← This is a repository
├── file1.js
├── file2.js
└── .git/            ← Git stores all history here (hidden)
```

### 2. **Commits**
A "snapshot" of your code at a specific moment in time. Each commit has:
- **What changed** - which files were modified
- **Who made the change** - your name
- **When** - timestamp
- **Why** - a commit message explaining what you did

Think of it like taking a photo of your project's state, then being able to go back to that exact state anytime.

```
Commit 1: "Add login page" → Photo of code at 2:00 PM
Commit 2: "Fix login bug" → Photo of code at 3:15 PM
Commit 3: "Add password reset" → Photo of code at 4:30 PM

You can "rewind" to any of these states!
```

### 3. **Branches**
A separate "copy" of your code where you can make changes without affecting the main code.

Think of it like:
- **Main branch** = Your final, working code (the "production" version)
- **Feature branch** = Your workshop where you build new features safely

```
main (the production code)
  ↓
  └─ new_features (your workshop)
     └─ restocking (your new feature)
```

You can work on `new_features` without breaking `main`. When you're done and happy, you "merge" (combine) your changes back into `main`.

### 4. **Remote Repository (GitHub)**
Your code hosted online so you and your team can share it.

- **Local** = Your computer's copy
- **Remote** = GitHub's copy online

You "push" changes to GitHub (upload) and "pull" changes from GitHub (download).

---

## What We Just Did - Step by Step

### The Problem
Your `new_features` branch had new code that conflicted with changes in `main`. Git was confused because:

1. Someone updated `main` with new code
2. Your `new_features` branch also changed some of the same files differently
3. Git couldn't automatically figure out which version to keep

### The Solution: Rebase

#### **Step 1: Fetch the Latest Main**
```bash
git fetch origin main
```
We downloaded the newest version of `main` from GitHub to see what changed.

#### **Step 2: Rebase**
```bash
git rebase origin/main new_features
```
We told git: "Take my new_features code and stack it ON TOP OF the latest main code."

**Visual explanation:**

```
BEFORE (conflicting branches):
main:        [Code A] → [Code B] → [Updated Code]
                          ↗
new_features:            [My Code] → [My Feature]

AFTER (rebased):
main:        [Code A] → [Code B] → [Updated Code]
                                      ↓
new_features:                    [My Code] → [My Feature]
```

#### **Step 3: Resolve Conflicts**
Git found files that had conflicting changes:
- `App.vue` - Old layout vs new layout
- `Orders.vue` - Different variable names
- `Restocking.vue` - Both sides added it

We manually fixed each one by choosing which version to keep.

#### **Step 4: Mark as Resolved**
```bash
git add [conflicted files]
```
We told git: "I fixed these files, they're good now."

#### **Step 5: Continue Rebase**
```bash
git rebase --continue
```
Git finished stacking our commits on top of the latest main.

#### **Step 6: Force Push**
```bash
git push -f origin new_features
```
We uploaded the cleaned-up version to GitHub, updating your PR automatically.

---

## Git Commands You'll Use Most

### **Checking Status**
```bash
git status
```
Shows you:
- Which branch you're on
- What files changed
- What's staged to commit

**Output example:**
```
On branch new_features
Changes not staged for commit:
  modified:   file1.js
  modified:   file2.js

Untracked files:
  new_file.js
```

### **Making a Commit**
```bash
git add file.js              # Stage one file
git add .                    # Stage ALL changed files
git commit -m "Fix bug"      # Create a snapshot with a message
```

Think of `git add` as putting files in a box, then `git commit` as shipping that box.

### **Switching Branches**
```bash
git checkout main            # Switch to main branch
git checkout -b new-feature  # Create AND switch to new branch
```

### **Pushing to GitHub**
```bash
git push origin main         # Upload commits to GitHub
git push -f origin branch    # Force push (overwrites remote with local)
```

### **Pulling from GitHub**
```bash
git pull origin main         # Download latest changes
```

---

## What is a Merge Conflict?

A merge conflict happens when:

1. **File A** was changed in two different ways
2. Git doesn't know which version you want

**Example:**

```javascript
// MAIN VERSION (on GitHub)
const greeting = "Hello, World!"

// YOUR VERSION (in your branch)
const greeting = "Hi there!"
```

Git shows both and asks: "Which one do you want?"

```
<<<<<<< HEAD
const greeting = "Hello, World!"  ← Main's version
=======
const greeting = "Hi there!"      ← Your version
>>>>>>> new_features
```

You edit the file to choose one, then tell git you fixed it.

---

## The Merge Conflict We Fixed

### **Conflict 1: App.vue**
```
OLD CODE: Top navigation bar (nav-tabs)
NEW CODE: Sidebar layout (SidebarLayout)
```
**Decision:** Kept the new sidebar layout because it's the direction of the feature.

### **Conflict 2: Orders.vue**
```
OLD CODE: restockingOrders
NEW CODE: submittedOrders
```
**Decision:** Kept submittedOrders because it's what the new feature uses.

### **Conflict 3: ja.js (Japanese translations)**
```
OLD CODE: restocking: '補充発注'
NEW CODE: restocking: '再仕入'
```
**Decision:** Kept the new translation from the feature branch.

### **Conflict 4: Restocking.vue**
```
BOTH ADDED: Both sides created this new file
```
**Decision:** Kept our version (the feature branch version).

---

## Common Git Workflows

### **Scenario 1: Creating a New Feature**
```bash
git checkout main              # Start from main
git checkout -b new-feature    # Create feature branch
# ... make changes ...
git add .
git commit -m "Add new feature"
git push origin new-feature
# Open a PR on GitHub
```

### **Scenario 2: Someone Else Updated Main**
```bash
git fetch origin main          # Get latest main
git rebase origin/main         # Stack your changes on top
# Fix any conflicts
git push -f origin your-branch
```

### **Scenario 3: Going Back in Time**
```bash
git log --oneline              # See all commits
git checkout <commit-hash>     # Go back to that point
```

---

## Pro Tips

### **1. Write Clear Commit Messages**
```bash
# ❌ Bad
git commit -m "stuff"
git commit -m "fix"

# ✅ Good
git commit -m "Add user authentication to login page"
git commit -m "Fix bug where password wasn't being validated"
```

### **2. Commit Frequently**
Make small commits often. It's easier to fix one broken commit than find what broke in a huge commit.

### **3. Pull Before You Push**
```bash
git pull origin main    # Get latest changes
# ... fix any conflicts ...
git push origin main    # Now push
```

### **4. Branch Names Should Be Descriptive**
```bash
# ✅ Good
feature/user-auth
bugfix/login-validation
docs/update-readme

# ❌ Bad
stuff
fix1
branch2
```

### **5. Never Force Push to Main**
`git push -f` rewrites history. Only use it on your personal branches, never on shared branches like `main`.

---

## Vocabulary Cheat Sheet

| Term | Meaning |
|------|---------|
| **Commit** | A snapshot of your code at a point in time |
| **Branch** | A separate copy of code to work on safely |
| **Merge** | Combining two branches together |
| **Rebase** | Moving your commits to stack on top of another branch |
| **Conflict** | When two branches changed the same lines differently |
| **Push** | Upload your commits to GitHub |
| **Pull** | Download commits from GitHub |
| **Fetch** | Download info about changes (doesn't apply them yet) |
| **Stage** | Mark files to be included in the next commit |
| **HEAD** | Your current branch's latest commit |
| **Remote** | GitHub's copy of your code |
| **Local** | Your computer's copy of code |

---

## What Happened in Our Workflow (Quick Version)

1. ✅ **Created branch** `new_features` to build the Restocking feature
2. ✅ **Made changes** to multiple files
3. ✅ **Committed** changes with a clear message
4. ✅ **Pushed** to GitHub
5. ❌ **Found conflicts** - `main` had changed since we branched off
6. ✅ **Rebased** - Moved our changes to stack on top of latest `main`
7. ✅ **Fixed conflicts** - Chose which code to keep
8. ✅ **Force pushed** - Updated our PR with clean history
9. ✅ **Ready to merge** - PR can now be merged to main

---

## Next Steps for Learning

1. **Practice switching branches** - Get comfortable with `checkout` and `status`
2. **Make small commits** - Understand what each one does
3. **Read your git log** - See the history of your project
4. **Try rebasing** - Practice on a test branch first
5. **Study real merge conflicts** - They're usually simple once you see a few

---

## Resources

- **Visual Git Guide:** https://git-scm.com/book/en/v2
- **Interactive Learning:** https://learngitbranching.js.org/
- **GitHub Docs:** https://docs.github.com/en/get-started

---

**Remember:** Git might seem confusing at first, but it becomes muscle memory quickly. Every developer uses it daily, and mastering it is one of the best skills you can learn! 🚀
