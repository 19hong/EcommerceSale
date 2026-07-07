import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  BarChart3,
  Globe,
  Lock,
  Star,
  CheckCircle,
} from 'lucide-react';
import Button from '../components/ui/Button';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built with performance in mind. Experience blazing fast load times and smooth interactions.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Bank-grade encryption and security measures to keep your data safe at all times.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with real-time updates and role-based access control.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description:
      'Gain valuable insights with comprehensive analytics and reporting tools.',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description:
      'Deploy globally with confidence. Our infrastructure scales with your needs.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description:
      'Your data belongs to you. We maintain the highest standards of data privacy.',
  },
];

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '10K+', label: 'Active Users' },
  { value: '50K+', label: 'Items Created' },
  { value: '4.9/5', label: 'User Rating' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    content:
      'This platform transformed how our team works. The intuitive interface and powerful features exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    content:
      'The developer experience is outstanding. Clean APIs, great documentation, and fantastic performance.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Designer',
    content:
      'Beautiful design meets powerful functionality. A joy to use every single day.',
    rating: 5,
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    features: [
      'Up to 50 items',
      'Basic analytics',
      'Email support',
      '1 team member',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/month',
    features: [
      'Up to 500 items',
      'Advanced analytics',
      'Priority support',
      '5 team members',
      'Custom integrations',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    features: [
      'Unlimited items',
      'Full analytics suite',
      '24/7 dedicated support',
      'Unlimited team members',
      'Custom integrations',
      'White-label option',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Trusted by 10,000+ users worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Build Something{' '}
              <span className="gradient-text">Amazing</span> Together
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              A modern full-stack platform that empowers teams to create, manage,
              and scale their projects with ease. Experience the future of web
              applications.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="text-base">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
              <Link to="/items">
                <Button variant="secondary" size="lg" className="text-base">
                  Browse Items
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free forever plan
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="section-title">
              Everything You Need
            </h2>
            <p className="section-subtitle">
              Powerful features to help you build and scale your projects
              efficiently.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="card p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="section-title">
              Loved by Teams
            </h2>
            <p className="section-subtitle">
              See what our users have to say about their experience.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                className="card p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="section-title">
              Simple, Transparent Pricing
            </h2>
            <p className="section-subtitle">
              Choose the perfect plan for your needs. No hidden fees.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {pricing.map((plan) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
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
                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of users building amazing things with our platform.
            </p>
            <Link to="/register">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 border-0"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
