import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BudgetFinancing({ updateFormData, formData }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 mb-6">
        <Label>Are you looking to purchase or lease?</Label>
        <RadioGroup
          name="transactionType"
          value={formData.transactionType || ""}
          onValueChange={(value) => updateFormData({ transactionType: value })}
        >
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="purchase" id="purchase" />
              <Label htmlFor="purchase">Purchase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lease" id="lease" />
              <Label htmlFor="lease">Lease</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="budgetRange">What is your budget range?</Label>
        <Select
          name="budgetRange"
          onValueChange={(value) => updateFormData({ budgetRange: value })}
          value={formData.budgetRange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under10k">Under $10,000</SelectItem>
            <SelectItem value="10k-20k">$10,000 - $20,000</SelectItem>
            <SelectItem value="20k-30k">$20,000 - $30,000</SelectItem>
            <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
            <SelectItem value="over50k">$50,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Are you planning to finance or pay in cash?</Label>
        <RadioGroup onValueChange={(value) => updateFormData({ paymentMethod: value })} value={formData.paymentMethod}>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="financing" id="financing" />
              <Label htmlFor="financing">Financing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash">Paying in cash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="notSure" id="notSure" />
              <Label htmlFor="notSure">Not sure yet</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {formData.paymentMethod === "financing" && (
        <div>
          <Label htmlFor="downPayment">If financing, what is your estimated down payment?</Label>
          <Input
            id="downPayment"
            name="downPayment"
            type="number"
            onChange={handleChange}
            value={formData.downPayment || ""}
          />
        </div>
      )}

      <div>
        <Label>Would you like assistance with financing options?</Label>
        <RadioGroup
          onValueChange={(value) => updateFormData({ financingAssistance: value })}
          value={formData.financingAssistance}
        >
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="financingAssistanceYes" />
              <Label htmlFor="financingAssistanceYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="financingAssistanceNo" />
              <Label htmlFor="financingAssistanceNo">No</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

