import UpdateProfileForm from "@/app/(private)/manage/setting/update-profile-form";
import ChangePasswordForm from "@/app/(private)/manage/setting/change-password-form";

const SettingPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UpdateProfileForm />
            <ChangePasswordForm />
        </div>
    )
}

export default SettingPage;