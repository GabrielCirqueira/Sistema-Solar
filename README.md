# Three React

Projeto React + Vite com Three.js (via `@react-three/fiber` e `@react-three/drei`) para uma cena simples com Sol, Terra e Lua.

Este README documenta a organização do código, como rodar o projeto, os aliases de import e convenções para manter tudo limpo e escalável.

## Scripts

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: gera o build de produção.
- `npm run preview`: serve a build localmente para inspeção.
- `npm run lint`: roda o ESLint.

## Estrutura de Pastas

```
src/
  app/
    App.jsx                # Composição da aplicação e da cena 3D
  components/
    common/
      ErrorBoundary.jsx    # Boundary genérica de erro
    three/
      EarthMoon.jsx        # Grupo Terra + Lua (malhas e texturas)
      Sun.jsx              # Sol + directional light
  styles/
    index.css              # Estilos globais
    App.css                # Estilos do template (opcional)
  assets/
    react.svg              # Exemplo de asset estático
  main.jsx                 # Entrada do app (Vite)

public/
  textures/
    earth.jpg
    moon.jpg
```

Observações:
- Texturas e arquivos grandes vão em `public/` para servirem estáticos (acessados via `import.meta.env.BASE_URL`).
- Componentes 3D estão em `src/components/three/`.
- Componentes utilitários/compartilhados em `src/components/common/`.
- Estilos globais em `src/styles/`.

## Aliases de Import ("@")

Para evitar imports relativos longos, foi configurado o alias `@` apontando para `src/`.

- Vite: `vite.config.js`
```js
resolve: { alias: { '@': path.resolve(__dirname, 'src') } }
```

- TypeScript/JS tooling: `tsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Exemplos de uso no código:
- `import App from '@/app/App.jsx'`
- `import EarthMoon from '@/components/three/EarthMoon.jsx'`
- `import '@/styles/index.css'`

## Convenções

- Componentes:
  - Componentes 3D: `src/components/three/*`
  - Componentes compartilhados: `src/components/common/*`
- Estilos globais em `src/styles`. Prefira CSS Modules ou styled-components para escopo local se necessário.
- Texturas e modelos 3D em `public/` (ex.: `public/textures/*`).
- Evite imports relativos com muitos `../`; use `@/`.

## Dicas para 3D / Three.js

- Para texturas em `public/`, use o `BASE_URL` do Vite para compatibilidade quando o app não estiver hospedado na raiz:
  ```js
  const base = import.meta.env.BASE_URL || '/'
  const tex = useTexture([`${base}textures/earth.jpg`])
  ```
- Ajustes comuns de render (já aplicados no `App.jsx`):
  - `ACESFilmicToneMapping`, `SRGBColorSpace`, `toneMappingExposure`.
  - Pós-processamento com `@react-three/postprocessing` (`Bloom`).

## Como estender

- Novos componentes 3D: crie em `src/components/three/` e importe no `App.jsx` ou em um container novo.
- Outras camadas (sugestões para crescer o projeto):
  - `src/hooks/` para hooks customizados.
  - `src/utils/` para helpers puros.
  - `src/types/` caso adote TypeScript.
  - `src/services/` para integrações externas.

## Requisitos

- Node 20.19+ (ou 22.12+) recomendado para Vite 7.
- Instalar dependências: `npm install`.

## Roadmap (ideias)

- Adicionar loaders/placeholder visual para `Suspense`.
- Separar luzes/câmeras em componentes dedicados.
- Testes unitários para helpers e componentes desacoplados.
