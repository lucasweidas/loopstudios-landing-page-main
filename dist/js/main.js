const header = document.querySelector('[data-header]');
const navMenu = document.querySelector('[data-nav-menu]');
const body = document.body;

header.addEventListener('click', evt => {
  if (evt.target.matches('[data-open-btn]')) {
    return openNavigationMenu(evt.target);
  }

  if (evt.target.matches('[data-close-btn]')) {
    return closeNavigationMenu();
  }
});

function openNavigationMenu(button) {
  const elements = new Array(button, navMenu, body);

  toggleActiveClass(elements);
  if (button.classList.contains('active')) {
    button.setAttribute('aria-expanded', true);
  } else {
    button.setAttribute('aria-expanded', false);
    closingMenuAnimation();
  }
}

function closeNavigationMenu() {
  const openMenuButton = document.querySelector('[data-open-btn]');
  const elements = new Array(openMenuButton, navMenu, body);

  toggleActiveClass(elements);
  openMenuButton.setAttribute('aria-expanded', false);
  closingMenuAnimation();
}

function toggleActiveClass(elements) {
  elements.forEach(element => {
    element.classList.toggle('active');
  });
}

function closingMenuAnimation() {
  navMenu.classList.add('closing');
  navMenu.addEventListener(
    'animationend',
    () => {
      navMenu.classList.remove('closing');
    },
    { once: true }
  );
}
