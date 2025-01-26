export interface ProfileData {
    name: string;
    email: string;
}
export type IntrestsData = string[];
export interface SettingsData {
    theme: string;
}
export type FormsData = {
    profile: ProfileData;
    intrests: IntrestsData;
    settings: SettingsData;
};
export type TabsProps = {
    data: FormsData;
    setFormsData: React.Dispatch<React.SetStateAction<FormsData>>;
    errors?: FormsError;
};

export type FormsError = {
    profile?: {
        name?: string;
        email?: string;
    };
    intrests?: string;
    settings?: {
        theme?: string;
    };
};