// import { create } from 'zustand';
// import { z } from 'zod';

// const CategorySchema = z.object({
//   name: z.string(),
//   percentage: z.number().min(0).max(100),
//   locked: z.boolean().optional()
// });

// const CustomerSegmentSchema = z.object({
//   userCategories: z.array(CategorySchema),
//   industries: z.array(CategorySchema),
//   practiceAreas: z.array(CategorySchema),
//   teamSizes: z.array(CategorySchema)
// });

// type CustomerSegment = z.infer<typeof CustomerSegmentSchema>;

// interface CustomerSegmentStore {
//   customerSegment: CustomerSegment;
//   addCategory: (type: keyof CustomerSegment, name: string) => void;
//   removeCategory: (type: keyof CustomerSegment, name: string) => void;
//   updatePercentage: (type: keyof CustomerSegment, name: string, percentage: number) => void;
//   toggleLock: (type: keyof CustomerSegment, name: string) => void;
//   validateAndSave: () => boolean;
// }

// export const useCustomerSegmentStore = create<CustomerSegmentStore>((set, get) => ({
//   customerSegment: {
//     userCategories: [],
//     industries: [],
//     practiceAreas: [],
//     teamSizes: []
//   },

//   addCategory: (type, name) => set((state) => {
//     const newCategories = [...state.customerSegment[type], { name, percentage: 0, locked: false }];
//     const totalCategories = newCategories.length;
//     const equalPercentage = Math.floor(100 / totalCategories);
//     const remainder = 100 % totalCategories;

//     const updatedCategories = newCategories.map((category, index) => ({
//       ...category,
//       percentage: category.locked ? category.percentage : equalPercentage + (index < remainder ? 1 : 0)
//     }));

//     return {
//       customerSegment: {
//         ...state.customerSegment,
//         [type]: updatedCategories
//       }
//     };
//   }),

//   removeCategory: (type, name) => set((state) => {
//     const updatedCategories = state.customerSegment[type].filter(category => category.name !== name);
//     const unlockedCategories = updatedCategories.filter(category => !category.locked);
//     const totalUnlocked = unlockedCategories.length;
    
//     if (totalUnlocked > 0) {
//       const remainingPercentage = 100 - updatedCategories.reduce((sum, category) => sum + (category.locked ? category.percentage : 0), 0);
//       const equalPercentage = Math.floor(remainingPercentage / totalUnlocked);
//       const remainder = remainingPercentage % totalUnlocked;

//       unlockedCategories.forEach((category, index) => {
//         category.percentage = equalPercentage + (index < remainder ? 1 : 0);
//       });
//     }

//     return {
//       customerSegment: {
//         ...state.customerSegment,
//         [type]: updatedCategories
//       }
//     };
//   }),

//   updatePercentage: (type, name, newPercentage) => set((state) => {
//     const categories = state.customerSegment[type];
//     const categoryIndex = categories.findIndex(category => category.name === name);
    
//     if (categoryIndex === -1) return state;

//     const oldPercentage = categories[categoryIndex].percentage;
//     const diff = newPercentage - oldPercentage;

//     const updatedCategories = categories.map((category, index) => {
//       if (index === categoryIndex) {
//         return { ...category, percentage: newPercentage };
//       }

//       if (!category.locked) {
//         const unlockedCategories = categories.filter(c => !c.locked && c.name !== name);
//         const adjustment = diff / unlockedCategories.length;
//         return { ...category, percentage: Math.max(0, category.percentage - adjustment) };
//       }

//       return category;
//     });

//     return {
//       customerSegment: {
//         ...state.customerSegment,
//         [type]: updatedCategories
//       }
//     };
//   }),

//   toggleLock: (type, name) => set((state) => {
//     const categories = state.customerSegment[type];
//     const updatedCategories = categories.map(category => 
//       category.name === name ? { ...category, locked: !category.locked } : category
//     );

//     return {
//       customerSegment: {
//         ...state.customerSegment,
//         [type]: updatedCategories
//       }
//     };
//   }),

//   validateAndSave: () => {
//     const result = CustomerSegmentSchema.safeParse(get().customerSegment);
//     if (result.success) {
//       console.log('Data is valid. Saving:', result.data);
//       return true;
//     } else {
//       console.error('Validation failed:', result.error);
//       return false;
//     }
//   }
// }));






import { create } from 'zustand';
import { z } from 'zod';
import { ProductInfo } from "@/store/useStore";
 // Ensure this import is correct

const CategorySchema = z.object({
  name: z.string(),
  percentage: z.number().min(0).max(100),
  locked: z.boolean().optional()
});

const CustomerSegmentSchema = z.object({
  userCategories: z.array(CategorySchema),
  industries: z.array(CategorySchema),
  practiceAreas: z.array(CategorySchema),
  teamSizes: z.array(CategorySchema)
});

type CustomerSegment = z.infer<typeof CustomerSegmentSchema>;

interface CustomerSegmentStore {
  customerSegment: CustomerSegment;
  initializeFromGlobalStore: () => void;
  addCategory: (type: keyof CustomerSegment, name: string) => void;
  removeCategory: (type: keyof CustomerSegment, name: string) => void;
  updatePercentage: (type: keyof CustomerSegment, name: string, percentage: number) => void;
  toggleLock: (type: keyof CustomerSegment, name: string) => void;
  validateAndSave: () => boolean;
  saveToGlobalStore: () => void;
}

const initializeCategories = (categories: string[]): CategorySchema[] => {
  const totalCategories = categories.length;
  const equalPercentage = Math.floor(100 / totalCategories);
  const remainder = 100 % totalCategories;

  return categories.map((name, index) => ({
    name,
    percentage: equalPercentage + (index < remainder ? 1 : 0),
    locked: false
  }));
};

export const useCustomerSegmentStore = create<CustomerSegmentStore>((set, get) => ({
  customerSegment: {
    userCategories: [],
    industries: [],
    practiceAreas: [],
    teamSizes: []
  },

  initializeFromGlobalStore: () => {
    const globalStore = ProductInfo.getState();
    set({
      customerSegment: {
        userCategories: initializeCategories(globalStore.userCategory),
        industries: initializeCategories(globalStore.industry),
        practiceAreas: initializeCategories(globalStore.practiceAreas),
        teamSizes: initializeCategories(globalStore.teamSize)
      }
    });
    console.log('Initialized Customer Segment Store from Global Store:', get().customerSegment);
  },

  addCategory: (type, name) => set((state) => {
    const newCategories = [...state.customerSegment[type], { name, percentage: 0, locked: false }];
    const totalCategories = newCategories.length;
    const equalPercentage = Math.floor(100 / totalCategories);
    const remainder = 100 % totalCategories;

    const updatedCategories = newCategories.map((category, index) => ({
      ...category,
      percentage: category.locked ? category.percentage : equalPercentage + (index < remainder ? 1 : 0)
    }));

    return {
      customerSegment: {
        ...state.customerSegment,
        [type]: updatedCategories
      }
    };
  }),

  removeCategory: (type, name) => set((state) => {
    const updatedCategories = state.customerSegment[type].filter(category => category.name !== name);
    const unlockedCategories = updatedCategories.filter(category => !category.locked);
    const totalUnlocked = unlockedCategories.length;
    
    if (totalUnlocked > 0) {
      const remainingPercentage = 100 - updatedCategories.reduce((sum, category) => sum + (category.locked ? category.percentage : 0), 0);
      const equalPercentage = Math.floor(remainingPercentage / totalUnlocked);
      const remainder = remainingPercentage % totalUnlocked;

      unlockedCategories.forEach((category, index) => {
        category.percentage = equalPercentage + (index < remainder ? 1 : 0);
      });
    }

    return {
      customerSegment: {
        ...state.customerSegment,
        [type]: updatedCategories
      }
    };
  }),

  updatePercentage: (type, name, newPercentage) => set((state) => {
    const categories = state.customerSegment[type];
    const categoryIndex = categories.findIndex(category => category.name === name);
    
    if (categoryIndex === -1) return state;

    const oldPercentage = categories[categoryIndex].percentage;
    const diff = newPercentage - oldPercentage;

    const updatedCategories = categories.map((category, index) => {
      if (index === categoryIndex) {
        return { ...category, percentage: newPercentage };
      }

      if (!category.locked) {
        const unlockedCategories = categories.filter(c => !c.locked && c.name !== name);
        const adjustment = diff / unlockedCategories.length;
        return { ...category, percentage: Math.max(0, category.percentage - adjustment) };
      }

      return category;
    });

    return {
      customerSegment: {
        ...state.customerSegment,
        [type]: updatedCategories
      }
    };
  }),

  toggleLock: (type, name) => set((state) => {
    const categories = state.customerSegment[type];
    const updatedCategories = categories.map(category => 
      category.name === name ? { ...category, locked: !category.locked } : category
    );

    return {
      customerSegment: {
        ...state.customerSegment,
        [type]: updatedCategories
      }
    };
  }),


  validateAndSave: () => {
    const result = CustomerSegmentSchema.safeParse(get().customerSegment);
    if (result.success) {
      console.log('Data is valid. Saving:', result.data);
      get().saveToGlobalStore();
      return true;
    } else {
      console.error('Validation failed:', result.error);
      return false;
    }
  },

  saveToGlobalStore: () => {
    const { customerSegment } = get();
    const productInfoStore = ProductInfo.getState();
    
    console.log('Before saving - Global Store:', {
      userCategory: productInfoStore.userCategory,
      industry: productInfoStore.industry,
      practiceAreas: productInfoStore.practiceAreas,
      teamSize: productInfoStore.teamSize
    });
  
    try {
      productInfoStore.setUserCategory(customerSegment.userCategories.map(c => c.name));
      productInfoStore.setIndustry(customerSegment.industries.map(c => c.name));
      productInfoStore.setPracticeAreas(customerSegment.practiceAreas.map(c => c.name));
      productInfoStore.setTeamSize(customerSegment.teamSizes.map(c => c.name));
  
      console.log('After saving - Local Store (Customer Segment):', customerSegment);
      console.log('After saving - Global Store:', {
        userCategory: productInfoStore.userCategory,
        industry: productInfoStore.industry,
        practiceAreas: productInfoStore.practiceAreas,
        teamSize: productInfoStore.teamSize
      });
    } catch (error) {
      console.error('Error saving to global store:', error);
    }
  }
}));


