import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrolled } from '@/hooks/useScrolled'

export function ScrollToTopButton() {
  const visible = useScrolled(400)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed right-5 bottom-5 z-40"
        >
          <Button
            size="icon"
            aria-label="Voltar ao topo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="size-11 rounded-full shadow-lg"
          >
            <ArrowUp />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
