import { TabsProps } from "../types";

export default function SettingForm({ data, setFormsData, errors }: TabsProps) {
    return (
        <div>
            <label className="block text-sm font-semibold mb-1">Theme:</label>
            <select
                value={data.settings.theme}
                onChange={(e) =>
                    setFormsData((data) => ({
                        ...data,
                        settings: { ...data.settings, theme: e.target.value },
                    }))
                }
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>
            {errors?.settings?.theme && (
                <span className="text-red-500 text-sm">{errors.settings.theme}</span>
            )}
        </div>
    );
}
