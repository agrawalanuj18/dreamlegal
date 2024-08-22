"use client";
import { createContext, useState, useContext, ReactNode } from "react";

// Define the interface for the form values
export interface FormValues {
  id: string;
  userId: string;
  prname: string;
  logo: File | null;
  logoUrl: string;
  category: string[];
  deployment: string[];
  mobileAccessibility: string;
  adoptionPeriod: string;
  adoptionPeriodUnit: string;
  languages: string[];
  securityCertificate: string;
  integrations: string[];
  focusCountries: string[];
  description: string;
  usp: string;
  upcomingUpdates: string;
  userCategory: string[];
  userCategoryPercentage: number[];
  industry: string[];
  industryPercentage: number[];
  practiceAreas: string[];
  practiceAreasPercentage: number[];
  teamSize: string[];
  teamSizePercentage: number[];
  processLifecycle: { category: string; subcategories: string[] }[];
  clientManagementSoftware: string[];
  ComplianceandRiskSoftware: string[];
  contractManageSoftware: string[];
  DigitalSignature: string[];
  DocumnetManagement: string[];
  Ebilling: string[];
  Ediscovery: string[];
  IPManagement: string[];
  LitigationManagement: string[];
  legalWorkflow: string[];
  features: { category: string; subcategories: string[] }[];
  freeTrial: string;
  timePeriod: string;
  timePeriodUnit: string;
  freeVersion: string;
  pricingModel: string;
  contractPeriod: string;
  nameofPlan: string[];
  validity: string[];
  price: string[];
  pricingParams: string[];
  Demo: string[];
  DemoNote: string;
  support: string[];
  supportNote: string;
  training: string[];
  trainingNote: string;
  storage: string[];
  storageUnit: string;
  storageNote: string;
  fileSize: string[];
  fileSizeUnit: string;
  fileSizeNote: string;
  maintenance: "";
  maintenanceNote: string;
  reqForChange: "";
  reqForChangeNote: string;
  trainingReq: "";
  trainingReqNote: string;
  dataMigration: "";
  dataMigrationNote: string;
  Images: File[];
  ImageUrl: string[];
  videoUrl: string[];
  attachments: File[];
  attachmentUrl: string[];
  youtubeUrl: string[];
  linkedinUrl: string[];
  twitterUrl: string[];
  instagramUrl: string[];
  // features state
  InternalCollaboration: string[];
  ExternalCollaboration: string[];
  AnalyticsAndReporting: string[];
  ToolAdministrationAndControl: string[];
  IntakeAndLeadManagement: string[];
  ClientPortal: string[];
  DocumentManagement: string[];
  CaseAlerts: string[];
  BudgetExpenseAndTimeTracking: string[];
  ClientBillingAndInvoicing: string[];
  PolicyManagement: string[];
  IssueManagement: string[];
  LawsComplianceAndRegulatoryTracking: string[];
  ContractCreationAndAuthoring: string[];
  ContractRepository: string[];
  ContractNegotiation: string[];
  LifecycleManagement: string[];
  DocumentCreationAndTemplates: string[];
  ClauseLibrary: string[];
  FieldsCreation: string[];
  TrackingAndValidity: string[];
  DocumentManagementAndTemplates: string[];
  DocumentCapturing: string[];
  DocumentSearchAndNavigation: string[];
  Authentication: string[];
  TaskAllotment: string[];
  BudgetingExpenseAndTimeTracking: string[];
  ClientManagement: string[];
  InvoiceGenerationAndReview: string[];
  DataIdentificationAndCollection: string[];
  SearchProcessingAndAnalysis: string[];
  ReviewAndProduction: string[];
  LegalHoldManagement: string[];
  IdeationAndCreation: string[];
  LifecycleManagementIP: string[];
  SearchAndDiscovery: string[];
  StorageAndRepository: string[];
  MatterLifecycleTracking: string[];
  CourtAndCaseSearch: string[];
  LitigationDocketingFeatures: string[];
  WorkflowDesignAndConfiguration: string[];
  AssignmentAllotmentAndTracking: string[];
  DocumentCreationAndManagement: string[];
  LawsComplianceAndRegulatoryTrackingIP: string[];
  CaseLawResearch: string[];
  StatutoryResearch: string[];
  AdvancedSearchCapabilities: string[];
  FilterAndSorting: string[];
  // Extra
  fixedPricing: string;
  nameofPlan1: string;
  nameofPlan2: string;
  nameofPlan3: string;
  validity1: string;
  validity2: string;
  validity3: string;
  price1: string;
  price2: string;
  price3: string;
  contractUnit: string;

}

// Define the initial values for the form
const initialFormValues: FormValues = {
  id: "",
  userId: "",
  prname: "",
  logo: null,
  logoUrl: "",
  category: [],
  deployment: [],
  mobileAccessibility: "",
  adoptionPeriod: "",
  adoptionPeriodUnit: "",
  languages: [],
  focusCountries: [],
  securityCertificate: "",
  integrations: [],
  description: "",
  usp: "",
  upcomingUpdates: "",
  userCategory: [],
  userCategoryPercentage: [],
  industry: [],
  industryPercentage: [],
  practiceAreas: [],
  practiceAreasPercentage: [],
  teamSize: [],
  teamSizePercentage: [],
  processLifecycle: [],
  clientManagementSoftware: [],
  ComplianceandRiskSoftware: [],
  contractManageSoftware: [],
  DigitalSignature: [],
  DocumnetManagement: [],
  Ebilling: [],
  Ediscovery: [],
  IPManagement: [],
  LitigationManagement: [],
  DocumentCreationAndTemplates: [],
  legalWorkflow: [],
  
  features: [],
  freeTrial: "",
  timePeriod: "",
  timePeriodUnit: "",
  freeVersion: "",
  pricingModel: "",
  contractPeriod: "",
  nameofPlan: [""],
  nameofPlan1: "",
  nameofPlan2: "",
  nameofPlan3: "",
  validity1: "",
  validity2: "",
  validity3: "",
  price1: "",
  price2: "",
  price3: "",
  validity: [""],
  price: [""],
  pricingParams: [],
  Demo: [],
  DemoNote: "",
  support: [],
  supportNote: "",
  training: [],
  trainingNote: "",
  storage: [],
  storageNote: "",
  storageUnit: "",
  fileSizeUnit: "",
  fileSize: [],
  fileSizeNote: "",
  maintenance: "",
  maintenanceNote: "",
  reqForChange: "",
  reqForChangeNote: "",
  trainingReq: "",
  trainingReqNote: "",
  dataMigration: "",
  dataMigrationNote: "",
  Images: [],
  ImageUrl: [],
  videoUrl: [],
  attachments: [],
  attachmentUrl: [],
  youtubeUrl: [],
  linkedinUrl: [],
  twitterUrl: [],
  instagramUrl: [],
  // Features
  InternalCollaboration: [],
  ExternalCollaboration: [],
  AnalyticsAndReporting: [],
  ToolAdministrationAndControl: [],
  IntakeAndLeadManagement: [],
  ClientPortal: [],
  DocumentManagement: [],
  CaseAlerts: [],
  BudgetExpenseAndTimeTracking: [],
  ClientBillingAndInvoicing: [],
  CaseLawResearch: [],
  StatutoryResearch: [],
  AdvancedSearchCapabilities: [],
  FilterAndSorting: [],
  PolicyManagement: [],
  IssueManagement: [],
  LawsComplianceAndRegulatoryTracking: [],
  ContractCreationAndAuthoring: [],
  ContractRepository: [],
  ContractNegotiation: [],
  LifecycleManagement: [],
  ClauseLibrary: [],
  FieldsCreation: [],
  TrackingAndValidity: [],
  DocumentManagementAndTemplates: [],
  DocumentCapturing: [],
  DocumentSearchAndNavigation: [],
  Authentication: [],
  TaskAllotment: [],
  BudgetingExpenseAndTimeTracking: [],
  ClientManagement: [],
  InvoiceGenerationAndReview: [],
  DataIdentificationAndCollection: [],
  SearchProcessingAndAnalysis: [],
  ReviewAndProduction: [],
  contractUnit: "",
  LegalHoldManagement: [],
  IdeationAndCreation: [],
  LifecycleManagementIP: [],
  SearchAndDiscovery: [],
  StorageAndRepository: [],
  MatterLifecycleTracking: [],
  CourtAndCaseSearch: [],
  LitigationDocketingFeatures: [],
  WorkflowDesignAndConfiguration: [],
  AssignmentAllotmentAndTracking: [],
  DocumentCreationAndManagement: [],
  LawsComplianceAndRegulatoryTrackingIP: [],
  fixedPricing: "",
};

// Create the context
const FormContext = createContext<{
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}>({
  formValues: initialFormValues,
  setFormValues: () => {},
});

// Create the provider component
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    id: "",
    userId: "",
    prname: "",
    logo: null,
    logoUrl: "",
    category: [],
    deployment: [],
    mobileAccessibility: "",
    adoptionPeriod: "",
    adoptionPeriodUnit: "",
    languages: [],
    focusCountries: [],
    securityCertificate: "",
    integrations: [],
    description: "",
    usp: "",
    upcomingUpdates: "",
    userCategory: [],
    userCategoryPercentage: [],
    industry: [],
    industryPercentage: [],
    practiceAreas: [],
    practiceAreasPercentage: [],
    teamSize: [],
    teamSizePercentage: [],
    processLifecycle: [],
    clientManagementSoftware: [],
    ComplianceandRiskSoftware: [],
    contractManageSoftware: [],
    DigitalSignature: [],
    DocumnetManagement: [],
    Ebilling: [],
    Ediscovery: [],
    CaseLawResearch: [],
    StatutoryResearch: [],
    AdvancedSearchCapabilities: [],
    FilterAndSorting: [],
    IPManagement: [],
    LitigationManagement: [],
    DocumentCreationAndTemplates: [],
    legalWorkflow: [],
    features: [],
    freeTrial: "",
    timePeriod: "",
    timePeriodUnit: "",
    freeVersion: "",
    pricingModel: "",
    contractPeriod: "",
    contractUnit: "",
    nameofPlan: [""],
    nameofPlan1: "",
    nameofPlan2: "",
    nameofPlan3: "",
    validity1: "",
    validity2: "",
    validity3: "",
    price1: "",
    price2: "",
    price3: "",
    validity: [""],
    price: [""],
    pricingParams: [],
    Demo: [],
    DemoNote: "",
    support: [],
    supportNote: "",
    training: [],
    trainingNote: "",
    storage: [],
    storageNote: "",
    storageUnit: "",
    fileSizeUnit: "",
    fileSize: [],
    fileSizeNote: "",
    maintenance: "",
    maintenanceNote: "",
    reqForChange: "",
    reqForChangeNote: "",
    trainingReq: "",
    trainingReqNote: "",
    dataMigration: "",
    dataMigrationNote: "",
    Images: [],
    videoUrl: [],
    attachments: [],
    youtubeUrl: [],
    linkedinUrl: [],
    twitterUrl: [],
    instagramUrl: [],

    // Features
    InternalCollaboration: [],
    ExternalCollaboration: [],
    AnalyticsAndReporting: [],
    ToolAdministrationAndControl: [],
    IntakeAndLeadManagement: [],
    ClientPortal: [],
    DocumentManagement: [],
    CaseAlerts: [],
    BudgetExpenseAndTimeTracking: [],
    ClientBillingAndInvoicing: [],
    PolicyManagement: [],
    IssueManagement: [],
    LawsComplianceAndRegulatoryTracking: [],
    ContractCreationAndAuthoring: [],
    ContractRepository: [],
    ContractNegotiation: [],
    LifecycleManagement: [],
    ClauseLibrary: [],
    FieldsCreation: [],
    TrackingAndValidity: [],
    DocumentManagementAndTemplates: [],
    DocumentCapturing: [],
    DocumentSearchAndNavigation: [],
    Authentication: [],
    TaskAllotment: [],
    BudgetingExpenseAndTimeTracking: [],
    ClientManagement: [],
    InvoiceGenerationAndReview: [],
    DataIdentificationAndCollection: [],
    SearchProcessingAndAnalysis: [],
    ReviewAndProduction: [],
    LegalHoldManagement: [],
    IdeationAndCreation: [],
    LifecycleManagementIP: [],
    SearchAndDiscovery: [],
    StorageAndRepository: [],
    MatterLifecycleTracking: [],
    CourtAndCaseSearch: [],
    LitigationDocketingFeatures: [],
    WorkflowDesignAndConfiguration: [],
    AssignmentAllotmentAndTracking: [],
    DocumentCreationAndManagement: [],
    LawsComplianceAndRegulatoryTrackingIP: [],
    fixedPricing: "",
    ImageUrl: [],
    attachmentUrl: [],
  });

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
};

// Create a custom hook to use the FormContext
export const useFormContext = () => useContext(FormContext);
