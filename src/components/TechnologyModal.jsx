import RealtimeTechnologySimulation from './RealtimeTechnologySimulation.jsx'

export default function TechnologyModal({ tech, onClose }) {
  return <RealtimeTechnologySimulation method={tech.id} onClose={onClose} />
}
