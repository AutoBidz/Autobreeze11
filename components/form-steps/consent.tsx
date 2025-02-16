import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function Consent({ updateFormData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox id="consentFinancing" onCheckedChange={(checked) => updateFormData({ consentFinancing: checked })} />
        <Label htmlFor="consentFinancing">
          I consent to AutoBreeze assisting with financing and connecting me with lending partners.
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="consentCreditCheck"
          onCheckedChange={(checked) => updateFormData({ consentCreditCheck: checked })}
        />
        <Label htmlFor="consentCreditCheck">
          I understand that checking financing options will not impact my credit score unless I officially apply.
        </Label>
      </div>
    </div>
  )
}

