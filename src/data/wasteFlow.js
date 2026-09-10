const wasteFlow = [
  {
    name: 'ASTRONAUT WASTE',
    title: 'Astronaut waste',
    body: 'Urine, feces and food residues are generated continuously aboard the habitat. Each stream has a distinct chemistry and is handled separately from the point of collection.'
  },
  {
    name: 'COLLECT + SEPARATE',
    title: 'Collect + separate',
    body: 'Waste is captured at the source and split into liquid (urine) and solid (feces, food residue) streams, since each requires a different downstream process.'
  },
  {
    name: 'PRETREAT + STABILIZE',
    title: 'Pretreat + stabilize',
    body: 'Streams are filtered, stabilized and conditioned before conversion \u2014 removing solids from urine, adjusting pH, and preventing microbial spoilage in transit.'
  },
  {
    name: 'CONVERT',
    title: 'Convert',
    body: 'Liquid waste passes through microbial fuel cells or a direct urea fuel cell; solid waste undergoes anaerobic digestion or thermochemical conversion to methane / syngas.'
  },
  {
    name: 'CONDITION POWER',
    title: 'Condition power',
    body: 'Raw electrochemical output is small and variable, so it is conditioned \u2014 regulated, filtered and matched \u2014 before it can charge a battery or power a load.'
  },
  {
    name: 'RECOVER RESOURCES',
    title: 'Recover resources',
    body: "Beyond electricity, the process yields recovered water and nutrient-rich residue, both routed back into the habitat's ECLSS loop."
  }
]

export default wasteFlow
