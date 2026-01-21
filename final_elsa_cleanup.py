#!/usr/bin/env python3
"""
Final comprehensive Elsa removal script
Removes all remaining wife/Elsa references after manual partial cleanup
"""

import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

original_len = len(content)
print(f"Starting size: {original_len} bytes")

# 1. Remove wife profile from profiles object
content = re.sub(
    r',\s+wife:\s*\{[^}]+name:\s*"Elsa Nlang Monsuy"[^}]+\}',
    '',
    content,
    flags=re.DOTALL
)

# 2. Remove wife experience array (multiple entries)
content = re.sub(
    r',\s+wife:\s*\[\s*\{[^}]+id:\s*"systel"[\s\S]*?\},\s*\{[^}]+id:\s*"diamonds-blocks"[\s\S]*?\},\s*\{[^}]+id:\s*"amtex-machine"[\s\S]*?\}\s*\]',
    '',
    content
)

# 3. Remove wife skills array
content = re.sub(
    r',\s+wife:\s*\[\s*\{[^}]+category:\s*"Education[^}]+\}[\s\S]+?"Fresh Graduate Energy[^}]+\}\s*\]',
    '',
    content
)

# 4. Remove downloadElsaResume function
content = re.sub(
    r'const downloadElsaResume\s*=\s*\(\)\s*=>\s*\{[\s\S]*?\n\}\s*\n',
    '',
    content
)

# 5. Remove Portfolio Switcher component
content = re.sub(
    r'//\s*Portfolio Switcher Component\s*\nfunction PortfolioSwitcher[\s\S]*?\n\}\s*\n',
    '',
    content
)

# 6. Remove wife from color gradients (all instances)
content = re.sub(r",\s*wife:\s*'[^']*'", '', content)

# 7. Remove activeProfile state
content = re.sub(r"\s*const \[activeProfile, setActiveProfile\] = useState\('david'\)\s*\n", '', content)

# 8. Remove PortfolioSwitcher usage in JSX
content = re.sub(r'\s*<PortfolioSwitcher[^/]*/>\s*\n', '', content)

# 9. Remove academicProjects references (if any left)
content = re.sub(r'const allProjects\s*=\s*\[\.\.\.professionalProjects,\s*\.\.\.\(academicProjects[^\]]*\]\)\]', 
                 'const allProjects = professionalProjects', 
                 content)

print(f"Final size: {len(content)} bytes")
print(f"Removed: {original_len - len(content)} bytes")

# Write result
with open('src/App.tsx', 'w') as f:
    f.write(content)

print("✅ Removed all Elsa/wife data!")
print("Testing syntax...")

# Quick syntax check
if content.count('{') == content.count('}'):
    print("✅ Braces balanced")
else:
    print(f"⚠️  Brace mismatch: { - } = {content.count('{') - content.count('}')}")

if content.count('[') == content.count(']'):
    print("✅ Brackets balanced")
else:
    print(f"⚠️  Bracket mismatch: [ - ] = {content.count('[') - content.count(']')}")
