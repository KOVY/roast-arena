import { describe, it, expect } from 'vitest'
import { buildRoastPrompt, ROAST_STYLES } from '../../shared/utils/ai-prompts'

describe('AI Prompts Utils', () => {
  describe('buildRoastPrompt', () => {
    it('should build playful roast prompt', () => {
      const prompt = buildRoastPrompt('test subject', 'playful')
      expect(prompt).toContain('playful')
      expect(prompt).toContain('test subject')
    })

    it('should build savage roast prompt', () => {
      const prompt = buildRoastPrompt('test subject', 'savage')
      expect(prompt).toContain('savage')
      expect(prompt).toContain('brutal')
    })

    it('should build sarcastic roast prompt', () => {
      const prompt = buildRoastPrompt('test subject', 'sarcastic')
      expect(prompt).toContain('sarcastic')
      expect(prompt).toContain('wit')
    })

    it('should build wholesome roast prompt', () => {
      const prompt = buildRoastPrompt('test subject', 'wholesome')
      expect(prompt).toContain('wholesome')
      expect(prompt).toContain('positive')
    })

    it('should default to playful style', () => {
      const prompt = buildRoastPrompt('test subject')
      expect(prompt).toContain('playful')
    })

    it('should include character limit in prompt', () => {
      const prompt = buildRoastPrompt('test')
      expect(prompt).toContain('280 characters')
    })
  })

  describe('ROAST_STYLES', () => {
    it('should have all required style properties', () => {
      Object.values(ROAST_STYLES).forEach((style) => {
        expect(style).toHaveProperty('name')
        expect(style).toHaveProperty('description')
        expect(style).toHaveProperty('systemPrompt')
      })
    })
  })
})
