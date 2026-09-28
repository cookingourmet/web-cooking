#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "=== WEB FASE 30D · TRACK WHATSAPP ==="
test -f api/track-whatsapp-click.ts
test -f src/utils/whatsapp.ts
grep -q 'track-whatsapp-click' src/utils/whatsapp.ts
grep -q 'Ref. web:' src/utils/whatsapp.ts
grep -q 'CRM_WEB_LEAD_TOKEN' api/track-whatsapp-click.ts
grep -q 'whatsapp-click' api/track-whatsapp-click.ts
echo "WEB FASE 30D: estructura OK"

npm run build

echo "WEB FASE 30D VALIDADA"
