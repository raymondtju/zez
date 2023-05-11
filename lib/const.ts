export const LinksContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const ItemLinksContainer = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const meta = ({ title, description, image }) => {
  return {
    title,
    description,
    image,
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    icons: {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
    },
    openGraph: {
      title,
      description,
      url: "https://zez.pw/",
      siteName: "zez pw",
      images: [
        {
          url: image,
          width: 1260,
          height: 630,
        },
      ],
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@raymondtju_',
      images: [image || './og.png'],
    },
  };
};

export const zezLogo =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA1IiBoZWlnaHQ9Ijk5IiB2aWV3Qm94PSIwIDAgMTA1IDk5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTA1XzIpIj4KPHJlY3Qgd2lkdGg9IjEwNSIgaGVpZ2h0PSI5OSIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI1Ljc1MzEgNzhWNzYuMzVMNTAuODMzMSAzNi42NEM1MS42MDMxIDM1LjQzIDUyLjQ4MzEgMzQuMzMgNTMuNDczMSAzMy4xMkgyNi45NjMxVjIwLjhINzYuMjQzMVYyMi40NUw1MC45NDMxIDYyLjgyQzUwLjM5MzEgNjMuODEgNDkuNjIzMSA2NC42OSA0OC44NTMxIDY1LjY4SDc1LjY5MzFWNzhIMjUuNzUzMVpNNTIuNzI0NiA3OS40M0MzNS4wMTQ2IDc5LjQzIDIzLjEzNDYgNjYuMDEgMjMuMTM0NiA0OS41MUMyMy4xMzQ2IDMzLjAxIDM1LjU2NDYgMTkuMzcgNTIuNzI0NiAxOS4zN0M2OS44ODQ2IDE5LjM3IDgxLjc2NDYgMzMuMDEgODEuNzY0NiA0OS41MUM4MS43NjQ2IDUxLjE2IDgxLjY1NDYgNTIuOTIgODEuMzI0NiA1NC43OUgzOC41MzQ2QzQwLjE4NDYgNjEuNSA0NS4yNDQ2IDY2LjIzIDUyLjcyNDYgNjYuMjNDNTkuMTA0NiA2Ni4yMyA2NC4wNTQ2IDYyLjkzIDY2LjY5NDYgNTguNTNMNzguMjQ0NiA2Ny4yMkM3My42MjQ2IDc0LjM3IDY0LjA1NDYgNzkuNDMgNTIuNzI0NiA3OS40M1pNMzguNTM0NiA0My42OEg2Ni44MDQ2QzY1LjE1NDYgMzcuMyA1OS43NjQ2IDMyLjEzIDUyLjUwNDYgMzIuMTNDNDUuNDY0NiAzMi4xMyA0MC4xODQ2IDM2Ljg2IDM4LjUzNDYgNDMuNjhaTTI5LjI5MzcgNzhWNzYuMzVMNTQuMzczNyAzNi42NEM1NS4xNDM3IDM1LjQzIDU2LjAyMzcgMzQuMzMgNTcuMDEzNyAzMy4xMkgzMC41MDM3VjIwLjhINzkuNzgzN1YyMi40NUw1NC40ODM3IDYyLjgyQzUzLjkzMzcgNjMuODEgNTMuMTYzNyA2NC42OSA1Mi4zOTM3IDY1LjY4SDc5LjIzMzdWNzhIMjkuMjkzN1oiIGZpbGw9IiMxNTE1MTUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xMDVfMiI+CjxyZWN0IHdpZHRoPSIxMDUiIGhlaWdodD0iOTkiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
