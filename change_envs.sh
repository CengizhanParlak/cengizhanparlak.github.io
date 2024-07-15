#!/bin/bash

# Run this script to change the environment variables in the HTML files
# Usage: ./change_envs.sh [directory] [--dev|<empty>]

# Function to traverse directories and process HTML files
process_files() {
    local dir="$1"
    local dev_mode="$2"

    # Loop through each item in the directory
    for item in "$dir"/*; do
        if [ -d "$item" ]; then
            # Recursively traverse the subdirectory
            process_files "$item" "$dev_mode"
        elif [ -f "$item" ] && [[ "$item" == *.html ]]; then
            # Process the HTML file
            echo "Processing $item"
            if [ "$dev_mode" == "true" ]; then
                sed -i '' '/<!--/,/-->/!s|<base href="https://www.cengizhanparlak.com/" target="_self" />|<base href="http://127.0.0.1:3000" target="_self" />|g' "$item"
                sed -i '' '/<!--/,/-->/!s|href="\./|href="docs/|g' "$item"
                sed -i '' '/<!--/,/-->/!s|src="\./|src="docs/|g' "$item"
            else
                sed -i '' '/<!--/,/-->/!s|<base href="http://127.0.0.1:3000" target="_self" />|<base href="https://www.cengizhanparlak.com/" target="_self" />|g' "$item"
                sed -i '' '/<!--/,/-->/!s|href="docs/|href="./|g' "$item"
                sed -i '' '/<!--/,/-->/!s|src="docs/|src="./|g' "$item"
            fi
            echo "Processed $item"
        fi
    done
}

# Parse the command line arguments
dev_mode="false"
directory="."

for arg in "$@"; do
    if [ "$arg" == "--dev" ]; then
        dev_mode="true"
    else
        directory="$arg"
    fi
done

# Start traversing from the specified directory
process_files "$directory" "$dev_mode"

echo "HTML files processed."
