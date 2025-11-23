export interface NPCDialogue {
  npcName: string;
  archetype: string;
  shortBark: string;
  mainDialogue: string;
  reactionToHelp: string;
  visualDescription: string;
}

export enum Tone {
  Desperate = "Desperate",
  Confused = "Confused",
  Suspicious = "Suspicious",
  Relieved = "Relieved",
  Arrogant = "Arrogant",
  Mysterious = "Mysterious",
  Injured = "Injured"
}

export enum Setting {
  Forest = "Deep Ancient Forest",
  Desert = "Scorching Desert",
  City = "Bustling Cyberpunk City",
  Dungeon = "Dark Dungeon",
  Space = "Abandoned Space Station",
  Tavern = "Roadside Tavern",
  Mountain = "Snowy Mountain Pass"
}

export interface GenerationParams {
  setting: string;
  tone: string;
  context: string; // Specific plight or details
}