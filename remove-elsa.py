#!/usr/bin/env python3
"""
Script to remove all Elsa/wife profile data from App.tsx
Creates a David-only portfolio by removing all multi-profile logic
"""

import re

print("Reading App.tsx...")
with open('src/App.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Original file has {len(lines)} lines")

# We'll process the file line by line, keeping track of what to skip
output_lines = []
skip_until_line = -1
in_wife_section = False
brace_count = 0

for i, line in enumerate(lines, 1):
    # Skip lines if we're in a section to remove
    if i <= skip_until_line:
        continue
    
    # Mark sections to completely remove
    
    # Remove academicProjects constant (lines ~293-348)
    if 'const academicProjects' in line:
        # Find the closing brace for this const
        temp_count = 0
        for j in range(i-1, len(lines)):
            if '{' in lines[j]:
                temp_count += lines[j].count('{')
            if '}' in lines[j]:
                temp_count -= lines[j].count('}')
            if temp_count == 0 and j > i:
                skip_until_line = j + 1
                break
        continue
    
    # Remove downloadElsaResume function
    if 'const downloadElsaResume' in line:
        skip_until_line = i + 15  # Function is about 15 lines
        continue
    
    # Remove PortfolioSwitcher component
    if line.strip().startswith('// Portfolio Switcher Component') or 'function PortfolioSwitcher' in line:
        temp_count = 0
        for j in range(i-1, len(lines)):
            if '{' in lines[j]:
                temp_count += lines[j].count('{')
            if '}' in lines[j]:
                temp_count -= lines[j].count('}')
            if temp_count == 0 and j > i:
                skip_until_line = j + 1
                break
        continue
    
    # Skip wife profile in profiles object
    if re.match(r'\s*wife:\s*{', line):
        temp_count = 1
        for j in range(i, len(lines)):
            if '{' in lines[j]:
                temp_count += lines[j].count('{')
            if '}' in lines[j]:
                temp_count -= lines[j].count('}')
           if temp_count == 0:
                skip_until_line = j + 1
                break
        continue
    
    # Skip wife sections in data objects
    if re.match(r'\s*wife:\s*\[', line):
        temp_count = 0
        started = False
        for j in range(i-1, len(lines)):
            if '[' in lines[j]:
                temp_count += lines[j].count('[')
                started = True
            if ']' in lines[j]:
                temp_count -= lines[j].count(']')
            if started and temp_count == 0:
                skip_until_line = j + 1
                break
        continue
    
    # Remove PortfolioSwitcher usage in App component
    if '<PortfolioSwitcher' in line:
        skip_until_line = i + 1
        continue
    
    # Simplify state management - remove activeProfile state
    if "const [activeProfile, setActiveProfile] = useState('david')" in line:
        continue
    
    # Update props to remove currentProfile references
    line = line.replace('currentProfile={activeProfile}', '')
    line = line.replace('currentProfile, ', '')
    line = line.replace(', currentProfile', '')
    line = line.replace('currentProfile={profile}', '')
    
    # Remove profile color gradient for wife
    if "'wife'" in line and 'profileColors' in line:
        continue
    
   # Keep the line
    output_lines.append(line)

print(f"Processed file has {len(output_lines)} lines")
print(f"Removed {len(lines) - len(output_lines)} lines")

# Write output
with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.writelines(output_lines)

print("Done! App.tsx has been updated to remove Elsa/wife profile")
