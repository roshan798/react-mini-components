import { TabsProps } from "../types";

export default function ProfileForm({ data, setFormsData, errors }: TabsProps) {
    const { profile } = data;
    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-semibold mb-1">Name:</label>
                <input
                    value={profile.name}
                    onChange={(e) =>
                        setFormsData((data) => ({
                            ...data,
                            profile: { ...data.profile, name: e.target.value },
                        }))
                    }
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter your name"
                />
                {errors?.profile?.name && (
                    <span className="text-red-500 text-sm">{errors.profile.name}</span>
                )}
            </div>
            <div>
                <label className="block text-sm font-semibold mb-1">Email:</label>
                <input
                    value={profile.email}
                    onChange={(e) =>
                        setFormsData((data) => ({
                            ...data,
                            profile: { ...data.profile, email: e.target.value },
                        }))
                    }
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="Enter your email"
                />
                {errors?.profile?.email && (
                    <span className="text-red-500 text-sm">{errors.profile.email}</span>
                )}
            </div>
        </div>
    );
}
