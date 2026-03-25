import type { MoltbotEnv } from './types';

type OpenAIApiKeyEnv = Pick<MoltbotEnv, 'OPENAI_API_KEY' | 'CODEX_API_KEY'>;

type AiProviderEnv = Pick<
  MoltbotEnv,
  | 'AI_GATEWAY_API_KEY'
  | 'AI_GATEWAY_BASE_URL'
  | 'ANTHROPIC_API_KEY'
  | 'CF_AI_GATEWAY_ACCOUNT_ID'
  | 'CF_AI_GATEWAY_GATEWAY_ID'
  | 'CLOUDFLARE_AI_GATEWAY_API_KEY'
  | 'CODEX_API_KEY'
  | 'OPENAI_API_KEY'
>;

/**
 * Codex-generated keys authenticate against the standard OpenAI API, so we
 * accept CODEX_API_KEY as a convenience alias for OPENAI_API_KEY.
 */
export function resolveOpenAIApiKey(env: OpenAIApiKeyEnv): string | undefined {
  return env.OPENAI_API_KEY ?? env.CODEX_API_KEY;
}

export function hasAiProviderConfig(env: AiProviderEnv): boolean {
  const hasCloudflareGateway = Boolean(
    env.CLOUDFLARE_AI_GATEWAY_API_KEY &&
    env.CF_AI_GATEWAY_ACCOUNT_ID &&
    env.CF_AI_GATEWAY_GATEWAY_ID,
  );
  const hasLegacyGateway = Boolean(env.AI_GATEWAY_API_KEY && env.AI_GATEWAY_BASE_URL);
  const hasAnthropicKey = Boolean(env.ANTHROPIC_API_KEY);
  const hasOpenAIKey = Boolean(resolveOpenAIApiKey(env));

  return hasCloudflareGateway || hasLegacyGateway || hasAnthropicKey || hasOpenAIKey;
}
