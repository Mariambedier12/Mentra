import { SessionData } from "../types/session";

export const mockSession: SessionData = {
  sessionId: 1,
  documentId: 1,
  duration: 40 * 60, // Mild = 40 دقيقة
  summary: {
    title: "Core Concepts",
    points: [
      { heading: "Information Processing", text: "Compares the human mind to a computer, suggesting that we receive information, process it, and deliver an output." },
      { heading: "Neuroscience & Behavior", text: "Explores the physical brain structures that support specific cognitive functions, mapping executive control to the prefrontal cortex." },
      { heading: "Selective Attention", text: "The process of focusing on a particular object in the environment for a certain period of time while ignoring irrelevant information." },
      { heading: "Memory Encoding", text: "The crucial first step to creating a new memory, where sensory input is transformed into a form that can be stored in the brain." },
    ],
  },
};