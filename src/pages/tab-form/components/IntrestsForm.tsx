import { TabsProps } from "../types";

export default function IntrestForm({ data, setFormsData, errors }: TabsProps) {
    const intrestsData = ["JavaScript", "React", "Vue", "Angular", "Svelte"];
    const { intrests } = data;

    return (
        <div className="space-y-3">
            {intrestsData.map((intrest, i) => (
                <div key={i} className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id={intrest}
                        name={intrest}
                        value={intrest}
                        checked={intrests.includes(intrest)}
                        onChange={(e) => {
                            setFormsData((data) =>
                                e.target.checked
                                    ? { ...data, intrests: [...data.intrests, intrest] }
                                    : {
                                        ...data,
                                        intrests: data.intrests.filter((i) => i !== intrest),
                                    }
                            );
                        }}
                        className="w-4 h-4"
                    />
                    <label htmlFor={intrest} className="text-sm font-medium">
                        {intrest}
                    </label>
                </div>
            ))}
            {errors?.intrests && (
                <span className="text-red-500 text-sm">{errors.intrests}</span>
            )}
        </div>
    );
}
