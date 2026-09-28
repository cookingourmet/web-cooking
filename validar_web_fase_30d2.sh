#!/usr/bin/env bash
set -euo pipefail

echo "=== WEB FASE 30D2 · COOKITO WHATSAPP DIRECT TRACK ==="

test -f src/utils/whatsapp.ts
test -f src/components/hero/heroAssistantPanel.ts

grep -q 'bindTrackedWhatsAppAnchor' src/utils/whatsapp.ts
grep -q 'data-assistant-window' src/utils/whatsapp.ts
grep -q 'bindTrackedWhatsAppAnchor' src/components/hero/heroAssistantPanel.ts

echo "WEB 30D2: estructura OK"

npm run build

echo "WEB FASE 30D2 VALIDADA"
