export const userDataObject = {
  uid: '',
  firstName: '',
  lastName: '',
  pronouns: '',
  approved: false,
  archived: false,
  role: '',
  bio: '',
  phoneNumber: '',
};

export const jobseekerUserInit = {
  navigator: '',
  lastCompletion: Date(),
  complete: false,
};

export const navigatorUserInit = {
  jobseekers: [],
  bookmarked: [],
};

export const adminUserInit = {
  bookmarked: [],
};

export const jobseekerDataObject = {
  clientInfo: {
    'City/State': '',
    Ethnicity: '',
    Age: '',
    'Gender Identity': '',
    Sexuality: '',
    Veteran: '',
    Disability: '',
    'Housing Situation': '',
    'Currently Employed': '',
    'Prior Convictions': '',
    'Dream Job': '',
  },

  // assessment fields
  education: [],
  occupation: [],
  skillsChecklist: [],
  industryInterest: [],
  generalSkills: [],

  // milestone progress
  milestones: {
    'job fair': 'incomplete',
    coenroll: 'incomplete',
    'training program': 'incomplete',
    assessment: 'incomplete',
    'hiring info': 'incomplete',
    internship: 'incomplete',
    workshop: 'incomplete',
    'job board': 'incomplete',
    'online profile': 'incomplete',
    resources: 'incomplete',
  },

  // milestone data
  onlineProfiles: [],
  trainingPrograms: [],
  internships: [],
  jobFairs: [],
  jobBoards: [],
  resources: [],
  hiredInfo: [],
};

export const skillsChecklistOptions = [
  'Accounting Software',
  'Administrative',
  'Adobe',
  'Software Suite',
  'Bilingual',
  'Brand Management',
  'Cold Calling',
  'Computer Software and Application',
  'CPR',
  'Customer Service',
  'Database Management',
  'Excel',
  'Graphic Design',
  'Machinery Skills',
  'Marketing Campaign Management',
  'Mobile Development',
  'Multiligual',
  'Negotiation',
  'Patient Scheduling Software',
  'Philanthropy',
  'Photo Editing',
  'Photography',
  'Photoshop',
  'Powerpoint',
  'Programming Languages',
  'Project Management',
  'Public Speaking',
  'Search Engine and Keyword Optimization',
  'Statistical Analysis',
  'Type 60+WPM',
  'User Interface Design',
  'Wood Working',
  'Word',
  'Writing ',
  'Money Handling',
  'Customer Service',
  'Inventory Management',
  'ServSafe / Food Safety Certification / Food Handlers Card',
];

export const industryInterestOptions = [
  'Accounting',
  'App Type Jobs',
  'Architecture/Construction',
  'Audio/Video Technology & Communication',
  'Barista',
  'Bartender',
  'Bookkeeping',
  'Business Management and Administration',
  'Call Center',
  'Caregiver',
  'Carpenter',
  'Cashier',
  'Data Entry',
  'Delivery Driver',
  'Education & Training',
  'Engineering',
  'Finance',
  'Fundraising',
  'Graphic Design',
  'Health/Medical',
  'Hospitality',
  'Human Resources',
  'IT (Information Technology)',
  'Janitorial',
  'Legal',
  'Marketing/Sales',
  'Massage Therapy',
  'Non Profit',
  'Personal Assistant',
  'Pharmasist',
  'Philantropy',
  'Photographer',
  'Production',
  'Public Relations',
  'Real Estate',
  'Remote',
  'Retail',
  'Sales',
  'Security',
  'Server/Host',
  'Social Media Management',
  'Web Design',
];

export const generalSkills = [
  'Applied Academic Skills',
  'Critical Thinking Skills',
  'Interpersonal Skills',
  'Personal Qualities',
  'Resource Management',
  'Information Use',
  'Communication Skills',
  'Systems Thinking',
  'Technology Use',
];

export const arrayToObj = (array, options) => options.map(
  (item) => ({ item: array.includes(item) }),
);

export const objToArray = (obj) => Object.keys(obj).filter((key) => obj[key]);
