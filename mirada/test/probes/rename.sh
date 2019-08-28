for file in src/types/opencv/*.d.ts; do
    mv "$file" "$(basename "$file" ".d.ts").ts"
done