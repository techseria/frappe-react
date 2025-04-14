import React from 'react';

export interface HelpCenterProps {
  articles: any[];
  docsLink: string;
  onArticlesChange?: (articles: any[]) => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ articles, docsLink }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Help Center</h2>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index} className="mb-1">
              {article.title ? article.title : `Article ${index + 1}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles available.</p>
      )}
      <p className="mt-4">
        Visit our documentation at{' '}
        <a href={docsLink} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
          {docsLink}
        </a>
      </p>
    </div>
  );
};

export default HelpCenter;
