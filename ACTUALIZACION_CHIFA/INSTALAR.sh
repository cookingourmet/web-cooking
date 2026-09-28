#!/usr/bin/env bash
set -euo pipefail

PAQUETE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROYECTO="${1:-/d/web/web-cooking}"

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

test -f "$PROYECTO/package.json" || fail "No encuentro el proyecto: $PROYECTO"
test -f "$PAQUETE/ARCHIVOS.txt" || fail "Falta ARCHIVOS.txt en el paquete."
test -f "$PAQUETE/ORIGINALES.sha256" || fail "Falta ORIGINALES.sha256 en el paquete."
test -f "$PAQUETE/VERSION_ANTERIOR.sha256" || fail "Falta VERSION_ANTERIOR.sha256 en el paquete."

hash_for() {
  local manifest="$1"
  local file="$2"
  awk -v f="$file" '$2 == f { print $1; exit }' "$manifest"
}

cd "$PROYECTO"

echo "=========================================="
echo "VALIDANDO VERSIÓN DEL PROYECTO"
echo "=========================================="

while IFS= read -r ARCHIVO; do
  [ -n "$ARCHIVO" ] || continue
  test -f "$ARCHIVO" || fail "No encuentro el archivo requerido: $ARCHIVO"

  ACTUAL="$(sha256sum "$ARCHIVO" | awk '{print $1}')"
  ORIGINAL="$(hash_for "$PAQUETE/ORIGINALES.sha256" "$ARCHIVO")"
  ANTERIOR="$(hash_for "$PAQUETE/VERSION_ANTERIOR.sha256" "$ARCHIVO")"
  NUEVO="$(sha256sum "$PAQUETE/$ARCHIVO" | awk '{print $1}')"

  if [ "$ACTUAL" != "$ORIGINAL" ] && [ "$ACTUAL" != "$ANTERIOR" ] && [ "$ACTUAL" != "$NUEVO" ]; then
    echo "Archivo con cambios no reconocidos: $ARCHIVO"
    echo "No se sobrescribió nada."
    exit 1
  fi
done < "$PAQUETE/ARCHIVOS.txt"

RESPALDO="$PROYECTO/respaldo_cooking_chifa_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf "$RESPALDO" -T "$PAQUETE/ARCHIVOS.txt"

echo "Respaldo guardado: $RESPALDO"

echo "=========================================="
echo "APLICANDO ACTUALIZACIÓN"
echo "=========================================="

while IFS= read -r ARCHIVO; do
  [ -n "$ARCHIVO" ] || continue
  mkdir -p "$(dirname "$PROYECTO/$ARCHIVO")"
  cp "$PAQUETE/$ARCHIVO" "$PROYECTO/$ARCHIVO"
done < "$PAQUETE/ARCHIVOS.txt"

if [ ! -d node_modules ]; then
  npm ci
fi

npm run build

echo "=========================================="
echo "ACTUALIZACIÓN COMPLETADA"
echo "=========================================="
echo "Proyecto compilado y listo para publicar."
echo "Revisa LEEME.txt para los nombres finales de las imágenes."
