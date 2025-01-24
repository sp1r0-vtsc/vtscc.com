interface NavItem {
  name: string;
  image: string;
  secondaryImage?: string;
  link: string;
  subItems?: { name: string; link: string; }[];
}

// Get DOM elements
const navItemElements = Array.from(document.querySelectorAll<HTMLElement>('.nav-item'));
const treeImages = Array.from(document.querySelectorAll<HTMLImageElement>('.tree-image'));
const entranceContainer = document.querySelector('.tree-entrance-container') as HTMLElement;

// Get popup elements
const popup = document.getElementById('blogPopup') as HTMLElement;
const popupTitle = document.getElementById('popupTitle') as HTMLElement;
const popupDescription = document.getElementById('popupDescription') as HTMLElement;
const readMoreBtn = document.getElementById('readMoreBtn') as HTMLElement;
const closePopupBtn = document.getElementById('closePopupBtn') as HTMLElement;

// Get latest post data from server
const pageData = document.getElementById('pageData');
const latestPostData = {
  slug: pageData?.getAttribute('data-latest-post-slug') || '',
  title: pageData?.getAttribute('data-latest-post-title') || '',
  description: pageData?.getAttribute('data-latest-post-description') || ''
};

let currentPostSlug = '';

// Create navData from the original navItems array
const navData: NavItem[] = [
  { 
    name: '2025 h4ckz',
    image: '/treeloop.jpg',
    secondaryImage: '/slaughterline.jpg',
    link: '/blog/sams-scams',
    subItems: [
      { name: 'Latest Scam Alert', link: '/blog/sams-scams' },
      { name: 'Research Papers', link: '/research' },
      { name: 'Security Tools', link: '/projects#security' }
    ]
  },
  { 
    name: 'about us',
    image: '/treedetails.jpg',
    link: '/about'
  },
  { 
    name: 'projects',
    image: '/hometree.jpg',
    link: '/projects',
    subItems: [
      { name: 'Offensive Security', link: '/projects#security' },
      { name: 'Crypto Investing', link: '/projects#crypto' },
      { name: '2024 InReview', link: '/projects#review' }
    ]
  },
  { 
    name: 'defi simplified',
    image: '/vtsc-background.jpg',
    link: '/research',
    subItems: [
      { name: 'Wallets', link: '/research#wallets' },
      { name: 'Swaping', link: '/research#swaping' },
      { name: 'Staking', link: '/research#staking' },
      { name: 'Learning', link: '/research#learning' }
    ]
  }
];

// Handle magical entrance animation
const blackOverlay = document.querySelector('.tree-entrance-container > div') as HTMLElement;
const entranceTrees = Array.from(document.querySelectorAll<HTMLImageElement>('.tree-entrance'));

// Start the entrance sequence
window.addEventListener('load', () => {
  // Add a class to start the sequence
  document.body.classList.add('animation-start');
  
  // Fade out black background
  setTimeout(() => {
    if (blackOverlay) {
      blackOverlay.style.opacity = '0';
    }
    
    // Trigger tree animations
    entranceTrees.forEach((tree, index) => {
      setTimeout(() => {
        tree.style.opacity = '1';
        tree.style.animation = `magicalEntrance${index + 1} 3s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
      }, index * 500);
    });

    // Set final state after all animations complete
    setTimeout(() => {
      if (entranceContainer) {
        entranceContainer.style.opacity = '1';
        entranceContainer.style.transition = 'opacity 0.5s ease';
      }
    }, 4500); // 3s animation + 1.5s stagger
  }, 500);
});

// Handle navigation interactions
const handleNavInteraction = (e: Event) => {
  if (!e.currentTarget) return;
  const target = e.currentTarget as HTMLElement;
  const navSection = target.querySelector('.nav-section');
  if (!navSection) return;

  entranceContainer.style.setProperty('opacity', '0.8');
  const sectionText = navSection.textContent;
  const section = sectionText ? sectionText.toLowerCase().trim() : null;
  if (!section) return;
  
  const navItem = section ? navData.find(nav => nav.name === section) : undefined;
  
  treeImages.forEach(img => {
    const dataSection = img.getAttribute('data-section');
    if (dataSection && dataSection === section) {
      img.classList.add('active');
      
      // For DeFi section, show the background image
      if (section === 'defi simplified') {
        const defiBackground = document.querySelector('[data-section="defi simplified"]') as HTMLImageElement;
        if (defiBackground) {
          defiBackground.style.opacity = '1';
          defiBackground.style.transform = 'scale(1)';
        }
      }
      
      if (section && navItem?.subItems) {
        // Create submenu panel with consistent positioning for all sections
        const panel = document.createElement('div');
        panel.classList.add('submenu-panel', 'panel-base');
        
        // Position the panel horizontally near the top
        // Position panel based on section
        panel.style.position = 'absolute';
        if (section === 'defi simplified') {
          panel.style.top = '50%';
          panel.style.right = '120px';
          panel.style.left = 'auto';
          panel.style.transform = 'translateY(-50%)';
        } else {
          panel.style.top = '120px';
          panel.style.left = '50%';
          panel.style.transform = 'translateX(-50%)';
        }
        panel.style.display = 'flex';
        panel.style.gap = '2rem';
        panel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        panel.style.padding = '1rem 2rem';
        panel.style.borderRadius = '0.5rem';
        panel.style.zIndex = '50';
        
        // For DeFi Simplified section, use specific menu items
        if (section === 'defi simplified') {
          const defiLinks = [
            { name: 'Wallets', link: '/research#wallets' },
            { name: 'Swaping', link: '/research#swaping' },
            { name: 'Staking', link: '/research#staking' },
            { name: 'Learning', link: '/research#learning' }
          ];
          defiLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.link;
            a.textContent = link.name;
            a.classList.add('panel-link');
            a.style.color = '#fff';
            a.style.textDecoration = 'none';
            a.style.fontSize = '1rem';
            panel.appendChild(a);
          });
        } else {
          navItem.subItems.forEach(subItem => {
            const link = document.createElement('a');
            link.href = subItem.link;
            link.textContent = subItem.name;
            link.classList.add('panel-link');
            link.style.color = '#fff';
            link.style.textDecoration = 'none';
            link.style.fontSize = '1rem';
            panel.appendChild(link);
          });
        }
        
        const container = document.querySelector('.tree-container');
        if (container) {
          container.appendChild(panel);
          requestAnimationFrame(() => {
            panel.classList.add('active');
          });
        }
      }
    } else {
      img.classList.remove('active');
    }
  });
};

const handleNavExit = () => {
  entranceContainer.style.setProperty('opacity', '1');
  treeImages.forEach(img => {
    img.classList.remove('active');
    // Reset DeFi background
    if (img.getAttribute('data-section') === 'defi simplified') {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.95)';
    }
  });
  // Remove any panels
  const panels = document.querySelectorAll('.panel-base');
  panels.forEach(panel => {
    (panel as HTMLElement).classList.remove('active');
    setTimeout(() => panel.remove(), 500);
  });
};

let activePanel: HTMLElement | null = null;
let isFullscreen = false;

const handleNavClick = (e: Event) => {
  if (!e.currentTarget) return;
  const target = e.currentTarget as HTMLElement;
  const navSection = target.querySelector('.nav-section');
  if (!navSection) return;

  const sectionText = navSection.textContent;
  const section = sectionText ? sectionText.toLowerCase().trim() : null;
  if (!section) return;

  // Find the corresponding tree image
  const treeImage = Array.from(treeImages).find(img => {
    const dataSection = img.getAttribute('data-section');
    return dataSection && dataSection === section;
  });

  // Handle projects section click
  if (section === 'projects') {
    const navItem = navData.find(nav => nav.name === section);
    if (navItem?.subItems) {
      // Create horizontal submenu
      const panel = document.createElement('div');
      panel.classList.add('submenu-panel', 'panel-base');
      
      // Position the panel horizontally near the top
      panel.style.position = 'absolute';
      panel.style.top = '120px';
      panel.style.left = '50%';
      panel.style.transform = 'translateX(-50%)';
      panel.style.display = 'flex';
      panel.style.gap = '2rem';
      panel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      panel.style.padding = '1rem 2rem';
      panel.style.borderRadius = '0.5rem';
      panel.style.zIndex = '50';
      
      navItem.subItems.forEach(subItem => {
        const link = document.createElement('a');
        link.href = subItem.link;
        link.textContent = subItem.name;
        link.classList.add('panel-link');
        link.style.color = '#fff';
        link.style.textDecoration = 'none';
        link.style.fontSize = '1rem';
        panel.appendChild(link);
      });
      
      const container = document.querySelector('.tree-container');
      if (container) {
        container.appendChild(panel);
        requestAnimationFrame(() => {
          panel.classList.add('active');
        });
      }
    }
    // Delay navigation slightly to allow panel animation
    setTimeout(() => {
      window.location.href = '/projects';
    }, 100);
    return;
  }
  
  // Handle DeFi section click
  if (section === 'defi simplified') {
    const defiFlash = document.getElementById('defiFlash');
    const defiContent = document.getElementById('defiContent');
    
    if (defiFlash && defiContent) {
      defiFlash.classList.add('active');
      setTimeout(() => {
        defiContent.classList.remove('hidden');
        defiFlash.classList.remove('active');
      }, 800);
    }
    return;
  }
  
  const panelSelector = section === 'projects' ? '.project-panel' : 
                       section === '2025 h4ckz' ? '.h4ckz-panel' : 
                       null;
  const panel = panelSelector ? document.querySelector(panelSelector) as HTMLElement : null;
  
  if (treeImage) {
    if (!isFullscreen) {
      // Toggle panel if exists
      if (panel) {
        if (activePanel === panel) {
          panel.classList.remove('active');
          activePanel = null;
        } else {
          if (activePanel) activePanel.classList.remove('active');
          panel.classList.add('active');
          activePanel = panel;
        }
      }
      
      // Toggle fullscreen
      treeImage.classList.add('fullscreen');
      document.querySelector('.fullscreen-overlay')?.classList.add('active');
      isFullscreen = true;
      
      // Disable navigation except current item
      navItemElements.forEach(nav => {
        if (nav !== target) {
          nav.style.pointerEvents = 'none';
        }
      });
    } else {
      // Exit fullscreen
      treeImage.classList.remove('fullscreen');
      document.querySelector('.fullscreen-overlay')?.classList.remove('active');
      isFullscreen = false;
      
      // Re-enable navigation
      navItemElements.forEach(nav => {
        nav.style.pointerEvents = 'auto';
      });
      
      // Keep panel active
      if (panel && panel === activePanel) {
        panel.classList.add('active');
      }
    }
  }
};

// Add event listeners to nav items
navItemElements.forEach(item => {
  // Desktop events
  item.addEventListener('mouseenter', handleNavInteraction);
  item.addEventListener('mouseleave', handleNavExit);
  item.addEventListener('click', handleNavClick);
  
  // Mobile events with explicit types
  item.addEventListener('touchstart', (e: TouchEvent) => {
    e.preventDefault();
    handleNavInteraction(e);
  });
  item.addEventListener('touchend', (e: TouchEvent) => {
    e.preventDefault();
    handleNavExit();
  });
  item.addEventListener('touchcancel', (e: TouchEvent) => {
    e.preventDefault();
    handleNavExit();
  });
});

// Close DeFi content when clicking close button
document.getElementById('closeDefiBtn')?.addEventListener('click', () => {
  const defiContent = document.getElementById('defiContent');
  if (defiContent) {
    defiContent.classList.add('hidden');
  }
});

// Close DeFi content when clicking outside
document.getElementById('defiContent')?.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const currentTarget = e.currentTarget as HTMLElement;
  if (target === currentTarget) {
    currentTarget.classList.add('hidden');
  }
});

// Popup event listeners
closePopupBtn?.addEventListener('click', () => {
  popup?.classList.add('hidden');
});

readMoreBtn?.addEventListener('click', () => {
  if (currentPostSlug) {
    window.location.href = `/blog/${currentPostSlug}`;
  }
});

// Close popup when clicking outside
popup?.addEventListener('click', (e: MouseEvent) => {
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});
