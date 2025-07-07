import { motion } from 'framer-motion'
import { Play, Users, Star, Crown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Game {
  id: number
  title: string
  creator: string
  thumbnail: string
  players: number
  rating: number
  category: string
  isNew?: boolean
  isTrending?: boolean
}

interface GameCardProps {
  game: Game
  index: number
}

export function GameCard({ game, index }: GameCardProps) {
  const formatPlayerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.1
      }}
      whileHover={{ y: -8 }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              size="sm" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
            >
              <Play className="w-4 h-4 mr-1" />
              Play
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {game.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              New
            </Badge>
          )}
          {game.isTrending && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
              <Crown className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        {/* Player Count */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
          <Users className="w-3 h-3 mr-1 text-white/70" />
          <span className="text-xs text-white/90">{formatPlayerCount(game.players)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-white group-hover:text-white/90 transition-colors truncate">
              {game.title}
            </h3>
            <p className="text-sm text-white/60 truncate">by {game.creator}</p>
          </div>
          
          <div className="flex items-center ml-2">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm text-white/80">{game.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {game.category}
          </Badge>
          
          <motion.div 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white/70 hover:text-white hover:bg-white/10 h-8 px-3"
            >
              <Play className="w-3 h-3 mr-1" />
              Play
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl transform scale-105"></div>
      </div>
    </motion.div>
  )
}