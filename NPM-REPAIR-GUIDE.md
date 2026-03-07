# NPM Repair Guide for Windows

## Error Analysis

**Error:** `MODULE_NOT_FOUND: minipass`  
**Path:** `C:\Program Files\nodejs\node_modules\npm\node_modules\minipass-pipeline\node_modules\minipass\index.js`  
**Node Version:** v24.13.0  
**npm Version:** v11.6.2

This error occurs when npm's internal dependencies (specifically `minipass` package) are corrupted, missing, or incompatible.

---

## Step 1: Check Node.js and npm Installation

Open PowerShell as Administrator and run:

```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# Check where Node.js is installed
where node

# Check npm prefix location
npm prefix -g
```

**Expected Output:** Should display version numbers. If these commands fail, Node.js itself may need reinstallation.

---

## Step 2: Remove Corrupted npm Folders

The corrupted `minipass` package needs to be removed from npm's internal modules.

```powershell
# Navigate to Node.js installation directory
cd "C:\Program Files\nodejs\node_modules\npm\node_modules"

# Remove the corrupted minipass-related folders
Remove-Item -Recurse -Force "minipass-pipeline" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "minipass" -ErrorAction SilentlyContinue
```

**Explanation:** This removes the corrupted `minipass` package and its parent pipeline package that npm depends on internally.

---

## Step 3: Clear npm Cache

Corrupted cache can cause module resolution failures.

```powershell
# Clear npm cache
npm cache clean --force

# Verify cache is clean
npm cache verify
```

**Explanation:** Forces removal of all cached packages and verifies the cache is clean.

---

## Step 4: Reinstall npm Globally

Reinstall npm as a global package to rebuild its internal dependencies.

```powershell
# Reinstall npm globally
npm install -g npm

# Or use the specific version if you want to pin it
# npm install -g npm@11.6.2
```

**Explanation:** This downloads a fresh copy of npm and its dependencies, replacing the corrupted installation.

---

## Step 5: Fix PATH Issues (If Necessary)

Verify the Node.js paths are correctly added to system PATH.

```powershell
# Check current PATH for Node.js entries
$env:PATH -split ';' | Select-String -Pattern "node"

# Add Node.js to PATH if missing (run in PowerShell as Administrator)
# [Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\Program Files\nodejs", "Machine")
```

**Explanation:** Ensures Windows can find Node.js and npm executables from any command prompt.

---

## Step 6: Verify npm Works

```powershell
# Test basic npm command
npm --version

# Test npm help (loads internal modules)
npm help

# Check installed global packages
npm list -g --depth=0
```

**Expected Output:** All commands should execute without errors.

---

## Step 7: Run `npm install` Successfully

Navigate to your project directory and run:

```powershell
# Navigate to your project
cd "d:\PROJECT\rayeva-ai-assignment"

# Install dependencies
npm install

# Or with verbose output if issues persist
# npm install --verbose
```

**Expected Output:** All packages from package.json should install successfully.

---

## Alternative: Reinstall Node.js (If Above Steps Fail)

If npm still doesn't work, completely reinstall Node.js:

### Option A: Using Node.js Installer

1. Download the latest LTS or current version from https://nodejs.org/
2. Run the installer
3. Select "Repair" or uninstall first, then reinstall

### Option B: Using PowerShell with Chocolatey (If Installed)

```powershell
# Uninstall current Node.js (run as Administrator)
choco uninstall nodejs -y

# Clean up remaining folders
Remove-Item -Recurse -Force "C:\Program Files\nodejs" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:APPDATA\npm" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:APPDATA\npm-cache" -ErrorAction SilentlyContinue

# Reinstall Node.js
choco install nodejs -y
```

### Option C: Using nvm (Recommended for Developers)

```powershell
# Install nvm for Windows
# Download from https://github.com/coreybutler/nvm-windows/releases

# Then use nvm to install Node.js
nvm install 20.12.0
nvm install 24.13.0
nvm use 20.12.0
```

---

## Quick Summary Commands

Run these in sequence if you're confident:

```powershell
# 1. Clear cache
npm cache clean --force

# 2. Reinstall npm
npm install -g npm

# 3. Verify
npm --version

# 4. Install project dependencies
cd "d:\PROJECT\rayeva-ai-assignment"
npm install
```

---

## Additional Notes

- **Node v24.13.0** is a very recent version. If you encounter persistent issues, consider using LTS version (v20.x or v22.x) which has better stability and package compatibility.
- The `minipass` error commonly occurs after interrupted npm operations or when switching between Node.js versions.
- Always run PowerShell as Administrator when performing system-wide installations.

---

## Troubleshooting

If the issue persists after all steps:

```powershell
# Check for permission issues
Get-ChildItem "C:\Program Files\nodejs" -Recurse | Get-Acl

# Run npm with debugging
npm install --loglevel=verbose

# Check for conflicting npm installations
where npm
where node
```

**Final Recommendation:** If you're still having issues, the simplest solution is to uninstall Node.js completely, delete the remaining folders manually, and reinstall using the official Node.js installer.

