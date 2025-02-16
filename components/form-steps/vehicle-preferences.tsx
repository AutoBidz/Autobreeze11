"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VehiclePreferencesProps {
  formData: Record<string, any>
  updateFormData: (data: Record<string, any>) => void
}

const vehicleTypes = ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Minivan", "Electric/Hybrid"]

const features = [
  "Leather seats",
  "Sunroof/Moonroof",
  "Backup camera",
  "Apple CarPlay/Android Auto",
  "Heated seats",
  "All-wheel drive (AWD)",
  "Third-row seating",
  "Advanced safety features",
]

export function VehiclePreferences({ formData, updateFormData }: VehiclePreferencesProps) {
  const handleVehicleTypeChange = (type: string, checked: boolean) => {
    const currentTypes = formData.vehicleTypes || []
    const updatedTypes = checked ? [...currentTypes, type] : currentTypes.filter((t: string) => t !== type)
    updateFormData({ vehicleTypes: updatedTypes })
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const currentFeatures = formData.features || []
    const updatedFeatures = checked
      ? [...currentFeatures, feature]
      : currentFeatures.filter((f: string) => f !== feature)
    updateFormData({ features: updatedFeatures })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label>What type of vehicle are you looking for?</Label>
        <div className="grid grid-cols-2 gap-4">
          {vehicleTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={(formData.vehicleTypes || []).includes(type)}
                onCheckedChange={(checked) => handleVehicleTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </div>
        <Input
          placeholder="Other vehicle type"
          value={formData.otherVehicleType || ""}
          onChange={(e) => updateFormData({ otherVehicleType: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <Label>New or Used?</Label>
        <RadioGroup value={formData.condition || ""} onValueChange={(value) => updateFormData({ condition: value })}>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="used" id="used" />
              <Label htmlFor="used">Used</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both">Open to both</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="makes">Preferred Makes/Brands</Label>
        <Input
          id="makes"
          placeholder="Enter preferred makes or brands"
          value={formData.makes || ""}
          onChange={(e) => updateFormData({ makes: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="models">Preferred Models</Label>
        <Input
          id="models"
          placeholder="Enter preferred models"
          value={formData.models || ""}
          onChange={(e) => updateFormData({ models: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="modelYears">Model Years</Label>
        <Select value={formData.modelYears || ""} onValueChange={(value) => updateFormData({ modelYears: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select model years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023-2025">2023-2025 (Latest Models)</SelectItem>
            <SelectItem value="2019-2023">2019-2023</SelectItem>
            <SelectItem value="2015-2019">2015-2019</SelectItem>
            <SelectItem value="older">Older than 2015</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Must-have Features (Select up to 3)</Label>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={feature}
                checked={(formData.features || []).includes(feature)}
                onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                disabled={(formData.features || []).length >= 3 && !(formData.features || []).includes(feature)}
              />
              <Label htmlFor={feature}>{feature}</Label>
            </div>
          ))}
        </div>
        <Input
          placeholder="Other feature"
          value={formData.otherFeature || ""}
          onChange={(e) => updateFormData({ otherFeature: e.target.value })}
        />
      </div>
    </div>
  )
}

