#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(pwd)"
echo "=== VERIFICANDO ARCHIVOS WEB -> CRM ==="
test -f src/components/hero/heroAssistantPanel.ts
test -f src/components/hero/heroAssistantData.ts
test -f src/pages/especializacion.ts
test -f src/utils/lead-delivery.ts
test -f api/send-cookito-lead.ts
test -f api/specialization-lead.ts
test -f server/crm-web-lead.ts
! grep -R "api.web3forms.com/submit" -n src/components/hero/heroAssistantData.ts src/pages/especializacion.ts

grep -q 'LEAD_ENDPOINT = "/api/send-cookito-lead"' src/components/hero/heroAssistantData.ts
grep -q 'LEAD_ENDPOINT = "/api/specialization-lead"' src/pages/especializacion.ts

echo "Archivos correctos. Ejecuta npm run build desde la raíz real de web-cooking."
