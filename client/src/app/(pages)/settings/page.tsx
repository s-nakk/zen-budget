import ProfileForm from "@/components/settings/profile-form";
import {Separator} from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-2 lg:space-y-6">
      <div>
        <h3 className="lg:text-lg font-medium">プロフィール設定</h3>
        <p className="text-sm text-muted-foreground">
          ユーザー情報やアバターを編集します。</p>
      </div>
      <Separator/>
      <ProfileForm/>
    </div>
  )
}