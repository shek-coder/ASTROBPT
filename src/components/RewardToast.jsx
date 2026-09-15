import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function RewardToast({ toast }) {
  return (
    <motion.div className="reward-toast" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} role="status">
      <Sparkles size={18} />
      <span>OBJECTIVE COMPLETE</span>
      <strong>+{toast.amount} XP</strong>
    </motion.div>
  )
}
