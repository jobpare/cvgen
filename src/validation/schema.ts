import type { JSONSchemaType } from "ajv";
import type { CVProfile } from "./schema.types";

interface definitions {
  definitions: {
    dateOrMonthYear: {
      type: "string";
      pattern: string;
    };
  };
}

const schema: JSONSchemaType<CVProfile> & definitions = {
  'type': 'object',
  'required': ['profile', 'summary', 'education', 'skills'],
  'errorMessage': {
    'required': {
      'profile': 'Profile information is required',
      'summary': 'Summary is required',
      'education': 'Education section is required',
      'skills': 'Skills section is required'
    }
  },
  'properties': {
    'profile': {
      'type': 'object',
      'required': ['name', 'position', 'email', 'phone'],
      'errorMessage': {
        'required': {
          'name': 'Name cannot be empty',
          'position': 'Position is required',
          'email': 'Email is required',
          'phone': 'Phone number is required'
        },
        'properties': {
          'email': 'Invalid email format',
          'linkedin': 'LinkedIn must be a valid URL',
          'github': 'GitHub must be a valid URL',
          'website': 'Website must be a valid URL'
        }
      },
      'properties': {
        'name': { 'type': 'string', 'minLength': 1 },
        'position': { 'type': 'string', 'minLength': 1 },
        'email': { 'type': 'string', 'format': 'email' },
        'phone': { 'type': 'string', 'minLength': 5 },
        'seniority_level': { 'type': 'string', 'minLength': 1, 'nullable': true },
        'location': { 'type': 'string', 'minLength': 1, 'nullable': true },
        'linkedin': { 'type': 'string', 'format': 'uri', 'nullable': true },
        'github': { 'type': 'string', 'format': 'uri', 'nullable': true },
        'website': { 'type': 'string', 'format': 'uri', 'nullable': true }
      },
      'additionalProperties': false
    },
    'summary': {
      'type': 'string',
      'minLength': 10
    },
    'experiences': {
      'type': 'array',
      'minItems': 1,
      'nullable': true,
      'items': {
        'type': 'object',
        'required': ['company', 'position', 'location', 'start_date', 'description', 'achievements'],
        'errorMessage': {
          'required': {
            'company': 'Company name is required',
            'position': 'Position is required',
            'location': 'Location is required',
            'start_date': 'Start date is required',
            'description': 'Description is required',
            'achievements': 'Please list at least one achievement'
          },
          'properties': {
            'start_date': 'Start date must be in YYYY-MM-DD or MM/YYYY format',
            'end_date': 'End date must be in YYYY-MM-DD, MM/YYYY, or \'Present\''
          }
        },
        'properties': {
          'company': { 'type': 'string', 'minLength': 1 },
          'position': { 'type': 'string', 'minLength': 1 },
          'location': { 'type': 'string', 'minLength': 1 },
          'start_date': { '$ref': '#/definitions/dateOrMonthYear' },
          'end_date': {
            'type': 'string',
            'pattern': '^(\\d{4}-\\d{2}-\\d{2}|(0[1-9]|1[0-2])/(19|20)\\d{2}|[Pp][Rr][Ee][Ss][Ee][Nn][Tt])$',
            'nullable': true
          },
          'description': { 'type': 'string', 'minLength': 1 },
          'achievements': {
            'type': 'array',
            'minItems': 1,
            'items': { 'type': 'string', 'minLength': 1 }
          }
        },
        'additionalProperties': false
      }
    },
    'education': {
      'type': 'array',
      'minItems': 1,
      'items': {
        'type': 'object',
        'required': ['institution', 'degree', 'field_of_study', 'end_date'],
        'errorMessage': {
          'required': {
            'institution': 'Institution is required',
            'degree': 'Degree is required',
            'field_of_study': 'Field of study is required',
            'end_date': 'End date is required'
          },
          'properties': {
            'end_date': 'End date must be in YYYY-MM-DD or MM/YYYY format'
          }
        },
        'properties': {
          'institution': { 'type': 'string', 'minLength': 1 },
          'degree': { 'type': 'string', 'minLength': 1 },
          'field_of_study': { 'type': 'string', 'minLength': 1 },
          'end_date': { '$ref': '#/definitions/dateOrMonthYear' },
          'gpa': { 'type': 'string', 'minLength': 1, 'nullable': true }
        },
        'additionalProperties': false
      }
    },
    'skills': {
      'type': 'object',
      'required': [],
      // Allow any skill category key, each value must be an array of non-empty strings
      'additionalProperties': {
        'type': 'array',
        'items': { 'type': 'string', 'minLength': 1 }
      }
    },
    'projects': {
      'type': 'array',
      'nullable': true,
      'items': {
        'type': 'object',
        'required': ['name', 'description', 'technologies'],
        'errorMessage': {
          'required': {
            'name': 'Project name is required',
            'description': 'Project description is required',
            'technologies': 'List at least one technology used'
          }
        },
        'properties': {
          'name': { 'type': 'string', 'minLength': 1 },
          'description': { 'type': 'string', 'minLength': 1 },
          'technologies': { 'type': 'array', 'minItems': 1, 'items': { 'type': 'string', 'minLength': 1 } },
          'github_url': { 'type': 'string', 'format': 'uri', 'nullable': true },
          'live_url': { 'type': 'string', 'format': 'uri', 'nullable': true }
        },
        'additionalProperties': false
      }
    },
    'certifications': {
      'type': 'array',
      'nullable': true,
      'items': {
        'type': 'object',
        'required': ['name', 'issuer', 'date'],
        'errorMessage': {
          'properties': {
            'date': 'Certification date must be in YYYY-MM-DD or MM/YYYY format',
            'expiry_date': 'Expiry date must be in YYYY-MM-DD or MM/YYYY format'
          }
        },
        'properties': {
          'name': { 'type': 'string', 'minLength': 1 },
          'issuer': { 'type': 'string', 'minLength': 1 },
          'date': { '$ref': '#/definitions/dateOrMonthYear' },
          'expiry_date': {
            'type': 'string',
            'pattern': '^(\\d{4}-\\d{2}-\\d{2}|(0[1-9]|1[0-2])\\/(19|20)\\d{2})$',
            'nullable': true
          }
        },
        'additionalProperties': false
      }
    },
    'languages': {
      'type': 'array',
      'nullable': true,
      'items': {
        'type': 'object',
        'required': ['language', 'proficiency'],
        'errorMessage': {
          'required': {
            'language': 'Language name is required',
            'proficiency': 'Proficiency level is required'
          }
        },
        'properties': {
          'language': { 'type': 'string', 'minLength': 1 },
          'proficiency': { 'type': 'string', 'enum': ['Native', 'Fluent', 'Intermediate', 'Basic'] }
        },
        'additionalProperties': false
      }
    }
  },
  'definitions': {
    'dateOrMonthYear': {
      'type': 'string',
      'pattern': '^(\\d{4}-\\d{2}-\\d{2}|(0[1-9]|1[0-2])\\/(19|20)\\d{2})$'
    }
  },
  'additionalProperties': false
};

export { schema };