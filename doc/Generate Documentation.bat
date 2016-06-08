@echo off
echo Generate Documentation From Markdown
echo Make sure 'pandoc' is installed (https://github.com/jgm/pandoc/releases/latest)
echo ---
echo Surround filename with quotation marks " " if the name has spaces.

set /P id="Provide name for documentation: "
pandoc DOCUMENTATION.md -f markdown -t docx -s -o %id%.docx --table-of-contents --reference-docx=./StyleTemplate.docx