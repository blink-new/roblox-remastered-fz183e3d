import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { GameCard } from '../components/GameCard'

const user = {
  name: "Alex Doe",
  username: "alex_doe",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  bio: "Game developer and 3D artist. Creator of Neon City Racing and other exciting games!",
  friends: [
    { id: 1, name: "Ben", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
    { id: 2, name: "Jane", avatar: "https://randomuser.me/api/portraits/women/75.jpg" },
    { id: 3, name: "Sam", avatar: "https://randomuser.me/api/portraits/men/76.jpg" },
    { id: 4, name: "Sue", avatar: "https://randomuser.me/api/portraits/women/76.jpg" },
  ],
  games: [
    {
      id: 1,
      title: "Neon City Racing",
      creator: "alex_doe",
      thumbnail: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=300&fit=crop",
      players: 2847,
      rating: 4.8,
      category: "Racing",
    },
  ]
}

export function ProfilePage() {
  return (
    <div className="container mx-auto px-4 pt-24">
      <motion.div 
        className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <Avatar className="w-32 h-32 mb-4 md:mb-0 md:mr-8 border-4 border-purple-500">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white">{user.name}</h1>
            <p className="text-lg text-white/70">@{user.username}</p>
            <p className="mt-4 text-white/80 max-w-lg">{user.bio}</p>
            <Button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              Add Friend
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">My Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.games.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Friends</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="space-y-4">
              {user.friends.map(friend => (
                <div key={friend.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-4">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-white">{friend.name}</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}