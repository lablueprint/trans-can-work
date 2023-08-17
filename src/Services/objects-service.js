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

export const internshipsOptions = [
  {
    company: '',
    program: 'Innovation Internship',
    position: '',
    start: 'date',
    end: 'date',
    referralDate: 'date',
    applied: false,
    accepted: false,
    completed: false,
    notes: '',
  },
  {
    company: '',
    program: 'Emerging Leaders Internship',
    position: '',
    start: 'date',
    end: 'date',
    referralDate: 'date',
    applied: false,
    accepted: false,
    completed: false,
    notes: '',
  },
  {
    company: '',
    program: 'Marketing and Communications Internship',
    position: '',
    start: 'date',
    end: 'date',
    referralDate: 'date',
    applied: false,
    accepted: false,
    completed: false,
    notes: '',
  },
  {
    company: '',
    program: 'Social Media Management Internship',
    position: '',
    start: 'date',
    end: 'date',
    referralDate: 'date',
    applied: true,
    accepted: false,
    completed: false,
    notes: '',
  },
  {
    company: '',
    program: 'Data Science Internship',
    position: '',
    start: 'date',
    end: 'date',
    referralDate: 'date',
    applied: false,
    accepted: false,
    completed: false,
    notes: '',
  },
  {
    company: '',
    program: 'Sustainability and Environment Studies Internship',
    position: '',
    start: 'date',
    end: 'date',
    referralDate: 'date',
    applied: false,
    accepted: false,
    completed: false,
    notes: '',
  },
];

export const trainingOptions = [
  {
    program: 'Digital Marketing Bootcamp',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: true,
    notes: '',
  },
  {
    program: 'Project Management Fundamentals',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: true,
    notes: '',
  },
  {
    program: 'Accounting Principles for Beginners',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
  {
    program: 'Sales Technique Training',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
  {
    program: 'Content Creation Workshop',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
  {
    program: 'Human Resources Management',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
  {
    program: 'Social Media Management 101',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
  {
    program: 'Graphic Design Basics',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
  {
    program: 'Web Development Essentials',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
  {
    program: 'Data Analytics Master',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: true,
    notes: '',
  },
  {
    program: 'Customer Service Excellence',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
  {
    program: 'Business Writing for Success',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
  {
    program: 'Cybersecurity Essentials',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: true,
    notes: '',
  },
  {
    program: 'Public Speaking for Professionals',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: true,
    notes: '',
  },
  {
    program: 'Leadership Skills for Managers',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: false,
    notes: '',
  },
];

export const workshopOptions = [
  {
    name: 'Empowered for Empower!',
    date: '',
    attended: true,
    notes: '',
  },
  {
    name: 'Glassdoor Workshop',
    date: '',
    attended: false,
    notes: '',
  },
  {
    name: 'Q&A',
    date: '',
    attended: false,
    notes: '',
  },
  {
    name: 'Transiton Workshops',
    date: '',
    attended: true,
    notes: 'Vocal training, Legal process, Gender marker, Name change',
  },
  {
    name: 'Legal Workshops',
    date: '',
    attended: false,
    notes: '',
  },
  {
    name: 'Mental Health',
    date: '',
    attended: false,
    notes: '',
  },
];

export const jobFairOptions = [
  {
    name: 'CareerCon',
    date: '',
    attended: true,
    notes: '',
  },
  {
    name: 'FutureWorks',
    date: '',
    attended: true,
    notes: '',
  },
  {
    name: 'Career Fusion',
    date: '',
    attended: false,
    notes: '',
  },
  {
    name: 'Jobapalooza',
    date: '',
    attended: false,
    notes: '',
  },
  {
    name: 'JobQuest',
    date: '',
    attended: false,
    notes: '',
  },
  {
    name: 'HireMeNow',
    date: '',
    attended: false,
    notes: '',
  },
  {
    name: 'Opportunity Expo',
    date: '',
    attended: false,
    notes: '',
  },
  {
    name: 'CareerLaunch',
    date: '',
    attended: true,
    notes: '',
  },
];

export const hiringInfo = [
  {
    company: 'UCLA',
    hiredDate: '4/26/2023',
    fieldOfWork: 'Mascotting',
    jobTitle: 'Official School Mascot',
    supervisorName: 'Gene Block',
    referralDate: '1/1/90',
    contactEmail: 'geneblock@ucla.edu',
    contactPhoneNumber: '123 456 7890',
    hourlyPay: '$50',
    hoursPerWeek: '40',
    benefits: 'Yes',
    notes: '',
  },
];

export const arrayToObj = (array, options) => options.map(
  (item) => ({ item: array.includes(item) }),
);

export const objToArray = (obj) => Object.keys(obj).filter((key) => obj[key]);
