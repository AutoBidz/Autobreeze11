import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DrivingLifestyle({ updateFormData }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>How do you plan to use this vehicle?</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {["Daily commuting", "Business use", "Family use", "Road trips", "Off-roading", "Rideshare (Uber/Lyft)"].map(
            (use) => (
              <div key={use} className="flex items-center space-x-2">
                <Checkbox id={use} onCheckedChange={(checked) => updateFormData({ [use]: checked })} />
                <Label htmlFor={use}>{use}</Label>
              </div>
            ),
          )}
        </div>
        <Input className="mt-2" placeholder="Other" name="otherVehicleUse" onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="annualMileage">How many miles do you typically drive per year?</Label>
        <Select name="annualMileage" onValueChange={(value) => updateFormData({ annualMileage: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select annual mileage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under10k">Under 10,000</SelectItem>
            <SelectItem value="10k-15k">10,000 - 15,000</SelectItem>
            <SelectItem value="15k-20k">15,000 - 20,000</SelectItem>
            <SelectItem value="over20k">20,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="fuelPreference">What are your fuel preferences?</Label>
        <Select name="fuelPreference" onValueChange={(value) => updateFormData({ fuelPreference: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select fuel preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gasoline">Gasoline</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
            <SelectItem value="noPreference">No preference</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="colorPreference">Do you have any color preferences?</Label>
        <Select name="colorPreference" onValueChange={(value) => updateFormData({ colorPreference: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select color preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black">Black</SelectItem>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="silver">Silver</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

