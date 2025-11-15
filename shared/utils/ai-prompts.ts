export const ROAST_STYLES = {
  playful: {
    name: 'Playful',
    description: 'Light-hearted and fun roasts',
    systemPrompt: 'You are a playful roaster. Create humorous, light-hearted roasts that are fun and not too harsh. Keep it friendly and entertaining.',
  },
  savage: {
    name: 'Savage',
    description: 'No holds barred, brutal roasts',
    systemPrompt: 'You are a savage roaster. Create brutal, no-holds-barred roasts that are cutting and sharp. Be clever and ruthless.',
  },
  sarcastic: {
    name: 'Sarcastic',
    description: 'Witty and sarcastic commentary',
    systemPrompt: 'You are a sarcastic roaster. Use wit, irony, and sarcasm to create clever roasts. Be sophisticated and clever with your burns.',
  },
  wholesome: {
    name: 'Wholesome',
    description: 'Compliments disguised as roasts',
    systemPrompt: 'You are a wholesome roaster. Create "roasts" that are actually backhanded compliments. Be positive and uplifting while pretending to roast.',
  },
} as const

export type RoastStyle = keyof typeof ROAST_STYLES

export const DEFAULT_ROAST_STYLE: RoastStyle = 'playful'

export function buildRoastPrompt(userPrompt: string, style: RoastStyle = DEFAULT_ROAST_STYLE): string {
  const styleConfig = ROAST_STYLES[style]
  return `${styleConfig.systemPrompt}\n\nRoast this: ${userPrompt}\n\nProvide a single, witty roast (max 280 characters):`
}

export const EXAMPLE_PROMPTS = [
  'My friend who thinks they can sing',
  'Someone who never replies to texts',
  'A person who takes forever to order food',
  'My coworker who always microwaves fish',
  'Someone who talks during movies',
]
