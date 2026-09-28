#!/usr/bin/env bash
set -euo pipefail

echo "=== WEB FASE 30D1 · HOTFIX WHATSAPP DINAMICO ==="
test -f src/utils/whatsapp.ts
grep -q 'crmWhatsappDelegate' src/utils/whatsapp.ts
grep -q 'document.addEventListener("click"' src/utils/whatsapp.ts
grep -q 'Ref. web:' src/utils/whatsapp.ts
echo "WEB 30D1: estructura OK"
npm run build
echo "WEB FASE 30D1 VALIDADA"
