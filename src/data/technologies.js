const technologies = [
  {
    id: 'mfc',
    num: '01',
    name: 'Microbial Fuel Cell',
    icon: 'Zap',
    blurb: 'Electroactive microorganisms oxidize biodegradable material to generate current.',
    how: 'Bacteria growing on an anode oxidize organic compounds in wastewater, transferring electrons through an external circuit to a cathode. This generates a small current while simultaneously treating the liquid.',
    input: 'Filtered urine / wastewater, electroactive biofilm',
    output: 'Low-power electricity, treated effluent, recoverable nutrients',
    advantages: 'Combines treatment and power generation in one step; works on dilute waste streams; no combustion involved.',
    limitations: 'Low power density; sensitive to temperature and microbial health; slow response to load changes.',
    role: 'Primary conversion stage for the urine stream, feeding auxiliary loads and low-power instrumentation.',
    flow: [
      { tag: 'INPUT', icon: 'Package', title: 'Mars habitat waste enters the system', body: 'Filtered urine and wastewater arrive at the microbial fuel cell inlet, ready for biological processing.' },
      { tag: 'PROCESS', icon: 'Filter', title: 'Waste is processed', body: 'The stream is conditioned and delivered into the anode chamber, where a living microbial biofilm awaits.' },
      { tag: 'MICROBES', icon: 'Dna', title: 'Microorganisms break down organic matter', body: 'Electroactive bacteria growing on the anode metabolize organic compounds in the wastewater.' },
      { tag: 'ELECTRONS', icon: 'Zap', title: 'Electrons are released', body: 'As bacteria oxidize the organic material, free electrons are released as a metabolic byproduct.' },
      { tag: 'CIRCUIT', icon: 'CircuitBoard', title: 'Electrons flow through an electrode', body: 'Electrons travel from the anode, through an external circuit, toward the cathode.' },
      { tag: 'ENERGY', icon: 'BatteryCharging', title: 'Electricity is generated', body: 'The steady electron flow produces a small, continuous electrical current.' },
      { tag: 'OUTPUT', icon: 'Home', title: 'Electricity is supplied to the habitat', body: 'Conditioned current feeds auxiliary loads and low-power instrumentation aboard the habitat.' }
    ]
  },
  {
    id: 'dufc',
    num: '02',
    name: 'Direct Urea Fuel Cell',
    icon: 'Droplets',
    blurb: 'Electrochemical oxidation of urea directly, without a microbial intermediary.',
    how: 'A catalytic electrode drives direct electrochemical oxidation of urea molecules present in urine, producing current without relying on a living biofilm culture.',
    input: 'Urea-rich urine',
    output: 'Electrical current, nitrogen byproducts',
    advantages: 'Faster response than microbial systems; no living culture to maintain or keep stable.',
    limitations: 'Reported maximum around 0.19 mW/cm\u00b2 \u2014 a very low areal power density; catalyst cost and long-term durability are open questions.',
    role: 'Alternative / parallel path for urine energy recovery where biological stability is a concern.',
    flow: [
      { tag: 'INPUT', icon: 'Droplets', title: 'Urea-rich urine enters the cell', body: 'Urine containing dissolved urea reaches the direct urea fuel cell inlet.' },
      { tag: 'CONTACT', icon: 'Filter', title: 'Catalytic contact', body: 'The urea solution is brought into contact with a catalytic anode surface.' },
      { tag: 'OXIDATION', icon: 'Zap', title: 'Direct electrochemical oxidation', body: 'Urea molecules are oxidized directly at the electrode, without any living organism involved.' },
      { tag: 'CIRCUIT', icon: 'CircuitBoard', title: 'Electrons flow through the circuit', body: 'Released electrons travel through an external circuit toward the cathode.' },
      { tag: 'BYPRODUCT', icon: 'Wind', title: 'Nitrogen byproducts released', body: 'Nitrogen-containing byproducts are released as the reaction proceeds.' },
      { tag: 'ENERGY', icon: 'BatteryCharging', title: 'Electricity is generated', body: 'A fast-responding electrical current is produced, without any biological lag.' },
      { tag: 'OUTPUT', icon: 'Home', title: 'Auxiliary power delivered', body: 'Current is delivered as a parallel path for urine-stream energy recovery.' }
    ]
  },
  {
    id: 'adfc',
    num: '03',
    name: 'Anaerobic Digestion + Fuel Cell',
    icon: 'Flame',
    blurb: 'Solid waste is digested into methane, then converted to electricity.',
    how: 'Feces and food residues are broken down by anaerobic microbes into biogas (primarily methane), which is then fed into a fuel cell to generate electricity.',
    input: 'Feces, food residues',
    output: 'Methane / biogas \u2192 electricity, digestate (nutrient-rich residue)',
    advantages: 'Handles solid organic waste directly; digestate can support nutrient recovery for the habitat loop.',
    limitations: 'Requires stable temperature and retention time; gas handling adds complexity and leak-risk surface area.',
    role: 'Primary conversion stage for the solid organic stream.',
    flow: [
      { tag: 'INPUT', icon: 'Package', title: 'Organic solid waste is collected', body: 'Feces and food residues are collected and prepared for anaerobic digestion.' },
      { tag: 'DIGESTER', icon: 'Filter', title: 'Sealed digester', body: 'Waste is loaded into an oxygen-free, sealed digester chamber.' },
      { tag: 'MICROBES', icon: 'Dna', title: 'Microbial digestion', body: 'Anaerobic microorganisms break down the organic matter over a controlled retention time.' },
      { tag: 'BIOGAS', icon: 'Wind', title: 'Biogas is produced', body: 'Digestion yields biogas, rich in methane, rising through the chamber.' },
      { tag: 'METHANE', icon: 'Flame', title: 'Methane is routed onward', body: 'Methane-rich gas is captured and routed toward a fuel cell / generator.' },
      { tag: 'ENERGY', icon: 'BatteryCharging', title: 'Electricity is generated', body: 'The fuel cell converts methane chemical energy into electrical current.' },
      { tag: 'OUTPUT', icon: 'Home', title: 'Power and digestate recovered', body: 'Electricity feeds the habitat while nutrient-rich digestate is recovered for reuse.' }
    ]
  },
  {
    id: 'thermo',
    num: '04',
    name: 'Thermochemical Processing',
    icon: 'Thermometer',
    blurb: 'Heat-driven conversion of solids into syngas for fuel-cell use.',
    how: 'Solid residues are thermochemically converted, using heat with limited oxygen, into syngas \u2014 a mixture of combustible gases \u2014 which can be routed to a fuel cell.',
    input: 'Dried solid waste residues',
    output: 'Syngas \u2192 auxiliary electricity, ash / residue',
    advantages: 'Faster throughput than biological digestion; can process a broader range of solid material.',
    limitations: 'High energy input for heating; heat rejection and thermal management inside a sealed habitat is non-trivial.',
    role: 'Alternative solid-stream pathway, particularly where digestion retention time is a constraint.',
    flow: [
      { tag: 'INPUT', icon: 'Package', title: 'Dried solid residues are fed in', body: 'Dried solid waste residues are fed into the thermochemical reactor.' },
      { tag: 'HEATING', icon: 'Thermometer', title: 'Reactor heating', body: 'The reactor raises temperature sharply under limited-oxygen conditions.' },
      { tag: 'CONVERSION', icon: 'Flame', title: 'High-temperature conversion', body: 'Heat drives the breakdown of solids into combustible gases and solid biochar / ash.' },
      { tag: 'SYNGAS', icon: 'Wind', title: 'Syngas is formed', body: 'A mixture of combustible gases \u2014 syngas \u2014 is collected from the reaction.' },
      { tag: 'ROUTING', icon: 'CircuitBoard', title: 'Syngas is routed to a fuel cell', body: 'Syngas is routed to a fuel cell for electrochemical conversion.' },
      { tag: 'ENERGY', icon: 'BatteryCharging', title: 'Auxiliary electricity is produced', body: 'The fuel cell produces auxiliary electrical output from the syngas stream.' },
      { tag: 'OUTPUT', icon: 'Home', title: 'Residue and power recovered', body: 'Electricity supports habitat loads while ash / residue is set aside for disposal or reuse study.' }
    ]
  }
]

export default technologies
