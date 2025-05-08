# Cascavel Runners

Projeto web para corredores da cidade de Cascavel, com foco em facilitar acesso a corridas, inscrições e promover a comunidade runner local.

## 🚀 Funcionalidades implementadas

### 🖼️ Layout e UI
- Fundo fixo com imagem de wallpaper
- Sobreposição diagonal estilizada com `clip-path`
- Cores personalizadas (laranja principal: `#F97316`)
- Ícone (favicon) personalizado com tênis minimalista branco

### 🧭 Navegação
- Navbar fixa com título "Cascavel Runners"
- Botão hamburguer animado com `framer-motion` e ícones `react-icons`
- Dropdown animado (abre/fecha com clipPath circular)
- Links de navegação:
  - Login
  - Corridas
  - Participar

### 🖱️ Scroll & Call-to-Action
- Animação de rolagem até o conteúdo
- Botões com hover e animações suaves

### 🖼️ Carousel
- Carrossel de imagens feito com `swiper/react`
- Slides com imagens ajustadas automaticamente via `next/image`
- Cards adaptáveis ao tamanho das imagens

### 🧾 Página Feed com Cards
- Componente `CardFeed` com título, imagem, curtidas, comentários e botão de participação
- Layout responsivo e compacto com altura controlada (sem `aspect-square` fixo)
- Dados renderizados dinamicamente a partir de um mock JSON (`feedMock`)
- Página `/feed` exibe uma grade responsiva com os cards
- Footer colado ao final da tela, mesmo com pouco conteúdo

### 📦 Footer
- Componente Footer com texto:
  - "Desenvolvido por Cascavel Runners"
  - "Todos os direitos reservados © 2025"

## 📁 Estrutura do projeto

```
/public
  ├── wallpaperImg.jpg
  ├── caroussel-1.jpg
  ├── caroussel-2.jpg
  ├── caroussel-3.jpg

/src/components
  ├── Navbar.tsx
  ├── Carousel.tsx
  ├── Footer.tsx
  ├── CardFeed.tsx

/src/app
  ├── page.tsx        # Home
  └── feed/page.tsx   # Página de Feed com cards

/src/data
  └── feedMock.ts     # Mock de dados para os cards do feed
```

## 🛠️ Tecnologias usadas

- **Next.js 13+ (App Router)**
- **Tailwind CSS**
- **Framer Motion**
- **React Icons**
- **SwiperJS**
- **TypeScript**

## 📌 Como rodar

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)