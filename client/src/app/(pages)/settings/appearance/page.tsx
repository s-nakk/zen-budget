'use client'
import {Separator} from "@/components/ui/separator";
import {AppearanceForm} from "@/components/settings/appearance-form";

export default function AppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">外観</h3>
        <p className="text-sm text-muted-foreground">
          アプリケーション全体のテーマを選択します。
        </p>
      </div>
      <Separator/>
      <AppearanceForm/>
    </div>
  )
}