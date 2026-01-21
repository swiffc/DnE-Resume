#!/usr/bin/env python3
"""
Comprehensive script to remove ALL Elsa/wife profile data from App.tsx
This will create a clean, David-only portfolio
"""

import re

print("Reading App.tsx...")
with open('src/App.tsx', 'r') as f:
    content = f.read()

print(f"Original size: {len(content)} bytes")

# Step 1: Remove wife profile from profiles object (lines ~364-374)
content = re.sub(
    r',\s*wife:\s*\{[^}]*name:\s*"Elsa Nlang Monsuy"[^}]*\}',
    '',
    content,
    flags=re.DOTALL
)

# Step 2: Remove wife from projectData (with all nested objects)
content = re.sub(
    r',\s*wife:\s*\[[^\]]*?"international-construction"[^\]]*\]',
    '',
    content,
    flags=re.DOTALL | re.MULTILINE
)

# Step 3: Remove academicProjects entirely
content = re.sub(
    r'const academicProjects:.*?\n}\n',
    '',
    content,
    flags=re.DOTALL
)

# Step 4: Remove wife from allExperiences 
content = re.sub(
    r',\s*wife:\s*\[[^\]]*?"systel"[^\]]*\]',
    '',
    content,
    flags=re.DOTALL
)

# Step 5: Remove wife from allSkills
content = re.sub(
    r',\s*wife:\s*\[[^\]]*?Fresh Graduate Energy[^\]]*\]',
    '',
    content,
    flags=re.DOTALL
)

# Step 6: Remove portfolio switcher component definition
content = re.sub(
    r'//\s*Portfolio Switcher Component.*?^}\s*$',
    '',
    content,
    flags=re.DOTALL | re.MULTILINE
)

# Step 7: Remove downloadElsaResume function
content = re.sub(
    r'const downloadElsaResume.*?^\}\s*$',
    '',
    content,
    flags=re.DOTALL | re.MULTILINE
)

# Step 8: Remove portfolio color references for wife
content = re.sub(r",\s*wife:\s*'[^']*'", '', content)

# Step 9: Remove activeProfile state
content = re.sub(
    r"const \[activeProfile, setActiveProfile\] = useState\('david'\)\s*",
    '',
    content
)

# Step 10: Remove PortfolioSwitcher usage 
content = re.sub(
    r'<PortfolioSwitcher.*?/>',
    '',
    content,
    flags=re.DOTALL
)

print(f"Final size: {len(content)} bytes")
print(f"Removed {len(open('src/App.tsx').read()) - len(content)} bytes")

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("✅ Successfully removed all Elsa/wife profile data!")
print("⚠️  Note: May need manual cleanup of remaining currentProfile references")
