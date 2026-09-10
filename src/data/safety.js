const safetyParams = [
  { name: 'CH\u2084 / Methane', status: 'normal', note: 'Tracks flammable biogas concentration from the anaerobic digester and fuel-cell loop.' },
  { name: 'H\u2082S', status: 'normal', note: 'Tracks hydrogen sulfide, a toxic gas that can form during anaerobic breakdown of solids.' },
  { name: 'H\u2082', status: 'normal', note: 'Tracks hydrogen gas, a flammable byproduct of several conversion pathways.' },
  { name: 'CO', status: 'normal', note: 'Tracks carbon monoxide, a byproduct risk of thermochemical / syngas processing.' },
  { name: 'Ammonia', status: 'warning', note: 'Tracks ammonia off-gassing from urine and nitrogen-rich digestate.' },
  { name: 'Pressure', status: 'normal', note: 'Tracks internal pressure across sealed digester and gas-handling vessels.' },
  { name: 'Temperature', status: 'normal', note: 'Tracks process temperature to keep microbial cultures and reactors within safe bounds.' },
  { name: 'Leakage', status: 'normal', note: 'Tracks containment integrity across every processing stage and seal.' }
]

export default safetyParams
