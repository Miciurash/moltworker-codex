import { describe, expect, it } from 'vitest';
import { resolveOpenAIApiKey, hasAiProviderConfig } from './ai-provider';
import { createMockEnv } from './test-utils';

describe('resolveOpenAIApiKey', () => {
  it('prefers OPENAI_API_KEY when both OpenAI-compatible secrets are set', () => {
    const env = createMockEnv({
      OPENAI_API_KEY: 'sk-openai',
      CODEX_API_KEY: 'sk-codex',
    });

    expect(resolveOpenAIApiKey(env)).toBe('sk-openai');
  });

  it('falls back to CODEX_API_KEY when OPENAI_API_KEY is not set', () => {
    const env = createMockEnv({
      CODEX_API_KEY: 'sk-codex',
    });

    expect(resolveOpenAIApiKey(env)).toBe('sk-codex');
  });
});

describe('hasAiProviderConfig', () => {
  it('returns false when no provider credentials are configured', () => {
    expect(hasAiProviderConfig(createMockEnv())).toBe(false);
  });

  it('treats CODEX_API_KEY as a valid OpenAI-compatible provider credential', () => {
    const env = createMockEnv({
      CODEX_API_KEY: 'sk-codex',
    });

    expect(hasAiProviderConfig(env)).toBe(true);
  });
});
