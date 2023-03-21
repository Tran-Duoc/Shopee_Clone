import React, { useRef, useState } from 'react'
import { arrow, FloatingPortal, useFloating, shift, offset } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children?: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
}

export default function Popover({ children, className, renderPopover }: Props) {
  const arrowRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState<boolean>(false)
  const { x, y, strategy, refs, middlewareData } = useFloating({
    open: open,
    onOpenChange: setOpen,
    middleware: [arrow({ element: arrowRef }), shift(), offset(10)],
    placement: 'bottom-end'
  })
  return (
    <div
      // className=' flex cursor-pointer items-center py-1 text-white  hover:text-gray-300 '
      className={className}
      ref={refs.setReference}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content'
              }}
            >
              <div
                ref={arrowRef}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
                className='absolute z-10  -translate-y-[95%] border-[11px] border-x-transparent  border-t-transparent border-b-white'
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
