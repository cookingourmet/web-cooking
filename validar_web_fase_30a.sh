#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
test -f api/cookito-chat.ts
test -f src/utils/cookito-crm-chat.ts
grep -q 'CRM_WEB_CHAT_URL' api/cookito-chat.ts
grep -q 'sendCookitoCrmMessage' src/components/hero/heroAssistantPanel.ts
grep -q 'crmChatToken' src/components/hero/heroAssistantTypes.ts
if grep -q 'server/crm-web-lead' api/send-cookito-lead.ts; then
  echo 'ERROR: send-cookito-lead conserva el import que fallo en Vercel.' >&2
  exit 1
fi
echo 'WEB FASE 30A: estructura OK'
npm run build
