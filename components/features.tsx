import { Shield, Clock, DollarSign, ThumbsUp } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Secure Process",
      description: "Your data and transactions are fully protected with bank-level security.",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Skip lengthy dealership visits. We handle negotiations while you relax.",
    },
    {
      icon: DollarSign,
      title: "Better Deals",
      description: "Leverage our expertise to get competitive prices that beat direct negotiations.",
    },
    {
      icon: ThumbsUp,
      title: "Satisfaction Guaranteed",
      description: "Our service comes with a 100% satisfaction guarantee.",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Why Choose <span className="text-secondary">AutoBreeze</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

