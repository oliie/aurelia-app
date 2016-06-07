title Generate Documentation From Markdown
pandoc DOCUMENTATION.md -f markdown -t docx -s -o CHANGE-NAME.docx --table-of-contents --reference-docx=./DocumentationTemplate.docx