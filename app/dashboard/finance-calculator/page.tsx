"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinanceCalculatorPage() {
  const [calculatorType, setCalculatorType] = useState("purchase")
  const [purchaseInputs, setPurchaseInputs] = useState({
    vehiclePrice: "",
    downPayment: "",
    tradeInValue: "",
    loanTerm: "",
    interestRate: "",
    salesTax: "",
  })
  const [leaseInputs, setLeaseInputs] = useState({
    vehiclePrice: "",
    residualValue: "",
    leaseTerm: "",
    moneyFactor: "",
    downPayment: "",
    salesTax: "",
  })
  const [monthlyPayment, setMonthlyPayment] = useState(null)

  const handlePurchaseInputChange = (e) => {
    const { name, value } = e.target
    setPurchaseInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleLeaseInputChange = (e) => {
    const { name, value } = e.target
    setLeaseInputs((prev) => ({ ...prev, [name]: value }))
  }

  const calculatePurchasePayment = () => {
    const { vehiclePrice, downPayment, tradeInValue, loanTerm, interestRate, salesTax } = purchaseInputs

    const loanAmount =
      Number.parseFloat(vehiclePrice) - Number.parseFloat(downPayment || 0) - Number.parseFloat(tradeInValue || 0)
    const taxAmount = (loanAmount * Number.parseFloat(salesTax || 0)) / 100
    const totalLoanAmount = loanAmount + taxAmount
    const monthlyInterestRate = Number.parseFloat(interestRate) / 1200
    const numberOfPayments = Number.parseFloat(loanTerm)

    const monthlyPayment =
      (totalLoanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

    setMonthlyPayment(monthlyPayment.toFixed(2))
  }

  const calculateLeasePayment = () => {
    const { vehiclePrice, residualValue, leaseTerm, moneyFactor, downPayment, salesTax } = leaseInputs

    const depreciationFee =
      (Number.parseFloat(vehiclePrice) - Number.parseFloat(residualValue)) / Number.parseFloat(leaseTerm)
    const financeFee =
      (Number.parseFloat(vehiclePrice) + Number.parseFloat(residualValue)) * Number.parseFloat(moneyFactor)
    const basePayment = depreciationFee + financeFee
    const taxAmount = (basePayment * Number.parseFloat(salesTax)) / 100
    const totalMonthlyPayment = basePayment + taxAmount

    setMonthlyPayment(totalMonthlyPayment.toFixed(2))
  }

  const handleCalculate = () => {
    if (calculatorType === "purchase") {
      calculatePurchasePayment()
    } else {
      calculateLeasePayment()
    }
  }

  return (
    <div className="flex">
      <DashboardNav />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Auto Finance Calculator</h1>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Your Monthly Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={calculatorType} onValueChange={setCalculatorType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="purchase">Purchase</TabsTrigger>
                <TabsTrigger value="lease">Lease</TabsTrigger>
              </TabsList>
              <TabsContent value="purchase">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                    <Input
                      id="vehiclePrice"
                      name="vehiclePrice"
                      value={purchaseInputs.vehiclePrice}
                      onChange={handlePurchaseInputChange}
                      placeholder="Enter vehicle price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <Input
                      id="downPayment"
                      name="downPayment"
                      value={purchaseInputs.downPayment}
                      onChange={handlePurchaseInputChange}
                      placeholder="Enter down payment"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tradeInValue">Trade-in Value</Label>
                    <Input
                      id="tradeInValue"
                      name="tradeInValue"
                      value={purchaseInputs.tradeInValue}
                      onChange={handlePurchaseInputChange}
                      placeholder="Enter trade-in value"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                    <Input
                      id="loanTerm"
                      name="loanTerm"
                      value={purchaseInputs.loanTerm}
                      onChange={handlePurchaseInputChange}
                      placeholder="Enter loan term in months"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      name="interestRate"
                      value={purchaseInputs.interestRate}
                      onChange={handlePurchaseInputChange}
                      placeholder="Enter interest rate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salesTax">Sales Tax (%)</Label>
                    <Input
                      id="salesTax"
                      name="salesTax"
                      value={purchaseInputs.salesTax}
                      onChange={handlePurchaseInputChange}
                      placeholder="Enter sales tax percentage"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="lease">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                    <Input
                      id="vehiclePrice"
                      name="vehiclePrice"
                      value={leaseInputs.vehiclePrice}
                      onChange={handleLeaseInputChange}
                      placeholder="Enter vehicle price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="residualValue">Residual Value</Label>
                    <Input
                      id="residualValue"
                      name="residualValue"
                      value={leaseInputs.residualValue}
                      onChange={handleLeaseInputChange}
                      placeholder="Enter residual value"
                    />
                  </div>
                  <div>
                    <Label htmlFor="leaseTerm">Lease Term (months)</Label>
                    <Input
                      id="leaseTerm"
                      name="leaseTerm"
                      value={leaseInputs.leaseTerm}
                      onChange={handleLeaseInputChange}
                      placeholder="Enter lease term in months"
                    />
                  </div>
                  <div>
                    <Label htmlFor="moneyFactor">Money Factor</Label>
                    <Input
                      id="moneyFactor"
                      name="moneyFactor"
                      value={leaseInputs.moneyFactor}
                      onChange={handleLeaseInputChange}
                      placeholder="Enter money factor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <Input
                      id="downPayment"
                      name="downPayment"
                      value={leaseInputs.downPayment}
                      onChange={handleLeaseInputChange}
                      placeholder="Enter down payment"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salesTax">Sales Tax (%)</Label>
                    <Input
                      id="salesTax"
                      name="salesTax"
                      value={leaseInputs.salesTax}
                      onChange={handleLeaseInputChange}
                      placeholder="Enter sales tax percentage"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <Button onClick={handleCalculate} className="mt-4">
              Calculate
            </Button>
            {monthlyPayment && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Estimated Monthly Payment: ${monthlyPayment}</h3>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

