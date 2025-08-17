export default {
  "type": "object",
  "required": ["personal_info", "summary", "education", "skills"],
  "errorMessage": {
    "required": {
      "personal_info": "Personal information is required",
      "summary": "Professional summary is required",
      "education": "Education section is required",
      "skills": "Skills section is required"
    }
  },
  "properties": {
    "personal_info": {
      "type": "object",
      "required": ["name", "position", "email", "phone"],
      "errorMessage": {
        "required": {
          "name": "Name cannot be empty",
          "position": "Position is required",
          "email": "Email is required",
          "phone": "Phone number is required"
        },
        "properties": {
          "email": "Invalid email format",
          "linkedin": "LinkedIn must be a valid URL",
          "github": "GitHub must be a valid URL",
          "portfolio": "Portfolio must be a valid URL"
        }
      },
      "properties": {
        "name": { "type": "string", "minLength": 1 },
        "position": { "type": "string", "minLength": 1 },
        "email": { "type": "string", "format": "email" },
        "phone": { "type": "string", "minLength": 5 },
        "location": { "type": "string", "minLength": 1 },
        "linkedin": { "type": "string", "format": "uri" },
        "github": { "type": "string", "format": "uri" },
        "portfolio": { "type": "string", "format": "uri" }
      },
      "additionalProperties": false
    },
    "summary": {
      "type": "object",
      "required": ["professional_summary"],
      "errorMessage": {
        "required": {
          "professional_summary": "Professional summary is required"
        }
      },
      "properties": {
        "professional_summary": { "type": "string", "minLength": 10 }
      },
      "additionalProperties": false
    },
    "experience": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["company", "position", "location", "start_date", "description", "achievements"],
        "errorMessage": {
          "required": {
            "company": "Company name is required",
            "position": "Position is required",
            "location": "Location is required",
            "start_date": "Start date is required",
            "description": "Description is required",
            "achievements": "Please list at least one achievement"
          },
          "properties": {
            "start_date": "Start date must be in YYYY-MM-DD or MM/YYYY format",
            "end_date": "End date must be in YYYY-MM-DD, MM/YYYY, or 'Present'"
          }
        },
        "properties": {
          "company": { "type": "string", "minLength": 1 },
          "position": { "type": "string", "minLength": 1 },
          "location": { "type": "string", "minLength": 1 },
          "start_date": { "$ref": "#/$defs/dateOrMonthYear" },
          "end_date": { "$ref": "#/$defs/dateOrMonthYearOrNull" },
          "description": { "type": "string", "minLength": 1 },
          "achievements": {
            "type": "array",
            "minItems": 1,
            "items": { "type": "string", "minLength": 1 }
          }
        },
        "additionalProperties": false
      }
    },
    "education": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["institution", "degree", "field_of_study", "graduation_date"],
        "errorMessage": {
          "required": {
            "institution": "Institution is required",
            "degree": "Degree is required",
            "field_of_study": "Field of study is required",
            "graduation_date": "Graduation date is required"
          },
          "properties": {
            "graduation_date": "Graduation date must be in YYYY-MM-DD or MM/YYYY format"
          }
        },
        "properties": {
          "institution": { "type": "string", "minLength": 1 },
          "degree": { "type": "string", "minLength": 1 },
          "field_of_study": { "type": "string", "minLength": 1 },
          "graduation_date": { "$ref": "#/$defs/dateOrMonthYear" },
          "gpa": { "type": "string", "minLength": 1 }
        },
        "additionalProperties": false
      }
    },
    "skills": {
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "programming_languages": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "frameworks": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "databases": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "cloud_platforms": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "tools": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "soft_skills": { "type": "array", "items": { "type": "string", "minLength": 1 } }
      }
    },
    "projects": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "description", "technologies"],
        "errorMessage": {
          "required": {
            "name": "Project name is required",
            "description": "Project description is required",
            "technologies": "List at least one technology used"
          }
        },
        "properties": {
          "name": { "type": "string", "minLength": 1 },
          "description": { "type": "string", "minLength": 1 },
          "technologies": { "type": "array", "minItems": 1, "items": { "type": "string", "minLength": 1 } },
          "github_url": { "type": "string", "format": "uri" },
          "live_url": { "type": "string", "format": "uri" }
        },
        "additionalProperties": false
      }
    },
    "certifications": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "issuer", "date"],
        "errorMessage": {
          "properties": {
            "date": "Certification date must be in YYYY-MM-DD or MM/YYYY format",
            "expiry_date": "Expiry date must be in YYYY-MM-DD or MM/YYYY format"
          }
        },
        "properties": {
          "name": { "type": "string", "minLength": 1 },
          "issuer": { "type": "string", "minLength": 1 },
          "date": { "$ref": "#/$defs/dateOrMonthYear" },
          "expiry_date": { "$ref": "#/$defs/dateOrMonthYear" }
        },
        "additionalProperties": false
      }
    },
    "languages": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["language", "proficiency"],
        "errorMessage": {
          "required": {
            "language": "Language name is required",
            "proficiency": "Proficiency level is required"
          }
        },
        "properties": {
          "language": { "type": "string", "minLength": 1 },
          "proficiency": { "type": "string", "enum": ["Native", "Fluent", "Intermediate", "Basic"] }
        },
        "additionalProperties": false
      }
    }
  },
  "$defs": {
    "dateOrMonthYear": {
      "type": "string",
      "pattern": "^(\\d{4}-\\d{2}-\\d{2}|(0[1-9]|1[0-2])\\/(19|20)\\d{2})$"
    },
    "dateOrMonthYearOrNull": {
      "type": ["string", "null"],
      "pattern": "^(\\d{4}-\\d{2}-\\d{2}|(0[1-9]|1[0-2])/(19|20)\\d{2}|[Pp][Rr][Ee][Ss][Ee][Nn][Tt])$"
    }
  },
  "additionalProperties": false
}
