import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GameCard } from './components/GameCard'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { CreateGameModal } from './components/CreateGameModal'
import { CategoryFilter } from './components/CategoryFilter'
import { GameStats } from './components/GameStats'
import { ProfilePage } from './pages/ProfilePage'

const mockGames = [
  {
    id: 1,
    title: "Neon City Racing",
    creator: "SpeedMaster",
    thumbnail: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=300&fit=crop",
    players: 2847,
    rating: 4.8,
    category: "Racing",
    isNew: true
  },
  {
    id: 2,
    title: "Crystal Kingdom",
    creator: "MagicBuilder",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    players: 5921,
    rating: 4.9,
    category: "Adventure",
    isTrending: true
  },
  {
    id: 3,
    title: "Space Odyssey",
    creator: "CosmicDev",
    thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
    players: 1234,
    rating: 4.6,
    category: "Simulation"
  },
  {
    id: 4,
    title: "Medieval Fortress",
    creator: "CastleBuilder",
    thumbnail: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=300&fit=crop",
    players: 3456,
    rating: 4.7,
    category: "Strategy"
  },
  {
    id: 5,
    title: "Cyberpunk Arena",
    creator: "FutureTech",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    players: 8765,
    rating: 4.9,
    category: "Action",
    isTrending: true
  },
  {
    id: 6,
    title: "Ocean Explorer",
    creator: "DeepSea",
    thumbnail: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
    players: 2156,
    rating: 4.5,
    category: "Adventure"
  }
]

const categories = ["All", "Action", "Adventure", "Racing", "Strategy", "Simulation", "RPG"]

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  )
}

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredGames, setFilteredGames] = useState(mockGames)

  useEffect(() => {
    let filtered = mockGames

    if (selectedCategory !== "All") {
      filtered = filtered.filter(game => game.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.creator.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredGames(filtered)
  }, [selectedCategory, searchQuery])

  return (
    <>
      <Navigation 
        onCreateGame={() => setIsCreateModalOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />
      
      <main className="container mx-auto px-4 pt-24">
        <Hero />
        
        <GameStats />
        
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <motion.h2 
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover Games
            </motion.h2>
            
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game, index) => (
                <GameCard 
                  key={game.id}
                  game={game}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredGames.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl text-white/70 mb-2">No games found</h3>
              <p className="text-white/50">Try adjusting your search or category filter</p>
            </motion.div>
          )}
        </section>
      </main>
      
      <CreateGameModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  )
}

export default App