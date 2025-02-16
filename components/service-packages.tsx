import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ServicePackages() {
  const { addToCart } = useCart();

  const packages = [
    {
      id: "basic",
      name: "Basic",
      price: 350,
      features: [
        "Personalized Car Search",
        "Smart Price Comparison",
        "Dealer Connections",
        "Expert Price Negotiation",
        "Car History Report",
        "Hassle-Free Online Assistance",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 750,
      features: [
        "Everything in Basic, plus:",
        "Expert Price Negotiation",
        "Financing Made Simple",
        "Maximized Trade-In Value",
        "Effortless Delivery",
        "Pre-Purchase Inspection",
        "Personalized Test Drive Scheduling",
        "Paperwork Handled",
        "Post-Purchase Support",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">Choose Your Package</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              <p className="text-xl font-semibold text-primary">${pkg.price}</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="before:content-['✓'] before:mr-2 before:text-green-500">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="w-full" onClick={() => addToCart(pkg)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
