"use client";

import { ReactNode } from "react";

interface SemanticArticleProps {
  children: ReactNode;
  title: string;
  author?: string;
  publishDate?: string;
  className?: string;
}

export function SemanticArticle({ 
  children, 
  title, 
  author, 
  publishDate, 
  className = "" 
}: SemanticArticleProps) {
  return (
    <article 
      className={className}
      itemScope 
      itemType="https://schema.org/Article"
    >
      <header>
        <h1 itemProp="headline">{title}</h1>
        {(author || publishDate) && (
          <div className="mt-2 text-sm text-gray-600">
            {author && <span itemProp="author" itemScope itemType="https://schema.org/Person"><span itemProp="name">{author}</span></span>}
            {publishDate && <time itemProp="datePublished" dateTime={publishDate}>{new Date(publishDate).toLocaleDateString("tr-TR")}</time>}
          </div>
        )}
      </header>
      <div itemProp="articleBody">
        {children}
      </div>
    </article>
  );
}

interface SemanticAsideProps {
  children: ReactNode;
  label: string;
  className?: string;
}

export function SemanticAside({ children, label, className = "" }: SemanticAsideProps) {
  return (
    <aside 
      role="complementary" 
      aria-labelledby={`aside-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className={className}
    >
      <h2 id={`aside-${label.toLowerCase().replace(/\s+/g, '-')}`} className="sr-only">
        {label}
      </h2>
      {children}
    </aside>
  );
}
