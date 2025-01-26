import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import IntrestForm from "./components/IntrestsForm";
import SettingForm from "./components/SettingsForm";
import { FormsData, FormsError } from "./types";



const initialData: FormsData = {
  profile: { name: "", email: "" },
  intrests: [],
  settings: { theme: "dark" },
};

function TabForm() {
  const tabs = [
    { name: "Profile", component: ProfileForm },
    { name: "Intrests", component: IntrestForm },
    { name: "Settings", component: SettingForm },
  ];

  const [formsData, setFormsData] = useState(initialData);
  const [currentTab, setCurrentTab] = useState(0);
  const [formsError, setFormsError] = useState<FormsError>({});

  const ActiveTabComponent = tabs[currentTab].component;

  const validate = (): boolean => {
    const errors: FormsError = {};
    let hasError = false;

    if (currentTab === 0) {
      if (!formsData.profile.name) {
        hasError = true;
        errors.profile = { ...errors.profile, name: "Name is required" };
      }
      if (!formsData.profile.email) {
        hasError = true;
        errors.profile = { ...errors.profile, email: "Email is required" };
      }
    } else if (currentTab === 1 && formsData.intrests.length === 0) {
      hasError = true;
      errors.intrests = "Please select at least one interest";
    }

    setFormsError(errors);
    return hasError;
  };

  const handleSubmit = () => {
    console.log(formsData);
  };

  const nextTab = () => {
    if (validate()) return;
    setCurrentTab((prev) => Math.min(prev + 1, tabs.length - 1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-md shadow-lg">
        <div className="flex gap-2 mb-6">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(index)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${currentTab === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="mb-6">
          <ActiveTabComponent
            data={formsData}
            setFormsData={setFormsData}
            errors={formsError}
          />
        </div>
        <button
          onClick={currentTab < tabs.length - 1 ? nextTab : handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {currentTab < tabs.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default TabForm;
