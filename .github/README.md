# GitHub Workflows

This project uses simple GitHub Actions workflows for basic code quality checks.

## Workflows

### CI Workflow (`.github/workflows/ci.yml`)
Runs on every push to `main`/`develop` branches and pull requests.

**What it does:**
- **PHP Lint**: Checks PHP syntax errors
- **WordPress Coding Standards**: Runs PHPCS with WordPress standards
- **JavaScript Lint & Build**: Runs ESLint, Stylelint, and builds assets

### Code Quality Workflow (`.github/workflows/code-quality.yml`)
Runs on every push to `main`/`develop` branches and pull requests.

**What it does:**
- **PHP Code Beautifier**: Auto-fixes PHP coding standard issues
- **JavaScript Formatting**: Auto-fixes JavaScript and CSS issues

## Configuration Files

- `phpstan.neon` - PHPStan static analysis configuration (basic)

## How It Works

1. When you push code or create a pull request, both workflows run automatically
2. They check your code quality and try to fix issues automatically
3. If there are syntax errors, the workflows will fail and show you what needs to be fixed
4. All checks must pass before you can merge pull requests (if branch protection is enabled)

## Local Development

To run similar checks locally:

```bash
# PHP syntax check
find . -name "*.php" -not -path "./vendor/*" | xargs -n1 php -l

# Install and run PHPCS
composer global require squizlabs/php_codesniffer
composer global require wp-coding-standards/wpcs
phpcs --standard=WordPress --extensions=php --ignore=vendor/ .

# JavaScript linting
npm run lint # if you have lint script in package.json
npx eslint src/ --ext .js
```

That's it! Simple and focused on the basics. 