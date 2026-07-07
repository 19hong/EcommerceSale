import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      'Up to 5 items',
      'Basic search',
      'Community support',
      'Standard analytics',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    features: [
      'Up to 100 items',
      'Advanced search & filters',
      'Priority email support',
      'Advanced analytics',
      'Custom branding',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    price: '$49',
    period: '/month',
    features: [
      'Unlimited items',
      'Full-text search',
      '24/7 phone support',
      'Real-time analytics',
      'API access',
      'Team collaboration',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="section-title">Simple, Transparent Pricing</h1>
        <p className="section-subtitle">
          Choose the perfect plan for your needs. No hidden fees.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card p-8 relative ${
              plan.popular
                ? 'ring-2 ring-primary-500 shadow-xl scale-105'
                : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-white text-xs font-semibold">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {plan.price}
              </span>
              <span className="text-gray-500">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/register">
              <Button
                variant={plan.popular ? 'primary' : 'secondary'}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
