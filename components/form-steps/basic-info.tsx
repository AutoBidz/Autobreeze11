"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BasicInfoProps {
  formData: Record<string, any>
  updateFormData: (data: Record<string, any>) => void
}

export function BasicInfo({ formData, updateFormData }: BasicInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          value={formData.fullName || ""}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email || ""}
          onChange={(e) => updateFormData({ email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone || ""}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">Zip Code</Label>
        <Input
          id="zipCode"
          placeholder="Enter your zip code"
          value={formData.zipCode || ""}
          onChange={(e) => updateFormData({ zipCode: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredContact">Preferred Contact Method</Label>
        <Select
          value={formData.preferredContact || ""}
          onValueChange={(value) => updateFormData({ preferredContact: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select preferred contact method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="text">Text Message</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

