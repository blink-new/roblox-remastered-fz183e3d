import { motion } from 'framer-motion'
import { TrendingUp, Clock, Award, Zap } from 'lucide-react'

export function GameStats() {
  const stats = [
    {
      icon: TrendingUp,
      label: "Trending Now",
      value: "15 Games",
      change: "+5 from yesterday",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Clock,
      label: "Recently Updated",
      value: "23 Games",
      change: "Updated today",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      label: "Top Rated",
      value: "8 Games",
      change: "Above 4.5★",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Zap,
      label: "Most Active",
      value: "12 Games",
      change: "1000+ players",
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            </div>
            <div className="text-sm text-white/70">
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}