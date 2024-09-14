"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";
import { z } from "zod";
import { ProductInfo } from "@/store/useStore";
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../ui/multiselect";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

interface Integrations {
  [category: string]: string[];
}

// Define schema for both fields
const productSchema = z.object({
  productName: z
    .string()
    .max(5, "Product name must be 5 characters or less")
    .min(2, "Product name must be at least 2 characters"),
  category: z.array(z.string()).min(1, "Please select at least one category"),
  deployment: z
    .array(z.string())
    .min(1, "Please select at least one deployment option"),
  
  
  focusCountries: z
    .array(z.string())
    .max(5, "You can select up to 5 countries")
    .min(1, "Please select at least one language"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  securityCertificate: z.string().optional().refine(value => {
    if (value === undefined || value.trim() === '') return true; // Skip validation for undefined or empty values
    return wordCount(value, 50); // Ensure this function is correctly defined
  }, {
    message: "Max word limit of 50 words exceeded",
  }),
  websiteUrl: z.string().url("Invalid Website URL").optional().nullable(),
  adoptionPeriod: z.number().min(1, "Adoption period must be at least 1"),
  adoptionPeriodUnit: z.enum(["days", "months", "years"], {
    invalid_type_error: "Please select a valid period unit",
  }),
  logo: z.string().optional(),
  
});
const wordCount = (value: string, maxWords: number): boolean => {
  return value.trim().split(/\s+/).length <= maxWords;
};

const ProductInformation = () => {
  const {
    productName,
    setProductName,
    logoUrl,
    setLogoUrl,
   
    category,
    setCategory,
    deployment,
    setDeployment,
    adoptionPeriod,
    setAdoptionPeriod,
    adoptionPeriodUnit,
    setAdoptionPeriodUnit,
    focusCountries,
    setFocusCountries,
    languages,
    setLanguages,
    securityCertificate,
    setSecurityCertificate,
    setWebsiteUrl,
    websiteUrl
  } = ProductInfo();

  const [inputValue, setInputValue] = useState(productName);
  const [securityValue, setSecurityValue] = useState(securityCertificate || "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [localAdoptionPeriod, setLocalAdoptionPeriod] = useState(adoptionPeriod);
  const [localAdoptionPeriodUnit, setLocalAdoptionPeriodUnit] = useState(adoptionPeriodUnit);

  const languagess = [
    "Arabic",
    "Bulgarian",
    "Chinese",
    "Configurable",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Estonian",
    "Finnish",
    "Flemish",
    "French",
    "German",
    "Greek",
    "Hebrew",
    "Hindi",
    "Hungarian",
    "Icelandic",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Latvian",
    "Lithuanian",
    "Malay",
    "Maltese",
    "Norwegian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Serbian",
    "Spanish",
    "Swedish",
    "Tagalog",
    "Thai",
    "Turkish",
    "Vietnamese",
  ];

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo, Democratic Republic of the",
    "Congo, Republic of the",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City (Holy See)",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  // Validate a single field
  const validateField = (name: string, value: any) => {
    const tempValues = {
      productName: name === "productName" ? value : inputValue,
      category: name === "category" ? value : category,
      deployment: name === "deployment" ? value : deployment,
      adoptionPeriod: name === "adoptionPeriod" ? value : adoptionPeriod,
      adoptionPeriodUnit:
        name === "adoptionPeriodUnit" ? value : adoptionPeriodUnit,
      focusCountries: name === "focusCountries" ? value : focusCountries,
      languages: name === "languages" ? value : languages,
      securityCertificate: name === "securityCertificate"? value : securityValue,
      websiteUrl: websiteUrl || undefined,
    };

    const result = productSchema.safeParse(tempValues);

    if (!result.success) {
      const error = result.error.errors.find((err) => err.path[0] === name);
      return error ? error.message : "";
    }
    return "";
  };
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.trim() === "" ? null : value.trim();
    
    if (name === "websiteUrl") {
      setWebsiteUrl(sanitizedValue);
    }
  };
  
  const validateFieldAdopt = (name: string, value: any) => {
    const tempValues = {
     adoptionPeriod: name === 'adoptionPeriod' ? Number(value) : adoptionPeriod,
      adoptionPeriodUnit: name === 'adoptionPeriodUnit' ? value : adoptionPeriodUnit,
    };

    const result = productSchema.safeParse(tempValues);

    if (!result.success) {
      const error = result.error.errors.find((err) => err.path[0] === name);
      return error ? error.message : "";
    }
    return "";
  }; 

  const handleAdoptionPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateFieldAdopt(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));

    if (!errorMessage) {
      setAdoptionPeriod(Number(value));
    }
  };

  const handleAdoptionPeriodUnitChange = (value: string) => {
    const name = 'adoptionPeriodUnit';
    const errorMessage = validateFieldAdopt(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));

    if (!errorMessage) {
      setAdoptionPeriodUnit(value);
    }
  };

  

  // Function to validate all fields
  const validateAllFields = () => {
    const result = productSchema.safeParse({
      productName: inputValue,
      category,
      deployment,
      adoptionPeriod,
      adoptionPeriodUnit,
      focusCountries,
      languages,
      securityCertificate: securityValue,
      websiteUrl: websiteUrl || undefined,
    });

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
   
    if (name === "securityCertificate") {
      setSecurityValue(value);
      const errorMessage = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    } 
  };

  // Handle change events and update state
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "productName") {
      setInputValue(value);

      // Validate the productName field
      const errorMessage = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));

    }else if (name === "category") {
      let updatedCategories = category;

      if (checked) {
        updatedCategories = [...category, value];
      } else {
        updatedCategories = category.filter((cat: any) => cat !== value);
      }

      setCategory(updatedCategories);

      const errorMessage = validateField(name, updatedCategories);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    } else if (name === "deployment") {
      let updatedDeployment = deployment;

      if (checked) {
        updatedDeployment = [...deployment, value];
      } else {
        updatedDeployment = deployment.filter((dep: any) => dep !== value);
      }

      setDeployment(updatedDeployment);

      const errorMessage = validateField(name, updatedDeployment);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    }
  };

  // Handle adoption period and unit change


  //   const handleAdoptionPeriodUnitChange = (value: string) => {
  //     setAdoptionPeriodUnit(value);
  //     const errorMessage = validateField("adoptionPeriodUnit", value);
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       ["adoptionPeriodUnit"]: errorMessage,
  //     }));
  //   };

  // Handle countries change
  const handleCountriesChange = (selectedCountries: string[]) => {
    setFocusCountries(selectedCountries);
    const errorMessage = validateField("focusCountries", selectedCountries);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ["focusCountries"]: errorMessage,
    }));
  };

  // Handle languages change
  const handleLanguagesChange = (selectedLanguages: string[]) => {
    setLanguages(selectedLanguages);
    const errorMessage = validateField("languages", selectedLanguages);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ["languages"]: errorMessage,
    }));
  };

  // Handle form submission
 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // if (!validateAllFields()) {
    //   console.log("Validation failed");
    //   return; // Stop form submission if there are validation errors
    // }
  
    // Update Zustand store
    

    let hasErrors = false;

  if (!validateAllFields()) {
    console.log("Validation failed");
    hasErrors = true;
  }
  setProductName(inputValue);
  setSecurityCertificate(securityValue);

  // Validate integrations
  try {
    integrationsSchema.parse({ integrations: selectedIntegrations });
  } catch (error) {
    if (error instanceof z.ZodError) {
      setErrors(prevErrors => ({
        ...prevErrors,
        integrations: error.errors[0].message
      }));
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.log("Form has errors. Please correct them before submitting.");
    return; // Stop form submission if there are validation errors
  }


    
    
   
    console.log("Form submitted with:", {
      productName: inputValue,
      category,
      deployment,
      adoptionPeriod,
      adoptionPeriodUnit,
      focusCountries,
      languages,
      securityCertificate: securityValue, // Ensure the correct value is logged
    });
  };
  const { logo, setLogo } = ProductInfo();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Save logo data in Zustand store
      };
      reader.readAsDataURL(file);
    } else {
      // Handle case where file is not selected
      setErrors(prev => ({ ...prev, logo: "Logo is required" }));
    }
  };



  

  const validateForm = () => {
    const result = productSchema.safeParse({ logo });
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(errors);
    }
  };


 
  // integrations   
  // Define the type for integrations object


// Define the integrations object with type
const integrations: Integrations = {
  "Accounting and Finance": [
    "Financial Disclosures",
    "FreshBooks",
    "Jubilee",
    "QuickBooks",
    "TrustBooks",
    "Xero"
  ],
  "Case and Matter Management": [
    "Clio",
    "LawRuler",
    "Litify",
    "MyCase",
    "PracticePanther",
    "Zola Suite"
  ],
  // ... other categories and their options
};

// const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
// const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
// const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);

// // Toggle the entire integrations dropdown
// const toggleDropdown = () => {
//   setIsDropdownOpen(prev => !prev);
// };

// // Toggle individual category dropdown
// const toggleCategory = (category: string) => {
//   setExpandedCategories(prev => ({
//     ...prev,
//     [category]: !prev[category]
//   }));
// };

// // Handle integration selection
// const toggleIntegration = (integration: string) => {
//   setSelectedIntegrations(prev =>
//     prev.includes(integration)
//       ? prev.filter(i => i !== integration)
//       : [...prev, integration]
//   );
// };

const integrationsSchema = z.object({
  integrations: z.array(z.string()).min(1, "At least one category must be selected"),
});

const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);

// Retrieve global state and updater function from Zustand store
const { integrations: globalIntegrations, setIntegrations } = ProductInfo();

useEffect(() => {
  // Initialize local state with global state integrations on load
  setSelectedIntegrations(globalIntegrations);
}, [globalIntegrations]);

const toggleCategory = (category: string) => {
  setExpandedCategories((prev) => ({
    ...prev,
    [category]: !prev[category],
  }));
};

const toggleIntegration = (integration: string) => {
  const updatedIntegrations = selectedIntegrations.includes(integration)
    ? selectedIntegrations.filter((i) => i !== integration)
    : [...selectedIntegrations, integration];

  console.log('Updated Integrations:', updatedIntegrations); // Log updated integrations
  setSelectedIntegrations(updatedIntegrations);

  // Validate and update global state when selection changes
  handleIntegrationChange(updatedIntegrations);
};

const handleIntegrationChange = (updatedIntegrations: string[]) => {
  try {
    integrationsSchema.parse({ integrations: updatedIntegrations });
    setErrors({});
    setIntegrations(updatedIntegrations);
  } catch (error) {
    if (error instanceof z.ZodError) {
      setErrors({ integrations: error.errors[0].message });
    }
  }
};
  



  return (
    <form onSubmit={handleSubmit} className="w-full font-calarity">
      <div className="flex w-100 flex-col">

    

        {/* Product Name */}
        <div className="w-full mt-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            type="text"
            id="productName"
            name="productName"
            value={inputValue}
            onChange={handleChange}
            className="mt-1"
          />
          {errors.productName && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.productName}</p>
            </div>
          )}
        </div>
        {/* logo */}
        {/* <div className="w-full mt-2">
          <Label htmlFor="logo">Logo</Label>
          <Input
            type="file"
            id="logo"
            name="logo"
            className="mt-1"
          />
        </div> */}
        <div className="w-full mt-2">
  <label htmlFor="logo">Logo</label>
  <Input
    type="file"
    id="logo"
    name="logo"
    className="mt-1"
    onChange={handleFileChange}
  />
  {errors.logo && <p className="text-red-500">{errors.logo}</p>}
  {logo && (
    <div className="mt-2">
      <img src={logo} alt="Logo Preview" style={{ maxWidth: '100%' }} />
    </div>
  )}
       </div>

        {/* Category Checkboxes */}
        <div className="mt-2">
          <Label htmlFor="category">Select Category</Label>
          {[
            "Client Relationship Management",
            "Governance, Risk and Compliance",
            "Contract Lifecycle Management",
            "E-Signature",
            "Document Management System",
            "E-billing and Invoicing",
            "E-discovery",
            "Intellectual Property Management",
            "Litigation Management and Analytics",
            "Legal Workflow Automation",
            "Legal Research",
          ].map((cat) => (
            <div key={cat} className="items-top flex space-x-2 mt-2">
              <Input
                name="category"
                type="checkbox"
                value={cat}
                checked={category.includes(cat)}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none">
                  {cat}
                </label>
              </div>
            </div>
          ))}
          {errors.category && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.category}</p>
            </div>
          )}
        </div>
        {/* Deployment Checkboxes */}
        <div className="mt-2">
          <Label htmlFor="deployment">Select Deployment</Label>
          {["SaaS", "On-premise", "Hybrid", "Cloud"].map((dep) => (
            <div key={dep} className="items-top flex space-x-2 mt-2">
              <Input
                name="deployment"
                type="checkbox"
                value={dep}
                checked={deployment.includes(dep)}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none">
                  {dep}
                </label>
              </div>
            </div>
          ))}
          {errors.deployment && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.deployment}</p>
            </div>
          )}
        </div>
        {/* Select Mobile Accessibility */}
        <div className="mt-4">
          <div className=" flex gap-4 items-center">
            <Label htmlFor="mobileAccessibility">
              Select Mobile Accessibility
            </Label>
            <Switch />
          </div>
        </div>

        {/* Adoption Period */}
        <div>
      <Label htmlFor="adoptionPeriod">Adoption Period</Label>
      <div className="flex gap-4">
        <Input
          name="adoptionPeriod"
          type="number"
          placeholder="Adoption period"
          value={adoptionPeriod}
          onChange={handleAdoptionPeriodChange}
        />
        <Select value={adoptionPeriodUnit} onValueChange={handleAdoptionPeriodUnitChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="days">Days</SelectItem>
            <SelectItem value="months">Months</SelectItem>
            <SelectItem value="years">Years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {(errors.adoptionPeriod || errors.adoptionPeriodUnit) && (
        <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
          <XCircle className="w-6 h-6 text-red-500" />
          <p className="text-[#DC3545] pl-2">
            {errors.adoptionPeriod || errors.adoptionPeriodUnit}
          </p>
        </div>
      )}
        </div>
        {/* Language Checkboxes */}
        <div className="mt-2">
          <Label htmlFor="languages">Select Languages</Label>
          <MultiSelector
            values={languages}
            onValuesChange={handleLanguagesChange}
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Select items" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {languagess.map((language) => (
                  <MultiSelectorItem key={language} value={language}>
                    {language}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          {errors.languages && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.languages}</p>
            </div>
          )}
        </div>


        {/* lang  */}

        <div className="w-full mb-4">
          <label htmlFor="websiteUrl">Website</label>
          <div className="flex items-center">
            <Input
              type="url"
              id="websiteUrl"
              name="websiteUrl"
              value={websiteUrl || ""}
              onChange={handleUrlChange}
              placeholder="Website URL"
            />
          </div>
          {errors.websiteUrl && (
            <p className="text-red-500">{errors.websiteUrl}</p>
          )}
        </div>


        {/* Security Certificates */}
        <div className="mt-2">
          <Label className="securityCertificate">Security Certificates</Label>
          <Textarea
        name="securityCertificate"
        placeholder="Mention name of certifications"
        id="securityCertificate"
        value={securityValue}
        onChange={handleAreaChange}
      />
      {errors.securityCertificate && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.securityCertificate}</p>
            </div>
          )}
        </div>


          {/* integrations  */}
      <div className="w-full mt-2">
      <div className="w-full  bg-white  rounded-lg overflow-hidden">
        <button
          onClick={() => toggleCategory('root')}
          className="w-full text-left p-2 bg-transparent text-gray

           border border-gray-300  rounded-lg outline-none placeholder:text-muted-foreground flex-1
          
          "
        >
      {expandedCategories['root'] ? 'Hide Integrations' : 'Select Integrations'}
    </button>

    {expandedCategories['root'] && (
      <div className="p-4">
        {Object.entries(integrations).map(([category, options]) => (
          <div key={category} className="border-b last:border-b-0 rounded">
            <button
              onClick={() => toggleCategory(category)}
              className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-100 rounded-[8px] transition-colors duration-150"
            >
              <span className="font-semibold">{category}</span>
              {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expandedCategories[category] && (
              <div className="pl-8 pr-4 pb-4">
                {options.map((option) => (
                  <label key={option} className="flex items-center space-x-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedIntegrations.includes(option)}
                      onChange={() => toggleIntegration(option)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="p-4 bg-gray-100 rounded-[8px]">
          <h3 className="font-semibold mb-2">Selected Integrations:</h3>
          <ul className="list-disc pl-5">
            {selectedIntegrations.map((integration) => (
              <li key={integration}>{integration}</li>
            ))}
          </ul>
        </div>
      </div>
    )}
{/* 
    {errors.integrations && (
      <p className="text-red-500 text-sm mt-2">{errors.integrations}</p>
    )} */}
      </div>
        {errors.integrations && (
            <p className="text-red-500 text-sm mt-2">{errors.integrations}</p>
          )}
</div>

        {/* Focus Countries */}
        <div className="mt-2">
        
          <Label htmlFor="focusCountries">Select Countries (Max 5)</Label>
          <MultiSelector
            values={focusCountries}
            onValuesChange={handleCountriesChange}
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Select countries" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {countries.map((country) => (
                  <MultiSelectorItem
                    key={country}
                    value={country}
                    disabled={
                      focusCountries.length >= 5 &&
                      !focusCountries.includes(country)
                    }
                  >
                    {country}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          {errors.focusCountries && (
            <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-[#DC3545] pl-2">{errors.focusCountries}</p>
            </div>
          )}
        </div>
        
        <Button type="submit"  >Submit</Button>
       
      </div>
    </form>
  );
};

export default ProductInformation;
