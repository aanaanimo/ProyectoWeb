// WEB ATELIER (UDIT) - Student Project Template JavaScript
// Add your interactive functionality here

document.addEventListener("DOMContentLoaded", function () {
  // Initialize your project functionality
  console.log("WEB ATELIER (UDIT) - Student project initialized");

  // Ensure each heading + its related paragraphs are wrapped in a .project-block
  // This allows the CSS .project-block rules to prevent column breaks between headings and their content.
  (function wrapProjectBlocks() {
    const contents = document.querySelectorAll('.project-content');
    contents.forEach((content) => {
      // Work on a static snapshot of child nodes to avoid live-collection issues while we move nodes
      const nodes = Array.from(content.childNodes);
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.nodeType !== Node.ELEMENT_NODE) continue;

        // Target section headings that are currently H4 or STRONG (some entries use <strong> as a title)
        if (node.tagName === 'H4' || node.tagName === 'STRONG') {
          // If it's a <strong>, convert it to a semantic <h4> to improve accessibility
          let heading = node;
          if (heading.tagName === 'STRONG') {
            const h4 = document.createElement('h4');
            // preserve inner HTML (styles/inline tags if any)
            h4.innerHTML = heading.innerHTML;
            heading.parentNode.replaceChild(h4, heading);
            heading = h4;
          }

          // Create wrapper and move the heading and subsequent paragraph nodes into it
          const wrapper = document.createElement('div');
          wrapper.className = 'project-block';

          // Insert wrapper before the heading, then move heading into wrapper
          heading.parentNode.insertBefore(wrapper, heading);
          wrapper.appendChild(heading);

          // Move following siblings (paragraphs, lists, figures) into the wrapper until we hit the next heading
          let next = wrapper.nextSibling;
          while (
            next &&
            next.nodeType === Node.ELEMENT_NODE &&
            next.tagName !== 'H4' &&
            next.tagName !== 'STRONG' &&
            next.tagName !== 'H3'
          ) {
            const toMove = next;
            next = next.nextSibling;
            wrapper.appendChild(toMove);
          }
        }
      }
    });
  })();

  // Example: Add smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Example: Add skip link functionality
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // --- Custom cursor ---
  // Create cursor element and append to body
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (supportsHover) {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    // Move cursor
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Add hover state for interactive elements
    const interactive = document.querySelectorAll("a, button, .tag, iframe");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });

    // Hide cursor on mouseleave (optional)
    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      cursor.style.opacity = "1";
    });
  }
});

// Add your custom functions here
// Example: Function to update page metadata
function updatePageMetadata(title, description) {
  document.title = title;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  } else {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    metaDescription.setAttribute("content", description);
    document.head.appendChild(metaDescription);
  }
}
