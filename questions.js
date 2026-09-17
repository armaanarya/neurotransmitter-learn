// Each item: q (prompt), a (correct answer), wrong (distractors), why (shown after answering).
// typed: true means the second time you see it, you type the answer instead of picking.
const QUESTIONS = [
  // ---- Function -> neurotransmitter ----
  { q: "Enables muscle action, learning, and memory", a: "Acetylcholine (ACh)", wrong: ["Dopamine", "Glutamate", "Norepinephrine"], why: "ACh enables muscle action, learning, and memory.", typed: true },
  { q: "Influences movement, learning, attention, and emotion", a: "Dopamine", wrong: ["Acetylcholine (ACh)", "Serotonin", "Norepinephrine"], why: "Dopamine influences movement, learning, attention, and emotion.", typed: true },
  { q: "Affects mood, hunger, sleep, and arousal", a: "Serotonin", wrong: ["Norepinephrine", "Dopamine", "Endorphins"], why: "Serotonin affects mood, hunger, sleep, and arousal.", typed: true },
  { q: "Helps control alertness and arousal", a: "Norepinephrine", wrong: ["Serotonin", "GABA", "Acetylcholine (ACh)"], why: "Norepinephrine helps control alertness and arousal.", typed: true },
  { q: "A major INHIBITORY neurotransmitter", a: "GABA", wrong: ["Glutamate", "Substance P", "Dopamine"], why: "GABA (gamma-aminobutyric acid) is the major inhibitory neurotransmitter.", typed: true },
  { q: "A major EXCITATORY neurotransmitter; involved in memory", a: "Glutamate", wrong: ["GABA", "Acetylcholine (ACh)", "Serotonin"], why: "Glutamate is the major excitatory neurotransmitter and is involved in memory.", typed: true },
  { q: "Influence the perception of pain or pleasure", a: "Endorphins", wrong: ["Substance P", "Dopamine", "Serotonin"], why: "Endorphins influence the perception of pain or pleasure.", typed: true },
  { q: "Involved in pain perception and immune response", a: "Substance P", wrong: ["Endorphins", "GABA", "Norepinephrine"], why: "Substance P is involved in pain perception and immune response.", typed: true },

  // ---- Neurotransmitter -> function ----
  { q: "What does ACETYLCHOLINE do?", a: "Enables muscle action, learning, and memory", wrong: ["Helps control alertness and arousal", "Involved in pain perception and immune response", "Affects mood, hunger, sleep, and arousal"], why: "ACh enables muscle action, learning, and memory." },
  { q: "What does DOPAMINE do?", a: "Influences movement, learning, attention, and emotion", wrong: ["Affects mood, hunger, sleep, and arousal", "Enables muscle action, learning, and memory", "Helps control alertness and arousal"], why: "Dopamine influences movement, learning, attention, and emotion." },
  { q: "What does SEROTONIN do?", a: "Affects mood, hunger, sleep, and arousal", wrong: ["Influences movement, learning, attention, and emotion", "Helps control alertness and arousal", "Influences the perception of pain or pleasure"], why: "Serotonin affects mood, hunger, sleep, and arousal." },
  { q: "What does NOREPINEPHRINE do?", a: "Helps control alertness and arousal", wrong: ["Affects mood, hunger, sleep, and arousal", "A major inhibitory neurotransmitter", "Enables muscle action, learning, and memory"], why: "Norepinephrine helps control alertness and arousal." },
  { q: "What does GABA do?", a: "A major inhibitory neurotransmitter", wrong: ["A major excitatory neurotransmitter; involved in memory", "Helps control alertness and arousal", "Involved in pain perception and immune response"], why: "GABA is the major inhibitory neurotransmitter." },
  { q: "What does GLUTAMATE do?", a: "A major excitatory neurotransmitter; involved in memory", wrong: ["A major inhibitory neurotransmitter", "Enables muscle action, learning, and memory", "Influences the perception of pain or pleasure"], why: "Glutamate is the major excitatory neurotransmitter and is involved in memory." },
  { q: "What do ENDORPHINS do?", a: "Influence the perception of pain or pleasure", wrong: ["Involved in pain perception and immune response", "Affects mood, hunger, sleep, and arousal", "A major inhibitory neurotransmitter"], why: "Endorphins influence the perception of pain or pleasure." },
  { q: "What does SUBSTANCE P do?", a: "Involved in pain perception and immune response", wrong: ["Influences the perception of pain or pleasure", "A major excitatory neurotransmitter; involved in memory", "Helps control alertness and arousal"], why: "Substance P is involved in pain perception and immune response." },

  // ---- Oversupply / undersupply: which direction? ----
  { q: "Schizophrenia is linked to ______ of dopamine.", a: "Oversupply", wrong: ["Undersupply"], why: "OVERsupply of dopamine → schizophrenia. (UNDERsupply → Parkinson's.)" },
  { q: "Parkinson's disease (tremors, decreased mobility) is linked to ______ of dopamine.", a: "Undersupply", wrong: ["Oversupply"], why: "UNDERsupply of dopamine → Parkinson's. (OVERsupply → schizophrenia.)" },
  { q: "Depression is linked to ______ of serotonin.", a: "Undersupply", wrong: ["Oversupply"], why: "UNDERsupply of serotonin → depression, so drugs that RAISE serotonin treat it." },
  { q: "A depressed mood can come from ______ of norepinephrine.", a: "Undersupply", wrong: ["Oversupply"], why: "UNDERsupply of norepinephrine can depress mood." },
  { q: "Seizures, tremors, and insomnia are linked to ______ of GABA.", a: "Undersupply", wrong: ["Oversupply"], why: "GABA is inhibitory (the brakes). Too LITTLE → seizures, tremors, insomnia." },
  { q: "Migraines or seizures from an overstimulated brain come from ______ of glutamate.", a: "Oversupply", wrong: ["Undersupply"], why: "Glutamate is excitatory (the gas). Too MUCH → overstimulation, migraines, seizures." },
  { q: "Opioid drugs create ______ of endorphins, which suppresses the body's natural endorphin supply.", a: "Oversupply", wrong: ["Undersupply"], why: "OVERsupply with opioids → the body cuts back its own endorphin production." },
  { q: "Chronic pain can result from ______ of Substance P.", a: "Oversupply", wrong: ["Undersupply"], why: "OVERsupply of Substance P → chronic pain." },

  // ---- Disorder -> neurotransmitter + direction ----
  { q: "Schizophrenia", a: "Oversupply of dopamine", wrong: ["Undersupply of dopamine", "Oversupply of glutamate", "Undersupply of serotonin"], why: "OVERsupply of dopamine → schizophrenia." },
  { q: "Parkinson's disease (tremors and decreased mobility)", a: "Undersupply of dopamine", wrong: ["Oversupply of dopamine", "Undersupply of GABA", "Undersupply of acetylcholine"], why: "UNDERsupply of dopamine → Parkinson's tremors and decreased mobility." },
  { q: "Depression (drugs that raise this neurotransmitter are used to treat it)", a: "Undersupply of serotonin", wrong: ["Oversupply of serotonin", "Oversupply of dopamine", "Undersupply of GABA"], why: "UNDERsupply of serotonin → depression; SSRIs raise serotonin." },
  { q: "Depressed mood (the alertness/arousal neurotransmitter)", a: "Undersupply of norepinephrine", wrong: ["Oversupply of norepinephrine", "Oversupply of glutamate", "Undersupply of Substance P"], why: "UNDERsupply of norepinephrine can depress mood." },
  { q: "Seizures, tremors, and insomnia", a: "Undersupply of GABA", wrong: ["Oversupply of GABA", "Oversupply of dopamine", "Undersupply of glutamate"], why: "UNDERsupply of GABA → seizures, tremors, insomnia." },
  { q: "Brain overstimulation producing migraines or seizures", a: "Oversupply of glutamate", wrong: ["Undersupply of glutamate", "Oversupply of GABA", "Oversupply of Substance P"], why: "OVERsupply of glutamate → overstimulation, migraines, seizures." },
  { q: "The body's natural endorphin supply gets suppressed", a: "Oversupply of endorphins (from opioid drugs)", wrong: ["Undersupply of endorphins", "Oversupply of Substance P", "Undersupply of serotonin"], why: "OVERsupply with opioid drugs suppresses natural endorphins." },
  { q: "Chronic pain", a: "Oversupply of Substance P", wrong: ["Undersupply of Substance P", "Oversupply of endorphins", "Undersupply of GABA"], why: "OVERsupply of Substance P → chronic pain." },
  { q: "Alzheimer's disease", a: "Acetylcholine-producing neurons deteriorate", wrong: ["Oversupply of dopamine", "Oversupply of glutamate", "Undersupply of GABA"], why: "With Alzheimer's, ACh-producing neurons deteriorate." },

  // ---- Neurotransmitter + direction -> result ----
  { q: "OVERSUPPLY of dopamine →", a: "Schizophrenia", wrong: ["Parkinson's disease", "Chronic pain", "Depression"], why: "Dopamine: too much → schizophrenia; too little → Parkinson's." },
  { q: "UNDERSUPPLY of dopamine →", a: "Tremors and decreased mobility (Parkinson's)", wrong: ["Schizophrenia", "Seizures, tremors, and insomnia", "Depressed mood"], why: "Dopamine: too little → Parkinson's; too much → schizophrenia." },
  { q: "UNDERSUPPLY of serotonin →", a: "Depression", wrong: ["Schizophrenia", "Chronic pain", "Migraines or seizures"], why: "Too little serotonin → depression." },
  { q: "UNDERSUPPLY of norepinephrine →", a: "Depressed mood", wrong: ["Insomnia and tremors", "Schizophrenia", "Chronic pain"], why: "Too little norepinephrine can depress mood." },
  { q: "UNDERSUPPLY of GABA →", a: "Seizures, tremors, and insomnia", wrong: ["Tremors and decreased mobility (Parkinson's)", "Depressed mood", "Chronic pain"], why: "Too little GABA (the brakes) → seizures, tremors, insomnia." },
  { q: "OVERSUPPLY of glutamate →", a: "Overstimulated brain: migraines or seizures", wrong: ["Schizophrenia", "Chronic pain", "Suppressed natural endorphins"], why: "Too much glutamate (the gas) → migraines or seizures." },
  { q: "OVERSUPPLY of endorphins (opioid drugs) →", a: "Suppresses the body's natural endorphin supply", wrong: ["Chronic pain", "Schizophrenia", "Seizures, tremors, and insomnia"], why: "Opioids flood endorphin receptors, so the body makes fewer of its own." },
  { q: "OVERSUPPLY of Substance P →", a: "Chronic pain", wrong: ["Suppresses the body's natural endorphin supply", "Migraines or seizures", "Depression"], why: "Too much Substance P → chronic pain." },
];

// Extra spellings accepted in typed answers (compared after lowercasing and removing non-letters).
const ALIASES = {
  "Acetylcholine (ACh)": ["acetylcholine", "ach"],
  "GABA": ["gammaaminobutyricacid"],
  "Endorphins": ["endorphin"],
  "Substance P": ["substancep", "p"],
};

const TABLE = [
  ["Acetylcholine (ACh)", "Enables muscle action, learning, and memory", "Alzheimer's: ACh-producing neurons deteriorate."],
  ["Dopamine", "Influences movement, learning, attention, and emotion", "OVER → schizophrenia. UNDER → tremors, decreased mobility (Parkinson's)."],
  ["Serotonin", "Affects mood, hunger, sleep, and arousal", "UNDER → depression. Drugs that raise serotonin treat depression."],
  ["Norepinephrine", "Helps control alertness and arousal", "UNDER → depressed mood."],
  ["GABA", "A major inhibitory neurotransmitter", "UNDER → seizures, tremors, insomnia."],
  ["Glutamate", "A major excitatory neurotransmitter; involved in memory", "OVER → overstimulated brain, migraines or seizures."],
  ["Endorphins", "Influence the perception of pain or pleasure", "OVER (opioid drugs) → suppresses natural endorphin supply."],
  ["Substance P", "Involved in pain perception and immune response", "OVER → chronic pain."],
];
