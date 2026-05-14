Componentes UI
* BASE :
    * Selects :
         * Select :
         * MultiSelect :
    * Index : Aca se agrupan los componentes de Button, Input, Textarea
              import { Button, Input, Textarea } from '@agustin/ui'
* COMPUESTO :
    * Badges :
         * Index : Aca se agrupan componentes de StatusBadge y LabelBadge, se utilizan segun su función StatusBadge, es para el control de 
         estados y el LabelBadge, para división de categorias y demás.
    * Modals :
         * Card : Diferentes tipos y variaciones de la tarjeta.
         * Dialog : 
    * Toaster : 
    * Tooltip :
* DATADISPLAY :
    * Graficas :
         * GraficaBar :
         * GraficaDonut :
         * GraficaLine : 
    * Table : 
* NAVEGACIÓN :
    * Breadcrumbs :
    * SideBar : Esta será el que ya esta ajustado en AGUSTIN.



## Importacion Css
@import "tailwindcss";

@import '@agustin/ui/styles';

@source "../node_modules/@agustin/ui/dist/index.js";

@theme inline {
  --color-background: var(--bg-base);
  --color-surface: var(--bg-surface);
  --color-muted: var(--bg-muted);
  --color-border: var(--border-default);
  --color-border-strong: var(--border-strong);
  --color-border-sidebar: var(--border-sidebar);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-soft: var(--accent-soft);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-text-disabled: var(--text-disabled);

  --color-error: var(--alert-error);
  --color-success: var(--alert-success);
  --color-info: var(--alert-info);
  --color-warning: var(--alert-warning);
  --color-text-error: var(--text-error);
  --color-text-success: var(--text-success);
  --color-text-warning: var(--text-warning);
  --color-text-info: var(--text-info);
}