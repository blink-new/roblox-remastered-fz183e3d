import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Code, Gamepad2 } from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface CreateGameModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateGameModal({ isOpen, onClose }: CreateGameModalProps) {
  const [step, setStep] = useState(1)
  const [gameData, setGameData] = useState({
    title: '',
    description: '',
    category: '',
    template: ''
  })

  const templates = [
    {
      id: 'racing',
      name: 'Racing Track',
      description: 'High-speed racing with customizable tracks',
      icon: '🏎️',
      difficulty: 'Beginner'
    },
    {
      id: 'adventure',
      name: 'Adventure World',
      description: 'Explore vast landscapes and dungeons',
      icon: '🗺️',
      difficulty: 'Intermediate'
    },
    {
      id: 'shooter',
      name: 'Battle Arena',
      description: 'Competitive multiplayer combat',
      icon: '🎯',
      difficulty: 'Advanced'
    },
    {
      id: 'puzzle',
      name: 'Puzzle Game',
      description: 'Brain-teasing challenges and logic',
      icon: '🧩',
      difficulty: 'Beginner'
    },
    {
      id: 'social',
      name: 'Social Hub',
      description: 'Hangout space for friends',
      icon: '🎪',
      difficulty: 'Beginner'
    },
    {
      id: 'blank',
      name: 'Blank Canvas',
      description: 'Start from scratch with unlimited creativity',
      icon: '🎨',
      difficulty: 'Expert'
    }
  ]

  const handleCreate = () => {
    // Simulate game creation
    console.log('Creating game:', gameData)
    onClose()
    setStep(1)
    setGameData({ title: '', description: '', category: '', template: '' })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500'
      case 'Intermediate': return 'bg-yellow-500'
      case 'Advanced': return 'bg-orange-500'
      case 'Expert': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Create New Game</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Choose a Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        gameData.template === template.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/20 bg-white/5 hover:border-white/30'
                      }`}
                      onClick={() => setGameData({ ...gameData, template: template.id })}
                    >
                      <div className="text-3xl mb-2">{template.icon}</div>
                      <h4 className="font-semibold text-white">{template.name}</h4>
                      <p className="text-sm text-white/70 mb-3">{template.description}</p>
                      <Badge className={`${getDifficultyColor(template.difficulty)} text-white`}>
                        {template.difficulty}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!gameData.template}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                >
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Game Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Game Title
                    </label>
                    <Input
                      placeholder="Enter your game title"
                      value={gameData.title}
                      onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Category
                    </label>
                    <Select
                      value={gameData.category}
                      onValueChange={(value) => setGameData({ ...gameData, category: value })}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="racing">Racing</SelectItem>
                        <SelectItem value="strategy">Strategy</SelectItem>
                        <SelectItem value="simulation">Simulation</SelectItem>
                        <SelectItem value="rpg">RPG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe your game..."
                    value={gameData.description}
                    onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 p-4 bg-white/5 rounded-lg border border-white/10">
                    <Palette className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm font-medium text-white">Visual Editor</div>
                      <div className="text-xs text-white/60">Drag & drop building</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 bg-white/5 rounded-lg border border-white/10">
                    <Code className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-sm font-medium text-white">Scripting</div>
                      <div className="text-xs text-white/60">Advanced logic</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 bg-white/5 rounded-lg border border-white/10">
                    <Gamepad2 className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-sm font-medium text-white">Play Testing</div>
                      <div className="text-xs text-white/60">Instant preview</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleCreate}
                  disabled={!gameData.title || !gameData.category}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                >
                  Create Game
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}