// Map the schema into ts types 

type DateString = string;

export interface ProfileDetails {
    name: string;
    position: string;
    email: string;
    phone: string;
    seniority_level?: string | null;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
}

export interface Experience {
    company: string;
    position: string;
    location: string;
    start_date: DateString;
    end_date?: DateString | 'Present' | null;
    description: string;
    achievements: string[];
}

export interface Education {
    institution: string;
    degree: string;
    field_of_study: string;
    end_date: DateString;
    gpa?: string;
}

export interface Skills {
    [category: string]: string[];
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
    github_url?: string;
    live_url?: string;
}

export interface Certification {
    name: string;
    issuer: string;
    date: DateString;
    expiry_date?: DateString | null;
}

export type LanguageProficiency = 'Native' | 'Fluent' | 'Intermediate' | 'Basic';

export interface Language {
    language: string;
    proficiency: LanguageProficiency;
}

export interface CVProfile {
    profile: ProfileDetails;
    summary: string;
    education: Education[];
    skills: Skills;

    experiences?: Experience[];
    projects?: Project[];
    certifications?: Certification[];
    languages?: Language[];
}