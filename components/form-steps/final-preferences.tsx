import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function FinalPreferences({ updateFormData }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="purchaseTimeline">When are you looking to purchase?</Label>
        <Select name="purchaseTimeline" onValueChange={(value) => updateFormData({ purchaseTimeline: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select purchase timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asap">As soon as possible</SelectItem>
            <SelectItem value="within30">Within 30 days</SelectItem>
            <SelectItem value="1-3months">1-3 months</SelectItem>
            <SelectItem value="3-6months">3-6 months</SelectItem>
            <SelectItem value="exploring">Just exploring options</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="additionalRequests">
          Do you have any specific requests or must-have features that haven't been covered?
        </Label>
        <Textarea id="additionalRequests" name="additionalRequests" onChange={handleChange} />
      </div>

      <div>
        <Label>Would you like to receive updates about similar vehicles that match your criteria?</Label>
        <RadioGroup onValueChange={(value) => updateFormData({ wantsUpdates: value })}>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="updatesYes" />
              <Label htmlFor="updatesYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="updatesNo" />
              <Label htmlFor="updatesNo">No</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

