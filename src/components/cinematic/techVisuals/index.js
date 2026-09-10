import MicrobialFuelCellAnimation from './MicrobialFuelCellAnimation.jsx'
import UreaFuelCellAnimation from './UreaFuelCellAnimation.jsx'
import AnaerobicDigestionAnimation from './AnaerobicDigestionAnimation.jsx'
import ThermochemicalAnimation from './ThermochemicalAnimation.jsx'

// Maps each technology's id (from src/data/technologies.js) to its own
// dedicated cinematic process animation component. Every technology gets a
// scientifically distinct sequence — nothing here is a generic reused clip.
const techVisuals = {
  mfc: MicrobialFuelCellAnimation,
  dufc: UreaFuelCellAnimation,
  adfc: AnaerobicDigestionAnimation,
  thermo: ThermochemicalAnimation
}

export default techVisuals
