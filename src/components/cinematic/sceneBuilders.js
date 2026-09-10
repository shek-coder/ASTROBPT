// Turns the site's existing content (technologies, waste flow, roadmap,
// safety params, challenges, waste streams, the habitat loop) into the
// scene arrays CinematicModal expects. Keeping this logic in one place
// means every card type gets its own distinct animation while reusing the
// same rendering engine, per the "data-driven scenes" approach.

const ROTATING_ICONS = ['Package', 'Filter', 'Dna', 'Zap', 'CircuitBoard', 'BatteryCharging', 'Recycle', 'Droplets']

export function buildTechScenes(tech) {
  return [
    { key: 'intro', kind: 'intro', tag: `TECHNOLOGY ${tech.num}`, title: tech.name, body: tech.blurb },
    ...tech.flow.map((f, i) => ({
      key: `stage-${i}`, kind: 'stage', tag: f.tag, title: f.title, body: f.body, icon: f.icon
    })),
    {
      key: 'impact',
      kind: 'impact',
      tag: 'HABITAT ROLE',
      title: 'Why it matters for the habitat',
      body: `${tech.role} Advantages: ${tech.advantages} Limitations: ${tech.limitations}`
    }
  ]
}

export function buildWasteFlowScenes(wasteFlow) {
  const iconFor = {
    'ASTRONAUT WASTE': 'Trash2',
    'COLLECT + SEPARATE': 'Filter',
    'PRETREAT + STABILIZE': 'FlaskConical',
    CONVERT: 'Zap',
    'CONDITION POWER': 'CircuitBoard',
    'RECOVER RESOURCES': 'Recycle'
  }
  return [
    { key: 'intro', kind: 'intro', tag: 'SYSTEM OVERVIEW', title: 'Interactive waste flow', body: 'Follow astronaut waste as it moves through every stage of the recovery system.' },
    ...wasteFlow.map((s, i) => ({
      key: `stage-${i}`, kind: 'stage', tag: s.name.length > 14 ? `STAGE ${i + 1}` : s.name, title: s.title, body: s.body, icon: iconFor[s.name] || ROTATING_ICONS[i % ROTATING_ICONS.length]
    })),
    { key: 'impact', kind: 'impact', tag: 'CLOSED LOOP', title: 'Nothing leaves the loop', body: 'Every stage feeds the next — the end result is electricity, water and nutrients returned to the habitat instead of waste discarded.' }
  ]
}

export function buildStreamScenes(streamLabel, steps, note) {
  return [
    { key: 'intro', kind: 'intro', tag: 'WASTE STREAM', title: streamLabel, body: 'Follow this stream from collection to recovered resource.' },
    ...steps.map((label, i) => ({
      key: `stage-${i}`, kind: 'stage', tag: `STEP ${i + 1}`, title: label, icon: ROTATING_ICONS[i % ROTATING_ICONS.length],
      body: i === 0 ? 'The stream begins here, generated continuously aboard the habitat.'
        : i === steps.length - 1 ? 'Resources are recovered and routed back into the habitat loop.'
        : `The stream moves onward: ${label.toLowerCase()}.`
    })),
    { key: 'impact', kind: 'impact', tag: 'DETAIL', title: 'How this stream works', body: note }
  ]
}

const ROADMAP_ICONS = { LAB: 'FlaskConical', OPTIMIZE: 'Gauge', MICROGRAVITY: 'Orbit', 'GROUND ANALOG': 'Satellite', 'FLIGHT DEMO': 'Rocket', HABITAT: 'Home' }

export function buildRoadmapScenes(roadmap) {
  return [
    { key: 'intro', kind: 'intro', tag: 'DEVELOPMENT ROADMAP', title: 'From lab bench to habitat', body: 'Six stages carry this concept from lab validation to full Mars habitat deployment.' },
    ...roadmap.map((r, i) => ({
      key: `stage-${i}`, kind: 'stage', tag: r.stage, title: r.title, body: r.desc, icon: ROADMAP_ICONS[r.stage] || 'Milestone'
    })),
    { key: 'impact', kind: 'impact', tag: 'STATUS', title: 'Where this stands today', body: 'Each stage builds confidence before the system is trusted with real habitat life support.' }
  ]
}

export function buildChallengeScenes(challenge) {
  return [
    { key: 'intro', kind: 'intro', tag: 'MISSION RISK', title: challenge.name, body: 'An engineering challenge the system must be designed around before Mars deployment.' },
    { key: 'stage-0', kind: 'stage', tag: 'RISK', title: challenge.name, body: 'This is a known constraint identified in the waste-to-energy loop.', icon: 'AlertTriangle' },
    { key: 'stage-1', kind: 'stage', tag: 'WHY IT MATTERS', title: 'Engineering context', body: challenge.detail, icon: 'FlaskConical' },
    { key: 'stage-2', kind: 'stage', tag: 'RESPONSE', title: 'Designing around it', body: 'Redundancy, containment and careful energy accounting are built in around this constraint rather than assumed away.', icon: 'ShieldAlert' },
    { key: 'impact', kind: 'impact', tag: 'NET EFFECT', title: 'Net energy accounting', body: 'NET ENERGY = CHEMICAL ENERGY CONVERTED \u2212 AUXILIARY ENERGY. Every challenge above is a term that can erode that balance.' }
  ]
}

export function buildSafetyScenes(param) {
  return [
    { key: 'intro', kind: 'intro', tag: 'SAFETY MONITOR', title: param.name, body: param.note },
    { key: 'stage-0', kind: 'stage', tag: 'HAZARD DETECTED', title: 'Continuous sensing', body: `The system continuously senses ${param.name} across the processing loop.`, icon: 'AlertTriangle' },
    { key: 'stage-1', kind: 'stage', tag: 'SENSORS', title: 'Sensor network', body: 'Dedicated sensors, isolated from primary habitat systems, report readings in real time.', icon: 'Radar' },
    { key: 'stage-2', kind: 'stage', tag: 'WARNING', title: param.status === 'warning' ? 'Elevated reading flagged' : 'Nominal reading confirmed', body: param.status === 'warning' ? `${param.name} is currently reading outside the nominal band and has been flagged for review.` : `${param.name} is currently within its nominal operating band.`, icon: 'ShieldAlert' },
    { key: 'stage-3', kind: 'stage', tag: 'ISOLATION', title: 'Containment ready', body: 'If a reading crosses threshold, the affected stage can be isolated from the rest of the loop.', icon: 'Lock' },
    { key: 'stage-4', kind: 'stage', tag: 'SAFE PROCESSING', title: 'Safe operation maintained', body: 'The conversion system is designed to never become a single point of failure for ECLSS or primary power.', icon: 'CheckCircle2' },
    { key: 'impact', kind: 'impact', tag: 'CONTAINMENT', title: 'Safety containment active', body: 'Values shown across the dashboard are simulated for this prototype, but the monitoring architecture reflects the real containment approach.' }
  ]
}

export function buildHabitatScene() {
  return [
    { key: 'intro', kind: 'intro', tag: 'CLOSED-LOOP HABITAT', title: 'Nothing is simply waste', body: 'A single closed-loop view of how astronaut waste feeds back into the systems that keep the crew alive.' },
    { key: 'stage-0', kind: 'stage', tag: 'HABITAT', title: 'Mars habitat', body: 'The crew lives and works inside a sealed, closed-loop habitat.', icon: 'Home' },
    { key: 'stage-1', kind: 'stage', tag: 'ASTRONAUTS', title: 'Astronaut activity', body: 'Daily crew activity — eating, drinking, working — continuously generates waste streams.', icon: 'Users' },
    { key: 'stage-2', kind: 'stage', tag: 'WASTE', title: 'Waste generation', body: 'Urine, feces and food residues are collected at the source.', icon: 'Trash2' },
    { key: 'stage-3', kind: 'stage', tag: 'PROCESSING', title: 'Resource recovery system', body: 'Waste is routed through the conversion pathways covered elsewhere on this page.', icon: 'Recycle' },
    { key: 'stage-4', kind: 'stage', tag: 'ENERGY RECOVERY', title: 'Energy, water and nutrients', body: 'The system recovers auxiliary electricity, clean water and nutrient-rich residue.', icon: 'Zap' },
    { key: 'stage-5', kind: 'stage', tag: 'HABITAT POWER', title: 'Back to the habitat', body: 'Recovered resources feed ECLSS, sensors and food-growth systems — closing the loop.', icon: 'Home' },
    { key: 'impact', kind: 'impact', tag: 'PHILOSOPHY', title: 'A closed-loop habitat', body: '\u201cNothing is simply waste in a closed-loop habitat.\u201d Every output becomes another system\u2019s input.' }
  ]
}
