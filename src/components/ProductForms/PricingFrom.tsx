"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";
import { z } from "zod";
import { ProductInfo } from "@/store/useStore";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback } from "react";

interface PricingField {
  id: number;
  name: string;
  validity: string;
  price: string;
}

const PricingSchema = z.object({
  freeTrial:z.enum(["Yes", "No"], {
    required_error: "Choose this please", // Error when the field is not provided
    invalid_type_error: "Choose this please", // Error when the value is null or any other type
  }),
  freeVersion: z.enum(["Yes", "No"], {
    required_error: "Choose this please", // Error when the field is not provided
    invalid_type_error: "Choose this please", // Error when the value is null or any other type
  }),
  timePeriod:z
  .union([z.string(), z.null()])
  .refine(value => value !== null && value.trim() !== "", {
    message: "Time Period Period value is required",
  }),
  pricingModel: z
    .array(z.enum(["Annual Fee", "Monthly subscription", "Volume based"]))
    .min(1, "At least one pricing model is required"),
  contractPeriod:z
  .union([z.string(), z.null()])
  .refine(value => value !== null && value.trim() !== "", {
    message: "Min Contract Period value is required",
  }),
  fixedPricing: z.boolean(),
  pricingParams: z.string().optional(),
  pricingFields: z.array(
    z.object({
      name: z.string().nonempty("Name of plan is required"),
      validity: z.string().nonempty("Validity is required"),
      price: z.string().nonempty("Price is required"),
    })
  ).optional(),
}).refine(data => {
  if (data.fixedPricing) {
    return data.pricingFields && data.pricingFields.length > 0;
  } else {
    return !!data.pricingParams;
  }
}, {
  message: "Either custom parameters or fixed pricing fields are required",
  path: ["pricingParams"],
});


const units = ["Days","Months",  "Years"];

const PricingForm = () => {
  const { freeTrial, setFreeTrial } = ProductInfo();
  const { freeVersion, setFreeVersion } = ProductInfo(); // Added
  const { timePeriod, setTimePeriod } = ProductInfo();
  const { pricingModel, setPricingModel } = ProductInfo();
  const { contractPeriod, setContractPeriod } = ProductInfo();
  const { pricingParams, setPricingParams } = ProductInfo();
  const {nameofPlan , setNameofPlan } = ProductInfo();
  const {validity, setValidity } = ProductInfo();
  const { price , setPrice } = ProductInfo();
  const {fixPricing ,setFixPricing} = ProductInfo();

  const [selectedFreeTrial, setSelectedFreeTrial] = useState(freeTrial || null);
  const [selectedFreeVersion, setSelectedFreeVersion] = useState(
    freeVersion || null
  ); // Added
  const [inputTimePeriod, setInputTimePeriod] = useState(
    timePeriod?.split(" ")[0] || ""
  );
  const [selectedTimePeriodUnit, setSelectedTimePeriodUnit] = useState(
    timePeriod?.split(" ")[1] || units[0]
  );
  const [selectedPricingModel, setSelectedPricingModel] =
    useState(pricingModel);
  const [inputContractPeriod, setInputContractPeriod] = useState(
    contractPeriod?.split(" ")[0] || ""
  );
  const [selectedContractPeriodUnit, setSelectedContractPeriodUnit] = useState(
    contractPeriod?.split(" ")[1] || units[0]
  );
  const [inputPricingParams, setInputPricingParams] = useState(
    pricingParams || ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFreeTrialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedFreeTrial(value);
    setFreeTrial(value);
  };

  const handleFreeVersionChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Added
    const value = e.target.value;
    setSelectedFreeVersion(value);
    setFreeVersion(value);
  };

  const handleTimePeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTimePeriod(e.target.value);
  };

  const handleTimePeriodUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimePeriodUnit(e.target.value);
  };

  const handleAddTimePeriod = () => {
    setTimePeriod(
      inputTimePeriod ? `${inputTimePeriod} ${selectedTimePeriodUnit}` : null
    );
  };

  const handlePricingModelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedPricingModel((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleContractPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputContractPeriod(e.target.value);
  };

  const handleContractPeriodUnitChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedContractPeriodUnit(e.target.value);
  };

  const handleAddContractPeriod = () => {
    setContractPeriod(
      inputContractPeriod
        ? `${inputContractPeriod} ${selectedContractPeriodUnit}`
        : null
    );
  };

  const handlePricingParamsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputPricingParams(e.target.value);
  };


  


  const [fixedPricing, setFixedPricing] = useState(fixPricing);
  // const [pricingFields, setPricingFields] = useState<PricingField[]>([]);
  const [localPricingFields, setLocalPricingFields] = useState<PricingField[]>([]);



  useEffect(() => {
    // Determine if pricing is fixed based on `price`
    const isFixedPricing = price !== undefined && price.length > 0;

    // Only update fixPricing if it has changed
    if (isFixedPricing !== fixPricing) {
      setFixPricing(isFixedPricing);
    }

    if (isFixedPricing) {
      // If fixed pricing, prepare local pricing fields
      setInputPricingParams('');
      const maxLength = Math.max(nameofPlan.length, validity.length, price.length);
      const fields = Array.from({ length: maxLength }, (_, i) => ({
        id: i,
        name: nameofPlan[i] || "",
        validity: validity[i] || "",
        price: price[i] || "",
      }));
      setLocalPricingFields(fields);
    } else {
      // If not fixed pricing, clear local pricing fields
      setLocalPricingFields([]);
    }
  }, [nameofPlan, validity, price, fixPricing]);

  const handleRemovePricing = (id: number) => {
    setLocalPricingFields(prevFields => {
      const updatedFields = prevFields.filter(field => field.id !== id);
      updateGlobalPricingFields(updatedFields);
      return updatedFields;
    });
  };
 
  const handleAddPricing = () => {
    const newField = { id: Date.now(), name: "", validity: "", price: "" };
    setLocalPricingFields(prevFields => {
      const updatedFields = [...prevFields, newField];
      updateGlobalPricingFields(updatedFields);
      return updatedFields;
    });
  };

  const handlePricingChange = (id: number, field: keyof PricingField, value: string) => {
    setLocalPricingFields(prevFields => {
      const updatedFields = prevFields.map(pricing =>
        pricing.id === id ? { ...pricing, [field]: value } : pricing
      );
      updateGlobalPricingFields(updatedFields);
      return updatedFields;
    });
  };

  const updateGlobalPricingFields = useCallback((fields) => {
    const updatedNameofPlan = fields.map(field => field.name);
    const updatedValidity = fields.map(field => field.validity);
    const updatedPrice = fields.map(field => field.price);
    
    // Only update if there are actual changes
    if (
      JSON.stringify(updatedNameofPlan) !== JSON.stringify(nameofPlan) ||
      JSON.stringify(updatedValidity) !== JSON.stringify(validity) ||
      JSON.stringify(updatedPrice) !== JSON.stringify(price)
    ) {
      setNameofPlan(updatedNameofPlan);
      setValidity(updatedValidity);
      setPrice(updatedPrice);
    }
  }, [nameofPlan, validity, price, setNameofPlan, setValidity, setPrice]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      freeTrial: selectedFreeTrial,
      freeVersion: selectedFreeVersion,
      timePeriod: timePeriod,
      pricingModel: selectedPricingModel,
      contractPeriod: contractPeriod,
      fixedPricing: fixPricing,
      pricingParams: fixPricing ? undefined : inputPricingParams,
      pricingFields: fixPricing ? localPricingFields : undefined,
    };

    const result = PricingSchema.safeParse(formData);

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path.join('.')] = error.message;
      });
      setErrors(validationErrors);
      console.log("Validation errors:", validationErrors);
      return;
    }
    setPricingModel(selectedPricingModel);
    setPricingParams(inputPricingParams.toString());
    setFixPricing(fixPricing);

    setErrors({});
    console.log("Form submitted with:", result.data);
  };
  
 

  return (
    <form onSubmit={handleSubmit} className="w-full font-calarity max-w-4xl mx-auto mt-4">
      {/* <div className="flex w-100 flex-col">
        <div className="w-full mt-2">
          <Label>Free Trial</Label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="freeTrial"
                value="Yes"
                checked={selectedFreeTrial === "Yes"}
                onChange={handleFreeTrialChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="freeTrial"
                value="No"
                checked={selectedFreeTrial === "No"}
                onChange={handleFreeTrialChange}
              />
              No
            </label>
          </div>
          {errors.freeTrial && (
            <p className="text-red-500">{errors.freeTrial}</p>
          )}
        </div>

        <div className="w-full mt-2">
          <Label>Time Period</Label>
          <div className="flex items-center">
            <input
              type="number"
              value={inputTimePeriod}
              onChange={handleTimePeriodChange}
              className="border border-gray-300 rounded-l-lg px-3 py-2 w-24"
              placeholder="Enter value"
            />
            <select
              value={selectedTimePeriodUnit}
              onChange={handleTimePeriodUnitChange}
              className="border border-gray-300 rounded-r-lg px-3 py-2"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddTimePeriod}
              className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {errors.timePeriod && (
            <p className="text-red-500">{errors.timePeriod}</p>
          )}
        </div>


        <div className="w-full mt-2">
          <Label>Free Version</Label> 
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="freeVersion"
                value="Yes"
                checked={selectedFreeVersion === "Yes"}
                onChange={handleFreeVersionChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="freeVersion"
                value="No"
                checked={selectedFreeVersion === "No"}
                onChange={handleFreeVersionChange}
              />
              No
            </label>
          </div>
          {errors.freeVersion && (
            <p className="text-red-500">{errors.freeVersion}</p>
          )}
        </div>

     
        <div className="w-full mt-2">
          <Label>Pricing Model</Label>
          <div className="flex flex-col">
            {["Annual Fee", "Monthly subscription", "Volume based"].map(
              (model) => (
                <label key={model} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    value={model}
                    checked={selectedPricingModel.includes(model)}
                    onChange={handlePricingModelChange}
                  />
                  <span className="ml-2">{model}</span>
                </label>
              )
            )}
          </div>
          {errors.pricingModel && (
            <p className="text-red-500">{errors.pricingModel}</p>
          )}
        </div>

        
    
        <div>
        <div className="flex items-center gap-2">
          <Label>Fixed Pricing</Label>
          <Switch checked={fixedPricing} onCheckedChange={setFixedPricing} />
        </div>
        {fixedPricing ? (
          <div className="pt-2">
            {localPricingFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 border rounded">
                <h3 className="text-lg font-semibold mb-2">
                  Pricing {index + 1}
                </h3>
                <div className="grid gap-4">
                  <Input
                    placeholder="Name of plan"
                    value={field.name}
                    onChange={(e) =>
                      handlePricingChange(field.id, "name", e.target.value)
                    }
                  />
                 

        <select
          value={field.validity}
          onChange={(e) =>
            handlePricingChange(field.id, "validity", e.target.value)
          }
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Select Validity</option>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

                  <Input
                    placeholder="Price"
                    value={field.price}
                    onChange={(e) =>
                      handlePricingChange(field.id, "price", e.target.value)
                    }
                  />
                  {localPricingFields.length > 1 && (
                    <Button
                      variant="destructive"
                      onClick={() => handleRemovePricing(field.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button onClick={handleAddPricing} className="w-full">
              Add New
            </Button>
          </div>
        ) : (
          <div className="w-full mt-2">
            <Label>Custom Parameters</Label>
            <Textarea
              value={inputPricingParams}
              onChange={handlePricingParamsChange}
            />
            {errors.pricingParams && (
              <p className="text-red-500">{errors.pricingParams}</p>
            )}
          </div>
        )}
      </div>

        <div className="w-full mt-2">
          <Label>Minimum Contract Period</Label>
          <div className="flex items-center">
            <input
              type="number"
              value={inputContractPeriod}
              onChange={handleContractPeriodChange}
              className="border border-gray-300 rounded-l-lg px-3 py-2 w-24"
              placeholder="Enter value"
            />
            <select
              value={selectedContractPeriodUnit}
              onChange={handleContractPeriodUnitChange}
              className="border border-gray-300 rounded-r-lg px-3 py-2"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddContractPeriod}
              className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {errors.contractPeriod && (
            <p className="text-red-500">{errors.contractPeriod}</p>
          )}
        </div>

      

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 mt-4"
      >
        Submit
      </button>
      </div> */}

      <div className="p-6  bg-white rounded-lg shadow-md">
     
        {/* Free Trial */}
        <div className="space-y-2 mt-4">
          <Label className="text-lg font-semibold">Free Trial</Label>
          <div className="flex space-x-4">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="freeTrial"
                  value={option}
                  checked={selectedFreeTrial === option}
                  onChange={handleFreeTrialChange}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.freeTrial &&  
              <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#DC3545] pl-2">{errors.freeTrial}</p>
              </div>
            }
         
        </div>

        {/* Time Period */}
        <div className="space-y-2  mt-4">
          <Label className="text-lg font-semibold">Time Period</Label>
          <div className="flex flex-wrap items-center space-x-2">
            <Input
              type="number"
              value={inputTimePeriod}
              onChange={handleTimePeriodChange}
              className="w-24 rounded-lg"
              placeholder="Value"
            />
            <select
              value={selectedTimePeriodUnit}
              onChange={handleTimePeriodUnitChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <Button 
              type="button"
              onClick={handleAddTimePeriod}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add
            </Button>
          </div>
          <div className="text-gray-700 mt-2">{timePeriod}</div>
         
          {errors.timePeriod &&  
              <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#DC3545] pl-2">{errors.timePeriod}</p>
              </div>
            }
         
        </div>

        {/* Free Version */}
        <div className="space-y-2 mt-4">
          <Label className="text-lg font-semibold">Free Version</Label>
          <div className="flex space-x-4">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="freeVersion"
                  value={option}
                  checked={selectedFreeVersion === option}
                  onChange={handleFreeVersionChange}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
         
          {errors.freeVersion &&  
              <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#DC3545] pl-2">{errors.freeVersion}</p>
              </div>
            }
         
        </div>

        {/* Pricing Model */}
        <div className="space-y-2  mt-4">
          <Label className="text-lg font-semibold">Pricing Model</Label>
          <div className="space-y-2">
            {["Annual Fee", "Monthly subscription", "Volume based"].map((model) => (
              <label key={model} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={model}
                  checked={selectedPricingModel.includes(model)}
                  onChange={handlePricingModelChange}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>{model}</span>
              </label>
            ))}
          </div>
        
          {errors.pricingModel &&  
              <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#DC3545] pl-2">{errors.pricingModel}</p>
              </div>
            }
        </div>

        {/* Fixed Pricing */}
        <div className="container mx-auto p-6">
  <h2 className="text-2xl font-bold mb-4">Pricing Plans</h2>
  {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(Math.max(nameofPlan.length, validity.length, price.length))].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2">
          {nameofPlan[index] || 'Plan ' + (index + 1)}
        </h3>
        <p className="text-3xl font-bold mb-4">
          ${price[index] || 'N/A'}
        </p>
        <p className="text-gray-600 mb-4">
          Validity: {validity[index] || 'N/A'}
        </p>
        
      </div>
    ))}
  </div> */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {[...Array(Math.max(
    (nameofPlan || []).length, 
    (validity || []).length, 
    (price || []).length
  ))].map((_, index) => (
    <div key={index} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">
        {(nameofPlan || [])[index] || 'Plan ' + (index + 1)}
      </h3>
      <p>{(validity || [])[index] || 'Validity Info'}</p>
      <p>{(price || [])[index] || 'Price Info'}</p>
    </div>
  ))}
</div>

</div>

        <div className="space-y-4  mt-4">
          <div className="flex items-center space-x-2">
            <Label className="text-lg font-semibold">Fixed Pricing</Label>
            <Switch checked={fixedPricing} onCheckedChange={setFixedPricing} />
          </div>
          {fixedPricing ? (
            <div className="space-y-4">
              {localPricingFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold">Pricing {index + 1}</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      placeholder="Name of plan"
                      value={field.name}
                      onChange={(e) => handlePricingChange(field.id, "name", e.target.value)}
                    />
                    {/* <select
                      value={field.validity}
                      onChange={(e) => handlePricingChange(field.id, "validity", e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="">Select Validity</option>
                      {units.map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select> */}
                    <Input   value={field.validity}
                      onChange={(e) => handlePricingChange(field.id, "validity", e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2"
                      
                      />
                    
                    <Input
                      placeholder="Price"
                      value={field.price}
                      onChange={(e) => handlePricingChange(field.id, "price", e.target.value)}
                    />
                    {localPricingFields.length > 1 && (
                      <Button
                        variant="destructive"
                        onClick={() => handleRemovePricing(field.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button onClick={handleAddPricing} className="w-full">Add New</Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Custom Parameters</Label>
              <Textarea
                value={inputPricingParams}
                onChange={handlePricingParamsChange}
                className="w-full"
              />
             
              {errors.pricingParams &&  
              <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#DC3545] pl-2">{errors.pricingParams}</p>
              </div>
            }
            </div>
          )}
        </div>

        {/* Minimum Contract Period */}
        <div className="space-y-2  mt-4">
          <Label className="text-lg font-semibold">Minimum Contract Period</Label>
          <div className="flex flex-wrap items-center space-x-2">
            <Input
              type="number"
              value={inputContractPeriod}
              onChange={handleContractPeriodChange}
              className="w-24 rounded-lg"
              placeholder="Value"
            />
            <select
              value={selectedContractPeriodUnit}
              onChange={handleContractPeriodUnitChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <Button 
              type="button"
              onClick={handleAddContractPeriod}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add
            </Button>
          </div>
          <div className="text-gray-700 mt-2">{contractPeriod}</div>
            {errors.contractPeriod &&  
              <div className="w-full bg-[#F8D7DA] mt-3 p-2 rounded-lg flex"> 
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-[#DC3545] pl-2">{errors.contractPeriod}</p>
              </div>
            }
        </div>

        <Button type="submit" className="w-full  bg-blue-500 text-white font-semibold  mt-4">
          Save Pricing Details
        </Button>
      
    </div>
    </form>
  );
};

export default PricingForm;
