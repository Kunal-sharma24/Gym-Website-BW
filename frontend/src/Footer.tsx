import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-white dark:bg-black border-t border-neutral-300 dark:border-neutral-700 mt-10 text-center flex flex-col gap-2 items-center">
      <div className="flex gap-4 mb-2">
        <a
          href="#"
          aria-label="Instagram"
          className="inline-block hover:opacity-70 transition"
          target="_blank" rel="noopener noreferrer"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black dark:text-white">
            <rect width="17" height="17" x="3.5" y="3.5" rx="5" strokeWidth="1.6"/>
            <circle cx="12" cy="12" r="4.1" strokeWidth="1.6"/>
            <circle cx="17.6" cy="6.4" r="0.7" fill="currentColor"/>
          </svg>
        </a>
        <a
          href="#"
          aria-label="Facebook"
          className="inline-block hover:opacity-70 transition"
          target="_blank" rel="noopener noreferrer"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black dark:text-white">
            <rect width="20" height="20" x="2" y="2" rx="6" strokeWidth="1.4"/>
            <path d="M15 8.5h-1.5a.5.5 0 0 0-.5.5V10h2v2h-2v6h-2v-6H9v-2h1.5v-1a2.5 2.5 0 0 1 2.5-2.5H15v2Z" strokeWidth="1.7" strokeLinejoin="round"/>
          </svg>
        </a>
        <a
          href="#"
          aria-label="GitHub"
          className="inline-block hover:opacity-70 transition"
          target="_blank" rel="noopener noreferrer"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black dark:text-white">
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.422 2.865 8.17 6.839 9.504.5.092.682-.217.682-.482 0-.238-.009-.868-.014-1.703-2.782.605-3.37-1.344-3.37-1.344-.454-1.156-1.11-1.464-1.11-1.464-.905-.619.069-.607.069-.607 1 .07 1.527 1.029 1.527 1.029.89 1.525 2.336 1.085 2.905.83.092-.645.348-1.085.634-1.336-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.447-1.274.098-2.656 0 0 .84-.27 2.75 1.025A9.563 9.563 0 0 1 12 7.845c.85.004 1.705.115 2.504.338 1.908-1.296 2.747-1.025 2.747-1.025.547 1.382.203 2.402.1 2.656.64.7 1.028 1.594 1.028 2.687 0 3.848-2.337 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.421-.012 2.753 0 .267.18.578.688.48A10.012 10.012 0 0 0 22 12.021C22 6.484 17.523 2 12 2Z" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      <div className="text-sm opacity-80">Made by Kunal Sharma</div>
    </footer>
  );
}
