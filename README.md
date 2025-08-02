# JobPare CV Generator

A local-first tool to generate beautiful, professional CVs from JSON data and HTML templates. Perfect for developers, designers, and professionals who want full control over their CV presentation.

🌐 **Live Web Editor**: [https://jobpare.github.io/cvgen/](https://jobpare.github.io/cvgen/)

## ✨ Features

- 📄 **Prebuilt HTML templates** - Clean, professional designs using Handlebars
- 🧠 **JSON-based data input** - Easy to edit and version control
- 🎯 **Role-specific guidance** - Skills, verbs, and schema for different roles
- 🖨️ **PDF output** - High-quality, print-ready CVs using Puppeteer
- 🔧 **Local-first** - No cloud dependencies, your data stays private
- 🎨 **Web-based editor** - Visual editor with live preview
- 📱 **CLI tool** - Command-line interface for automation
- 🎯 **Job-role-specific guidance** - Skills, verbs, and schema for different roles

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Make the CLI tool executable
chmod +x src/generate.js
```

### 2. Choose Your Role

Browse the `docs/cv-data/` directory to find your role:
- `backend/` - Backend developers
- `frontend/` - Frontend developers

### 3. Create Your CV Data

Use the `cv-schema.json` file in your role directory as a guide to create your CV data:

```bash
# Copy the sample data for your role
cp docs/cv-data/backend/cv-schema.json my-cv.json

# Edit with your information
nano my-cv.json
```

### 4. Generate Your CV

#### Using the CLI Tool

```bash
# Generate HTML file
node src/generate.js generate \
  --template docs/cv-templates/template-1-handlebars.html \
  --input my-cv.json \
  --output output/my-cv.html

# Generate PDF file
node src/generate.js generate \
  --template docs/cv-templates/template-1-handlebars.html \
  --input my-cv.json \
  --output output/my-cv.pdf

# Validate data without generating output
node src/generate.js generate \
  --template docs/cv-templates/template-1-handlebars.html \
  --input my-cv.json \
  --validate-only
```

#### Using the Web Editor

**Option 1: Use the Live Editor (Recommended)**
1. Visit [https://jobpare.github.io/cvgen/](https://jobpare.github.io/cvgen/)
2. Choose your role from the dropdown
3. Edit your CV data using the form editor or JSON view
4. See live preview of your CV
5. Download your JSON data when ready
6. Use the CLI tool to generate the final CV

**Option 2: Local Development**
1. Open `docs/index.html` in your browser
2. Choose your role from the dropdown
3. Edit your CV data using the form editor or JSON view
4. See live preview of your CV
5. Download your JSON data when ready
6. Use the CLI tool to generate the final CV

## 📁 Project Structure

```
jobpare-cv/
├── src/
│   └── generate.js                   # 🧠 CLI generator
├── docs/                             # 🌐 Web interface
│   ├── index.html                    # 📄 Web editor
│   ├── js/
│   │   └── editor.js                 # 🔧 Editor logic
│   ├── css/
│   │   └── editor.css                # 🎨 Editor styles
│   ├── cv-templates/
│   │   └── template-1-handlebars.html # 📄 HTML template
│   └── cv-data/                      # 🎯 Role-specific guidance
│       ├── backend/
│       │   ├── cv-schema.json       # 👤 Data structure guide
│       │   ├── skills.txt           # 🔧 Relevant skills
│       │   └── action-verbs.txt     # 🚀 Power verbs
│       └── frontend/
│           ├── cv-schema.json       # 👤 Data structure guide
│           ├── skills.txt           # 🔧 Relevant skills
│           └── action-verbs.txt     # 🚀 Power verbs
├── output/                           # 📄 Generated CVs
├── package.json                      # 📦 Node.js dependencies
└── README.md                         # This file
```

## 🎯 Available Roles

### Backend Developer
- **Schema**: `docs/cv-data/backend/cv-schema.json`
- **Skills**: Programming languages, frameworks, databases, cloud platforms
- **Verbs**: Technical achievement and leadership verbs

### Frontend Developer
- **Schema**: `docs/cv-data/frontend/cv-schema.json`
- **Skills**: JavaScript frameworks, UI libraries, design tools
- **Verbs**: Frontend-specific action verbs

## 📝 CV Data Format

Your CV data should follow this JSON structure:

```json
{
  "personal_info": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, State",
    "linkedin": "linkedin.com/in/yourprofile",
    "github": "github.com/yourusername",
    "portfolio": "yourportfolio.com"
  },
  "summary": {
    "professional_summary": "2-3 sentences about your background and goals"
  },
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "location": "City, State",
      "start_date": "MM/YYYY",
      "end_date": "MM/YYYY or 'Present'",
      "description": "Brief company description",
      "achievements": [
        "Use action verbs from action-verbs.txt",
        "Quantify your impact when possible"
      ]
    }
  ],
  "education": [...],
  "skills": {
    "programming_languages": ["From skills.txt"],
    "frameworks": ["From skills.txt"],
    "databases": ["From skills.txt"],
    "cloud_platforms": ["From skills.txt"],
    "tools": ["From skills.txt"],
    "soft_skills": ["Your soft skills"]
  },
  "projects": [...],
  "certifications": [...],
  "languages": [...]
}
```

## 🎨 Templates

### Template 1 (Default)
- **File**: `docs/cv-templates/template-1-handlebars.html`
- **Style**: Clean, professional, single-column layout
- **Features**: 
  - Responsive design
  - Color-coded sections
  - Skill tags
  - Print-optimized
  - Handlebars templating

## 🛠️ CLI Usage

```bash
# Generate HTML file (recommended for most users)
node src/generate.js generate -t docs/cv-templates/template-1-handlebars.html -i my-cv.json -o output/cv.html

# Generate PDF file (requires Chrome/Chromium)
node src/generate.js generate -t docs/cv-templates/template-1-handlebars.html -i my-cv.json -o output/cv.pdf

# Force HTML output even with .pdf extension
node src/generate.js generate -t docs/cv-templates/template-1-handlebars.html -i my-cv.json -o output/cv.pdf --html-only

# Validate data without generating output
node src/generate.js generate -t docs/cv-templates/template-1-handlebars.html -i my-cv.json --validate-only

# Help
node src/generate.js generate --help
```

### Options

| Option | Description |
|--------|-------------|
| `-t, --template` | Path to HTML template file |
| `-i, --input` | Path to JSON input file |
| `-o, --output` | Path for output file (PDF or HTML) |
| `--html-only` | Generate HTML file only (skip PDF generation) |
| `--validate-only` | Only validate JSON data |

## 🌐 Web Editor

The web-based editor provides a user-friendly interface for creating and editing CV data:

### Features
- **Visual Form Editor**: Edit CV data using forms instead of raw JSON
- **JSON Editor**: Direct JSON editing with syntax highlighting
- **Live Preview**: See your CV as you type
- **Role Selection**: Choose from available roles (backend, frontend)
- **Validation**: Real-time validation of your data
- **Export**: Download your JSON data for use with the CLI tool

### Usage

**Live Editor (Recommended)**
1. Visit [https://jobpare.github.io/cvgen/](https://jobpare.github.io/cvgen/)
2. Select your role from the dropdown
3. Use the form editor or JSON view to edit your data
4. See live preview updates
5. Validate your data
6. Download the JSON file
7. Use the CLI tool to generate the final CV

**Local Development**
1. Open `docs/index.html` in your web browser
2. Select your role from the dropdown
3. Use the form editor or JSON view to edit your data
4. See live preview updates
5. Validate your data
6. Download the JSON file
7. Use the CLI tool to generate the final CV

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Roles

1. Create a new directory in `docs/cv-data/` (e.g., `docs/cv-data/data-scientist/`)
2. Add three files:
   - `cv-schema.json` - Data structure for the role
   - `skills.txt` - Relevant skills (20-30 items)
   - `action-verbs.txt` - Action verbs (30+ items)
3. Update the role selector in `docs/index.html`

### Creating New Templates

1. Create a new HTML file in `docs/cv-templates/` (e.g., `template-2-handlebars.html`)
2. Use Handlebars templating syntax
3. Follow the existing template structure
4. Test with sample data

### Template Guidelines

- Use semantic HTML
- Include print-friendly CSS
- Make it responsive
- Use consistent naming conventions
- Test with various data lengths
- Use Handlebars syntax: `{{variable}}`, `{{#each array}}...{{/each}}`

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request with clear description

## 🐛 Troubleshooting

### Common Issues

**PDF generation fails:**
- The tool will automatically fall back to HTML generation
- Open the HTML file in your browser and use "Print to PDF" for a PDF version
- Ensure Chrome/Chromium is installed and accessible
- Check that the executable path in `generate.js` matches your Chrome installation

**Template rendering errors:**
- Check JSON syntax
- Ensure all required fields are present
- Validate against the schema
- Check Handlebars syntax in templates

**Web editor not working:**
- Ensure you're opening `docs/index.html` in a modern browser
- Check browser console for JavaScript errors
- Verify all files in the `docs/` directory are present

**CLI tool issues:**
- Ensure Node.js 18+ is installed
- Run `npm install` to install dependencies
- Make sure the script is executable: `chmod +x src/generate.js`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Handlebars](https://handlebarsjs.com/) for templating
- [Puppeteer](https://pptr.dev/) for PDF generation
- [Commander.js](https://github.com/tj/commander.js) for CLI interface
- The open-source community for inspiration and tools

---

**Happy CV building! 🎉**

For questions or support, please open an issue on GitHub. 