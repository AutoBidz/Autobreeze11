import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TradeIn({ updateFormData, formData }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Do you have a vehicle to trade in?</Label>
        <RadioGroup onValueChange={(value) => updateFormData({ hasTradeIn: value })} value={formData.hasTradeIn}>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="tradeInYes" />
              <Label htmlFor="tradeInYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="tradeInNo" />
              <Label htmlFor="tradeInNo">No</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {formData.hasTradeIn === "yes" && (
        <>
          <div>
            <Label htmlFor="tradeInDetails">Year, Make, and Model of Trade-In</Label>
            <Input
              id="tradeInDetails"
              name="tradeInDetails"
              onChange={handleChange}
              value={formData.tradeInDetails || ""}
            />
          </div>

          <div>
            <Label htmlFor="tradeInMileage">Current Mileage of Trade-In</Label>
            <Input
              id="tradeInMileage"
              name="tradeInMileage"
              type="number"
              onChange={handleChange}
              value={formData.tradeInMileage || ""}
            />
          </div>

          <div>
            <Label htmlFor="tradeInCondition">Vehicle Condition?</Label>
            <Select
              name="tradeInCondition"
              onValueChange={(value) => updateFormData({ tradeInCondition: value })}
              value={formData.tradeInCondition}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="needsWork">Needs Work</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Do you still owe on the vehicle?</Label>
            <RadioGroup
              onValueChange={(value) => updateFormData({ owesOnTradeIn: value })}
              value={formData.owesOnTradeIn}
            >
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="owesYes" />
                  <Label htmlFor="owesYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="owesNo" />
                  <Label htmlFor="owesNo">No</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {formData.owesOnTradeIn === "yes" && (
            <div>
              <Label htmlFor="tradeInOwed">How much do you still owe?</Label>
              <Input
                id="tradeInOwed"
                name="tradeInOwed"
                type="number"
                onChange={handleChange}
                value={formData.tradeInOwed || ""}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

