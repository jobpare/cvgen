# Jobpare CV Generator

<p align="center">
  <img src="docs/img/cvgen_logo.png" alt="Jobpare CV Generator" width="200" />
</p>

[![Open Source Helpers](https://www.codetriage.com/jobpare/cvgen/badges/users.svg)](https://www.codetriage.com/jobpare/cvgen)
![GitHub stars](https://img.shields.io/github/stars/jobpare/cvgen?style=social)
![GitHub forks](https://img.shields.io/github/forks/jobpare/cvgen?style=social)
![GitHub license](https://img.shields.io/github/license/jobpare/cvgen)
![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-blue)
![CLI Tool](https://img.shields.io/badge/CLI-Tool-informational)


A local-first tool to generate beautiful, professional CVs from JSON data and HTML templates. Perfect for developers, designers, and professionals who want full control over their CV presentation.

- 🧠 **JSON-based data input** - Easy to edit and version control
- 🖨️ **PDF output** - High-quality, print-ready CVs using Puppeteer
- 🔧 **Local-first** - No cloud dependencies, your data stays private
- 🎨 **Web-based editor** - Visual editor with live preview ([CV-JSON Web Editor](https://jobpare.github.io/cvgen/))
- 📱 **CLI tool** - Command-line interface for automation
- 🎯 **Role-specific guidance** - Skills, verbs, and schema for different roles

## 📋 Requirements

Before you begin, ensure you have the following installed:

- **Node.js 18+** - JavaScript runtime for the CLI tool
- **Chrome/Chromium** - For PDF generation (optional, falls back to HTML)
- **Modern web browser** - For the web-based editor

### Dependencies
- [Handlebars](https://handlebarsjs.com/) for templating
- [Puppeteer](https://pptr.dev/) for PDF generation
- [Commander.js](https://github.com/tj/commander.js) for CLI interface


## 🚀 Quick Start

Follow these steps to create your professional CV:

### 1. Installation

```bash
# Install Node.js dependencies
npm install

# Make the CLI tool executable
chmod +x src/generate.js
```

### 2. Edit CV JSON

#### 2.1. Open JSON Web Editor to customize your information

1. Visit [https://jobpare.github.io/cvgen/](https://jobpare.github.io/cvgen/) (online editor)
2. Choose your role from the dropdown (backend/frontend)
3. Edit your CV data using the form editor or JSON view
4. See live preview of your CV as you type

![CV JSON Editor](docs/img/js_cv_json_editor.png)

#### 2.2. Save JSON
- Click "Download JSON" to save your CV data as a JSON file
- Save it as `my-cv.json` in your project directory

### 3. Pick Template + Format

**Available Templates:**
- `template-1.html` - Clean, professional single-column layout

**Output Formats:**
- **HTML** - Web-friendly, can be opened in any browser
- **PDF** - Print-ready, professional format (requires Chrome/Chromium)

### 4. Run CLI Commands to generate your CV

```bash
# Generate HTML file (recommended for most users)
node src/generate.js generate \
  -t docs/cv-templates/template-1.html \
  -i my-cv.json \
  -o output/my-cv.html

# Generate PDF file
node src/generate.js generate \
  -t docs/cv-templates/template-1.html \
  -i my-cv.json \
  -o output/my-cv.pdf

# Validate your data before generating
node src/generate.js generate \
  -t docs/cv-templates/template-1.html \
  -i my-cv.json \
  --validate-only
```

Your generated CV will be saved in the `output/` directory!

## 🏗️ Architecture

Jobpare CV Generator uses a **modern web-based approach** combining HTML/CSS/JavaScript for the editor and Node.js for document generation. This provides a simpler alternative to traditional LaTeX-based CV solutions.

### Key Components
- **Web Editor**: Online editor at jobpare.github.io/cvgen/ with instant live preview
- **JSON Data**: Version control friendly, platform-independent format
- **Templates**: Handlebars.js for flexible, logic-less templating
- **Generation**: HTML output + PDF conversion via Puppeteer
- **Curated Content**: Skills and action verbs lists compiled from most-used terms across the web

### Comparison with LaTeX Solutions

| Feature             | 🛠 **Jobpare CV Generator**           | 📚 **Traditional LaTeX (e.g., Awesome-CV)** |
| ------------------- | ------------------------------------- | ------------------------------------------- |
| **Setup**           | Simple `npm install`                  | Complex LaTeX distribution setup            |
| **Learning Curve**  | Basic HTML/CSS or JSON                | Steep; requires LaTeX syntax                |
| **Live Preview**    | Instant browser preview               | Compile → View cycle                        |
| **Customization**   | Visual editor or tweakable CSS        | Manual code editing                         |
| **Version Control** | Clean JSON + template files           | Mixed text + binary artifacts               |
| **Cross-Platform**  | Works on any OS with Node.js + Chrome | OS-specific LaTeX quirks                    |
| **Dependencies**    | Minimal (Node.js, Puppeteer/Chrome)   | Full LaTeX suite (TeX Live, MikTeX, etc.)   |
| **Output Quality**  | Clean, professional, print-ready PDF  | Excellent typographic control               |

cvgen delivers most of the output quality of LaTeX with a dramatically simpler setup and developer-friendly workflow.

## 📁 Project Structure

```
jobpare-cv/
├── src/
│   └── generate.js                   # 🧠 CLI generator
├── docs/                             # 🌐 Web interface source
│   ├── index.html                    # 📄 Web editor (deployed to GitHub Pages)
│   ├── js/
│   │   └── editor.js                 # 🔧 Editor logic
│   ├── css/
│   │   └── editor.css                # 🎨 Editor styles
│   ├── cv-templates/
│   │   └── template-1.html # 📄 HTML template
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

Your CV data should follow this complete JSON structure:

```json
{
  "personal_info": {
    "name": "Your Name",
    "position": "Your Target Position",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, State",
    "linkedin": "linkedin.com/in/yourprofile",
    "github": "github.com/yourusername",
    "portfolio": "yourportfolio.com"
  },
  "summary": {
    "professional_summary": "2-3 sentences about your background, expertise, and career goals"
  },
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "location": "City, State",
      "start_date": "MM/YYYY",
      "end_date": "MM/YYYY or 'Present'",
      "description": "Brief company description and your role",
      "achievements": [
        "Use action verbs from action-verbs.txt",
        "Quantify your impact when possible",
        "Focus on results and outcomes"
      ]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Type",
      "field_of_study": "Field of Study",
      "graduation_date": "MM/YYYY",
      "gpa": "GPA (optional)"
    }
  ],
  "skills": {
    "programming_languages": ["From skills.txt"],
    "frameworks": ["From skills.txt"],
    "databases": ["From skills.txt"],
    "cloud_platforms": ["From skills.txt"],
    "tools": ["From skills.txt"],
    "soft_skills": ["Your soft skills"]
  },
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief project description and your role",
      "technologies": ["Tech stack used"],
      "github_url": "github.com/yourusername/project",
      "live_url": "project-demo.com (optional)"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "MM/YYYY",
      "expiry_date": "MM/YYYY or null"
    }
  ],
  "languages": [
    {
      "language": "Language Name",
      "proficiency": "Native/Fluent/Intermediate/Basic"
    }
  ]
}
```

## 🎨 Templates

### Template 1 (Default)
- **File**: `docs/cv-templates/template-1.html`
- **Figma Design**: [View Template 1 Design](https://www.figma.com/community/file/1532035417339090995/jobpare-product-designer-cv-template)
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
node src/generate.js generate -t docs/cv-templates/template-1.html -i my-cv.json -o output/cv.html

# Generate PDF file (requires Chrome/Chromium)
node src/generate.js generate -t docs/cv-templates/template-1.html -i my-cv.json -o output/cv.pdf

# Force HTML output even with .pdf extension
node src/generate.js generate -t docs/cv-templates/template-1.html -i my-cv.json -o output/cv.pdf --html-only

# Validate data without generating output
node src/generate.js generate -t docs/cv-templates/template-1.html -i my-cv.json --validate-only

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Contribution

See [Contribution.md](./Contribution.md) for the project roadmap and ways to contribute. 

---

**Happy CV building! 🎉**

For questions or support, please open an issue on GitHub. 