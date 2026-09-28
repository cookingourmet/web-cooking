#!/usr/bin/env bash
set -euo pipefail

PROYECTO="${1:-/d/web/web-cooking}"

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

test -f "$PROYECTO/package.json" || fail "No encuentro el proyecto: $PROYECTO"
test -f "$PROYECTO/src/pages/especializacion.ts" || fail "No encuentro src/pages/especializacion.ts"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
test -f "$SCRIPT_DIR/src/pages/especializacion.ts" || fail "El ZIP está incompleto."

cd "$PROYECTO"

echo "=========================================="
echo "ACTUALIZACIÓN: FONDO LIMPIO COCINA CHIFA"
echo "=========================================="

RESPALDO="respaldo_antes_fondo_chifa_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf "$RESPALDO" src/pages/especializacion.ts
echo "Respaldo: $PROYECTO/$RESPALDO"

cp "$SCRIPT_DIR/src/pages/especializacion.ts" src/pages/especializacion.ts

echo "Fondo del hero actualizado:"
echo "- degradado negro simple"
echo "- sin luces radiales"
echo "- sin patrón decorativo"
echo "- sin canvas/efecto animado"
echo "- contenido, chef y formulario conservados"

# Compatibilidad con la actualización anterior: crea los nombres finales
# solo cuando aún existen las imágenes con los nombres antiguos.
mkdir -p public/images/portada/talleres public/images/especializacion

copy_alias_if_possible() {
  local origen="$1"
  local destino="$2"
  if [ ! -f "$destino" ] && [ -f "$origen" ]; then
    cp "$origen" "$destino"
    echo "Compatibilidad: creado $destino"
  fi
}

copy_alias_if_possible \
  public/images/portada/nuevos-talleres/pasteleria-comercial.jpeg \
  public/images/portada/talleres/fast-food.jpg

copy_alias_if_possible \
  public/images/portada/nuevos-talleres/petit-four.jpeg \
  public/images/portada/talleres/pescados-mariscos.jpg

copy_alias_if_possible \
  public/images/especializacion/chef.png \
  public/images/especializacion/cocina-chifa.png

copy_alias_if_possible \
  public/images/especializacion/chef-1.png \
  public/images/especializacion/cocina-chifa-mobile.png

echo "=========================================="
echo "COMPILANDO Y VALIDANDO"
echo "=========================================="
npm run build

echo "=========================================="
echo "ACTUALIZACIÓN COMPLETADA"
echo "=========================================="
echo "Cocina Chifa quedó con fondo oscuro limpio y sin efectos en el hero."
