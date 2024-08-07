#!/bin/bash

# Set the directory to search
search_dir="docs"

# Default mode is production (changing docs/ to ./)
mode="prod"

# Check if --dev argument is passed
if [[ "$1" == "--dev" ]]; then
    mode="dev"
fi

# Find all HTML files recursively
find "$search_dir" -type f -name "*.html" | while read -r file; do
    if [[ "$mode" == "prod" ]]; then
        # Production mode: Change docs/ to ./ and update URL
        sed -i '' 's|href="docs/|href="./|g' "$file"
        sed -i '' 's|src="docs/|src="./|g' "$file"
        sed -i '' 's|href="http://127.0.0.1:3000|href="https://www.cengizhanparlak.com|g' "$file"
        echo "Processed (prod mode): $file"
    else
        # Development mode: Change ./ to docs/ and update URL
        sed -i '' 's|href="./|href="docs/|g' "$file"
        sed -i '' 's|src="./|src="docs/|g' "$file"
        sed -i '' 's|href="https://www.cengizhanparlak.com|href="http://127.0.0.1:3000|g' "$file"
        echo "Processed (dev mode): $file"
    fi
done

echo "All HTML files have been updated in $mode mode."
