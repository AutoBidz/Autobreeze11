import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreditPreApproval({ updateFormData, formData }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="creditScore">How would you rate your credit score?</Label>
        <Select
          name="creditScore"
          onValueChange={(value) => updateFormData({ creditScore: value })}
          value={formData.creditScore}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select credit score range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excellent">Excellent (750+)</SelectItem>
            <SelectItem value="good">Good (700-749)</SelectItem>
            <SelectItem value="fair">Fair (650-699)</SelectItem>
            <SelectItem value="poor">Poor (600-649)</SelectItem>
            <SelectItem value="notSure">Not sure</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Have you already been pre-approved for a car loan?</Label>
        <RadioGroup onValueChange={(value) => updateFormData({ isPreApproved: value })} value={formData.isPreApproved}>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="preApprovedYes" />
              <Label htmlFor="preApprovedYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="preApprovedNo" />
              <Label htmlFor="preApprovedNo">No</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {formData.isPreApproved === "yes" && (
        <>
          <div>
            <Label htmlFor="preApprovalLender">Which lender provided the pre-approval?</Label>
            <Input
              id="preApprovalLender"
              name="preApprovalLender"
              onChange={handleChange}
              value={formData.preApprovalLender || ""}
            />
          </div>

          <div>
            <Label htmlFor="approvedLoanAmount">What is the approved loan amount?</Label>
            <Input
              id="approvedLoanAmount"
              name="approvedLoanAmount"
              type="number"
              onChange={handleChange}
              value={formData.approvedLoanAmount || ""}
            />
          </div>

          <div>
            <Label htmlFor="approvedLoanTerms">
              What are your approved loan terms? (Interest rate, term length, etc.)
            </Label>
            <Input
              id="approvedLoanTerms"
              name="approvedLoanTerms"
              onChange={handleChange}
              value={formData.approvedLoanTerms || ""}
            />
          </div>
        </>
      )}

      <div>
        <Label>Would you like assistance with pre-approval?</Label>
        <RadioGroup
          onValueChange={(value) => updateFormData({ needsPreApprovalAssistance: value })}
          value={formData.needsPreApprovalAssistance}
        >
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="preApprovalAssistanceYes" />
              <Label htmlFor="preApprovalAssistanceYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="preApprovalAssistanceNo" />
              <Label htmlFor="preApprovalAssistanceNo">No</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

