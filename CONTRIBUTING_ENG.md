# Contribution Guideline

## Things to note before contributing

- Make sure that the contribution you seek to make is not the iteration of a former issue or hasn't been done by anyone else.
- If you face with a problem, open up an issue for it.
- For a change you await or want, open up an issue.
- Open up an issue in order to add a new feature.
- Create a PR to fix an issue.
- Create a PR to fix an error in the documentation.

### [**PR Rules**](https://github.com/acikkaynak/deprem-yardim-frontend/blob/development/.github/PULL_REQUEST_TEMPLATE.md)

### [**Issue Rules**](https://github.com/acikkaynak/deprem-yardim-frontend/tree/development/.github/ISSUE_TEMPLATE)

## Before you begin

### Setting up the project

Requirements:

- Node 17.0^
- Yarn 1.22^

```bash
# Clone the project
git clone

# Move to project directory
cd deprem-yardim-frontend

# Install the dependencies
yarn

# Run the development environment
yarn dev
```

### Formatting the code

We use [`prettier`](https://prettier.io/) on this project for code formatting. Linter configuration can be found [here](https://github.com/acikkaynak/deprem-yardim-frontend/blob/main/.prettierrc).

### Commit messages

Each commit must include a **header**, a **body** and a **footer**. Title is formatted as **type**, **scope** and, **description**.

```plaintext
<type>(<scope>): <description>
<EMPTY LINE>
<body>
<EMPTY LINE>
<footer>
```

Commit messages should not exceed 72 characters.

### Message header

Message header is mandatory and it must include a type, an optional scope and a short description. Ideally, it should not exceed 50 characters.

By complying with these rules, you can create an open change log for all versions.

It is advised to watching PR header for commit messages. This way, when a PR is merged, PR header can be used as commit message and allows the change history to be formatted appropriately.

#### Type

Type states the type of your change. Allowed types are:

- `feat`: Adds a new feature
- `fix`: Fixing an error/bug
- `docs`: Changes that affect only the documentation
- `style`: Just formatting changes such as punctuation, spaces etc.
- `refactor`: A change that does not affect the contents of the code
- `perf`: Performance change
- `test`: Adds missing tests or changes current ones
- `chore`: Other changes that does not affect the development process

#### Scope

Scope, states the part that is affected by the commit. For instance, a scope such as `kafka` or `login` can be stated.

#### Description

Description provides a short explanation regarding the purpose of the commit. First letter should be capitalized. Description should be one sentence. This could serve as the commit message header.

### Message Body

Message body is an explanation that states why the commit was made. Body can be one or more paragraphs. Paragraphs should not exceed 72 characters.

#### More info for writing git commit messages

- [Writing Git commit messages](http://365git.tumblr.com/post/3308646748/writing-git-commit-messages)

- [A Note About Git Commit Messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)

### Message Footer

Completed, fixed or delivered cases should be added to footer as a separate line and start with "Finishes", "Fixes" or "Delivers" keyword:

`[(Finishes|Fixes|Delivers) #ISSUE_ID]`

### Message Sample

```sh
feat(34): implement exactly once delivery
- ensure every event published to kafka
```
