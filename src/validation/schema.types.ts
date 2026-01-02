/**
 * @asString
 * @type string
 * @pattern ^(\d{4}-\d{2}-\d{2}|(0[1-9]|1[0-2])\/(19|20)\d{2})$
 */
type DateString = string;

export interface ProfileDetails {
    /** @type string @minLength 1 @errorMessage { "minLength": "Name cannot be empty" } */
    name: string;
    /** @type string @minLength 1 @errorMessage { "minLength": "Position is required" } */
    position: string;
    /** @type string @format email @errorMessage { "format": "Invalid email format" } */
    email: string;
    /** @type string @minLength 1 @errorMessage { "minLength": "Phone number is required" } */
    phone: string;
    /** @nullable */
    seniority_level?: string;
    /** @nullable */
    location?: string;
    /** @type string @format uri @errorMessage { "format": "LinkedIn must be a valid URL" } @nullable */
    linkedin?: string;
    /** @type string @format uri @errorMessage { "format": "GitHub must be a valid URL" } @nullable */
    github?: string;
    /** @type string @format uri @errorMessage { "format": "Website must be a valid URL" } @nullable */
    website?: string;
}

export interface Experience {
    /** @type string @minLength 1 */
    company: string;
    /** @type string @minLength 1 */
    position: string;
    /** @type string @minLength 1 @nullable */
    location?: string;
    /** @type string */
    start_date: DateString;
    /** * @type string
     * @pattern ^(\d{4}-\d{2}-\d{2}|(0[1-9]|1[0-2])/(19|20)\d{2}|[Pp][Rr][Ee][Ss][Ee][Nn][Tt])$
     * @errorMessage { "pattern": "End date must be in YYYY-MM-DD, MM/YYYY, or 'Present'" } 
     * @nullable
     */
    end_date?: string;
    /** @type string @minLength 1 @nullable */
    description?: string;
    /** @type array @minItems 1 @errorMessage { "minItems": "Please list at least one achievement" } @nullable */
    achievements?: string[];
}

export interface Education {
    /** @type string @minLength 1 */
    institution: string;
    /** @type string @minLength 1 */
    degree: string;
    /** @type string @minLength 1 */
    field_of_study: string;
    /** @type string */
    end_date: DateString;
    /** @type string @minLength 1 @nullable */
    location?: string;
    /** @type string @nullable */
    start_date?: DateString;
    /** @type string @nullable */
    gpa?: string;
    /** @type array @minItems 1 @errorMessage { "minItems": "Please list at least one achievement" } @nullable */
    achievements?: string[];
}

export interface Skills {
    /** @type object @additionalProperties { "type": "array", "items": { "type": "string", "minLength": 1 } } */
    [category: string]: string[];
}

export interface Project {
    /** @type string @minLength 1 */
    name: string;
    /** @type string @minLength 1 */
    description: string;
    /** @type array @minItems 1 */
    technologies: string[];
    /** @type string @format uri @nullable */
    github_url?: string;
    /** @type string @format uri @nullable */
    live_url?: string;
}

export interface Certification {
    /** @type string @minLength 1 */
    name: string;
    /** @type string @minLength 1 */
    issuer: string;
    /** @type string */
    date: DateString;
    /** @type string @nullable */
    expiry_date?: DateString;
}

export type LanguageProficiency = 'Native' | 'Fluent' | 'Intermediate' | 'Basic';

export interface Language {
    /** @type string @errorMessage { "required": "Language name is required" } */
    language: string;
    /** @type string @errorMessage { "required": "Proficiency level is required" } */
    proficiency: LanguageProficiency;
}

export interface CVProfile {
    /** @type string */
    $schema?: string;
    /** @type object @errorMessage { "required": "Profile information is required" } */
    profile: ProfileDetails;
    /** @type string @minLength 1 @errorMessage { "minLength": "Summary is required" } */
    summary: string;
    /** @type array @minItems 1 @errorMessage { "minItems": "Education section is required" } */
    education: Education[];
    /** @type object @errorMessage { "required": "Skills section is required" } */
    skills: Skills;

    /** @type array @nullable */
    experiences?: Experience[];
    /** @type array @nullable */
    projects?: Project[];
    /** @type array @nullable */
    certifications?: Certification[];
    /** @type array @nullable */
    languages?: Language[];
}